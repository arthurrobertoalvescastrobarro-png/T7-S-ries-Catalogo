const avatares = [

    "😀",
    "😎",
    "🤖",
    "👑",
    "🦁",
    "🐺",
    "🐉",
    "🔥",
    "⚡",
    "🎬",
    "🍿",
    "🎮"

];

let categoriaSelecionada = "Todos";
let tipoSelecionado = "Todos";

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

let historico = JSON.parse(localStorage.getItem("historico")) || [];
let comentarios =
    JSON.parse(localStorage.getItem("comentarios")) || {};

const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"));
const usuarioLogadoTexto = document.getElementById("usuarioLogadoTexto");

if (usuarioAtual && usuarioLogadoTexto) {

    usuarioLogadoTexto.textContent =
        `👤 ${usuarioAtual.usuario}`;

}

let favoritos = [];

if (usuarioAtual) {
    favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioAtual.usuario}`)) || [];
}


// ================= ADMIN AUTOMÁTICO =================
// cria admin caso não exista

if (!usuarios.some(u => u.usuario === "admin")) {
    usuarios.push({
        usuario: "ADMIN",
        senha: "22102009",
        nivel: "ADM"
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// ================= ELEMENTOS DO HTML =================

const ListaSeries = document.getElementById("ListaSeries");
const contadorResultados = document.getElementById("contadorResultados");
const ordenacao = document.getElementById("ordenacao");
const campobusca = document.getElementById("campobusca");


// ================= TEMA =================

function alternarTema() {
    document.body.classList.toggle("dark-mode");
}
const series = [
    {
        titulo: "Stranger Things",
        imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/twfKp60THrcOIep9sjHODOOfO8d.jpg",
        descricao: "Quando um garoto desaparece, a cidade toda participa nas buscas. Mas o que encontram são segredos, forças sobrenaturais e uma menina.",
        temporadas: "5-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Suspense", "Ficção Científica", "Terror"],
        link: "https://netcineli.lat/tvshows/stranger-things/",
        tipo: "Série",
    },
    {
        titulo: "O flash",
        imagem: "https://media.themoviedb.org/t/p/w220_and_h330_face/lFxIoMKqkgTuxpghTPHBjoVstMV.jpg",
        descricao: "Um perito forense desperta de um coma com poderes especiais que serão postos à prova na luta contra forças que ameaçam a cidade.",
        temporadas: "9-Temporadas",
        classificacao: "12",
        categoria: ["Live Action", "Super-Herói", "Ação", "Ficção Científica"],
        link: "https://netcineli.lat/tvshows/the-flash/",
        tipo: "Série",
    },
    {
        titulo: "Arqueiro",
        imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/oaLXsduGoDOOftWziIOvyZzrR4T.jpg",
        descricao: "Após um violento naufrágio, o playboy milionário Oliver Queen é dado como morto. Cinco anos depois, é resgatado de uma ilha do Pacífico e enviado de volta para Starling City, onde passa a agir como vigilante secreto.",
        temporadas: "8-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Super-Herói", "Ação", "Crime"],
        link: "https://netcineli.lat/tvshows/arrow/",
        tipo: "Série",
    },
    {
        titulo: "Pessoas de Interesse",
        imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/s5fhbaU1Mk98awGZyALELoqa1Bi.jpg",
        descricao: "John Reese, um ex-agente da CIA, é recrutado por Finch, um milionário e gênio da tecnologia, para ajudar na identificação de pessoas envolvidas em futuros crimes.",
        temporadas: "5-Temporadas",
        classificacao: "14",
        categoria: ["Live Action", "Policial", "Suspense", "Ficção Científica"],
        link: "https://www15.redecanais.in/serie/pessoa-de-interesse/",
        tipo: "Série",
    },
    {
        titulo: "Reacher",
        imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/c9JwFbaBWarL9fwo1NSqsiTj7Zh.jpg",
        descricao: "Quando o policial militar aposentado Jack Reacher é preso por um assassinato que não cometeu, ele se vê no meio de uma trama mortal cheia de policiais corruptos, empresários obscuros e políticos conspiradores. Só com sua inteligência, ele precisa descobrir o que está havendo em Margrave, Geórgia.",
        temporadas: "3-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Ação", "Crime", "Suspense"],
        link: "https://netcineli.lat/tvshows/reacher/",
        tipo: "Série",
    },
    {
        titulo: "The Mandalorian",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        descricao: "A saga de um guerreiro solitário, que também é um mercenário e pistoleiro, viajando pelos territórios esquecidos e marginais do espaço, logo após a queda do Império e antes da criação da temida Primeira Ordem.",
        temporadas: "3-Temporadas",
        classificacao: "14",
        categoria: ["Live Action", "Ficção Científica", "Aventura", "Ação"],
        link: "https://netcineli.lat/tvshows/the-mandalorian/",
        tipo: "Série",
    },
        {
        titulo: "Demolidor: Renascido",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/r5hNFtkNAauxc2G4VUlnJOaVIb0.jpg",
        descricao: "Matt Murdock, um advogado cego com habilidades fantásticas, luta por justiça através de seu agitado escritório de advocacia, enquanto o ex-chefe do crime Wilson Fisk busca seus próprios empreendimentos políticos em Nova Iorque. Quando suas identidades passadas começam a emergir, seus caminhos se cruzam perigosamente.",
        temporadas: "2-Temporadas",
        classificacao: "18",
        categoria: ["Live Action", "Super-Herói", "Crime", "Ação"],
        link: "https://netcineli.lat/tvshows/demolidor-renascido/",
        tipo: "Série",
    },
        {
        titulo: "Cães de Caça",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/uFNHrunRIlyzRlRS7c9InUVgFDa.jpg",
        descricao: "Dois jovens boxeadores unem forças para enfrentar inimigos impiedosos com sede de sangue, arriscando as próprias vidas para fazer justiça e proteger as pessoas que amam.",
        temporadas: "2-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Ação", "Crime", "Drama"],
        link: "https://netcineli.lat/tvshows/caes-de-caca/",
        tipo: "Série",
    },
        {
        titulo: "The Last Kingdom",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/fMNJjzZUdc8pBVIQ85olSNaBKix.jpg",
        descricao: "Enquanto Alfredo, o Grande, defende seu reino de invasões nórdicas, Uhtred - um saxão criado por vikings - planeja reivindicar o que é seu por direito.",
        temporadas: "5-Temporadas",
        classificacao: "14",
        categoria: ["Live Action", "Ação", "Drama", "Aventura"],
        link: "https://netcineli.lat/tvshows/the-last-kingdom/",
        tipo: "Série",
    },
        {
        titulo: "Gravity Falls: Um Verão de Mistérios ",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/21WVSbe9BB3GYnlxr4UF9H4DmO6.jpg",
        descricao: "Os gêmeos Dipper e Mabel ficam desapontados ao ter que passar o verão com seu tio-avô, mas a cidade onde ele vive acaba se revelando um lugar estranho e maravilhoso.",
        temporadas: "2-Temporadas",
        classificacao: "10",
        categoria: ["Mistério", "Comédia", "Fantasia"],
        link: "https://animesdigital.org/anime/a/gravity-falls-um-verao-de-misterios",
        tipo: "Desenho",
    },
        {
        titulo: "Sword Art Online",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/9m8bFIXPg26taNrFSXGwEORVACD.jpg",
        descricao: "Em um futuro próximo, foi lançado um Jogo de Realidade Virtual em Massa para Múltiplos Jogadores Online (VRMMORPG) chamado Sword Art Online, onde seus jogadores controlam seus personagens com o próprio corpo usando um dispositivo tecnológico chamado: NerveGear. Um dia, os jogadores descobrem que não podem sair do jogo, pois o criador do jogo os mantêm presos a menos que eles cheguem ao 100º andar da Torre e derrotem o Boss final. No entanto, se eles morrerem no jogo, morrerão também na vida real. A luta pela sobrevivência começa agora...",
        temporadas: "3-Temporadas",
        classificacao: "12",
        categoria: ["Aventura", "Fantasia", "Ficção Científica"],
        link: "https://animesonline.io/?s=Sword%20Art%20Online",
        tipo: "Anime",
    },
        {
        titulo: "Wistoria: Wand and Sword",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/65KsCghUgyI1hOsypfrwzAI9e4e.jpg",
        descricao: "Um garoto esforçado chamado Will entra em uma academia de magia na esperança de se tornar um grande feiticeiro. Infelizmente, há uma falha fatal em seu plano: ele não tem a habilidade de usar magia. Em meio aos olhares frios de seus colegas de classe e instrutores, Will se sente desencorajado às vezes, mas ele continua avançando com uma determinação inabalável. Ele não pode usar uma varinha, mas pode empunhar uma espada em sua batalha para alcançar o topo de um mundo dominado pela magia! Ele só precisa acreditar em suas próprias forças únicas e se lembrar da promessa que fez a alguém muito precioso para ele...",
        temporadas: "2-Temporadas",
        classificacao: "12",
        categoria: ["Fantasia", "Aventura", "Ação"],
        link: "https://animesonline.io/?s=Wistoria:%20Wand%20and%20Sword",
        tipo: "Anime",
    },
     {
        titulo: "The Boys",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
        descricao: "Na trama, conhecemos um mundo em que super-heróis são as maiores celebridades do planeta, e rotineiramente abusam dos seus poderes ao invés de os usarem para o bem.",
        temporadas: "5-Temporadas",
        classificacao: "18",
        categoria: ["Live Action", "Super-Herói", "Ação", "Comédia"],
        link: "https://netcineli.lat/tvshows/the-boys/",
        tipo: "Série",
    },
      {
        titulo: "Lei & Ordem",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/9ez0xyH6IIg8Ww4hNpiD9lHRRH7.jpg",
        descricao: "O drama mostra o processo complicado de determinar a culpa ou a inocência, quando vidas estão em jogo. Muitas vezes inspirado pelas notícias mais recentes, o enredo destaca dilemas éticos e pessoais.",
        temporadas: "27-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Policial", "Crime", "Drama"],
        link: "https://www.pobreflix.graphics/series/lei-ordem-unidade-de-vitimas-especiais/",
        tipo: "Série",
    },
      {
        titulo: "Game of Thrones",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/eDn8XWA0a4U3zOhd1gh7HExdt4Y.jpg",
        descricao: "Em uma terra onde os verões podem durar vários anos e o inverno toda uma vida, sete nobres famílias lutam pelo controle da mítica terra de Westeros, dividida depois de uma guerra. Num cenário que lembra a Europa medieval, reis, rainhas, cavaleiros e renegados usam todos os meios possíveis em um jogo político pela disputa do Trono de Ferro, o símbolo do poder absoluto.",
        temporadas: "8-Temporadas",
        classificacao: "18",
        categoria: ["Live Action", "Fantasia", "Drama", "Aventura"],
        link: "https://netcineli.lat/tvshows/game-of-thrones/",
        tipo: "Série",
    },
      {
        titulo: "Jujutsu Kaisen",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/8R1mMSC1gX1cg5ed7ns49JOEqw3.jpg",
        descricao: "Sofrimento, arrependimento, vergonha: os sentimentos negativos dos humanos tornam-se Maldições, causando terríveis acidentes que podem levar até mesmo à morte. E pra piorar, Maldições só podem ser exorcizadas por outras Maldições. Certo dia, para salvar amigos que estavam sendo atacados por Maldições, Yuji Itadori engole o dedo do Ryomen-Sukuna, absorvendo sua Maldição. Ele então decide se matricular no Colégio Técnico de Feitiçaria de Tóquio, uma organização que combate as Maldições... e assim começa a heróica lenda do garoto que tornou-se uma Maldição para exorcizar uma Maldição.",
        temporadas: "3-Temporadas",
        classificacao: "16",
        categoria:  ["Ação", "Fantasia", "Terror"],
        link: "https://animesonline.io/?s=Jujutsu%20Kaisen",
        tipo: "Anime",
    },
      {
        titulo: "Smallville: As Aventuras do Superboy",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/gjGwov0xDKWmoaYulwUb9tOzlOT.jpg",
        descricao: "Antes da vida como Super-Homem, o jovem Clark Kent encara os problemas da adolescência enquanto aprende a controlar seus poderes e usá-los para proteger a cidade de Smallville.",
        temporadas: "10-Temporadas",
        classificacao: "10",
        categoria: ["Live Action", "Super-Herói", "Drama", "Ficção Científica"],
        link: "https://netcineli.lat/tvshows/smallville/",
        tipo: "Série",
    },
      {
        titulo: "Miraculous: As Aventuras de Ladybug",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/24wf3O8SJeUSJJvDowQR5FDgHGO.jpg",
        descricao: "Ladybug é uma heroína que tem a missão de defender Paris de um vilão misterioso. Junto com o parceiro Cat Noir, eles devem conciliar o dia a dia com a vida de super-heróis.",
        temporadas: "6-Temporadas",
        classificacao: "10",
        categoria: ["Super-Herói", "Comédia", "Aventura"],
        link: "https://miraculous.to/br/episodes",
        tipo: "Desenho",
    },
      {
        titulo: "Re:ZERO -Starting Life in Another World",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/5MrRCj7z92YLWMXHeWKp19eJPYv.jpg",
        descricao: "Natsuki Subaru, um adolescente comum, conhece uma linda garota de cabelos prateados vinda de outro mundo. Subaru quer ficar ao lado dela, mas o fardo que ela carrega é maior do que Subaru pode imaginar. Eles enfrentam o feroz ataque de monstros, traições, violência irracional... e, por fim, a morte. Subaru promete derrotar qualquer inimigo, qualquer destino, tudo para protegê-la. E assim, o pobre garoto sem poder algum obtém o Retorno da Morte, uma habilidade única que permite ao usuário voltar no tempo ao morrer. Usando esse poder, o passado é perdido e as memórias são reescritas.",
        temporadas: "4-Temporadas",
        classificacao: "16",
        categoria: ["Fantasia", "Drama", "Suspense"],
        link: "https://animesonline.io/?s=Re%3AZERO+-Starting+Life+in+Another+World",
        tipo: "Anime",
    },
      {
        titulo: "FBI",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/zfKS4WL0OZ9udpNoSYZw91VB3aH.jpg",
        descricao: "A série acompanha os bastidores das operações do FBI em NY, onde os agentes Maggie Bell, Omar Adom e equipe buscam manter a cidade e o país a salvo.",
        temporadas: "8-Temporadas",
        classificacao: "14",
        categoria: ["Live Action", "Policial", "Crime", "Ação"],
        link: "https://rrrv.lol/tvshows/fbi/",
        tipo: "Série",
    },
      {
        titulo: "The Good Doctor: O Bom Doutor",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/v9WYk0nigzR9NAEjeSmfI6s4XA2.jpg",
        descricao: "Um jovem médico com autismo começa a trabalhar em um famoso hospital. Além dos desafios da profissão, ele terá também que provar sua capacidade a seus colegas e superiores.",
        temporadas: "7-Temporadas",
        classificacao: "12",
        categoria: ["Live Action", "Drama", "Médico"],
        link: "https://rrrv.lol/tvshows/the-good-doctor/",
        tipo: "Série",
    },
      {
        titulo: "Bleach",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/5iVUUnE2tgBPypACYNobCKHagfV.jpg",
        descricao: "Ichigo Kurosaki, um adolescente de quinze anos, nunca pediu o dom de ver fantasmas — ele simplesmente nasceu com essa habilidade. Quando sua família é atacada por um Hollow, uma alma perdida e maligna, Ichigo conhece Rukia, uma Ceifeira de Almas que acaba lhe transferindo seus poderes. A partir desse momento, Ichigo passa a dedicar sua vida a proteger os inocentes e ajudar almas atormentadas a encontrar a paz.",
        temporadas: "16-Temporadas",
        classificacao: "14",
        categoria: ["Ação", "Fantasia", "Aventura"],
        link: "https://animesonline.io/?s=Bleach",
        tipo: "Anime",
    },
      {
        titulo: "O Rastreador",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/xvtWn3DfjiN6fBfOZmpJYfFNufr.jpg",
        descricao: "Colter Shaw, um lobo solitário sobrevivente que percorre o país em busca de recompensas, usando suas habilidades de rastreamento especializado para ajudar cidadãos e autoridades a resolver todo tipo de mistério enquanto lida com sua família fragmentada.",
        temporadas: "3-Temporadas",
        classificacao: "14",
        categoria: ["Live Action", "Crime", "Mistério", "Suspense"],
        link: "https://www.pobreflix.graphics/series/o-rastreador/",
        tipo: "Série",
    },
      {
        titulo: "Arquivo X",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/bA4XkQR5VAuiszhbfDhR0siZgiI.jpg",
        descricao: "Dana Scully e Fox Mulder são dois agentes do FBI que investigam casos não solucionados, estranhos e inexplicáveis que envolvem fenômenos paranormais.",
        temporadas: "11-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Mistério", "Ficção Científica", "Suspense"],
        link: "https://www.pobreflix.graphics/series/arquivo-x/",
        tipo: "Série",
    },
      {
        titulo: "NCIS: Los Angeles",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/gW2W2zJvn6PLgx1Blj1HJag14pJ.jpg",
        descricao: "Uma equipe de agentes do Departamento de Projetos Especiais, uma divisão do NCIS em Los Angeles, trabalha para prender criminosos que são considerados uma ameaça à segurança nacional.",
        temporadas: "14-Temporadas",
        classificacao: "14",
        categoria: ["Live Action", "Policial", "Crime", "Ação"],
        link: "https://www.pobreflix.graphics/series/ncis-los-angeles/",
        tipo: "Série",
    },
      {
        titulo: "INVENCÍVEL",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/qhb7RWU9ad9a5m3HbeRRXzjaMXf.jpg",
        descricao: "Uma animação de super-heróis para adultos e conta a história de Mark Grayson, de 17 anos, um cara como qualquer outro de sua idade, exceto que seu pai é o super-herói mais poderoso do planeta, Omni-Man. Porém, Há medida que Mark desenvolve seus próprios poderes, ele descobre que o legado de seu pai pode não ser tão heroico quanto parece.",
        temporadas: "4-Temporadas",
        classificacao: "18",
        categoria: ["Super-Herói", "Ação", "Drama"],
        link: "https://rrrv.lol/tvshows/invencivel/",
        tipo: "Anime",
    },
      {
        titulo: "Pokémon ",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/ck1nfqYxMkiGvBVztIuM6b7fHoC.jpg",
        descricao: "Explore o mundo de Pokémon com Ash Ketchum e seu parceiro Pikachu enquanto eles fazem novos amigos, encontram Pokémon poderosos e buscam o objetivo supremo de Ash: Tornar-se um Mestre Pokémon!",
        temporadas: "28-Temporadas",
        classificacao: "10",
        categoria: ["Aventura", "Fantasia", "Comédia"],
        link: "https://animesonline.io/?s=Pok%C3%A9mon",
        tipo: "Anime",
    },
      {
        titulo: "Spartacus",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/c2GKN4VHCj1dnjFMANRpGkCVBae.jpg",
        descricao: "Traído pelos romanos, forçado à escravidão e renascido como gladiador. A clássica história do mais famoso rebelde da república volta há vida, nessa nova série de ação e visual impactante, Spartacus: Blood and Sand (Sangue e Areia). Tirado de sua terra natal e arrancado do convívio da mulher que ama, Spartacus é condenado a viver no mundo brutal da arena, onde o sangue e a morte são os principais entretenimento do povo. Mas nem todas as batalhas são lutadas sobre a areia. Traições, corrupções e a abundáncia de prazeres sensuais vão constantemente testar Spartacus. Para sobreviver, ele deve ser mais do que um homem; mais do que gladiador; ele deve ser uma lenda.",
        temporadas: "4-Temporadas",
        classificacao: "18",
        categoria:  ["Live Action", "Ação", "Drama", "Aventura"],
        link: "https://rrrv.lol/tvshows/spartacus/",
        tipo: "Série",
    },
      {
        titulo: "Mushoku Tensei: Jobless Reincarnation",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
        descricao: "Quando um fracassado de 34 anos é atropelado por um ônibus, sua história não acaba. Reencarnado em um novo mundo como criança, Rudy aproveitará cada oportunidade para viver a vida que sempre quis. Com novos amigos, habilidades mágicas e coragem para fazer tudo o que sempre sonhou, ele embarca em uma aventura típica  com toda a sua experiência do passado intacta!",
        temporadas: "3-Temporadas",
        classificacao: "16",
        categoria: ["Fantasia", "Aventura", "Drama"],
        link: "https://animesonline.io/?s=Mushoku+Tensei%3A+Jobless+Reincarnation",
        tipo: "Anime",
    },
      {
        titulo: "Naruto clássico",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/9ptbVZpKNy5NY9D4zq4KGiYWRQY.jpg",
        descricao: "Momentos antes do nascimento de Naruto Uzumaki, um enorme demónio conhecido como o Kyuubi, a Raposa de Nove Caudas, atacou o vilarejo da folha oculta Konoha, causando destruição. Para pór fim há devastação de Kyuubi, o líder da aldeia, o quarto Hokage, sacrificou sua vida e selou o monstruoso animal dentro do recém-nascido Naruto. Agora, Naruto é um ninja hiperativo e cabeça dura que ainda vivem em Konoha. Evitado pelos demais habitantes por causa da Kyuubi dentro dele, Naruto se esforça para encontrar seu lugar na aldeia, enquanto o seu ardente desejo de se tornar o Hokage de Konoha o leva a conhecer alguns grandes novos amigos, e também alguns inimigos mortais.",
        temporadas: "9-Temporadas",
        classificacao: "12",
        categoria: ["Ação", "Aventura", "Fantasia"],
        link: "https://animesonline.io/?s=Naruto%20cl%C3%A1ssico",
        tipo: "Anime",
    },
      {
        titulo: "Naruto Shippuden",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/nRJmByfK9XdtOY73VArcN8KpKVs.jpg",
        descricao: "Naruto Shippuden ocorre 2 anos e meio após Naruto ter deixado a vila para treinar com Jiraiya. Após seu retorno, Naruto descobre que seus amigos shinobi's o superaram na classificação, e ele caiu para trás. No entanto, com apenas 6 meses para resgatar Sasuke, Naruto tem de enfrentar inimigos ainda mais perigosos. O plano da Akatsuki se revela lentamente e os perigos surgem mais do que nunca!",
        temporadas: "22-Temporadas",
        classificacao: "14",
        categoria: ["Ação", "Aventura", "Fantasia"],
        link: "https://animesonline.io/?s=Naruto%20Shippuden",
        tipo: "Anime",
    },
      {
        titulo: "Rurouni Kenshin",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/zT77Y6iQGmYGBqbhQi0ySD60o9i.jpg",
        descricao: "Durante a agitação da Era Bakumatsu, havia um guerreiro Imperialista temido como o Battousai, o Retalhador. No entanto, com a chegada da nova era, o Battosai desapareceu dos olhos do público, deixando para trás apenas sua lenda como o mais forte guerreiro Revolucionário.",
        temporadas: "3-Temporadas",
        classificacao: "14",
        categoria: ["Ação", "Aventura", "Drama"],
        link: "https://animesonline.io/?s=Rurouni%20Kenshin",
        tipo: "Anime",
    },
      {
        titulo: "SPY x FAMILY",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/7NAvPYPAu7MeHwP8E9sn81PqsRh.jpg",
        descricao: "Há décadas, as nações de Ostania e Westalis promovem uma guerra fria sem fim. Para investigar os movimentos do presidente de um importante partido político, Westalis mobiliza Twilight, seu melhor agente, a montar uma família falsa e se infiltrar nos eventos sociais promovidos pela escola do filho do político. Mas por um acaso do destino, Twilight acaba adotando Anya, uma jovem com poderes telepáticos, e se casando com Yor, uma assassina profissional! Sem saberem das identidades uns dos outros, este trio incomum vai embarcar em aventuras cheias de surpresas para garantir a paz mundial.",
        temporadas: "3-Temporadas",
        classificacao: "14",
        categoria: ["Comédia", "Ação", "Aventura"],
        link: "https://animesonline.io/?s=SPY+x+FAMILY",
        tipo: "Anime",
    },
      {
        titulo: "Classe dos Heróis Fracos ",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/kZeJeV8L3WlVp3L6DZS0WaDelfj.jpg",
        descricao: "Com a ajuda de amigos inesperados, um aluno talentoso e introvertido decide enfrentar os valentões do colégio, sem fazer ideia do perigo que está correndo.",
        temporadas: "2-Temporadas",
        classificacao: "16",
        categoria: ["Live Action", "Drama", "Ação"],
        link: "https://www.pobreflix.graphics/series/classe-dos-herois-fracos-1/",
        tipo: "Série",
    },
      {
        titulo: "Marvel - O Justiceiro",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/sHwIjTM9YiNOltXD0Z20PO9JmkO.jpg",
        descricao: "O ex-marine Frank Castle só quer punir os criminosos responsáveis pela morte da sua família, mas torna-se alvo de uma conspiração militar.",
        temporadas: "2-Temporadas",
        classificacao: "18",
        categoria: ["Live Action", "Ação", "Crime", "Suspense"],
        link: "https://rrrv.lol/tvshows/marvel-o-justiceiro/",
        tipo: "Série",
    },
      {
        titulo: "Os Jovens Titãs",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/wnIpFMCO8aGFdO3aRzWlohiAOy9.jpg",
        descricao: "Lutando pela verdade, a justiça e a última fatia de pizza, estes cinco super-heróis são a prova viva de que nunca é cedo demais para salvar o planeta.",
        temporadas: "5-Temporadas",
        classificacao: "10",
        categoria: ["Super-Herói", "Ação", "Comédia"],
        link: "https://rrrv.lol/tvshows/os-jovens-titas/",
        tipo: "Desenho",
    },
      {
        titulo: "Dragon Ball Z",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/kbkuYkaFsDwL6cyMgnBf77LczEo.jpg",
        descricao: "Dragon Ball Z foi uma série de animação produzida pela Toei Animation. Baseada na série de mangá Dragon Ball escrita por Akira Toriyama, Dragon Ball Z corresponde aos volumes 17 ao 42 do mangá que foi publicado na revista, Weekly Shonen Jump, de 1988 a 1995, e estreou no Japão na Fuji TV em 26 de abril de 1989, e terminou dia 31 de janeiro de 1996 com o total de 291 episódios, antes de ser dublada em diversos territórios ao redor do mundo, incluindo Estados Unidos, Austrália, Europa, índia e Brasil. A série foi exibida em mais de 80 países ao redor do mundo.",
        temporadas: "9-Temporadas",
        classificacao: "14",
        categoria:  ["Ação", "Aventura", "Fantasia"],
        link: "https://rrrv.lol/tvshows/dragon-ball-z/",
        tipo: "Anime",
    },
    {
        titulo: "Phineas e Ferb",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/cu2nJgERq8ZmRUlBFPsamdJb7rh.jpg",
        descricao: "Todos os dias, dois meio-irmãos nas férias de verão embarcam em um grande novo projeto, o que irrita sua irmã controladora, Candace, que sempre tenta entrega-los para sua mãe. Enquanto isso, seu animal de estimação Perry o ornitorrinco luta contra o malvado Dr. Doofenshmirtz.",
        temporadas: "6-Temporadas",
        classificacao: "10",
        categoria: ["Comédia", "Aventura"],
        link: "https://megacine.boats/series/assistir-phineas-e-ferb-online",
        tipo: "Desenho",
    },
    {
        titulo: "Hora de Aventura",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/2EMpiF1GireQHs3f9JKCFoKElju.jpg",
        descricao: "Com 12 anos de idade, Finn combate o mal na terra de Ooo na companhia de seu cachorro mágico, Jake. Quando estes dois grandes amigos se juntam e dizem as palavras mágicas, Hora de Aventura, tudo pode acontecer.",
        temporadas: "10-Temporadas",
        classificacao: "12",
        categoria:  ["Fantasia", "Aventura", "Comédia"],
        link: "https://aniture-pt.com.br/animes-e-desenhos/hora-de-aventura/",
        tipo: "Desenho",
    },
    {
    titulo: "Nosso Planeta",
    imagem: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    descricao: "Documentário sobre a diversidade da vida na Terra e os desafios ambientais.",
    temporadas: "2-Temporadas",
    classificacao: "10",
    categoria: ["Natureza"],
    link: "https://www.youtube.com/watch?v=uloWGQWoQ9w",
    tipo: "Documentário",

},
{
    titulo: "O Dilema das Redes",
    imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    descricao: "Explora o impacto das redes sociais na sociedade moderna.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Tecnologia"],
    link: "https://www.tokyvideo.com/br/video/o-dilema-das-redes-sociais-documentario-netflix",
    tipo: "Documentário",

},
{
    titulo: "Planeta Terra",
    imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    descricao: "Uma jornada pelos habitats mais impressionantes do planeta.",
    temporadas: "3-Temporadas",
    classificacao: "10",
    categoria: ["Natureza"],
    link: "https://vimeo.com/172246046",
    tipo: "Documentário",

}
,
{
    titulo: "Spider-Noir",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/rfrzXSaiuvRMLo8PRQds0TfFrZC.jpg",
    descricao: "Ben Reilly, um detetive particular, é forçado a encarar seu passado como O Spider ao se envolver em uma perigosa conspiração.",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria:  ["Live Action", "Super-Herói", "Crime", "Suspense"],
    link: "https://rrrv.lol/tvshows/spider-noir/",
    tipo: "Série",
},
{
    titulo: "Mestres do Universo",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/dobbDBQC0G9m65pcVaDM2D2aMr8.jpg",
    descricao: "Adam caiu na Terra quando era criança e perdeu a espada mágica que o ligava a Eternia. Quase 20 anos depois, ele a recupera e retorna ao seu planeta natal para protegê-lo do malvado Esqueleto, mas primeiro precisa desvendar seu passado.",
    temporadas: "Filme",
    classificacao: "12",
    categoria:  ["Live Action", "Fantasia", "Aventura", "Ação"],
    link: "https://www.pobreflix.parts/filmes/mestres-do-universo-2/",
    tipo: "Filme",
},
{
    titulo: "Star Wars: O Mandaloriano e Grogu",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/dNwaS0tnwgQRaQFPY5MbGxdmYXr.jpg",
    descricao: "Após a queda do Império, Din Djarin e Grogu ajudam a Nova República a enfrentar as ameaças que ainda restam na galáxia.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Live Action", "Ficção Científica", "Aventura", "Ação"],
    link: "Não disponivel",
    tipo: "Filme",
},
{
    titulo: "Devoradores de Estrelas",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/2i8uru7rlbHKaoIbC2V4FZLT7uW.jpg",
    descricao: "Um professor de ciências acorda em uma espaçonave a anos-luz da Terra sem memória de como chegou ali. Aos poucos, relembra que foi recrutado para investigar por que o Sol está morrendo.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Live Action", "Ficção Científica", "Drama", "Aventura"],
    link: "https://rrrv.lol/devoradores-de-estrelas/",
    tipo: "Filme",
},
{
    titulo: "Matrix",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/lDqMDI3xpbB9UQRyeXfei0MXhqb.jpg",
    descricao: "Thomas Anderson descobre que a realidade é uma simulação criada pela Matrix e se une a resistência para lutar contra o sistema que controla a humanidade.",
    temporadas: "Filme",
    classificacao: "16",
    categoria: ["Live Action", "Ficção Científica", "Ação", "Suspense"],
    link: "https://rrrv.lol/matrix/",
    tipo: "Filme",
},
{
    titulo: "Mortal Kombat",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/4nW5X9iBrMlHMDcTsEOQWXKu3TZ.jpg",
    descricao: "O lutador de MMA Cole Young deve treinar para liberar seu verdadeiro poder e unir-se aos maiores campeões da Terra contra os guerreiros da Exoterra.",
    temporadas: "Filme",
    classificacao: "18",
    categoria: ["Live Action", "Ação", "Fantasia"],
    link: "https://rrrv.lol/mortal-kombat/",
    tipo: "Filme",
},
{
    titulo: "Vingadores: Ultimato",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg",
    descricao: "Após os eventos devastadores causados por Thanos, os Vingadores restantes unem forças para restaurar o universo.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Live Action", "Super-Herói", "Ação", "Ficção Científica"],
    link: "https://rrrv.lol/vingadores-ultimato/",
    tipo: "Filme"
},
{
    titulo: "Homem-Aranha: Sem Volta Para Casa",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/fVzXp3NwovUlLe7fvoRynCmBPNc.jpg",
    descricao: "Peter Parker pede ajuda ao Doutor Estranho, mas um feitiço errado abre o multiverso.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Live Action", "Super-Herói", "Ação", "Ficção Científica"],
    link: "https://www.pobreflix.you/filmes/homem-aranha-sem-volta-para-casa/",
    tipo: "Filme"
},
{
    titulo: "Batman",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    descricao: "Bruce Wayne investiga uma série de assassinatos cometidos pelo Charada em Gotham City.",
    temporadas: "Filme",
    classificacao: "14",
    categoria: ["Live Action", "Super-Herói", "Crime", "Suspense"],
    link: "https://rrrv.lol/batman-2022/",
    tipo: "Filme"
},
{
    titulo: "Top Gun: Maverick",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    descricao: "Maverick retorna para treinar uma nova geração de pilotos em uma missão arriscada.",
    temporadas: "Filme",
    classificacao: "12",
    categoria:  ["Live Action", "Ação", "Drama"],
    link: "https://www.pobreflix.you/filmes/top-gun-maverick/",
    tipo: "Filme"
},
{
    titulo: "Avatar",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    descricao: "Um ex-fuzileiro é enviado ao planeta Pandora e acaba dividido entre dois mundos.",
    temporadas: "Filme",
    classificacao: "12",
    categoria:  ["Live Action", "Ficção Científica", "Aventura", "Fantasia"],
    link: "https://rrrv.lol/avatar/",
    tipo: "Filme"
},
{
    titulo: "Avatar: O Caminho da Água",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    descricao: "Jake Sully e sua família enfrentam novas ameaças em Pandora.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Live Action", "Ficção Científica", "Aventura", "Fantasia"],
    link: "https://rrrv.lol/avatar-o-caminho-da-agua/",
    tipo: "Filme"
},
{
    titulo: "Jurassic World:O mundo dos dinossauros",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/rhr4y79GpxQF9IsfJItRXVaoGs4.jpg",
    descricao: "Um parque temático com dinossauros geneticamente modificados sai do controle.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Live Action", "Ficção Científica", "Aventura", "Ação"],
    link: "https://rrrv.lol/jurassic-world-o-mundo-dos-dinossauros/",
    tipo: "Filme"
},
{
    titulo: "Interestelar",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg",
    descricao: "Uma equipe de astronautas busca um novo lar para a humanidade além das estrelas.",
    temporadas: "Filme",
    classificacao: "10",
    categoria: ["Live Action", "Ficção Científica", "Drama", "Aventura"],
    link: "https://rrrv.lol/interestelar/",
    tipo: "Filme"
},
{
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnO9QsXMmGb0vlgk_mpaDOP-BnUsatjBoQyQ&s",
    descricao: "Frodo inicia sua jornada para destruir o Um Anel e salvar a Terra-média.",
    temporadas: "Filme",
    classificacao: "12",
    categoria:  ["Live Action", "Fantasia", "Aventura", "Drama"],
    link: "https://rrrv.lol/senhor-dos-aneis-a-sociedade-do-anel/",
    tipo: "Filme"
},
{
    titulo: "Harry Potter e a Pedra Filosofal",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    descricao: "Harry descobre que é um bruxo e começa sua jornada em Hogwarts.",
    temporadas: "Filme",
    classificacao: "10",
    categoria: ["Live Action", "Fantasia", "Aventura"],
    link: "https://rrrv.lol/harry-potter-e-a-pedra-filosofal/",
    tipo: "Filme"
},
{
    titulo: "John Wick",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    descricao: "Um assassino aposentado volta a ativa em busca de vingança.",
    temporadas: "Filme",
    classificacao: "18",
    categoria:  ["Live Action", "Ação", "Crime", "Suspense"],
    link: "https://rrrv.lol/john-wick-de-volta-ao-jogo/",
    tipo: "Filme"
},
{
    titulo: "Missão Impossivel: Acerto de Contas",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    descricao: "Ethan Hunt enfrenta uma ameaça tecnológica capaz de mudar o mundo.",
    temporadas: "Filme",
    classificacao: "14",
    categoria: ["Live Action", "Ação", "Suspense"],
    link: "Não disponivel",
    tipo: "Filme"
},
{
    titulo: "Transformers",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/lkZ9gqCEjzX85lKR6Jjd1uGAXNp.jpg",
    descricao: "Autobots e Decepticons travam uma guerra que chega a Terra.",
    temporadas: "Filme",
    classificacao: "10",
    categoria: ["Live Action", "Ficção Científica", "Ação", "Aventura"],
    link: "https://rrrv.lol/transformers/",
    tipo: "Filme"
},
{
    titulo: "Deadpool",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
    descricao: "Um mercenário adquire poderes de cura e busca vingança com muito humor ácido.",
    temporadas: "Filme",
    classificacao: "18",
    categoria: ["Live Action", "Super-Herói", "Ação", "Comédia"],
    link: "https://rrrv.lol/deadpool/",
    tipo: "Filme"
},
{
    titulo: "Gladiador",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    descricao: "Um general romano busca vingança após perder sua família e sua posição.",
    temporadas: "Filme",
    classificacao: "16",
    categoria: ["Live Action", "Ação", "Drama", "Aventura"],
    link: "https://rrrv.lol/gladiador/",
    tipo: "Filme"
},
{
    titulo: "Ataque dos titãs",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    descricao: "A humanidade vive cercada por muralhas para se proteger de titãs gigantes devoradores de pessoas.",
    temporadas: "4-Temporadas",
    classificacao: "16",
    categoria: ["Ação", "Drama", "Fantasia"],
    link: "https://animesonline.io/?s=shingeki%20no%20kyojin",
    tipo: "Anime",
},

{
    titulo: "Demon Slayer",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    descricao: "Tanjiro busca salvar sua irmã e derrotar demônios após sua família ser massacrada.",
    temporadas: "4-Temporadas",
    classificacao: "14",
    categoria: ["Ação", "Fantasia", "Aventura"],
    link: "https://animesonline.io/?s=Demon%20Slayer",
    tipo: "Anime",
},

{
    titulo: "One Piece",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
    descricao: "Luffy e sua tripulação buscam o maior tesouro do mundo, o One Piece.",
    temporadas: "20+ Temporadas",
    classificacao: "12",
    categoria: ["Aventura", "Comédia", "Ação"],
    link: "https://animesonline.io/anime/one-piece-dublado/",
    tipo: "Anime",
},

{
    titulo: "Jujutsu Kaisen 0",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/23oJaeBh0FDk2mQ2P240PU9Xxfh.jpg",
    descricao: "Quando Yuta Okkotsu era pequeno, sua amiga Rika Orimoto morreu num acidente de trânsito, bem na sua frente. Ela se tornou uma aparição, assombrando o jovem e atormentando a sua vida, até o dia em que Satoru Gojo, um feiticeiro Jujutsu, o convida para se matricular no Colégio Jujutsu. Junto com seus novos colegas de sala: Maki Zen'in, Toge Inumaki e Panda, Yuta encontra a coragem para perseverar. Enquanto isso, Suguru Geto, um vil manipulador de maldições que foi expulso do colégio por massacrar inocentes, põe em prática seu plano: lançar mil maldições em Shinjuku e em Kyoto e exterminar todos os não-feiticeiros, criando um paraíso para feiticeiros Jujutsu. Será que Yuta será capaz de impedir Geto? E o que acontecerá quando ele se livrar da maldição da Rika?",
    temporadas: "Filme",
    classificacao: "16",
    categoria: ["Ação", "Terror", "Fantasia"],
    link: "https://animesonline.io/anime/jujutsu-kaisen-0-filme-dublado/",
    tipo: "Anime",
},

{
    titulo: "Tokyo Ghoul",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/1m4RlC9BTCbyY549TOdVQ5NRPcR.jpg",
    descricao: "Em Tóquio, criaturas conhecidas como Ghouls vivem entre os humanos e os devoram para sobreviver. Alheio a eles, o jovem universitário Ken Kaneki leva uma vida pacata entre livros, até que um trágico encontro o coloca diante desses seres e o obriga a lutar por sua humanidade.",
    temporadas: "4-Temporadas",
    classificacao: "16",
    categoria: ["Terror", "Ação", "Drama"],
    link: "https://animesonline.io/?s=Tokyo+Ghoul",
    tipo: "Anime",
},

{
    titulo: "Fullmetal Alchemist: Brotherhood",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg",
    descricao: "Dois irmãos usam alquimia em busca da Pedra Filosofal para recuperar seus corpos.",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Ação", "Aventura", "Fantasia"],
    link: "https://animesonline.io/anime/fullmetal-alchemist-brotherhood-dublado/",
    tipo: "Anime",
},

{
    titulo: "Death Note",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg",
    descricao: "O jovem estudante Light Yagami acha um caderno com poderes sobrenaturais, chamado Death Note, no qual é possível matar uma pessoa apenas escrevendo seu nome no caderno. Quando o descobre, Light tenta eliminar todos os criminosos do mundo e dar à sociedade um mundo livre do mal. Mas seus planos começam a sair de rumo quando o detetive L resolve contrariar Light.",
    temporadas: "1-Temporada",
    classificacao: "16",
    categoria: ["Suspense", "Crime", "Mistério"],
    link: "https://animesonline.io/anime/death-note-dublado/",
    tipo: "Anime",
},

{
    titulo: "Hunter x Hunter",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg",
    descricao: "Monstros amedrontadores, criaturas exóticas, riquezas vastas, tesouros misteriosos, terras vis e terras inexploradas... Gon parte em uma aventura para se tornar um caçador profissional que arrisca a própria vida em busca do desconhecido. Pelo caminho, ele conhece outros participantes da Prova dos Caçadores: Kurapika, Leorio e Killua. Será Gon capaz de vencer os grandes desafios da Prova de Caçadores e se tornar o melhor do mundo? Esta jornada selvagem e épica está prestes a começar!!",
    temporadas: "6-Temporadas",
    classificacao: "12",
    categoria: ["Aventura", "Ação", "Fantasia"],
    link: "https://animesdigital.org/anime/a/hxhdu006?odr=1",
    tipo: "Anime",
},

{
    titulo: "Naruto Shippuden: The Movie",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/x2CL0VzHq8DwD1UDG9Jck7VZH1L.jpg",
    descricao: "Demônios que antes quase destruíram o mundo, agora foram libertados por alguém. Para evitar a destruição, os demônios devem ser novamente selados e trancados, e a única pessoa capaz de fazer isto é uma menina chamada Shion. Ela vem do país do demônio e é capaz de duas coisas: prever a morte de pessoas e também selar demônios. Desta vez, a missão de Naruto é proteger Shion, mas ela prevê a morte dele.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Ação", "Aventura", "Fantasia"],
    link: "https://animesdigital.org/video/a/101318/",
    tipo: "Anime",
},

{
    titulo: "Spy x Family Code: White",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/thGaW3UXecNJAEdB6rs8sC45JWv.jpg",
    descricao: "Ele é um espião. Ela uma assassina. Juntos, Loid e Yor mantêm suas vidas duplas enquanto fingem serem a família perfeita. No entanto, sua filha adotiva, Anya, uma telepata, conhece seus empolgantes segredos, sem eles saberem. Usando o pretexto de levar sua família numa viagem de inverno no fim de semana, a tentativa de Loid de progredir em sua missão atual, a Operação Strix, é frustrada quando Anya se envolve por engano e ativa eventos que ameaçam a paz mundial!",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Comédia", "Ação", "Aventura"],
    link: "https://animesdigital.org/filme/spyxfcodwhx001",
    tipo: "Anime",
},
{
    titulo: "The Chosen",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/9Um6qPWSWHP8cl60fTtOU15uXqb.jpg",
    descricao: "Aprofundando-se nas histórias de fundo e no contexto das pessoas e eventos dos evangelhos, a Primeira Temporada do projeto de mídia de maior financiamento coletivo pelo público de todos os tempos apresenta pessoas como Simão Pedro, Nicodemos, Maria Madalena, Mateus e, claro, Jesus de uma forma nunca antes vista em filme.",
    temporadas: "5-Temporadas",
    classificacao: "10",
    categoria: ["Gospel", "Drama"],
    link: "https://watch.thechosen.tv/",
    tipo: "Série",
},
{
    titulo: "José do Egito",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/diXtQic9EzM3HRpvA0PfL32kkJ0.jpg",
    descricao: "A saga de um homem de Deus, íntegro e indulgente, que após ser vendido como escravo pelos irmãos é levado para o Egito, onde é injustiçado, caluniado, preso e humilhado. Apesar disso, a vida de José é um exemplo de pureza, paciência, amor e perdão.",
    temporadas: "1-Temporada",
    classificacao: "10",
    categoria: ["Gospel", "Drama"],
    link: "https://c7filmes.com.br/series/jose-do-egito/",
    tipo: "Série",
},
{
    titulo: "A Cabana",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/yf2WNfO1b0E1IcJDLUiGj7ccKRm.jpg",
    descricao: "Depois de sofrer uma tragédia familiar, Mack Phillips (Sam Worthington) entra em uma profunda depressão, que o faz questionar suas crenças mais íntimas. Diante de uma crise de fé, ele recebe uma carta misteriosa que o convida para ir a uma cabana abandonada. Mack encontra então verdades significativas que transformarão seu entendimento sobre a tragédia que abalou sua família e sua vida mudará para sempre.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Gospel", "Drama"],
    link: "https://rrrv.lol/a-cabana/",
    tipo: "Filme",
},
{
    titulo: "Quarto de Guerra",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/kyssvvCXc13c9VC7QTWjRo12FyE.jpg",
    descricao: "Elizabeth e Tony formam um casal em crise de relacionamento. A filha pequena percebe que ambos estão à beira do divórcio, mas eles não conseguem chegar a um acordo. Um dia, Elizabeth conhece uma mulher idosa que lhe apresenta o poder da oração e, a partir deste momento, a jovem mãe decide depositar a sua fé nas preces divinas.",
    temporadas: "Filme",
    classificacao: "10",
    categoria: ["Gospel", "Drama"],
    link: "https://www.pobreflix.parts/filmes/quarto-de-guerra/",
    tipo: "Filme",
},
{
        titulo: "O Príncipe do Egito",
       imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/5jco6VjKwjAyN8HElg4F3dXGfT8.jpg",
        descricao: "No Egito antigo, quando os hebreus lá viviam como escravos e o faraó Seti, temendo o constante nascimento de crianças hebréias, pois no futuro poderiam se tornar uma força que ameaçasse seu poder, ordena que todos os bebês hebreus do sexo masculino sejam mortos. Uma hebréia se desespera ao ver que seu filho poderá ser morto e, para salvá-lo, o coloca em uma cesta no rio. A criança acaba sendo encontrada pela rainha, que o adota. Assim Moisés é criado como irmão de Ramsés, o herdeiro do trono de Seti. Os dois crescem e se tornam grande amigos, mas Moisés acaba descobrindo sua origem, decide abandonar o palácio e libertar os hebreus, para levá-los para a Terra Prometida.",
        temporadas: "Filme",
        classificacao: "10",
        categoria: ["Gospel", "Ação", "Aventura"],
        link: "https://www.tokyvideo.com/br/video/o-principe-do-egito",
        tipo: "Desenho",
    },
    {
    titulo: "Breaking Bad",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    descricao: "Um professor de química descobre que está com câncer e decide fabricar metanfetamina para garantir o futuro da família.",
    temporadas: "5-Temporadas",
    classificacao: "18",
    categoria: ["Crime", "Drama", "Suspense"],
    link: "https://rrrv.lol/tvshows/breaking-bad/",
    tipo: "Série",
},
{
    titulo: "Better Call Saul",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
    descricao: "A transformação de Jimmy McGill no advogado criminal Saul Goodman.",
    temporadas: "6-Temporadas",
    classificacao: "16",
    categoria: ["Crime", "Drama"],
    link: "https://rrrv.lol/tvshows/better-call-saul/",
    tipo: "Série",
},
{
    titulo: "Dark",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    descricao: "O desaparecimento de duas crianças revela segredos de viagem no tempo em uma cidade alemã.",
    temporadas: "3-Temporadas",
    classificacao: "16",
    categoria: ["Ficção Científica", "Suspense", "Drama"],
    link: "https://rrrv.lol/tvshows/dark/",
    tipo: "Série",
},
{
    titulo: "The Witcher",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    descricao: "Geralt de Rívia, um caçador de monstros, luta para encontrar seu lugar em um mundo brutal.",
    temporadas: "4-Temporadas",
    classificacao: "16",
    categoria: ["Fantasia", "Ação", "Aventura"],
    link: "https://rrrv.lol/tvshows/the-witcher/",
    tipo: "Série",
},
{
    titulo: "House of the Dragon",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    descricao: "A história da casa Targaryen, antes dos eventos de Game of Thrones.",
    temporadas: "2-Temporadas",
    classificacao: "18",
    categoria: ["Fantasia", "Drama"],
    link: "https://rrrv.lol/tvshows/a-casa-do-dragao/",
    tipo: "Série",
},
{
    titulo: "Chernobyl",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    descricao: "A história real do desastre nuclear de Chernobyl em 1986.",
    temporadas: "Minissérie",
    classificacao: "16",
    categoria: ["Drama", "Histórico"],
    link: "https://rrrv.lol/tvshows/chernobyl/",
    tipo: "Série",
},
{
    titulo: "Peaky Blinders: O Homem Imortal",
    imagem: "https://cdn.bcdn.zip/wp-content/uploads/2026/03/2leCqfS.png",
    descricao: "Peaky Blinders: Sangue, Apostas e Navalhas é uma série britânica que acompanha a ascensão da família Shelby, uma impiedosa gangue de criminosos que domina Birmingham, na Inglaterra, logo após a Primeira Guerra Mundial. Liderada pelo brilhante e traumatizado Thomas Shelby, a trama mostra a expansão dos negócios ilegais do grupo.",
    temporadas: "Filme",
    classificacao: "16",
    categoria: ["Crime", "Drama"],
    link: "https://rrrv.lol/peaky-blinders-o-homem-imortal/",
    tipo: "Filme",
},
{
    titulo: "Peaky Blinders",
    imagem: "https://cdn.bcdn.zip/wp-content/uploads/2022/06/ci2kIWZ.png",
    descricao: "Uma gangue criminosa domina Birmingham após a Primeira Guerra Mundial.",
    temporadas: "6-Temporadas",
    classificacao: "16",
    categoria: ["Crime", "Drama"],
    link: "https://rrrv.lol/tvshows/peaky-blinders/",
    tipo: "Série",
},
{
    titulo: "La Casa de Papel",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    descricao: "Um grupo realiza o maior assalto da história na Casa da Moeda da Espanha.",
    temporadas: "5-Temporadas",
    classificacao: "16",
    categoria: ["Crime", "Drama", "Suspense"],
    link: "https://www.pobreflix.parts/series/la-casa-de-papel/",
    tipo: "Série",
},
{
    titulo: "The Walking Dead",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/9lb02gTh4LLB17yAEXFd4C3R4JP.jpg",
    descricao: "Nos Estados Unidos pós-apocalíptico, um pequeno grupo de sobreviventes segue viajando à procura de uma nova casa longe dos mortos-vivos. O desespero por segurança e suprimentos os coloca constantemente à beira da sanidade.",
    temporadas: "11-Temporadas",
    classificacao: "16",
    categoria: ["Terror", "Drama"],
    link: "https://www.pobreflix.parts/series/the-walking-dead/",
    tipo: "Série",
},
{
    titulo: "Supernatural",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
    descricao: "Dois irmãos caçam criaturas sobrenaturais pelo mundo.",
    temporadas: "15-Temporadas",
    classificacao: "14",
    categoria: ["Terror", "Fantasia", "Drama"],
    link: "https://rrrv.lol/tvshows/supernatural/",
    tipo: "Série",
},

{
    titulo: "Rick and Morty",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
    descricao: "Um cientista maluco e seu neto vivem aventuras pelo multiverso.",
    temporadas: "9-Temporadas",
    classificacao: "16",
    categoria: ["Animação", "Comédia", "Ficção Científica"],
    link: "https://rrrv.lol/tvshows/rick-and-morty/",
    tipo: "Desenho",
},
{
    titulo: "BoJack Horseman",
    imagem: "https://image.tmdb.org/t/p/w500/6JFWzlChcGgLiIUo2COgNlWGFKy.jpg",
    descricao: "Um ator decadente tenta lidar com fama, depressão e vida pessoal.",
    temporadas: "6-Temporadas",
    classificacao: "16",
    categoria: ["Animação", "Drama", "Comédia"],
    link: "https://www.pobreflix.you/series/bojack-horseman/",
    tipo: "Desenho",
},
{
    titulo: "Os Simpsons",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/1jGPgDDcmg3Xgs3WO8sfYfbnFoA.jpg",
    descricao: "Uma animação sobre uma típica família dos Estados Unidos. Homer é o pai de família nada saudável ou inteligente, que adora beber cerveja. Marge é a esposa e mãe de família dedicada. Bart é o filho de 10 anos, que não leva a escola a sério e tem orgulho disso. Lisa é a garota de 8 anos, um gênio não apreciado. E Maggie é a bebê que não larga a chupeta.",
    temporadas: "30+ Temporadas",
    classificacao: "12",
    categoria: ["Comédia", "Animação"],
    link: "https://aniture-pt.com.br/animes-e-desenhos/os-simpsons/",
    tipo: "Desenho",
},
{
    titulo: "Uma Família da Pesada",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/j28XGzAhvJNGWEHbYrzvREw7kKd.jpg",
    descricao: "A série animada apresenta as aventuras da família Griffin. O ignorante Peter e sua esposa Lois residem em Quahog, em Rhode Island e têm três filhos. Meg, a filha mais velha, é uma pária social, e o adolescente Chris é estranho e sem noção quando se trata do sexo oposto. O mais novo, Stewie, é um bebê gênio decidido a matar sua mãe e destruir o mundo. O cachorro falante, Brian, mantém Stewie sob controle enquanto toma martinis e resolve seus próprios problemas de vida.",
    temporadas: "20+ Temporadas",
    classificacao: "14",
    categoria: ["Comédia", "Animação"],
    link: "https://www.pobreflix.you/series/uma-familia-da-pesada/",
    tipo: "Desenho",
},

{
    titulo: "Chainsaw Man",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/yVtx7Xn9UxNJqvG2BkvhCcmed9S.jpg",
    descricao: "Denji é um adolescente que mora com Pochita, o Demônio da Motosserra. Por conta das dívidas que herdou de seu pai, ele vive na miséria, exterminando outros demônios com Pochita para pagar as contas. Até que, um dia, Denji é traído e morre. Em seus últimos momentos de consciência, ele firma um contrato com Pochita e renasce como o Homem-Motosserra - um humano com coração de demônio.",
    temporadas: "1-Temporada",
    classificacao: "16",
    categoria: ["Ação", "Terror", "Fantasia"],
    link: "https://animesonline.io/anime/chainsaw-man-dublado/",
    tipo: "Anime",
},
{
    titulo: "Solo Leveling",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/uFmLbRL1LyHSgoGMI7hQ8bZ4Juf.jpg",
    descricao: "Há mais de uma década, surgiu uma misteriosa passagem chamada portal, que conecta este mundo a uma dimensão diferente, o que fez com que pessoas despertassem poderes únicos… e essas pessoas são chamadas de caçadores. Os caçadores usam seus poderes sobre-humanos para conquistar masmorras dentro dos portais e assim ganhar a vida. Sung Jinwoo, um caçador de nível baixo, é considerado o caçador mais fraco de toda a humanidade. Certo dia, ele se depara com uma masmorra dupla, que tem uma masmorra de nível alto escondida dentro de uma masmorra de nível baixo. Diante de um Jinwoo gravemente ferido, surge uma misteriosa missão! À beira da morte, Jinwoo decide aceitar essa missão, tornando-se assim a única pessoa capaz de subir de nível!",
    temporadas: "1-Temporada",
    classificacao: "16",
    categoria: ["Ação", "Fantasia"],
    link: "https://animesonline.io/anime/solo-leveling-ore-dake-level-up-na-ken/",
    tipo: "Anime",
},
{
    titulo: "Blue Lock",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/fcKH1NQzoTXiYO1OrhaFFwTKhBp.jpg",
    descricao: "Após sofrer um vexame na Copa do Mundo de 2018, a seleção japonesa sofre para se recompor. Falta ao time um artilheiro, uma estrela capaz de guiá-los à vitória. Com o intuito de criar um atacante com fome de bola e sede de vitória, capaz de virar jogos tidos como impossíveis, a Confederação Japonesa de Futebol reune 300 dos melhores jogadores de base do país em um só lugar. Centenas de jovens vão se enfrentar numa batalha de músculos e de egos para provar que são os melhores.",
    temporadas: "2-Temporadas",
    classificacao: "14",
    categoria: ["Esporte", "Ação"],
    link: "https://animesonline.io/anime/blue-lock-dublado/",
    tipo: "Anime",
},
{
    titulo: "Vinland Saga",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/vUHlpA5c1NXkds59reY3HMb4Abs.jpg",
    descricao: "Ao fim do primeiro milênio, a poderosa e atroz tribo dos vikings causa destruição e massacres em todo lugar por onde passam. Thorfinn, filho de um grande guerreiro, viveu sua infância inteira nos campos de batalha, buscando a terra prometida de Vinland. Esta é a história de um verdadeiro herói em tempos conturbados.",
    temporadas: "2-Temporadas",
    classificacao: "16",
    categoria: ["Ação", "Drama", "Histórico"],
    link: "https://animesonline.io/anime/vinland-saga-dublado/",
    tipo: "Anime",
},

{
    titulo: "Frozen",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/hOZKUJGN0m717LRSQDxhgABqWrf.jpg",
    descricao: "A destemida e otimista Anna sai em uma jornada épica, ao lado de Kristoff e sua leal rena Sven, para encontrar sua irmã Elsa, cujos poderes congelantes aprisionaram o reino de Arendelle em um inverno eterno. Encontrando condições de Everest, trolls místicos e um hilário boneco de neve chamado Olaf, Anna e Kristoff enfrentam obstáculos em uma corrida para salvar o reino.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Fantasia"],
    link: "https://eee1.lat/frozen-uma-aventura-congelante/",
    tipo: "Desenho",
},
{
    titulo: "Moana",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/4rxEeTzN1oZPJo1GBoPOnA3NeJv.jpg",
    descricao: "Moana Waialiki é uma corajosa jovem, filha do chefe de uma tribo na Oceania, vinda de uma longa linhagem de navegadores. Querendo descobrir mais sobre seu passado e ajudar a família, ela resolve partir em busca de seus ancestrais, habitantes de uma ilha mítica que ninguém sabe onde é. Acompanhada pelo lendário semideus Maui, Moana começa sua jornada em mar aberto, onde enfrenta terríveis criaturas marinhas e descobre histórias do submundo.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Aventura"],
    link: "https://eee1.lat/moana-um-mar-de-aventuras/",
    tipo: "Desenho",
},
{
    titulo: "Toy Story",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/6AafgfifXkFS4g2xGJZIwsPQK6P.jpg",
    descricao: "Buzz Lightyear é o novo e sofisticado astronauta de brinquedo do garoto Andy. Buzz não imaginava que encontraria um rival: Woody, um cowboy de brinquedo que, dominado pelo ciúme, acredita ter perdido um lugar precioso no coração do seu dono. Os dois brinquedos vivem brigando até que vão parar nas garras do vizinho, um verdadeiro destruidor de brinquedos. Agora, mais do que nunca, Buzz e Woody precisam precisam se unir para escapar do perigo. Com a ajuda de seus amigos da caixa de brinquedos, eles vão viver uma incrível aventura.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Comédia"],
    link: "https://eee1.lat/toy-story-um-mundo-de-aventuras/",
    tipo: "Desenho",
},
{
    titulo: "Shrek",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/wxeqfC221YMptRRdzxlijAh7q8l.jpg",
    descricao: "Há muito tempo, em um pântano muito remoto, vivia um ogro feroz chamado Shrek. Um dia, sua solidão é interrompida por uma invasão de personagens surpreendentes. Há pequenos ratos cegos em sua comida, um enorme e péssimo lobo em sua cama, três porquinhos sem teto e outros seres que foram deportados de suas terras pelo maligno lorde Farquaad. Para salvar seu território, Shrek faz um pacto com Farquaad e parte em uma jornada para fazer a linda princesa Fiona concordar em ser a noiva do Senhor. Em uma missão tão importante, ele é acompanhado por um burro divertido, pronto para fazer qualquer coisa por Shrek: tudo, exceto ficar em silêncio.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Comédia", "Fantasia"],
    link: "https://eee1.lat/shrek/",
    tipo: "Desenho",
},
{
    titulo: "Kung Fu Panda",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/1YMs3zCt5kICK28RvVgDL1UUtkA.jpg",
    descricao: "Po é um panda que trabalha na loja de macarrão da sua família e sonha em transformar-se em um mestre de kung fu. Seu sonho se torna realidade quando, inesperadamente, ele deve cumprir uma profecia antiga e estudar a arte marcial com seus ídolos, os Cinco Furiosos. Po precisa de toda a sabedoria, força e habilidade que conseguir reunir para proteger seu povo de um leopardo da neve malvado.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Ação", "Comédia"],
    link: "https://eee1.lat/kung-fu-panda/",
    tipo: "Desenho",
},
{
    titulo: "Kung Fu Panda 2",
    imagem: "https://upload.wikimedia.org/wikipedia/en/b/b1/Kung_Fu_Panda_2_Poster.jpg",
    descricao: "Po precisa enfrentar um poderoso inimigo que ameaça destruir o kung fu e, ao mesmo tempo, descobrir a verdade sobre seu passado.",
    tipo: "Filme",
    categoria: ["Aventura", "Comédia", "Ação"],
    classificacao: "Livre",
    temporadas: "Filme",
    link: "https://rrrv.lol/kung-fu-panda-2/",
    tipo: "Desenho",
},

{
    titulo: "Kung Fu Panda 3",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/uo4T7PDDYGCxK9uO68gJygLR8VT.jpg",
    descricao: "Po reencontra seu pai biológico e descobre uma vila secreta de pandas. Quando um novo vilão surge, ele precisa treinar os pandas para se tornarem guerreiros.",
    tipo: "Filme",
    categoria: ["Aventura", "Comédia", "Ação"],
    classificacao: "Livre",
    temporadas: "Filme",
    link: "https://rrrv.lol/kung-fu-panda-3/",
    tipo: "Desenho",
},

{
    titulo: "Kung Fu Panda 4",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/aNK6MA5EApIo0UJE7ZWSYcZBJKy.jpg",
    descricao: "Po é escolhido para se tornar o Líder Espiritual do Vale da Paz e precisa encontrar um sucessor para o título de Dragão Guerreiro enquanto enfrenta uma nova ameaça.",
    tipo: "Filme",
    categoria: ["Aventura", "Comédia", "Ação"],
    classificacao: "Livre",
    temporadas: "Filme",
    link: "https://rrrv.lol/kung-fu-panda-4/",
    tipo: "Desenho",
},
{
    titulo: "O Rei Leão",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/8aIvm8OaJISOpVTt7rMIh7X35G5.jpg",
    descricao: "Mufasa, o Rei Leão, e a rainha Sarabi apresentam ao reino o herdeiro do trono, Simba. O recém-nascido recebe a bênção do sábio babuíno Rafiki, mas ao crescer é envolvido nas artimanhas de seu tio Scar, o invejoso e maquiavélico irmão de Mufasa, que planeja livrar-se do sobrinho e herdar o trono.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Drama", "Aventura"],
    link: "https://eee1.lat/o-rei-leao/",
    tipo: "Desenho",
},
{
    titulo: "Up - Altas Aventuras",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/oo5gvGDIiPwbXc3R0snZIuOc517.jpg",
    descricao: "Carl Fredricksen é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. Após um incidente, Carl é considerado uma ameaça pública e forçado a ser internado. Para evitar que isto aconteça, ele põe balões em sua casa, fazendo com que ela levante voo. Carl quer viajar para uma floresta na América do Sul, onde ele e Ellie sempre desejaram morar, mas descobre que um problema embarcou junto: Russell, um menino de 8 anos.",
    temporadas: "Filme",
    classificacao: "Livre",
    categoria: ["Animação", "Aventura", "Drama"],
    link: "https://eee1.lat/up-altas-aventuras/",
    tipo: "Desenho",
},
{
    titulo: "Velozes e Furiosos",
    imagem: "https://cdn.bcdn.zip/wp-content/uploads/2023/05/oUEiEsdF1hRqJGJo6Zoc69ZsebG-120x170.jpg",
    descricao: " (2001) é um filme de ação que acompanha Brian O'Conner (Paul Walker), um policial que se infiltra no submundo das corridas de rua ilegais de Los Angeles. Ele investiga uma gangue suspeita de roubos a caminhões liderada por Dominic Toretto (Vin Diesel), mas acaba se envolvendo com o grupo e a irmã de Toretto, Mia.",
    temporadas: "Filme",
    classificacao: "14",
    categoria: ["Ação", "Crime"],
    link: "https://eee1.lat/velozes-e-furiosos/",
    tipo: "Filme",
},
{
    titulo: "Missão Impossível",
    imagem: "https://cdn.bcdn.zip/wp-content/uploads/2018/11/ymisRFnNz9DUiEKn4ViMGb91Gw9.jpg",
    descricao: "Ethan Hunt enfrenta missões perigosas pelo mundo.",
    temporadas: "Filme",
    classificacao: "14",
    categoria: ["Ação", "Suspense"],
    link: "https://eee1.lat/missao-impossivel/",
    tipo: "Filme",
},
{
    titulo: "Piratas do Caribe: Navegando em Águas Misteriosas",
    imagem: "https://cdn.bcdn.zip/wp-content/uploads/2017/06/rdOc15GIOGJMqgsQXHUNeVHvVzM-120x170.jpg",
    descricao: "Jack Sparrow vive aventuras pelos mares.",
    temporadas: "Filme",
    classificacao: "12",
    categoria: ["Aventura", "Fantasia"],
    link: "https://eee1.lat/piratas-do-caribe-navegando-em-aguas-misteriosas/",
    tipo: "Filme",
},
{
    titulo: "My Hero Academia",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/cfESQ8y8oNAeLuRbs7NkW7Qjwhy.jpg",
    descricao: "Por toda a sua vida, Izuku sonhou ser um herói — um objetivo ambicioso para qualquer um, mas especialmente desafiador para um garoto sem superpoderes. Isso mesmo: em um mundo onde 80% da população tem algum tipo de Dom especial, Izuku teve a má sorte de nascer completamente normal. Mas isso não vai impedi-lo de se matricular em uma das academias de herois mais prestigiosas do mundo.",
    temporadas: " 8-Temporadas",
    classificacao: "12",
    categoria: ["Aventura", "Fantasia", "Ação"],
    link: "https://animesonline.io/?s=my%20hero%20academia",
    tipo: "Anime",
},
{
    titulo: "Round 6",
    imagem: "https://cdn.bcdn.zip/wp-content/uploads/2025/06/vc9Mlgh.png",
    descricao: "acompanha pessoas desesperadas por dinheiro que aceitam participar de um misterioso torneio de sobrevivência. Confinados em uma ilha, 456 jogadores disputam seis jogos infantis coreanos mortais por um prêmio de 45,6 bilhões de wons, onde quem perde é eliminado permanentemente.",
    temporadas: " 3-Temporadas",
    classificacao: "16",
    categoria: ["Suspense", "Drama", "Live Action"],
    link: "https://rrrv.lol/tvshows/round-6/",
    tipo: "Série",
},
{
    titulo:"Noble Reincarnation: Born Blessed, So I'll Obtain Ultimate Power ",
    imagem:"https://media.themoviedb.org/t/p/w300_and_h450_face/zaZpbXyvH4M2Y6ICDuMtvVQyHwd.jpg",
    descricao:"Na sua vida passada, Noa era apenas um jovem adulto de uma vila comum, alguém sem nada digno de nota. Porém, tudo muda quando ele renasce como o 13º príncipe de um império! Sua tela de status revela uma habilidade única: quanto mais pessoas estiverem sob seu comando, mais forte ele se torna. Em busca do poder absoluto, Noa não medirá esforços para garantir que aqueles que o servem permaneçam ao seu lado para sempre.",
    temporadas:"1-Temporada",
    classificacao:"14",
    categoria: ["Ação", "Aventura", "Fantasia"],
    link: "https://animesonline.io/anime/kizoku-tensei-megumareta-umare-kara-saikyou-no-chikara-wo-eru/",
    tipo: "Anime",
},
{
    titulo:"I'm a Noble on the Brink of Ruin, So I Might as Well Try Mastering Magic ",
    imagem:"https://media.themoviedb.org/t/p/w300_and_h450_face/7yYvOotNSvM8Q9le7uDfzX2h9fb.jpg",
    descricao:"Enquanto curte inocentemente seu tempo livre após o trabalho, a vida deste homem mudará para sempre. Ele acorda no corpo de Liam Hamilton, o filho mais novo de uma família nobre à beira do colapso. Em meio ao caos, Liam percebe que finalmente tem tempo para aprender e praticar magia. E, logo de cara, sua vida dá uma reviravolta ainda maior! Será que Liam conseguirá dominar a magia e salvar sua nova e nobre família?",
    temporadas:"1-Temporada",
    classificacao:"14",
    categoria: ["Fantasia","Ação","Aventura"],
    link: "https://animesonline.io/anime/botsuraku-yotei-no-kizoku-dakedo-hima-datta-kara-mahou-wo-kiwametemita/",
    tipo: "Anime",
},
{
    titulo: "From Overshadowed to Overpowered: Second Reincarnation of a Talentless Sage ",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/p4TE3kK2iyuADfDYIRDTxjahdNa.jpg",
    descricao: "O Grande Sábio Ephtal morre em desespero após falhar em alcançar o ápice da magia — 400 anos depois, ele renasce com todas as suas memórias e poderes intactos. A nesse mundo a magia decaiu e feitiços ancestrais são tratados como milagres. Esta é a sua nova chance de alcançar seu objetivo.",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Fantasia", "Ação", "Comédia"],
    link: "https://animesonline.io/anime/rakudai-kenja-no-gakuin-musou-nidome-no-tensei-s-rank-cheat-majutsushi-boukenroku/",
    tipo: "Anime",
},
{
    titulo: "Fuguushoku Kanteishi ga Jitsu wa Saikyou Datta",
    imagem: "https://i1.wp.com/animesonline.io/wp-content/uploads/2026/06/1782304893-1477-146293l.jpg",
    descricao: "é um anime de fantasia que acompanha a jornada de Ein, um jovem que nasceu com a classe de Avaliador, considerada inútil e fraca pela sociedade",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Ação", "Fantasia", "Aventura"],
    link: "https://animesonline.io/anime/fuguushoku-kanteishi-ga-jitsu-wa-saikyou-datta/",
    tipo: "Anime",
},
{
    titulo: "Okashi na Tensei: Saikyou Patishie Isekai Kourin",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/51CKhQNOvH3cxjljRize0oPfPyR.jpg",
    descricao: "A confeiteira de 9 anos, Mille Morteln, é a herdeira de seu pai e a reencarnação de uma confeiteira insatisfeita. Embora ela sonhe com uma terra cheia de doces, há muito o que fazer primeiro! Desde aprender a lutar, dominar seus novos talentos mágicos, fazer o seu melhor para defender sua vila dos bandidos, e ainda assim tudo o que ela realmente quer fazer é assar a torta de maçã perfeita… A confeiteira Mille Morteln tem muito trabalho fazer adiante em sua Doce Reencarnação.",
    temporadas: "1-Temporada",
    classificacao: "12",
    categoria: ["Aventura", "Ação", "Comédia"],
    link: "https://animesdigital.org/anime/a/okashi-na-tensei-saikyou-patishie-isekai-kourin",
    tipo: "Anime",
},
{
    titulo: "Arifureta: From Commonplace to World's Strongest",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/3Te6pYJNdh4YyWY1G7ANxNHpedi.jpg",
    descricao: "Quando um grupo de estudantes é transportada para outro mundo para atuar como seu salvador, Nagumo Hajime se vê como o elo mais fraco. Seus amigos e colegas de classe recebem classes fortes e habilidades impressionantes devido a suas habilidades existentes. Quando uma busca nas masmorras o deixa separado de seu grupo, Hajime deve descobrir seus próprios talentos ou ser deixado a apodrecer neste mundo para sempre.",
    temporadas: "3-Temporadas",
    classificacao: "14",
    categoria: ["Ação", "Aventura", "Fantasia"],
    link: "https://animesonline.io/?s=Arifureta",
    tipo: "Anime",
},
{
    titulo: "TSUKIMICHI -Moonlit Fantasy",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/7XQ2dMEARAdUZQscnIJFPI54q3r.jpg",
    descricao: "Makoto Misumi era um adolescente qualquer até ser invocado para ser o herói de outro mundo... Mas a Deusa deste novo mundo o achou feio demais, o despiu de seu papel de herói e o enviou para os confins do mundo. Nesta terra desolada, ele encontra dragões, aranhas, orcs, anões e muitas outras raças não-humanas, mas consegue se desvencilhar dessas ameaças com o uso de técnicas de combate e de magia. Conseguirá Makoto sobreviver neste mundo novo cheio de perigos? Assim começa esta fantasia sobre um rapaz abandonado pelos deuses e pela humanidade, tentando começar uma nova vida em outro mundo!",
    temporadas: "2-Temporadas",
    classificacao: "14",
    categoria: ["Aventura", "Fantasia", "Comédia"],
    link: "https://animesonline.io/?s=TSUKIMICHI%20-Moonlit%20Fantasy",
    tipo: "Anime",
},
{
    titulo: "Seirei Gensouki: Spirit Chronicles",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/dNki26bfC3ad6mRQZOxY8ysosrb.jpg",
    descricao: "Sua vida passada e presente estão entremeadas - um jovem com memórias de duas vidas distintas enfrenta seu destino! Rio perdeu a sua mãe quando ainda era jovem, e foi obrigado a lutar pra sobreviver na favela. Certo dia, despertam nele as memórias de Haruto Amakawa, fazendo Rio perceber que reencarnou num mundo de espada e magia. E ao impedir por acaso o sequestro de uma princesa, ele acaba sendo matriculado numa renomada escola para os filhos da nobreza... Tentando galgar os degraus da hierarquia social, muitos encontros e despedidas aguardam Rio em sua luta para superar seu destino.",
    temporadas: "2-Temporadas",
    classificacao: "14",
    categoria: ["Fantasia", "Drama", "Ação"],
    link: "https://animesdigital.org/search/Seirei+Gensouki",
    tipo: "Anime",
},
{
    titulo: "The Eminence in Shadow",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/7JKYmtLydAwo9ZsEmAknZiO4U8g.jpg",
    descricao: "Muitos admiram heróis e vilões, mas Cid Kagenou sempre desejou ser como aqueles que agem por entre as sombras das histórias. Percebendo que nunca seria capaz de conseguir atingir seus objetivo, Cid se surpreende ao se ver reencarnado em um mundo onde tem as capacidades necessárias para se tornar o que sempre admirou. A partir de então, ele cria uma falsa organização, com o objetivo de agir como um figurante qualquer, mas que trabalha por entrelinhas para confrontar um culto secreto que entrou em seu caminho.",
    temporadas: "2-Temporadas",
    classificacao: "16",
    categoria: ["Ação", "Fantasia", "Comédia"],
    link: "https://www.pobreflixtv.fast/serie/the-eminence-in-shadow",
    tipo: "Anime",
},
{
    titulo: "The Rising of the Shield Hero",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/yjq2n0agGJfmZQ9NpbYIhuBofcq.jpg",
    descricao: "Iwatani Naofumi, um otaku como qualquer outro, encontra um livro numa biblioteca que o transporta para outro mundo. Ele recebe a missão de se tornar o Herói do Escudo, um dos Quatro Heróis Cardinais que enfrentará as Ondas de Catástrofe ao lado dos Heróis da Espada, Lança e Arco. Empolgado com as aventuras, Naofumi sai em missão com sua equipe. Contudo, alguns poucos dias depois, ele é traído e perde todo o seu dinheiro, dignidade e respeito. Será que ele vai encontrar uma saída dessa situação desesperadora?",
    temporadas: "5-Temporadas",
    classificacao: "14",
    categoria: ["Fantasia", "Drama", "Ação", "Aventura"],
    link: "https://animesonline.io/?s=The%20Rising%20of%20the%20Shield%20Hero",
    tipo: "Anime",
},
{
    titulo: "In Another World With My Smartphone",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/k3DboKiicC4ZbJe50sjG1fGdMGX.jpg",
    descricao: "Depois de morrer por um engano de Deus, o protagonista vai parar num mundo paralelo, onde ele começa sua nova vida. Suas únicas posses são o corpo que Deus lhe devolveu e um smartphone, que ainda funciona nesse outro mundo. Após conhecer várias novas pessoas e forjar novas amizades, ele começa a descobrir o segredo deste mundo. Ele herda o legado de uma antiga civilização e colabora com reis de vários países em sua jornada despreocupada neste novo mundo.",
    temporadas: "2-Temporadas",
    classificacao: "14",
    categoria: ["Comédia", "Fantasia", "Aventura", "Ação"],
    link: "https://animesonline.io/?s=In%20Another%20World%20With%20My%20Smartphone",
    tipo: "Anime",
},
{
    titulo: "Level 1 dakedo Unique Skill de Saikyou desu ",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/cIrptxkpf3SNcPty3JaywvWRJ5w.jpg",
    descricao: "Ryota Sato, um assalariado que trabalha para uma empresa exploradora, vai parar de repente em uma masmorra estranha, num mundo onde monstros derrotados soltam loots de todos os tipos. Com a ajuda de uma jovem chamada Emily, ele lê seus próprios atributos, e descobre que todos os seus atributos físicos e mágicos são nota F (a pior!). Pra piorar, seu nível está travado no 1 (o mais baixo!). Quando Ryota cai em desespero, ele percebe que ele tem uma Habilidade de Drop: S Geral, a habilidade mais poderosa que existe! Será que Ryota vai conseguir sobreviver neste mundo bizarro?",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Ação", "Aventura", "Fantasia", "Comédia"],
    link: "https://animesonline.io/anime/level-1-dakedo-unique-skill-de-saikyou-desu-dublado/",
    tipo: "Anime",
},
{
    titulo: "Jitsu Wa Ore Saikyou Deshita?",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/og42meOPOiq37wUSfQV0lqb1U0Q.jpg",
    descricao: "Com a bênção da deusa de reencarnação, Haruto renasce no corpo de um bebê — e um príncipe, ainda por cima 1000 vezes — e recebe poder mágico 1000 vezes maior que um humano normal! Contudo, como a leitura de poder mágico desse mundo só vai até os dois dígitos, todos acreditam que seu poder mágico é zero... E abandonam o bebê no meio da floresta no dia em que nasceu! Será que este bebê vai conseguir sobreviver aos perigos do mundo selvagem, provar seu valor e assumir seu trono de direito?!",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Fantasia", "Comédia", "Ação", "Aventura"],
    link: "https://www.pobreflixtv.fast/serie/e-serio-que-eu-sou-o-mais-forte",
    tipo: "Anime",
},
{
    titulo: "Seija Musou: Salaryman, Isekai de Ikinokoru Tame ni Ayumu Michi",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/zkzYTYdhaNqRaGyKsBunt3y5vs0.jpg",
    descricao: "Pouco antes de receber uma promoção, um executivo é baleado e morto - mas Deus decide reencarná-lo em outro mundo em um curandeiro de 15 anos chamado Luciel... num país onde curandeiros são odiados. Percebendo-se em perigo, Luciel visita a guilda de aventureiros em busca de proteção, mas é sujeito a um treinamento muito mais árduo do que imaginava, além de ser forçado a ingerir a misteriosa Substância X. Espera, o que isso tem a ver com ser curandeiro?! Este curandeiro renascido e masoquista começa sua nova vida, lutando pela sobrevivência!",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Fantasia", "Aventura", "Ação"],
    link: "https://animesonline.io/anime/seija-musou-salaryman-isekai-de-ikinokoru-tame-ni-ayumu-michi/",
    tipo: "Anime",
},
{
    titulo: "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/8AnfDEm1ARkde8ZNIUwuvXNTycN.jpg",
    descricao: "O assassino número um do mundo foi reencarnou como o filho mais velho de uma família de assassinos aristocratas. Em troca de reencarnar em outro mundo, uma deusa lhe impôs uma condição. Mate o Herói que pela profecia destruirá o mundo. Esta deveria ser a missão em sua nova vida. O efeito sinérgico do vasto conhecimento e experiência que ele adquiriu e que tornou possível todo tipo de assassinatos no mundo moderno, e as técnicas secretas e mágicas da família de assassinos mais poderosa do mundo da fantasia o transformam no maior assassino de todos os tempos.",
    temporadas: "1-Temporada",
    classificacao: "16",
    categoria: ["Ação", "Fantasia", "Aventura"],
    link: "https://animesonline.io/?s=The+World%27s+Finest+Assassin+Gets+Reincarnated+in+Another+World+as+an+Aristocrat",
    tipo: "Anime",
},
{
    titulo: "KonoSuba: God's Blessing on This Wonderful World! ",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/kvXF7ugmNHo2HyNLy7lhQQVbBBa.jpg",
    descricao: "Após um acidente de trânsito, a breve e desapontadora vida de Kazuma Sato deveria ter acabado, mas ele acorda e vê uma belíssima garota diante dele. Ela diz ser Aqua, uma deusa, e lhe pergunta se ele gostaria de ir para outro mundo, levando consigo apenas uma coisa deste mundo. Kazuma decide levar a própria deusa consigo, e eles são transportados para um mundo de fantasia cheio de aventura, dominado por um rei-demônio. Agora Kazuma quer apenas viver em paz, mas Aqua quer resolver vários dos problemas deste novo mundo, e o rei-demônio não vai ignorá-los por muito tempo...",
    temporadas: "4-Temporadas",
    classificacao: "16",
    categoria: ["Ação", "Comédia", "Fantasia"],
    link: "https://animesonline.io/?s=Kono%20Subarashii%20Sekai%20ni%20Shukufuku%20o!",
    tipo: "Anime",
},
{
    titulo: "Kenja no Mago",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/zlPIFzhr5uvjTmzEU2rjtwazrLX.jpg",
    descricao: "Um jovem morre em um acidente de trânsito e renasce em um novo mundo mágico. Lá ele aprende tudo que sempre precisou saber... menos a ter juízo!",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Comédia", "Ação", "Fantasia"],
    link: "https://animesonline.io/anime/kenja-no-mago-dublado/",
    tipo: "Anime",
},
{
    titulo: "The 8th son? Are you kidding me?",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/vczlgbCyJPIzjhyyiI9mGVL1gTg.jpg",
    descricao: "Ichinomiya Shingo, um rapaz de 25 anos que trabalha num escritório, acorda no corpo de Wendelin, o oitavo filho de uma família nobre decadente. Desesperado ao saber que não herdará nada de seu clã, e sem saber absolutamente nada sobre o mundo político em que está inserido, ele lança mão de sua aptidão para a magia pra sobreviver. Esta é a história de um jovem que conquista sua liberdade através da magia, e que não está interessado em salvar o mundo... Mas também é a história de um homem incapaz de fugir dos grilhões da sociedade.",
    temporadas: "1-Temporada",
    classificacao: "14",
    categoria: ["Fantasia", "Aventura", "Comédia"],
    link: "https://animesonline.io/anime/hachi-nan-tte-sore-wa-nai-deshou/",
    tipo: "Anime",
},
{
    titulo: "Plunderer",
    imagem: "https://media.themoviedb.org/t/p/w300_and_h450_face/A0XboGeodpGlj33QUtjPMMwrMkN.jpg",
    descricao: "Em um mundo pós-apocalíptico dominado pelos chamados “Números”, cada humano terá sua identidade marcada com seu próprio “Conde”, que pode definir qualquer número relacionado à sua vida. Que seja a distância percorrida ou a quantidade de elogios que outros lhes deram, esse conde pode levá-los ao abismo quando cair a zero. No ano 305 do calendário alciano, Hina herdou uma missão de sua mãe, cujo conde se depreciou a zero, para procurar o lendário Barão Vermelho. Em sua aventura, ela conhece um espadachim meio mascarado chamado Licht, que tenta esconder sua identidade, já que ele é conhecido como um degenerado por ter um conde incrivelmente baixo.",
    temporadas: "1-Temporada",
    classificacao: "16",
    categoria: ["Aventura", "Ação", "Fantasia"],
    link: "https://animesonline.io/anime/plunderer/",
    tipo: "Anime",
}

];


// ================= LOGIN / LOGOUT =================

function logout() {
    localStorage.removeItem("usuarioLogado");

    Swal.fire({
        icon: "success",
        title: "Logout realizado!"
    }).then(() => {
        location.reload();
    });
}

function adicionarAoHistorico(titulo) {

    if (!usuarioAtual) {

        Swal.fire(
            "Aviso",
            "Faça login para usar o histórico.",
            "warning"
        );

        return;
    }

    const jaExiste = historico.some(
        item =>
            item.usuario === usuarioAtual.usuario &&
            item.titulo === titulo
    );

    if (jaExiste) {

        Swal.fire(
            "Aviso",
            "Este conteúdo já está no seu histórico.",
            "info"
        );

        return;
    }

    historico.push({
        usuario: usuarioAtual.usuario,
        titulo,
        data: new Date().toLocaleString("pt-BR")
    });

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    mostrarContinuarAssistindo();

    Swal.fire(
        "Sucesso",
        "Adicionado ao histórico.",
        "success"
    );
}

function removerDoHistorico(titulo) {

    historico = historico.filter(item =>
        !(
            item.usuario === usuarioAtual.usuario &&
            item.titulo === titulo
        )
    );

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    mostrarHistorico();
}

function mostrarHistorico() {

    if (!usuarioAtual) {

        Swal.fire(
            "Aviso",
            "Faça login para visualizar o histórico.",
            "warning"
        );

        return;
    }

    const historicoUsuario = historico.filter(
        item => item.usuario === usuarioAtual.usuario
    );

    if (historicoUsuario.length === 0) {

        Swal.fire(
            "Histórico",
            "Você ainda não marcou nenhum conteúdo como assistido.",
            "info"
        );

        return;
    }

    const totalAssistidos = historicoUsuario.length;

    const html = historicoUsuario
        .slice()
        .reverse()
        .map(item => `
            <div
                class="item-historico"
                style="
                    padding:10px;
                    border-bottom:1px solid #ddd;
                    text-align:left;
                "
            >

                <strong>${item.titulo}</strong><br>

                <small>${item.data}</small>

                <br>

                <button
                    class="btn btn-danger btn-sm mt-1"
                    onclick="removerDoHistorico('${item.titulo}')">
                    🗑️ Remover
                </button>

            </div>
        `)
        .join("");

    Swal.fire({
        title: `📜 Meu Histórico (${totalAssistidos})`,
        html: `
            <p>
                📊 Você assistiu ${totalAssistidos} conteúdo(s)
            </p>

            <input
                id="buscaHistorico"
                class="form-control mb-3"
                placeholder="🔍 Buscar..."
            >

            <div
                id="listaHistorico"
                style="
                    max-height:400px;
                    overflow-y:auto;
                "
            >
                ${html}
            </div>
        `,
        width: 700,

        didOpen: () => {

            const campo =
                document.getElementById("buscaHistorico");

            campo.addEventListener("input", () => {

                const termo =
                    campo.value.toLowerCase();

                document
                    .querySelectorAll(".item-historico")
                    .forEach(item => {

                        item.style.display =
                            item.textContent
                                .toLowerCase()
                                .includes(termo)
                            ? "block"
                            : "none";
                    });
            });
        }
    });
}


function mostrarContinuarAssistindo() {

    if (!usuarioAtual) return;

    const historicoUsuario = historico.filter(
        item => item.usuario === usuarioAtual.usuario
    );

    if (historicoUsuario.length === 0) return;

    const ultimo =
        historicoUsuario[
            historicoUsuario.length - 1
        ];

    const area =
        document.getElementById(
            "continuarAssistindo"
        );

    if (!area) return;

    area.innerHTML = `
        <div class="alert alert-info">

            ⏳ Continue Assistindo:

            <strong>${ultimo.titulo}</strong>

            <br>

            ${ultimo.data}

        </div>
    `;
}


function mostrarFavoritosModal() {

    if (!usuarioAtual) {
        Swal.fire(
            "Aviso",
            "Faça login para visualizar seus favoritos.",
            "warning"
        );
        return;
    }

    const listaFavoritos = series.filter(
        serie => favoritos.includes(serie.titulo)
    );

    if (listaFavoritos.length === 0) {
        Swal.fire(
            "Favoritos",
            "Você ainda não possui favoritos.",
            "info"
        );
        return;
    }

    const html = listaFavoritos.map(serie => `
        <div class="item-favorito"
             style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">

            <strong>${serie.titulo}</strong>

            <br>

            <button
                class="btn btn-danger btn-sm mt-1"
                onclick="toggleFavorito('${serie.titulo}')">

                ❌ Remover

            </button>
        </div>
    `).join("");

    Swal.fire({
        title: `⭐ Favoritos (${listaFavoritos.length})`,
        html: `
            <input
                id="buscaFavorito"
                class="form-control mb-3"
                placeholder="🔍 Buscar favorito">

            <div id="listaFavoritos"
                 style="max-height:400px;overflow-y:auto;">

                ${html}

            </div>
        `,
        width: 700,

        didOpen: () => {

            document
                .getElementById("buscaFavorito")
                .addEventListener("input", function () {

                    const termo =
                        this.value.toLowerCase();

                    document
                        .querySelectorAll(".item-favorito")
                        .forEach(item => {

                            item.style.display =
                                item.textContent
                                    .toLowerCase()
                                    .includes(termo)
                                ? "block"
                                : "none";
                        });
                });
        }
    });
}


function mostrarEstatisticas() {

    if (!usuarioAtual) {

        Swal.fire(
            "Aviso",
            "Faça login para visualizar suas estatísticas.",
            "warning"
        );

        return;
    }

    const historicoUsuario = historico.filter(
        item => item.usuario === usuarioAtual.usuario
    );

    const comentariosUsuario =
        Object.values(comentarios)
        .flat()
        .filter(c => c.usuario === usuarioAtual.usuario);

    let totalAvaliacoesUsuario = 0;

    Object.values(avaliacoes).forEach(votos => {

        if (votos[usuarioAtual.usuario]) {
            totalAvaliacoesUsuario++;
        }

    });

    const favoritosUsuario = favoritos.length;

    const filmes = historicoUsuario.filter(item => {

        const serie =
            series.find(s => s.titulo === item.titulo);

        return serie?.tipo === "Filme";

    }).length;

    const seriesAssistidas = historicoUsuario.filter(item => {

        const serie =
            series.find(s => s.titulo === item.titulo);

        return serie?.tipo === "Série";

    }).length;

    const animes = historicoUsuario.filter(item => {

        const serie =
            series.find(s => s.titulo === item.titulo);

        return serie?.tipo === "Anime";

    }).length;

    const documentarios = historicoUsuario.filter(item => {

        const serie =
            series.find(s => s.titulo === item.titulo);

        return serie?.tipo === "Documentário";

    }).length;

    Swal.fire({
        title: "📊 Estatísticas",
        html: `
            <div style="text-align:left">

                🎬 Filmes: ${filmes}<br><br>

                📺 Séries: ${seriesAssistidas}<br><br>

                🎌 Animes: ${animes}<br><br>

                🎥 Documentários: ${documentarios}<br><br>

                ⭐ Avaliações: ${totalAvaliacoesUsuario}<br><br>

                💬 Comentários: ${comentariosUsuario.length}<br><br>

                ❤️ Favoritos: ${favoritosUsuario}

            </div>
        `
    });
}


function escolherPorMim() {

    const texto = campobusca
        ? campobusca.value.toLowerCase()
        : "";

    const filtradas = series.filter(serie =>

        (tipoSelecionado === "Todos" ||
            serie.tipo === tipoSelecionado)

        &&

        (categoriaSelecionada === "Todos" ||
            serie.categoria.includes(categoriaSelecionada))

        &&

        (
            serie.titulo.toLowerCase().includes(texto)
            ||
            serie.descricao.toLowerCase().includes(texto)
        )
    );

    if (filtradas.length === 0) {

        Swal.fire(
            "Ops",
            "Nenhum conteúdo encontrado.",
            "warning"
        );

        return;
    }

    const sorteada =
        filtradas[
            Math.floor(
                Math.random() * filtradas.length
            )
        ];

    Swal.fire({
        title: "🎲 Escolha por Mim",
        html: `
            <img
                src="${sorteada.imagem}"
                style="width:200px;border-radius:10px">

            <h3>${sorteada.titulo}</h3>

            <p>${sorteada.descricao}</p>
        `
    });
}

function comentar(titulo) {

    if (!usuarioAtual) {
        Swal.fire(
            "Aviso",
            "Faça login para comentar.",
            "warning"
        );
        return;
    }

    const texto = prompt("Digite seu comentário:");

    if (!texto) return;

    if (!comentarios[titulo]) {
        comentarios[titulo] = [];
    }

    comentarios[titulo].push({
        usuario: usuarioAtual.usuario,
        texto: texto
    });

    localStorage.setItem(
        "comentarios",
        JSON.stringify(comentarios)
    );

    aplicarFiltros();
}

// ================= NOTAS =================

function calcularNota(serie) {
    const votos = avaliacoes[serie.titulo];

    if (!votos) return "Sem avaliações";

    const notas = Object.values(votos);

    if (notas.length === 0) return "Sem avaliações";

    const soma = notas.reduce((a, b) => a + b, 0);

    return (soma / notas.length).toFixed(1);
}

function mostrarRanking() {

    const ranking = [...series]
        .filter(
            serie =>
                calcularNota(serie) !== "Sem avaliações"
        )
        .sort(
            (a, b) =>
                parseFloat(calcularNota(b))
                -
                parseFloat(calcularNota(a))
        )
        .slice(0, 10);

    const html = ranking
        .map((serie, index) => `

            <div style="text-align:left">

                ${index + 1}.
                ${serie.titulo}

                ⭐ ${calcularNota(serie)}

            </div>

        `)
        .join("");

    Swal.fire({
        title: "🏆 Top 10",
        html
    });
}

function totalAvaliacoes(serie) {
    const votos = avaliacoes[serie.titulo];
    if (!votos) return 0;
    return Object.keys(votos).length;
}


// ================= RENDER =================


function minhaNota(titulo) {
    if (!usuarioAtual) {
        return "";
    }

    const votos = avaliacoes[titulo];

    if (!votos || !votos[usuarioAtual.usuario]) {
        return "";
    }

    return `
        <div class="minha-nota">
            Minha nota: ⭐ ${votos[usuarioAtual.usuario]}
        </div>
    `;
}

function mostrarSeries(lista) {

    if (!ListaSeries) return;

    ListaSeries.innerHTML = "";
    contadorResultados.innerHTML = `${lista.length} resultado(s) encontrado(s)`;

    if (lista.length === 0) {
        ListaSeries.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Nenhum título encontrado.
                </div>
            </div>
        `;
        return;
    }

    let html = "";

    lista.forEach(serie => {

        const tituloSeguro = serie.titulo.trim();

        html += `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card card-filme h-100">

                <img src="${serie.imagem}" class="card-img-top">

                <div class="card-body">

                    <div class="mb-2">
                        <span class="badge bg-dark">${serie.tipo}</span>

                        ${serie.categoria.map(cat => `
                            <span class="categoria">${cat}</span>
                        `).join(" ")}
                    </div>

                    <h3>${serie.titulo}</h3>

                    <span class="classificacao ${serie.classificacao === 'Livre' ? 'idade-livre' : `idade-${serie.classificacao}`}">
                    ${serie.classificacao}
                    </span>

                    <h5>${serie.temporadas}</h5>

                    <div class="nota">
                        ⭐ ${calcularNota(serie)}
                        (${totalAvaliacoes(serie)} avaliações)
                        ${minhaNota(serie.titulo)}
                    </div>

                    <p>${serie.descricao}</p>

                    ${
                        serie.link !== "Não disponivel"
                        ? `<a href="${serie.link}" target="_blank" class="btn btn-success">Assistir Agora</a>`
                        : `<button class="btn btn-secondary" disabled>Indisponível</button>`
                    }

                    <button class="btn btn-dark" onclick="verDetalhes('${tituloSeguro}')">
                        Ver detalhes
                    </button>

                    <button class="btn btn-warning" onclick="toggleFavorito('${tituloSeguro}')">
                        ${favoritos.includes(tituloSeguro) ? "❌ Remover Favorito" : "⭐ Favorito"}
                    </button>

                    <button class="btn btn-secondary mt-1"
                   onclick="adicionarAoHistorico('${tituloSeguro}')">
                        👁️ Assistido
                    </button>

                    <button
                    class="btn btn-info mt-1"
                    onclick="comentar('${tituloSeguro}')">
                        💬 Comentar
                    </button>

                    <div class="avaliacao mt-2">
                        <button onclick="avaliarSerie('${tituloSeguro}',1)">⭐</button>
                        <button onclick="avaliarSerie('${tituloSeguro}',2)">⭐⭐</button>
                        <button onclick="avaliarSerie('${tituloSeguro}',3)">⭐⭐⭐</button>
                        <button onclick="avaliarSerie('${tituloSeguro}',4)">⭐⭐⭐⭐</button>
                        <button onclick="avaliarSerie('${tituloSeguro}',5)">⭐⭐⭐⭐⭐</button>
                    </div>

                </div>
            </div>
        </div>
        `;
    });

    ListaSeries.innerHTML = html;
}


// ================= FILTROS =================

function aplicarFiltros() {

    const texto = campobusca
        ? campobusca.value.toLowerCase()
        : "";

    let filtradas = series.filter(serie =>

        (tipoSelecionado === "Todos" ||
            serie.tipo === tipoSelecionado)

        &&

        (categoriaSelecionada === "Todos" ||
            serie.categoria.includes(categoriaSelecionada))

        &&

        (
            serie.titulo.toLowerCase().includes(texto)
            ||
            serie.descricao.toLowerCase().includes(texto)
        )
    );

    if (ordenacao?.value === "az") {
        filtradas.sort((a, b) =>
            a.titulo.localeCompare(b.titulo)
        );
    }

    if (ordenacao?.value === "za") {
        filtradas.sort((a, b) =>
            b.titulo.localeCompare(a.titulo)
        );
    }

    mostrarSeries(filtradas);
}

// ================= FAVORITOS =================

function salvarFavoritos() {
    if (!usuarioAtual) return;

    localStorage.setItem(
        `favoritos_${usuarioAtual.usuario}`,
        JSON.stringify(favoritos)
    );
}

function toggleAutenticacao() {
    const area = document.getElementById("areaAutenticacao");
    const botao = document.getElementById("btnOcultarAuth");

    if (!area || !botao) return;

    if (area.style.display === "none") {
        area.style.display = "block";
        botao.textContent = "Ocultar Login/Cadastro";
    } else {
        area.style.display = "none";
        botao.textContent = "Mostrar Login/Cadastro";
    }
}


// ================= AVALIAÇÃO =================

function avaliarSerie(titulo, nota) {

    if (!usuarioAtual) {
        Swal.fire({
            icon: "warning",
            title: "Faça login para avaliar"
        });
        return;
    }

    if (!avaliacoes[titulo]) {
        avaliacoes[titulo] = {};
    }

    avaliacoes[titulo][usuarioAtual.usuario] = nota;

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    Swal.fire({
        icon: "success",
        title: "Avaliação registrada!",
        text: `Você deu ${nota} estrela(s).`,
        timer: 1500,
        showConfirmButton: false
    });

    aplicarFiltros();
}

// ================= DETALHES =================

function verDetalhes(titulo) {

    const serie = series.find(
        s => s.titulo.trim() === titulo.trim()
    );

    if (!serie) return;

    const comentariosHtml =
        (comentarios[serie.titulo] || [])
        .map(c => `
            <div style="
                background:#222;
                padding:8px;
                margin:5px 0;
                border-radius:8px;
                text-align:left;
            ">
                <strong>${c.usuario}</strong><br>
                ${c.texto}
            </div>
        `)
        .join("");

    Swal.fire({

        width: 900,

        background: "#1e1e1e",

        color: "#fff",

        title: serie.titulo,

        html: `

            <img
                src="${serie.imagem}"
                style="
                    width:250px;
                    border-radius:12px;
                    margin-bottom:15px;
                "
            >

            <div style="margin-bottom:15px;">

                <span class="badge bg-success">
                    ${serie.tipo}
                </span>

                <span class="badge bg-warning text-dark">
                    ${serie.classificacao}
                </span>

            </div>

            <div style="margin-bottom:10px;">

                ${serie.categoria.map(cat => `
                    <span class="badge bg-secondary">
                        ${cat}
                    </span>
                `).join(" ")}

            </div>

            <p style="text-align:left;">
                ${serie.descricao}
            </p>

            <hr>

            <h4>
                ⭐ Nota Média:
                ${calcularNota(serie)}
            </h4>

            <h5>
                🗳️ Avaliações:
                ${totalAvaliacoes(serie)}
            </h5>

            <hr>

            <h4>💬 Comentários</h4>

            <div
                style="
                    max-height:200px;
                    overflow-y:auto;
                    text-align:left;
                "
            >

                ${
                    comentariosHtml ||
                    "<p>Nenhum comentário.</p>"
                }

            </div>

        `,

        showCloseButton: true

    });

}


// ================= BUSCA =================

let timeout;

if (campobusca) {
    campobusca.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(aplicarFiltros, 300);
    });
}


// ================= INIT =================

mostrarSeries(series);
mostrarContinuarAssistindo();
mostrarRecomendacoesHome();
mostrarContinuarAssistindo();

if (ordenacao) {
    ordenacao.addEventListener("change", aplicarFiltros);
}

//*cadastrar
function cadastrar() {

    const usuario = document.getElementById("cadUsuario").value.trim();
    const senha = document.getElementById("cadSenha").value.trim();

    if (!usuario || !senha) {
        Swal.fire("Erro", "Preencha usuário e senha.", "error");
        return;
    }

    const existe = usuarios.some(u => u.usuario === usuario);

    if (existe) {
        Swal.fire("Erro", "Usuário já existe.", "error");
        return;
    }

    usuarios.push({
        usuario,
        senha,
        nivel: "usuario"
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire("Sucesso", "Cadastro realizado com sucesso!", "success");
}

//*login
function login() {

    const usuario = document.getElementById("loginUsuario").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    const encontrado = usuarios.find(
        u => u.usuario === usuario && u.senha === senha
    );

    if (!encontrado) {
        Swal.fire("Erro", "Usuário ou senha inválidos.", "error");
        return;
    }

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(encontrado)
    );

    Swal.fire("Sucesso", "Login realizado com sucesso!", "success")
        .then(() => location.reload());
}

function filtrarCategoria(categoria) {

    categoriaSelecionada = categoria;

    document
        .querySelectorAll(".categorias-container button")
        .forEach(btn => {

            btn.classList.remove("active");

            const textoBotao = btn.textContent.trim();

            if (
                textoBotao === categoria ||
                (categoria === "Super-Herói" && textoBotao === "Super-Heróis")
            ) {
                btn.classList.add("active");
            }
        });

    aplicarFiltros();
}

function filtrarTipo(tipo) {

    tipoSelecionado = tipo;

    document.querySelectorAll(".filtros button").forEach(btn => {

        btn.classList.remove("active");

        if (
            btn.textContent.trim() === tipo ||
            (tipo === "Série" && btn.textContent.trim() === "Séries") ||
            (tipo === "Filme" && btn.textContent.trim() === "Filmes") ||
            (tipo === "Desenho" && btn.textContent.trim() === "Desenhos") ||
            (tipo === "Documentário" && btn.textContent.trim() === "Documentários")
        ) {
            btn.classList.add("active");
        }
    });

    aplicarFiltros();
}

campobusca?.addEventListener("input", aplicarFiltros);

ordenacao?.addEventListener("change", aplicarFiltros);

function toggleFavorito(titulo) {

    if (!usuarioAtual) {
        Swal.fire({
            icon: "warning",
            title: "Faça login para favoritar"
        });
        return;
    }

    if (favoritos.includes(titulo)) {

        favoritos = favoritos.filter(
            favorito => favorito !== titulo
        );

        Swal.fire({
            icon: "success",
            title: "Removido dos favoritos",
            timer: 1200,
            showConfirmButton: false
        });

    } else {

        favoritos.push(titulo);

        Swal.fire({
            icon: "success",
            title: "Adicionado aos favoritos",
            timer: 1200,
            showConfirmButton: false
        });
    }

    salvarFavoritos();

    aplicarFiltros();
}


function mostrarRecomendacoes() {

    if (!usuarioAtual) {

        Swal.fire(
            "Aviso",
            "Faça login para receber recomendações.",
            "warning"
        );

        return;
    }

    let categoriasPreferidas = [];

    // FAVORITOS

    favoritos.forEach(titulo => {

        const serie = series.find(
            s => s.titulo === titulo
        );

        if (serie) {

            categoriasPreferidas.push(
                ...serie.categoria
            );

        }

    });

    // HISTÓRICO

    historico
        .filter(
            item =>
                item.usuario === usuarioAtual.usuario
        )
        .forEach(item => {

            const serie = series.find(
                s => s.titulo === item.titulo
            );

            if (serie) {

                categoriasPreferidas.push(
                    ...serie.categoria
                );

            }

        });

    // AVALIAÇÕES 4 E 5

    series.forEach(serie => {

        const votos = avaliacoes[serie.titulo];

        if (
            votos &&
            votos[usuarioAtual.usuario] >= 4
        ) {

            categoriasPreferidas.push(
                ...serie.categoria
            );

        }

    });

    if (categoriasPreferidas.length === 0) {

        Swal.fire(
            "Recomendações",
            "Use favoritos, histórico ou avaliações para gerar recomendações.",
            "info"
        );

        return;
    }

    const contagem = {};

    categoriasPreferidas.forEach(cat => {

        contagem[cat] =
            (contagem[cat] || 0) + 1;

    });

    const assistidos =
        historico
            .filter(
                item =>
                    item.usuario === usuarioAtual.usuario
            )
            .map(item => item.titulo);

    const recomendadas = series.filter(serie =>

        !favoritos.includes(serie.titulo)

        &&

        !assistidos.includes(serie.titulo)

        &&

        serie.categoria.some(
            cat => contagem[cat]
        )

    );

    recomendadas.sort((a, b) => {

        let scoreA = 0;
        let scoreB = 0;

        a.categoria.forEach(cat => {
            scoreA += contagem[cat] || 0;
        });

        b.categoria.forEach(cat => {
            scoreB += contagem[cat] || 0;
        });

        return scoreB - scoreA;

    });

    const top = recomendadas.slice(0, 10);

    if (top.length === 0) {

        Swal.fire(
            "Recomendações",
            "Nenhuma recomendação encontrada.",
            "info"
        );

        return;
    }

    const html = top.map((serie, index) => `

        <div style="
            text-align:left;
            padding:10px;
            border-bottom:1px solid #444;
        ">

            <strong>
                ${index + 1}. ${serie.titulo}
            </strong>

            <br>

            <small>
                ${serie.categoria.join(", ")}
            </small>

        </div>

    `).join("");

    Swal.fire({

        title: "🤖 Recomendações Inteligentes",

        html: `

            <p>
                Baseado em favoritos,
                histórico e avaliações.
            </p>

            ${html}

        `,

        width: 800

    });

}

function mostrarContinuarAssistindo() {

    if (!usuarioAtual) return;

    const secao = document.getElementById(
        "secaoContinuarAssistindo"
    );

    const conteudo = document.getElementById(
        "conteudoContinuar"
    );

    if (!secao || !conteudo) return;

    const historicoUsuario = historico
        .filter(item =>
            item.usuario === usuarioAtual.usuario
        )
        .slice()
        .reverse()
        .slice(0, 10);

    if (historicoUsuario.length === 0) {

        secao.style.display = "none";
        return;
    }

    secao.style.display = "block";

    conteudo.innerHTML = historicoUsuario.map(item => {

        const serie = series.find(
            s => s.titulo === item.titulo
        );

        if (!serie) return "";

        return `
            <div class="card-continuar-mini">

                <img src="${serie.imagem}">

                <h5>${serie.titulo}</h5>

                <small>
                    ${item.data}
                </small>

                <button
                    class="btn btn-success btn-sm mt-2"
                    onclick="verDetalhes('${serie.titulo}')">

                    ▶ Ver

                </button>

            </div>
        `;

    }).join("");
}

function mostrarFavoritos() {

    if (!usuarioAtual) {
        Swal.fire({
            icon: "warning",
            title: "Faça login primeiro"
        });
        return;
    }

    const listaFavoritos = series.filter(
        serie => favoritos.includes(serie.titulo)
    );

    mostrarSeries(listaFavoritos);
}

document.querySelector(".filtros button")?.classList.add("active");
document.querySelector(".categorias-container button")?.classList.add("active");

function mostrarConquistas() {

    if (!usuarioAtual) {

        Swal.fire(
            "Aviso",
            "Faça login para visualizar suas conquistas.",
            "warning"
        );

        return;
    }

    const historicoUsuario = historico.filter(
        item => item.usuario === usuarioAtual.usuario
    );

    const totalAssistidos = historicoUsuario.length;

    let conquistaAssistidos = "Nenhuma";

    if (totalAssistidos >= 100) {
        conquistaAssistidos = "🥇 Mestre do ART7";
    }
    else if (totalAssistidos >= 50) {
        conquistaAssistidos = "🥈 Maratonista";
    }
    else if (totalAssistidos >= 10) {
        conquistaAssistidos = "🥉 Iniciante";
    }

    Swal.fire({
        title: "🏅 Conquistas",
        html: `
            <h4>${conquistaAssistidos}</h4>

            <p>
                🎬 Conteúdos assistidos:
                <strong>${totalAssistidos}</strong>
            </p>
        `,
        width: 600
    });

}

function mostrarRecomendacoesHome() {

    if (!usuarioAtual) return;

    const secao = document.getElementById("secaoRecomendacoes");
    const lista = document.getElementById("ListaRecomendacoes");

    if (!secao || !lista) return;

    const favoritosUsuario = series.filter(
        serie => favoritos.includes(serie.titulo)
    );

    if (favoritosUsuario.length === 0) {

        secao.style.display = "none";
        return;
    }

    const categoriasFavoritas = [];

    favoritosUsuario.forEach(serie => {
        categoriasFavoritas.push(...serie.categoria);
    });

    const recomendados = series.filter(serie => {

        if (favoritos.includes(serie.titulo)) {
            return false;
        }

        return serie.categoria.some(cat =>
            categoriasFavoritas.includes(cat)
        );

    }).slice(0, 10);

    if (recomendados.length === 0) {

        secao.style.display = "none";
        return;
    }

    secao.style.display = "block";

    lista.innerHTML = recomendados.map(serie => `

        <div class="card-recomendacao">

            <img src="${serie.imagem}" alt="${serie.titulo}">

            <div class="info">

                <h5>${serie.titulo}</h5>

                <div class="mb-2">

                    <small>
                        ⭐ ${calcularNota(serie)}
                    </small>

                </div>

                <button
                    class="btn btn-primary btn-sm"
                    onclick="verDetalhes('${serie.titulo}')">

                    Ver Detalhes

                </button>

            </div>

        </div>

    `).join("");
}

function mostrarPerfil() {

    if (!usuarioAtual) {

        Swal.fire(
            "Aviso",
            "Faça login primeiro.",
            "warning"
        );

        return;
    }

    const historicoUsuario = historico.filter(
        item => item.usuario === usuarioAtual.usuario
    );

    const comentariosUsuario = Object.values(comentarios)
        .flat()
        .filter(c =>
            c.usuario === usuarioAtual.usuario
        );

    let totalAvaliacoesUsuario = 0;

    Object.values(avaliacoes).forEach(votos => {

        if (votos[usuarioAtual.usuario]) {
            totalAvaliacoesUsuario++;
        }

    });

    const avatarSalvo =
        localStorage.getItem(
            `avatar_${usuarioAtual.usuario}`
        ) || "👑";

    const nivelInfo = calcularNivelUsuario();

    const tituloUsuario = obterTituloUsuario(
        nivelInfo.nivel
    );

    Swal.fire({

        title: "👑 Meu Perfil",
        width: 700,

        html: `

            <div style="text-align:center;">

                <div style="font-size:70px; margin-bottom:10px;">
                    ${avatarSalvo}
                </div>

                <h3>${usuarioAtual.usuario}</h3>

                <h4 style="color:gold;">
                    ${tituloUsuario}
                </h4>

                <hr>

                <!-- ESTATÍSTICAS -->
                <p>❤️ Favoritos: ${favoritos.length}</p>
                <p>👁️ Assistidos: ${historicoUsuario.length}</p>
                <p>⭐ Avaliações: ${totalAvaliacoesUsuario}</p>
                <p>💬 Comentários: ${comentariosUsuario.length}</p>

                <hr>

                <!-- NÍVEL -->
                <h4>🏅 Nível ${nivelInfo.nivel}</h4>

                <div style="
                    background:#333;
                    border-radius:20px;
                    height:20px;
                    overflow:hidden;
                    margin-bottom:10px;
                ">
                    <div style="
                        width:${nivelInfo.progresso}%;
                        height:100%;
                        background:gold;
                    "></div>
                </div>

                <p>⭐ XP Total: ${nivelInfo.xp}</p>

                <p>
                    Próximo nível:
                    ${100 - nivelInfo.progresso} XP
                </p>

                <hr>

                <button
                    class="btn btn-primary"
                    onclick="trocarAvatar()">

                    Trocar Avatar

                </button>

            </div>

        `
    });

}

function trocarAvatar() {

    if (!usuarioAtual) return;

    const avatarAtual =
        localStorage.getItem(
            `avatar_${usuarioAtual.usuario}`
        ) || "👑";

    const opcoes = avatares
        .map(a => `
            <button
                class="btn btn-light m-1"
                onclick="salvarAvatar('${a}')">

                ${a}

            </button>
        `)
        .join("");

    Swal.fire({

        title: "Escolha seu avatar",

        html: `

            <div style="
                display:flex;
                flex-wrap:wrap;
                justify-content:center;
            ">

                ${opcoes}

            </div>

        `

    });

}

function salvarAvatar(avatar) {

    localStorage.setItem(
        `avatar_${usuarioAtual.usuario}`,
        avatar
    );

    Swal.close();

    mostrarPerfil();
}

function calcularNivelUsuario() {

    if (!usuarioAtual) return null;

    const historicoUsuario = historico.filter(
        item => item.usuario === usuarioAtual.usuario
    );

    const comentariosUsuario = Object.values(comentarios)
        .flat()
        .filter(c =>
            c.usuario === usuarioAtual.usuario
        );

    let totalAvaliacoesUsuario = 0;

    Object.values(avaliacoes).forEach(votos => {

        if (votos[usuarioAtual.usuario]) {
            totalAvaliacoesUsuario++;
        }

    });

    const xp =

        (historicoUsuario.length * 10)

        +

        (favoritos.length * 5)

        +

        (comentariosUsuario.length * 15)

        +

        (totalAvaliacoesUsuario * 8);

    const nivel = Math.floor(xp / 100) + 1;

    const xpAtual = xp % 100;

    return {
        xp,
        nivel,
        progresso: xpAtual
    };
}

function obterTituloUsuario(nivel) {

    if (nivel >= 50)
        return "👑 Lenda ART7";

    if (nivel >= 30)
        return "🏆 Mestre ART7";

    if (nivel >= 20)
        return "🥇 Maratonista";

    if (nivel >= 10)
        return "🥈 Crítico";

    if (nivel >= 5)
        return "🥉 Explorador";

    return "🎬 Iniciante";
}