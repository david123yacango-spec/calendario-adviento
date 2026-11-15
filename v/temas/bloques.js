/* Estilo «Bloquecitos»: bloques de juguete de colores, casita de bloques y letra redondita.
   Arte original: bloques lisos con botones redondos, sin letras ni personajes. */
(function () {
  "use strict";

  /* Paleta: base, claro, oscuro, texto */
  var C = {
    rojo:     ["#e0352b", "#ff6a55", "#a8221a", "#ffffff"],
    azul:     ["#1f63d1", "#4d8cf0", "#15469a", "#ffffff"],
    amarillo: ["#ffc22a", "#ffe07a", "#d99400", "#4a2e00"],
    verde:    ["#1e9a4e", "#45c372", "#126b35", "#ffffff"],
    naranja:  ["#e4600e", "#ff9a4d", "#a94505", "#ffffff"],
    celeste:  ["#22a9e0", "#6fd0f5", "#1279a8", "#062b4a"]
  };
  var CICLO = ["rojo", "azul", "amarillo", "verde", "naranja", "celeste"];
  var ANCHAS = [3, 7, 12, 16, 20];   // bloques de 2 x 1
  var GRANDE = 24;                   // bloque de 2 x 2

  function uri(svg) { return 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) + '")'; }

  /* Fila de botones (vista de costado) para usar como fondo repetido */
  function tacoURI(c) {
    return uri('<svg xmlns="http://www.w3.org/2000/svg" width="26" height="11" viewBox="0 0 26 11">' +
      '<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="' + c[2] + '"/><stop offset=".3" stop-color="' + c[0] + '"/>' +
      '<stop offset=".5" stop-color="' + c[1] + '"/><stop offset=".75" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient></defs>' +
      '<rect x="5" y="1" width="16" height="11" rx="3" fill="url(#g)"/><rect x="7" y="1.6" width="12" height="1.6" rx=".8" fill="#fff" opacity=".35"/></svg>');
  }

  /* ---------- Escena SVG: casita de bloques ---------- */
  function bloque(x, y, w, h, c, sinBrillo) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2.5" fill="' + c[0] + '"/>' +
      '<rect x="' + x + '" y="' + (y + h - 3.5) + '" width="' + w + '" height="3.5" rx="1.5" fill="' + c[2] + '" opacity=".75"/>' +
      (sinBrillo ? "" : '<rect x="' + (x + 2) + '" y="' + (y + 1.6) + '" width="' + Math.max(0, w - 4) + '" height="1.8" rx=".9" fill="' + c[1] + '" opacity=".8"/>');
  }
  function tacos(x0, x1, y, c) {
    var s = "";
    for (var x = x0; x + 12 <= x1 + 0.1; x += 16) {
      s += '<rect x="' + (x + 2) + '" y="' + (y - 5) + '" width="12" height="6" rx="2" fill="' + c[0] + '"/>' +
        '<rect x="' + (x + 4) + '" y="' + (y - 4.4) + '" width="4" height="4.6" rx="1.4" fill="' + c[1] + '" opacity=".85"/>';
    }
    return s;
  }
  function fila(x0, x1, y, h, c, desfase) {
    var s = "", ancho = 32;
    for (var x = x0 - desfase; x < x1; x += ancho) {
      var bx = Math.max(x, x0), bw = Math.min(x + ancho, x1) - bx;
      if (bw > 2) s += bloque(bx + 0.75, y, bw - 1.5, h, c);
    }
    return s;
  }

  function casaSVG() {
    var s = '<svg class="bq-casa-svg" viewBox="0 0 400 236" role="img" aria-label="Una casita de bloques de colores con un árbol de Navidad y regalos">';
    s += '<defs><radialGradient id="bq-luzv" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fff7c9"/><stop offset="1" stop-color="#ffd75e"/></radialGradient></defs>';
    /* nubes y nieve */
    s += '<g fill="#fff" opacity=".95"><g class="bq-nube1"><ellipse cx="58" cy="40" rx="30" ry="12"/><ellipse cx="44" cy="34" rx="14" ry="11"/><ellipse cx="68" cy="30" rx="17" ry="14"/></g>' +
      '<g class="bq-nube2"><ellipse cx="338" cy="34" rx="34" ry="12"/><ellipse cx="324" cy="26" rx="15" ry="12"/><ellipse cx="350" cy="22" rx="18" ry="14"/></g></g>';
    s += '<g fill="#fff">' + [[20, 80, 2.4], [110, 22, 2], [150, 70, 1.8], [270, 18, 2.2], [300, 76, 2], [380, 90, 2.4], [96, 96, 1.6], [232, 8, 1.8], [370, 140, 1.8], [12, 140, 2]].map(function (p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '"/>';
    }).join("") + "</g>";

    /* base */
    s += '<rect x="0" y="206" width="400" height="30" rx="6" fill="' + C.verde[0] + '"/><rect x="0" y="228" width="400" height="8" rx="3" fill="' + C.verde[2] + '"/>' +
      '<rect x="0" y="208" width="400" height="2.5" fill="' + C.verde[1] + '" opacity=".7"/>' + tacos(0, 400, 206, C.verde);

    /* árbol de bloques */
    s += bloque(50, 190, 14, 16, ["#8a5a32", "#b07a4a", "#5e3a1c"]);
    var copas = [[20, 174, 74], [28, 158, 58], [36, 142, 42], [44, 126, 26]];
    copas.forEach(function (k, i) {
      s += bloque(k[0], k[1], k[2], 16, i % 2 ? C.verde : ["#24ad5b", "#5fd38a", "#147a3c"]);
    });
    s += tacos(20, 28, 174, C.verde) + tacos(78, 94, 174, C.verde) + tacos(28, 36, 158, C.verde) + tacos(70, 86, 158, C.verde) +
      tacos(36, 44, 142, C.verde) + tacos(62, 78, 142, C.verde);
    s += '<path class="bq-estrella" d="M57 102 l4.2 8.4 9.3 1.4 -6.7 6.5 1.6 9.2 -8.4 -4.4 -8.4 4.4 1.6 -9.2 -6.7 -6.5 9.3 -1.4z" fill="' + C.amarillo[0] + '" stroke="' + C.amarillo[2] + '" stroke-width="1.5" stroke-linejoin="round"/>';
    s += [[30, 186, "rojo"], [70, 184, "amarillo"], [86, 188, "azul"], [44, 168, "amarillo"], [64, 170, "rojo"], [50, 152, "azul"], [70, 136, "rojo"], [52, 134, "amarillo"]].map(function (o) {
      return '<circle cx="' + o[0] + '" cy="' + o[1] + '" r="3.4" fill="' + C[o[2]][0] + '"/><circle cx="' + (o[0] - 1) + '" cy="' + (o[1] - 1.2) + '" r="1.1" fill="#fff" opacity=".8"/>';
    }).join("");

    /* paredes de la casa */
    for (var r = 0; r < 5; r++) s += fila(112, 288, 126 + r * 16, 16, C.rojo, r % 2 ? 16 : 0);
    /* ventanas */
    [[126, 140], [242, 140]].forEach(function (v) {
      s += bloque(v[0], v[1], 36, 34, C.amarillo, true) +
        '<rect x="' + (v[0] + 5) + '" y="' + (v[1] + 5) + '" width="26" height="22" rx="2" fill="url(#bq-luzv)" class="bq-ventana"/>' +
        '<rect x="' + (v[0] + 16.5) + '" y="' + (v[1] + 5) + '" width="3" height="22" fill="' + C.amarillo[2] + '"/>' +
        '<rect x="' + (v[0] + 5) + '" y="' + (v[1] + 14.5) + '" width="26" height="3" fill="' + C.amarillo[2] + '"/>' +
        bloque(v[0] - 3, v[1] + 34, 42, 6, C.blanco || ["#f4f7fb", "#ffffff", "#c9d3e2"]);
    });
    /* puerta con arco y corona */
    s += '<path d="M182 206 V168 a18 18 0 0 1 36 0 V206z" fill="' + C.azul[0] + '"/>' +
      '<path d="M186 206 V169 a14 14 0 0 1 28 0 V206" fill="none" stroke="' + C.azul[2] + '" stroke-width="2"/>' +
      '<circle cx="210" cy="188" r="2.6" fill="' + C.amarillo[0] + '"/>' +
      '<circle cx="200" cy="170" r="7.5" fill="none" stroke="' + C.verde[0] + '" stroke-width="4"/>' +
      '<circle cx="200" cy="163" r="2" fill="' + C.rojo[0] + '"/><circle cx="194" cy="174" r="1.6" fill="' + C.amarillo[0] + '"/><circle cx="206" cy="174" r="1.6" fill="' + C.amarillo[0] + '"/>';

    /* chimenea (antes del techo para que el techo la tape abajo) */
    s += bloque(238, 30, 16, 16, C.rojo) + bloque(238, 46, 16, 16, C.rojo) + tacos(238, 254, 30, C.rojo);
    s += '<g class="bq-humo" fill="#fff"><circle cx="248" cy="18" r="5" opacity=".85"/><circle cx="256" cy="8" r="6.5" opacity=".7"/><circle cx="268" cy="-2" r="8" opacity=".5"/></g>';

    /* techo escalonado */
    var techo = [[100, 300, 110], [116, 284, 94], [132, 268, 78], [148, 252, 62], [164, 236, 46], [180, 220, 30]];
    techo.forEach(function (t, i) { s += fila(t[0], t[1], t[2], 16, C.azul, i % 2 ? 16 : 0); });
    techo.forEach(function (t, i) {
      var sig = techo[i + 1];
      if (!sig) { s += tacos(t[0], t[1], t[2], C.azul); return; }
      s += tacos(t[0], sig[0], t[2], C.azul);
      var derIni = sig[1];
      if (i === 3) derIni = 254; /* la chimenea tapa ese tramo */
      s += tacos(derIni, t[1], t[2], C.azul);
    });
    /* guirnalda de luces */
    s += '<path d="M102 120 Q151 132 200 121 Q249 132 298 120" fill="none" stroke="#1b2a5e" stroke-width="1.3" opacity=".55"/>';
    var focos = ["rojo", "amarillo", "verde", "celeste", "naranja"];
    for (var i = 0; i <= 10; i++) {
      var x = 104 + i * 19.2, t = ((x - 102) % 98) / 98;
      var y = 120 + 4 * 4 * t * (1 - t) * 2.2 + 2;
      s += '<circle class="bq-foco bq-foco' + (i % 3) + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.3" fill="' + C[focos[i % 5]][0] + '"/>';
    }

    /* regalos */
    s += bloque(310, 176, 42, 30, C.naranja) + '<rect x="328" y="176" width="6" height="30" fill="' + C.amarillo[0] + '"/>' +
      bloque(318, 152, 26, 24, C.celeste) + '<rect x="328" y="152" width="6" height="24" fill="#fff"/>' + tacos(318, 344, 152, C.celeste) +
      tacos(344, 352, 176, C.naranja) + tacos(310, 318, 176, C.naranja) +
      '<path d="M331 152 c-8 -10 -16 -4 -10 0z M331 152 c8 -10 16 -4 10 0z" fill="#fff" stroke="#c9d3e2" stroke-width="1"/>' +
      bloque(356, 186, 30, 20, C.amarillo) + '<rect x="368" y="186" width="6" height="20" fill="' + C.rojo[0] + '"/>' + tacos(356, 386, 186, C.amarillo);
    s += "</svg>";
    return s;
  }

  /* ---------- Íconos ---------- */
  var IC = {
    mensaje: '<path d="M12 20.6 4.3 13A4.9 4.9 0 0 1 11.1 6l.9.9.9-.9a4.9 4.9 0 0 1 6.9 7z"/>',
    foto: '<rect x="2.5" y="6.5" width="19" height="13.5" rx="3"/><path d="M8 7 9.6 4.3h4.8L16 7z"/><circle cx="12" cy="13.2" r="4" fill="#fff8e6"/><circle cx="12" cy="13.2" r="2.2"/>',
    vale: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5V10a2 2 0 0 0 0 4v2.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5V14a2 2 0 0 0 0-4z"/><path d="M15 6.5v11" stroke="#fff8e6" stroke-width="1.6" stroke-dasharray="2 2"/>',
    cancion: '<path d="M9 17.6A3 3 0 1 1 7 14.8V5.2L19.5 3v11.6a3 3 0 1 1-2-2.8V7.4L9 8.9z"/>',
    regalo: '<rect x="3" y="8.5" width="18" height="4.5" rx="1.2"/><rect x="4.8" y="13" width="14.4" height="8" rx="1.2"/><rect x="11" y="8.5" width="2" height="12.5" fill="#fff8e6"/><path d="M12 8.4C10 4 5.6 3.6 6.2 6.6 6.6 8.4 10 8.5 12 8.4zM12 8.4c2-4.4 6.4-4.8 5.8-1.8-.4 1.8-3.8 1.9-5.8 1.8z"/>',
    final: '<path d="M12 2.6l2.9 5.9 6.4.9-4.6 4.5 1.1 6.4L12 17.3l-5.8 3 1.1-6.4-4.6-4.5 6.4-.9z"/>'
  };
  function icono(nombre, clase) {
    return '<svg class="' + clase + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">' + (IC[nombre] || IC.final) + "</svg>";
  }
  var CANDADO = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor"/><circle cx="12" cy="15.5" r="1.8" fill="#fff"/></svg>';
  var CHISPA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2c.6 4.6 2.4 7.2 8 8-5.6.8-7.4 3.4-8 8-.6-4.6-2.4-7.2-8-8 5.6-.8 7.4-3.4 8-8z" fill="currentColor"/></svg>';

  function tipoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? "final" : d.tipo;
    } catch (e) { /* sin datos */ }
    return "final";
  }

  /* ---------- CSS ---------- */
  var B = "body.tema-bloques ";
  var colores = CICLO.map(function (k, i) {
    var c = C[k];
    return B + ".tv-puerta:nth-child(6n+" + (i + 1) + "){--b:" + c[0] + ";--bc:" + c[1] + ";--bo:" + c[2] + ";--bt:" + c[3] + "}";
  }).join("\n");
  var porTipo = { mensaje: "rojo", foto: "azul", vale: "amarillo", cancion: "verde", regalo: "naranja" };
  var tarjetas = Object.keys(porTipo).map(function (t) {
    var c = C[porTipo[t]];
    return B + '.tv-modal[data-tipo="' + t + '"] .tv-tarjeta{--b:' + c[0] + ";--bc:" + c[1] + ";--bo:" + c[2] + ";--bt:" + c[3] + ";--taco:" + tacoURI(c) + "}";
  }).join("\n");
  var tacoAmarillo = tacoURI(C.amarillo);
  var regaloURI = uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><g transform="translate(8 14)">' +
    '<rect x="6" y="2" width="16" height="9" rx="3" fill="' + C.naranja[0] + '"/><rect x="28" y="2" width="16" height="9" rx="3" fill="' + C.naranja[0] + '"/><rect x="50" y="2" width="16" height="9" rx="3" fill="' + C.naranja[0] + '"/>' +
    '<rect x="0" y="8" width="80" height="62" rx="7" fill="' + C.naranja[0] + '"/><rect x="0" y="62" width="80" height="8" rx="4" fill="' + C.naranja[2] + '"/>' +
    '<rect x="4" y="11" width="72" height="3" rx="1.5" fill="' + C.naranja[1] + '"/>' +
    '<rect x="33" y="8" width="14" height="62" fill="' + C.amarillo[0] + '"/><rect x="0" y="31" width="80" height="12" fill="' + C.amarillo[0] + '"/>' +
    '<path d="M40 8c-10-16-26-14-22-4 3 6 14 5 22 4zM40 8c10-16 26-14 22-4-3 6-14 5-22 4z" fill="' + C.amarillo[0] + '" stroke="' + C.amarillo[2] + '" stroke-width="2"/></g></svg>');
  var notaURI = uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="' + C.verde[0] + '"/><circle cx="32" cy="32" r="30" fill="none" stroke="' + C.verde[2] + '" stroke-width="4" stroke-dasharray="0 0"/>' +
    '<path transform="translate(14 14) scale(1.5)" d="M9 17.6A3 3 0 1 1 7 14.8V5.2L19.5 3v11.6a3 3 0 1 1-2-2.8V7.4L9 8.9z" fill="#fff"/></svg>');
  var corazonURI = uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20.6 4.3 13A4.9 4.9 0 0 1 11.1 6l.9.9.9-.9a4.9 4.9 0 0 1 6.9 7z" fill="' + C.rojo[0] + '"/></svg>');
  var estrellaURI = uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.6l2.9 5.9 6.4.9-4.6 4.5 1.1 6.4L12 17.3l-5.8 3 1.1-6.4-4.6-4.5 6.4-.9z" fill="' + C.amarillo[0] + '" stroke="' + C.amarillo[2] + '" stroke-width="1.2" stroke-linejoin="round"/></svg>');
  var arcoiris = "linear-gradient(90deg," + CICLO.map(function (k, i) {
    return C[k][0] + " " + (i * 100 / 6).toFixed(2) + "% " + ((i + 1) * 100 / 6).toFixed(2) + "%";
  }).join(",") + ")";

  var css = `
body.tema-bloques{
  --tinta:#1b2a5e; --tinta2:#4a5b85;
  font-family:"Fredoka","Baloo 2",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  color:var(--tinta);
  background-color:#fff8ec;
  background-image:
    radial-gradient(circle at 12px 12px, rgba(255,255,255,.55) 0 3.2px, transparent 3.8px),
    linear-gradient(180deg,#8fd3ff 0,#c3e9ff 300px,#eaf6ff 560px,#fff8ec 900px);
  background-size:24px 24px,100% 100%;
  background-repeat:repeat,no-repeat;
}
${B}#tv-escena{overflow-x:hidden}
${B}.bq-pagina{max-width:1200px;margin:0 auto;padding:18px 16px 92px}
${B}.bq-cabecera{text-align:center}
${B}.bq-titulo{margin:4px 0 6px;font-size:clamp(1.85rem,8.4vw,2.9rem);line-height:1.05;font-weight:700;letter-spacing:.01em}
${B}.bq-titulo .bq-palabra{display:inline-block;white-space:nowrap;margin:0 .12em}
${B}.bq-titulo .bq-l{display:inline-block;color:var(--lc);text-shadow:0 3px 0 var(--lo),0 6px 10px rgba(27,42,94,.18);-webkit-text-stroke:0}
${B}.bq-sub{margin:0 0 12px;font-size:1rem;font-weight:500;color:var(--tinta2)}
${B}.bq-casa{margin:0 auto;max-width:440px}
${B}.bq-casa-svg{display:block;width:100%;height:auto;overflow:visible}
${B}.tv-para{
  position:relative;display:inline-block;margin:18px auto 6px;padding:9px 22px 12px;
  font-size:1.25rem;font-weight:700;color:#4a2e00;letter-spacing:.01em;
  background:linear-gradient(#ffe07a,#ffc22a);border-radius:12px;
  box-shadow:inset 0 -5px 0 #d99400,0 6px 14px rgba(150,95,0,.22);
}
${B}.tv-para::before{content:"";position:absolute;left:12px;right:12px;top:-9px;height:11px;background:${tacoAmarillo} 0 0/26px 11px space no-repeat}
${B}.tv-cuenta{margin:8px auto 0;max-width:30em;font-size:1rem;font-weight:600;color:var(--tinta)}
${B}.tv-cuenta[hidden]{display:none}
${B}.bq-pista{margin:10px 0 0;font-size:.95rem;font-weight:500;color:var(--tinta2)}

/* Base de bloques donde van las puertas */
${B}.tv-puertas{
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:70px;grid-auto-flow:row dense;
  gap:20px 10px;margin:22px auto 0;max-width:560px;padding:24px 12px 16px;
  background-color:#dfe8f3;
  background-image:radial-gradient(circle at 12px 12px,#f2f6fb 0 4.6px,#c3d0e1 5.2px 6px,transparent 6.6px);
  background-size:24px 24px;
  border-radius:20px;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.8),inset 0 -8px 0 #b9c7da,0 14px 30px rgba(27,42,94,.16);
}
${ANCHAS.map(function (n) { return B + '.tv-puerta[data-n="' + n + '"]'; }).join(",")}{grid-column:span 2}
${B}.tv-puerta[data-n="${GRANDE}"]{grid-column:span 2;grid-row:span 2}

/* Cada puerta es un bloque */
${B}.tv-puerta{
  --b:#e0352b;--bc:#ff6a55;--bo:#a8221a;--bt:#fff;
  position:relative;display:block;width:100%;height:100%;min-height:56px;
  border:0;border-radius:10px;padding:0;color:var(--bt);font-family:inherit;
  background:linear-gradient(180deg,var(--bc) 0,var(--b) 38%,var(--b) 100%);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.4),inset 0 -7px 0 var(--bo),0 3px 0 rgba(27,42,94,.18),0 8px 14px rgba(27,42,94,.2);
  transition:transform .15s ease,box-shadow .15s ease,filter .2s ease;
}
${colores}
${B}.tv-puerta:hover{transform:translateY(-2px)}
${B}.tv-puerta:active{transform:translateY(2px);box-shadow:inset 0 2px 0 rgba(255,255,255,.4),inset 0 -4px 0 var(--bo),0 1px 0 rgba(27,42,94,.18),0 4px 8px rgba(27,42,94,.2)}
${B}.tv-puerta:focus-visible{outline:3px solid var(--tinta);outline-offset:4px}
${B}.bq-tacos{position:absolute;left:8%;right:8%;top:-8px;height:10px;display:flex;justify-content:space-around;pointer-events:none}
${B}.bq-tacos i{display:block;width:30%;max-width:26px;height:10px;border-radius:5px 5px 2px 2px;
  background:linear-gradient(90deg,var(--bo) 0,var(--b) 28%,var(--bc) 50%,var(--b) 74%,var(--bo) 100%);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.35)}
${B}.tv-puerta[data-n="${GRANDE}"] .bq-tacos i,${ANCHAS.map(function (n) { return B + '.tv-puerta[data-n="' + n + '"] .bq-tacos i'; }).join(",")}{width:16%}
${B}.bq-cara{position:absolute;inset:0 0 7px;display:flex;align-items:center;justify-content:center;border-radius:10px 10px 6px 6px;overflow:hidden}
${B}.bq-num{font-size:1.85rem;font-weight:700;line-height:1;text-shadow:0 2px 0 var(--bo),0 3px 6px rgba(0,0,0,.12)}
${B}.tv-puerta[data-n="${GRANDE}"] .bq-num{font-size:3.4rem}
${B}.tv-puerta[data-n="${GRANDE}"] .bq-cara::after{content:"";position:absolute;inset:8px;border-radius:8px;border:2px dashed rgba(255,255,255,.45)}

/* bloqueada: cerrada con su candadito, pero con color */
${B}.tv-puerta[data-estado="bloqueada"]{filter:saturate(.82) brightness(.98)}
${B}.tv-puerta[data-estado="bloqueada"]:hover{transform:none}
${B}.tv-puerta[data-estado="bloqueada"] .bq-cara{flex-direction:column;gap:3px;padding-top:2px}
${B}.bq-candado{width:18px;height:18px;border-radius:50%;flex:none;
  display:grid;place-items:center;background:rgba(255,255,255,.92);color:var(--bo);box-shadow:0 2px 0 rgba(0,0,0,.12)}
${B}.bq-candado svg{width:12px;height:12px}
${B}.tv-puerta[data-n="${GRANDE}"] .bq-candado{width:26px;height:26px}
${B}.tv-puerta[data-n="${GRANDE}"] .bq-candado svg{width:17px;height:17px}

/* disponible: una chispita */
${B}.bq-chispa{position:absolute;right:6px;top:6px;width:14px;height:14px;color:#fff;opacity:.9;animation:bloques-chispa 2.4s ease-in-out infinite}
${B}.tv-puerta:nth-child(3n) .bq-chispa{animation-delay:-.8s}
${B}.tv-puerta:nth-child(3n+1) .bq-chispa{animation-delay:-1.6s}
${B}.bq-chispa svg{width:100%;height:100%;display:block}

/* hoy: brilla y salta despacito */
${B}.tv-puerta[data-estado="hoy"]{z-index:2;animation:bloques-salto 1.8s ease-in-out infinite;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.4),inset 0 -7px 0 var(--bo),0 0 0 4px #fff,0 0 0 7px #ffc22a,0 10px 24px rgba(255,170,0,.45)}
${B}.bq-hoy{position:absolute;left:50%;bottom:-11px;transform:translateX(-50%);white-space:nowrap;
  padding:3px 10px 4px;border-radius:999px;background:#ffc22a;color:#4a2e00;font-size:.78rem;font-weight:700;letter-spacing:.04em;
  box-shadow:inset 0 -2px 0 #d99400,0 2px 6px rgba(0,0,0,.18);z-index:3}

/* abierta: el bloque queda hueco y deja ver la sorpresa */
${B}.tv-puerta[data-estado="abierta"] .bq-cara{inset:6px 6px 12px}
${B}.bq-hueco{position:absolute;inset:0;border-radius:7px;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 50% 40%,#fffdf6,#fff1d2);box-shadow:inset 0 4px 0 rgba(0,0,0,.13),inset 0 0 0 2px rgba(0,0,0,.05)}
${B}.bq-icono{width:46%;max-width:34px;height:auto;color:var(--b);filter:drop-shadow(0 2px 0 rgba(0,0,0,.12))}
${B}.tv-puerta[data-n="${GRANDE}"] .bq-icono{max-width:64px}
${B}.tv-puerta:nth-child(6n+3)[data-estado="abierta"] .bq-icono,${B}.tv-puerta:nth-child(6n+6)[data-estado="abierta"] .bq-icono{color:var(--bo)}
${B}.bq-num-chico{position:absolute;left:3px;top:3px;min-width:22px;height:22px;padding:0 5px;border-radius:7px;
  display:grid;place-items:center;font-size:.85rem;font-weight:700;color:var(--bt);background:var(--b);text-shadow:none;box-shadow:inset 0 -2px 0 var(--bo)}
${B}.tv-puerta[data-estado="abierta"] .bq-tacos{transform:translate(4px,-5px) rotate(4deg)}

/* Piezas del efecto al abrir */
${B}.bq-pieza{position:absolute;left:0;top:0;border-radius:4px;will-change:transform,opacity;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -3px 0 rgba(0,0,0,.22)}
${B}.bq-pieza::before,${B}.bq-pieza::after{content:"";position:absolute;top:-4px;width:30%;height:5px;border-radius:3px 3px 1px 1px;background:inherit;filter:brightness(1.12)}
${B}.bq-pieza::before{left:12%}
${B}.bq-pieza::after{right:12%}
${B}.bq-aro{position:absolute;border-radius:50%;border:4px solid #fff;opacity:.9}

/* Ventana de la sorpresa */
${B}.tv-modal{background:rgba(16,34,78,.58);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
${B}.tv-tarjeta{
  --b:#e0352b;--bc:#ff6a55;--bo:#a8221a;--bt:#fff;--taco:${tacoURI(C.rojo)};
  max-width:440px;padding:14px 0 22px;border-radius:20px;color:var(--tinta);text-align:center;
  background:linear-gradient(transparent 0 14px,#fff 14px);background-attachment:local;
  box-shadow:none;filter:drop-shadow(0 8px 0 rgba(16,34,78,.28)) drop-shadow(0 22px 26px rgba(0,0,0,.28));
}
${tarjetas}
${B}.tv-modal.on .tv-tarjeta{animation:bloques-entra .42s cubic-bezier(.2,1.5,.4,1) both}
${B}.tv-dia{
  position:relative;margin:0 0 18px;padding:14px 20px 17px;font-size:1.65rem;font-weight:700;line-height:1.1;
  color:var(--bt);background:linear-gradient(180deg,var(--bc),var(--b) 55%);border-radius:20px 20px 0 0;
  box-shadow:inset 0 -6px 0 var(--bo);text-shadow:0 2px 0 rgba(0,0,0,.16)
}
${B}.tv-dia::before{content:"";position:absolute;left:16px;right:16px;top:-12px;height:13px;background:var(--taco) 0 0/34px 13px space no-repeat}
${B}.tv-contenido{margin:0 20px 16px}
${B}.tv-firma{margin:0 20px 18px;font-style:normal;font-weight:600;color:var(--tinta2);opacity:1}
${B}.tv-firma::before{content:"";display:inline-block;width:16px;height:16px;margin-right:6px;vertical-align:-2px;background:${corazonURI} center/contain no-repeat}
${B}.tv-cerrar,${B}.tv-boton{
  font-family:inherit;font-size:1.05rem;font-weight:700;min-height:46px;padding:10px 28px 13px;border:0;border-radius:14px;
  color:#fff;background:linear-gradient(#4d8cf0,#1f63d1 60%);box-shadow:inset 0 -5px 0 #15469a,0 4px 10px rgba(21,70,154,.3);
  transition:transform .12s ease;
}
${B}.tv-cerrar:active,${B}.tv-boton:active{transform:translateY(3px)}
${B}.tv-cerrar:focus-visible,${B}.tv-boton:focus-visible{outline:3px solid var(--tinta);outline-offset:3px}

${B}.tv-msg{position:relative;margin:0;padding:22px 16px 18px;font-size:1.2rem;font-weight:500;line-height:1.5;
  background:#fff1ef;border-radius:14px;color:var(--tinta)}
${B}.tv-msg::before{content:"";display:block;width:30px;height:30px;margin:-4px auto 8px;background:${corazonURI} center/contain no-repeat}

${B}.tv-foto{margin:0;padding:10px 10px 12px;border-radius:14px;background:linear-gradient(var(--bc),var(--b) 30%);box-shadow:inset 0 -6px 0 var(--bo)}
${B}.tv-foto img{border-radius:8px;border:4px solid #fff;background:#fff}
${B}.tv-foto figcaption{margin:10px 0 2px;color:#fff;font-weight:600;font-size:1.05rem;text-shadow:0 1px 0 rgba(0,0,0,.2)}

${B}.tv-vale{position:relative;border:0;border-radius:14px;padding:24px 26px 26px;color:#4a2e00;
  background:linear-gradient(#ffe07a,#ffc22a 45%);box-shadow:inset 0 -6px 0 #d99400;
  -webkit-mask:radial-gradient(circle at 0 50%,transparent 12px,#000 12.5px) left/51% 100% no-repeat,radial-gradient(circle at 100% 50%,transparent 12px,#000 12.5px) right/51% 100% no-repeat;
          mask:radial-gradient(circle at 0 50%,transparent 12px,#000 12.5px) left/51% 100% no-repeat,radial-gradient(circle at 100% 50%,transparent 12px,#000 12.5px) right/51% 100% no-repeat}
${B}.tv-vale::after{content:"";position:absolute;inset:9px 20px 14px;border:2px dashed rgba(74,46,0,.35);border-radius:10px;pointer-events:none}
${B}.tv-vale-por{font-size:.85rem;font-weight:700;letter-spacing:.16em}
${B}.tv-vale-que{font-size:1.85rem;font-weight:700;line-height:1.15;margin:6px 0 8px}
${B}.tv-vale-nota{font-size:.98rem;opacity:1;font-weight:500;color:#5e3c00}

${B}.tv-cancion{padding:18px 16px 20px;border-radius:14px;background:#e6f7ec}
${B}.tv-cancion::before{content:"";display:block;width:64px;height:64px;margin:0 auto 10px;background:${notaURI} center/contain no-repeat;animation:bloques-gira 6s linear infinite}
${B}.tv-cancion-titulo{font-size:1.4rem;color:#126b35;margin:0 0 6px}
${B}.tv-cancion-nota{color:var(--tinta);font-size:1.02rem}
${B}.tv-cancion .tv-boton{background:linear-gradient(#ffe07a,#ffc22a 60%);color:#4a2e00;box-shadow:inset 0 -5px 0 #d99400,0 4px 10px rgba(150,95,0,.25)}

${B}.tv-regalo{padding:16px 16px 20px;border-radius:14px;background:#fff1e6}
${B}.tv-regalo::before{content:"";display:block;width:96px;height:96px;margin:-6px auto 4px;background:${regaloURI} center/contain no-repeat;animation:bloques-regalo 2.4s ease-in-out infinite}
${B}.tv-regalo-texto{font-size:1.3rem;color:#a94505;line-height:1.3}
${B}.tv-regalo-nota{font-size:1rem;color:var(--tinta);opacity:1;margin-top:8px}

/* Día 24 */
${B}.tv-modal.tv-final .tv-dia{padding-bottom:26px;background:${arcoiris} left bottom/100% 12px no-repeat,linear-gradient(180deg,#2c3f80,#1b2a5e 60%);color:#fff;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);text-shadow:0 2px 0 rgba(0,0,0,.35)}
${B}.tv-modal.tv-final .tv-tarjeta{--taco:${tacoAmarillo}}
${B}.tv-modal.tv-final .tv-msg{background:#fff8e1;font-size:1.25rem}
${B}.tv-modal.tv-final .tv-msg::before{width:48px;height:48px;background-image:${estrellaURI};animation:bloques-gira 8s linear infinite}

/* Aviso corto */
${B}.tv-toast{font-family:inherit;font-weight:600;font-size:1rem;background:#1b2a5e;color:#fff;border-radius:14px;padding:11px 18px 13px;
  box-shadow:inset 0 -4px 0 #0c1638,0 10px 24px rgba(0,0,0,.25)}

/* Escena animada */
${B}.bq-foco{animation:bloques-luz 1.8s ease-in-out infinite}
${B}.bq-foco1{animation-delay:-.6s}
${B}.bq-foco2{animation-delay:-1.2s}
${B}.bq-humo{animation:bloques-humo 4s ease-in-out infinite;transform-origin:250px 20px}
${B}.bq-nube1{animation:bloques-nube 9s ease-in-out infinite}
${B}.bq-nube2{animation:bloques-nube 11s ease-in-out infinite reverse}
${B}.bq-estrella{transform-origin:57px 116px;animation:bloques-latido 2.6s ease-in-out infinite}

@keyframes bloques-salto{0%,100%{transform:translateY(0)}45%{transform:translateY(-5px)}60%{transform:translateY(-5px) rotate(-1.2deg)}75%{transform:translateY(0) rotate(.8deg)}}
@keyframes bloques-chispa{0%,100%{transform:scale(.6) rotate(0);opacity:.35}50%{transform:scale(1) rotate(45deg);opacity:.95}}
@keyframes bloques-entra{from{transform:translateY(26px) scale(.86);opacity:0}to{transform:none;opacity:1}}
@keyframes bloques-luz{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes bloques-humo{0%{transform:translateY(4px);opacity:.2}40%{opacity:1}100%{transform:translate(6px,-8px);opacity:0}}
@keyframes bloques-nube{0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}
@keyframes bloques-latido{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
@keyframes bloques-gira{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
@keyframes bloques-regalo{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

@media (min-width:760px){
  ${B}.tv-puertas{grid-template-columns:repeat(8,minmax(0,1fr));grid-auto-rows:84px;max-width:860px;gap:22px 12px;padding:28px 16px 18px}
  ${B}.bq-num{font-size:2.1rem}
}
@media (min-width:1040px){
  ${B}.bq-pagina{display:grid;grid-template-columns:minmax(320px,400px) minmax(0,1fr);gap:40px;align-items:center;min-height:100vh;padding:28px 32px 88px}
  ${B}.bq-cabecera{position:sticky;top:24px}
  ${B}.tv-puertas{margin:0;max-width:none}
}
@media (prefers-reduced-motion: reduce){
  ${B}.tv-puerta,${B}.tv-puerta[data-estado="hoy"],${B}.bq-chispa,${B}.bq-foco,${B}.bq-humo,${B}.bq-nube1,${B}.bq-nube2,${B}.bq-estrella,
  ${B}.tv-modal.on .tv-tarjeta,${B}.tv-cancion::before,${B}.tv-regalo::before,${B}.tv-modal.tv-final .tv-msg::before{animation:none;transition:none}
}
`;

  /* ---------- Título con letras de colores ---------- */
  function titulo() {
    var k = 0;
    return "Calendario de adviento".split(" ").map(function (pal) {
      return '<span class="bq-palabra">' + pal.split("").map(function (l) {
        var c = C[["rojo", "azul", "amarillo", "verde", "naranja", "celeste"][k++ % 6]];
        var lc = c === C.amarillo ? "#f5ae00" : c === C.celeste ? "#159bd3" : c[0];
        return '<span class="bq-l" style="--lc:' + lc + ";--lo:" + c[2] + '">' + l + "</span>";
      }).join("") + "</span>";
    }).join(" ");
  }

  /* ---------- Efecto al abrir ---------- */
  function alAbrir(boton, n, capa) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
    return new Promise(function (listo) {
      var piezas = [];
      try {
        var r = boton.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var base = (getComputedStyle(boton).getPropertyValue("--b") || "").trim() || C.rojo[0];
        var puedeAnimar = typeof boton.animate === "function";
        if (puedeAnimar) {
          boton.animate([
            { transform: "scale(1)" },
            { transform: "scale(1.14,.82)", offset: .2 },
            { transform: "translateY(-8px) scale(.9,1.12)", offset: .45 },
            { transform: "translateY(0) scale(1.04,.96)", offset: .75 },
            { transform: "scale(1)" }
          ], { duration: 560, easing: "ease-out" });

          var aro = document.createElement("div");
          aro.className = "bq-aro";
          var d = Math.max(r.width, r.height);
          aro.style.cssText = "left:" + (cx - d / 2) + "px;top:" + (cy - d / 2) + "px;width:" + d + "px;height:" + d + "px";
          capa.appendChild(aro); piezas.push(aro);
          aro.animate([{ transform: "scale(.5)", opacity: .9 }, { transform: "scale(1.9)", opacity: 0 }], { duration: 520, easing: "ease-out", fill: "forwards" });

          var paleta = [base, base, C.rojo[0], C.azul[0], C.amarillo[0], C.verde[0], C.naranja[0], C.celeste[0]];
          var total = 14, alto = window.innerHeight || 800;
          for (var i = 0; i < total; i++) {
            var p = document.createElement("div");
            p.className = "bq-pieza";
            var ancho = 14 + Math.round(Math.random() * 12);
            var altoP = Math.round(ancho * (Math.random() < .5 ? .62 : .9));
            p.style.width = ancho + "px";
            p.style.height = altoP + "px";
            p.style.background = paleta[i % paleta.length];
            var x0 = cx - ancho / 2 + (Math.random() - .5) * r.width * .6;
            var y0 = cy - altoP / 2 + (Math.random() - .5) * r.height * .4;
            var ang = (i / total) * Math.PI * 2 + Math.random() * .4;
            var dx = Math.cos(ang) * (60 + Math.random() * 90);
            var sube = 70 + Math.random() * 90;
            var cae = Math.min(alto - y0 + 40, 180 + Math.random() * 140);
            var giro = (Math.random() < .5 ? -1 : 1) * (180 + Math.random() * 360);
            capa.appendChild(p); piezas.push(p);
            p.animate([
              { transform: "translate(" + x0 + "px," + y0 + "px) rotate(0deg) scale(.4)", opacity: 1, easing: "cubic-bezier(.2,.7,.4,1)" },
              { transform: "translate(" + (x0 + dx * .55) + "px," + (y0 - sube) + "px) rotate(" + giro * .4 + "deg) scale(1)", opacity: 1, offset: .38, easing: "cubic-bezier(.5,0,.9,.6)" },
              { transform: "translate(" + (x0 + dx) + "px," + (y0 + cae) + "px) rotate(" + giro + "deg) scale(.9)", opacity: 0 }
            ], { duration: 780 + Math.random() * 80, fill: "forwards" });
          }
        }
      } catch (e) { /* si algo falla, igual se abre */ }
      setTimeout(function () {
        piezas.forEach(function (p) { if (p.parentNode) p.parentNode.removeChild(p); });
        listo();
      }, 860);
    });
  }

  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "bloques",
    nombre: "Bloquecitos",
    emoji: "🧱",
    descripcion: "Bloques de juguete de colores y una casita para construir la Navidad",
    fuentes: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap",
    color: "#1f63d1",
    css: css,
    orden: [5, 18, 3, 11, 22, 9, 14, 1, 24, 7, 20, 2, 16, 10, 13, 21, 6, 12, 17, 4, 19, 23, 8, 15],
    escena: function () {
      return '<div class="bq-pagina">' +
        '<header class="bq-cabecera">' +
          '<h1 class="bq-titulo">' + titulo() + "</h1>" +
          '<p class="bq-sub">24 bloques, 24 sorpresas</p>' +
          '<div class="bq-casa">' + casaSVG() + "</div>" +
          '<p class="tv-para"></p>' +
          '<p class="tv-cuenta"></p>' +
          '<p class="bq-pista">Toca el bloque del día para descubrir tu sorpresa</p>' +
        "</header>" +
        '<div class="tv-puertas"></div>' +
      "</div>";
    },
    puerta: function (n, estado) {
      var grande = n === GRANDE || ANCHAS.indexOf(n) >= 0;
      var tacosH = '<span class="bq-tacos" aria-hidden="true">' + (grande ? "<i></i><i></i><i></i><i></i>" : "<i></i><i></i>") + "</span>";
      if (estado === "abierta") {
        return tacosH + '<span class="bq-cara"><span class="bq-hueco">' + icono(tipoDe(n), "bq-icono") + '</span><span class="bq-num-chico">' + n + "</span></span>";
      }
      var extra = "";
      if (estado === "bloqueada") extra = '<span class="bq-candado">' + CANDADO + "</span>";
      else if (estado === "hoy") extra = '<span class="bq-hoy" aria-hidden="true">¡Hoy!</span>';
      else extra = '<span class="bq-chispa">' + CHISPA + "</span>";
      return tacosH + '<span class="bq-cara"><span class="bq-num">' + n + "</span>" + (estado === "hoy" ? "" : extra) + "</span>" + (estado === "hoy" ? extra : "");
    },
    alAbrir: alAbrir
  });
})();
