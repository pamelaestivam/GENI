(function () {
  "use strict";

  var ALIMENTOS = window.ALIMENTOS;
  var GRUPOS = window.GRUPOS;
  var STORAGE_KEY = "posso-comer-geni:perfil:v1";

  var NIVEIS = {
    I: { rotulo: "Indicado", icone: "✓", ordem: 0 },
    C: { rotulo: "Com cautela", icone: "!", ordem: 1 },
    E: { rotulo: "Evitar", icone: "✕", ordem: 2 }
  };

  var TAGS = {
    firma: "Deixa a saída mais firme",
    solta: "Pode soltar a saída",
    gases: "Pode causar gases",
    odor: "Pode aumentar o odor",
    antiodor: "Ajuda a reduzir o odor",
    entope: "Risco de entupir o estoma",
    cor: "Pode mudar a cor da saída",
    gordura: "Rico em gordura",
    fibra: "Rico em fibras",
    lactose: "Contém lactose",
    lactose_media: "Pode conter lactose",
    lactose_baixa: "Pouca lactose",
    acucar: "Contém açúcar",
    doce: "Muito açúcar"
  };
  var TAGS_POSITIVAS = { firma: 1, antiodor: 1, lactose_baixa: 1 };

  var perfil = carregarPerfil();
  var aberto = null;
  var filtroNivel = "";
  var filtroGrupo = "";

  /* ---------- utilidades ---------- */

  function normalizar(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function slug(s) { return normalizar(s).replace(/ /g, "-"); }

  function distancia(a, b) {
    if (a === b) return 0;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }

  function carregarPerfil() {
    var padrao = { fase: "1", estoma: "naosei" };
    try {
      var salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (salvo && typeof salvo === "object") {
        return {
          fase: salvo.fase === "2" ? "2" : "1",
          estoma: ["ileostomia", "colostomia", "naosei"].indexOf(salvo.estoma) >= 0 ? salvo.estoma : "naosei"
        };
      }
    } catch (e) { /* armazenamento indisponível: segue com o padrão */ }
    return padrao;
  }

  function salvarPerfil() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil)); } catch (e) { /* ignora */ }
  }

  /* ---------- classificação ---------- */

  function piorNivel(a, b) { return NIVEIS[a].ordem >= NIVEIS[b].ordem ? a : b; }

  // Retorna { nivel, avisos } do alimento para um perfil (fase e tipo de estoma).
  function avaliar(food, p) {
    var idx = p.fase === "1" ? 0 : (p.estoma === "colostomia" ? 1 : 2);
    var nivel = food.r.charAt(idx);
    var avisos = [];
    return { nivel: nivel, avisos: avisos };
  }

  /* ---------- busca ---------- */

  var indice = ALIMENTOS.map(function (f) {
    var texto = normalizar(f.nome + " " + f.alias);
    return {
      food: f,
      nome: normalizar(f.nome),
      texto: texto,
      palavras: texto.split(" ")
    };
  });

  function casaToken(item, tok, aproximado) {
    if (item.texto.indexOf(tok) >= 0) return 2;
    if (aproximado && tok.length >= 4) {
      for (var i = 0; i < item.palavras.length; i++) {
        var w = item.palavras[i];
        if (w.length >= 4 && distancia(tok, w.slice(0, tok.length)) <= 1) return 1;
      }
    }
    return 0;
  }

  function pesquisar(q, aproximado) {
    var tokens = q.split(" ");
    var resultado = [];
    indice.forEach(function (it) {
      var total = 0;
      for (var i = 0; i < tokens.length; i++) {
        var m = casaToken(it, tokens[i], aproximado);
        if (!m) return;
        total += m;
      }
      var pontos = total;
      if (it.nome === q) pontos += 100;
      else if (it.nome.indexOf(q) === 0) pontos += 60;
      else if (it.nome.split(" ").indexOf(tokens[0]) >= 0) pontos += 30;
      else if (it.nome.indexOf(q) >= 0) pontos += 20;
      // palavra inteira vale mais que prefixo de outra palavra ("maçã" antes de "macarrão")
      if (it.nome.split(" ").indexOf(tokens[0]) >= 0) pontos += 15;
      // nomes mais curtos primeiro em caso de empate
      pontos -= it.nome.length / 100;
      resultado.push({ it: it, pontos: pontos });
    });
    return resultado;
  }

  function buscar(consulta) {
    var q = normalizar(consulta);
    var resultado;
    if (!q) {
      resultado = indice.map(function (it) { return { it: it, pontos: 0 }; });
    } else {
      resultado = pesquisar(q, false);
      // sem resultado exato: tolera um erro de digitação
      if (!resultado.length) resultado = pesquisar(q, true);
    }
    resultado.sort(function (a, b) {
      return b.pontos - a.pontos || a.it.food.nome.localeCompare(b.it.food.nome, "pt-BR");
    });
    return resultado.map(function (r) { return r.it.food; });
  }

  /* ---------- renderização ---------- */

  var el = {
    busca: document.getElementById("busca"),
    limpar: document.getElementById("limpar"),
    lista: document.getElementById("lista"),
    contagem: document.getElementById("contagem"),
    nivelFiltros: document.getElementById("filtros-nivel"),
    grupo: document.getElementById("filtro-grupo"),
    resumoPerfil: document.getElementById("resumo-perfil"),
    avisoEstoma: document.getElementById("aviso-estoma")
  };

  function pill(nivel) {
    var n = NIVEIS[nivel];
    return '<span class="pill pill-' + nivel + '"><span aria-hidden="true">' + n.icone + "</span> " + n.rotulo + "</span>";
  }

  function tagsHtml(food) {
    if (!food.tags.length) return "";
    return '<ul class="tags">' + food.tags.map(function (t) {
      return '<li class="tag' + (TAGS_POSITIVAS[t] ? " tag-pos" : "") + '">' + esc(TAGS[t]) + "</li>";
    }).join("") + "</ul>";
  }

  function textoNivel(nivel) {
    if (nivel === "I") return "Pode comer, sem exageros e bem mastigado.";
    if (nivel === "C") return "Pode ser testado com cuidado: uma porção pequena, bem cozida e bem mastigada. Espere 1 a 2 horas para ver como o estoma reage.";
    return "Melhor evitar.";
  }

  function detalheHtml(food) {
    var av = avaliar(food, perfil);
    var cenarios = [
      { rotulo: "Fase 1", p: { fase: "1", estoma: perfil.estoma }, atual: perfil.fase === "1" },
      { rotulo: "Fase 2 · colostomia", p: { fase: "2", estoma: "colostomia" }, atual: perfil.fase === "2" && perfil.estoma === "colostomia" },
      { rotulo: "Fase 2 · ileostomia", p: { fase: "2", estoma: "ileostomia" }, atual: perfil.fase === "2" && perfil.estoma !== "colostomia" }
    ];

    var extras = [];
    var tem = function (t) { return food.tags.indexOf(t) >= 0; };

    if (perfil.fase === "1" && av.nivel !== "I") {
      var f2 = avaliar(food, { fase: "2", estoma: perfil.estoma }).nivel;
      if (NIVEIS[f2].ordem < NIVEIS[av.nivel].ordem) {
        extras.push("Pode ser liberado na Fase 2, com autorização da equipe de saúde.");
      } else if (av.nivel === "E" && f2 === "E") {
        extras.push("Não é recomendado nem na Fase 2, salvo orientação da equipe.");
      }
    }
    if (tem("entope") && perfil.estoma !== "colostomia") {
      extras.push("Na ileostomia o risco de entupir é maior, porque o intestino delgado é mais estreito que o cólon.");
    }

    var html = '<div class="detalhe-corpo">';
    html += '<p class="veredito veredito-' + av.nivel + '"><strong>' + NIVEIS[av.nivel].rotulo + " para o seu caso.</strong> " + esc(textoNivel(av.nivel)) + "</p>";
    html += "<p>" + esc(food.nota) + "</p>";
    av.avisos.concat(extras).forEach(function (a) { html += '<p class="aviso">' + esc(a) + "</p>"; });
    html += tagsHtml(food);
    html += '<div class="fases" role="group" aria-label="Classificação em cada fase">';
    cenarios.forEach(function (c) {
      var n = avaliar(food, c.p).nivel;
      html += '<div class="fase' + (c.atual ? " fase-atual" : "") + '"><span class="fase-nome">' + c.rotulo + (c.atual ? " (você)" : "") + "</span>" + pill(n) + "</div>";
    });
    html += "</div>";
    if (!food.plano) {
      html += '<p class="nota-estimada">Este alimento não aparece no plano alimentar de origem. Foi classificado pelos mesmos critérios (fibras, casca e sementes, gordura e gases). Confirme com a sua equipe.</p>';
    }
    html += "</div>";
    return html;
  }

  function itemHtml(food) {
    var av = avaliar(food, perfil);
    var id = "alimento-" + slug(food.nome);
    var estaAberto = aberto === food.nome;
    return '<li class="item nivel-' + av.nivel + (estaAberto ? " aberto" : "") + '">' +
      '<button type="button" class="item-cabeca" data-nome="' + esc(food.nome) + '" aria-expanded="' + estaAberto + '" aria-controls="' + id + '">' +
      '<span class="item-texto"><span class="item-nome">' + esc(food.nome) + '</span><span class="item-grupo">' + esc(food.grupo) + "</span></span>" +
      pill(av.nivel) +
      "</button>" +
      '<div class="detalhe" id="' + id + '"' + (estaAberto ? "" : " hidden") + ">" + (estaAberto ? detalheHtml(food) : "") + "</div>" +
      "</li>";
  }

  function vazioHtml(consulta) {
    return '<li class="vazio"><p><strong>Não encontrei “' + esc(consulta) + "”.</strong></p>" +
      "<p>Confira a escrita ou tente um nome mais simples (por exemplo, “frango” em vez de “peito de frango grelhado”).</p>" +
      "<p>Se o alimento não estiver na lista, siga a regra geral: escolha opções <strong>macias, bem cozidas, sem casca, sem sementes e pouco gordurosas</strong>, teste <strong>um alimento novo por vez</strong>, em porção pequena, e espere 1 a 2 horas para ver como o estoma reage. Na dúvida, pergunte à sua equipe.</p></li>";
  }

  function renderLista() {
    var consulta = el.busca.value;
    var resultados = buscar(consulta).filter(function (f) {
      if (filtroGrupo && f.grupo !== filtroGrupo) return false;
      if (filtroNivel && avaliar(f, perfil).nivel !== filtroNivel) return false;
      return true;
    });

    if (aberto && !resultados.some(function (f) { return f.nome === aberto; })) aberto = null;

    if (!resultados.length) {
      el.lista.innerHTML = consulta.trim() ? vazioHtml(consulta.trim()) :
        '<li class="vazio"><p>Nenhum alimento com esses filtros.</p></li>';
    } else {
      el.lista.innerHTML = resultados.map(itemHtml).join("");
    }
    var n = resultados.length;
    el.contagem.textContent = n + (n === 1 ? " alimento" : " alimentos") +
      (consulta.trim() ? " para “" + consulta.trim() + "”" : " na lista");
    el.limpar.hidden = !consulta;
  }

  function renderPerfil() {
    document.querySelectorAll("[data-perfil]").forEach(function (inp) {
      var campo = inp.getAttribute("data-perfil");
      inp.checked = String(perfil[campo]) === inp.value;
    });
    var partes = [perfil.fase === "1" ? "Fase 1" : "Fase 2"];
    partes.push({ ileostomia: "ileostomia", colostomia: "colostomia", naosei: "tipo de estoma ainda não informado" }[perfil.estoma]);
    el.resumoPerfil.textContent = partes.join(" · ");
    el.avisoEstoma.hidden = !(perfil.fase === "2" && perfil.estoma === "naosei");
  }

  function popularGrupos() {
    var nomes = Object.keys(GRUPOS).map(function (k) { return GRUPOS[k]; });
    el.grupo.innerHTML = '<option value="">Todos os grupos</option>' + nomes.map(function (g) {
      return '<option value="' + esc(g) + '">' + esc(g) + "</option>";
    }).join("");
  }

  /* ---------- eventos ---------- */

  el.busca.addEventListener("input", function () { aberto = null; renderLista(); });

  el.limpar.addEventListener("click", function () {
    el.busca.value = "";
    aberto = null;
    renderLista();
    el.busca.focus();
  });

  el.lista.addEventListener("click", function (ev) {
    var botao = ev.target.closest(".item-cabeca");
    if (!botao) return;
    var nome = botao.getAttribute("data-nome");
    aberto = aberto === nome ? null : nome;
    renderLista();
    var novo = el.lista.querySelector('.item-cabeca[data-nome="' + (window.CSS && CSS.escape ? CSS.escape(nome) : nome) + '"]');
    if (novo) novo.focus({ preventScroll: true });
  });

  el.nivelFiltros.addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-nivel]");
    if (!b) return;
    filtroNivel = b.getAttribute("data-nivel");
    el.nivelFiltros.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", String(x === b));
    });
    renderLista();
  });

  el.grupo.addEventListener("change", function () {
    filtroGrupo = el.grupo.value;
    renderLista();
  });

  document.querySelectorAll("[data-perfil]").forEach(function (inp) {
    inp.addEventListener("change", function () {
      var campo = inp.getAttribute("data-perfil");
      perfil[campo] = inp.value;
      salvarPerfil();
      renderPerfil();
      renderLista();
    });
  });

  document.getElementById("form-busca").addEventListener("submit", function (ev) { ev.preventDefault(); });

  /* ---------- início ---------- */

  popularGrupos();
  renderPerfil();
  renderLista();
})();
