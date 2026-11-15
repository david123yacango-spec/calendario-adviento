/* Estilo «Chocolatería»: fachada de una chocolatería con toldo y una caja de 24 bombones envueltos. Arte propio. */
(function () {
  "use strict";

  var P = "body.tema-chocolateria";
  var ID = "chocolateria";

  /* ---------- Piezas de dibujo (viewBox 0 0 100 100) ---------- */
  var FORMAS = [
    "M20 52a30 30 0 1 0 60 0a30 30 0 1 0 -60 0Z",
    "M33 23h34a12 12 0 0 1 12 12v34a12 12 0 0 1 -12 12h-34a12 12 0 0 1 -12 -12v-34a12 12 0 0 1 12 -12Z",
    "M50 84C30 70 17 58 17 42C17 31 25 23 35 23C42 23 47 27 50 32C53 27 58 23 65 23C75 23 83 31 83 42C83 58 70 70 50 84Z"
  ];
  /* Pirotín plisado (capacillo de papel) */
  var PIROTIN = (function () {
    var pts = [], N = 40;
    for (var i = 0; i < N; i++) {
      var a = (i / N) * Math.PI * 2, r = i % 2 ? 40.5 : 44.5;
      pts.push((50 + Math.cos(a) * r).toFixed(1) + " " + (52 + Math.sin(a) * r).toFixed(1));
    }
    return "M" + pts.join("L") + "Z";
  })();
  var PLIEGUES = (function () {
    var d = "", N = 20;
    for (var i = 0; i < N; i++) {
      var a = (i / N) * Math.PI * 2 + Math.PI / 20;
      d += "M" + (50 + Math.cos(a) * 33).toFixed(1) + " " + (52 + Math.sin(a) * 33).toFixed(1) +
        "L" + (50 + Math.cos(a) * 42).toFixed(1) + " " + (52 + Math.sin(a) * 42).toFixed(1);
    }
    return d;
  })();
  /* Papel abierto: estrella irregular */
  var PAPEL_ABIERTO = (function () {
    var pts = [], N = 14;
    for (var i = 0; i < N; i++) {
      var a = (i / N) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 31 : 40 + ((i * 7) % 5);
      pts.push((50 + Math.cos(a) * r).toFixed(1) + " " + (52 + Math.sin(a) * r).toFixed(1));
    }
    return "M" + pts.join("L") + "Z";
  })();

  var ICONOS = {
    mensaje: '<path d="M50 63C42.5 57.5 38 53.5 38 48C38 44.2 40.8 41.5 44.2 41.5C46.9 41.5 48.8 43 50 45.2C51.2 43 53.1 41.5 55.8 41.5C59.2 41.5 62 44.2 62 48C62 53.5 57.5 57.5 50 63Z" fill="currentColor" stroke="none"/>',
    foto: '<rect x="38" y="45" width="24" height="17" rx="3.5"/><circle cx="50" cy="53.5" r="4.6"/><path d="M45 45l2-4h6l2 4"/>',
    vale: '<path d="M37 44h26v5.5a3.5 3.5 0 0 0 0 7v5.5h-26v-5.5a3.5 3.5 0 0 0 0 -7z"/><path d="M50 46v14" stroke-dasharray="2.5 3"/>',
    cancion: '<path d="M47.5 60V43.5l13-3V57"/><circle cx="43.5" cy="60" r="4" fill="currentColor"/><circle cx="56.5" cy="57" r="4" fill="currentColor"/>',
    regalo: '<rect x="39" y="49" width="22" height="13" rx="1.5"/><rect x="37" y="44.5" width="26" height="5" rx="1.5"/><path d="M50 44.5V62"/><path d="M50 44.5c-2.5-5-9-6-8.5-2.2s8.5 2.2 8.5 2.2c0 0 8 2 8.5-2.2s-6-2.8-8.5 2.2"/>',
    final: '<path d="M50 39.5l3.8 7.8 8.6 1.2-6.2 6 1.5 8.5-7.7-4-7.7 4 1.5-8.5-6.2-6 8.6-1.2z" fill="currentColor" stroke="none"/>'
  };
  var CHOCOLATES = [
    { id: "amargo", glase: "#ead2a0", icono: "#fff1d6" },
    { id: "leche", glase: "#3b2116", icono: "#fff1d6" },
    { id: "blanco", glase: "#9a6440", icono: "#7a4426" }
  ];
  var LLAVE = '<svg class="ch-candado" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M6.5 9V6.8a3.5 3.5 0 0 1 7 0V9" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4.5" y="9" width="11" height="8.5" rx="2" fill="currentColor"/></svg>';

  function tipoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? "final" : d.tipo;
    } catch (e) { /* sin datos */ }
    return n === 24 ? "final" : "mensaje";
  }

  function pieza(n, estado) {
    var forma = n % 3, papel = estado === "hoy" ? "hoy" : String(n % 5);
    var choc = CHOCOLATES[Math.floor(n / 3) % 3];
    var s = '<svg class="ch-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">';
    s += '<ellipse cx="50" cy="90" rx="34" ry="5" fill="rgba(0,0,0,.35)"/>';
    s += '<path d="' + PIROTIN + '" fill="url(#chg-pirotin' + (estado === "hoy" ? "-oro" : "") + ')"/>';
    s += '<path d="' + PLIEGUES + '" stroke="rgba(0,0,0,.28)" stroke-width="1" fill="none"/>';
    s += '<circle cx="50" cy="52" r="33" fill="rgba(0,0,0,.22)"/>';
    if (estado === "abierta") {
      s += '<path d="' + PAPEL_ABIERTO + '" fill="url(#chg-papel' + papel + ')" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>';
      s += '<path d="' + PAPEL_ABIERTO + '" fill="rgba(0,0,0,.18)" transform="translate(50 52) scale(.86) translate(-50 -52)"/>';
      s += '<g transform="translate(50 53) scale(.8) translate(-50 -52)">';
      s += '<path d="' + FORMAS[forma] + '" fill="url(#chg-choc-' + choc.id + ')" stroke="rgba(0,0,0,.3)" stroke-width="1"/>';
      s += '<path d="' + FORMAS[forma] + '" fill="url(#chg-brillo)" />';
      s += '<path d="M24 36q8 6 16 0t16 0t16 0t14 0" stroke="' + choc.glase + '" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75" clip-path="url(#chg-clip' + forma + ')"/>';
      s += '</g>';
      s += '<g fill="none" stroke="' + choc.icono + '" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="color:' + choc.icono + '">' + (ICONOS[tipoDe(n)] || ICONOS.mensaje) + '</g>';
    } else {
      s += '<path d="' + FORMAS[forma] + '" fill="url(#chg-papel' + papel + ')"/>';
      s += '<g clip-path="url(#chg-clip' + forma + ')">';
      s += '<path d="M24 40l12 7-5 11 9 9M58 28l8 12-6 11 12 8M36 76l12-8 9 11M70 62l-8 10" stroke="rgba(255,255,255,.5)" stroke-width="1.2" fill="none" stroke-linejoin="round"/>';
      s += '<path d="M27 42l12 7-5 11 9 9M61 29l8 12-6 11 12 8M38 78l12-8 9 11" stroke="rgba(0,0,0,.18)" stroke-width="1.2" fill="none" stroke-linejoin="round"/>';
      s += '<ellipse cx="36" cy="36" rx="13" ry="6" transform="rotate(-35 36 36)" fill="#fff" opacity=".38"/>';
      if (estado === "bloqueada") {
        s += '<rect x="44" y="0" width="12" height="100" fill="url(#chg-cinta)"/><rect x="0" y="46" width="100" height="12" fill="url(#chg-cinta)"/>';
      }
      s += '</g>';
      s += '<path d="' + FORMAS[forma] + '" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1"/>';
    }
    s += '</svg>';
    return s;
  }

  /* ---------- Escena ---------- */
  function defs() {
    var papeles = [
      ["#f08a7c", "#d2483e", "#8f231d"],
      ["#fbe9b4", "#d7ae5c", "#93692a"],
      ["#fbd9cb", "#d79a85", "#9a5a48"],
      ["#d9a27c", "#8d5634", "#4f2c19"],
      ["#fffbf1", "#e9d8b8", "#b79c71"]
    ];
    var s = '<svg class="ch-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>';
    papeles.forEach(function (c, i) {
      s += '<linearGradient id="chg-papel' + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".45" stop-color="' + c[1] + '"/><stop offset=".62" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    });
    s += '<linearGradient id="chg-papelhoy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4c9"/><stop offset=".4" stop-color="#e7bd5e"/><stop offset=".6" stop-color="#fff0b8"/><stop offset="1" stop-color="#a87623"/></linearGradient>';
    s += '<radialGradient id="chg-pirotin" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#7d4a2c"/><stop offset="1" stop-color="#4a2817"/></radialGradient>';
    s += '<radialGradient id="chg-pirotin-oro" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#e2c07a"/><stop offset="1" stop-color="#8f6a2c"/></radialGradient>';
    s += '<radialGradient id="chg-choc-amargo" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#5e3423"/><stop offset="1" stop-color="#26120a"/></radialGradient>';
    s += '<radialGradient id="chg-choc-leche" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#b47a4f"/><stop offset="1" stop-color="#6b3c22"/></radialGradient>';
    s += '<radialGradient id="chg-choc-blanco" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fffaee"/><stop offset="1" stop-color="#e3caa2"/></radialGradient>';
    s += '<linearGradient id="chg-brillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>';
    s += '<linearGradient id="chg-cinta" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6e6"/><stop offset=".5" stop-color="#ecd9b8"/><stop offset="1" stop-color="#fff6e6"/></linearGradient>';
    FORMAS.forEach(function (d, i) { s += '<clipPath id="chg-clip' + i + '"><path d="' + d + '"/></clipPath>'; });
    s += '</defs></svg>';
    return s;
  }

  function fachada() {
    var s = '<svg class="ch-fachada" viewBox="0 0 400 252" role="img" aria-label="Fachada de una chocolatería con toldo de rayas y vitrinas iluminadas" focusable="false">';
    s += '<defs>' +
      '<linearGradient id="chf-pared" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7e9d0"/><stop offset="1" stop-color="#ead2ac"/></linearGradient>' +
      '<linearGradient id="chf-vidrio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6de"/><stop offset="1" stop-color="#f5c983"/></linearGradient>' +
      '<linearGradient id="chf-toldo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></linearGradient>' +
      '<linearGradient id="chf-sombra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3420" stop-opacity=".28"/><stop offset="1" stop-color="#5a3420" stop-opacity="0"/></linearGradient>' +
      '</defs>';
    /* pared y pilastras */
    s += '<rect x="24" y="40" width="352" height="200" fill="url(#chf-pared)"/>';
    s += '<rect x="24" y="40" width="14" height="200" fill="#8b5a3c"/><rect x="362" y="40" width="14" height="200" fill="#8b5a3c"/>';
    s += '<rect x="22" y="228" width="18" height="12" fill="#6a3c24"/><rect x="360" y="228" width="18" height="12" fill="#6a3c24"/>';
    /* cornisa */
    s += '<rect x="10" y="18" width="380" height="9" rx="4.5" fill="#3b2116"/><rect x="16" y="26" width="368" height="18" rx="3" fill="#5a3420"/>';
    for (var x = 22; x < 380; x += 12) s += '<rect x="' + x + '" y="44" width="7" height="5" fill="#4a2a1a"/>';
    /* guirnalda con luces */
    s += '<path d="M16 32Q62 52 108 32T200 32T292 32T384 32" stroke="#3d6b47" stroke-width="7" fill="none" stroke-linecap="round"/>';
    s += '<path d="M16 32Q62 52 108 32T200 32T292 32T384 32" stroke="#5c8f63" stroke-width="2" fill="none" stroke-dasharray="2 5" stroke-linecap="round"/>';
    var luces = [[38, 38, "#ffd27a"], [62, 42, "#e05a4e"], [86, 38, "#fff3d6"], [130, 38, "#ffd27a"], [154, 42, "#e05a4e"], [178, 38, "#fff3d6"], [222, 38, "#ffd27a"], [246, 42, "#e05a4e"], [270, 38, "#fff3d6"], [314, 38, "#ffd27a"], [338, 42, "#e05a4e"], [362, 38, "#fff3d6"]];
    luces.forEach(function (l, i) {
      s += '<circle class="ch-luz" style="--d:' + (i % 3) + '" cx="' + l[0] + '" cy="' + l[1] + '" r="3.4" fill="' + l[2] + '"/>';
    });
    [[108, 32], [200, 32], [292, 32]].forEach(function (p) {
      s += '<g transform="translate(' + p[0] + ' ' + p[1] + ')"><path d="M0 0c-6-6-14-5-12 0s12 0 12 0c0 0 10 5 12 0s-6-6-12 0" fill="#c8463d"/><path d="M0 0l-5 11M0 0l5 11" stroke="#c8463d" stroke-width="3" stroke-linecap="round"/><circle r="2.6" fill="#a8352d"/></g>';
    });
    /* letrero */
    s += '<rect x="96" y="54" width="208" height="44" rx="11" fill="#3b2116" stroke="#c9a15b" stroke-width="3"/>';
    s += '<rect x="103" y="61" width="194" height="30" rx="7" fill="none" stroke="#c9a15b" stroke-opacity=".45"/>';
    s += '<text x="200" y="86" text-anchor="middle" font-family="Parisienne, \'Brush Script MT\', cursive" font-size="28" fill="#ecd39a">Chocolatería</text>';
    s += '<path d="M116 76l2.4-5 2.4 5-5-3h5.2zM279 76l2.4-5 2.4 5-5-3h5.2z" fill="#c9a15b"/>';
    /* toldo */
    s += '<rect x="34" y="104" width="332" height="7" rx="3" fill="#7a2620"/>';
    for (var i = 0; i < 10; i++) {
      var col = i % 2 ? "#fbf3e4" : "#c8463d";
      var tx = 40 + 32 * i, bx = 30 + 34 * i;
      s += '<path d="M' + tx + ' 110L' + (tx + 32) + ' 110L' + (bx + 34) + ' 136L' + bx + ' 136Z" fill="' + col + '"/>';
      s += '<circle cx="' + (bx + 17) + '" cy="136" r="17" fill="' + col + '"/>';
    }
    s += '<path d="M40 110H360L370 136V140H30V136Z" fill="url(#chf-toldo)"/>';
    s += '<rect x="38" y="153" width="324" height="22" fill="url(#chf-sombra)"/>';
    /* vitrinas */
    [46, 234].forEach(function (vx, k) {
      s += '<rect x="' + (vx - 6) + '" y="156" width="132" height="78" rx="7" fill="#5a3420"/>';
      s += '<rect x="' + vx + '" y="162" width="120" height="66" rx="3" fill="url(#chf-vidrio)"/>';
      s += '<path d="M' + vx + ' 190h120M' + vx + ' 214h120" stroke="#a8714a" stroke-width="3"/>';
      if (k === 0) {
        s += '<g><circle cx="' + (vx + 18) + '" cy="184" r="5.5" fill="#5e3423"/><circle cx="' + (vx + 32) + '" cy="184" r="5.5" fill="#d2483e"/><circle cx="' + (vx + 46) + '" cy="184" r="5.5" fill="#d7ae5c"/><circle cx="' + (vx + 60) + '" cy="184" r="5.5" fill="#b47a4f"/>' +
          '<rect x="' + (vx + 76) + '" y="170" width="16" height="19" rx="4" fill="#fff" fill-opacity=".55" stroke="#a8714a"/><circle cx="' + (vx + 84) + '" cy="182" r="3" fill="#e9a9a0"/><circle cx="' + (vx + 81) + '" cy="177" r="2.4" fill="#d7ae5c"/>' +
          '<rect x="' + (vx + 98) + '" y="172" width="16" height="17" rx="4" fill="#fff" fill-opacity=".55" stroke="#a8714a"/><circle cx="' + (vx + 106) + '" cy="183" r="3" fill="#5e3423"/>' +
          '<rect x="' + (vx + 10) + '" y="200" width="44" height="13" rx="2" fill="#6b3c22"/><path d="M' + (vx + 21) + ' 200v13M' + (vx + 32) + ' 200v13M' + (vx + 43) + ' 200v13" stroke="#4a2817" stroke-width="1.4"/>' +
          '<rect x="' + (vx + 64) + '" y="198" width="22" height="15" rx="2" fill="#d2483e"/><path d="M' + (vx + 75) + ' 198v15" stroke="#fbe9b4" stroke-width="2"/>' +
          '<circle cx="' + (vx + 98) + '" cy="208" r="5" fill="#fffaee"/><circle cx="' + (vx + 110) + '" cy="208" r="5" fill="#b47a4f"/></g>';
      } else {
        s += '<g><rect x="' + (vx + 38) + '" y="176" width="44" height="13" rx="3" fill="#8d5634"/><rect x="' + (vx + 44) + '" y="166" width="32" height="11" rx="3" fill="#b47a4f"/><path d="M' + (vx + 38) + ' 180q5 4 11 0t11 0t11 0t11 0" stroke="#fffaee" stroke-width="2.4" fill="none"/><circle cx="' + (vx + 60) + '" cy="163" r="3.6" fill="#d2483e"/>' +
          '<circle cx="' + (vx + 14) + '" cy="184" r="5.5" fill="#d7ae5c"/><circle cx="' + (vx + 104) + '" cy="184" r="5.5" fill="#5e3423"/>' +
          '<path d="M' + (vx + 14) + ' 213l8-14 8 14z" fill="#3d6b47"/><circle cx="' + (vx + 22) + '" cy="199" r="1.8" fill="#ffd27a"/>' +
          '<rect x="' + (vx + 40) + '" y="202" width="20" height="11" rx="2" fill="#e9d8b8"/><rect x="' + (vx + 64) + '" y="200" width="20" height="13" rx="2" fill="#5e3423"/><path d="M' + (vx + 64) + ' 206h20" stroke="#d2483e" stroke-width="2.4"/>' +
          '<circle cx="' + (vx + 98) + '" cy="208" r="5" fill="#d2483e"/><circle cx="' + (vx + 110) + '" cy="208" r="5" fill="#fbd9cb"/></g>';
      }
      s += '<path d="M' + (vx + 6) + ' 166l16-0M' + (vx + 6) + ' 166l0 14" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>';
      /* macetero */
      s += '<rect x="' + (vx - 8) + '" y="230" width="136" height="9" rx="3" fill="#6a3c24"/>';
      for (var h = 0; h < 9; h++) {
        var hx = vx - 2 + h * 15;
        s += '<ellipse cx="' + hx + '" cy="228" rx="7" ry="4" fill="#3d6b47"/><circle cx="' + (hx + 4) + '" cy="226" r="2.3" fill="#d2483e"/>';
      }
    });
    /* puerta */
    s += '<path d="M178 240V170a22 22 0 0 1 44 0V240Z" fill="#5a3420"/>';
    s += '<path d="M183 240V171a17 17 0 0 1 34 0V240Z" fill="#4a2817"/>';
    s += '<circle cx="200" cy="172" r="10" fill="url(#chf-vidrio)" stroke="#c9a15b" stroke-width="1.5"/>';
    s += '<circle cx="200" cy="203" r="10" fill="none" stroke="#3d6b47" stroke-width="6"/><circle cx="200" cy="203" r="10" fill="none" stroke="#5c8f63" stroke-width="1.6" stroke-dasharray="2 4"/>';
    s += '<circle cx="193" cy="196" r="1.6" fill="#d2483e"/><circle cx="207" cy="208" r="1.6" fill="#d2483e"/><circle cx="191" cy="208" r="1.6" fill="#ffd27a"/>';
    s += '<path d="M200 212c-4-4-9-3-8 0s8 0 8 0c0 0 7 3 8 0s-4-4-8 0" fill="#c8463d"/>';
    s += '<rect x="184" y="220" width="32" height="9" rx="2" fill="#fbf3e4"/><text x="200" y="227" text-anchor="middle" font-family="Nunito, sans-serif" font-size="5" font-weight="800" fill="#8f231d" letter-spacing=".2">ABIERTO</text>';
    s += '<circle cx="213" cy="214" r="1.8" fill="#c9a15b"/>';
    /* vereda */
    s += '<rect x="170" y="238" width="60" height="5" rx="1.5" fill="#b99a72"/>';
    s += '<rect x="0" y="241" width="400" height="11" rx="4" fill="#d9c3a0"/>';
    s += '</svg>';
    return s;
  }

  function lazo() {
    return '<svg class="ch-lazo" viewBox="0 0 120 60" aria-hidden="true" focusable="false">' +
      '<path d="M60 30C46 8 18 6 20 24S52 34 60 30Z" fill="#c8463d"/><path d="M60 30C74 8 102 6 100 24S68 34 60 30Z" fill="#c8463d"/>' +
      '<path d="M60 30C48 16 30 14 30 22S50 31 60 30Z" fill="#a8352d"/><path d="M60 30C72 16 90 14 90 22S70 31 60 30Z" fill="#a8352d"/>' +
      '<path d="M57 32L44 58L52 55L56 60L60 34ZM63 32L76 58L68 55L64 60L60 34Z" fill="#b23a32"/>' +
      '<rect x="52" y="23" width="16" height="15" rx="6" fill="#d9544a"/><path d="M55 27h7" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* ---------- Imágenes de la tarjeta ---------- */
  function uri(svg) { return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")'; }
  var IMG_REGALO = uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 110">' +
    '<ellipse cx="60" cy="103" rx="40" ry="5" fill="#5a3420" opacity=".18"/>' +
    '<rect x="20" y="46" width="80" height="56" rx="6" fill="#8d5634"/><rect x="20" y="46" width="80" height="12" fill="#6b3c22" opacity=".5"/>' +
    '<rect x="14" y="34" width="92" height="18" rx="5" fill="#a8693f"/>' +
    '<rect x="53" y="34" width="14" height="68" fill="#c8463d"/><rect x="53" y="34" width="5" height="68" fill="#fff" opacity=".18"/>' +
    '<path d="M60 34C48 10 24 12 30 26S56 34 60 34Z" fill="#c8463d"/><path d="M60 34C72 10 96 12 90 26S64 34 60 34Z" fill="#c8463d"/>' +
    '<path d="M60 34C50 20 38 20 38 26S54 33 60 34Z" fill="#a8352d"/><path d="M60 34C70 20 82 20 82 26S66 33 60 34Z" fill="#a8352d"/>' +
    '<rect x="53" y="27" width="14" height="12" rx="5" fill="#d9544a"/>' +
    '<circle cx="34" cy="74" r="3" fill="#e8cf94"/><circle cx="86" cy="84" r="3" fill="#e8cf94"/><circle cx="40" cy="92" r="2" fill="#e8cf94"/><circle cx="82" cy="64" r="2" fill="#e8cf94"/>' +
    '</svg>');
  var IMG_CORAZON = uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<defs><radialGradient id="a" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#d2483e"/><stop offset="1" stop-color="#8f231d"/></radialGradient></defs>' +
    '<path d="M50 88C28 72 12 59 12 40C12 27 22 18 34 18C42 18 47 22 50 28C53 22 58 18 66 18C78 18 88 27 88 40C88 59 72 72 50 88Z" fill="url(#a)"/>' +
    '<path d="M26 34q8-10 18-6" stroke="#fff" stroke-opacity=".45" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<path d="M22 50q7 5 14 0t14 0t14 0t14 0" stroke="#f3dc9a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '</svg>');
  var IMG_PAPEL = uri('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="6" cy="8" r="1" fill="#c9a15b" opacity=".18"/><circle cx="26" cy="28" r="1.2" fill="#8b5a3c" opacity=".1"/></svg>');
  var IMG_FONDO = uri('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><g fill="#8b5a3c" opacity=".09"><circle cx="8" cy="10" r="2"/><circle cx="40" cy="42" r="2"/></g><g fill="#c8463d" opacity=".09"><rect x="44" y="12" width="7" height="2.6" rx="1.3" transform="rotate(30 47 13)"/><rect x="12" y="44" width="7" height="2.6" rx="1.3" transform="rotate(-25 15 45)"/></g></svg>');

  /* ---------- CSS ---------- */
  var css = `
${P} {
  --ch-crema: #fbf3e4; --ch-crema2: #f3e2c7; --ch-leche: #8b5a3c; --ch-cacao: #5a3420; --ch-amargo: #3b2116;
  --ch-rojo: #c8463d; --ch-rojo-osc: #a8352d; --ch-oro: #c9a15b; --ch-oro-claro: #e8cf94;
  margin: 0; color: var(--ch-amargo);
  font-family: "Nunito", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  background-color: var(--ch-crema);
  background-image: radial-gradient(120% 60% at 50% 0%, #fff9ef 0%, rgba(255,249,239,0) 70%), ${IMG_FONDO};
  background-attachment: fixed, scroll;
}
${P} #tv-escena { overflow-x: hidden; }
${P} .ch-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
${P} .ch-pagina { max-width: 760px; margin: 0 auto; padding: 14px 0 96px; }
${P} .ch-cabecera { padding: 0 16px; text-align: center; }
${P} .ch-tienda { max-width: 560px; margin: 0 auto; filter: drop-shadow(0 10px 18px rgba(90,52,32,.18)); }
${P} .ch-fachada { display: block; width: 100%; height: auto; }
${P} .ch-luz { animation: chocolateria-luz 2.4s ease-in-out infinite; animation-delay: calc(var(--d) * -.8s); }
${P} .ch-titulos { margin-top: 14px; }
${P} .tv-para {
  margin: 0; font-family: "Parisienne", "Brush Script MT", cursive; font-size: 2.3rem; line-height: 1.1;
  color: var(--ch-rojo-osc);
}
${P} .ch-titulo {
  margin: 2px 0 4px; font-family: "Fraunces", Georgia, serif; font-weight: 700; font-size: 1.9rem; line-height: 1.12;
  letter-spacing: -.01em; color: var(--ch-amargo);
}
${P} .ch-sub { margin: 0 auto; max-width: 30ch; font-size: .98rem; color: #7a4a2c; }
${P} .ch-adorno { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 10px 0 0; color: var(--ch-oro); }
${P} .ch-adorno::before, ${P} .ch-adorno::after { content: ""; width: 54px; height: 1.5px; background: linear-gradient(90deg, transparent, var(--ch-oro)); }
${P} .ch-adorno::after { transform: scaleX(-1); }
${P} .ch-adorno span { width: 8px; height: 8px; transform: rotate(45deg); background: var(--ch-oro); border-radius: 1px; }
${P} .tv-cuenta {
  display: inline-block; margin: 12px auto 0; padding: 7px 14px; border-radius: 999px;
  background: #fff8ec; border: 1px solid #e6cfa6; color: var(--ch-cacao); font-weight: 700; font-size: .92rem;
  box-shadow: 0 2px 8px rgba(90,52,32,.08);
}
${P} .tv-cuenta[hidden] { display: none; }

/* Caja de bombones */
${P} .ch-caja {
  position: relative; margin: 40px 16px 0; padding: 26px 12px 14px;
  border-radius: 24px;
  background: linear-gradient(160deg, #6a3c24 0%, #4f2c1a 55%, #42241a 100%);
  box-shadow: inset 0 0 0 3px var(--ch-oro), inset 0 0 0 6px #4a2817, inset 0 0 0 7px rgba(232,207,148,.45),
    0 22px 44px -12px rgba(59,33,22,.55), 0 4px 10px rgba(59,33,22,.2);
}
${P} .ch-lazo { position: absolute; left: 50%; top: -30px; width: 108px; height: 54px; transform: translateX(-50%); filter: drop-shadow(0 4px 4px rgba(0,0,0,.25)); }
${P} .ch-etiqueta {
  margin: 0 0 12px; text-align: center; font-family: "Fraunces", Georgia, serif; font-style: italic;
  font-size: .86rem; letter-spacing: .04em; color: var(--ch-oro-claro);
}
${P} .tv-puertas {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px;
  padding: 10px; border-radius: 16px;
  background: radial-gradient(130% 100% at 50% 0%, #3e2216 0%, #2c170e 100%);
  box-shadow: inset 0 2px 10px rgba(0,0,0,.55), 0 1px 0 rgba(255,230,190,.12);
}

/* Puertas (bombones) */
${P} .tv-puerta {
  position: relative; display: block; aspect-ratio: 1 / 1; width: 100%; min-height: 44px; padding: 0; margin: 0;
  border: 0; border-radius: 24%; color: var(--ch-amargo); background: radial-gradient(circle at 50% 42%, #2a160d 0%, #1f0f08 72%);
  box-shadow: inset 0 3px 7px rgba(0,0,0,.6), inset 0 -1px 0 rgba(255,220,170,.1), 0 1px 0 rgba(255,230,190,.1);
  container-type: inline-size; cursor: pointer; -webkit-tap-highlight-color: transparent;
}
${P} .tv-puerta:focus-visible { outline: 3px solid #ffd27a; outline-offset: 2px; }
${P} .ch-pieza { position: absolute; inset: 0; transition: transform .18s ease; }
${P} .ch-svg { position: absolute; inset: 2%; width: 96%; height: 96%; display: block; }
${P} .tv-puerta:not([data-estado="bloqueada"]):hover .ch-pieza { transform: translateY(-2px) scale(1.04); }
${P} .tv-puerta:active .ch-pieza { transform: scale(.96); }
${P} .ch-num {
  position: absolute; left: 50%; top: 53%; transform: translate(-50%, -50%);
  width: 46%; aspect-ratio: 1 / 1; border-radius: 50%; display: grid; place-items: center;
  background: radial-gradient(circle at 40% 35%, #fffdf7 0%, #f3e3c6 100%);
  box-shadow: 0 0 0 1.5px var(--ch-oro), 0 2px 4px rgba(0,0,0,.3);
  font-family: "Nunito", system-ui, sans-serif; font-weight: 800; color: var(--ch-amargo);
  font-size: 14px; font-size: max(14px, 22cqw); line-height: 1; font-variant-numeric: lining-nums tabular-nums; letter-spacing: -.02em;
}
${P} .tv-puerta[data-estado="bloqueada"] .ch-svg { filter: saturate(.72) brightness(.9); }
${P} .tv-puerta[data-estado="bloqueada"] .ch-num { background: radial-gradient(circle at 40% 35%, #fbf3e4 0%, #e4cfaa 100%); color: #5a3420; }
${P} .ch-candado { position: absolute; right: 7%; top: 7%; width: 19%; height: 19%; color: rgba(232,207,148,.85); filter: drop-shadow(0 1px 1px rgba(0,0,0,.5)); }
${P} .tv-puerta[data-estado="hoy"] {
  box-shadow: inset 0 3px 7px rgba(0,0,0,.6), 0 0 0 2px var(--ch-oro-claro), 0 0 18px 3px rgba(255,205,120,.5);
  animation: chocolateria-brillo 2.4s ease-in-out infinite; z-index: 1;
}
${P} .tv-puerta[data-estado="hoy"] .ch-pieza { animation: chocolateria-flota 2.4s ease-in-out infinite; }
${P} .tv-puerta[data-estado="hoy"] .ch-num { box-shadow: 0 0 0 1.5px #a87623, 0 2px 4px rgba(0,0,0,.3); }
${P} .ch-hoy {
  position: absolute; left: 50%; top: -9px; transform: translateX(-50%); z-index: 2;
  padding: 2px 8px; border-radius: 999px; background: var(--ch-rojo); color: #fff;
  font: 800 11px/1.3 "Nunito", system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,.35); white-space: nowrap;
}
${P} .ch-destello { position: absolute; width: 14%; height: 14%; right: 12%; top: 16%; pointer-events: none; animation: chocolateria-destello 2.4s ease-in-out infinite; }
${P} .ch-destello::before, ${P} .ch-destello::after { content: ""; position: absolute; left: 50%; top: 50%; background: #fff; border-radius: 2px; transform: translate(-50%, -50%); }
${P} .ch-destello::before { width: 100%; height: 18%; }
${P} .ch-destello::after { width: 18%; height: 100%; }
${P} .ch-num-abierta {
  position: absolute; right: 4%; bottom: 4%; min-width: 24px; padding: 1px 5px; border-radius: 999px;
  background: #fbf3e4; color: var(--ch-amargo); box-shadow: 0 0 0 1px var(--ch-oro), 0 1px 3px rgba(0,0,0,.4);
  font: 800 13px/1.35 "Nunito", system-ui, sans-serif; text-align: center; font-variant-numeric: lining-nums tabular-nums;
}
${P} .ch-pie { margin: 18px 16px 0; text-align: center; font-size: .9rem; color: #7a4a2c; }
${P} .ch-pie b { font-family: "Parisienne", cursive; font-weight: 400; font-size: 1.35rem; color: var(--ch-rojo-osc); }

@media (min-width: 640px) {
  ${P} .tv-puertas { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; padding: 14px; }
  ${P} .ch-caja { margin: 44px auto 0; max-width: 680px; padding: 30px 16px 18px; }
  ${P} .ch-titulo { font-size: 2.3rem; }
  ${P} .tv-para { font-size: 2.6rem; }
  ${P} .ch-hoy { font-size: 12px; }
  ${P} .ch-num-abierta { font-size: 13px; }
}
@media (min-width: 1000px) {
  ${P} .ch-pagina {
    max-width: 1180px; padding: 40px 32px 96px;
    display: grid; grid-template-columns: minmax(0, 460px) minmax(0, 640px); gap: 20px 56px;
    align-items: center; justify-content: center;
  }
  ${P} .ch-cabecera { padding: 0; }
  ${P} .ch-caja { margin: 30px 0 0; max-width: none; }
  ${P} .ch-pie { grid-column: 1 / -1; margin-top: 8px; }
}

/* Tarjeta */
${P} .tv-modal { background: rgba(43,24,14,.62); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }
${P} .tv-tarjeta {
  max-width: 400px; padding: 0 22px 22px; border-radius: 22px; color: var(--ch-amargo);
  background-color: #fffaf1; background-image: ${IMG_PAPEL};
  border: 1px solid #e6d3b3;
  box-shadow: 0 30px 60px -20px rgba(20,8,2,.65), 0 0 0 6px rgba(251,243,228,.18);
  font-family: "Nunito", system-ui, sans-serif;
}
${P} .tv-modal.on .tv-tarjeta { animation: chocolateria-tarjeta .42s cubic-bezier(.2,.9,.3,1.25) both; }
${P} .tv-tarjeta::before {
  content: ""; display: block; height: 24px; margin: 0 -22px 18px;
  background: repeating-linear-gradient(90deg, var(--ch-rojo) 0 18px, #f0dcb8 18px 36px);
  -webkit-mask: linear-gradient(#000 0 0) top / 100% 14px no-repeat, radial-gradient(circle 9px at 9px 14px, #000 97%, transparent 100%) 0 0 / 18px 24px repeat-x;
          mask: linear-gradient(#000 0 0) top / 100% 14px no-repeat, radial-gradient(circle 9px at 9px 14px, #000 97%, transparent 100%) 0 0 / 18px 24px repeat-x;
}
${P} .tv-dia {
  margin: 0 0 14px; font-family: "Fraunces", Georgia, serif; font-weight: 700; font-size: 1.6rem; color: var(--ch-cacao);
}
${P} .tv-dia::after { content: ""; display: block; width: 52px; height: 2px; margin: 8px auto 0; background: linear-gradient(90deg, transparent, var(--ch-oro), transparent); }
${P} .tv-contenido { margin: 0 0 16px; }
${P} .tv-msg {
  position: relative; margin: 0; padding: 26px 6px 4px;
  font-family: "Fraunces", Georgia, serif; font-style: italic; font-size: 1.18rem; line-height: 1.55; color: var(--ch-amargo);
}
${P} .tv-msg::before {
  content: "\\201C"; position: absolute; left: 50%; top: -8px; transform: translateX(-50%);
  font-size: 3.2rem; line-height: 1; color: var(--ch-oro); font-style: normal;
}
${P} .tv-foto { margin: 4px 6px 0; padding: 10px 10px 6px; background: #fff; border-radius: 6px; transform: rotate(-1.6deg);
  box-shadow: 0 10px 22px -8px rgba(59,33,22,.45), 0 0 0 1px #eadbc0; }
${P} .tv-foto img { border-radius: 3px; }
${P} .tv-foto figcaption { margin-top: 6px; font-family: "Parisienne", cursive; font-size: 1.55rem; line-height: 1.2; color: var(--ch-rojo-osc); }
${P} .tv-vale {
  position: relative; border: 0; border-radius: 14px; padding: 22px 26px; color: var(--ch-crema);
  background:
    repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 2px, transparent 2px 25%),
    repeating-linear-gradient(0deg, rgba(0,0,0,.14) 0 2px, transparent 2px 50%),
    linear-gradient(160deg, #7d4a2c, #4f2c1a);
  box-shadow: inset 0 2px 0 rgba(255,255,255,.12), 0 10px 20px -10px rgba(59,33,22,.6);
  -webkit-mask: radial-gradient(circle 11px at 0 50%, transparent 97%, #000 100%) left / 51% 100% no-repeat, radial-gradient(circle 11px at 100% 50%, transparent 97%, #000 100%) right / 51% 100% no-repeat;
          mask: radial-gradient(circle 11px at 0 50%, transparent 97%, #000 100%) left / 51% 100% no-repeat, radial-gradient(circle 11px at 100% 50%, transparent 97%, #000 100%) right / 51% 100% no-repeat;
}
${P} .tv-vale::before { content: ""; position: absolute; inset: 9px 16px; border: 1.5px dashed rgba(232,207,148,.6); border-radius: 9px; pointer-events: none; }
${P} .tv-vale-por { font-family: "Fraunces", Georgia, serif; font-size: .8rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--ch-oro-claro); }
${P} .tv-vale-que { margin: 4px 0 2px; font-family: "Fraunces", Georgia, serif; font-size: 1.65rem; line-height: 1.15; font-weight: 700; color: #fff7e8; }
${P} .tv-vale-nota { margin: 8px 0 0; font-size: .9rem; opacity: 1; color: #f3e2c7; }
${P} .tv-cancion::before {
  content: ""; display: block; width: 116px; height: 116px; margin: 2px auto 14px; border-radius: 50%;
  background:
    radial-gradient(circle, #fbf3e4 0 5px, var(--ch-rojo) 5.5px 22px, transparent 22.5px),
    repeating-radial-gradient(circle, #3b2116 0 2px, #4f2c1a 2px 4px);
  box-shadow: 0 10px 22px -8px rgba(59,33,22,.6), inset 0 0 0 3px #2b170e;
  animation: chocolateria-gira 6s linear infinite;
}
${P} .tv-cancion-titulo { font-family: "Fraunces", Georgia, serif; font-size: 1.35rem; color: var(--ch-cacao); }
${P} .tv-cancion-nota { color: #6b3c22; }
${P} .tv-boton {
  border: 0; background: linear-gradient(180deg, #d0544a, var(--ch-rojo-osc)); color: #fff;
  box-shadow: 0 6px 14px -6px rgba(168,53,45,.8), inset 0 1px 0 rgba(255,255,255,.25); font-family: "Nunito", system-ui, sans-serif; font-weight: 800;
}
${P} .tv-boton:hover { filter: brightness(1.06); }
${P} .tv-regalo::before { content: ""; display: block; width: 108px; height: 100px; margin: 0 auto 10px; background: ${IMG_REGALO} center / contain no-repeat; }
${P} .tv-regalo-texto { font-family: "Fraunces", Georgia, serif; font-size: 1.28rem; line-height: 1.3; color: var(--ch-cacao); }
${P} .tv-regalo-nota { font-size: .95rem; opacity: 1; color: #6b3c22; margin-top: 8px; }
${P} .tv-firma { margin: 0 0 16px; font-family: "Parisienne", cursive; font-style: normal; font-size: 1.6rem; opacity: 1; color: var(--ch-rojo-osc); }
${P} .tv-cerrar {
  min-width: 140px; background: transparent; color: var(--ch-cacao); border: 2px solid var(--ch-cacao);
  font-family: "Nunito", system-ui, sans-serif; font-weight: 800; transition: background .15s, color .15s;
}
${P} .tv-cerrar:hover { background: var(--ch-cacao); color: var(--ch-crema); }
${P} .tv-cerrar:focus-visible, ${P} .tv-boton:focus-visible { outline: 3px solid var(--ch-rojo); outline-offset: 3px; }
${P} .tv-modal.tv-final .tv-tarjeta {
  background-color: #fff6e6; border: 2px solid var(--ch-oro);
  box-shadow: 0 30px 60px -20px rgba(20,8,2,.65), 0 0 0 6px rgba(232,207,148,.35), 0 0 40px rgba(255,210,122,.35);
}
${P} .tv-modal.tv-final .tv-contenido::before { content: ""; display: block; width: 74px; height: 74px; margin: 0 auto 4px; background: ${IMG_CORAZON} center / contain no-repeat; filter: drop-shadow(0 6px 8px rgba(143,35,29,.35)); }
${P} .tv-modal.tv-final .tv-dia { color: var(--ch-rojo-osc); }
${P} .tv-modal.tv-final .tv-msg::before { content: none; }
${P} .tv-modal.tv-final .tv-msg { padding-top: 4px; font-size: 1.24rem; }

/* Aviso */
${P} .tv-toast {
  background: var(--ch-amargo); color: var(--ch-crema); border: 1px solid var(--ch-oro);
  border-radius: 999px; padding: 10px 18px; font-family: "Nunito", system-ui, sans-serif; font-weight: 700;
  box-shadow: 0 10px 24px -8px rgba(20,8,2,.6);
}

/* Efecto al abrir */
${P} .ch-particula { position: absolute; left: 0; top: 0; will-change: transform, opacity; }
${P} .ch-anillo { position: absolute; border-radius: 50%; border: 3px solid var(--ch-oro-claro); box-shadow: 0 0 18px rgba(255,210,122,.7); }

@keyframes chocolateria-flota { 0%, 100% { transform: translateY(0) rotate(0); } 30% { transform: translateY(-3px) rotate(-2.5deg); } 60% { transform: translateY(-1px) rotate(2deg); } }
@keyframes chocolateria-brillo {
  0%, 100% { box-shadow: inset 0 3px 7px rgba(0,0,0,.6), 0 0 0 2px #e8cf94, 0 0 12px 1px rgba(255,205,120,.35); }
  50% { box-shadow: inset 0 3px 7px rgba(0,0,0,.6), 0 0 0 2px #ffe3a3, 0 0 24px 6px rgba(255,205,120,.6); }
}
@keyframes chocolateria-destello { 0%, 55%, 100% { opacity: 0; transform: scale(.3) rotate(0); } 70% { opacity: 1; transform: scale(1) rotate(45deg); } }
@keyframes chocolateria-luz { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }
@keyframes chocolateria-tarjeta { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: none; } }
@keyframes chocolateria-gira { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  ${P} .ch-luz, ${P} .tv-puerta[data-estado="hoy"], ${P} .tv-puerta[data-estado="hoy"] .ch-pieza,
  ${P} .ch-destello, ${P} .tv-modal.on .tv-tarjeta, ${P} .tv-cancion::before { animation: none; }
  ${P} .ch-pieza { transition: none; }
}
`;

  /* ---------- Efecto al abrir ---------- */
  var CHISPAS = ["#d2483e", "#f08a7c", "#fbe9b4", "#e8cf94", "#fff6e6", "#e9a9a0"];
  var VIRUTAS = ["#3b2116", "#5e3423", "#8d5634", "#b47a4f"];
  var PAPEL_COL = ["#d2483e", "#d7ae5c", "#d79a85", "#8d5634", "#e9d8b8"];

  function alAbrir(boton, n, capa) {
    var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido || !boton || !capa || typeof boton.animate !== "function") return Promise.resolve();
    return new Promise(function (resolver) {
      var r = boton.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2, t = r.width;
      var cont = document.createElement("div");
      cont.style.cssText = "position:absolute;inset:0;";
      capa.appendChild(cont);

      var p = boton.querySelector(".ch-pieza");
      if (p) {
        p.animate([
          { transform: "scale(1) rotate(0)" },
          { transform: "scale(1.14) rotate(-7deg)", offset: .22 },
          { transform: "scale(1.2) rotate(6deg)", offset: .45 },
          { transform: "scale(1.28) rotate(0)", opacity: 1, offset: .62 },
          { transform: "scale(.6) rotate(0)", opacity: 0 }
        ], { duration: 640, easing: "ease-in-out", fill: "forwards" });
      }

      var anillo = document.createElement("div");
      anillo.className = "ch-anillo";
      anillo.style.cssText = "left:" + (cx - t / 2) + "px;top:" + (cy - t / 2) + "px;width:" + t + "px;height:" + t + "px;";
      cont.appendChild(anillo);
      anillo.animate([{ transform: "scale(.5)", opacity: 0 }, { transform: "scale(.9)", opacity: 1, offset: .3 }, { transform: "scale(1.9)", opacity: 0 }],
        { duration: 520, delay: 300, easing: "ease-out", fill: "both" });

      function particula(estilo, ang, vel, caida, giro, dur, retraso) {
        var d = document.createElement("div");
        d.className = "ch-particula";
        d.style.cssText = estilo;
        cont.appendChild(d);
        var dx = Math.cos(ang) * vel, dy = Math.sin(ang) * vel;
        d.animate([
          { transform: "translate(" + cx + "px," + cy + "px) translate(-50%,-50%) rotate(0deg) scale(.6)", opacity: 0 },
          { transform: "translate(" + (cx + dx * .55) + "px," + (cy + dy * .55) + "px) translate(-50%,-50%) rotate(" + giro * .4 + "deg) scale(1)", opacity: 1, offset: .25 },
          { transform: "translate(" + (cx + dx) + "px," + (cy + dy + caida * .45) + "px) translate(-50%,-50%) rotate(" + giro * .75 + "deg) scale(1)", opacity: 1, offset: .6 },
          { transform: "translate(" + (cx + dx * 1.15) + "px," + (cy + dy + caida) + "px) translate(-50%,-50%) rotate(" + giro + "deg) scale(.9)", opacity: 0 }
        ], { duration: dur, delay: retraso, easing: "cubic-bezier(.2,.6,.4,1)", fill: "both" });
      }
      var i, a;
      /* trocitos de papel metálico */
      for (i = 0; i < 9; i++) {
        a = -Math.PI / 2 + (i - 4) * 0.42 + (Math.random() - .5) * .3;
        var c = PAPEL_COL[(n + i) % PAPEL_COL.length];
        particula("width:14px;height:11px;background:linear-gradient(135deg,#fff8 0,transparent 55%)," + c + ";clip-path:polygon(0 0,100% 20%,80% 100%,10% 75%);",
          a, t * (0.7 + Math.random() * .5), 70 + Math.random() * 50, (Math.random() - .5) * 540, 480 + Math.random() * 120, 340);
      }
      /* virutas de chocolate */
      for (i = 0; i < 12; i++) {
        a = -Math.PI / 2 + (Math.random() - .5) * 2.6;
        var v = VIRUTAS[i % VIRUTAS.length];
        particula("width:" + (10 + Math.random() * 7) + "px;height:5px;border-radius:4px 4px 2px 2px;background:linear-gradient(180deg,rgba(255,255,255,.25)," + v + " 60%);",
          a, t * (0.45 + Math.random() * .6), 90 + Math.random() * 70, (Math.random() - .5) * 720, 460 + Math.random() * 160, 340 + Math.random() * 40);
      }
      /* grageas */
      for (i = 0; i < 16; i++) {
        a = Math.random() * Math.PI * 2;
        particula("width:8px;height:3.5px;border-radius:3px;background:" + CHISPAS[i % CHISPAS.length] + ";",
          a, t * (0.4 + Math.random() * .7), 60 + Math.random() * 60, (Math.random() - .5) * 600, 440 + Math.random() * 160, 340 + Math.random() * 60);
      }
      setTimeout(resolver, 820);
      setTimeout(function () { if (cont.parentNode) cont.parentNode.removeChild(cont); }, 1150);
    });
  }

  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: ID,
    nombre: "Chocolatería",
    emoji: "🍫",
    descripcion: "Una caja de bombones envueltos en una chocolatería con toldo",
    fuentes: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,400;1,9..144,500&family=Nunito:wght@400;600;700;800&family=Parisienne&display=swap",
    color: "#5a3420",
    css: css,
    orden: [7, 15, 2, 21, 11, 4, 18, 9, 23, 1, 13, 6, 20, 16, 3, 24, 10, 14, 5, 19, 8, 12, 22, 17],
    escena: function () {
      return '<div class="ch-pagina">' + defs() +
        '<header class="ch-cabecera">' +
          '<div class="ch-tienda">' + fachada() + '</div>' +
          '<div class="ch-titulos">' +
            '<p class="tv-para"></p>' +
            '<h1 class="ch-titulo">Calendario de adviento</h1>' +
            '<p class="ch-sub">24 bombones, una sorpresa dulce para cada día de diciembre</p>' +
            '<div class="ch-adorno" aria-hidden="true"><span></span></div>' +
            '<p class="tv-cuenta"></p>' +
          '</div>' +
        '</header>' +
        '<section class="ch-caja" aria-label="Caja de bombones">' + lazo() +
          '<p class="ch-etiqueta" aria-hidden="true">Selección de Navidad · 24 piezas</p>' +
          '<div class="tv-puertas"></div>' +
        '</section>' +
        '<p class="ch-pie"><b>Hecho con cariño</b><br>Abre un bombón cada día</p>' +
      '</div>';
    },
    puerta: function (n, estado) {
      var h = '<span class="ch-pieza">' + pieza(n, estado);
      if (estado === "abierta") h += '<span class="ch-num-abierta">' + n + '</span>';
      else h += '<span class="ch-num">' + n + '</span>';
      if (estado === "hoy") h += '<span class="ch-destello"></span>';
      h += '</span>';
      if (estado === "bloqueada") h += LLAVE;
      if (estado === "hoy") h += '<span class="ch-hoy" aria-hidden="true">Hoy</span>';
      return h;
    },
    alAbrir: alAbrir
  });
})();
