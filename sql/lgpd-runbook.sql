-- Runbook LGPD — queries operacionais
--
-- Rode no SQL Editor do Neon, uma de cada vez, trocando os valores marcados.
-- Uma política que promete acesso e exclusão sem que exista o SQL para
-- executá-los é pior do que não ter política.
--
-- Prazo de resposta prometido na Política: 15 dias.

-- ===============================================================
-- 1. PARA QUEM POSSO ENVIAR E-MAIL MARKETING
-- ===============================================================
select email, nome, faixa_etaria, perfil, opt_in_email_em
from contacts
where opt_in_email is true
order by opt_in_email_em desc;

-- ===============================================================
-- 2. PARA QUEM POSSO MANDAR WHATSAPP
-- ===============================================================
select email, nome, whatsapp, opt_in_whatsapp_em
from contacts
where opt_in_whatsapp is true
  and whatsapp is not null
order by opt_in_whatsapp_em desc;

-- ===============================================================
-- 3. ACESSO AOS DADOS (art. 18, II) — o que temos sobre uma pessoa
--    Troque o e-mail e envie o resultado ao titular.
-- ===============================================================
\set titular 'pessoa@exemplo.com'

select 'cadastro' as bloco, to_jsonb(c) - 'id' as dados
from contacts c
where c.email = :'titular'

union all

select 'consentimentos', to_jsonb(e) - 'id' - 'contact_id'
from consent_events e
join contacts c on c.id = e.contact_id
where c.email = :'titular'

union all

select 'materiais baixados', to_jsonb(m) - 'id' - 'contact_id'
from material_requests m
join contacts c on c.id = m.contact_id
where c.email = :'titular';

-- ===============================================================
-- 4. PROVA DE CONSENTIMENTO — o que a pessoa viu e aceitou, e quando
--    Use quando alguém disser "nunca me cadastrei nessa lista".
-- ===============================================================
select e.created_at, e.finalidade, e.acao, e.versao, e.origem, e.ip, e.texto
from consent_events e
join contacts c on c.id = e.contact_id
where c.email = :'titular'
order by e.created_at;

-- ===============================================================
-- 5. REVOGAÇÃO / DESCADASTRO (art. 18, IX)
--    Atualiza o estado atual E registra o evento — os dois passos importam:
--    sem o evento, não há prova de que a revogação foi processada.
-- ===============================================================
with c as (
  update contacts
  set opt_in_email = false,
      opt_in_whatsapp = false,
      updated_at = now()
  where email = :'titular'
  returning id
)
insert into consent_events (contact_id, finalidade, acao, versao, texto, origem)
select c.id, f.finalidade, 'revogado', 'revogacao-manual',
       'Revogação solicitada pelo titular por e-mail e processada manualmente.',
       'runbook'
from c, (values ('email_marketing'), ('whatsapp_marketing')) as f(finalidade);

-- Confirme:
select email, opt_in_email, opt_in_whatsapp from contacts where email = :'titular';

-- ===============================================================
-- 6. EXCLUSÃO (art. 18, VI) — apaga de verdade, em cascata
--    Registre o pedido ANTES de apagar: depois não haverá o que consultar.
--    Troque o hash: gere com o mesmo pepper usado pela API (THROTTLE_PEPPER),
--    ou registre apenas o tipo e a data se não precisar correlacionar.
-- ===============================================================
insert into data_requests (email_hash, tipo, atendido_em, observacao)
values (encode(digest('TROQUE_PELO_PEPPER:' || :'titular', 'sha256'), 'hex'),
        'exclusao', now(), 'Solicitado por e-mail; identidade confirmada.');
-- Obs: `digest` exige a extensão pgcrypto. Se não estiver disponível,
-- calcule o hash fora do banco e cole o valor literal aqui.

delete from contacts where email = :'titular';
-- consent_events e material_requests somem junto (on delete cascade).

-- ===============================================================
-- 7. LIMPEZA DE RETENÇÃO — contatos sem consentimento ativo há mais de 6 meses
--    Confira a lista ANTES de apagar.
-- ===============================================================
select email, updated_at
from contacts
where opt_in_email is false
  and opt_in_whatsapp is false
  and updated_at < now() - interval '6 months';

-- Depois de conferir:
-- delete from contacts
-- where opt_in_email is false
--   and opt_in_whatsapp is false
--   and updated_at < now() - interval '6 months';

-- ===============================================================
-- 8. HIGIENE — limpar contadores de rate limit antigos
--    A API já purga de forma oportunista; isto é só para forçar.
-- ===============================================================
delete from request_throttle where janela_inicio < now() - interval '2 hours';

-- ===============================================================
-- 9. LIMPAR REGISTROS DE TESTE
-- ===============================================================
select email from contacts where email like 'teste-claude-code%';
-- delete from contacts where email like 'teste-claude-code%';
-- Tabelas antigas (manter ~7 dias após o deploy, depois remover):
-- delete from newsletter_subscribers where email like 'teste-claude-code%';
-- delete from lead_magnet_downloads where email like 'teste-claude-code%';
