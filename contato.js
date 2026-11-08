/* O endereço de e-mail nunca existe montado no HTML: vem em dois
   atributos separados e só é remontado aqui, em tempo de execução.
   Não há um único caractere de arroba nos arquivos servidos.

   E não há mailto. O link mailto tem dois defeitos: é o padrão que os
   raspadores de spam procuram primeiro, e só funciona para quem tem
   cliente de e-mail instalado — quem usa webmail clica e não acontece
   nada. Aqui o endereço é exibido por extenso e um clique o copia para
   a área de transferência, que serve a qualquer webmail.

   Sem JavaScript, o <noscript> de cada página mostra o endereço com a
   arroba escrita por extenso: legível para gente, inútil para o
   raspador que varre o código atrás do padrão usuario-arroba-dominio. */

(function () {
  "use strict";

  /* Reserva para navegador antigo, origem sem HTTPS, ou permissão
     negada. Devolve true se o navegador confirmou a cópia. */
  function copiarPorCampo(texto) {
    var campo = document.createElement("textarea");
    campo.value = texto;
    campo.setAttribute("readonly", "");
    campo.style.position = "fixed";
    campo.style.top = "0";
    campo.style.opacity = "0";
    document.body.appendChild(campo);
    campo.select();
    var deu = false;
    try { deu = document.execCommand("copy"); } catch (e) { deu = false; }
    campo.remove();
    return deu;
  }

  document.querySelectorAll("button.email").forEach(function (b) {
    var endereco = b.dataset.a + String.fromCharCode(64) + b.dataset.b;

    /* BOTÃO DENTRO DE UMA FRASE (4/10, a abertura do Contato: "Fale
       conosco pelo WhatsApp, e-mail ou..."). Mostra um RÓTULO no lugar
       do endereço, e o aviso de cópia NÃO troca o texto: aparece acima
       da palavra, pelo CSS (.email--rotulo.copiado::after). Numa frase,
       trocar "e-mail" por "endereço copiado" mudaria a quebra das linhas
       e a página saltaria; travar a largura deixaria um vão na frase. */
    var rotulo = b.dataset.rotulo;

    b.textContent = rotulo || endereco;
    b.setAttribute("aria-label", "Copiar o endereço " + endereco);
    b.hidden = false;

    /* Trava a largura EXATA do endereço. Não basta min-width: um aviso
       mais largo que o endereço empurraria o rodapé do mesmo jeito.
       Os dois avisos abaixo são mais curtos que o endereço de propósito.
       (Com rótulo não se trava nada: o texto não muda.) */
    if (!rotulo) b.style.width = b.getBoundingClientRect().width + "px";

    var voltando;

    b.addEventListener("click", function () {
      var respondido = false;

      function avisar(texto) {
        if (respondido) return;
        respondido = true;
        if (rotulo) b.dataset.aviso = texto; else b.textContent = texto;
        /* O aria-label vence o texto no cálculo do nome acessível. Sem
           reescrevê-lo aqui, quem usa leitor de tela clica e não ouve
           retorno nenhum — nem de sucesso nem de falha —, porque o nome
           continuaria sendo "Copiar o endereço ...". */
        b.setAttribute("aria-label", texto);
        b.classList.add("copiado");
        clearTimeout(voltando);
        voltando = setTimeout(function () {
          if (!rotulo) b.textContent = endereco;
          b.setAttribute("aria-label", "Copiar o endereço " + endereco);
          b.classList.remove("copiado");
        }, 2200);
      }

      /* Se a cópia falhar: com o endereço à vista, "selecione e copie";
         com rótulo, não há endereço na tela para selecionar — o aviso
         mostra o próprio endereço, para que ao menos se possa lê-lo. */
      function pelaReserva() {
        avisar(copiarPorCampo(endereco) ? "endereço copiado"
                                       : (rotulo ? endereco : "selecione e copie"));
      }

      var tentativa;
      try {
        tentativa = (navigator.clipboard && navigator.clipboard.writeText)
          ? navigator.clipboard.writeText(endereco)
          : Promise.reject();
      } catch (e) {
        tentativa = Promise.reject();
      }

      tentativa.then(function () { avisar("endereço copiado"); }, pelaReserva);

      /* A promessa do clipboard pode ficar PENDENTE — sem gesto do
         usuário, ou com a permissão em suspenso, ela nunca resolve nem
         rejeita. Sem esta guarda o clique não daria retorno nenhum.
         Passados 300 ms, cai na reserva e responde de todo jeito. */
      setTimeout(function () {
        if (!respondido) pelaReserva();
      }, 300);
    });
  });
})();
