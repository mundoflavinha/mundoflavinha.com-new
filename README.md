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

## Validacao

```bash
npm run lint
npm test
npm run build
```
