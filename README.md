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

Crie um arquivo `.env.local` com:

```env
VITE_YOUTUBE_API_KEY=sua_chave_da_youtube_data_api
VITE_YOUTUBE_CHANNEL_ID=id_do_canal
VITE_YOUTUBE_HANDLE=mundoflavinha
VITE_YOUTUBE_MAX_RESULTS=
```

A pagina de videos usa as playlists do canal como categorias. Deixe `VITE_YOUTUBE_MAX_RESULTS` vazio para carregar todos os videos enviados pelo canal.

## Captura de leads (Neon)

Os formularios de newsletter e de download de material gravam no Postgres do Neon via `api/lead.ts` (Vercel Serverless Function).

1. Rode `sql/schema.sql` uma vez no SQL Editor do projeto Neon (cria as tabelas `newsletter_subscribers` e `lead_magnet_downloads`).
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

## Validacao

```bash
npm run lint
npm test
npm run build
```
