-- ===============================================================
-- AUDITORIA — consentimentos "pre-lgpd" gravados pelo caminho legado
-- ===============================================================
--
-- O PROBLEMA
--   Desde o commit e23ecfd (2026-08-12), /api/lead aceita dois formatos de
--   envio: o do formulário atual e um "legado", que deveria valer só por uma
--   release (abas abertas com o bundle antigo). O caminho legado:
--
--     - grava SEMPRE `email_marketing = concedido`, com versao 'pre-lgpd' e
--       texto "[registro legado] ... texto exibido não foi capturado"
--     - liga `contacts.opt_in_email = true`.
--
--   Envio do formulário ATUAL que falhava a validação caía nesse caminho em
--   vez de ser recusado. Isso inclui:
--     - robôs que preenchem o honeypot (o campo-armadilha)
--     - pessoas reais com algum dado fora do formato (ex.: WhatsApp com menos
--       de 8 caracteres) — que viram as caixas de opt-in e podem NÃO ter
--       marcado nenhuma.
--
--   A lista de envio do runbook (lgpd-runbook.sql, item 1) usa
--   `contacts.opt_in_email`. Esses contatos ESTÃO nela hoje.
--
-- ENQUANTO A CORREÇÃO DO CÓDIGO NÃO FOR PUBLICADA, NOVOS REGISTROS CONTINUAM
-- SENDO CRIADOS. Rode este diagnóstico de novo depois do deploy.
--
-- COMO USAR
--   Neon → SQL Editor. Este arquivo SÓ LÊ, não altera nada.
--   Jeito mais seguro: apague tudo do editor, cole UMA consulta inteira
--   (do "select" ou "with" até o ponto e vírgula final) e execute.
--   A correção fica em sql/correcao-pre-lgpd.sql.
--
-- O QUE ESTE ARQUIVO NÃO CONSEGUE FAZER
--   Separar com certeza robô de pessoa. O caminho legado não guardava o
--   honeypot nem o tempo de preenchimento. A classificação da A2 é uma
--   SUGESTÃO para revisão humana, não um veredito.
-- ===============================================================


-- ===============================================================
-- DIAGNÓSTICO (só leitura)
-- ===============================================================

-- ---------------------------------------------------------------
-- A0. Banco certo? Deve listar as 4 tabelas.
--     Se vier vazio ou faltando, você está no banco errado ou a
--     migration 001_lgpd.sql nunca foi aplicada.
-- ---------------------------------------------------------------
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('contacts', 'consent_events', 'material_requests', 'request_throttle')
order by table_name;


-- ---------------------------------------------------------------
-- A1. Linha do tempo
--     `estreia_formulario_atual` = primeiro evento de consentimento real
--     (versão diferente de pre-lgpd), ou seja, quando o formulário novo
--     começou a gravar em produção.
-- ---------------------------------------------------------------
select
  (select min(created_at) from consent_events where versao != 'pre-lgpd') as estreia_formulario_atual,
  count(*)                                                                as eventos_legados,
  count(distinct contact_id)                                              as contatos_afetados,
  min(created_at)                                                         as primeiro_legado,
  max(created_at)                                                         as ultimo_legado
from consent_events
where versao = 'pre-lgpd';

-- Por dia: um legado de verdade (aba antiga) só aparece nos primeiros dias.
-- Registros que continuam surgindo semanas depois vêm do formulário atual.
select date_trunc('day', created_at)::date as dia, count(*) as eventos_legados
from consent_events
where versao = 'pre-lgpd'
group by 1
order by 1;


-- ---------------------------------------------------------------
-- A2. Um contato por linha, com os sinais para revisão
--
--   janela
--     'possivel_aba_antiga'      até 1 dia após a estreia do formulário atual
--     'formulario_atual'         depois disso — o bundle antigo não existe mais
--                                 (o site virou Astro em 2026-08-16)
--
--   sugestao
--     'suspeita_robo'             user-agent de automação/vazio, IP com 3+
--                                 contatos legados, ou material 'desconhecido'
--                                 (o modal atual sempre envia o nome do material)
--     'pessoa_com_consentimento'  tem também um `concedido` REAL de e-mail
--     'pessoa_sem_prova'          o resto: provável pessoa, sem prova de opt-in
-- ---------------------------------------------------------------
with estreia as (
  select coalesce(min(created_at), '-infinity'::timestamptz) as em
  from consent_events
  where versao != 'pre-lgpd'
),
legados as (
  select distinct on (e.contact_id)
    e.contact_id, e.created_at, e.ip, e.user_agent
  from consent_events e
  where e.versao = 'pre-lgpd'
  order by e.contact_id, e.created_at
),
ip_repetido as (
  select ip, count(distinct contact_id) as contatos
  from consent_events
  where versao = 'pre-lgpd' and ip is not null
  group by ip
),
reais as (
  select contact_id,
         bool_or(finalidade = 'email_marketing' and acao = 'concedido') as email_concedido_real,
         count(*)                                                       as eventos_reais
  from consent_events
  where versao != 'pre-lgpd'
  group by contact_id
),
materiais as (
  select contact_id, string_agg(distinct material, ', ') as materiais
  from material_requests
  group by contact_id
),
sinais as (
  select
    c.id                                                        as contact_id,
    c.email,
    c.nome,
    c.whatsapp,
    c.opt_in_email                                              as opt_in_email_hoje,
    l.created_at                                                as legado_em,
    round(extract(epoch from (l.created_at - es.em)) / 86400, 1) as dias_apos_estreia,
    case when l.created_at <= es.em + interval '1 day'
         then 'possivel_aba_antiga' else 'formulario_atual' end as janela,
    m.materiais,
    l.ip,
    coalesce(ir.contatos, 0)                                    as contatos_no_mesmo_ip,
    l.user_agent,
    (l.user_agent is null
      or l.user_agent = ''
      or l.user_agent ~* '(bot|crawl|spider|curl|wget|python|httpx|axios|node-fetch|go-http|java/|okhttp|headless|phantom|scrapy|libwww|postman|insomnia)'
    )                                                           as user_agent_suspeito,
    (c.whatsapp is not null and length(regexp_replace(c.whatsapp, '\D', '', 'g')) < 8)
                                                                as whatsapp_curto,
    coalesce(r.email_concedido_real, false)                     as tem_concedido_real,
    coalesce(r.eventos_reais, 0)                                as eventos_reais
  from legados l
  cross join estreia es
  join contacts c           on c.id = l.contact_id
  left join ip_repetido ir  on ir.ip = l.ip
  left join reais r         on r.contact_id = l.contact_id
  left join materiais m     on m.contact_id = l.contact_id
)
select
  case
    when user_agent_suspeito or contatos_no_mesmo_ip >= 3 or materiais like '%desconhecido%'
      then 'suspeita_robo'
    when tem_concedido_real
      then 'pessoa_com_consentimento'
    else 'pessoa_sem_prova'
  end as sugestao,
  *
from sinais
order by sugestao, legado_em;


-- ---------------------------------------------------------------
-- A3. Resumo — o número que importa
--     `na_lista_de_envio_sem_prova`: recebem e-mail marketing hoje (runbook
--     item 1) SEM nenhum `concedido` real. Não podem receber.
-- ---------------------------------------------------------------
with afetados as (
  select distinct contact_id from consent_events where versao = 'pre-lgpd'
),
com_prova as (
  select distinct contact_id
  from consent_events
  where versao != 'pre-lgpd' and finalidade = 'email_marketing' and acao = 'concedido'
)
select
  count(*)                                                                   as contatos_afetados,
  count(*) filter (where c.opt_in_email)                                     as na_lista_de_envio,
  count(*) filter (where c.opt_in_email and p.contact_id is null)            as na_lista_de_envio_sem_prova,
  count(*) filter (where p.contact_id is not null)                           as com_consentimento_real,
  count(*) filter (where c.whatsapp is not null and p.contact_id is null)    as whatsapp_guardado_sem_prova
from afetados a
join contacts c       on c.id = a.contact_id
left join com_prova p on p.contact_id = a.contact_id;


-- ---------------------------------------------------------------
-- C. Depois da correção (sql/correcao-pre-lgpd.sql) — deve voltar ZERO
-- ---------------------------------------------------------------
select count(*) as na_lista_sem_prova
from contacts c
where c.opt_in_email is true
  and exists (select 1 from consent_events e where e.contact_id = c.id and e.versao = 'pre-lgpd')
  and not exists (
    select 1 from consent_events e
    where e.contact_id = c.id and e.versao != 'pre-lgpd'
      and e.finalidade = 'email_marketing' and e.acao = 'concedido'
  );
