import LegalPage, { LegalSectionData } from "@/components/legal/LegalPage";
import {
  LegalExternalLink,
  LegalHighlight,
  LegalLink,
  LegalList,
  LegalMailto,
  LegalP,
  LegalSubtitle,
  LegalTable,
} from "@/components/legal/primitives";
import { CONTATO, CONTROLADOR, OPERADORES, ROTAS_LEGAIS } from "@/lib/site";

const sections: LegalSectionData[] = [
  {
    id: "quem-somos",
    title: "Quem é responsável pelos seus dados",
    content: (
      <>
        <LegalP>
          O <strong className="text-foreground">{CONTROLADOR.nomeFantasia}</strong> é o controlador dos dados pessoais
          tratados neste site — ou seja, é quem decide para que os dados são usados e responde por esse uso.
        </LegalP>
        <LegalList>
          <li>Razão social: {CONTROLADOR.razaoSocial}</li>
          <li>CNPJ: {CONTROLADOR.cnpj}</li>
          <li>Endereço: {CONTROLADOR.endereco}</li>
          <li>
            E-mail para assuntos de privacidade: <LegalMailto email={CONTATO.emailPrivacidade} />
          </li>
        </LegalList>
      </>
    ),
  },
  {
    id: "escopo",
    title: "A quem esta política se aplica",
    content: (
      <>
        <LegalP>
          Esta política vale para o site mundoflavinha.com e para os formulários dele. Ela não vale para os sites e
          aplicativos de terceiros que você acessa a partir daqui — como YouTube, Instagram, TikTok, WhatsApp e Amazon —,
          que têm políticas próprias.
        </LegalP>
        <LegalP>
          Este site é dirigido a <strong className="text-foreground">pessoas adultas</strong>: mães, pais, responsáveis e
          educadores. Ele não é destinado ao uso direto por crianças. Veja a seção sobre crianças e adolescentes mais
          abaixo.
        </LegalP>
      </>
    ),
  },
  {
    id: "dados-coletados",
    title: "Quais dados coletamos",
    content: (
      <>
        <LegalSubtitle>Dados que você nos fornece</LegalSubtitle>
        <LegalP>Somente quando você preenche um dos nossos formulários:</LegalP>
        <LegalList>
          <li>
            <strong className="text-foreground">Nome</strong> — para nos dirigirmos a você
          </li>
          <li>
            <strong className="text-foreground">E-mail</strong> — para liberar o material e, se você autorizar, enviar
            novidades
          </li>
          <li>
            <strong className="text-foreground">WhatsApp</strong> — opcional. Só coletamos se você preencher, e só
            usamos para mensagens se você marcar essa autorização
          </li>
          <li>
            <strong className="text-foreground">Faixa etária de interesse</strong> — opcional. É a sua preferência de
            conteúdo (0 a 2, 3 a 5, 6 a 8 anos ou brincadeiras em família), não um dado sobre uma criança específica
          </li>
          <li>
            <strong className="text-foreground">Perfil</strong> — opcional. Se você é mãe/pai, avó/avô, educador(a) ou
            outro, para enviarmos conteúdo mais adequado
          </li>
        </LegalList>

        <LegalSubtitle>Dados coletados automaticamente</LegalSubtitle>
        <LegalP>
          Quando você envia um formulário, registramos também o endereço IP, o navegador utilizado (user-agent), a data
          e hora e a página de origem. Isso serve para dois fins: comprovar que o consentimento foi dado e proteger o
          site contra envios automatizados e abuso.
        </LegalP>
        <LegalP>
          Nossos provedores de hospedagem também mantêm registros técnicos de acesso, conforme descrito na seção sobre
          compartilhamento.
        </LegalP>

        <LegalSubtitle>O que não coletamos</LegalSubtitle>
        <LegalList>
          <li>Não pedimos CPF, RG, endereço residencial nem dados bancários</li>
          <li>Não coletamos nome, idade exata, data de nascimento, foto ou escola de nenhuma criança</li>
          <li>Não usamos ferramentas de analytics, pixels de publicidade ou rastreadores de comportamento</li>
        </LegalList>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "Para que usamos seus dados e com qual base legal",
    content: (
      <>
        <LegalP>
          A LGPD exige que todo tratamento de dados tenha uma finalidade específica e uma base legal. As nossas são
          estas:
        </LegalP>
        <LegalTable
          headers={["O que fazemos", "Dados usados", "Base legal (Lei 13.709/2018)"]}
          rows={[
            [
              "Liberar e enviar o material gratuito que você pediu",
              "Nome, e-mail",
              "Execução de procedimento preliminar a seu pedido (art. 7º, V)",
            ],
            [
              "Enviar novidades, brincadeiras e materiais por e-mail",
              "Nome, e-mail, faixa etária, perfil",
              "Seu consentimento (art. 7º, I)",
            ],
            ["Enviar mensagens por WhatsApp", "Nome, WhatsApp", "Seu consentimento (art. 7º, I)"],
            [
              "Comprovar que o consentimento foi dado",
              "IP, user-agent, data/hora, texto aceito",
              "Cumprimento de obrigação legal e exercício regular de direitos (art. 7º, II e VI)",
            ],
            [
              "Proteger o site contra spam e envios automatizados",
              "IP (de forma codificada), data/hora",
              "Legítimo interesse na segurança do serviço (art. 7º, IX)",
            ],
          ]}
        />
        <LegalP>
          Não usamos seus dados para nenhuma finalidade além dessas, e não vendemos, alugamos nem cedemos sua base de
          contato para terceiros.
        </LegalP>
      </>
    ),
  },
  {
    id: "consentimento",
    title: "Como funciona o seu consentimento",
    content: (
      <>
        <LegalP>
          Nenhuma caixa de autorização vem marcada por padrão neste site. Você escolhe, separadamente, se quer receber
          e-mails e se quer receber mensagens no WhatsApp — e pode aceitar um e recusar o outro.
        </LegalP>
        <LegalHighlight>
          <strong className="font-heading font-bold">Baixar um material gratuito não exige aceitar receber
          publicidade.</strong>{" "}
          Precisamos do seu nome e e-mail para liberar o material que você pediu, e é só isso que é obrigatório.
        </LegalHighlight>
        <LegalP>
          Guardamos o texto exato que apareceu na sua tela no momento em que você autorizou, junto com a data, hora e
          versão do documento. Isso protege você tanto quanto a nós: se um dia houver dúvida sobre o que foi autorizado,
          existe um registro fiel — e não apenas a nossa palavra.
        </LegalP>
        <LegalSubtitle>Como retirar o consentimento</LegalSubtitle>
        <LegalP>
          A qualquer momento, sem precisar justificar, escreva para <LegalMailto email={CONTATO.emailPrivacidade} />{" "}
          pedindo para parar de receber e-mails, mensagens de WhatsApp, ou ambos. Retirar o consentimento não apaga
          automaticamente seu cadastro — se quiser a exclusão completa, peça também isso, e nós faremos.
        </LegalP>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    content: (
      <>
        <LegalP>
          Não vendemos seus dados. Eles são processados por empresas que nos prestam serviço de infraestrutura, na
          medida necessária para o site funcionar:
        </LegalP>
        <LegalTable
          headers={["Empresa", "Para que", "Onde fica"]}
          rows={OPERADORES.map((operador) => [operador.nome, operador.papel, operador.pais])}
        />
        <LegalP>
          Podemos também compartilhar dados quando formos legalmente obrigados, por ordem judicial ou requisição de
          autoridade competente.
        </LegalP>
        <LegalSubtitle>Transferência internacional</LegalSubtitle>
        <LegalP>
          Como você percebe na tabela acima, todos os nossos fornecedores de infraestrutura ficam fora do Brasil. Isso
          significa que seus dados são armazenados e processados no exterior, o que a LGPD permite mediante garantias
          adequadas (art. 33). Escolhemos fornecedores que adotam cláusulas contratuais de proteção de dados e padrões
          reconhecidos de segurança.
        </LegalP>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies e tecnologias semelhantes",
    content: (
      <>
        <LegalP>
          Cookies são pequenos arquivos que um site guarda no seu navegador. Nosso uso hoje é bastante limitado:
        </LegalP>
        <LegalTable
          headers={["Categoria", "Usamos?", "Detalhe"]}
          rows={[
            ["Necessários", "Sim, o mínimo", "Apenas o essencial para o site carregar e funcionar"],
            ["Preferências", "Não", "Não guardamos configurações de navegação"],
            ["Analíticos / estatísticas", "Não", "Não usamos Google Analytics nem ferramenta equivalente"],
            ["Publicidade / marketing", "Não", "Não usamos pixel do Meta, do TikTok nem de qualquer rede"],
          ]}
        />
        <LegalSubtitle>Vídeos do YouTube</LegalSubtitle>
        <LegalP>
          Nossos vídeos são hospedados no YouTube. Os players só são carregados{" "}
          <strong className="text-foreground">depois que você clica para assistir</strong>, e usamos o modo de
          privacidade ampliada do YouTube. Assim, enquanto você não clicar, o Google não recebe nada por meio do player.
        </LegalP>
        <LegalP>
          Precisamos ser transparentes sobre um ponto: na página de Vídeos, a lista e as miniaturas vêm dos servidores do
          Google assim que a página abre. Isso significa que, nessa página específica, o Google recebe o seu endereço IP
          e informações do navegador antes de qualquer clique. Estamos trabalhando para que essa consulta passe a ser
          feita pelo nosso servidor.
        </LegalP>
      </>
    ),
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    content: (
      <>
        <LegalList>
          <li>
            <strong className="text-foreground">Cadastro e contato:</strong> enquanto você quiser receber nossas
            comunicações. Se retirar o consentimento, excluímos em até 6 meses, salvo se precisarmos manter algo por
            obrigação legal
          </li>
          <li>
            <strong className="text-foreground">Registros de consentimento:</strong> por até 5 anos após o fim do
            relacionamento, porque é o que nos permite comprovar que a autorização existiu
          </li>
          <li>
            <strong className="text-foreground">Registros de proteção contra spam:</strong> algumas horas, e são
            descartados automaticamente
          </li>
        </LegalList>
        <LegalP>
          Se você pedir exclusão, apagamos seus dados dos nossos sistemas, mantendo apenas o registro de que o pedido
          existiu e foi atendido — sem os dados que identificam você.
        </LegalP>
      </>
    ),
  },
  {
    id: "direitos-do-titular",
    title: "Seus direitos",
    content: (
      <>
        <LegalP>A LGPD (art. 18) garante a você o direito de pedir, a qualquer momento:</LegalP>
        <LegalList>
          <li>Confirmação de que tratamos seus dados, e acesso a eles</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade</li>
          <li>Portabilidade dos seus dados a outro fornecedor</li>
          <li>Eliminação dos dados tratados com base no seu consentimento</li>
          <li>Informação sobre com quem compartilhamos seus dados</li>
          <li>Informação sobre a possibilidade de não consentir, e o que acontece se você não consentir</li>
          <li>Revogação do consentimento</li>
        </LegalList>
        <LegalHighlight>
          Para exercer qualquer um deles, escreva para <LegalMailto email={CONTATO.emailPrivacidade} />. Respondemos em
          até {CONTATO.prazoRespostaDias} dias. Podemos pedir informações para confirmar sua identidade — é uma proteção
          contra alguém tentar acessar ou apagar dados que não são dele.
        </LegalHighlight>
        <LegalP>
          Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) se entender que seus
          direitos não foram respeitados.
        </LegalP>
      </>
    ),
  },
  {
    id: "criancas",
    title: "Crianças e adolescentes",
    content: (
      <>
        <LegalP>
          Nosso conteúdo é sobre infância, mas nossos formulários são feitos para adultos responsáveis. Por isso:
        </LegalP>
        <LegalList>
          <li>
            <strong className="text-foreground">Não coletamos dados de crianças.</strong> Não pedimos nome, idade
            exata, data de nascimento, foto ou escola de nenhuma criança
          </li>
          <li>
            O campo de <strong className="text-foreground">faixa etária de interesse</strong> é uma preferência de
            conteúdo de quem preenche o formulário — indica que tipo de brincadeira a pessoa quer receber, e não
            constitui cadastro de uma criança
          </li>
          <li>Os cadastros devem ser feitos por pessoas maiores de 18 anos</li>
        </LegalList>
        <LegalP>
          Se você é responsável por uma criança e acredita que dados dela chegaram até nós de alguma forma, escreva para{" "}
          <LegalMailto email={CONTATO.emailPrivacidade} /> e eliminaremos com prioridade.
        </LegalP>
      </>
    ),
  },
  {
    id: "links-de-terceiros",
    title: "Links para outros sites e recomendações de produtos",
    content: (
      <>
        <LegalP>
          Nas páginas de recomendações, usamos links de afiliado da Amazon. Se você comprar por eles, podemos receber uma
          comissão, <strong className="text-foreground">sem custo adicional para você</strong>. Só recomendamos o que
          faz sentido para a proposta do site.
        </LegalP>
        <LegalP>
          Ao clicar nesses links, você sai do nosso site e passa a ser regido pela política de privacidade do destino.
          Não temos controle sobre quais dados a Amazon, o YouTube, o Instagram, o TikTok ou o WhatsApp coletam de você
          nas plataformas deles. Recomendamos ler as políticas de cada um.
        </LegalP>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança",
    content: (
      <>
        <LegalP>
          Adotamos medidas técnicas para proteger seus dados: comunicação criptografada (HTTPS), banco de dados com
          acesso restrito por credencial, validação dos dados recebidos e proteção contra envios automatizados.
        </LegalP>
        <LegalP>
          Ainda assim, nenhum sistema é totalmente imune. Se ocorrer um incidente de segurança que possa acarretar risco
          relevante a você, comunicaremos você e a ANPD, como determina a lei.
        </LegalP>
      </>
    ),
  },
  {
    id: "encarregado",
    title: "Encarregado pelo tratamento de dados",
    content: (
      <LegalP>
        Encarregado (DPO): {CONTATO.encarregado} — <LegalMailto email={CONTATO.emailPrivacidade} />. É a pessoa
        responsável por receber comunicações de titulares e da ANPD.
      </LegalP>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    content: (
      <>
        <LegalP>
          Podemos atualizar esta política. Quando isso acontecer, mudamos a data e a versão indicadas no topo da página.
          Se a mudança for significativa e afetar como usamos seus dados, avisaremos pelos canais que você autorizou.
        </LegalP>
        <LegalP>
          Alterações nesta política não modificam retroativamente o que você autorizou: guardamos a versão do texto
          vigente no momento de cada consentimento.
        </LegalP>
        <LegalP>
          Veja também os nossos <LegalLink to={ROTAS_LEGAIS.termos}>Termos de Uso</LegalLink> e a página de{" "}
          <LegalLink to={ROTAS_LEGAIS.contato}>Contato</LegalLink>. Esta política é regida pela lei brasileira, em
          especial pela{" "}
          <LegalExternalLink href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm">
            Lei nº 13.709/2018 (LGPD)
          </LegalExternalLink>
          .
        </LegalP>
      </>
    ),
  },
];

const PoliticaDePrivacidade = () => (
  <LegalPage
    title="Política de Privacidade"
    subtitle="Como o Mundo Flavinha trata os seus dados pessoais — em português claro."
    sections={sections}
  />
);

export default PoliticaDePrivacidade;
