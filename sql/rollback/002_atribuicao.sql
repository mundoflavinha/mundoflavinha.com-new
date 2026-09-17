-- Rollback de 002_atribuicao.
--
-- ORDEM OBRIGATÓRIA:
--   1. Reverter o CÓDIGO primeiro (Cloudflare Pages → Deployments → Rollback).
--      O código anterior não conhece `lead_attributions` e roda normalmente
--      com a tabela presente — a migration é aditiva.
--   2. Só então, SE for necessário remover os dados, rodar isto.
--
-- Rodar isto com o código novo no ar não derruba cadastros (a gravação de
-- atribuição é isolada e registra `[schema-incompativel]` no log), mas a
-- atribuição deixa de ser gravada. E o PRÓXIMO deploy do código novo será
-- recusado pela trava de schema até a 002 ser reaplicada.
--
-- APAGA DADOS de atribuição de forma irreversível.

begin;
drop table if exists lead_attributions;
delete from schema_migrations where versao = '002_atribuicao';
commit;
