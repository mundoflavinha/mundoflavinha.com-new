/**
 * Tipo compartilhado das recomendações de produto ("achadinhos").
 *
 * Os dados de cada faixa etária vivem em `achadinhos{02,35,68,Familia}.ts`,
 * ao lado deste arquivo. Antes moravam dentro das próprias páginas, e a
 * página `Indicacoes` importava de outras *páginas* para montar a listagem
 * agregada — acoplamento que o ESLint sinalizava e que quebrava o code
 * splitting (abrir /indicacoes puxava o componente das 4 outras rotas).
 */
export type Achadinho = {
  title: string;
  eyebrow?: string;
  description: string;
  recommendedAge: string;
  image: string;
  link?: string;
};
