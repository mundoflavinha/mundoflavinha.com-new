import type { APIRoute } from "astro";
import { indiceBrincadeiras } from "@/lib/indiceBrincadeiras";

/**
 * Índice das brincadeiras como arquivo estático.
 *
 * Sob `output: "static"` isto é pré-renderizado no build — vira um .json na
 * pasta de saída, servido pelo CDN como qualquer outro asset. Não há função
 * nem runtime envolvido.
 *
 * Existe para a busca do header não precisar carregar o índice inline. O header
 * está nas 31 rotas; embutir o JSON no HTML cobraria o peso de todo mundo em
 * toda visita, para uma busca que a maioria nunca abre. Assim o custo só chega
 * a quem clica na lupa, e o navegador ainda cacheia entre navegações.
 */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(indiceBrincadeiras), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
