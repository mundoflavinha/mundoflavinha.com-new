# Mundo Flavinha

Site em [Astro](https://astro.build) (`output: 'static'`, sem adapter) + Tailwind. 31 rotas, 122 páginas geradas — a maior parte HTML puro, sem JS de framework. Só 3 pontos viram ilha React: o formulário de newsletter, o modal de captura de material gratuito e a galeria de `/videos`. O backend (`functions/api/`) é Cloudflare Pages Functions, escrito à parte do Astro. Hospedado na [Cloudflare Pages](https://pages.cloudflare.com/) — ver `wrangler.toml`.

## Rodar localmente

```bash
npm install
npm run dev
```

O servidor local (`astro dev`) sobe em:

```text
http://localhost:4321/
```

**`astro dev` não executa `functions/`.** Ele nem tenta: fora do Astro, `functions/api/*.ts` é só convenção de pasta que a Cloudflare Pages reconhece no deploy. Pedir `/api/videos` ao `astro dev` cai direto no 404 do site (o dev server do Vite não conhece essa rota). Para rodar as functions de verdade em localhost:

```bash
npm run build
npx wrangler pages dev dist
```

Isso builda o Astro (`dist/`) e serve estático + functions juntos em `http://localhost:8788`, lendo variáveis de ambiente de um `.dev.vars` na raiz do projeto (mesmo papel do `.env.local`, mas é a convenção própria do wrangler — nome fixo, não cai no glob `.env.*` do `.gitignore`, por isso tem entrada própria):

```env
# .dev.vars
DATABASE_URL=postgresql://usuario:senha@SEU-HOST-pooler.../neondb?sslmode=require
YOUTUBE_API_KEY=sua_chave_da_youtube_data_api
```

Sem hot-reload do Astro nesse modo — para trabalhar em UI/conteúdo, use `npm run dev` normalmente e só suba o `wrangler pages dev` quando precisar testar `/api/*` de verdade.

## Scripts

```bash
npm run dev         # astro dev — o site, sem functions/
npm run build       # trava de schema (só impõe na Cloudflare) + astro build → dist/
npm run build:e2e   # 3 builds com ids de TESTE: dist/ (direct), dist-gtm/, dist-disabled/
npm run preview     # astro preview — serve o build de dist/ localmente
npm run typecheck   # astro check (inclui .astro) + tsc sobre functions/
npm run lint        # eslint . — cobre .ts/.tsx/.astro/configs
npm test            # vitest — testes unitários (dados, Zod, consentimento)
npm run test:html   # vitest — asserções sobre o HTML real em dist/ (exige build antes)
npm run test:e2e    # playwright — hidratação, foco/teclado, consentimento, tagging por modo
npm run db:check    # confere se o banco (DATABASE_URL) tem todas as migrations do código
```

`test:e2e` roda `build:e2e` sozinho quando fora de CI. Antes da primeira vez, instale o navegador do Playwright:

```bash
npx playwright install chromium
```

## Variáveis de ambiente

Prefixo importa neste projeto: **`PUBLIC_`** é o que o Astro embute no bundle que vai para o navegador — qualquer variável com esse prefixo vira pública, igual ao `VITE_` da era anterior (Vite puro). As chaves abaixo (YouTube, banco) não têm esse prefixo de propósito: só a Function serverless as lê, nunca o navegador. Foi exatamente um vazamento desse tipo que a issue #4 corrigiu.

Crie um `.env.local` — ver `.env.example` para a lista completa e os comentários de cada variável.

## YouTube

A busca dos vídeos do canal roda em `functions/api/videos.ts` (Cloudflare Pages Function), nunca no navegador.

```env
YOUTUBE_API_KEY=sua_chave_da_youtube_data_api
YOUTUBE_CHANNEL_ID=id_do_canal
YOUTUBE_HANDLE=mundoflavinha
YOUTUBE_MAX_RESULTS=
```

A página de vídeos usa as playlists do canal como categorias. Deixe `YOUTUBE_MAX_RESULTS` vazio para carregar todos os vídeos enviados pelo canal.

A home também consome `/api/videos`: a seção "Novo vídeo no canal" (`UltimoVideoCanal.astro`) busca a lista no navegador e troca o vídeo do facade estático pelo primeiro item (o mais recente — a lista já vem ordenada). Sem JS, com a busca falhando, ou em `astro dev` (onde `/api/videos` não existe), fica o vídeo fixo definido no componente como fallback.

A resposta de `/api/videos` fica em cache por 30 min na CDN da Cloudflare (`Cache-Control: s-maxage=1800`) — a maioria das visitas nem chega a chamar o YouTube, o que reduz o consumo de cota da API. As miniaturas passam por `/api/thumb` (proxy pelo próprio domínio) — o navegador nunca contata o Google diretamente para carregar `/videos`, só quando a pessoa autoriza conteúdo externo no banner de cookies e clica para assistir.

O pipeline (`channels.list` → `playlists.list` → uma `playlistItems.list` por playlist, para montar as categorias) faz 1 subrequisição HTTP por playlist do canal, mais 1 por página de 50 itens de upload — sem limite, isso cresce junto com o canal. Cloudflare Pages Functions no plano Free limitam a 50 subrequisições por invocação; um canal grande o bastante estoura esse teto e a function falha com um 502 genérico da borda (não um erro do nosso `catch`, que devolveria JSON). `fetchChannelVideos` (`src/lib/youtubeFetcher.ts`) se defende com um orçamento compartilhado de `ORCAMENTO_PADRAO_SUBREQUISICOES` (40) chamadas: busca os vídeos ANTES das categorias, então um canal que estoura o orçamento perde playlists de categorização (`"Todos"` continua valendo) antes de perder vídeos da lista.

## Captura de leads (Neon)

Os formulários de newsletter e de download de material gravam no Postgres do Neon via `functions/api/lead.ts` (Cloudflare Pages Function).

1. Rode, nesta ordem, no SQL Editor do projeto Neon:
   - `sql/migrations/001_lgpd.sql` — cria `contacts`, `consent_events` (prova de consentimento, append-only) e `material_requests`.
   - `sql/migrations/002_atribuicao.sql` — cria `schema_migrations` (controle de versão) e `lead_attributions`.
   - `sql/schema.sql` — cria as tabelas antigas (`newsletter_subscribers`, `lead_magnet_downloads`), mantidas só para não perder o histórico da fase anterior. A API atual não grava mais nelas.
2. Adicione ao `.env.local`:

```env
DATABASE_URL=postgresql://usuario:senha@SEU-HOST-pooler.../neondb?sslmode=require
```

Use o **Pooler host** do Neon (não o host direto) — a function é serverless e abre conexões curtas.

3. Configure a mesma `DATABASE_URL` nas Environment variables do projeto na Cloudflare Pages (Settings → Environment variables), no ambiente de Production. **Ela também é lida no build** (trava de schema, abaixo).
4. Para rodar a function localmente, use `wrangler pages dev` com um `.dev.vars` (`astro dev` não executa `functions/` — ver "Rodar localmente" acima).

### Materiais para download

Os botões "Baixar agora" apontam para o PDF declarado em `src/data/materiais.ts` — o catálogo único que também alimenta os cards de `/downloads` e da home. Os 4 arquivos reais já estão em `public/materiais/`:

- `jogo-da-reciclagem.pdf`
- `cada-tampinha-no-seu-lugar.pdf`
- `semaforo-do-toque.pdf`
- `colete-educativo.pdf`

### Operação LGPD (acesso, revogação, exclusão)

Queries prontas em `sql/lgpd-runbook.sql`: quem pode receber e-mail/WhatsApp, extrair dados de um titular (art. 18), registrar revogação, excluir titular com cascade.

### Migrations e deploy

Migrations **não** são aplicadas automaticamente, mas código incompatível com o banco **não vai ao ar**:

| | |
|---|---|
| **O que roda** | `npm run build` = `node scripts/verificar-schema.mjs && astro build` |
| **Quando impõe** | Build de produção da Cloudflare (`CF_PAGES=1`, branch `main`). Em dev, CI e preview só informa |
| **O que checa** | Todo arquivo de `sql/migrations/` presente no commit consta em `schema_migrations` |
| **Se faltar** | O build falha com `[schema] DEPLOY RECUSADO: migrations pendentes: …`, e a versão anterior continua no ar |
| **Checar à mão** | `DATABASE_URL=... npm run db:check` |

**Ordem de um deploy com migration nova:**

1. Aplicar a migration no Neon (SQL Editor ou `psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f sql/migrations/NNN_x.sql`). Migrations são aditivas e idempotentes: o código antigo continua funcionando.
2. `npm run db:check` → `[schema] ok`.
3. Merge na `main` → a Cloudflare builda, a trava passa, o deploy sai.

**Rollback:**

1. Código: Cloudflare Pages → Deployments → deploy anterior → *Rollback*. O código antigo roda com a tabela nova presente.
2. Schema (só se necessário; **apaga dados**): `sql/rollback/NNN_x.sql`. Com isso, o próximo deploy do código novo será recusado até reaplicar a migration.

**Detectar incompatibilidade em execução:** a gravação de atribuição é isolada do cadastro. Se o schema estiver atrasado, o lead é gravado mesmo assim e o log da function recebe `[schema-incompativel]` — busque por esse prefixo em Workers & Pages → Functions → Logs.

## Consentimento e tagging (GA4, Meta Pixel, GTM)

Desenho completo, mapeamentos e pendências: [`docs/adr/0001-tagueamento-e-consentimento.md`](docs/adr/0001-tagueamento-e-consentimento.md).

**Basic Consent Mode:** nenhuma requisição a Google, Meta ou GTM antes do consentimento correspondente. O `dataLayer` local existe desde o `<head>`, com os defaults negados.

```
componente → tagging.track(evento de domínio) → adaptador do modo → provider
```

Componentes **nunca** chamam `gtag`, `fbq` ou `dataLayer.push` — há teste.

### Modo de tagging

| `PUBLIC_TAGGING_MODE` | Carrega | Quando |
|---|---|---|
| `direct` | GA4 (Estatísticas) e Meta Pixel (Publicidade), direto | **Produção hoje** |
| `gtm` | Só o container; GA4/Meta vêm de dentro dele | Depois da auditoria do container |
| `disabled` | Nada | Preview, dev, emergência |

Configuração inválida **derruba o build** — por exemplo, `gtm` com `PUBLIC_GA_ENABLED=true`, que duplicaria cada pageview e conversão.

### Variáveis na Cloudflare Pages

**Production:**

```
PUBLIC_TAGGING_MODE=direct
PUBLIC_GA_ENABLED=true
PUBLIC_GA_ID=G-452LR8P42T
PUBLIC_META_PIXEL_ENABLED=true
PUBLIC_META_PIXEL_ID=<id numérico do Events Manager>
DATABASE_URL=<já existente>
```

**Preview:**

```
PUBLIC_TAGGING_MODE=disabled
```

Em build da Cloudflare, `PUBLIC_TAGGING_MODE` é obrigatória: sem ela o build falha, em vez de subir com o GA desligado. `PUBLIC_*` é embutido no build; mudar exige novo deploy. **Não** defina `PUBLIC_GTM_ENABLED` nem `PUBLIC_COOKIE_CONSENT_ENABLED` (removidas; o build recusa).

### Eventos

| Domínio | GA4 | Meta | dataLayer (gtm) |
|---|---|---|---|
| `lead_created` | `generate_lead` | `Lead` | `lead_created` |
| `video_started` / `video_progressed` (25/50/75) / `video_completed` | `video_start` / `video_progress` / `video_complete` | — | mesmo nome |

`lead_created` só sai quando o lead é real: **HTTP 201 ≠ conversão** (o sucesso falso antibot também responde 201). Vídeo não vai para a Meta.

### Atribuição

Campanha (`utm_*`) e identificadores de mídia (`fbclid`, `_fbp`, `_fbc`) são conceitos separados em tipo, política e coluna, gravados por envio em `lead_attributions`. Hoje os dois exigem Publicidade; para UTMs essa regra é **pendência jurídica** (ver ADR).

O servidor lê a **preferência declarada pelo navegador** (cookie do CMP, na revisão vigente). Não é prova de consentimento — o cookie é gravável pelo cliente. Ver ADR, Decisão 7.

### Testes

- `npm run build:e2e` gera `dist/` (direct), `dist-gtm/` e `dist-disabled/` com ids **de teste** (`e2e/ambientes.mjs`).
- O e2e intercepta Google/Meta com stubs e valida payload; o Chromium ainda roda com DNS desses hosts bloqueado. **Nenhum teste atinge endpoint real.**

### Checklist — antes de mudar `PUBLIC_TAGGING_MODE` de `direct` para `gtm`

Container: `GTM-WK9NJC7W` (do site anterior — **não assumir que o conteúdo está correto**).

- [ ] Auditar Tags
- [ ] Auditar Triggers
- [ ] Auditar Variables
- [ ] Confirmar GA4 Measurement ID (`G-452LR8P42T`)
- [ ] Confirmar Meta Pixel ID
- [ ] Remover/desativar configurações do site antigo
- [ ] Validar consentimento:
  - [ ] Tag GA4 com *consent check* `analytics_storage`
  - [ ] Tag Meta com *additional consent check* `ad_storage` (tag não-Google não respeita Consent Mode sozinha)
  - [ ] Tag Meta de revogação: `fbq('consent','revoke')` em trigger de `consent_updated` com `consent.marketing = denied`
  - [ ] Nenhuma tag com trigger "Consent Initialization" que dispare tracking
  - [ ] Built-in trigger "YouTube Video" **desligado** (o site já emite `video_*`)
- [ ] Validar page_view
- [ ] Validar generate_lead — trigger Custom Event `lead_created`; parâmetros de `lead.*`; `event_id`
- [ ] Validar Meta Lead — mesmo trigger; `eventID` = `event_id`
- [ ] Validar ausência de duplicidade — com `gtm` ativo, nenhum `gtag/js?id=` nem `fbevents.js` carregado fora do container
- [ ] Testar via GTM Preview / Tag Assistant, **com e sem** consentimento, e revogando no meio da página
- [ ] Trocar na Cloudflare (Production): `PUBLIC_TAGGING_MODE=gtm`, `PUBLIC_GTM_ID=GTM-WK9NJC7W`, **remover** `PUBLIC_GA_ENABLED` e `PUBLIC_META_PIXEL_ENABLED` (senão o build recusa) → novo deploy

## Dados institucionais e revisão jurídica

`src/lib/site.ts` centraliza razão social, CNPJ, endereço, e-mails de contato e `LEGAL_EM_REVISAO`. Enquanto esse flag for `true`, os textos legais (`Política de Privacidade`, `Termos de Uso`, `Contato`) ainda têm placeholders entre colchetes — substitua todos e vire o flag para `false` só depois de revisão jurídica. `src/test/placeholders.test.ts` trava qualquer combinação inconsistente entre os dois.

## Docker (opcional)

`docker-compose.yml` sobe o ambiente de dev (não é imagem de produção — o site é estático e vai para a Cloudflare Pages via `astro build`):

```bash
docker compose up
```

Porta 3002 no host → 4321 (`astro dev`) no container.

## Validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:html
npm run test:e2e
```

É a mesma sequência do CI (`.github/workflows/ci.yml`), que roda em todo push e PR contra `main`.
