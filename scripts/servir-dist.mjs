#!/usr/bin/env node
/**
 * Servidor estático de `dist/`, em primeiro plano.
 *
 * Existe porque `astro preview` desta versão SEMPRE vira daemon: o processo sai
 * assim que sobe o servidor, e ainda ignora `--port` quando já existe um daemon
 * de outra execução. Os dois comportamentos quebram o `webServer` do Playwright,
 * que precisa de um processo que fique vivo e de uma porta previsível — no CI
 * isso apareceria como "Process from config.webServer exited early", sem
 * relação aparente com o teste que falhou.
 *
 * Reproduz as convenções de build do projeto (`astro.config.mjs`):
 *   - `build.format: "directory"` → /downloads serve dist/downloads/index.html
 *   - `trailingSlash: "never"`    → /downloads/ redireciona para /downloads
 *   - rota inexistente            → dist/404.html com status 404
 *
 * Uso: node scripts/servir-dist.mjs [porta]
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const PORTA = Number(process.argv[2] ?? 4322);
const DIST = join(process.cwd(), "dist");

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

const entregar = (res, caminho, status = 200) => {
  res.writeHead(status, { "content-type": TIPOS[extname(caminho)] ?? "application/octet-stream" });
  createReadStream(caminho).pipe(res);
};

const arquivo = (caminho) => existsSync(caminho) && statSync(caminho).isFile();

createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORTA}`);
  const rota = decodeURIComponent(url.pathname);

  // trailingSlash: "never" — canonical sem barra final, como o site em produção.
  if (rota.length > 1 && rota.endsWith("/")) {
    res.writeHead(308, { location: rota.slice(0, -1) + url.search });
    return res.end();
  }

  // `normalize` antes de juntar: bloqueia "../" tentando sair de dist/.
  const relativo = normalize(rota).replace(/^(\.\.[/\\])+/, "");
  const base = join(DIST, relativo);

  if (arquivo(base)) return entregar(res, base);
  if (arquivo(join(base, "index.html"))) return entregar(res, join(base, "index.html"));

  const paginaDe404 = join(DIST, "404.html");
  if (arquivo(paginaDe404)) return entregar(res, paginaDe404, 404);

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("404");
}).listen(PORTA, () => {
  console.log(`dist/ em http://localhost:${PORTA}`);
});
