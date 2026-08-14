import img01 from "@/assets/brincadeiras-normalizadas/6-8/card-01-cada-tampinha-no-seu-lugar.webp";
import img02 from "@/assets/brincadeiras-normalizadas/6-8/card-02-circuito-de-calcados.webp";
import img03 from "@/assets/brincadeiras-normalizadas/6-8/card-03-complete-os-numeros-com-uno.webp";
import img04 from "@/assets/brincadeiras-normalizadas/6-8/card-04-sequencia-de-1-a-9-com-uno.webp";
import img05 from "@/assets/brincadeiras-normalizadas/6-8/card-05-quantos-pontos-com-aviao-de-papel.webp";
import img06 from "@/assets/brincadeiras-normalizadas/6-8/card-06-medida-certa.webp";
import img07 from "@/assets/brincadeiras-normalizadas/6-8/card-07-pista-de-carrinho-com-fita-crepe.webp";
import img08 from "@/assets/brincadeiras-normalizadas/6-8/card-08-6-linhas-6-pulos.webp";
import img09 from "@/assets/brincadeiras-normalizadas/6-8/card-09-boia-ou-afunda.webp";
import img10 from "@/assets/brincadeiras-normalizadas/6-8/card-10-o-cabelo-da-lele.webp";
import img11 from "@/assets/brincadeiras-normalizadas/6-8/card-11-aprendendo-a-reciclar.webp";
import img12 from "@/assets/brincadeiras-normalizadas/6-8/card-12-pintura-com-cola-colorida.webp";
import img13 from "@/assets/brincadeiras-normalizadas/6-8/card-13-campo-minado-com-giz.webp";
import img14 from "@/assets/brincadeiras-normalizadas/6-8/card-14-pega-bolinha-com-mao-de-papelao.webp";
import img15 from "@/assets/brincadeiras-normalizadas/6-8/card-15-pareando-as-letras.webp";
import img16 from "@/assets/brincadeiras-normalizadas/6-8/card-16-completando-a-arvore.webp";
import img17 from "@/assets/brincadeiras-normalizadas/6-8/card-17-simetria.webp";
import img18 from "@/assets/brincadeiras-normalizadas/6-8/card-18-encontrando-o-resultado.webp";

export type Brincadeira68 = {
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
  videoUrl?: string;
};

export const brincadeiras68: Brincadeira68[] = [
{
    "id": 1,
    "slug": "cada-tampinha-no-seu-lugar",
    "title": "Cada Tampinha no Seu Lugar",
    "age": "A partir de 6 anos.",
    "time": "10 a 20 minutos.",
    "mess": "☆☆☆☆ Muito baixo.",
    "summary": "Treine atenção, percepção visual e coordenação motora encaixando cada tampinha na casa correta de forma divertida.",
    "importance": "Pequenas brincadeiras podem desenvolver grandes habilidades. Nesta atividade, a criança observa, compara e organiza as tampinhas de acordo com suas cores e posições, estimulando a concentração de forma divertida.",
    "prepare": "Imprima o arquivo. Separe tampinhas coloridas nas mesmas cores do tabuleiro. Coloque tudo sobre uma mesa.",
    "play": "Misture todas as tampinhas. A criança deverá observar as cores das casas e colocar cada tampinha em seu lugar. Depois você pode aumentar o desafio mudando o tempo ou escondendo algumas tampinhas.",
    "learns": [
        "Atenção concentrada",
        "Percepção visual",
        "Organização",
        "Associação de cores",
        "Planejamento"
    ],
    "skills": [
        "Coordenação motora fina",
        "Concentração",
        "Memória visual",
        "Organização espacial",
        "Raciocínio lógico"
    ],
    "flavinhaTip": "Quer deixar ainda mais divertido? Cronometre o tempo e desafie a criança a superar sua própria marca, sem competir com outras pessoas.",
    "adaptation": [
        "6 anos",
        "Apenas identificar as cores. 7 anos",
        "Fazer contra o tempo. 8 anos",
        "Criar novas combinações e pedir para outra pessoa reproduzir."
    ],
    "adultAttention": "Utilize tampinhas limpas e acompanhe crianças que ainda levam objetos pequenos à boca.",
    "finalPhrase": "Brincar também é aprender. Cada pequeno desafio fortalece habilidades que acompanharão a criança por toda a vida.",
    "videoUrl": "https://www.youtube.com/shorts/HjiRJiTpjio",
    "image": img01
},
{
    "id": 2,
    "slug": "circuito-de-calcados",
    "title": "Circuito de Calçados",
    "age": "6 a 8 anos",
    "time": "15 a 25 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "Às vezes, uma brincadeira incrível nasce apenas olhando para aquilo que já temos em casa. Com alguns pares de sapatos espalhados pelo chão, a criança trabalha orientação...",
    "importance": "Às vezes, uma brincadeira incrível nasce apenas olhando para aquilo que já temos em casa. Com alguns pares de sapatos espalhados pelo chão, a criança trabalha orientação espacial, coordenação motora e concentração enquanto se movimenta de forma divertida.",
    "prepare": "Separe vários calçados. Coloque-os formando um caminho. Cada sapato deve apontar para uma direção diferente: - Frente - Direita - Esquerda - Trás",
    "play": "A criança começa no primeiro sapato. Sempre que chegar em um calçado, deverá realizar um pulo exatamente na direção em que ele estiver apontando. O desafio é completar todo o percurso sem errar nenhuma direção. Para aumentar a dificuldade, cronometre o tempo ou faça percursos maiores.",
    "learns": [
        "Orientação espacial",
        "Lateralidade",
        "Atenção",
        "Controle corporal"
    ],
    "skills": [
        "Coordenação motora grossa",
        "Equilíbrio",
        "Consciência corporal",
        "Planejamento motor",
        "Concentração"
    ],
    "flavinhaTip": "Troque os sapatos de posição toda vez que brincar. Assim o cérebro nunca memoriza o percurso e o desafio continua divertido.",
    "adaptation": [
        "6 anos Faça poucas mudanças de direção. 7 anos Misture frente, trás, direita e esquerda. 8 anos Acrescente comandos como:",
        "Pule com um pé só.",
        "Pule girando.",
        "Pule agachando."
    ],
    "adultAttention": "Verifique se os sapatos não escorregam no piso e mantenha o percurso livre de obstáculos. \"Cada passo é uma oportunidade para o cérebro aprender brincando.\"",
    "finalPhrase": "Brincar é uma forma linda de aprender, criar vínculos e transformar momentos simples em memórias especiais.",
    "videoUrl": "",
    "image": img02
},
{
    "id": 3,
    "slug": "complete-os-numeros-com-uno",
    "title": "Complete os Números com UNO",
    "age": "6 a 8 anos",
    "time": "20 minutos",
    "mess": "☆☆☆☆",
    "summary": "Transforme o famoso jogo UNO em um divertido bingo matemático.",
    "importance": "Transforme o famoso jogo UNO em um divertido bingo matemático.",
    "prepare": "Monte uma cartela numerada de 0 a 9. Coloque todas as cartas do UNO viradas para baixo.",
    "play": "Cada jogador vira uma carta. Se aquele número ainda estiver vazio em sua cartela, ele marca. Caso já esteja preenchido, passa a vez. Ganha quem completar toda a cartela primeiro.",
    "learns": [
        "Reconhecimento numérico",
        "Atenção",
        "Estratégia",
        "Espera da vez"
    ],
    "skills": [
        "Matemática",
        "Memória",
        "Concentração",
        "Controle emocional"
    ],
    "flavinhaTip": "Use marcadores coloridos para deixar a brincadeira ainda mais divertida. Adaptação 6 anos -> Cartela até 5. 7 anos -> Até 9. 8 anos -> Inclua cartas especiais do UNO que façam perder ou ganhar uma rodada. Atenção Ajude crianças menores a reconhecer os números. \"Quando a diversão encontra a matemática, aprender acontece naturalmente.\"",
    "adaptation": [
        "6 anos -> Cartela até 5. 7 anos -> Até 9. 8 anos -> Inclua cartas especiais do UNO que façam perder ou ganhar uma rodada."
    ],
    "adultAttention": "Ajude crianças menores a reconhecer os números. \"Quando a diversão encontra a matemática, aprender acontece naturalmente.\"",
    "finalPhrase": "Brincar é uma forma linda de aprender, criar vínculos e transformar momentos simples em memórias especiais.",
    "videoUrl": "",
    "image": img03
},
{
    "id": 4,
    "slug": "sequencia-de-1-a-9-com-uno",
    "title": "Sequência de 1 a 9 com UNO",
    "age": "6 a 8 anos",
    "time": "15 a 25 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "Uma brincadeira simples que transforma o clássico jogo da memória em um grande desafio de raciocínio lógico. Aqui, além de memorizar onde cada número está escondido, a criança...",
    "importance": "Uma brincadeira simples que transforma o clássico jogo da memória em um grande desafio de raciocínio lógico. Aqui, além de memorizar onde cada número está escondido, a criança precisa respeitar a sequência numérica para conseguir vencer. É uma atividade que trabalha atenção, concentração e controle emocional de forma divertida, estimulando o cérebro enquanto brinca.",
    "prepare": "- Separe as cartas do UNO numeradas de 1 a 9. - Embaralhe as cartas. - Coloque todas viradas para baixo sobre a mesa. - Escolha quem começará a partida.",
    "play": "O objetivo é encontrar os números na ordem correta. O primeiro jogador deve procurar o número 1. Se acertar, continua jogando e agora precisa encontrar o próximo número da sequência. Exemplo: - encontra o 1; - procura o 2; - depois o 3; - depois o 4… Sempre respeitando a sequência numérica. Se virar uma carta errada, ela é colocada novamente virada para baixo e a vez passa para o próximo jogador. Vence quem conseguir completar toda a sequência primeiro.",
    "learns": [
        "Sequência numérica.",
        "Memorização visual.",
        "Planejamento antes de agir.",
        "Atenção aos detalhes.",
        "Persistência diante dos desafios."
    ],
    "skills": [
        "Memória visual",
        "Raciocínio lógico",
        "Sequência numérica",
        "Atenção e concentração",
        "Controle da ansiedade",
        "Espera da vez",
        "Estratégia"
    ],
    "flavinhaTip": "Nas primeiras partidas, utilize apenas as cartas de 1 a 5. Conforme a criança ganhar confiança, aumente gradativamente até chegar ao 9. Para deixar ainda mais divertido, cronometre o tempo de cada jogador e desafie a criança a superar sua própria marca nas próximas rodadas.",
    "adaptation": [
        "6 anos",
        "Utilize apenas os números de 1 a 5.",
        "Permita observar as cartas por alguns segundos antes de começar. 7 anos",
        "Utilize os números de 1 a 9 normalmente. 8 anos ou mais",
        "Misture cartas especiais do UNO (Comprar +2, Inverter, Bloqueio, Coringa). Quando uma delas aparecer, crie desafios extras, como perder a vez, voltar um número na sequência ou trocar de jogador."
    ],
    "adultAttention": "Evite dar a resposta quando a criança errar. Em vez disso, incentive-a a lembrar onde já viu determinado número. O processo de pensar e tentar novamente é justamente o que fortalece a memória e o raciocínio. Se houver crianças de idades diferentes, adapte a quantidade de cartas para que todos consigam participar e se divertir. 🌟",
    "finalPhrase": "Memorizar é importante, mas descobrir estratégias para resolver desafios torna a aprendizagem ainda mais significativa.",
    "videoUrl": "",
    "image": img04
},
{
    "id": 5,
    "slug": "quantos-pontos-com-aviao-de-papel",
    "title": "Quantos Pontos com Avião de Papel",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "Uma simples dobradura pode se transformar em uma brincadeira cheia de emoção, estratégia e aprendizado. Além de estimular a coordenação motora e a noção de distância, essa...",
    "importance": "Uma simples dobradura pode se transformar em uma brincadeira cheia de emoção, estratégia e aprendizado. Além de estimular a coordenação motora e a noção de distância, essa atividade desperta a curiosidade sobre como o formato do avião influencia o voo, tornando a brincadeira ainda mais divertida.",
    "prepare": "- Faça uma linha no chão com fita crepe para marcar o local de arremesso. - Em outra parte do corredor ou da sala, marque diferentes áreas de pontuação com fita crepe. - Quanto mais distante, maior deve ser a pontuação. Exemplo: ○ 10 pontos ○ 20 pontos ○ 50 pontos ○ 100 pontos - Dobre alguns aviões de papel (cada participante pode usar o mesmo modelo ou criar o seu próprio).",
    "play": "Todos os jogadores ficam atrás da linha de lançamento. Cada participante lança seu avião três vezes. Após cada voo, anote a pontuação correspondente ao local onde o avião parou. No final, some todos os pontos de cada jogador. Quem fizer a maior pontuação vence. Para deixar ainda mais divertido, vocês podem criar desafios extras, como: - avião que voa mais longe; - avião que permanece mais tempo no ar; - avião que aterrissa mais perto do alvo; - campeonato em várias rodadas.",
    "learns": [
        "Noção de distância.",
        "Planejamento antes do lançamento.",
        "Relação entre força e precisão.",
        "Resolução de problemas.",
        "Primeiros conceitos de física, como equilíbrio e aerodinâmica."
    ],
    "skills": [
        "Coordenação motora grossa",
        "Coordenação olho-mão",
        "Controle da força",
        "Concentração",
        "Percepção espacial",
        "Raciocínio lógico",
        "Matemática (contagem e soma da pontuação)",
        "Criatividade"
    ],
    "flavinhaTip": "Experimente construir aviões com modelos diferentes. Depois conversem sobre qual voou melhor e por quê. É uma excelente oportunidade para a criança levantar hipóteses, testar ideias e descobrir, na prática, como pequenas mudanças podem alterar o resultado. Outra ideia divertida é cada criança decorar seu próprio avião antes da competição.",
    "adaptation": [
        "6 anos",
        "Utilize apenas duas ou três áreas de pontuação.",
        "Diminua a distância do lançamento. 7 anos",
        "Aumente a quantidade de áreas de pontuação.",
        "Faça cinco lançamentos e some os pontos. 8 anos ou mais",
        "Acrescente obstáculos, como cadeiras ou caixas, que o avião deve sobrevoar.",
        "Faça campeonatos em equipe ou proponha que cada criança construa um modelo diferente de avião para comparar os resultados."
    ],
    "adultAttention": "Escolha um local livre de objetos frágeis e com espaço suficiente para os voos. Oriente as crianças a aguardarem sua vez antes de buscar os aviões, evitando correr enquanto outro participante estiver lançando. Aproveite para incentivar a cooperação e valorizar o esforço de cada criança, lembrando que o mais importante é experimentar, aprender e se divertir. 🌟",
    "finalPhrase": "Quando uma brincadeira desperta a curiosidade, cada voo se transforma em uma nova descoberta.",
    "videoUrl": "",
    "image": img05
},
{
    "id": 6,
    "slug": "medida-certa",
    "title": "Medida Certa",
    "age": "6 a 8 anos",
    "time": "15 a 30 minutos",
    "mess": "☆☆☆ (Baixo)",
    "summary": "Brincar com água sempre desperta o interesse das crianças, e nesta atividade ela se transforma em uma excelente oportunidade para desenvolver concentração, controle dos...",
    "importance": "Brincar com água sempre desperta o interesse das crianças, e nesta atividade ela se transforma em uma excelente oportunidade para desenvolver concentração, controle dos movimentos e noções matemáticas. O objetivo parece simples, mas exige paciência, coordenação e muita atenção para colocar a quantidade certa de água em cada copo. Além de divertida, essa brincadeira apresenta conceitos importantes como medida, comparação e volume de forma prática e natural.",
    "prepare": "- Separe vários copos transparentes. - Cole uma tira de fita crepe em alturas diferentes em cada copo. - Encha uma jarra ou garrafa com água. - Se desejar, coloque algumas gotas de corante alimentício para deixar a atividade mais atrativa. - Proteja a mesa ou faça a brincadeira em uma área externa.",
    "play": "Entregue a jarra com água para a criança. Ela deverá encher um copo de cada vez até que o nível da água alcance exatamente a fita crepe. O desafio é não ultrapassar a marca e nem deixar abaixo dela. Quando terminar um copo, passa para o próximo. Para deixar ainda mais divertido, vocês podem fazer competições saudáveis: - Quem consegue acertar mais copos? - Quem erra menos? - Quem consegue fazer em menos tempo sem derramar água? Também é possível aumentar a dificuldade utilizando copos de tamanhos diferentes.",
    "learns": [
        "Noções de medida e volume.",
        "Controle da força e dos movimentos.",
        "Atenção aos detalhes.",
        "Comparação entre quantidades.",
        "Planejamento e autocontrole."
    ],
    "skills": [
        "Coordenação motora fina",
        "Coordenação olho-mão",
        "Concentração",
        "Precisão dos movimentos",
        "Controle da força",
        "Percepção visual",
        "Noção matemática de quantidade",
        "Autonomia"
    ],
    "flavinhaTip": "Depois que a criança dominar o desafio, aumente a dificuldade usando recipientes de formatos diferentes, como taças plásticas, potes, garrafas ou funis. Outra ideia é brincar vendando parcialmente um dos olhos ou utilizando apenas a mão não dominante, tornando o desafio ainda mais divertido e estimulando novas habilidades.",
    "adaptation": [
        "6 anos",
        "Utilize apenas dois ou três copos.",
        "Faça marcas maiores e mais fáceis de visualizar. 7 anos",
        "Utilize copos de tamanhos variados.",
        "Faça marcas em alturas diferentes. 8 anos ou mais",
        "Acrescente um cronômetro.",
        "Utilize um copo medidor para que a criança descubra aproximadamente quantos mililitros cabem até cada marca.",
        "Proponha desafios como transportar a água usando uma colher ou uma esponja antes de completar os copos."
    ],
    "adultAttention": "A atividade deve ser realizada sobre uma superfície segura para evitar escorregões caso a água derrame. Tenha um pano por perto para secar rapidamente qualquer excesso. Lembre-se de que o objetivo não é acertar de primeira, mas desenvolver o controle dos movimentos e a paciência. Valorize cada tentativa e incentive a criança a observar onde errou para ajustar na próxima vez. 🌟",
    "finalPhrase": "Quando a criança aprende a controlar pequenos movimentos, ela também desenvolve grandes habilidades para a vida.",
    "videoUrl": "",
    "image": img06
},
{
    "id": 7,
    "slug": "pista-de-carrinho-com-fita-crepe",
    "title": "Pista de Carrinho com Fita Crepe",
    "age": "6 a 8 anos",
    "time": "30 a 60 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "Quem disse que é preciso comprar uma pista enorme para brincar de carrinho? Com um pouco de fita crepe e muita imaginação, qualquer quarto ou sala pode se transformar em uma...",
    "importance": "Quem disse que é preciso comprar uma pista enorme para brincar de carrinho? Com um pouco de fita crepe e muita imaginação, qualquer quarto ou sala pode se transformar em uma verdadeira cidade. Nesta atividade, a criança cria histórias, inventa trajetos, organiza o trânsito e desenvolve importantes habilidades cognitivas enquanto brinca livremente. Além da diversão, ela aprende sobre organização, planejamento e convivência no trânsito de forma natural.",
    "prepare": "- Escolha um espaço livre no chão. - Utilize fita crepe para desenhar ruas e cruzamentos. - Faça faixas de pedestres, estacionamentos e vagas. - Acrescente curvas, retornos e diferentes caminhos. - Separe carrinhos, ônibus, caminhões ou qualquer veículo de brinquedo que a criança tenha. Se quiser deixar a cidade ainda mais divertida, utilize caixas de papelão para montar prédios, escolas, hospitais ou postos de gasolina.",
    "play": "Depois que a cidade estiver pronta, deixe a criança explorar livremente. Ela pode: - estacionar corretamente os carros; - respeitar a faixa de pedestres; - criar histórias com os personagens; - levar passageiros para diferentes lugares; - fazer entregas; - inventar missões e desafios. Outra opção é brincar em dupla, onde cada participante dirige um veículo e precisa respeitar o trânsito para evitar \"acidentes\". Quanto mais a criança cria situações, mais rica fica a brincadeira.",
    "learns": [
        "Organização espacial.",
        "Planejamento de trajetos.",
        "Regras básicas de trânsito.",
        "Imaginação e faz de conta.",
        "Resolução de problemas durante a brincadeira."
    ],
    "skills": [
        "Coordenação motora fina",
        "Coordenação olho-mão",
        "Criatividade",
        "Imaginação",
        "Organização espacial",
        "Linguagem oral",
        "Planejamento",
        "Resolução de problemas",
        "Brincadeira simbólica",
        "Interação social"
    ],
    "flavinhaTip": "Conforme a brincadeira evoluir, vá acrescentando novos elementos na cidade: um semáforo desenhado no papel, placas de trânsito, uma rotatória, um posto de gasolina, uma oficina mecânica, um lava-jato ou até uma ponte feita com caixas. A própria criança pode participar da construção da cidade. Isso torna a brincadeira ainda mais significativa e estimula sua criatividade desde o início.",
    "adaptation": [
        "6 anos",
        "Faça uma pista simples, com poucas ruas e curvas.",
        "Incentive a criança a nomear os lugares da cidade. 7 anos",
        "Acrescente estacionamentos, cruzamentos e placas de trânsito.",
        "Crie pequenas missões, como levar um paciente ao hospital ou fazer uma entrega. 8 anos ou mais",
        "Monte uma cidade maior ocupando mais de um cômodo.",
        "Introduza desafios, como respeitar sentido das ruas, sinais de trânsito e tempo para concluir uma missão.",
        "Convide irmãos ou amigos para brincar juntos, estimulando cooperação e negociação durante o faz de conta."
    ],
    "adultAttention": "Utilize fita crepe que não danifique o piso e retire-a logo após a brincadeira para evitar resíduos. Durante a atividade, incentive a criança a criar histórias e resolver pequenos desafios sozinha. O adulto pode participar como um personagem da cidade, mas deixe que ela conduza a brincadeira. É justamente essa liberdade que favorece o desenvolvimento da criatividade, da autonomia e da capacidade de resolver problemas. 🌟",
    "finalPhrase": "Quando a imaginação assume a direção, qualquer cantinho da casa pode se transformar em uma grande aventura.",
    "videoUrl": "",
    "image": img07
},
{
    "id": 8,
    "slug": "6-linhas-6-pulos",
    "title": "6 Linhas, 6 Pulos",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "Com apenas algumas tiras de fita crepe no chão, é possível criar um circuito cheio de movimento e desafios. Nesta brincadeira, cada linha representa uma missão diferente,...",
    "importance": "Com apenas algumas tiras de fita crepe no chão, é possível criar um circuito cheio de movimento e desafios. Nesta brincadeira, cada linha representa uma missão diferente, fazendo com que a criança explore diversas formas de pular, equilibrar o corpo e controlar seus movimentos. Além de gastar energia de forma saudável, ela desenvolve habilidades motoras fundamentais para o dia a dia e fortalece sua autoconfiança ao superar cada desafio.",
    "prepare": "- Escolha um corredor ou espaço livre. - Cole seis tiras de fita crepe no chão, mantendo uma pequena distância entre elas. - Explique que cada linha representa um desafio diferente. Você pode numerar as linhas ou desenhar pequenos símbolos para ajudar a criança a lembrar de cada missão.",
    "play": "Cada linha corresponde a um tipo diferente de pulo: Linha 1: Pulo mais distante possível. Linha 2: Abrir as pernas o máximo que conseguir ao saltar. Linha 3: Pular usando apenas um pé. Linha 4: Pular de costas. Linha 5: Fazer o movimento como se estivesse \"escalando uma parede\", colocando as mãos para cima enquanto avança pulando. Linha 6: Pulo cruzado — alternando os pés para os lados, cruzando o corpo durante os saltos. Após completar o circuito, a criança pode repetir tentando melhorar seu desempenho ou fazer o percurso em menos tempo. Também é possível brincar em dupla, onde um desafia o outro a completar todas as etapas sem errar.",
    "learns": [
        "Coordenação motora.",
        "Equilíbrio corporal.",
        "Controle dos movimentos.",
        "Noção espacial.",
        "Planejamento motor.",
        "Persistência diante dos desafios."
    ],
    "skills": [
        "Coordenação motora grossa",
        "Equilíbrio",
        "Agilidade",
        "Consciência corporal",
        "Lateralidade",
        "Força muscular",
        "Controle postural",
        "Atenção",
        "Concentração",
        "Autoconfiança"
    ],
    "flavinhaTip": "Depois que a criança dominar o circuito, deixe que ela invente novos desafios para cada linha. Além de aumentar o interesse pela brincadeira, isso estimula a criatividade, a autonomia e o planejamento. Outra ideia divertida é trocar os desafios toda vez que brincarem. Assim, o circuito nunca fica igual.",
    "adaptation": [
        "6 anos",
        "Diminua a distância entre as linhas.",
        "Faça apenas quatro desafios. 7 anos",
        "Utilize todas as seis linhas.",
        "Acrescente um cronômetro para desafiar a criança a melhorar seu próprio tempo. 8 anos ou mais",
        "Faça o circuito segurando uma bolinha.",
        "Acrescente obstáculos entre as linhas.",
        "Monte um campeonato em família, onde cada participante cria um novo desafio para o circuito."
    ],
    "adultAttention": "Certifique-se de que o piso não esteja escorregadio e que o espaço esteja livre de móveis ou objetos que possam causar acidentes. Lembre-se de respeitar os limites físicos da criança. O objetivo é incentivar o movimento e a superação de desafios de forma divertida, sem transformar a brincadeira em uma competição excessiva. 🌟",
    "finalPhrase": "Cada salto fortalece o corpo, a confiança e mostra à criança que ela é capaz de superar novos desafios brincando.",
    "videoUrl": "",
    "image": img08
},
{
    "id": 9,
    "slug": "boia-ou-afunda",
    "title": "Boia ou Afunda",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆ (Médio)",
    "summary": "A ciência está presente nas pequenas descobertas do dia a dia. Nesta atividade, a criança faz previsões, testa hipóteses e observa os resultados de forma prática e divertida....",
    "importance": "A ciência está presente nas pequenas descobertas do dia a dia. Nesta atividade, a criança faz previsões, testa hipóteses e observa os resultados de forma prática e divertida. Antes mesmo de colocar os objetos na água, incentive a criança a pensar: \"Será que isso vai boiar ou afundar?\". Depois, é só conferir se ela acertou e conversar sobre o motivo de cada resultado. Assim, além da diversão, a brincadeira desperta a curiosidade, o pensamento científico e o gosto por investigar.",
    "prepare": "- Encha um balde, uma bacia ou uma caixa organizadora com água. - Separe diferentes objetos encontrados em casa, como: ○ colher de metal; ○ tampinha plástica; ○ pedra; ○ esponja; ○ folha; ○ bola de pingue-pongue; ○ moeda; ○ rolha; ○ brinquedos pequenos; ○ chave; ○ lápis. - Coloque uma toalha no chão para evitar molhar o ambiente.",
    "play": "Antes de colocar cada objeto na água, pergunte à criança: \"Você acha que ele vai boiar ou afundar?\" Depois da resposta, coloquem o objeto na água e observem juntos o que acontece. Conversem sobre o resultado e façam novas tentativas com outros materiais. No final, vocês podem separar os objetos em dois grupos: 🌊 Boiaram ⬇ Afundaram Outra ideia divertida é registrar os resultados em uma folha, marcando um - sempre que a previsão estiver correta.",
    "learns": [
        "Método científico.",
        "Fazer hipóteses.",
        "Observar resultados.",
        "Comparar materiais.",
        "Conceitos básicos de densidade e flutuação.",
        "Resolver problemas por meio da investigação."
    ],
    "skills": [
        "Curiosidade científica",
        "Observação",
        "Atenção",
        "Raciocínio lógico",
        "Comparação",
        "Linguagem oral",
        "Formulação de hipóteses",
        "Pensamento investigativo",
        "Coordenação motora"
    ],
    "flavinhaTip": "Depois da primeira rodada, pergunte: \"Será que o tamanho do objeto influencia? Ou será que é o material?\" Essa conversa incentiva a criança a pensar além da resposta certa ou errada e a criar novas hipóteses. Vocês também podem repetir a experiência usando água com sal e observar se algum objeto passa a boiar, despertando ainda mais a curiosidade sobre a ciência.",
    "adaptation": [
        "6 anos",
        "Utilize poucos objetos e incentive a criança apenas a prever se boia ou afunda. 7 anos",
        "Peça para explicar por que acredita que determinado objeto terá aquele comportamento. 8 anos ou mais",
        "Monte uma tabela registrando: ○ Nome do objeto ○ Minha hipótese ○ Resultado ○ Acertei? Depois conversem sobre os padrões encontrados."
    ],
    "adultAttention": "Utilize apenas objetos seguros, sem pontas ou peças pequenas que possam representar risco para crianças menores. A brincadeira deve acontecer sempre com supervisão de um adulto. Aproveite para incentivar a criança a observar, fazer perguntas e descobrir as respostas por conta própria, em vez de simplesmente explicar tudo. A investigação faz parte do aprendizado. 🌟",
    "finalPhrase": "Grandes cientistas começam exatamente assim: fazendo perguntas, testando ideias e descobrindo o mundo através da curiosidade.",
    "videoUrl": "",
    "image": img09
},
{
    "id": 10,
    "slug": "o-cabelo-da-lele",
    "title": "O Cabelo da Lelê",
    "age": "6 a 8 anos",
    "time": "20 a 40 minutos",
    "mess": "☆☆☆ (Baixo)",
    "summary": "As brincadeiras também podem ensinar valores importantes. Nesta atividade, a criança é convidada a criar diferentes penteados para a personagem Lelê utilizando materiais...",
    "importance": "As brincadeiras também podem ensinar valores importantes. Nesta atividade, a criança é convidada a criar diferentes penteados para a personagem Lelê utilizando materiais variados, explorando texturas, cores e formatos. Enquanto monta o cabelo da personagem, ela desenvolve a criatividade e a coordenação motora, além de abrir espaço para conversas sobre identidade, respeito às diferenças e valorização da beleza de cada pessoa. Inspirada no livro \"O Cabelo de Lelê\", esta brincadeira mostra que cada cabelo é único, bonito e cheio de história.",
    "prepare": "- Imprima ou desenhe o rosto da personagem. - Separe diferentes materiais para criar os cabelos, como: ○ lã; ○ barbante; ○ papel colorido; ○ papel crepom; ○ EVA; ○ algodão; ○ papel picado; ○ fitas; ○ pompons; ○ retalhos de tecido. - Disponibilize cola, tesoura sem ponta e lápis de cor.",
    "play": "Convide a criança para imaginar como será o cabelo da Lelê. Ela poderá escolher livremente os materiais, misturando texturas, tamanhos e cores para criar penteados únicos. Durante a atividade, aproveite para conversar sobre como cada pessoa possui características diferentes e especiais. Depois de pronta, a criança pode contar uma história sobre a personagem ou apresentar sua criação para a família. Outra ideia divertida é criar várias versões da Lelê, cada uma com um estilo diferente.",
    "learns": [
        "Valorização da diversidade.",
        "Respeito às diferenças.",
        "Criatividade.",
        "Expressão artística.",
        "Autoestima.",
        "Construção da identidade."
    ],
    "skills": [
        "Coordenação motora fina",
        "Criatividade",
        "Imaginação",
        "Expressão artística",
        "Linguagem oral",
        "Atenção",
        "Planejamento",
        "Percepção visual",
        "Desenvolvimento socioemocional",
        "Empatia"
    ],
    "flavinhaTip": "Depois da brincadeira, leia com a criança o livro \"O Cabelo de Lelê\", de Valéria Belém. A história complementa perfeitamente a atividade e proporciona uma conversa rica sobre autoestima, identidade, respeito e valorização da diversidade. Você também pode convidar a criança a desenhar o próprio cabelo ou o de alguém da família, mostrando que cada pessoa é bonita exatamente como é.",
    "adaptation": [
        "6 anos",
        "Utilize poucos materiais e deixe a criança explorar livremente.",
        "Foque na criatividade, sem preocupação com o resultado. 7 anos",
        "Incentive a criação de diferentes penteados e texturas.",
        "Peça para contar uma pequena história sobre a personagem. 8 anos ou mais",
        "Convide a criança a pesquisar diferentes tipos de cabelos e penteados presentes em diversas culturas.",
        "Proponha criar uma exposição com personagens variados, reforçando a importância da diversidade."
    ],
    "adultAttention": "Evite direcionar a criança para um único tipo de cabelo. O objetivo da atividade é justamente mostrar que a beleza está na diversidade e que todas as pessoas merecem ser respeitadas e valorizadas. Aproveite esse momento para ouvir a criança, acolher suas percepções e incentivar conversas positivas sobre autoestima, identidade e respeito às diferenças. 🌟",
    "finalPhrase": "Quando ensinamos uma criança a respeitar as diferenças, ajudamos a construir um mundo mais bonito para todos.\" 💛.",
    "videoUrl": "",
    "image": img10
},
{
    "id": 11,
    "slug": "aprendendo-a-reciclar",
    "title": "Aprendendo a Reciclar",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "A educação ambiental pode começar dentro de casa e de maneira muito divertida. Nesta atividade, a criança aprende a identificar os diferentes tipos de resíduos e a separá-los...",
    "importance": "A educação ambiental pode começar dentro de casa e de maneira muito divertida. Nesta atividade, a criança aprende a identificar os diferentes tipos de resíduos e a separá-los nas lixeiras corretas, entendendo que pequenas atitudes fazem uma grande diferença para o planeta. Enquanto brinca, ela desenvolve o senso de responsabilidade, aprende sobre sustentabilidade e percebe que reciclar faz parte dos cuidados que todos devemos ter com o meio ambiente.",
    "prepare": "- Imprima o arquivo do jogo ou monte as lixeiras utilizando rolos de papel higiênico pintados nas cores da coleta seletiva. - Recorte as fichas com os diferentes resíduos (papel, plástico, vidro, metal e orgânicos). - Fixe cada imagem em um palito de picolé ou utilize apenas as figuras recortadas. - Organize as lixeiras sobre uma mesa ou no chão.",
    "play": "Misture todas as figuras dos resíduos. A criança deverá observar cada desenho e decidir em qual lixeira ele deve ser colocado. Durante a brincadeira, incentive perguntas como: - \"De que material isso é feito?\" - \"Será que pode ser reciclado?\" - \"O que acontece com esse lixo depois que vai embora da nossa casa?\" Ao final, revisem juntos as respostas e conversem sobre como pequenas atitudes ajudam a cuidar do planeta. Também é possível transformar a atividade em uma competição saudável, marcando um ponto para cada acerto.",
    "learns": [
        "Separação correta dos resíduos.",
        "Educação ambiental.",
        "Sustentabilidade.",
        "Consumo consciente.",
        "Responsabilidade com o meio ambiente.",
        "Importância da reciclagem."
    ],
    "skills": [
        "Observação",
        "Classificação",
        "Associação",
        "Atenção",
        "Raciocínio lógico",
        "Consciência ambiental",
        "Responsabilidade",
        "Memória",
        "Linguagem oral",
        "Tomada de decisão"
    ],
    "flavinhaTip": "Depois da brincadeira, faça um desafio em família: durante uma semana, toda vez que alguém for jogar algo no lixo, a criança será a \"fiscal da reciclagem\" e ajudará a identificar a lixeira correta. Outra ideia é fazer uma caminhada pelo bairro observando se existem lixeiras de coleta seletiva e conversar sobre a importância desse serviço para a cidade.",
    "adaptation": [
        "6 anos",
        "Trabalhe apenas três categorias (papel, plástico e metal).",
        "Ajude a criança a identificar cada material. 7 anos",
        "Utilize todas as categorias da coleta seletiva.",
        "Peça que explique por que escolheu determinada lixeira. 8 anos ou mais",
        "Acrescente desafios extras, como separar materiais recicláveis e não recicláveis.",
        "Converse sobre redução do consumo, reutilização de materiais e compostagem dos resíduos orgânicos."
    ],
    "adultAttention": "Explique que nem todo material pode ser reciclado e que alguns resíduos precisam estar limpos para serem encaminhados à reciclagem. Sempre que possível, relacione a brincadeira com situações reais do dia a dia, incentivando a criança a participar da separação do lixo em casa. Assim, o aprendizado deixa de ser apenas uma atividade e passa a fazer parte da rotina da família. 🌟",
    "finalPhrase": "Cuidar do planeta começa com pequenos gestos. Quando uma criança aprende a reciclar hoje, ela ajuda a construir um mundo melhor para o amanhã.\" 🌎♻",
    "videoUrl": "",
    "image": img11
},
{
    "id": 12,
    "slug": "pintura-com-cola-colorida",
    "title": "Pintura com Cola Colorida",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆ (Médio)",
    "summary": "Nem toda obra de arte precisa de pincéis. Nesta atividade, a criança utiliza cola colorida para criar desenhos livres que, ao dobrar a folha ao meio, se transformam em pinturas...",
    "importance": "Nem toda obra de arte precisa de pincéis. Nesta atividade, a criança utiliza cola colorida para criar desenhos livres que, ao dobrar a folha ao meio, se transformam em pinturas únicas e cheias de formas inesperadas. Além de estimular a criatividade, a brincadeira desperta a curiosidade, incentiva a experimentação e mostra que a arte também pode surgir através de descobertas. O resultado é sempre uma surpresa, tornando cada criação exclusiva.",
    "prepare": "- Separe folhas de papel sulfite ou cartolina. - Disponibilize cola colorida (ou cola branca com corante alimentício). - Proteja a mesa com jornal, papel kraft ou uma toalha plástica. - Tenha um pano úmido por perto para limpar as mãos, se necessário.",
    "play": "Convide a criança a fazer desenhos livres utilizando apenas a cola colorida. Ela pode criar linhas, bolinhas, espirais, corações, letras ou qualquer outra forma que imaginar. Antes que a cola seque, dobre cuidadosamente a folha ao meio e pressione levemente com as mãos. Depois, abra o papel e descubra a pintura criada. Cada dobra revelará uma composição diferente, incentivando novas tentativas e muita criatividade. Ao final, deixe as obras secarem completamente e monte uma pequena exposição com todas as criações.",
    "learns": [
        "Criatividade.",
        "Experimentação artística.",
        "Mistura de cores.",
        "Observação de formas.",
        "Noção de simetria.",
        "Expressão livre através da arte."
    ],
    "skills": [
        "Coordenação motora fina",
        "Criatividade",
        "Imaginação",
        "Percepção visual",
        "Coordenação olho-mão",
        "Planejamento",
        "Expressão artística",
        "Concentração",
        "Autonomia"
    ],
    "flavinhaTip": "Depois que a pintura secar, incentive a criança a observar a imagem e perguntar: \"O que essa pintura parece?\" Talvez ela enxergue uma borboleta, uma flor, um monstro divertido ou até um coração. Essa interpretação estimula a imaginação e mostra que cada pessoa pode enxergar algo diferente na mesma obra. Outra ideia é emoldurar as pinturas ou criar um mural artístico em casa para valorizar a produção da criança.",
    "adaptation": [
        "6 anos",
        "Utilize apenas duas ou três cores.",
        "Incentive desenhos simples, como linhas e bolinhas. 7 anos",
        "Experimente diferentes combinações de cores.",
        "Faça perguntas sobre as formas que surgiram após abrir o papel. 8 anos ou mais",
        "Desafie a criança a criar desenhos planejando como eles ficarão depois da dobra.",
        "Aproveite para apresentar o conceito de simetria, mostrando como um lado da pintura se reflete no outro."
    ],
    "adultAttention": "Utilize materiais atóxicos e apropriados para crianças. Não se preocupe com o resultado \"bonito\". O objetivo da atividade é explorar, experimentar e permitir que a criança se expresse livremente. Valorize o processo criativo muito mais do que o produto final. 🌟",
    "finalPhrase": "Na arte não existe certo ou errado. Existe imaginação, descoberta e a alegria de criar algo único com as próprias mãos.\" 🎨",
    "videoUrl": "",
    "image": img12
},
{
    "id": 13,
    "slug": "campo-minado-com-giz",
    "title": "Campo Minado com Giz",
    "age": "6 a 8 anos",
    "time": "20 a 40 minutos",
    "mess": "☆☆☆ (Baixo)",
    "summary": "Quem disse que o famoso jogo Campo Minado só existe no computador? Nesta versão gigante, a brincadeira ganha vida no chão e transforma qualquer quintal, garagem ou calçada em...",
    "importance": "Quem disse que o famoso jogo Campo Minado só existe no computador? Nesta versão gigante, a brincadeira ganha vida no chão e transforma qualquer quintal, garagem ou calçada em um circuito cheio de desafios. A criança precisa observar, memorizar e planejar seus passos para atravessar o percurso sem pisar nas \"bombas\". A cada tentativa, ela aprende com os erros, cria estratégias e desenvolve habilidades importantes como raciocínio lógico, memória e tomada de decisão. É uma brincadeira que une movimento, diversão e muito pensamento estratégico.",
    "prepare": "- Escolha um espaço no chão (quintal, garagem, calçada ou área externa). - Com giz, desenhe três colunas com vários círculos formando um caminho. - Em uma folha de papel, faça o mesmo desenho. - Marque secretamente em quais círculos estarão as \"bombas\". - Apenas o adulto conhece o mapa.",
    "play": "A criança começa no primeiro círculo. Ela deverá escolher um caminho tentando atravessar todo o percurso. Se pisar em um círculo que representa uma bomba... 💥 \"Explodiu!\" Ela volta ao início e tenta novamente. Na próxima tentativa, ela já sabe onde estava aquela bomba e poderá escolher outro caminho. O objetivo é chegar até o final descobrindo todas as posições seguras. Quanto mais jogar, mais estratégias ela desenvolverá.",
    "learns": [
        "Planejamento.",
        "Formulação de hipóteses.",
        "Memorização.",
        "Resolução de problemas.",
        "Persistência.",
        "Aprender com os próprios erros."
    ],
    "skills": [
        "Memória",
        "Raciocínio lógico",
        "Atenção",
        "Estratégia",
        "Coordenação motora grossa",
        "Equilíbrio",
        "Organização espacial",
        "Controle emocional",
        "Perseverança"
    ],
    "flavinhaTip": "Depois que a criança conseguir completar o percurso, troque completamente a posição das bombas e comece uma nova rodada. Outra ideia divertida é inverter os papéis: a própria criança monta o campo minado e desafia os pais, irmãos ou amigos a encontrarem o caminho seguro. Isso faz com que ela exercite ainda mais o planejamento e o raciocínio.",
    "adaptation": [
        "6 anos",
        "Faça um percurso menor.",
        "Utilize apenas uma ou duas bombas. 7 anos",
        "Aumente a quantidade de círculos.",
        "Acrescente mais caminhos possíveis. 8 anos ou mais",
        "Crie dois ou três mapas diferentes e sorteie um sem que ninguém saiba qual será utilizado.",
        "Faça o desafio contra o tempo.",
        "Brinque em equipes, incentivando que conversem e decidam juntos qual caminho seguir."
    ],
    "adultAttention": "O objetivo da brincadeira não é apenas chegar ao final, mas incentivar a criança a pensar antes de agir. Evite revelar onde estão as bombas. Em vez disso, incentive perguntas como: \"Qual caminho parece mais seguro?\" \"O que você aprendeu na última tentativa?\" Assim, ela desenvolverá autonomia para criar suas próprias estratégias. Caso a atividade seja feita em área externa, certifique-se de que o piso seja plano e seguro para evitar escorregões. 🌟",
    "finalPhrase": "Errar faz parte da brincadeira. Cada nova tentativa ensina a criança a pensar melhor, persistir e encontrar novos caminhos para superar desafios.",
    "videoUrl": "",
    "image": img13
},
{
    "id": 14,
    "slug": "pega-bolinha-com-mao-de-papelao",
    "title": "Pega Bolinha com Mão de Papelão",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆☆ (Baixo)",
    "summary": "Nem sempre é preciso um brinquedo sofisticado para criar uma brincadeira divertida. Com um pedaço de papelão e muita criatividade, é possível construir uma mão gigante que...",
    "importance": "Nem sempre é preciso um brinquedo sofisticado para criar uma brincadeira divertida. Com um pedaço de papelão e muita criatividade, é possível construir uma mão gigante que transforma um simples desafio de pegar bolinhas em uma atividade cheia de risadas. Além de estimular os reflexos e a coordenação motora, a brincadeira trabalha atenção, tempo de reação e controle dos movimentos. Cada lançamento exige concentração e faz a criança desenvolver habilidades importantes de maneira leve e divertida.",
    "prepare": "- Desenhe o contorno de uma mão em um pedaço de papelão. - Recorte o molde. - Faça duas mãos, uma para cada participante, se desejar. - Separe bolinhas leves, como: ○ bolinhas de piscina; ○ bolinhas de papel; ○ pompons grandes; ○ bolinhas de EVA; ○ bolas de pingue-pongue. Escolha um espaço onde as crianças possam se movimentar livremente.",
    "play": "Uma pessoa ficará responsável por lançar as bolinhas. A criança deverá utilizar apenas a mão de papelão para tentar pegá-las. Cada bolinha capturada vale um ponto. Após algumas rodadas, troquem os papéis para que todos possam lançar e também tentar pegar. Vocês também podem criar desafios diferentes, como: - pegar apenas bolinhas de determinada cor; - lançar duas bolinhas ao mesmo tempo; - aumentar gradativamente a distância dos lançamentos; - fazer uma competição para descobrir quem consegue pegar mais bolinhas em um minuto.",
    "learns": [
        "Coordenação entre visão e movimento.",
        "Tempo de reação.",
        "Controle corporal.",
        "Atenção.",
        "Planejamento dos movimentos.",
        "Estratégias para antecipar a trajetória da bolinha."
    ],
    "skills": [
        "Coordenação motora ampla",
        "Coordenação olho-mão",
        "Reflexo",
        "Agilidade",
        "Atenção",
        "Concentração",
        "Tempo de reação",
        "Controle dos movimentos",
        "Percepção espacial",
        "Persistência"
    ],
    "flavinhaTip": "Para deixar a brincadeira ainda mais divertida, utilize bolinhas de cores diferentes e atribua uma pontuação para cada uma. Por exemplo: 🟡 Amarela = 10 pontos 🔵 Azul = 20 pontos 🔴 Vermelha = 50 pontos Assim, além do desafio motor, a criança também trabalha estratégias e realiza pequenas somas durante a brincadeira. Outra ideia é colocar uma música animada e fazer os lançamentos no ritmo da música.",
    "adaptation": [
        "6 anos",
        "Utilize bolinhas maiores e lançamentos mais lentos.",
        "Diminua a distância entre quem lança e quem pega. 7 anos",
        "Utilize bolinhas menores.",
        "Alterne a velocidade dos lançamentos. 8 anos ou mais",
        "Lance duas bolinhas ao mesmo tempo.",
        "Faça desafios utilizando apenas a mão direita ou apenas a esquerda.",
        "Cronometre um minuto e veja quantas bolinhas a criança consegue pegar."
    ],
    "adultAttention": "Escolha bolinhas leves para evitar qualquer risco de machucar durante os lançamentos. O objetivo não é competir para descobrir quem é o melhor, mas incentivar que a criança desenvolva seus reflexos, sua coordenação e sua autoconfiança. Valorize cada tentativa e incentive-a a perceber que, com prática, ela conseguirá melhorar cada vez mais. 🌟",
    "finalPhrase": "Brincadeiras simples despertam grandes habilidades. Cada bolinha pega é uma conquista para o corpo, para o cérebro e para a confiança da criança.\" 🖐",
    "videoUrl": "",
    "image": img14
},
{
    "id": 15,
    "slug": "pareando-as-letras",
    "title": "Pareando as Letras",
    "age": "6 a 8 anos",
    "time": "15 a 25 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "A alfabetização acontece muito além dos cadernos e livros. Nesta atividade, a criança aprende brincando ao relacionar letras maiúsculas e minúsculas, fortalecendo uma...",
    "importance": "A alfabetização acontece muito além dos cadernos e livros. Nesta atividade, a criança aprende brincando ao relacionar letras maiúsculas e minúsculas, fortalecendo uma habilidade essencial para a leitura e a escrita. A proposta é simples: encontrar, entre várias letras minúsculas espalhadas pela folha, o lugar correto para colar cada letra maiúscula. Enquanto procura, compara e faz associações, a criança desenvolve atenção, percepção visual e memória de maneira natural. É uma brincadeira perfeita para quem está iniciando ou consolidando o processo de alfabetização.",
    "prepare": "- Em uma folha de papel, escreva várias letras minúsculas espalhadas aleatoriamente. - Em post-its, cartões ou pedaços de papel, escreva as mesmas letras em maiúsculo. - Misture todos os cartões. - Disponibilize cola ou deixe os post-its prontos para serem colados.",
    "play": "Entregue para a criança a folha com as letras minúsculas. Em seguida, entregue os cartões com as letras maiúsculas. O desafio é encontrar o par correspondente e colar a letra maiúscula exatamente sobre a letra minúscula. Quando terminar todas as letras, revisem juntos o alfabeto. Depois, vocês podem brincar dizendo palavras que começam com cada letra encontrada. Exemplo: A -> Avião B -> Bola C -> Cachorro Isso torna a atividade ainda mais significativa.",
    "learns": [
        "Reconhecimento das letras.",
        "Diferença entre letras maiúsculas e minúsculas.",
        "Associação visual.",
        "Organização do alfabeto.",
        "Consciência fonológica.",
        "Ampliação do vocabulário."
    ],
    "skills": [
        "Alfabetização",
        "Atenção",
        "Memória visual",
        "Percepção visual",
        "Coordenação motora fina",
        "Linguagem oral",
        "Associação",
        "Concentração",
        "Discriminação visual",
        "Autonomia"
    ],
    "flavinhaTip": "Depois que a criança terminar a atividade, desafie-a a pensar em uma palavra que comece com cada letra encontrada. Outra ideia divertida é pedir que procure objetos da casa que iniciem com aquela letra. Assim, a brincadeira vai além do reconhecimento das letras e fortalece também o desenvolvimento da leitura e do vocabulário.",
    "adaptation": [
        "6 anos",
        "Trabalhe apenas algumas letras por vez (A até F, por exemplo).",
        "Utilize letras maiores e bem coloridas. 7 anos",
        "Utilize o alfabeto completo.",
        "Incentive a criança a dizer o som de cada letra. 8 anos ou mais",
        "Após encontrar cada letra, peça para escrever uma palavra iniciada por ela.",
        "Faça desafios com ordem alfabética ou classificação entre vogais e consoantes.",
        "Acrescente letras cursivas para ampliar o repertório."
    ],
    "adultAttention": "Evite transformar a atividade em uma avaliação. Caso a criança tenha dificuldade, incentive-a a observar atentamente os formatos das letras e permita que descubra a resposta sozinha. Valorize cada acerto e lembre-se de que o objetivo é tornar a alfabetização leve, divertida e prazerosa. 🌟",
    "finalPhrase": "Quando aprender acontece brincando, cada letra descoberta se transforma em uma nova porta para o mundo da leitura.\" 📚",
    "videoUrl": "",
    "image": img15
},
{
    "id": 16,
    "slug": "completando-a-arvore",
    "title": "Completando a Árvore",
    "age": "6 a 8 anos",
    "time": "15 a 25 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "Aprender matemática pode ser muito mais divertido quando a criança manipula os números com as próprias mãos. Nesta atividade, ela observa a quantidade de maçãs desenhadas em...",
    "importance": "Aprender matemática pode ser muito mais divertido quando a criança manipula os números com as próprias mãos. Nesta atividade, ela observa a quantidade de maçãs desenhadas em cada copa da árvore e deve encontrar o tronco com o número correspondente. Ao relacionar número e quantidade, a criança fortalece um dos conceitos mais importantes da alfabetização matemática: compreender que cada número representa uma quantidade específica. Além disso, a brincadeira estimula a atenção, a percepção visual e o raciocínio lógico de maneira leve e divertida.",
    "prepare": "- Utilize rolos de papel higiênico para representar os troncos das árvores. - Escreva em cada tronco um número (de 1 a 9 ou conforme a necessidade). - Recorte copas de árvores em papel colorido. - Em cada copa, desenhe diferentes quantidades de maçãs. - Misture todas as copas antes de iniciar a brincadeira.",
    "play": "A criança deverá observar atentamente quantas maçãs existem em cada copa. Depois, procurará o tronco que possui o número correspondente. Quando encontrar o número correto, basta encaixar ou posicionar a copa sobre o tronco. Ao final, todas as árvores estarão completas. Depois de terminar, incentive a criança a contar novamente cada copa para conferir se todas as combinações estão corretas.",
    "learns": [
        "Associação entre número e quantidade.",
        "Contagem.",
        "Comparação de quantidades.",
        "Organização.",
        "Noções matemáticas iniciais.",
        "Resolução de problemas."
    ],
    "skills": [
        "Raciocínio lógico",
        "Contagem",
        "Associação número-quantidade",
        "Atenção",
        "Coordenação motora fina",
        "Percepção visual",
        "Memória",
        "Organização",
        "Autonomia"
    ],
    "flavinhaTip": "Depois que a criança dominar a atividade, substitua as maçãs por outros elementos para renovar a brincadeira. Você pode utilizar: 🍊 Laranjas 🍓 Morangos 🌸 Flores 🍂 Folhas 🐞 Joaninhas Também vale inverter o desafio: entregue apenas os troncos numerados e peça para a própria criança desenhar a quantidade correta de frutas em cada copa. Assim ela deixa de apenas identificar e passa a produzir as quantidades, reforçando ainda mais a aprendizagem.",
    "adaptation": [
        "6 anos",
        "Trabalhe apenas os números de 1 a 5.",
        "Utilize figuras maiores e bem espaçadas. 7 anos",
        "Utilize números de 1 a 10.",
        "Incentive a criança a contar as frutas em voz alta antes de encaixar. 8 anos ou mais",
        "Acrescente operações matemáticas nos troncos, como: ○ 3 + 2 ○ 7",
        "1 ○ 2 + 5 A criança deverá encontrar o resultado correto. Outra opção é utilizar números maiores ou desafios com dezenas."
    ],
    "adultAttention": "Evite corrigir imediatamente caso a criança erre. Pergunte: \"Vamos contar juntos mais uma vez?\" Esse tipo de incentivo ajuda a criança a desenvolver autonomia e confiança para encontrar a resposta sozinha. Sempre valorize o processo de descoberta, e não apenas o acerto final. 🌟",
    "finalPhrase": "Quando a matemática ganha forma, cor e movimento, os números deixam de ser apenas símbolos e passam a fazer sentido para a criança.\" 🍎🌳",
    "videoUrl": "",
    "image": img16
},
{
    "id": 17,
    "slug": "simetria",
    "title": "Simetria",
    "age": "6 a 8 anos",
    "time": "20 a 30 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "A simetria está presente em muitos lugares da natureza: nas asas das borboletas, nas folhas, nas flores e até no rosto das pessoas. Nesta atividade, a criança é convidada a...",
    "importance": "A simetria está presente em muitos lugares da natureza: nas asas das borboletas, nas folhas, nas flores e até no rosto das pessoas. Nesta atividade, a criança é convidada a observar apenas metade de um desenho e completar a outra metade da forma mais parecida possível. Enquanto desenha, ela compara formas, tamanhos, posições e distâncias, exercitando a atenção aos detalhes e o raciocínio espacial. Além de ser uma atividade artística, também desenvolve importantes habilidades matemáticas e cognitivas.",
    "prepare": "- Imprima a folha da atividade com os desenhos pela metade. - Disponibilize lápis, borracha e lápis de cor ou canetinhas. - Escolha um local bem iluminado para facilitar a observação dos detalhes.",
    "play": "Entregue a folha para a criança e explique que ela deverá desenhar o outro lado da figura, tentando deixá-lo o mais parecido possível com a parte já pronta. Depois de completar o desenho, incentive-a a colorir utilizando as mesmas cores dos dois lados, mantendo a simetria. Ao terminar, conversem sobre onde mais encontramos simetria no dia a dia e observem objetos da casa ou elementos da natureza que também possuem esse padrão.",
    "learns": [
        "Conceito de simetria.",
        "Observação de detalhes.",
        "Noção espacial.",
        "Comparação de formas.",
        "Planejamento do desenho.",
        "Organização visual."
    ],
    "skills": [
        "Coordenação motora fina",
        "Percepção visual",
        "Atenção aos detalhes",
        "Organização espacial",
        "Raciocínio lógico",
        "Criatividade",
        "Planejamento",
        "Concentração",
        "Precisão dos movimentos",
        "Expressão artística"
    ],
    "flavinhaTip": "Depois de completar os desenhos do material, proponha um novo desafio: dobre uma folha ao meio, desenhe apenas metade de um objeto ou personagem e peça para a criança completar o restante. Outra ideia divertida é usar um espelho pequeno encostado na linha central do desenho para que ela visualize como a figura completa deveria ficar. Essa estratégia ajuda muito na compreensão do conceito de simetria.",
    "adaptation": [
        "6 anos",
        "Utilize desenhos com poucos detalhes e linhas mais simples.",
        "Ajude a criança mostrando como observar cada parte do desenho. 7 anos",
        "Trabalhe figuras com mais elementos e incentive a comparação entre os dois lados. 8 anos ou mais",
        "Proponha que a própria criança crie metade de um desenho para outra pessoa completar.",
        "Experimente trabalhar também com simetria em papel quadriculado ou utilizando figuras geométricas."
    ],
    "adultAttention": "Evite corrigir o desenho enquanto a criança estiver fazendo a atividade. O mais importante é que ela observe, compare e tente encontrar soluções por conta própria. Valorize o esforço, a observação e o processo de construção, e não apenas um resultado \"perfeito\". Cada tentativa fortalece habilidades importantes para a matemática, a escrita e até para o desenho. 🌟",
    "finalPhrase": "Quando a criança aprende a observar os detalhes, ela descobre que a beleza também está no equilíbrio e na simetria do mundo ao seu redor.\" 🦋✨",
    "videoUrl": "",
    "image": img17
},
{
    "id": 18,
    "slug": "encontrando-o-resultado",
    "title": "Encontrando o Resultado",
    "age": "6 a 8 anos",
    "time": "15 a 25 minutos",
    "mess": "☆☆☆☆ (Muito baixo)",
    "summary": "A matemática fica muito mais interessante quando se transforma em brincadeira. Nesta atividade, a criança observa pequenas operações matemáticas e precisa encontrar o resultado...",
    "importance": "A matemática fica muito mais interessante quando se transforma em brincadeira. Nesta atividade, a criança observa pequenas operações matemáticas e precisa encontrar o resultado correspondente, exercitando o cálculo mental de forma leve e divertida. Ao manipular os números e procurar a resposta correta, ela fortalece habilidades importantes para a alfabetização matemática, desenvolvendo confiança para resolver problemas e percebendo que errar faz parte do processo de aprender.",
    "prepare": "- Imprima a atividade. - Recorte as operações e os resultados (caso o material seja destacável). - Organize todas as peças sobre uma mesa. - Escolha um local tranquilo para que a criança consiga se concentrar.",
    "play": "A criança deverá observar cada operação matemática e resolver o cálculo mentalmente. Depois, procurará entre as opções qual é o resultado correto e fará a associação. Quando terminar todas as contas, vocês podem conferir juntos as respostas. Para deixar a brincadeira ainda mais dinâmica, utilize um cronômetro e desafie a criança a melhorar seu próprio tempo a cada nova rodada, sempre valorizando a precisão antes da velocidade. Outra possibilidade é jogar em dupla, onde um participante resolve a operação e o outro procura rapidamente o resultado.",
    "learns": [
        "Cálculo mental.",
        "Relação entre operação e resultado.",
        "Resolução de problemas.",
        "Atenção e concentração.",
        "Agilidade de raciocínio.",
        "Segurança para resolver desafios matemáticos."
    ],
    "skills": [
        "Raciocínio lógico",
        "Cálculo mental",
        "Associação",
        "Atenção",
        "Memória de trabalho",
        "Concentração",
        "Percepção visual",
        "Resolução de problemas",
        "Autonomia",
        "Organização"
    ],
    "flavinhaTip": "Comece utilizando operações mais simples e, conforme a criança ganhar confiança, aumente gradativamente a dificuldade. Outra ideia divertida é pedir que ela explique como chegou ao resultado. Muitas vezes existem diferentes estratégias para resolver a mesma conta, e conversar sobre elas fortalece ainda mais a aprendizagem. Vocês também podem transformar a atividade em um jogo de desafios, sorteando uma operação por vez e comemorando cada acerto.",
    "adaptation": [
        "6 anos",
        "Utilize apenas adições simples com números pequenos.",
        "Permita que a criança utilize os dedos, tampinhas ou palitos para contar, caso precise. 7 anos",
        "Misture adições e subtrações.",
        "Incentive o cálculo mental antes de recorrer a materiais de apoio. 8 anos ou mais",
        "Inclua multiplicações simples e desafios com três parcelas.",
        "Acrescente um cronômetro ou proponha que a criança crie novas operações para outra pessoa resolver."
    ],
    "adultAttention": "Evite transformar a atividade em uma prova ou competição. O objetivo é fortalecer a confiança da criança na matemática. Sempre que houver um erro, incentive-a a pensar novamente com perguntas como: \"Vamos conferir juntos?\" \"Será que existe outra maneira de resolver essa conta?\" Quando a criança participa do processo de descoberta, a aprendizagem se torna muito mais significativa e duradoura. 🌟",
    "finalPhrase": "A matemática deixa de ser um desafio quando a criança percebe que cada problema é apenas uma nova oportunidade para descobrir soluções.\" ➕",
    "videoUrl": "",
    "image": img18
}
];

export const getBrincadeira68BySlug = (slug: string | undefined) =>
  brincadeiras68.find((item) => item.slug === slug);
