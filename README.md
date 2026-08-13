# Mundo Flavinha

Aplicacao React + Vite + Tailwind.

## Rodar localmente

```bash
npm install
npm run dev
```

O servidor local sobe em:

```text
http://127.0.0.1:8081/
```

## YouTube

A busca dos videos do canal roda em `api/videos.ts` (Vercel Serverless Function), nunca no navegador — e por isso as variaveis abaixo **nao** tem prefixo `VITE_`. Colocar prefixo `VITE_` faria o Vite embutir a chave no bundle publico no build, que foi exatamente o problema da issue #4 (chave da YouTube Data API exposta pra qualquer visitante).

Crie um arquivo `.env.local` com:

```env
YOUTUBE_API_KEY=sua_chave_da_youtube_data_api
YOUTUBE_CHANNEL_ID=id_do_canal
YOUTUBE_HANDLE=mundoflavinha
YOUTUBE_MAX_RESULTS=
```

A pagina de videos usa as playlists do canal como categorias. Deixe `YOUTUBE_MAX_RESULTS` vazio para carregar todos os videos enviados pelo canal. Para rodar a function localmente, use `vercel dev` (o `npm run dev` do Vite nao executa `api/`).

A resposta de `/api/videos` fica em cache por 30 min na CDN da Vercel (`Cache-Control: s-maxage=1800`) — a maioria das visitas nem chega a chamar o YouTube, o que reduz o consumo de cota da API.

## Captura de leads (Neon)

Os formularios de newsletter e de download de material gravam no Postgres do Neon via `api/lead.ts` (Vercel Serverless Function).

1. Rode, nesta ordem, no SQL Editor do projeto Neon:
   - `sql/migrations/001_lgpd.sql` — cria `contacts`, `consent_events` (prova de consentimento, append-only) e `material_requests`. E o schema que a API usa hoje.
   - `sql/schema.sql` — cria as tabelas antigas (`newsletter_subscribers`, `lead_magnet_downloads`), mantidas só para nao perder o historico da fase anterior. A API atual nao grava mais nelas.
2. Adicione ao `.env.local`:

```env
DATABASE_URL=postgresql://usuario:senha@SEU-HOST-pooler.../neondb?sslmode=require
```

Use o **Pooler host** do Neon (nao o host direto) — a function e serverless e abre conexoes curtas.

3. Configure a mesma `DATABASE_URL` nas Environment Variables do projeto na Vercel (Production, Preview e Development).
4. Para rodar a function localmente, use `vercel dev` (o `npm run dev` do Vite nao executa `api/`).

### Materiais para download

Os botoes "Baixar agora" apontam para `/materiais/<slug>.pdf` (slug gerado a partir do nome do material). Suba os arquivos em `public/materiais/` com estes nomes:

- `jogo-da-reciclagem.pdf`
- `cada-tampinha-no-seu-lugar.pdf`
- `semaforo-do-toque.pdf`
- `colete-educativo.pdf`

### Operacao LGPD (acesso, revogacao, exclusao)

Queries prontas em `sql/lgpd-runbook.sql`: quem pode receber e-mail/WhatsApp, extrair dados de um titular (art. 18), registrar revogacao, excluir titular com cascade.

## Validacao

```bash
npm run lint
npm test
npm run build
```
