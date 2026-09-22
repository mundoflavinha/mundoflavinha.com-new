-- ===============================================================
-- CORREÇÃO dos consentimentos pre-lgpd — ALTERA DADOS
--
-- Só depois de:
--   1. revisar a A2 de sql/auditoria-pre-lgpd.sql
--   2. publicar a correção do código (senão novos registros continuam
--      entrando enquanto você corrige)
--   3. exportar o resultado da A2 (fica como registro do que foi corrigido)
--
-- TRAVA: cada comando só age se você trocar  'TRAVADO' = 'CONFIRMO'
-- por  'CONFIRMO' = 'CONFIRMO'  NAQUELE comando. Sem a troca, ele roda
-- e não altera nada (retorna zero linhas). Cole e rode um comando por vez.
-- ===============================================================

-- ---------------------------------------------------------------
-- B1. Tirar da lista de envio quem só tem o consentimento fabricado
--
--   `consent_events` é append-only (há trigger): o evento legado FICA, como
--   histórico do que aconteceu. A correção é um evento NOVO, com texto que diz
--   exatamente o motivo — o mesmo padrão da revogação manual do runbook.
--
--   Quem tem também um `concedido` REAL de e-mail não é tocado.
--   WhatsApp não é tocado: o caminho legado sempre gravou opt-in de WhatsApp
--   como false.
--
--   Confira antes: a contagem deve bater com `na_lista_de_envio_sem_prova`
--   da A3.
-- ---------------------------------------------------------------
with alvos as (
  select c.id
  from contacts c
  where c.opt_in_email is true
    and exists (
      select 1 from consent_events e
      where e.contact_id = c.id and e.versao = 'pre-lgpd'
    )
    and not exists (
      select 1 from consent_events e
      where e.contact_id = c.id
        and e.versao != 'pre-lgpd'
        and e.finalidade = 'email_marketing'
        and e.acao = 'concedido'
    )
    and 'TRAVADO' = 'CONFIRMO'
),
atualizados as (
  update contacts c
  set opt_in_email = false,
      opt_in_email_em = null,
      updated_at = now()
  from alvos a
  where c.id = a.id
  returning c.id
)
insert into consent_events (contact_id, finalidade, acao, versao, texto, origem)
select id, 'email_marketing', 'revogado', 'correcao-legado',
       'Correção interna, não solicitada pelo titular: o "concedido" pre-lgpd foi gravado '
       || 'automaticamente pelo caminho legado de /api/lead, sem prova de opt-in. '
       || 'Opt-in de e-mail marketing desfeito até novo consentimento.',
       'auditoria-pre-lgpd'
from atualizados
returning contact_id;


-- ---------------------------------------------------------------
-- B2. Excluir robôs confirmados
--
--   Apaga o contato e, em cascata, consent_events, material_requests (e
--   lead_attributions, se a 002 já estiver aplicada).
--
--   NÃO use a coluna `sugestao` direto: troque a lista pelos ids que você
--   revisou na A2. Na dúvida, não apague — a B1 já tira a pessoa da lista de
--   envio, e apagar uma pessoa real por engano não tem volta.
-- ---------------------------------------------------------------
delete from contacts
where 'TRAVADO' = 'CONFIRMO'
  and id in (
    0 -- troque o 0 pelos ids revisados, separados por vírgula
  )
  and exists (
    select 1 from consent_events e
    where e.contact_id = contacts.id and e.versao = 'pre-lgpd'
  )
returning id, email;

-- Depois: rode a consulta C de sql/auditoria-pre-lgpd.sql — deve voltar 0.
