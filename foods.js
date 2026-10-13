/*
 * Base de alimentos do app "O que a Geni pode comer?".
 *
 * Cada alimento tem duas classificações, na ordem da string `r` (já para colostomia):
 *   1º caractere: Fase 1 (dieta pobre em resíduos, ~6 a 8 semanas após a cirurgia)
 *   2º caractere: Fase 2 (reintrodução gradual de fibras, com liberação da equipe)
 * Valores: I = Indicado, C = Com cautela, E = Evitar.
 *
 * `plano: true`  -> o alimento aparece no plano alimentar de origem.
 * `plano: false` -> não aparece; é uma sugestão classificada pelos mesmos critérios do plano
 *                   (fibra insolúvel, casca e sementes, gordura, gases, risco de entupir).
 *                   Não foi revisada por profissional de saúde.
 *
 * Tags: firma, solta, gases, odor, antiodor, entope, cor, gordura, fibra,
 *       lactose, lactose_media, lactose_baixa, acucar, doce.
 */
(function () {
  var G = {
    cereais: "Cereais e massas",
    paes: "Pães, biscoitos e bolos",
    raizes: "Raízes e tubérculos",
    legumes: "Legumes e verduras",
    frutas: "Frutas",
    carnes: "Carnes, aves e embutidos",
    peixes: "Peixes e frutos do mar",
    ovos: "Ovos",
    laticinios: "Leite e derivados",
    leguminosas: "Leguminosas",
    oleaginosas: "Castanhas e sementes",
    gorduras: "Gorduras e óleos",
    doces: "Doces e sobremesas",
    bebidas: "Bebidas",
    temperos: "Temperos e molhos",
    preparacoes: "Preparações e industrializados"
  };

  var lista = [];
  function add(plano, nome, grupo, r, tags, nota, alias) {
    lista.push({
      nome: nome,
      grupo: grupo,
      r: r,
      tags: tags ? tags.split(" ") : [],
      nota: nota,
      alias: alias || "",
      plano: plano
    });
  }
  function pl(nome, grupo, r, tags, nota, alias) { add(true, nome, grupo, r, tags, nota, alias); }
  function es(nome, grupo, r, tags, nota, alias) { add(false, nome, grupo, r, tags, nota, alias); }

  var c = G.cereais, p = G.paes, ra = G.raizes, l = G.legumes, f = G.frutas,
      ca = G.carnes, pe = G.peixes, ov = G.ovos, la = G.laticinios, le = G.leguminosas,
      ol = G.oleaginosas, go = G.gorduras, d = G.doces, b = G.bebidas, t = G.temperos,
      pr = G.preparacoes;

  /* ---------- Cereais e massas ---------- */
  pl("Arroz branco", c, "II", "firma", "Base da dieta. Bem cozido e macio, ajuda a firmar a saída.", "arroz cozido");
  es("Arroz integral", c, "EC", "fibra", "Tem mais fibra insolúvel. Evite na Fase 1; na Fase 2, comece com porções pequenas, bem cozido e bem mastigado.");
  pl("Macarrão (massa branca)", c, "II", "firma", "Bem cozido é bem tolerado. Prefira molhos leves, sem excesso de gordura.", "massa espaguete parafuso cabelo de anjo talharim penne");
  es("Macarrão integral", c, "EC", "fibra", "Mais fibra insolúvel. Só depois da liberação para a Fase 2.");
  pl("Tapioca", c, "II", "firma", "A goma hidratada deixa a saída mais firme. Combine com queijo minas frescal ou ovo.", "goma beiju");
  pl("Angu / polenta cremosa", c, "II", "", "Cremosos e sem grãos inteiros. Evite a polenta frita.", "polenta fubá");
  es("Polenta frita", c, "EC", "gordura", "Fritura: a gordura pode soltar a saída. Evite na Fase 1.");
  pl("Maisena (amido de milho)", c, "II", "firma", "Usada em mingaus e cremes, é de fácil digestão.", "amido de milho");
  pl("Aveia", c, "EC", "fibra", "Evite flocos grossos na Fase 1. Na Fase 2 (etapa 2), introduza aos poucos e bem cozida, em mingau.", "aveia em flocos farinha de aveia");
  pl("Granola", c, "EC", "fibra entope", "Mistura grãos, sementes e frutas secas, que podem entupir o estoma. Só depois da liberação para a Fase 2.", "muesli");
  pl("Farelo de trigo ou de aveia", c, "EC", "fibra entope", "Fibra insolúvel concentrada. Na colostomia as fibras ajudam, mas só aos poucos e com bastante água.", "farelos");
  pl("Pipoca", c, "EC", "entope gases", "Grande risco de entupir o estoma. Só no fim da Fase 2, se tudo antes foi bem tolerado; muita gente prefere evitar.", "pipoca doce pipoca de micro-ondas");
  pl("Canjica", c, "EC", "fibra entope", "Grão de milho inteiro, com casca. Evite na Fase 1; na Fase 2 só se tudo antes foi bem tolerado.", "milho branco munguzá");
  es("Cuscuz de milho (flocão)", c, "EC", "fibra", "Prefira bem hidratado e macio. Evite na Fase 1.", "cuscuz nordestino cuscuz paulista");
  es("Cuscuz marroquino", c, "II", "", "Feito de sêmola refinada, é leve e fácil de digerir.", "sêmola");
  es("Cereal matinal de milho ou arroz", c, "CI", "acucar", "Escolha versões simples, sem frutas secas, castanhas ou mel. Confira o açúcar.", "corn flakes sucrilhos cereal");
  es("Nhoque de batata", c, "II", "", "Massa macia de batata. Cuidado com molhos gordurosos.", "nhoque");
  es("Farinha de mandioca e farofa", c, "EC", "fibra gordura", "Farinha crua grossa e farofas com bacon ou linguiça pesam. Na Fase 2, pouco e bem umedecida.", "farofa farinha de mandioca");
  es("Farinha de trigo (em preparos)", c, "II", "", "Usada em bolos, molhos e mingaus simples, é bem tolerada.", "farinha de trigo");

  /* ---------- Pães, biscoitos e bolos ---------- */
  pl("Pão de forma branco", p, "II", "firma", "Melhor torrado, com ricota, queijo minas frescal ou ovo.", "pão branco pão de forma pão de sanduíche");
  es("Pão francês", p, "II", "firma", "Prefira o miolo macio; evite crostas muito duras e recheios com sementes.", "pãozinho pão de sal");
  pl("Torrada", p, "II", "firma", "Boa base para lanches com proteína.", "torradinha");
  pl("Biscoito água e sal", p, "II", "firma", "Leve e fácil de digerir. Bom com queijo branco.", "cream cracker biscoito salgado");
  pl("Biscoito maisena", p, "II", "firma", "Simples e macio. Evite os recheados.", "biscoito de maizena");
  es("Biscoito recheado", p, "CC", "doce gordura", "Muito açúcar e gordura, pode soltar a saída. Só de vez em quando.", "bolacha recheada");
  es("Biscoito integral", p, "EC", "fibra", "Tem fibra insolúvel e, às vezes, sementes. Evite na Fase 1.", "bolacha integral");
  es("Pão integral", p, "EC", "fibra", "Evite na Fase 1. Na Fase 2, introduza aos poucos.", "pão de grãos integral");
  pl("Pão misto", p, "EC", "fibra", "Na Fase 2 (etapa 1), pode ser testado em porção pequena.", "pão de centeio pão multigrãos leve");
  es("Pão com sementes ou grãos", p, "EC", "fibra entope", "Sementes e grãos inteiros podem entupir o estoma.", "pão de forma com sementes pão de linhaça");
  pl("Bolo simples (banana, baunilha, cenoura)", p, "II", "acucar", "Sem recheio, passas ou castanhas. Moderar o açúcar.", "bolo de banana bolo caseiro");
  es("Bolo recheado ou com cobertura", p, "EC", "doce gordura", "Muito açúcar e gordura; pode soltar a saída.", "bolo de chocolate bolo de aniversário");
  es("Pão de queijo", p, "CC", "gordura lactose_baixa", "Gorduroso, pode soltar a saída. Teste 1 unidade e observe.", "pão de queijo");

  /* ---------- Raízes e tubérculos ---------- */
  pl("Batata cozida", ra, "II", "firma", "Sem casca e bem macia. Deixa a saída mais firme.", "batata inglesa");
  pl("Purê de batata", ra, "II", "firma", "Cremoso, com pouca gordura. Ótimo acompanhamento para carnes.", "pure");
  es("Batata com casca", ra, "EC", "entope fibra", "A casca pode entupir o estoma. Descasque.", "batata assada com casca");
  es("Batata frita e batata palha", ra, "EC", "gordura", "Fritura: a gordura pode soltar a saída. Evite na Fase 1.", "fritas batata frita");
  es("Batata-doce cozida", ra, "II", "", "Sem casca e bem macia.", "batata doce");
  pl("Mandioquinha (batata-baroa)", ra, "II", "", "Muito macia depois de cozida; boa em purês e sopas.", "batata baroa mandioquinha");
  es("Mandioca (aipim, macaxeira)", ra, "CI", "fibra", "Cozinhe muito bem e retire o fio central. Teste uma porção pequena.", "aipim macaxeira");
  es("Inhame e cará", ra, "CI", "", "Bem cozido e amassado. Teste uma porção pequena.", "cará inhame");
  es("Beterraba cozida", ra, "CI", "cor", "Pode deixar a saída avermelhada. Não é sangramento, mas confira se ela não passa disso.", "beterraba");
  es("Beterraba crua", ra, "EC", "cor fibra", "Fibrosa e pode colorir a saída. Só na Fase 2 e em pouca quantidade.", "beterraba ralada");

  /* ---------- Legumes e verduras ---------- */
  pl("Cenoura cozida", l, "II", "", "Bem macia, sem casca.", "cenoura");
  es("Cenoura crua", l, "EC", "entope fibra", "Fibrosa, com risco de entupir o estoma. Só na Fase 2, em pouca quantidade e bem mastigada.", "cenoura ralada");
  pl("Abóbora cozida", l, "II", "", "Sem casca, em purê ou sopa.", "jerimum cabotiá moranga abóbora japonesa");
  pl("Abobrinha", l, "II", "", "Na Fase 1, sem casca e bem cozida. A casca fina cozida entra na Fase 2 (etapa 1).", "abobrinha italiana");
  pl("Chuchu cozido", l, "II", "", "Sem casca e sem semente, bem cozido.", "chuchu");
  pl("Tomate cru", l, "EC", "fibra", "Pele e sementes podem passar inteiras. Na Fase 2 (etapa 3), só sem pele e sem sementes.", "tomate salada");
  pl("Molho de tomate peneirado", l, "II", "", "Sem pele e sem sementes. Prefira pouco condimentado.", "molho de tomate caseiro");
  es("Extrato de tomate", l, "II", "", "Sem pele e sem sementes, é bem tolerado em pouca quantidade.", "massa de tomate");
  es("Molho de tomate com pedaços", l, "EC", "fibra", "Pele e sementes do tomate podem incomodar. Prefira o molho peneirado.", "molho de tomate industrializado");
  es("Berinjela cozida sem casca", l, "CC", "fibra", "Tire a casca e cozinhe bem. Teste uma porção pequena.", "berinjela");
  es("Pepino", l, "EC", "fibra", "Só na Fase 2, sem casca e sem sementes.", "pepino");
  pl("Alface", l, "EC", "fibra", "Folha crua entra na Fase 2 (etapa 3). Mastigue muito bem e comece com 1 ou 2 colheres.", "alface americana alface crespa alface lisa folhas");
  es("Rúcula e agrião", l, "EC", "fibra", "Folhas cruas e fibrosas. Só na Fase 2, em pouca quantidade.", "rucula agrião");
  es("Espinafre cozido", l, "EC", "fibra", "Cozido e picado, na Fase 2.", "espinafre");
  pl("Couve refogada", l, "EC", "fibra gases", "Folhas bem cozidas e picadas entram na Fase 2 (etapa 2). Pode causar gases.", "couve manteiga couve");
  es("Couve crua", l, "EE", "fibra gases entope", "Crua e fibrosa, tem risco de entupir. Evite.", "couve em suco");
  es("Acelga cozida", l, "EC", "fibra", "Cozida e picada, na Fase 2.", "acelga");
  pl("Repolho", l, "EC", "gases odor fibra", "Aumenta gases e odor. Evite na Fase 1.", "repolho cru repolho cozido");
  pl("Brócolis", l, "EC", "gases odor fibra entope", "Os talos entopem e causa gases e odor. Evite na Fase 1.", "brocolis");
  pl("Couve-flor", l, "EC", "gases odor fibra", "Pode causar muitos gases e odor.", "couve flor");
  pl("Milho verde", l, "EC", "entope fibra", "Casca do grão passa inteira e pode entupir o estoma.", "milho espiga milho em grão");
  pl("Ervilha", l, "EC", "entope gases", "A casca pode entupir e causa gases.", "ervilha fresca ervilha em lata");
  es("Vagem cozida", l, "CC", "fibra", "Bem cozida e picada. Teste uma porção pequena.", "vagem");
  pl("Cebola", l, "EC", "gases odor", "Crua, evite. Refogada em pouca quantidade pode ser testada na Fase 2.", "cebola crua cebola refogada");
  es("Alho", l, "CC", "gases odor", "Como tempero, em pouca quantidade e bem refogado.", "alho");
  pl("Aipo", l, "EC", "entope fibra", "Filamentos longos, com risco de entupir.", "salsão");
  pl("Cogumelos", l, "EC", "entope", "Podem entupir. Entram só no fim da Fase 2 (etapa 4); muita gente prefere evitar.", "champignon shitake shimeji");
  es("Palmito", l, "EC", "entope fibra", "Fibroso, com risco de entupir o estoma.", "palmito");
  es("Quiabo", l, "CC", "fibra", "Bem cozido e picado. Teste uma porção pequena.", "quiabo");
  es("Pimentão", l, "EC", "entope fibra", "A casca é difícil de digerir.", "pimentão");
  es("Couve-de-bruxelas", l, "EE", "gases odor entope", "Causa gases e odor. Evite.", "couve de bruxelas");
  es("Azeitona", l, "EC", "entope", "Pele e caroço. Evite.", "azeitona verde azeitona preta");

  /* ---------- Frutas ---------- */
  pl("Banana prata", f, "II", "firma", "Madura, é um dos alimentos que deixam a saída mais firme. Na Fase 1, amassada.", "banana banana-prata banana nanica");
  pl("Maçã cozida sem casca", f, "II", "firma", "Cozida e sem casca firma a saída. Boa para lanches.", "maçã purê de maçã compota de maçã");
  pl("Maçã crua", f, "EC", "fibra", "Crua, entra na Fase 2 (etapa 3), sem casca no início.", "maçã");
  pl("Pera cozida sem casca", f, "II", "", "Cozida e sem casca.", "pera");
  es("Pera crua", f, "EC", "fibra", "Crua e com casca é mais fibrosa. Só na Fase 2.", "pera");
  pl("Mamão papaia", f, "CI", "", "Sem sementes, pouco de cada vez, observando o efeito na saída.", "mamão papaya");
  es("Mamão formosa", f, "CI", "", "Sem sementes. Em excesso pode soltar a saída.", "mamão formosa");
  es("Melão", f, "CC", "", "Sem casca e sem sementes, em pouca quantidade.", "melão");
  es("Melancia", f, "CC", "gases", "Sem sementes. Pode causar gases e soltar a saída.", "melancia");
  es("Abacate", f, "CI", "gordura", "Maduro e amassado, em pouca quantidade (é gorduroso).", "abacate");
  pl("Laranja e mexerica (com bagaço)", f, "EC", "entope fibra", "O bagaço pode entupir o estoma.", "laranja tangerina bergamota poncã mexerica");
  es("Suco de laranja coado", f, "CC", "solta acucar", "Suco de fruta pode soltar a saída. Limite a quantidade e sempre sem bagaço.", "suco de laranja suco natural");
  es("Limão", f, "II", "", "Como tempero, em pequena quantidade, sem a polpa.", "limão suco de limão");
  pl("Abacaxi", f, "EC", "fibra entope", "Fibroso. Evite na Fase 1.", "abacaxi");
  pl("Uva com casca", f, "EC", "entope", "A casca e as sementes podem entupir.", "uva");
  es("Uva sem casca e sem semente", f, "CC", "acucar", "Sem casca nem semente e em pouca quantidade.", "uva sem casca");
  pl("Coco", f, "EC", "entope fibra gordura", "Fibroso e gorduroso. Só no fim da Fase 2 (etapa 4).", "coco ralado coco seco leite de coco");
  es("Água de coco", f, "CI", "acucar", "Hidrata e repõe potássio, mas tem açúcar. Beba em goles pequenos.", "água de coco");
  pl("Frutas secas", f, "EE", "entope fibra", "Uva-passa, damasco e semelhantes têm risco de entupir. Evite.", "uva-passa uva passa damasco seco ameixa seca tâmara banana passa");
  es("Morango", f, "EC", "fibra", "As sementinhas podem incomodar. Só na Fase 2.", "morango");
  es("Kiwi", f, "EC", "fibra", "Sementes pequenas. Só na Fase 2.", "kiwi");
  es("Goiaba", f, "EC", "entope fibra", "Muitas sementes duras. Evite.", "goiaba");
  es("Manga", f, "CC", "acucar fibra", "Fibrosa. Teste uma porção pequena e madura.", "manga");
  es("Caqui", f, "CC", "", "Maduro e sem casca, em pouca quantidade.", "caqui");
  es("Pêssego, nectarina e ameixa", f, "EC", "fibra", "Sem casca na Fase 2.", "pêssego nectarina ameixa damasco fresco");
  es("Jabuticaba", f, "EE", "entope", "Casca e sementes entopem. Evite.", "jabuticaba");
  es("Maracujá (fruta)", f, "EE", "entope", "As sementes podem entupir. O suco coado é a opção.", "maracujá");
  es("Figo", f, "EC", "entope fibra", "Muitas sementinhas. Evite.", "figo");
  es("Açaí", f, "CC", "acucar gordura", "Tem açúcar e gordura, e o creme pode soltar a saída. Teste uma porção pequena.", "açai polpa de açaí");

  /* ---------- Carnes, aves e embutidos ---------- */
  pl("Frango sem pele", ca, "II", "", "Grelhado, assado, cozido ou desfiado. Fonte de proteína em todas as refeições.", "peito de frango sobrecoxa coxa frango grelhado frango cozido frango desfiado");
  es("Frango com pele", ca, "EC", "gordura", "A pele é gordurosa e pode soltar a saída. Retire antes de preparar.", "frango com pele");
  es("Frango frito ou empanado", ca, "EC", "gordura", "Fritura. Evite na Fase 1.", "frango frito nuggets empanado");
  pl("Carne bovina magra e macia", ca, "II", "", "Patinho moído ou desfiado, bem cozida. Corte sem nervos nem gordura.", "patinho carne moída alcatra filé mignon coxão mole bife");
  pl("Carne com nervos ou gordurosa", ca, "EC", "entope gordura", "Nervos podem entupir o estoma; a gordura solta a saída.", "fraldinha costela cupim picanha acém carne de panela");
  es("Hambúrguer", ca, "EC", "gordura", "Gorduroso, pode soltar a saída. Evite na Fase 1.", "hamburguer");
  es("Lombo suíno magro", ca, "CC", "", "Magro, bem cozido e sem gordura aparente.", "carne de porco lombo bisteca");
  pl("Linguiça e salsicha", ca, "EC", "gordura odor", "Embutidos são gordurosos, salgados e pesados. Evite na Fase 1.", "linguiça salsicha linguiça calabresa");
  es("Bacon", ca, "EC", "gordura", "Gordura e sal em excesso.", "toucinho");
  es("Presunto", ca, "CC", "", "Prefira o magro, em pouca quantidade (tem muito sódio).", "presunto cozido apresuntado");
  es("Peito de peru", ca, "CI", "", "Magro e macio; bom para lanches. Confira o sal.", "peru blanquet");
  es("Mortadela e salame", ca, "EC", "gordura", "Gordurosos e com muito sal.", "mortadela salame");
  es("Fígado", ca, "CI", "", "Boa fonte de ferro e vitaminas; cozinhe bem. Teste uma porção pequena.", "fígado bovino fígado de frango");
  pl("Feijoada", ca, "EC", "gordura gases fibra", "Feijão em grãos e carnes gordurosas. Evite na Fase 1.", "feijoada");
  pl("Churrasco gorduroso", ca, "EC", "gordura", "Evite carnes gordurosas e com nervos na Fase 1.", "churrasco");

  /* ---------- Peixes ---------- */
  pl("Tilápia, pescada e merluza", pe, "II", "", "Assados ou grelhados, com limão e fio de azeite. Confira se não há espinhas.", "peixe tilápia pescada merluza peixe branco linguado");
  es("Salmão", pe, "CI", "gordura", "Boa gordura, mas pode soltar a saída em excesso. Assado ou grelhado.", "salmão");
  es("Atum em lata (ao natural)", pe, "CI", "", "Prefira ao natural, sem óleo.", "atum");
  es("Sardinha em lata", pe, "CC", "gordura", "Mais gordurosa; as espinhas amassadas são moles, mas observe a reação.", "sardinha");
  es("Bacalhau dessalgado", pe, "CI", "", "Dessalgue bem e retire as espinhas.", "bacalhau");
  es("Camarão", pe, "CC", "gases", "Bem cozido e sem casca. Teste uma porção pequena.", "camarão frutos do mar");
  es("Lula e polvo", pe, "EC", "entope", "Carne dura, com risco de entupir o estoma.", "lula polvo marisco");
  es("Peixe frito", pe, "EC", "gordura", "Fritura. Prefira assado ou grelhado.", "peixe empanado");

  /* ---------- Ovos ---------- */
  pl("Ovo cozido ou mexido", ov, "II", "gases odor", "Boa proteína. Em excesso pode aumentar gases e odor.", "ovo ovos omelete");
  pl("Omelete simples", ov, "II", "", "Com pouca gordura e sem recheios fibrosos.", "omelete");
  es("Ovo frito", ov, "EC", "gordura", "Prefira cozido, mexido ou em omelete.", "ovo frito");

  /* ---------- Leite e derivados ---------- */
  pl("Leite integral", la, "II", "lactose gordura", "Se houver gases ou diarreia, troque pela versão sem lactose.", "leite");
  pl("Leite sem lactose", la, "II", "", "Opção para quem tem gases ou diarreia com leite comum.", "leite zero lactose");
  es("Bebida vegetal (soja, amêndoa, aveia)", la, "CI", "gases", "Escolha as sem açúcar. A de soja pode dar gases.", "leite de soja leite de amêndoa leite de aveia");
  pl("Iogurte natural", la, "II", "antiodor lactose_baixa", "Ajuda a reduzir o odor. Prefira sem açúcar.", "iogurte iogurte grego");
  es("Iogurte com frutas ou adoçado", la, "CC", "acucar lactose_baixa", "Tem açúcar e, às vezes, pedaços de fruta ou sementes.", "iogurte de morango iogurte de frutas");
  pl("Queijo minas frescal", la, "II", "firma lactose_baixa", "Deixa a saída mais firme. Ótimo com tapioca ou torrada.", "queijo branco queijo fresco");
  pl("Ricota", la, "II", "firma lactose_baixa", "Leve e macia. Boa para lanches e recheios.", "ricota");
  pl("Requeijão cremoso", la, "II", "lactose_media gordura", "Em pouca quantidade. Há versões sem lactose.", "requeijão");
  es("Cream cheese", la, "II", "lactose_media gordura", "Em pouca quantidade.", "cream cheese");
  es("Queijos amarelos (muçarela, prato)", la, "II", "firma gordura lactose_baixa", "Deixam a saída mais firme; sem exagero, por causa da gordura.", "muçarela mussarela queijo prato queijo amarelo");
  es("Parmesão", la, "II", "lactose_baixa", "Só ralado, em pouca quantidade.", "queijo parmesão");
  es("Queijos muito gordurosos", la, "EC", "gordura", "Evite em excesso, pois a gordura pode soltar a saída.", "gorgonzola provolone queijo azul brie camembert queijo coalho");
  es("Creme de leite", la, "CC", "gordura lactose_media", "Gorduroso; use pouco.", "creme de leite nata");
  es("Manteiga e margarina", la, "CI", "gordura", "Em fino fio, para pães e purês.", "manteiga margarina");
  es("Leite condensado e doce de leite", la, "EC", "doce lactose", "Muito açúcar, pode soltar a saída.", "doce de leite leite condensado");
  es("Achocolatado", la, "CC", "acucar lactose_media", "Tem açúcar; prefira com leite sem lactose se tiver desconforto.", "toddy nescau chocolate quente");

  /* ---------- Leguminosas ---------- */
  pl("Caldo de feijão coado", le, "II", "", "Sem os grãos. Dá sabor e ferro sem o risco da casca.", "caldo de feijão feijão coado");
  pl("Feijão (grãos inteiros)", le, "EC", "gases entope fibra", "As cascas podem entupir e causam muitos gases. Evite na Fase 1.", "feijão carioca feijão preto feijão");
  pl("Feijão com grãos amassados", le, "EC", "gases fibra", "Na Fase 2 (etapa 2), amasse os grãos e introduza de um em um.", "feijão amassado");
  pl("Lentilha", le, "EC", "gases fibra", "Evite na Fase 1. Se testar na Fase 2, bem cozida e amassada.", "lentilha");
  pl("Grão-de-bico", le, "EC", "gases fibra entope", "A casca e os gases pesam. Evite na Fase 1.", "grão de bico homus");
  es("Soja em grão", le, "EE", "gases fibra", "Muitos gases e fibras. Evite.", "soja edamame");
  es("Tofu", le, "CI", "gases", "Macio e rico em proteína. Teste uma porção pequena.", "tofu queijo de soja");
  es("Hummus", le, "CC", "gases", "Se bem batido (sem casca), pode ser testado em pouca quantidade.", "homus pasta de grão de bico");

  /* ---------- Castanhas e sementes ---------- */
  es("Pasta de amendoim cremosa", ol, "CI", "firma gordura", "Cremosa e sem pedaços ajuda a firmar a saída. Use pouca.", "pasta de amendoim manteiga de amendoim");
  es("Amendoim", ol, "EC", "entope gordura", "Pedaços duros podem entupir o estoma.", "amendoim paçoca");
  pl("Castanhas (caju, do-pará, nozes, amêndoas)", ol, "EC", "entope gordura fibra", "Risco de entupir; só no fim da Fase 2 (etapa 4), e muita gente prefere evitar.", "castanha castanha de caju castanha do pará noz amêndoa pistache avelã macadâmia");
  pl("Linhaça e chia", ol, "EC", "fibra entope", "Sementes: evite na Fase 1. Na Fase 2, só hidratadas e bem mastigadas.", "linhaça chia");
  es("Gergelim e sementes (girassol, abóbora)", ol, "EC", "entope fibra", "Sementes pequenas e duras podem se acumular no estoma.", "gergelim semente de girassol semente de abóbora");

  /* ---------- Gorduras e óleos ---------- */
  pl("Azeite de oliva", go, "II", "", "Um fio sobre a comida. Evite excessos.", "azeite");
  es("Óleo de cozinha", go, "CI", "gordura", "Use pouco no preparo. Prefira assar ou grelhar.", "óleo de soja óleo de girassol");
  es("Maionese", go, "CC", "gordura", "Em pequena quantidade. O excesso é gorduroso.", "maionese");
  es("Banha e toucinho", go, "EC", "gordura", "Muito gordurosos.", "banha toucinho");

  /* ---------- Doces e sobremesas ---------- */
  pl("Gelatina", d, "II", "cor", "Incolor ou clara. A vermelha pode colorir a saída (não é sangramento).", "gelatina incolor gelatina vermelha gelatina colorida");
  pl("Marshmallow", d, "II", "doce", "Está no plano como opção leve, mas tem muito açúcar.", "marshmallow");
  es("Açúcar", d, "CC", "acucar", "O excesso pode soltar a saída.", "açúcar mascavo açúcar refinado");
  es("Mel", d, "CC", "acucar", "Em pouca quantidade.", "mel");
  es("Geleia sem pedaços", d, "CC", "acucar", "Sem sementes nem pedaços de fruta.", "geleia");
  es("Geleia com pedaços ou sementes", d, "EC", "entope acucar", "Sementes e pedaços de fruta podem entupir o estoma.", "geleia de morango geleia de frutas vermelhas");
  es("Chocolate", d, "CC", "doce gordura", "Cafeína, açúcar e gordura podem soltar a saída. Em pouca quantidade.", "chocolate ao leite chocolate amargo bombom");
  es("Brigadeiro e doces de leite", d, "EC", "doce lactose", "Muito açúcar e gordura.", "brigadeiro beijinho");
  es("Pudim e flan", d, "CC", "doce lactose_media", "Tem muito açúcar e lactose. Em pouca quantidade.", "pudim flan");
  es("Sorvete", d, "EC", "doce lactose gordura", "Gelado, doce e com lactose: pode soltar a saída e dar gases.", "sorvete picolé de leite");
  es("Doces e balas sem açúcar (sorbitol)", d, "EE", "solta", "O sorbitol solta a saída e causa gases.", "bala diet doce diet goma sem açúcar");
  es("Chiclete", d, "EE", "gases", "Engolir ar aumenta os gases.", "goma de mascar chiclete");
  es("Paçoca", d, "EC", "doce entope", "Amendoim triturado, com açúcar.", "paçoca");

  /* ---------- Bebidas ---------- */
  pl("Água", b, "II", "", "A meta é de 8 a 10 copos por dia, em goles pequenos.", "agua água mineral");
  pl("Chá de camomila e erva-cidreira", b, "II", "", "Fraco, ajuda na hidratação.", "chá camomila chá de erva cidreira chá");
  es("Chá preto ou mate (fraco)", b, "II", "", "Fraco, sem açúcar em excesso.", "chá preto chá mate");
  es("Chá verde forte", b, "CC", "solta", "A cafeína pode soltar a saída. Prefira fraco.", "chá verde");
  pl("Café", b, "CC", "solta", "Forte e com cafeína pode soltar a saída e desidratar.", "café com leite café preto cafezinho");
  es("Café descafeinado", b, "CI", "", "Menos cafeína, mas observe a reação.", "descafeinado");
  pl("Refrigerante", b, "EE", "gases solta acucar", "Causa gases e pode aumentar a saída. Evite também o canudo.", "refri coca-cola guaraná soda água com gás água gaseificada");
  pl("Suco de fruta", b, "CC", "solta acucar", "Pode aumentar a saída do estoma. Limite e dilua.", "suco natural suco industrializado néctar");
  pl("Cerveja", b, "EC", "gases solta odor", "Aumenta gases e a saída. Converse com a equipe antes de beber.", "chopp");
  es("Vinho e destilados", b, "EC", "solta", "O álcool pode aumentar a saída e desidratar. Converse com a equipe.", "vinho vodka whisky cachaça bebida alcoólica caipirinha");
  pl("Soro de reidratação oral", b, "II", "", "Vendido em farmácia. Útil quando a saída está aumentada, conforme a equipe orientar.", "soro sais de reidratação");
  pl("Caldo coado de frango ou legumes", b, "II", "", "Coado e salgado, ajuda na hidratação.", "caldo caldo de galinha caldo de legumes");
  es("Isotônico", b, "CI", "acucar", "Pode ajudar a repor sais, mas tem açúcar.", "gatorade bebida esportiva");
  es("Energético", b, "EE", "solta", "Cafeína e açúcar em excesso.", "red bull energético");

  /* ---------- Temperos e molhos ---------- */
  pl("Sal", t, "II", "", "Use sal normal, a menos que o médico restrinja.", "sal de cozinha");
  pl("Salsinha", t, "II", "antiodor", "Ajuda a reduzir o odor.", "salsa cheiro-verde cheiro verde");
  es("Cebolinha e coentro", t, "CI", "", "Picados e em pequena quantidade.", "cebolinha coentro manjericão ervas frescas");
  pl("Pimenta", t, "EC", "solta gases", "Pode soltar a saída. Teste na Fase 2 em quantidade mínima.", "molho de pimenta pimenta calabresa pimenta-do-reino pimenta malagueta");
  es("Ervas secas e especiarias leves", t, "II", "", "Orégano, louro, canela e tomilho são bem tolerados em pequena quantidade.", "orégano louro canela tomilho alecrim");
  es("Vinagre", t, "CI", "", "Em pouca quantidade.", "vinagre");
  es("Ketchup e mostarda", t, "CI", "acucar", "Em pouca quantidade. Têm açúcar e sal.", "catchup ketchup mostarda");
  es("Molho shoyu", t, "CI", "", "Tem muito sódio; use pouco.", "shoyu molho de soja");

  /* ---------- Preparações e industrializados ---------- */
  pl("Sopa de legumes batida e coada", pr, "II", "", "Sem cascas nem sementes. Pode ter frango desfiado e macarrão cabelo-de-anjo.", "sopa sopa de legumes");
  pl("Sopa de mandioquinha ou abóbora com frango", pr, "II", "", "Batida, macia e com proteína.", "sopa de mandioquinha sopa de abóbora");
  pl("Canja de galinha", pr, "II", "", "Arroz, frango desfiado sem pele e cenoura bem macia.", "canja");
  pl("Mingau de maisena", pr, "II", "acucar", "Bom para café da manhã ou ceia. Pode usar leite sem lactose.", "mingau creme de maisena");
  pl("Vitamina de banana com leite sem lactose", pr, "II", "firma", "Banana madura e leite sem lactose, sem açúcar extra.", "vitamina de banana");
  pl("Risoto simples de frango", pr, "II", "", "Arroz branco e caldo coado, sem queijos gordurosos nem vegetais fibrosos.", "risoto");
  pl("Escondidinho de mandioquinha com carne moída", pr, "II", "", "Purê de mandioquinha com patinho moído.", "escondidinho");
  pl("Macarrão com molho de tomate peneirado e carne moída", pr, "II", "", "Molho sem pele e sem sementes; carne magra.", "macarronada macarrão à bolonhesa");
  es("Estrogonofe", pr, "CC", "gordura lactose_media", "Creme de leite e cogumelos pesam. Prefira versões leves e sem cogumelos.", "strogonoff");
  es("Feijão tropeiro", pr, "EE", "gordura fibra gases", "Feijão em grão, bacon e linguiça: pesado.", "tropeiro");
  es("Pastel, coxinha e salgados fritos", pr, "EC", "gordura", "Fritura. Evite na Fase 1.", "pastel coxinha empada salgadinho risoles quibe");
  es("Salgadinho de pacote", pr, "EC", "gordura", "Muita gordura e sal.", "snack batata chips doritos");
  es("Hambúrguer e fast-food", pr, "EC", "gordura", "Gorduroso, com molhos e fritura.", "fast food mcdonald's lanche");
  es("Pizza", pr, "EC", "gordura", "Queijo, gordura e molho com tomate com pele. Evite na Fase 1.", "pizza");
  es("Lasanha", pr, "EC", "gordura lactose_media", "A massa é boa, mas o queijo e o molho são gordurosos.", "lasanha");
  es("Macarrão instantâneo", pr, "CC", "gordura", "Refinado, mas com muito sal e gordura.", "miojo nissin lámen");
  es("Salada de maionese", pr, "EC", "gordura", "Gorduroso e com legumes em pedaços.", "maionese de batata salada de batata");
  es("Sopa com legumes em pedaços", pr, "CC", "fibra", "Prefira batida e coada na Fase 1.", "sopa de legumes com pedaços");

  window.GRUPOS = G;
  window.ALIMENTOS = lista;
})();
