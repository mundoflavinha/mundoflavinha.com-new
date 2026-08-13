-- Migração LGPD — issue #3
-- Rode no SQL Editor do Neon ANTES de fazer deploy do novo código.
--
-- 100% aditivo: não altera nem remove as tabelas atuais
-- (newsletter_subscribers, lead_magnet_downloads). A API antiga
-- continua funcionando normalmente enquanto esta migração roda.

-- ---------------------------------------------------------------
-- 1. contacts — uma linha por e-mail. ESTADO ATUAL do consentimento.
--    É a tabela que responde "para quem eu posso enviar?".
-- ---------------------------------------------------------------
create table if not exists contacts (
  id                 bigint generated always as identity primary key,
  email              text        not null,
  nome               text,
  whatsapp           text,
  faixa_etaria       text,
  perfil             text,
  email_confirmado   boolean     not null default false, -- reservado p/ double opt-in
  opt_in_email       boolean     not null default false,
  opt_in_email_em    timestamptz,
  opt_in_whatsapp    boolean     not null default false,
  opt_in_whatsapp_em timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint contacts_email_key unique (email),
  constraint contacts_faixa_chk
    check (faixa_etaria is null or faixa_etaria in ('0-2', '3-5', '6-8', 'familia')),
  constraint contacts_perfil_chk
    check (perfil is null or perfil in ('mae_pai', 'avo', 'educador', 'outro'))
);

-- ---------------------------------------------------------------
-- 2. consent_events — A PROVA. Append-only, nunca sofre UPDATE.
--    Guarda o texto literal que apareceu na tela, não uma referência:
--    uma FK permitiria editar o texto da v1 e alterar retroativamente
--    aquilo que todo mundo aceitou.
-- ---------------------------------------------------------------
create table if not exists consent_events (
  id         bigint generated always as identity primary key,
  contact_id bigint      not null references contacts (id) on delete cascade,
  finalidade text        not null, -- entrega_material | email_marketing | whatsapp_marketing
  acao       text        not null, -- concedido | negado | revogado
  versao     text        not null, -- ex: 2026-08-v1
  texto      text        not null, -- snapshot literal do que foi exibido
  origem     text        not null, -- ex: lead_magnet:/downloads
  ip         inet,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint consent_events_finalidade_chk
    check (finalidade in ('entrega_material', 'email_marketing', 'whatsapp_marketing')),
  constraint consent_events_acao_chk
    check (acao in ('concedido', 'negado', 'revogado'))
);

create index if not exists consent_events_contact_idx
  on consent_events (contact_id, finalidade, created_at desc);

-- Trava de imutabilidade: prova que sofre UPDATE não é prova.
-- Para revogar, registre um NOVO evento com acao = 'revogado'.
create or replace function consent_events_imutavel() returns trigger as $$
begin
  raise exception 'consent_events é append-only. Registre um novo evento (acao=revogado).';
end;
$$ language plpgsql;

drop trigger if exists consent_events_no_update on consent_events;
create trigger consent_events_no_update
  before update on consent_events
  for each row execute function consent_events_imutavel();

-- ---------------------------------------------------------------
-- 3. material_requests — substitui lead_magnet_downloads.
--    Sem idade_crianca: a preferência de faixa etária agora vive
--    em contacts.faixa_etaria e descreve o interesse do adulto.
-- ---------------------------------------------------------------
create table if not exists material_requests (
  id         bigint generated always as identity primary key,
  contact_id bigint      not null references contacts (id) on delete cascade,
  material   text        not null,
  origem     text        not null,
  created_at timestamptz not null default now()
);

create index if not exists material_requests_contact_idx
  on material_requests (contact_id, created_at desc);

-- ---------------------------------------------------------------
-- 4. request_throttle — contador de rate limit (fixed window).
--    Guarda hash com pepper, nunca o IP ou e-mail em claro: é dado
--    descartável, não precisa virar uma segunda cópia de dado pessoal.
-- ---------------------------------------------------------------
create table if not exists request_throttle (
  bucket        text        not null,
  janela_inicio timestamptz not null,
  hits          integer     not null default 0,
  primary key (bucket, janela_inicio)
);

create index if not exists request_throttle_janela_idx
  on request_throttle (janela_inicio);

-- ---------------------------------------------------------------
-- 5. data_requests — registro dos pedidos do art. 18 atendidos.
--    Necessário porque atender um pedido de exclusão apaga a prova;
--    isto é o que demonstra que houve pedido e que foi atendido.
-- ---------------------------------------------------------------
create table if not exists data_requests (
  id          bigint generated always as identity primary key,
  email_hash  text        not null, -- sha256(pepper + email), não o e-mail
  tipo        text        not null, -- acesso | correcao | exclusao | revogacao | portabilidade
  recebido_em timestamptz not null default now(),
  atendido_em timestamptz,
  observacao  text,
  constraint data_requests_tipo_chk
    check (tipo in ('acesso', 'correcao', 'exclusao', 'revogacao', 'portabilidade'))
);
