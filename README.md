# Mundo Flavinha

Site em [Astro](https://astro.build) (`output: 'static'`, sem adapter) + Tailwind. 31 rotas, 122 páginas geradas — a maior parte HTML puro, sem JS de framework. Só 3 pontos viram ilha React: o formulário de newsletter, o modal de captura de material gratuito e a galeria de `/videos`. O backend (`api/`) é Vercel Serverless Functions, escrito à parte do Astro.

## Rodar localmente

```bash
npm install
npm run dev
```

O servidor local (`astro dev`) sobe em:

```text
http://localhost:4321/
```

**`astro dev` não executa `api/`.** Ele nem tenta: fora do Astro, `api/*.ts` é só convenção de pasta que a Vercel reconhece no deploy. Pedir `/api/videos` ao `astro dev` devolve o *código-fonte* do arquivo como texto (o dev server do Vite serve qualquer arquivo do projeto por caminho), não o handler executado — e `/api/lead` cai direto no 404 do site. Para rodar as functions de verdade em localhost, use `vercel dev` (ele builda `api/` e Astro juntos).

## Scripts

```bash
npm run dev         # astro dev — o site, sem api/
npm run build       # astro build — gera dist/
npm run preview     # astro preview — serve o build de dist/ localmente
npm run typecheck   # astro check (inclui .astro) + tsc sobre api/
npm run lint        # eslint . — cobre .ts/.tsx/.astro/configs
npm test            # vitest — testes unitários (dados, Zod, consentimento)
npm run test:html   # vitest — asserções sobre o HTML real em dist/ (exige build antes)
npm run test:e2e    # playwright — hidratação, foco/teclado, consentimento de cookies
```

`test:e2e` builda `dist/` sozinho quando rodado fora de CI. Antes da primeira vez, instale o navegador do Playwright:

```bash
npx playwright install chromium
```

## Variáveis de ambiente

Prefixo importa neste projeto: **`PUBLIC_`** é o que o Astro embute no bundle que vai para o navegador — qualquer variável com esse prefixo vira pública, igual ao `VITE_` da era anterior (Vite puro). As chaves abaixo (YouTube, banco) não têm esse prefixo de propósito: só a Function serverless as lê, nunca o navegador. Foi exatamente um vazamento desse tipo que a issue #4 corrigiu.

Crie um `.env.local` — ver `.env.example` para a lista completa e os comentários de cada variável.

## YouTube

A busca dos vídeos do canal roda em `api/videos.ts` (Vercel Serverless Function), nunca no navegador.

```env
YOUTUBE_API_KEY=sua_chave_da_youtube_data_api
YOUTUBE_CHANNEL_ID=id_do_canal
YOUTUBE_HANDLE=mundoflavinha
YOUTUBE_MAX_RESULTS=
```

A página de vídeos usa as playlists do canal como categorias. Deixe `YOUTUBE_MAX_RESULTS` vazio para carregar todos os vídeos enviados pelo canal.

A resposta de `/api/videos` fica em cache por 30 min na CDN da Vercel (`Cache-Control: s-maxage=1800`) — a maioria das visitas nem chega a chamar o YouTube, o que reduz o consumo de cota da API. As miniaturas passam por `/api/thumb` (proxy pelo próprio domínio) — o navegador nunca contata o Google diretamente para carregar `/videos`, só quando a pessoa autoriza conteúdo externo no banner de cookies e clica para assistir.

## Captura de leads (Neon)

Os formulários de newsletter e de download de material gravam no Postgres do Neon via `api/lead.ts` (Vercel Serverless Function).

1. Rode, nesta ordem, no SQL Editor do projeto Neon:
   - `sql/migrations/001_lgpd.sql` — cria `contacts`, `consent_events` (prova de consentimento, append-only) e `material_requests`. É o schema que a API usa hoje.
   - `sql/schema.sql` — cria as tabelas antigas (`newsletter_subscribers`, `lead_magnet_downloads`), mantidas só para não perder o histórico da fase anterior. A API atual não grava mais nelas.
2. Adicione ao `.env.local`:

```env
DATABASE_URL=postgresql://usuario:senha@SEU-HOST-pooler.../neondb?sslmode=require
```

Use o **Pooler host** do Neon (não o host direto) — a function é serverless e abre conexões curtas.

3. Configure a mesma `DATABASE_URL` nas Environment Variables do projeto na Vercel (Production, Preview e Development).
4. Para rodar a function localmente, use `vercel dev` (`astro dev` não executa `api/` — ver "Rodar localmente" acima).

### Materiais para download

Os botões "Baixar agora" apontam para o PDF declarado em `src/data/materiais.ts` — o catálogo único que também alimenta os cards de `/downloads` e da home. Suba os arquivos reais em `public/materiais/`:

- `jogo-da-reciclagem.pdf`
- `cada-tampinha-no-seu-lugar.pdf`
- `semaforo-do-toque.pdf`
- `colete-educativo.pdf`

**Hoje esses 4 arquivos são placeholders de marcação** (gerados por `scripts/gerar-pdfs-placeholder.mjs`, cada um dizendo "ARQUIVO DE TESTE" bem grande) — o funil de captura funciona de ponta a ponta, mas quem baixar recebe o aviso, não o material. `npm test` imprime um lembrete a cada execução enquanto isso não for trocado. Depois de subir os PDFs reais, apague o script.

### Operação LGPD (acesso, revogação, exclusão)

Queries prontas em `sql/lgpd-runbook.sql`: quem pode receber e-mail/WhatsApp, extrair dados de um titular (art. 18), registrar revogação, excluir titular com cascade.

## Consentimento de cookies e Google Analytics

O banner (`vanilla-cookieconsent`) e o Analytics ficam em `src/components/ConsentimentoCookies.astro` e `src/components/GoogleAnalytics.astro`. Bloqueio prévio de verdade: sem `PUBLIC_GA_ID` no build, nenhuma tag do Google entra no HTML — nem inerte. Com a variável, a tag nasce como `type="text/plain"` e só é promovida a executável quando a pessoa aceita a categoria "Estatísticas".

**Este consentimento é diferente do consentimento de formulário** (`src/lib/consent.ts`, `consent_events` no banco) — são dois registros com bases legais distintas e não devem se misturar. Ver o comentário no topo de `src/lib/cookies.ts`.

Configure `PUBLIC_GA_ID` (formato `G-XXXXXXXXXX`) só no ambiente **Production** da Vercel — deixe vazio em Preview e Development, senão a medição fica contaminada com tráfego de teste.

## Dados institucionais e revisão jurídica

`src/lib/site.ts` centraliza razão social, CNPJ, endereço, e-mails de contato e `LEGAL_EM_REVISAO`. Enquanto esse flag for `true`, os textos legais (`Política de Privacidade`, `Termos de Uso`, `Contato`) ainda têm placeholders entre colchetes — substitua todos e vire o flag para `false` só depois de revisão jurídica.

## Docker (opcional)

`docker-compose.yml` sobe o ambiente de dev (não é imagem de produção — o site é estático e vai para a Vercel via `astro build`):

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
