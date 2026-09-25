(function () {
  "use strict";

  var C = window.CONTEUDO || {};

  var ICONES = {
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.87 11.87 0 0 1-1.587-5.946C.16 5.335 5.494 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.519 5.26l-.999 3.648 3.969-1.607z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/></svg>',
    paleta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a9 9 0 0 0 0 18c1.7 0 2-1.3 1.2-2.2-.7-.9-.4-2 .8-2h1.5A4.5 4.5 0 0 0 20 12 8.7 8.7 0 0 0 12 3z"/></svg>',
    alianca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="14" r="5.5"/><circle cx="15" cy="14" r="5.5"/></svg>'
  };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function criar(tag, classe) { var e = document.createElement(tag); if (classe) e.className = classe; return e; }
  function setTexto(id, txt) { var e = document.getElementById(id); if (e && txt != null) e.textContent = txt; }

  /* LÓGICA DO WHATSAPP COM SUPORTE A 2 NÚMEROS */
  function linkWhats(mensagem, numeroEspecial) {
    var numPadrao = (C.contato && C.contato.whatsapp ? C.contato.whatsapp : "");
    var num = (numeroEspecial || numPadrao).replace(/\D/g, "");
    var texto = encodeURIComponent(mensagem || (C.contato && C.contato.whatsappMensagem) || "Olá!");
    return "https://wa.me/" + num + "?text=" + texto;
  }

  function aplicarAcao(el, acao, mensagem, numEspecial) {
    if (mensagem || numEspecial) {
      el.href = linkWhats(mensagem, numEspecial); 
      el.target = "_blank"; 
      el.rel = "noopener";
    } else if (acao === "orcamento") {
      el.href = linkWhats("Olá, gostaria de um orçamento.");
      el.target = "_blank"; 
      el.rel = "noopener";
    } else {
      el.href = "#contato";
    }
  }

  function montar() {
    /* HERO */
    if (C.hero) {
      setTexto("hero-eyebrow", C.hero.fraseEyebrow);
      setTexto("hero-titulo", C.hero.titulo);
      setTexto("hero-sub", C.hero.subtitulo);
      var b1 = $("#hero-btn1"); if (b1) b1.textContent = C.hero.botaoPrimario;
      var b2 = $("#hero-btn2"); if (b2) b2.textContent = C.hero.botaoSecundario;
    }

    /* SERVIÇOS */
    var grade = $("#servicos-grid");
    if (grade && C.servicos) {
      C.servicos.forEach(function (s) {
        var card = criar("article", "servico reveal");
        var ic = criar("div", "servico__ico"); 
        ic.innerHTML = ICONES[s.icone] || "";
        var h = criar("h3"); h.textContent = s.titulo;
        var p = criar("p"); p.textContent = s.texto;
        var a = criar("a"); a.textContent = s.botao; 
        aplicarAcao(a, s.acao, s.mensagem, s.whatsapp);
        card.append(ic, h, p, a);
        grade.appendChild(card);
      });
    }

    /* WHATSAPP FLUTUANTE */
    var flut = $("#whats-flutuante");
    if (flut) flut.href = linkWhats();

    /* RODAPÉ */
    if (C.rodape) { 
      setTexto("rodape-frase", C.rodape.frase); 
      setTexto("rodape-credito", "© " + new Date().getFullYear() + " " + C.rodape.creditoTexto); 
    }
  }

  function iniciar() {
    montar();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();