import LegalPage, { LegalSectionData } from "@/components/legal/LegalPage";
import { LegalHighlight, LegalLink, LegalList, LegalMailto, LegalP } from "@/components/legal/primitives";
import { CONTATO, CONTROLADOR, ROTAS_LEGAIS } from "@/lib/site";

const sections: LegalSectionData[] = [
  {
    id: "aceitacao",
    title: "Aceitação destes termos",
    content: (
      <LegalP>
        Ao navegar pelo mundoflavinha.com, baixar nossos materiais ou preencher nossos formulários, você concorda com
        estes Termos de Uso. Se não concordar com algum ponto, pedimos que não utilize o site.
      </LegalP>
    ),
  },
  {
    id: "o-que-e",
    title: "O que é o Mundo Flavinha",
    content: (
      <>
        <LegalP>
          O {CONTROLADOR.nomeFantasia} é um site de conteúdo sobre infância, brincadeiras e conexão em família. Aqui você
          encontra ideias de atividades, materiais gratuitos para imprimir, vídeos, artigos e recomendações de produtos.
        </LegalP>
        <LegalP>
          Nosso conteúdo tem caráter informativo e de entretenimento.{" "}
          <strong className="text-foreground">
            Não somos um serviço de aconselhamento médico, psicológico, pedagógico ou terapêutico.
          </strong>{" "}
          Para questões de saúde ou desenvolvimento do seu filho, procure um profissional qualificado.
        </LegalP>
      </>
    ),
  },
  {
    id: "seguranca-brincadeiras",
    title: "Segurança nas brincadeiras e atividades",
    content: (
      <>
        <LegalHighlight>
          <strong className="font-heading font-bold">
            Toda atividade sugerida aqui pressupõe supervisão de um adulto responsável, do começo ao fim.
          </strong>{" "}
          Quem conhece a criança, o ambiente e os riscos daquele momento é você — nenhuma sugestão nossa substitui esse
          julgamento.
        </LegalHighlight>
        <LegalP>Antes de realizar qualquer atividade, considere:</LegalP>
        <LegalList>
          <li>
            As faixas etárias indicadas são <strong className="text-foreground">sugestões gerais</strong>, não uma
            avaliação da sua criança. Crianças se desenvolvem em ritmos diferentes
          </li>
          <li>
            Várias atividades usam <strong className="text-foreground">objetos pequenos</strong> (tampinhas, palitos,
            botões, contas), que apresentam risco de asfixia — especialmente para menores de 3 anos
          </li>
          <li>
            Materiais como tesoura, cola, tinta, isopor e elásticos exigem manuseio adulto ou supervisão direta
          </li>
          <li>Verifique alergias, sensibilidades e a atoxicidade dos materiais utilizados</li>
          <li>Adapte ou abandone qualquer sugestão que não faça sentido para a sua realidade</li>
        </LegalList>
        <LegalP>
          Ao realizar as atividades, você assume a responsabilidade pela supervisão, pela escolha dos materiais e pela
          adequação da brincadeira à criança sob seus cuidados.
        </LegalP>
      </>
    ),
  },
  {
    id: "propriedade-intelectual",
    title: "Conteúdo e materiais: o que você pode fazer",
    content: (
      <>
        <LegalP>
          Textos, imagens, vídeos, ilustrações e materiais para download são de titularidade do{" "}
          {CONTROLADOR.nomeFantasia} ou usados sob autorização.
        </LegalP>
        <UsoDosMateriais />
      </>
    ),
  },
  {
    id: "materiais-gratuitos",
    title: "Materiais gratuitos e cadastro",
    content: (
      <>
        <LegalP>
          Para receber um material gratuito, pedimos nome e e-mail. Esses dados são necessários para liberar e enviar o
          arquivo — o tratamento está descrito na{" "}
          <LegalLink to={ROTAS_LEGAIS.privacidade}>Política de Privacidade</LegalLink>.
        </LegalP>
        <LegalP>
          Receber o material não exige aceitar comunicações de marketing: essas autorizações são separadas e opcionais.
        </LegalP>
        <LegalP>
          Ao preencher os formulários, você declara ser maior de 18 anos e que os dados informados são verdadeiros e
          seus. Não cadastre o contato de outra pessoa sem que ela saiba.
        </LegalP>
      </>
    ),
  },
  {
    id: "afiliados",
    title: "Links de afiliado e recomendações",
    content: (
      <>
        <LegalHighlight>
          Algumas recomendações de produtos usam links de afiliado da Amazon. Se você comprar por eles, o Mundo Flavinha
          pode receber uma comissão, <strong className="font-heading font-bold">sem nenhum custo adicional para
          você</strong>.
        </LegalHighlight>
        <LegalP>
          A comissão não influencia o que recomendamos — indicamos o que consideramos coerente com a proposta do site.
          Ainda assim, a decisão de compra é sua, e vale comparar preços e ler avaliações.
        </LegalP>
        <LegalP>
          Não somos responsáveis pela venda, entrega, qualidade, garantia ou pós-venda dos produtos, que são de
          responsabilidade do vendedor e da plataforma onde a compra é feita.
        </LegalP>
      </>
    ),
  },
  {
    id: "uso-permitido",
    title: "Uso permitido do site",
    content: (
      <>
        <LegalP>Ao usar o site, você concorda em não:</LegalP>
        <LegalList>
          <li>Copiar, revender ou redistribuir nossos materiais sem autorização</li>
          <li>Usar meios automatizados para extrair conteúdo em massa</li>
          <li>Tentar burlar, sobrecarregar ou comprometer o funcionamento do site</li>
          <li>Enviar dados falsos ou de terceiros nos formulários</li>
          <li>Utilizar o conteúdo para fins ilícitos ou que violem direitos de outras pessoas</li>
        </LegalList>
      </>
    ),
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade e conteúdo de terceiros",
    content: (
      <>
        <LegalP>
          Trabalhamos para manter o site disponível e o conteúdo correto e atualizado, mas não garantimos funcionamento
          ininterrupto nem ausência de erros. Podemos alterar, suspender ou encerrar seções do site a qualquer momento.
        </LegalP>
        <LegalP>
          O site incorpora conteúdo de terceiros, como vídeos do YouTube, e contém links para plataformas externas. Não
          controlamos esses serviços nem respondemos pela disponibilidade, pelo conteúdo ou pelas práticas deles.
        </LegalP>
      </>
    ),
  },
  {
    id: "responsabilidade",
    title: "Limitação de responsabilidade",
    content: (
      <LegalP>
        Nos limites permitidos pela lei, o {CONTROLADOR.nomeFantasia} não se responsabiliza por danos decorrentes do uso
        do site ou da realização das atividades sugeridas, especialmente quando não houver observado as orientações de
        segurança e supervisão descritas nestes termos. Nada aqui exclui direitos que a legislação consumerista
        brasileira assegure a você de forma inafastável.
      </LegalP>
    ),
  },
  {
    id: "alteracoes-termos",
    title: "Alterações, lei aplicável e contato",
    content: (
      <>
        <LegalP>
          Podemos atualizar estes Termos. A data e a versão vigentes ficam indicadas no topo desta página, e o uso
          continuado do site após a mudança significa concordância com a versão nova.
        </LegalP>
        <LegalP>
          Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro do domicílio do consumidor para dirimir
          eventuais controvérsias.
        </LegalP>
        <LegalP>
          Dúvidas sobre estes Termos: <LegalMailto email={CONTATO.email} /> ou pela nossa página de{" "}
          <LegalLink to={ROTAS_LEGAIS.contato}>Contato</LegalLink>.
        </LegalP>
      </>
    ),
  },
];

/** Extraído para manter o array de seções legível. Hoisted, então pode ser usado acima. */
function UsoDosMateriais() {
  return (
    <>
      <LegalP>Você pode, livremente:</LegalP>
      <LegalList>
        <li>Baixar, imprimir e usar nossos materiais gratuitos em casa, na sua sala de aula ou com as crianças sob seus cuidados</li>
        <li>Compartilhar o link das nossas páginas nas suas redes</li>
        <li>Citar trechos curtos com crédito e link para a fonte</li>
      </LegalList>
      <LegalP>Você não pode:</LegalP>
      <LegalList>
        <li>Vender, revender ou cobrar por nossos materiais gratuitos</li>
        <li>Redistribuir os arquivos em outros sites, grupos ou plataformas — compartilhe o link da página, não o arquivo</li>
        <li>Remover marcas, créditos ou assinatura dos materiais</li>
        <li>Apresentar nosso conteúdo como se fosse de sua autoria</li>
      </LegalList>
    </>
  );
}

const TermosDeUso = () => (
  <LegalPage
    title="Termos de Uso"
    subtitle="As regras para usar o site, baixar os materiais e realizar as atividades."
    bgColor="bg-mint/15"
    sections={sections}
  />
);

export default TermosDeUso;
