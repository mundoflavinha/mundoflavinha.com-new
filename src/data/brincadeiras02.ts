import img01 from "@/assets/brincadeiras-normalizadas/0-2/card-01-cartoes-monocromaticos-para-bebes.webp";
import img02 from "@/assets/brincadeiras-normalizadas/0-2/card-02-bebe-no-espelho.webp";
import img03 from "@/assets/brincadeiras-normalizadas/0-2/card-03-gelatina-colorida-sensorial.webp";
import img04 from "@/assets/brincadeiras-normalizadas/0-2/card-04-varal-das-cores.webp";
import img05 from "@/assets/brincadeiras-normalizadas/0-2/card-05-boliche-das-cores.webp";
import img06 from "@/assets/brincadeiras-normalizadas/0-2/card-06-descolando-o-objeto.webp";
import img07 from "@/assets/brincadeiras-normalizadas/0-2/card-07-caca-as-figuras-no-arroz.webp";
import img08 from "@/assets/brincadeiras-normalizadas/0-2/card-08-limpeza-dos-oceanos.webp";
import img09 from "@/assets/brincadeiras-normalizadas/0-2/card-09-tampinhas-nas-formas-e-cores.webp";
import img10 from "@/assets/brincadeiras-normalizadas/0-2/card-10-caixa-sensorial-de-lavanderia.webp";
import img11 from "@/assets/brincadeiras-normalizadas/0-2/card-11-atividade-ovelhinha-sensorial.webp";
import img12 from "@/assets/brincadeiras-normalizadas/0-2/card-12-caixa-surpresa-de-exploracao-sensorial.webp";
import img13 from "@/assets/brincadeiras-normalizadas/0-2/card-13-desenho-misterioso-no-pote-transparente.webp";
import img14 from "@/assets/brincadeiras-normalizadas/0-2/card-14-encaixar-no-pote.webp";
import img15 from "@/assets/brincadeiras-normalizadas/0-2/card-15-gira-gira-tampinha.webp";
import img16 from "@/assets/brincadeiras-normalizadas/0-2/card-16-pintura-com-as-maos.webp";
import img17 from "@/assets/brincadeiras-normalizadas/0-2/card-17-escovando-os-dentinhos-do-amigo.webp";
import img18 from "@/assets/brincadeiras-normalizadas/0-2/card-18-jogo-da-memoria-da-familia.webp";
import img19 from "@/assets/brincadeiras-normalizadas/0-2/card-19-coelhinhos-no-jardim-dos-ovos.webp";
import img20 from "@/assets/brincadeiras-normalizadas/0-2/card-20-pintando-as-unhas-de-papelao.webp";
import img21 from "@/assets/brincadeiras-normalizadas/0-2/card-21-objetos-nas-formas.webp";
import img22 from "@/assets/brincadeiras-normalizadas/0-2/card-22-encaixe-o-tubo-na-cor-certa.webp";
import img23 from "@/assets/brincadeiras-normalizadas/0-2/card-23-pareando-figuras-com-copos.webp";
import img24 from "@/assets/brincadeiras-normalizadas/0-2/card-24-complete-a-arvore-com-as-folhas.webp";

export type Brincadeira02 = {
  id: number;
  slug: string;
  title: string;
  image: string;
  age: string;
  time: string;
  mess: string;
  summary: string;
  importance: string;
  prepare: string;
  play: string;
  learns: string[];
  skills: string[];
  flavinhaTip: string;
  adaptation: string[];
  adultAttention: string;
  finalPhrase: string;
};

const makeSlug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const createBrincadeira = (
  item: Omit<Brincadeira02, "slug" | "learns" | "skills" | "adaptation" | "finalPhrase"> & {
    learns?: string[];
    skills?: string[];
    adaptation?: string[];
    finalPhrase?: string;
  },
): Brincadeira02 => ({
  slug: makeSlug(item.title),
  learns: item.learns ?? [
    "Exploração sensorial",
    "Coordenação motora",
    "Atenção e concentração",
    "Linguagem",
    "Curiosidade",
  ],
  skills: item.skills ?? [
    "Coordenação olho-mão",
    "Percepção visual",
    "Motricidade fina",
    "Autonomia",
  ],
  adaptation: item.adaptation ?? [
    "0 a 6 meses: ofereça estímulos curtos, seguros e sempre supervisionados.",
    "6 a 12 meses: permita exploração livre com materiais maiores e adequados à fase oral.",
    "1 a 2 anos: acrescente pequenas escolhas, desafios simples, cores e nomeação dos objetos.",
  ],
  finalPhrase: item.finalPhrase ?? "Quando a brincadeira respeita o tempo da criança, cada descoberta vira desenvolvimento.",
  ...item,
});

export const brincadeiras02: Brincadeira02[] = [
  createBrincadeira({
    id: 1,
    title: "Cartões Monocromáticos para Bebês",
    image: img01,
    age: "0 a 12 meses",
    time: "5 a 10 minutos",
    mess: "Sem bagunça",
    summary: "Imagens de alto contraste estimulam o olhar, o foco e a curiosidade desde os primeiros meses.",
    importance: "Nos primeiros meses, o bebê enxerga melhor contrastes fortes. Os cartões ajudam a fortalecer conexões visuais e incentivam o acompanhamento com o olhar.",
    prepare: "Separe cartões em preto e branco e escolha um local seguro para posicionar o bebê, como tapete firme, colo ou berço com supervisão.",
    play: "Mostre um cartão por vez, movendo devagar para os lados. Troque as imagens aos poucos e observe quais chamam mais atenção.",
    learns: ["Desenvolvimento visual", "Rastreamento ocular", "Atenção", "Percepção de formas", "Curiosidade"],
    skills: ["Foco visual", "Processamento visual", "Atenção compartilhada", "Exploração inicial"],
    flavinhaTip: "Use poucos cartões por vez. Para bebês pequenos, repetição é aprendizado e segurança.",
    adultAttention: "Use cartões grandes, firmes e sem partes soltas. Nunca deixe papéis pequenos ao alcance sem supervisão.",
  }),
  createBrincadeira({
    id: 2,
    title: "Bebê no Espelho",
    image: img02,
    age: "A partir de 4 meses",
    time: "Poucos minutos",
    mess: "Sem bagunça",
    summary: "Uma atividade simples para fortalecer pescoço, ombros, braços e tronco durante o tummy time.",
    importance: "O espelho desperta interesse pelo reflexo e motiva o bebê a levantar a cabeça, apoiar os braços e permanecer mais tempo de barriga para baixo.",
    prepare: "Coloque um espelho seguro para bebê em frente a um tapete firme. Deixe o bebê acordado, de bruços e confortável.",
    play: "Chame a atenção com voz suave: 'Olha o bebê!'. Converse, sorria e respeite o tempo do bebê, fazendo pausas quando ele cansar.",
    learns: ["Fortalecimento corporal", "Atenção visual", "Reconhecimento do rosto", "Interação", "Curiosidade"],
    skills: ["Controle cervical", "Coordenação motora grossa", "Vínculo afetivo", "Percepção visual"],
    flavinhaTip: "Melhor poucos minutinhos felizes do que muito tempo com desconforto. O bebê também aprende quando a experiência é leve.",
    adultAttention: "O tummy time deve acontecer sempre com o bebê acordado, em superfície segura e com supervisão constante.",
  }),
  createBrincadeira({
    id: 3,
    title: "Gelatina Colorida Sensorial",
    image: img03,
    age: "A partir de 6 meses",
    time: "15 a 30 minutos",
    mess: "Muita bagunça",
    summary: "Uma exploração geladinha e colorida para tocar, apertar, misturar e descobrir novas texturas.",
    importance: "A gelatina convida o bebê a explorar com as mãos e o corpo, estimulando sentidos, curiosidade e coordenação motora fina.",
    prepare: "Prepare gelatinas de cores diferentes, corte em pedaços grandes e coloque em uma travessa ou caixa sensorial fácil de limpar.",
    play: "Deixe a criança tocar, amassar e misturar. Nomeie cores e sensações: gelado, mole, escorregadio, vermelho, verde.",
    flavinhaTip: "Bagunça também é aprendizagem. Prepare o espaço antes e aproveite para observar as descobertas.",
    adultAttention: "Supervisione o tempo todo, especialmente se o bebê ainda leva tudo à boca. Use apenas materiais seguros para a idade.",
  }),
  createBrincadeira({
    id: 4,
    title: "Varal das Cores",
    image: img04,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Pouca bagunça",
    summary: "Roupinhas coloridas e prendedores ajudam a trabalhar cores, força dos dedos e coordenação.",
    importance: "Abrir e fechar prendedores fortalece a mão e prepara movimentos importantes para desenhar, escrever e manipular objetos.",
    prepare: "Recorte roupinhas em EVA, papel colorido ou papelão. Monte um varal com barbante e prendedores seguros.",
    play: "Convide a criança a pendurar as peças. Depois peça uma cor específica ou proponha colocar do menor para o maior.",
    learns: ["Cores", "Classificação", "Atenção", "Autonomia", "Coordenação entre mãos e olhos"],
    skills: ["Movimento de pinça", "Força dos dedos", "Percepção visual", "Organização"],
    flavinhaTip: "Comece com poucas cores. Quando a criança entender, acrescente novas peças e pequenos desafios.",
    adultAttention: "Verifique se os prendedores não têm partes soltas ou pontas. Supervisione todo o uso.",
  }),
  createBrincadeira({
    id: 5,
    title: "Boliche das Cores",
    image: img05,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Uma brincadeira de lançar bolinhas, reconhecer cores e celebrar pequenas conquistas.",
    importance: "Ao lançar e observar o caminho da bolinha, a criança trabalha coordenação motora, atenção e noção de causa e efeito.",
    prepare: "Monte túneis ou alvos coloridos com papel, EVA ou rolinhos. Separe bolinhas leves e seguras.",
    play: "Peça para a criança lançar a bolinha em direção a uma cor. Comemore cada tentativa e nomeie a cor escolhida.",
    learns: ["Cores", "Causa e efeito", "Coordenação", "Turnos", "Atenção"],
    skills: ["Coordenação motora grossa", "Direção", "Planejamento motor", "Percepção visual"],
    flavinhaTip: "Não precisa acertar sempre. A tentativa já é treino de movimento e confiança.",
    adultAttention: "Use bolinhas grandes, leves e adequadas para não oferecer risco de engasgo.",
  }),
  createBrincadeira({
    id: 6,
    title: "Descolando o Objeto",
    image: img06,
    age: "A partir de 10 meses",
    time: "10 a 15 minutos",
    mess: "Pouca bagunça",
    summary: "Objetos presos com fita viram um desafio divertido para puxar, descobrir e persistir.",
    importance: "A atividade estimula força dos dedos, coordenação motora fina, resolução de problemas e persistência.",
    prepare: "Cole brinquedos grandes ou tampas em uma superfície segura usando fita crepe. Deixe parte do objeto visível.",
    play: "Mostre como puxar a fita e incentive a criança a tentar tirar os objetos. Nomeie cada conquista.",
    learns: ["Resolução de problemas", "Causa e efeito", "Persistência", "Força dos dedos", "Atenção"],
    skills: ["Motricidade fina", "Coordenação bilateral", "Planejamento motor", "Autonomia"],
    flavinhaTip: "Se ficar difícil demais, solte uma pontinha da fita para a criança sentir que consegue.",
    adultAttention: "Use fita segura e retire pedaços pequenos imediatamente para evitar que sejam levados à boca.",
  }),
  createBrincadeira({
    id: 7,
    title: "Caça às Figuras no Arroz",
    image: img07,
    age: "A partir de 18 meses",
    time: "15 a 25 minutos",
    mess: "Bagunça média",
    summary: "Uma caixa sensorial para procurar figuras, explorar textura e nomear descobertas.",
    importance: "Procurar objetos no arroz trabalha tato, atenção, linguagem e coordenação das mãos.",
    prepare: "Coloque arroz cru em uma bacia e esconda figuras grandes, tampas ou brinquedos seguros.",
    play: "Convide a criança a procurar as figuras. Ao encontrar, fale o nome, cor, som ou função do objeto.",
    flavinhaTip: "Use uma toalha grande por baixo para facilitar a limpeza e deixar a exploração mais tranquila.",
    adultAttention: "Supervisione constantemente e evite grãos soltos com crianças que ainda levam tudo à boca.",
  }),
  createBrincadeira({
    id: 8,
    title: "Limpeza dos Oceanos",
    image: img08,
    age: "A partir de 18 meses",
    time: "15 a 25 minutos",
    mess: "Bagunça leve com água",
    summary: "Uma brincadeira com água para resgatar objetos e conversar sobre cuidado com a natureza.",
    importance: "Além da coordenação, a atividade apresenta de forma simples noções de cuidado, separação e consciência ambiental.",
    prepare: "Coloque água em uma bacia, alguns brinquedos de animais marinhos e pedaços grandes de papel ou plástico seguro.",
    play: "Peça para a criança retirar os 'lixinhos' da água com as mãos, colher ou peneira e salvar os animais.",
    learns: ["Coordenação", "Cuidado com o ambiente", "Classificação", "Linguagem", "Atenção"],
    skills: ["Coordenação olho-mão", "Motricidade fina", "Responsabilidade", "Exploração sensorial"],
    flavinhaTip: "Conte uma pequena história: 'O peixinho precisa de ajuda'. Isso aumenta o envolvimento da criança.",
    adultAttention: "Toda atividade com água precisa de supervisão contínua, mesmo com pouca quantidade.",
  }),
  createBrincadeira({
    id: 9,
    title: "Tampinhas nas Formas e Cores",
    image: img09,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Tampinhas coloridas ajudam a parear cores, reconhecer formas e organizar o pensamento.",
    importance: "Parear tampinhas em formas e cores desenvolve atenção visual, classificação e coordenação fina.",
    prepare: "Desenhe formas coloridas em uma folha ou papelão e separe tampinhas nas cores correspondentes.",
    play: "A criança coloca cada tampinha no lugar certo. Para variar, peça por cor, por forma ou por quantidade.",
    learns: ["Cores", "Formas", "Pareamento", "Contagem inicial", "Atenção"],
    skills: ["Coordenação motora fina", "Percepção visual", "Classificação", "Raciocínio lógico"],
    flavinhaTip: "Tampinhas são ótimas, mas precisam ser grandes e usadas com supervisão.",
    adultAttention: "Não use tampinhas pequenas com bebês. Supervisione para evitar risco de engasgo.",
  }),
  createBrincadeira({
    id: 10,
    title: "Caixa Sensorial de Lavanderia",
    image: img10,
    age: "A partir de 18 meses",
    time: "15 a 25 minutos",
    mess: "Bagunça média",
    summary: "Espuma, potes e utensílios criam uma experiência sensorial cheia de faz de conta.",
    importance: "A brincadeira estimula textura, coordenação, linguagem e imitação de rotinas do cotidiano.",
    prepare: "Em uma bacia, coloque espuma segura, paninhos, potes, colheres e utensílios grandes.",
    play: "Convide a criança a lavar, apertar, transferir espuma e brincar de cuidar das roupinhas ou objetos.",
    learns: ["Exploração sensorial", "Faz de conta", "Vocabulário", "Coordenação", "Autonomia"],
    skills: ["Coordenação bilateral", "Motricidade fina", "Imaginação", "Sequência de ações"],
    flavinhaTip: "Narrar o que a criança está fazendo transforma a brincadeira em estímulo de linguagem.",
    adultAttention: "Use produtos seguros, evite sabão irritante e supervisione para não levar espuma à boca ou aos olhos.",
  }),
  createBrincadeira({
    id: 11,
    title: "Atividade Ovelhinha Sensorial",
    image: img11,
    age: "A partir de 12 meses",
    time: "10 a 20 minutos",
    mess: "Pouca bagunça",
    summary: "Algodão e colagem viram uma ovelhinha fofinha para explorar textura e criatividade.",
    importance: "Colar algodão trabalha toque, coordenação fina, percepção tátil e primeiras experiências artísticas.",
    prepare: "Desenhe uma ovelha em papelão e separe algodão em pedaços grandes, cola atóxica e um pincel.",
    play: "Ajude a criança a passar cola e preencher a ovelhinha com algodão, conversando sobre macio, branco e fofinho.",
    flavinhaTip: "Para menores, você passa a cola e deixa a criança apenas grudar os algodões.",
    adultAttention: "Use cola atóxica e supervisione o algodão para não ir à boca.",
  }),
  createBrincadeira({
    id: 12,
    title: "Caixa Surpresa de Exploração Sensorial",
    image: img12,
    age: "A partir de 10 meses",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Uma caixa com objetos seguros desperta curiosidade, linguagem e exploração.",
    importance: "Retirar objetos da caixa estimula permanência do objeto, atenção, tato e descoberta guiada.",
    prepare: "Coloque em uma caixa objetos grandes e seguros, com texturas diferentes: pano, bola, colher, escova macia.",
    play: "A criança coloca a mão, retira um objeto e explora. Nomeie textura, cor, som e função.",
    learns: ["Vocabulário", "Curiosidade", "Percepção tátil", "Atenção", "Causa e efeito"],
    skills: ["Exploração sensorial", "Coordenação", "Memória", "Interação"],
    flavinhaTip: "Troque os objetos semanalmente para renovar a curiosidade sem precisar comprar nada novo.",
    adultAttention: "Confira tamanho, limpeza e segurança de todos os objetos antes de oferecer.",
  }),
  createBrincadeira({
    id: 13,
    title: "Desenho Misterioso no Pote Transparente",
    image: img13,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Pouca bagunça",
    summary: "Um desenho escondido aparece aos poucos e estimula observação, fala e imaginação.",
    importance: "A criança desenvolve atenção visual, antecipação e linguagem ao descobrir o que está escondido.",
    prepare: "Coloque uma figura dentro de um pote transparente e cubra parcialmente com papel picado, arroz colorido ou tecido.",
    play: "Movimente o pote e incentive a criança a descobrir a imagem. Faça perguntas: 'O que apareceu?', 'Que cor é?'.",
    flavinhaTip: "Use fotos da família para deixar a descoberta ainda mais afetiva.",
    adultAttention: "Use pote resistente, bem fechado e materiais grandes o suficiente para a idade.",
  }),
  createBrincadeira({
    id: 14,
    title: "Encaixar no Pote",
    image: img14,
    age: "1 a 3 anos",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Figuras entrando por uma abertura simples treinam pinça, precisão e concentração.",
    importance: "Direcionar cartões para uma abertura fortalece mãos e dedos, habilidade importante para futuras tarefas de autonomia.",
    prepare: "Faça uma abertura na tampa de um pote plástico. Separe cartões grandes, formas, letras ou figuras impressas.",
    play: "Peça para a criança inserir uma figura por vez. Para os maiores, solicite uma cor, forma ou animal específico.",
    learns: ["Movimento de pinça", "Coordenação olho-mão", "Cores e formas", "Atenção", "Contagem"],
    skills: ["Coordenação fina", "Controle dos dedos", "Classificação", "Autonomia"],
    flavinhaTip: "Para crianças pequenas, o objetivo é encaixar. Para as maiores, acrescente cores, números e pequenas escolhas.",
    adultAttention: "A abertura deve ser feita por adulto. Evite cartões pequenos ou pontas cortantes.",
  }),
  createBrincadeira({
    id: 15,
    title: "Gira, Gira Tampinha",
    image: img15,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Rosquear e desrosquear tampinhas fortalece as mãos e diverte com movimentos repetidos.",
    importance: "O movimento de girar trabalha coordenação bilateral, força das mãos e independência para tarefas do dia a dia.",
    prepare: "Separe garrafas plásticas limpas com tampas grandes e coloridas, bem higienizadas.",
    play: "Mostre como girar para abrir e fechar. Depois incentive a criança a tentar sozinha, nomeando as cores das tampas.",
    learns: ["Causa e efeito", "Persistência", "Cores", "Coordenação bilateral", "Autonomia"],
    skills: ["Força das mãos", "Movimento de rotação", "Coordenação fina", "Planejamento motor"],
    flavinhaTip: "É uma ótima brincadeira para aproveitar materiais recicláveis com propósito.",
    adultAttention: "Use apenas tampas grandes e supervisione para evitar risco de engasgo.",
  }),
  createBrincadeira({
    id: 16,
    title: "Pintura com as Mãos",
    image: img16,
    age: "A partir de 12 meses",
    time: "15 a 25 minutos",
    mess: "Muita bagunça",
    summary: "Tinta, mãos e liberdade para experimentar cores, marcas e sensações.",
    importance: "Pintar com as mãos favorece expressão, exploração sensorial, coordenação e criatividade sem exigir resultado perfeito.",
    prepare: "Forre o chão ou mesa, separe papel grande e tinta atóxica apropriada para crianças.",
    play: "Deixe a criança carimbar mãos, espalhar tinta e misturar cores. Converse sobre as marcas que aparecem.",
    learns: ["Cores", "Texturas", "Criatividade", "Expressão", "Coordenação"],
    skills: ["Exploração sensorial", "Motricidade fina", "Percepção visual", "Expressão artística"],
    flavinhaTip: "Valorize o processo, não o desenho final. Nessa idade, sentir e experimentar é o principal.",
    adultAttention: "Use tinta segura, supervisione e evite contato com olhos e boca.",
  }),
  createBrincadeira({
    id: 17,
    title: "Escovando os Dentinhos do Amigo",
    image: img17,
    age: "A partir de 18 meses",
    time: "10 a 15 minutos",
    mess: "Pouca bagunça",
    summary: "Uma brincadeira de cuidado que ajuda a criar familiaridade com a escovação.",
    importance: "Brincar de escovar estimula autonomia, linguagem e aceitação de uma rotina importante para a saúde.",
    prepare: "Desenhe um rostinho plastificado ou use um boneco. Separe escova infantil limpa e canetinha lavável para fazer 'sujeirinhas'.",
    play: "A criança escova os dentinhos do amigo até limpar tudo. Conte uma historinha sobre cuidado e saúde.",
    learns: ["Higiene", "Autonomia", "Sequência de rotina", "Cuidado", "Linguagem"],
    skills: ["Coordenação motora fina", "Imitação", "Responsabilidade", "Motricidade oral indireta"],
    flavinhaTip: "Quando vira brincadeira, a rotina deixa de ser briga e passa a fazer sentido para a criança.",
    adultAttention: "Use materiais limpos e supervisione o uso da escova.",
  }),
  createBrincadeira({
    id: 18,
    title: "Jogo da Memória da Família",
    image: img18,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Fotos da família viram um jogo afetivo para reconhecer rostos e criar conexão.",
    importance: "Trabalhar com rostos familiares fortalece memória, vínculo, linguagem e reconhecimento social.",
    prepare: "Imprima fotos duplicadas de pessoas da família e cole em cartões grandes e resistentes.",
    play: "Para menores, mostre uma foto por vez e diga o nome. Para maiores, vire os pares e brinque de encontrar iguais.",
    learns: ["Memória", "Reconhecimento de pessoas", "Linguagem", "Atenção", "Vínculo familiar"],
    skills: ["Memória visual", "Associação", "Turnos", "Comunicação"],
    flavinhaTip: "Use fotos de momentos felizes. A brincadeira também vira conversa sobre histórias da família.",
    adultAttention: "Faça cartões grandes e plastificados para não rasgar ou soltar partes pequenas.",
  }),
  createBrincadeira({
    id: 19,
    title: "Coelhinhos no Jardim dos Ovos",
    image: img19,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Pouca bagunça",
    summary: "Coelhinhos e ovos coloridos criam uma brincadeira de encaixe, cores e faz de conta.",
    importance: "A atividade mistura imaginação, coordenação fina, classificação e atenção visual.",
    prepare: "Recorte coelhinhos e ovos em papelão ou EVA. Use cores diferentes para parear ou esconder no espaço.",
    play: "Peça para a criança levar cada ovo ao coelhinho, separar por cores ou procurar os ovos escondidos.",
    flavinhaTip: "Transforme em história: 'O coelhinho perdeu os ovinhos'. A criança entra na missão com mais alegria.",
    adultAttention: "Evite peças pequenas e acompanhe a criança durante a busca.",
  }),
  createBrincadeira({
    id: 20,
    title: "Pintando as Unhas de Papelão",
    image: img20,
    age: "A partir de 2 anos",
    time: "10 a 20 minutos",
    mess: "Bagunça leve",
    summary: "Dedinhos de papelão viram treino de precisão, cores e faz de conta.",
    importance: "Pintar pequenos espaços ajuda a criança a controlar movimentos, explorar cores e brincar de cuidado.",
    prepare: "Desenhe uma mão em papelão e destaque as unhas. Separe tinta guache ou canetinhas laváveis.",
    play: "Convide a criança a pintar cada unha. Nomeie cores e proponha padrões simples.",
    learns: ["Cores", "Precisão", "Faz de conta", "Atenção", "Coordenação"],
    skills: ["Coordenação motora fina", "Controle do traço", "Criatividade", "Concentração"],
    flavinhaTip: "Use pincel mais grosso no começo. O objetivo é controlar o movimento sem cobrança.",
    adultAttention: "Use materiais atóxicos e proteja a superfície.",
  }),
  createBrincadeira({
    id: 21,
    title: "Objetos nas Formas",
    image: img21,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Objetos do dia a dia entram em contornos e ajudam a perceber formas e tamanhos.",
    importance: "Associar objeto e contorno desenvolve observação, percepção espacial e resolução de problemas.",
    prepare: "Desenhe contornos de objetos grandes em uma folha ou papelão e separe os objetos correspondentes.",
    play: "A criança procura qual objeto encaixa em cada desenho. Ajude com pistas e perguntas.",
    learns: ["Formas", "Tamanhos", "Associação", "Observação", "Vocabulário"],
    skills: ["Percepção espacial", "Raciocínio lógico", "Atenção visual", "Coordenação"],
    flavinhaTip: "Comece com poucos objetos bem diferentes. Depois use objetos parecidos para aumentar o desafio.",
    adultAttention: "Escolha objetos seguros, sem pontas ou peças pequenas.",
  }),
  createBrincadeira({
    id: 22,
    title: "Encaixe o Tubo na Cor Certa",
    image: img22,
    age: "A partir de 18 meses",
    time: "10 a 20 minutos",
    mess: "Pouca bagunça",
    summary: "Tubos coloridos viram uma atividade de encaixe, cores e coordenação.",
    importance: "Encaixar tubos exige precisão, coordenação olho-mão e identificação visual de cores.",
    prepare: "Separe rolinhos coloridos ou encapados e bases com as mesmas cores.",
    play: "A criança encaixa cada tubo na cor correspondente. Depois pode empilhar, contar e organizar.",
    learns: ["Cores", "Encaixe", "Contagem inicial", "Organização", "Atenção"],
    skills: ["Coordenação motora fina", "Percepção visual", "Planejamento motor", "Classificação"],
    flavinhaTip: "Rolinhos de papel podem virar material educativo com muita facilidade.",
    adultAttention: "Use tubos firmes, limpos e sem grampos ou pontas.",
  }),
  createBrincadeira({
    id: 23,
    title: "Pareando Figuras com Copos",
    image: img23,
    age: "A partir de 2 anos",
    time: "10 a 20 minutos",
    mess: "Sem bagunça",
    summary: "Copos e figuras iguais ajudam a criança a comparar, parear e observar detalhes.",
    importance: "Parear imagens trabalha memória visual, atenção, classificação e linguagem.",
    prepare: "Cole figuras em copos e prepare cartões com as mesmas imagens.",
    play: "A criança encontra qual cartão combina com cada copo. Nomeie as figuras e incentive escolhas.",
    learns: ["Pareamento", "Vocabulário", "Atenção", "Memória", "Classificação"],
    skills: ["Percepção visual", "Raciocínio lógico", "Coordenação", "Comunicação"],
    flavinhaTip: "Use figuras de animais, frutas ou pessoas da família para deixar a atividade mais próxima da criança.",
    adultAttention: "Use copos resistentes e figuras bem coladas.",
  }),
  createBrincadeira({
    id: 24,
    title: "Complete a Árvore com as Folhas",
    image: img24,
    age: "A partir de 2 anos",
    time: "15 a 25 minutos",
    mess: "Pouca bagunça",
    summary: "Folhas coloridas completam a árvore e estimulam coordenação, cores e cuidado com a natureza.",
    importance: "Colar ou encaixar folhas fortalece coordenação fina, percepção visual e criatividade.",
    prepare: "Desenhe uma árvore em papelão e recorte folhas de papel colorido, EVA ou tecido.",
    play: "A criança coloca as folhas na árvore. Você pode pedir por cor, quantidade ou tamanho.",
    learns: ["Cores", "Natureza", "Contagem", "Coordenação", "Criatividade"],
    skills: ["Motricidade fina", "Percepção visual", "Classificação", "Expressão artística"],
    flavinhaTip: "Se possível, use folhas naturais junto com folhas de papel para comparar texturas.",
    adultAttention: "Evite folhas ou materiais pequenos com crianças que ainda levam objetos à boca.",
    finalPhrase: "Brincar com elementos simples ajuda a criança a perceber beleza e aprendizado no cotidiano.",
  }),
];

export const getBrincadeira02BySlug = (slug?: string) =>
  brincadeiras02.find((item) => item.slug === slug);
