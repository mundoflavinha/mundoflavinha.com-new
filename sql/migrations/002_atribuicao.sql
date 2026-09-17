-- 002_atribuicao — atribuição de leads + controle de versão de schema.
--
-- IDEMPOTENTE: pode rodar mais de uma vez. ADITIVA: não altera nem remove nada
-- que o código em produção usa — por isso deve ser aplicada ANTES do deploy
-- do código que depende dela, com o código antigo ainda no ar.
--
-- Aplicar: SQL Editor do Neon (colar o arquivo inteiro e executar) ou
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f sql/migrations/002_atribuicao.sql
-- Rollback: sql/rollback/002_atribuicao.sql (ver README).

begin;

-- ---------------------------------------------------------------------------
-- Controle de versão. O build de produção lê esta tabela e se recusa a
-- publicar código cujas migrations não constem aqui (scripts/verificar-schema.mjs).
-- ---------------------------------------------------------------------------
create table if not exists schema_migrations (
  versao      text        primary key,
  aplicada_em timestamptz not null default now()
);

-- Linha de base: 001 foi aplicada à mão antes de existir esta tabela. Só é
-- registrada se as tabelas dela existem — registrar sem conferir faria a trava
-- de deploy mentir. SQL puro, sem bloco DO: editores web que dividem o script
-- em ponto e vírgula quebram o corpo de um bloco DO.
insert into schema_migrations (versao)
select '001_lgpd'
where to_regclass('public.contacts') is not null
  and to_regclass('public.consent_events') is not null
  and to_regclass('public.material_requests') is not null
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Uma linha por ENVIO com atribuição permitida — não por pessoa. A mesma
-- pessoa pode chegar por campanhas diferentes em momentos diferentes, e guardar
-- em `contacts` perderia todos os toques menos um.
--
-- Campanha (utm_*) e identificadores de mídia ficam em colunas separadas
-- porque têm regras de consentimento independentes (src/lib/atribuicao/).
-- ---------------------------------------------------------------------------
create table if not exists lead_attributions (
  id                         bigint      generated always as identity primary key,
  -- cascade: a exclusão de titular (runbook LGPD, item 6) apaga isto junto.
  contact_id                 bigint      not null references contacts (id) on delete cascade,
  origem                     text        not null,
  created_at                 timestamptz not null default now(),

  utm_source                 text,
  utm_medium                 text,
  utm_campaign               text,
  utm_content                text,
  utm_term                   text,

  -- { fbclid, fbp, fbc } — jsonb para novos identificadores (gclid, ...)
  -- entrarem sem migration. NULL = não havia ou não era permitido gravar.
  identificadores_midia      jsonb,

  -- A preferência DECLARADA pelo navegador (cookie do CMP) que autorizou a
  -- gravação. Não é prova de clique — ver src/lib/atribuicao/servidor.ts.
  preferencia_revisao        integer     not null,
  preferencia_categorias     jsonb       not null,
  preferencia_registrada_em  timestamptz,

  constraint lead_attributions_ids_objeto_chk
    check (identificadores_midia is null or jsonb_typeof(identificadores_midia) = 'object'),
  constraint lead_attributions_categorias_array_chk
    check (jsonb_typeof(preferencia_categorias) = 'array'),
  constraint lead_attributions_algo_a_gravar_chk
    check (identificadores_midia is not null
           or coalesce(utm_source, utm_medium, utm_campaign, utm_content, utm_term) is not null)
);

create index if not exists lead_attributions_contact_idx on lead_attributions (contact_id);
create index if not exists lead_attributions_campaign_idx
  on lead_attributions (utm_source, utm_campaign) where utm_source is not null;

insert into schema_migrations (versao) values ('002_atribuicao') on conflict do nothing;

commit;
