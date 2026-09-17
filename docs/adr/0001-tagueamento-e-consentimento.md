# ADR 0001 — Tagging (GA4, Meta Pixel, GTM) sob Basic Consent Mode

- **Status:** aceito (revisão 2)
- **Data:** 2026-09-16
- **Revisão 2:** modo único de tagging, eventos de domínio, separação campanha × identificadores de mídia, trava de schema, CI isolado da produção.

## Arquitetura

```
                         ┌─────────────────┐
                         │  CMP (banner)   │   vanilla-cookieconsent, cookie próprio
                         └────────┬────────┘
                                  │ onConsent / onChange
                                  ▼
                       EstadoDeConsentimento { analytics, marketing }
                                  │
                                  ▼
componente ── tagging.track(evento de domínio) ──> src/lib/tagging/index.ts
                                  │
                   PUBLIC_TAGGING_MODE (build) escolhe UM adaptador
                 ┌────────────────┼──────────────────┐
              direct             gtm             disabled
           ┌────┴────┐            │                  │
          GA4       Meta      dataLayer            (nada)
       (analytics) (marketing)    │
                                  ▼
                         GTM [após consentimento]
                                  │
                              providers
```

| Arquivo | Papel |
|---|---|
| `tagging/configuracao.ts` | Validação pura. Usada no build (derruba) e no navegador |
| `tagging/eventos.ts` | Eventos de domínio. Sem vocabulário de vendor, sem dado pessoal |
| `tagging/traducao.ts` | Domínio → GA4 / Meta / dataLayer. Pura |
| `tagging/consentimento.ts` | Estado e mapeamento para Consent Mode v2 |
| `tagging/adaptadores/*` | `direct`, `gtm`, `disabled` — um ativo por página |
| `tagging/vendors/*` | Único código que toca `gtag`, `fbq`, `dataLayer`, URLs de vendor |

Nenhum arquivo fora de `src/lib/tagging/` chama `gtag(`, `fbq`, `dataLayer.push`, referencia URL de vendor ou importa `vendors/`/`adaptadores/`. Teste: `src/test/tagging.test.ts`.

## Decisão 1 — Modo único e mutuamente exclusivo

`PUBLIC_TAGGING_MODE` ∈ `direct` | `gtm` | `disabled`.

**Problema do desenho anterior:** flags independentes permitiam `GTM + GA4 direto + Meta direto`. Pior, o código já tinha o bug: o GA direto era excluído quando o GTM estava ligado, mas o Pixel não.

**Como é impedido agora:**

1. **Por tipo.** `ConfiguracaoDeTagging` é união discriminada; só o ramo `direct` tem campos de GA4 e Meta. "GTM com GA4 direto" não é representável.
2. **Por validação no build.** `astro.config.mjs` chama `resolverConfiguracao`; combinação inválida lança erro e derruba `astro dev` e `astro build`. Na Cloudflare, build quebrado = deploy não acontece.
3. **Por invariante testada.** Um teste varre o produto cartesiano das variáveis e exige que nenhuma configuração válida tenha GTM junto com provider direto.
4. **Em execução.** Um único adaptador é instanciado.

**Regras de validação:**

| Situação | Resultado |
|---|---|
| Modo vazio, local/CI | `disabled` |
| Modo vazio, build Cloudflare (`CF_PAGES=1`) | **erro** — senão subir este código desligaria o GA4 de produção em silêncio |
| Valor desconhecido (`GTM`, `drect`) | erro |
| `gtm` + `PUBLIC_GA_ENABLED=true` ou `PUBLIC_META_PIXEL_ENABLED=true` | erro |
| `gtm` sem `PUBLIC_GTM_ID` ou com formato inválido | erro |
| `direct` com flag ligada sem id, ou id com formato inválido | erro |
| `direct` sem nenhum provider | erro — a intenção é `disabled` |
| `direct` com `PUBLIC_GTM_ID` preenchido | ok, com **aviso** (container em auditoria) |
| `disabled` + qualquer outra coisa | ok — botão de emergência não pode exigir faxina |
| `PUBLIC_GTM_ENABLED` ou `PUBLIC_COOKIE_CONSENT_ENABLED` definidas | erro, com instrução de migração |
| Booleano diferente de `"true"`/`"false"` | erro |

**Removido:** `PUBLIC_COOKIE_CONSENT_ENABLED` — era um segundo kill switch com o mesmo efeito de `disabled`.

## Decisão 2 — Basic Consent Mode

Nenhuma requisição a Google, Meta ou GTM antes do consentimento correspondente. O `dataLayer` local pode existir desde o `<head>` (com os defaults negados); requisição externa, não.

| Modo | Estatísticas | Publicidade | Carrega |
|---|---|---|---|
| direct | ✓ | — | gtag.js |
| direct | — | ✓ | fbevents.js |
| direct | ✓ | ✓ | gtag.js + fbevents.js |
| gtm | ✓ | — | gtm.js (só) |
| gtm | — | ✓ | gtm.js (só) |
| qualquer | — | — | nada |

**Por que não Advanced:** com consentimento negado, o Advanced carrega as tags e manda pings "sem cookie" com timestamp, user-agent, referrer e URL. Contradiz o botão "Recusar", e não é auditável de fora. No Basic, a auditoria é abrir o DevTools e ver zero requisição.

### Revogação

- **direct / GA4:** `consent update: denied` sozinho **não** para o gtag.js já carregado — ele passaria a mandar pings sem cookie (comportamento de Advanced) e o enhanced measurement continuaria. Por isso a revogação também põe `window['ga-disable-<ID>'] = true`, o opt-out oficial que corta todo hit.
- **direct / Meta:** `fbq('consent', 'revoke')`. O Pixel não pode ser descarregado; é o único freio.
- **gtm:** o site empurra `consent update` (Google) e `{event: 'consent_updated', consent: {...}}`. Parar tags dentro do container é **configuração do container** (ver checklist). É o risco residual principal do modo `gtm`.
- **Todos os modos:** o adaptador confere o consentimento a cada evento; depois da revogação, nada novo é enviado.
- Cookies `_ga*` e `_fb*` são apagados pelo `autoClearCookies` do CMP, a partir do catálogo em `src/lib/cookies.ts`.

### Eventos anteriores ao consentimento são descartados

Nos dois modos. No modo `gtm` isso é essencial: se o `lead_created` entrasse no `dataLayer` antes do aceite, o container, ao carregar depois do clique, reprocessaria o `dataLayer` inteiro e dispararia a conversão retroativamente. O mesmo evento teria destinos diferentes conforme o modo, e a aplicação deixaria de ser independente da estratégia.

## Decisão 3 — Consent Mode v2: mapeamento

| Categoria do CMP | Sinais do Google |
|---|---|
| Necessários (sempre) | `functionality_storage`, `security_storage` = granted |
| Estatísticas (`analytics`) | `analytics_storage` |
| Publicidade (`marketing`) | `ad_storage`, `ad_user_data`, `ad_personalization` |
| Conteúdo externo | — (controla só o YouTube) |

Os três sinais de publicidade andam juntos porque a categoria "Publicidade" descreve medição de anúncio **e** remarketing num único texto. Se o banner separar essas finalidades, `ad_personalization` ganha categoria própria e só `sinaisDoGoogle()` muda.

Google Ads não está ativo; os sinais já são enviados para que ativá-lo não exija redesenho.

Supressão por superfície: `initConsent({ enableMarketing })`. O site público passa `true`. Uma futura área logada passaria `false`, já que o cookie do CMP pode ser compartilhado entre subdomínios.

## Decisão 4 — Eventos de domínio

| Domínio | GA4 (direct) | Meta (direct) | dataLayer (gtm) |
|---|---|---|---|
| `lead_created` | `generate_lead` | `Lead` | `{event: 'lead_created', event_id, lead: {...}}` |
| `video_started` | `video_start` | — | `{event: 'video_started', event_id, video: {...}}` |
| `video_progressed` (25/50/75) | `video_progress` | — | `{event: 'video_progressed', ..., video: {percent}}` |
| `video_completed` | `video_complete` | — | `{event: 'video_completed', ...}` |

- Cada ocorrência recebe `id` único em `track()`. Ele vai como `event_id` ao GA4 e como `eventID` ao Pixel, a chave de deduplicação caso a Conversions API entre.
- No dataLayer, os dados vão aninhados por assunto (`lead`, `video`), porque o GTM **mescla** pushes: um `material_name` solto vazaria para o próximo evento.
- Nenhum evento carrega dado pessoal. Os tipos não têm campo para isso, e há teste.

### Vídeo não vai para a Meta (revisão da decisão anterior)

A revisão 1 mandava `ViewContent` a cada play. Removido. `ViewContent` significa "viu a página de um item" e alimenta a otimização como sinal de intenção. Play num vídeo educativo não é isso: a campanha aprenderia a buscar quem dá play, não quem se cadastra. Se houver campanha de vídeo, o sinal é desenhado para ela.

### Progresso sem 100

Os marcos são 25/50/75; o fim é `video_completed`. Um `progress 100` seguido de `complete` contaria o mesmo fato duas vezes.

### "Iniciado" é o player tocando

A revisão 1 disparava ao montar o iframe. Autoplay bloqueado pelo navegador contava como vídeo assistido.

### Como o estado do player é lido

Via `postMessage` com o embed `youtube-nocookie.com` (`enablejsapi=1`), sem `youtube.com/iframe_api`. O script oficial é uma requisição a `youtube.com`, fora do modo nocookie que a Política promete, e leva cookies de quem está logado. **Risco aceito:** o formato das mensagens não é documentado publicamente. Se mudar, a medição de vídeo para; nada vaza. O parser é isolado e testado.

## Decisão 5 — `lead_created` não confia no HTTP 201

`/api/lead` responde 201 também no **sucesso falso** (preenchimento fora da janela de tempo), para o bot não aprender. `lead_created` só é emitido quando `representaLeadCriado()` é verdadeiro, e ela usa `caiuNoSucessoFalso`, a mesma função da API, importada e nunca recopiada. A API não devolve "não gravei" porque isso permitiria busca binária nos limiares.

**Defeito corrigido nesta revisão** (existia em produção): honeypot preenchido reprovava o schema atual (`max(0)`), caía no **schema legado**, que ignora `hp`, e o bot era **gravado com consentimento de e-mail marketing fabricado** (`"[registro legado]"`, `concedido`). Agora o honeypot é checado antes de qualquer schema, e payload com `consentVersion` ou `origem` nunca é resgatado pelo legado.

## Decisão 6 — Campanha × identificadores de mídia

| | Campanha | Identificadores de mídia |
|---|---|---|
| Campos | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | `fbclid`, `_fbp`, `_fbc` (jsonb; `gclid` etc. sem migration) |
| Significado | de onde o lead veio; escrito por nós no link | identificador de clique/navegador emitido por plataforma de anúncio |
| Política | `podeGuardarCampanha()` | `podeGuardarIdentificadoresDeMidia()` |
| Regra hoje | exige Publicidade — **pendência jurídica** | exige Publicidade |

Tipos, colunas, funções de política e coleta são separados. Hoje as duas políticas têm o mesmo corpo, mas continuam funções distintas: cada uma muda por motivo próprio.

Gravação em `lead_attributions`, **uma linha por envio**. A revisão 1 gravava em `contacts` com `coalesce` e perdia todo toque depois do primeiro. A gravação roda em statement separado do lead: se falhar, o lead fica preservado e o log recebe `[atribuicao]` ou `[schema-incompativel]`.

## Decisão 7 — O que "consentimento no servidor" significa, de fato

**A revisão 1 descreveu isto como "consentimento verificado no servidor". Estava errado.**

| Pergunta | Resposta factual |
|---|---|
| Fonte de verdade | O cookie `mundoflavinha_cookie_consent`, escrito pelo CMP via `document.cookie` |
| Como chega ao backend | No cabeçalho `Cookie` da requisição a `/api/lead` (mesma origem, `SameSite=Lax`). O corpo **não** carrega flag de consentimento |
| Pode ser adulterado? | **Sim.** Não é HttpOnly nem assinado. Quem controla o navegador escreve o que quiser |
| Versão associada? | Sim: o cookie tem `revision`. O servidor agora **rejeita** revisão diferente de `REVISAO_COOKIES` (antes ignorava) |
| O que é verificável | Que a requisição trouxe uma preferência bem formada, da revisão vigente, com tais categorias e tal data declarada |
| O que não é verificável | Que uma pessoa clicou em "Aceitar". Isso exigiria registrar o clique no servidor, o que o projeto não faz para cookies (faz para formulários, em `consent_events`) |

**Terminologia adotada:** *preferência declarada pelo navegador, lida no servidor*.

**Por que ainda vale ler do cookie:** é o mesmo estado que decide carregar as tags, o que mantém persistência e tagging coerentes; e um bug no front que mande identificador sem consentimento não chega ao banco. Contra adulteração deliberada não protege, mas o dano é limitado: quem adultera só altera a própria preferência.

**Modelo de dados:** `preferencia_revisao`, `preferencia_categorias`, `preferencia_registrada_em`, com nomes que não sugerem prova. **Não** grava o `consentId` do CMP: ele vincularia o lead a um identificador de navegador sem acrescentar prova (minimização).

## Decisão 8 — Migrations não podem virar dependência manual silenciosa

**Contexto:** migrations aplicadas à mão, sem tabela de versão. A Cloudflare publica pela integração Git, independente do GitHub Actions, então o CI não consegue barrar o deploy.

**Mecanismo:**

1. `schema_migrations` (criada pela 002, com linha de base da 001 condicionada à existência das tabelas).
2. Toda migration registra a própria versão (teste exige).
3. `npm run build` = `node scripts/verificar-schema.mjs && astro build`. Em build de **produção da Cloudflare** (`CF_PAGES=1` e branch `main`), o script exige que **todo arquivo de `sql/migrations/` do commit** conste em `schema_migrations`. Se faltar algo, o build falha e o deploy anterior continua no ar.
4. Migrations são **aditivas**, aplicadas **antes** do deploy, com o código antigo ainda rodando.
5. Escrita tolerante: a atribuição é isolada e loga `[schema-incompativel]` (Postgres 42P01/42703), sem derrubar o cadastro.

**Rejeitado:** migração automática no build. Seria DDL com a credencial da aplicação, disparável por builds de preview, com risco de migration aplicada seguida de build falho.

**Rollback:** reverter o código pela Cloudflare (o código antigo roda com a tabela nova presente). Só então, se preciso, `sql/rollback/002_atribuicao.sql`, que apaga dados.

## Decisão 9 — CI nunca toca GA4/Meta reais

- `e2e/ambientes.mjs` é a fonte única dos builds de teste, com ids `G-TEST…`, `GTM-TEST…` e pixel `1000000000…`.
- `scripts/build-e2e.mjs` gera `dist/` (direct), `dist-gtm/` e `dist-disabled/`, definindo **todas** as variáveis de tagging explicitamente (senão um `.env` local vazaria).
- `e2e/fixtures.ts` intercepta os hosts de medição e responde com **stubs** que reproduzem o contrato usado pelo código e gravam as chamadas. O e2e valida o **payload**.
- `playwright.config.ts` roda o Chromium com `--host-resolver-rules` derrubando o DNS desses hosts (verificado: `fetch` sem fixture falha).
- Testes de regressão: nenhum id de produção em `ci.yml`, `ambientes.mjs`, `playwright.config.ts`, `build-e2e.mjs`; todo spec importa `./fixtures`; o CI usa `build:e2e`.

## Pendências

1. **JURÍDICA — UTMs sem consentimento de Publicidade.** Podem ser gravadas junto ao lead por outra base legal (ex.: legítimo interesse), com menção na Política? Até a decisão, exigem Publicidade. Se liberadas: `podeGuardarCampanha` e o texto da Política.
2. **JURÍDICA — UTM de entrada entre páginas.** Hoje só a URL da página do envio é lida. Quem chega por `?utm_source=partner-helena` e navega antes de se cadastrar perde a origem. Guardar a UTM de entrada exige `sessionStorage`, que é armazenamento no dispositivo e depende da mesma decisão.
3. **JURÍDICA — Texto da Política.** A seção de cookies já descreve o Meta Pixel (categoria Publicidade, `_fbp`/`_fbc`), mas o texto foi escrito junto com o código e não passou por revisão jurídica — e `LEGAL_EM_REVISAO` está `false`, então nada no site sinaliza isso. A Política **não** menciona a gravação de UTMs e identificadores de mídia (`fbclid`, `_fbp`, `_fbc`) junto ao cadastro em `lead_attributions`.
4. **GA4 — desligar "Video engagement"** no enhanced measurement. Com `enablejsapi=1`, o GA4 rastreia o embed sozinho, com os mesmos nomes de evento, e duplicaria.
5. **GTM** — auditoria antes de `gtm` (checklist no README).

## Alternativa rejeitada — carregar `GTM-WK9NJC7W` como está

O container é do site anterior e seu conteúdo não foi auditado. Carregá-lo traria tags que não constam do catálogo em `cookies.ts`, e a Política passaria a declarar menos do que o site faz. É configurável, mas produção permanece em `direct` até a auditoria.
