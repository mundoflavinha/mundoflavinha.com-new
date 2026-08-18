# Ambiente de desenvolvimento local. Não é imagem de produção — o site é
# estático e vai para a Vercel via `astro build`.
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Porta padrão do Astro dev (o Vite usava 8081).
EXPOSE 4321

# `--host` é obrigatório em container: sem ele o Astro escuta só em localhost
# de dentro do container e a porta publicada não responde de fora.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
