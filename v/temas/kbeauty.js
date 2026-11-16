/* Estilo «K-beauty»: una tiendita de cuidado de la piel con tarritos, tubos y mascarillas propios.
   Todo el arte es original y genérico: sin marcas, logotipos ni empaques reales. */
(function () {
  "use strict";

  var ORDEN = [7, 15, 2, 19, 11, 4,
               22, 9, 13, 1, 17, 6,
               3, 20, 8, 14, 23, 10,
               16, 5, 21, 12, 18, 24];

  function svgUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function f(v) { return (+v).toFixed(1); }

  /* ---------- Formas básicas ---------- */
  function gota(cx, cy, s, fill, extra) {
    return '<g transform="translate(' + f(cx) + " " + f(cy) + ") scale(" + s + ')"' + (extra || "") + ">" +
      '<path d="M0 -11 C4 -5 7.5 -1 7.5 3.5 A7.5 7.5 0 0 1 -7.5 3.5 C-7.5 -1 -4 -5 0 -11Z" fill="' + fill + '"/>' +
      '<path d="M-3.6 2.5 q.4 -3 2.6 -5.6" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/></g>';
  }
  function chispa(cx, cy, r, fill, extra) {
    return '<path d="M' + f(cx) + " " + f(cy - r) + " Q" + f(cx) + " " + f(cy) + " " + f(cx + r) + " " + f(cy) + " Q" + f(cx) + " " + f(cy) + " " + f(cx) + " " + f(cy + r) +
      " Q" + f(cx) + " " + f(cy) + " " + f(cx - r) + " " + f(cy) + " Q" + f(cx) + " " + f(cy) + " " + f(cx) + " " + f(cy - r) + 'Z" fill="' + fill + '"' + (extra || "") + "/>";
  }
  function flor(cx, cy, r, fill, centro) {
    var s = '<g transform="translate(' + f(cx) + " " + f(cy) + ')">', i;
    for (i = 0; i < 5; i++) {
      s += '<path transform="rotate(' + (i * 72) + ')" d="M0 0 C' + f(-r * 0.62) + " " + f(-r * 0.45) + " " + f(-r * 0.5) + " " + f(-r * 1.05) + " " + f(-r * 0.14) + " " + f(-r * 1.02) +
        " L0 " + f(-r * 0.86) + " L" + f(r * 0.14) + " " + f(-r * 1.02) + " C" + f(r * 0.5) + " " + f(-r * 1.05) + " " + f(r * 0.62) + " " + f(-r * 0.45) + ' 0 0Z" fill="' + fill + '"/>';
    }
    return s + '<circle r="' + f(r * 0.24) + '" fill="' + (centro || "#ffe08a") + '"/></g>';
  }
  function corazon(cx, cy, s, fill, extra) {
    return '<path transform="translate(' + f(cx) + " " + f(cy) + ") scale(" + s + ')" d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="' + fill + '"' + (extra || "") + "/>";
  }
  function hoja(cx, cy, s, rot, fill) {
    return '<path transform="translate(' + f(cx) + " " + f(cy) + ") rotate(" + rot + ") scale(" + s + ')" d="M0 0 C6 -6 14 -6 20 0 C14 6 6 6 0 0Z" fill="' + fill + '"/>' +
      '<path transform="translate(' + f(cx) + " " + f(cy) + ") rotate(" + rot + ") scale(" + s + ')" d="M2 0 H17" stroke="#fff" stroke-width="1" opacity=".55"/>';
  }

  /* ---------- Productos genéricos para la escena ---------- */
  function tarro(x, y, s, cuerpo, tapa) {
    return '<g transform="translate(' + f(x) + " " + f(y) + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="1" rx="24" ry="3.5" fill="#d9a993" opacity=".35"/>' +
      '<rect x="-21" y="-28" width="42" height="29" rx="10" fill="' + cuerpo + '"/>' +
      '<rect x="-14" y="-20" width="28" height="13" rx="6.5" fill="#fff" opacity=".9"/>' +
      '<rect x="-8" y="-15.5" width="16" height="2.4" rx="1.2" fill="' + tapa + '"/>' +
      '<rect x="-23" y="-40" width="46" height="13" rx="5" fill="' + tapa + '"/>' +
      '<path d="M-17 -38 v9 M-11 -38 v9 M-5 -38 v9 M1 -38 v9 M7 -38 v9 M13 -38 v9 M19 -38 v9" stroke="#fff" stroke-width="1.4" opacity=".35"/>' +
      '<path d="M-16 -24 q-1 8 1 17" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/></g>';
  }
  function tubo(x, y, s, cuerpo, tapa, rot) {
    return '<g transform="translate(' + f(x) + " " + f(y) + ") rotate(" + (rot || 0) + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="1" rx="14" ry="3" fill="#d9a993" opacity=".35"/>' +
      '<rect x="-9" y="-11" width="18" height="12" rx="3" fill="' + tapa + '"/>' +
      '<path d="M-8 -11 L-13 -62 H13 L8 -11Z" fill="' + cuerpo + '"/>' +
      '<rect x="-14" y="-67" width="28" height="7" rx="1.5" fill="' + cuerpo + '"/>' +
      '<path d="M-11 -65 h22" stroke="#fff" stroke-width="1" stroke-dasharray="2 2" opacity=".7"/>' +
      '<rect x="-6" y="-46" width="12" height="20" rx="6" fill="#fff" opacity=".85"/>' +
      gota(0, -36, 0.45, tapa) +
      '<path d="M-8 -56 L-5 -16" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".5"/></g>';
  }
  function bomba(x, y, s, cuerpo, tapa) {
    return '<g transform="translate(' + f(x) + " " + f(y) + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="1" rx="17" ry="3.2" fill="#d9a993" opacity=".35"/>' +
      '<rect x="-15" y="-52" width="30" height="53" rx="11" fill="' + cuerpo + '"/>' +
      '<rect x="-5" y="-60" width="10" height="9" rx="2" fill="' + tapa + '"/>' +
      '<rect x="-2" y="-70" width="4" height="11" fill="' + tapa + '"/>' +
      '<path d="M-7 -73 h16 q5 0 5 4 h-4 q0 -1 -2 -1 h-15 z" fill="' + tapa + '"/>' +
      '<rect x="-10" y="-38" width="20" height="22" rx="4" fill="#fff" opacity=".88"/>' +
      flor(0, -27, 6, tapa, "#fff") +
      '<path d="M-10 -46 q-2 14 0 36" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/></g>';
  }
  function mascarilla(x, y, s, fondo, rot) {
    var zz = "", i;
    for (i = 0; i < 8; i++) zz += " l2.5 -3 l2.5 3";
    return '<g transform="translate(' + f(x) + " " + f(y) + ") rotate(" + (rot || 0) + ") scale(" + s + ')">' +
      '<path d="M-20 0 V-56' + zz + ' V0Z" fill="' + fondo + '"/>' +
      '<path d="M-20 -50 h40" stroke="#fff" stroke-width="1.2" opacity=".6"/>' +
      '<ellipse cx="0" cy="-26" rx="12" ry="15" fill="#fff" opacity=".95"/>' +
      '<ellipse cx="-4.6" cy="-30" rx="2.8" ry="1.6" fill="' + fondo + '"/><ellipse cx="4.6" cy="-30" rx="2.8" ry="1.6" fill="' + fondo + '"/>' +
      '<path d="M-3.6 -19 q3.6 2.6 7.2 0" stroke="' + fondo + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M-14 -6 h28" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>';
  }
  function maceta(x, y, s) {
    return '<g transform="translate(' + f(x) + " " + f(y) + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="1" rx="17" ry="3" fill="#d9a993" opacity=".35"/>' +
      hoja(-2, -22, 1.05, -128, "#8fc27a") + hoja(2, -22, 1.05, -52, "#a6d48f") + hoja(0, -24, 1.1, -90, "#7fb76b") + hoja(-1, -20, 0.8, -160, "#b6dca1") + hoja(1, -20, 0.8, -20, "#9ccc8a") +
      '<path d="M-14 -22 H14 L10 0 H-10Z" fill="#fff4ec"/><path d="M-14 -22 H14 L13 -16 H-13Z" fill="#f6c9b4"/></g>';
  }
  function espejo(x, y, s) {
    return '<g transform="translate(' + f(x) + " " + f(y) + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="1" rx="15" ry="3" fill="#d9a993" opacity=".35"/>' +
      '<path d="M-10 0 q10 -8 20 0z" fill="#f4b8c8"/><rect x="-2" y="-14" width="4" height="12" fill="#f4b8c8"/>' +
      '<circle cx="0" cy="-34" r="22" fill="#f4b8c8"/><circle cx="0" cy="-34" r="17" fill="#eaf6ff"/>' +
      '<path d="M-10 -40 l9 -9 M-11 -33 l15 -15" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>' +
      '<circle cx="0" cy="-56" r="3.4" fill="#ffe08a"/></g>';
  }
  function algodones(x, y, s) {
    return '<g transform="translate(' + f(x) + " " + f(y) + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="-3" rx="13" ry="4" fill="#fff" stroke="#f2d6c8" stroke-width="1.4"/>' +
      '<ellipse cx="2" cy="-9" rx="13" ry="4" fill="#fff" stroke="#f2d6c8" stroke-width="1.4"/>' +
      '<ellipse cx="-1" cy="-15" rx="13" ry="4" fill="#fff" stroke="#f2d6c8" stroke-width="1.4"/></g>';
  }

  /* ---------- Toldo y letrero ---------- */
  function toldo(W) {
    var H = 128, s = '<svg class="kb-toldo kb-toldo-' + W + '" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">';
    var m = W / 2, sw = 176, sx = m - sw / 2;
    /* cordones del letrero */
    s += '<path d="M' + (sx + 30) + " 56 L" + (sx + 40) + " 44 M" + (sx + sw - 30) + " 56 L" + (sx + sw - 40) + ' 44" stroke="#e8a58d" stroke-width="2.5" stroke-linecap="round"/>';
    /* letrero */
    s += '<rect x="' + sx + '" y="4" width="' + sw + '" height="44" rx="22" fill="#fffaf6" stroke="#f3b39a" stroke-width="3"/>' +
      '<rect x="' + (sx + 6) + '" y="10" width="' + (sw - 12) + '" height="32" rx="16" fill="none" stroke="#ffd9cb" stroke-width="1.6" stroke-dasharray="3 4"/>' +
      '<text x="' + m + '" y="34" text-anchor="middle" font-family="M PLUS Rounded 1c, Nunito, sans-serif" font-weight="800" font-size="19" fill="#d9587c" letter-spacing=".5">glow shop</text>' +
      gota(sx + 19, 28, 0.8, "#9fd3ec") + flor(sx + sw - 19, 26, 8, "#ffb6c8");
    /* barra */
    s += '<rect x="6" y="54" width="' + (W - 12) + '" height="9" rx="4.5" fill="#e9b29c"/><circle cx="10" cy="58.5" r="6" fill="#f3c6b3"/><circle cx="' + (W - 10) + '" cy="58.5" r="6" fill="#f3c6b3"/>';
    /* lona a rayas con borde de ondas */
    var n = Math.max(8, Math.round((W - 16) / 40)), w = (W - 16) / n, i, x, cols = ["#ffc4ae", "#fff7f0"], ondas = "", colgantes = "";
    for (i = 0; i < n; i++) {
      x = 8 + i * w;
      s += '<path d="M' + f(x) + " 62 h" + f(w) + " v34 a" + f(w / 2) + " " + f(w / 2 * 0.8) + " 0 0 1 " + f(-w) + ' 0z" fill="' + cols[i % 2] + '"/>';
      ondas += "M" + f(x + w) + " 96 a" + f(w / 2) + " " + f(w / 2 * 0.8) + " 0 0 1 " + f(-w) + " 0 ";
      if (i % 3 === 1) {
        var gx = x + w / 2, gy = 96 + w * 0.4;
        colgantes += '<g class="kb-colgante" style="transform-origin:' + f(gx) + "px " + f(gy) + "px;animation-delay:" + ((i * 0.43) % 2).toFixed(2) + 's">' +
          '<path d="M' + f(gx) + " " + f(gy) + ' v10" stroke="#e8a58d" stroke-width="1.4"/>' + gota(gx, gy + 20, 0.78, i % 2 ? "#b9e1f2" : "#ffd0dc") + "</g>";
      }
    }
    s += '<path d="' + ondas + '" fill="none" stroke="#f0a58b" stroke-width="2"/>';
    s += '<rect x="8" y="62" width="' + (W - 16) + '" height="8" fill="#fff" opacity=".35"/>';
    s += colgantes;
    s += '<g class="kb-guino">' + chispa(sx - 14, 18, 7, "#ffd27a") + chispa(sx + sw + 14, 30, 5.5, "#fff") + "</g>";
    return s + "</svg>";
  }

  /* ---------- Mostrador con productos ---------- */
  function mostrador(W) {
    var H = 150, top = 78, s = '<svg class="kb-mostrador kb-mostrador-' + W + '" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">';
    var grande = W > 500;
    /* productos sobre el mostrador */
    if (grande) {
      s += mascarilla(W * 0.07, top + 2, 1.05, "#9ccc8a", -8) + mascarilla(W * 0.13, top + 2, 1.05, "#f4a7bf", 6) +
        tubo(W * 0.22, top + 2, 0.95, "#ffd3bd", "#f29b7d", -4) + tarro(W * 0.31, top + 2, 1, "#ffd9e4", "#f4a7bf") +
        algodones(W * 0.4, top + 2, 1.1) + espejo(W * 0.5, top + 2, 1.05) + maceta(W * 0.6, top + 2, 1.05) +
        bomba(W * 0.69, top + 2, 0.95, "#d5ecc8", "#8dbf7c") + tarro(W * 0.79, top + 2, 0.9, "#fff0cf", "#f3cf86") +
        tubo(W * 0.87, top + 2, 0.9, "#e6dcff", "#b9a6f0", 5) + mascarilla(W * 0.94, top + 2, 1, "#ffc4ae", 8);
    } else {
      s += mascarilla(W * 0.1, top + 2, 0.92, "#9ccc8a", -8) + tubo(W * 0.24, top + 2, 0.86, "#ffd3bd", "#f29b7d", -4) +
        tarro(W * 0.38, top + 2, 0.86, "#ffd9e4", "#f4a7bf") + espejo(W * 0.52, top + 2, 0.9) +
        bomba(W * 0.66, top + 2, 0.84, "#d5ecc8", "#8dbf7c") + maceta(W * 0.79, top + 2, 0.9) + mascarilla(W * 0.91, top + 2, 0.86, "#f4a7bf", 8);
    }
    /* tablero y frente acanalado */
    s += '<rect x="2" y="' + top + '" width="' + (W - 4) + '" height="14" rx="7" fill="#fff6ef" stroke="#f1c3b0" stroke-width="2"/>';
    s += '<path d="M14 ' + (top + 13) + " H" + (W - 14) + " V" + (H - 22) + " Q" + (W - 14) + " " + (H - 6) + " " + (W - 30) + " " + (H - 6) + " H30 Q14 " + (H - 6) + " 14 " + (H - 22) + 'Z" fill="#ffd6c4"/>';
    var k, est = "";
    for (k = 30; k < W - 24; k += 18) est += '<rect x="' + k + '" y="' + (top + 20) + '" width="9" height="' + (H - top - 36) + '" rx="4.5" fill="#ffe5d9"/>';
    s += est;
    s += '<rect x="' + (W / 2 - 56) + '" y="' + (top + 26) + '" width="112" height="28" rx="14" fill="#fffaf6" stroke="#f3b39a" stroke-width="2"/>' +
      '<text x="' + (W / 2) + '" y="' + (top + 45) + '" text-anchor="middle" font-family="M PLUS Rounded 1c, Nunito, sans-serif" font-weight="700" font-size="12.5" fill="#b8506c" letter-spacing="1.5">SKIN · CARE</text>';
    s += '<g class="kb-guino">' + chispa(W * 0.03, 30, 5, "#fff") + chispa(W * 0.97, 40, 6, "#ffd27a") + "</g>";
    return s + "</svg>";
  }

  /* ---------- Fondo flotante ---------- */
  function ambiente() {
    var cosas = [
      ["g", 5, 12, 16, "#b9e1f2", 0], ["f", 92, 9, 22, "#ffc0d0", 0.7], ["x", 16, 30, 12, "#fff", 1.4],
      ["f", 4, 48, 18, "#ffd3bd", 2.1], ["g", 95, 40, 14, "#cfeec0", 0.4], ["x", 90, 66, 12, "#ffe08a", 1.8],
      ["g", 3, 80, 13, "#ffd0dc", 1.1], ["f", 96, 86, 16, "#d5ecc8", 2.6], ["x", 50, 2, 11, "#fff", 0.9]
    ];
    return '<div class="kb-ambiente" aria-hidden="true">' + cosas.map(function (c) {
      var forma = c[0] === "g" ? gota(12, 13, 0.95, c[4]) : c[0] === "f" ? flor(12, 12, 10, c[4]) : chispa(12, 12, 10, c[4]);
      return '<svg class="kb-deco" viewBox="0 0 24 24" style="left:' + c[1] + "%;top:" + c[2] + "%;width:" + c[3] + "px;animation-delay:" + c[5] + 's">' + forma + "</svg>";
    }).join("") + "</div>";
  }

  /* ---------- Piezas de las puertas ---------- */
  var CANDADO = '<svg class="kb-candado" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 7 V5.3 a3 3 0 0 1 6 0 V7" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="7" width="10" height="7.6" rx="2.6" fill="currentColor"/><circle cx="8" cy="10.8" r="1.3" fill="#fff"/></svg>';
  var GUINO = '<svg class="kb-brillo" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' + chispa(10, 10, 9, "#fff") + "</svg>";
  var GOTITA = '<svg class="kb-gotita" viewBox="-9 -12 18 20" aria-hidden="true" focusable="false">' + gota(0, 0, 1, "#cdeefb") + "</svg>";
  var ICONO = {
    mensaje: '<rect x="4" y="8" width="24" height="17" rx="3.5" fill="#fff" stroke="currentColor" stroke-width="2"/><path d="M5 10 l11 8 l11 -8" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' + corazon(25, 7, 0.55, "#f2708f"),
    foto: '<rect x="5" y="6" width="22" height="21" rx="4" fill="#fff" stroke="currentColor" stroke-width="2"/><rect x="8.5" y="9.5" width="15" height="11" rx="2" fill="#cdeefb"/><circle cx="19.5" cy="12.6" r="1.9" fill="#ffd27a"/><path d="M8.5 20.5 l4.6 -5 l3.6 3.4 l2 -1.8 l4.8 3.4z" fill="#8fc27a"/>',
    vale: '<path d="M4 9 h24 l-2 2.2 l2 2.2 l-2 2.2 l2 2.2 l-2 2.2 l2 2.2 l-2 2.2 H4 l2 -2.2 l-2 -2.2 l2 -2.2 l-2 -2.2 l2 -2.2 l-2 -2.2z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><ellipse cx="16" cy="16.5" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="14.2" cy="15" r=".9" fill="currentColor"/><circle cx="17.8" cy="15" r=".9" fill="currentColor"/>',
    cancion: '<path d="M12 23 V8.5 l13 -3.2 v14.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 12 l13 -3.2" stroke="currentColor" stroke-width="2.4"/><ellipse cx="8.8" cy="23" rx="3.8" ry="3.2" fill="currentColor"/><ellipse cx="21.8" cy="20" rx="3.8" ry="3.2" fill="currentColor"/>',
    regalo: '<rect x="5" y="14" width="22" height="13" rx="2.5" fill="#fff" stroke="currentColor" stroke-width="2"/><rect x="4" y="10" width="24" height="5" rx="1.8" fill="#ffd9e4" stroke="currentColor" stroke-width="2"/><path d="M16 10 v17" stroke="currentColor" stroke-width="2"/><path d="M16 10 c-3 -6 -9 -5 -7 -1.5 c1 1.6 4.5 1.8 7 1.5z M16 10 c3 -6 9 -5 7 -1.5 c-1 1.6 -4.5 1.8 -7 1.5z" fill="#ffd9e4" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    final: flor(16, 16, 13, "#ffb6c8", "#ffd27a") + chispa(26, 6, 3.6, "#ffd27a") + chispa(6, 25, 2.8, "#ffd27a")
  };
  function tipoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? "final" : d.tipo;
    } catch (e) { /* sin motor */ }
    return n === 24 ? "final" : "mensaje";
  }
  var FORMAS = ["tarro", "pote", "frasco"];

  /* ---------- Imágenes de la tarjeta ---------- */
  var VITRINA = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 62">' +
    tubo(38, 60, 0.78, "#ffd3bd", "#f29b7d", -8) + tarro(85, 60, 1.05, "#ffd9e4", "#f4a7bf") + bomba(130, 60, 0.75, "#d5ecc8", "#8dbf7c") +
    gota(60, 14, 0.8, "#b9e1f2") + chispa(110, 10, 6, "#ffd27a") + chispa(14, 30, 4, "#ffd27a") + flor(158, 18, 7, "#ffb6c8") + "</svg>");
  var COMPACTO = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
    '<circle cx="40" cy="42" r="33" fill="#f4a7bf"/><circle cx="40" cy="40" r="33" fill="#ffd9e4"/><circle cx="40" cy="40" r="26" fill="#fff5f8" stroke="#f4a7bf" stroke-width="2"/>' +
    '<path d="M35 50 V30 l14 -3.5 v16" fill="none" stroke="#c94368" stroke-width="3" stroke-linejoin="round"/><ellipse cx="31.5" cy="50" rx="4.2" ry="3.4" fill="#c94368"/><ellipse cx="45.5" cy="43" rx="4.2" ry="3.4" fill="#c94368"/>' +
    '<path d="M18 26 a26 26 0 0 1 12 -10" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".9"/>' + chispa(66, 14, 5, "#ffd27a") + "</svg>");
  var BOLSA = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 78">' +
    '<ellipse cx="42" cy="74" rx="30" ry="3.5" fill="#f3d3c2"/>' +
    '<path d="M30 26 q0 -16 12 -16 q12 0 12 16" fill="none" stroke="#e58fa6" stroke-width="3.5" stroke-linecap="round"/>' +
    '<path d="M16 24 H68 L72 72 H12Z" fill="#ffd9e4" stroke="#e58fa6" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M16 24 H68 L68.6 32 H15.4Z" fill="#fff" opacity=".55"/>' +
    '<rect x="26" y="40" width="32" height="20" rx="10" fill="#fff"/>' + flor(42, 50, 7, "#f4a7bf", "#ffd27a") +
    chispa(74, 14, 6, "#ffd27a") + chispa(10, 18, 4, "#ffd27a") + gota(78, 40, 0.6, "#b9e1f2") + "</svg>");
  var FONDO = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    gota(14, 16, 0.42, "#ffffff", ' opacity=".9"') + '<circle cx="46" cy="44" r="2.2" fill="#ffffff" opacity=".85"/>' +
    '<circle cx="48" cy="12" r="1.4" fill="#ffffff" opacity=".7"/>' + "</svg>");
  var GOTA_URI = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-9 -12 18 20">' + gota(0, 0, 1, "#9fd3ec") + "</svg>");
  var FLOR_URI = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 24 24">' + flor(0, 0, 11, "#ffb6c8", "#ffd27a") + "</svg>");

  var CSS = `
body.tema-kbeauty{
  font-family:"Nunito","M PLUS Rounded 1c",system-ui,sans-serif; color:#6a3f3a;
  background-color:#fff1ea;
  background-image:url("${FONDO}"),radial-gradient(120% 60% at 50% 0,#ffe3d6 0,transparent 70%),linear-gradient(180deg,#ffeae1 0%,#fff3f5 48%,#eef7e8 100%);
  background-size:64px 64px,100% 100%,100% 100%;
}
body.tema-kbeauty #tv-escena{position:relative;padding:0 16px 96px;min-height:100vh;min-height:100dvh}
body.tema-kbeauty .kb-ambiente{position:absolute;inset:0;pointer-events:none;overflow:hidden}
body.tema-kbeauty .kb-deco{position:absolute;height:auto;opacity:.9;animation:kbeauty-flota 7s ease-in-out infinite}
body.tema-kbeauty .kb-cabecera{position:relative;text-align:center;padding:24px 0 8px;max-width:720px;margin:0 auto}
body.tema-kbeauty .kb-sobre{display:inline-flex;align-items:center;gap:8px;margin:0 0 6px;font-size:.8rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#a8485e}
body.tema-kbeauty .kb-sobre::before,body.tema-kbeauty .kb-sobre::after{content:"";width:11px;height:13px;background:url("${GOTA_URI}") center/contain no-repeat}
body.tema-kbeauty .kb-titulo{margin:0;font-family:"M PLUS Rounded 1c","Nunito",system-ui,sans-serif;font-weight:800;font-size:clamp(1.8rem,8.2vw,2.8rem);line-height:1.06;color:#c94a6c;
  letter-spacing:.005em;text-shadow:0 2px 0 #fff,0 0 18px rgba(255,255,255,.9)}
body.tema-kbeauty .kb-titulo span{display:block;font-size:.6em;font-weight:700;color:#6f9a58;margin-top:3px}
body.tema-kbeauty .tv-para{display:inline-flex;align-items:center;gap:8px;margin:14px 0 0;padding:7px 20px;border-radius:999px;
  background:rgba(255,255,255,.92);color:#9a3d55;font-weight:700;font-size:1.05rem;border:2px solid #ffd3c4;box-shadow:0 4px 14px rgba(240,150,130,.22),inset 0 -3px 0 #fff0ea}
body.tema-kbeauty .tv-para::before,body.tema-kbeauty .tv-para::after{content:"";width:15px;height:15px;background:url("${FLOR_URI}") center/contain no-repeat}
body.tema-kbeauty .tv-cuenta{display:block;width:max-content;max-width:100%;margin:12px auto 0;padding:6px 16px;border-radius:999px;background:#e3f2d9;color:#2f5e22;font-weight:600;font-size:.93rem}
body.tema-kbeauty .tv-cuenta[hidden]{display:none}

/* Tienda */
body.tema-kbeauty .kb-tienda{position:relative;max-width:400px;margin:4px auto 0}
body.tema-kbeauty .kb-toldo,body.tema-kbeauty .kb-mostrador{display:block;width:100%;height:auto;overflow:visible}
body.tema-kbeauty .kb-toldo{position:relative;z-index:2;filter:drop-shadow(0 6px 6px rgba(220,130,110,.16))}
body.tema-kbeauty .kb-toldo-720,body.tema-kbeauty .kb-mostrador-720{display:none}
body.tema-kbeauty .kb-colgante{animation:kbeauty-balanceo 3.4s ease-in-out infinite}
body.tema-kbeauty .kb-guino path{animation:kbeauty-guino 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
body.tema-kbeauty .kb-guino path:nth-child(2){animation-delay:1.2s}
body.tema-kbeauty .kb-vitrina{position:relative;z-index:1;margin:-30px 12px 0;padding:44px 14px 84px;border-radius:8px 8px 22px 22px;
  background-color:#fffaf7;
  background-image:radial-gradient(90% 50% at 50% 0,rgba(255,255,255,.95),transparent 70%),linear-gradient(#fbe9e1 1px,transparent 1px),linear-gradient(90deg,#fbe9e1 1px,transparent 1px);
  background-size:100% 100%,26px 26px,26px 26px;background-position:0 0,-1px -1px,-1px -1px;
  border:3px solid #f6cdbb;border-top:0;box-shadow:inset 0 0 0 6px rgba(255,255,255,.7),0 16px 30px rgba(210,130,110,.16)}
body.tema-kbeauty .kb-mostrador{position:relative;z-index:3;margin-top:-74px;filter:drop-shadow(0 8px 10px rgba(210,130,110,.14))}
body.tema-kbeauty .kb-pie{position:relative;text-align:center;margin:10px 0 0;font-size:.95rem;font-weight:600;color:#9a5a52}

/* Puertas: tarritos en repisas */
body.tema-kbeauty .tv-puertas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:12px;row-gap:26px;padding:0}
body.tema-kbeauty .tv-puerta{position:relative;display:block;width:100%;aspect-ratio:1/1.16;min-height:60px;padding:0;border:0;background:none;border-radius:18px;
  font-family:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
body.tema-kbeauty .tv-puerta::after{content:"";position:absolute;left:-7px;right:-7px;bottom:-9px;height:8px;border-radius:4px;
  background:linear-gradient(180deg,#fffdfb,#f4dacd);box-shadow:0 4px 6px rgba(200,120,100,.18);pointer-events:none}
body.tema-kbeauty .tv-puerta:focus-visible{outline:3px solid #6f9a58;outline-offset:5px}
body.tema-kbeauty .kb-w{position:absolute;inset:0;display:block}
body.tema-kbeauty .kb-c1{--c:#ffd3bd;--t:#f6a98b;--s:#e7957a;--d:#8a3d1c;--l:#fff4ee}
body.tema-kbeauty .kb-c2{--c:#ffdbe6;--t:#f3a5bf;--s:#e392ad;--d:#9a2f57;--l:#fff5f8}
body.tema-kbeauty .kb-c3{--c:#d8eecb;--t:#9ccc8a;--s:#86b974;--d:#2f5e22;--l:#f4fbef}
body.tema-kbeauty .kb-c4{--c:#fff0cf;--t:#f1cb80;--s:#dcb46a;--d:#77500a;--l:#fffbf0}
body.tema-kbeauty .kb-c5{--c:#e8deff;--t:#b8a5ef;--s:#a491e0;--d:#4c3696;--l:#f8f5ff}
body.tema-kbeauty .kb-c6{--c:#ffe3ec;--t:#efc067;--s:#d9a64a;--d:#8b4a12;--l:#fffaf2}
body.tema-kbeauty .kb-cuerpo,body.tema-kbeauty .kb-tapa{position:absolute;display:block}
body.tema-kbeauty .kb-cuerpo{z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--d);
  background:linear-gradient(100deg,transparent 0 9%,rgba(255,255,255,.65) 12% 17%,transparent 21%),radial-gradient(120% 90% at 50% 10%,var(--l) 0,var(--c) 62%);
  box-shadow:inset 0 -7px 0 rgba(120,50,30,.05),inset 0 2px 0 rgba(255,255,255,.8),0 3px 0 var(--s),0 10px 14px rgba(200,110,90,.14);
  transition:transform .18s ease}
body.tema-kbeauty .kb-tapa{z-index:2;
  background:repeating-linear-gradient(90deg,transparent 0 5px,rgba(255,255,255,.26) 5px 7px),linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0) 60%),var(--t);
  box-shadow:inset 0 -3px 0 rgba(90,30,20,.1),0 2px 0 rgba(90,30,20,.08);transition:transform .25s ease}
body.tema-kbeauty .kb-c6 .kb-cuerpo{background:linear-gradient(100deg,transparent 0 9%,rgba(255,255,255,.7) 12% 17%,transparent 21%),linear-gradient(135deg,#ffd9e4 0%,#ffe7d6 35%,#e3f4d6 70%,#e8deff 100%)}
/* tarro */
body.tema-kbeauty .kb-f-tarro .kb-tapa{left:9%;right:9%;top:5%;height:22%;border-radius:10px 10px 5px 5px}
body.tema-kbeauty .kb-f-tarro .kb-cuerpo{left:4%;right:4%;top:24%;bottom:0;border-radius:14px 14px 22px 22px}
/* pote (tapa de cúpula) */
body.tema-kbeauty .kb-f-pote .kb-tapa{left:3%;right:3%;top:10%;height:26%;border-radius:50% 50% 8px 8px/100% 100% 8px 8px;background:radial-gradient(60% 70% at 40% 25%,rgba(255,255,255,.6),transparent 70%),var(--t)}
body.tema-kbeauty .kb-f-pote .kb-tapa::after{content:"";position:absolute;left:44%;right:44%;top:-14%;height:22%;border-radius:999px;background:var(--t);box-shadow:inset 0 2px 0 rgba(255,255,255,.5)}
body.tema-kbeauty .kb-f-pote .kb-cuerpo{left:7%;right:7%;top:33%;bottom:0;border-radius:10px 10px 26px 26px}
/* frasco (tapón) */
body.tema-kbeauty .kb-f-frasco .kb-tapa{left:33%;right:33%;top:0;height:20%;border-radius:7px 7px 4px 4px}
body.tema-kbeauty .kb-f-frasco .kb-cuerpo{left:11%;right:11%;top:17%;bottom:0;border-radius:36% 36% 18px 18px/22% 22% 18px 18px}
body.tema-kbeauty .kb-etq{position:relative;display:flex;flex-direction:column;align-items:center;width:74%;padding:5px 0 6px;margin-top:4%;border-radius:14px;
  background:rgba(255,255,255,.9);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 0 0 1.5px rgba(255,255,255,.6)}
body.tema-kbeauty .kb-num{font-family:"M PLUS Rounded 1c","Nunito",sans-serif;font-weight:800;font-size:clamp(1.2rem,5.2vw,1.8rem);line-height:1;letter-spacing:-.01em}
body.tema-kbeauty .kb-lin{display:block;width:46%;height:3px;margin-top:4px;border-radius:3px;background:var(--t)}
body.tema-kbeauty .kb-f-pote .kb-etq{margin-top:2%}
body.tema-kbeauty .tv-puerta:not([data-estado="bloqueada"]):hover .kb-tapa{transform:translateY(-3px)}
body.tema-kbeauty .tv-puerta:not([data-estado="bloqueada"]):active .kb-cuerpo{transform:translateY(2px)}

/* bloqueada: sellado, mate */
body.tema-kbeauty .kb-e-bloqueada .kb-cuerpo{background:repeating-linear-gradient(-45deg,rgba(255,255,255,.3) 0 6px,transparent 6px 12px),var(--c);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.7),0 3px 0 var(--s),0 6px 10px rgba(200,110,90,.1)}
body.tema-kbeauty .kb-e-bloqueada .kb-etq{background:rgba(255,255,255,.72)}
body.tema-kbeauty .kb-e-bloqueada .kb-num{opacity:.75}
body.tema-kbeauty .kb-cinta{position:absolute;z-index:3;left:50%;top:6%;width:15%;height:40%;margin-left:-7.5%;border-radius:2px;
  background:linear-gradient(180deg,rgba(255,255,255,.75),rgba(255,255,255,.55));box-shadow:0 0 0 1px rgba(255,255,255,.8);transform:rotate(-8deg)}
body.tema-kbeauty .kb-f-frasco .kb-cinta{top:2%;height:34%}
body.tema-kbeauty .kb-candado{position:absolute;z-index:3;right:5%;bottom:4%;width:13px;height:13px;color:var(--d);opacity:.7}

/* disponible: brillo húmedo */
body.tema-kbeauty .kb-gotita{position:absolute;z-index:3;right:7%;top:38%;width:11px;height:13px;filter:drop-shadow(0 1px 0 rgba(90,150,180,.25))}

/* hoy */
body.tema-kbeauty .kb-e-hoy{animation:kbeauty-salta 2.4s ease-in-out infinite}
body.tema-kbeauty .kb-e-hoy .kb-cuerpo{box-shadow:0 0 0 3px #fff,0 0 0 5px #ffb39b,0 3px 0 5px #f0927a,0 0 24px 8px rgba(255,180,150,.6)}
body.tema-kbeauty .kb-e-hoy .kb-tapa{box-shadow:0 0 0 2px #fff,0 0 14px 4px rgba(255,200,170,.6)}
body.tema-kbeauty .kb-hoy{position:absolute;z-index:4;right:-8px;top:-10px;padding:3px 8px;border-radius:999px;background:#6f9a58;color:#fff;
  font-size:.72rem;font-weight:800;letter-spacing:.02em;transform:rotate(9deg);box-shadow:0 2px 0 #4e7a3a}
body.tema-kbeauty .kb-brillo{position:absolute;z-index:4;width:15px;height:15px;animation:kbeauty-brilla 1.7s ease-in-out infinite}
body.tema-kbeauty .kb-brillo path{fill:#ffd27a}
body.tema-kbeauty .kb-brillo.b1{left:-7px;top:34%}
body.tema-kbeauty .kb-brillo.b2{right:-6px;bottom:16%;width:11px;height:11px;animation-delay:.85s}
body.tema-kbeauty .kb-brillo.b2 path{fill:#fff}

/* abierta: tapa afuera, crema y dibujito */
body.tema-kbeauty .kb-e-abierta .kb-cuerpo{justify-content:center;background:linear-gradient(100deg,transparent 0 9%,rgba(255,255,255,.6) 12% 17%,transparent 21%),radial-gradient(110% 80% at 50% 30%,var(--l) 0,var(--l) 45%,var(--c) 100%);
  box-shadow:inset 0 -6px 0 rgba(120,50,30,.04),0 3px 0 var(--s),0 8px 12px rgba(200,110,90,.12)}
body.tema-kbeauty .kb-e-abierta .kb-cuerpo::before{content:"";position:absolute;left:8%;right:8%;top:4%;height:22%;border-radius:50%;
  background:radial-gradient(60% 60% at 45% 40%,#fff 0,#fff 35%,var(--c) 100%);box-shadow:inset 0 0 0 2px var(--c)}
body.tema-kbeauty .kb-e-abierta .kb-tapa{z-index:3;transform:translate(30%,-34%) rotate(20deg) scale(.66);box-shadow:0 3px 6px rgba(120,50,30,.2)}
body.tema-kbeauty .kb-e-abierta.kb-f-pote .kb-tapa{transform:translate(26%,-48%) rotate(18deg) scale(.62)}
body.tema-kbeauty .kb-e-abierta.kb-f-frasco .kb-tapa{transform:translate(110%,-6%) rotate(64deg) scale(.85)}
body.tema-kbeauty .kb-icono{position:relative;width:52%;max-width:48px;height:auto;color:var(--d);margin-top:16%;filter:drop-shadow(0 2px 0 rgba(255,255,255,.9))}
body.tema-kbeauty .kb-mini{position:absolute;left:10%;bottom:7%;font-family:"M PLUS Rounded 1c","Nunito",sans-serif;font-size:clamp(.78rem,3.3vw,.98rem);font-weight:800;line-height:1;color:var(--d);opacity:.85}
body.tema-kbeauty .tv-puerta.kb-abriendo .kb-tapa{animation:kbeauty-destapa .6s cubic-bezier(.3,1.4,.5,1) both}
body.tema-kbeauty .tv-puerta.kb-abriendo .kb-cuerpo{animation:kbeauty-meneo .6s ease-in-out}

/* Efecto al abrir */
body.tema-kbeauty .kb-burbuja{position:absolute;left:0;top:0;border-radius:50%;will-change:transform,opacity;
  background:radial-gradient(circle at 32% 30%,#fff 0 12%,rgba(255,255,255,.65) 19%,rgba(255,185,205,.4) 55%,rgba(140,205,240,.6) 100%);
  border:1.5px solid rgba(236,130,165,.6);box-shadow:inset -3px -4px 6px rgba(255,130,165,.4),inset 2px 2px 4px rgba(140,205,240,.5),0 2px 8px rgba(200,110,140,.28)}
body.tema-kbeauty .kb-destello{position:absolute;left:0;top:0;display:block;will-change:transform,opacity}
body.tema-kbeauty .kb-destello svg{display:block;width:100%;height:100%;filter:drop-shadow(0 0 3px #fff) drop-shadow(0 1px 2px rgba(200,110,90,.35))}
body.tema-kbeauty .kb-aro{position:absolute;border-radius:50%;border:3px solid #ffb39b;box-shadow:0 0 0 3px rgba(255,255,255,.9),0 0 18px rgba(255,170,150,.7)}

/* Ventana */
body.tema-kbeauty .tv-modal{background:rgba(150,80,70,.32);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
body.tema-kbeauty .tv-tarjeta{max-width:400px;padding:80px 22px 22px;border-radius:32px;color:#6a3f3a;border:3px solid #ffd3c4;
  background:radial-gradient(100% 40% at 50% 0,#fff 0,transparent 70%),linear-gradient(180deg,#fff7f2,#fffaf8 40%,#f6fbf2);
  box-shadow:0 0 0 6px rgba(255,255,255,.75),0 26px 60px rgba(160,70,60,.3);font-family:"Nunito","M PLUS Rounded 1c",system-ui,sans-serif;
  animation:kbeauty-pop .45s cubic-bezier(.2,1.35,.4,1) both}
body.tema-kbeauty .tv-tarjeta::before{content:"";position:absolute;left:0;right:0;top:0;height:16px;border-radius:29px 29px 0 0;
  background:linear-gradient(90deg,#ffc4ae,#ffd9e4,#d8eecb,#ffd9e4,#ffc4ae)}
body.tema-kbeauty .tv-tarjeta::after{content:"";position:absolute;left:50%;top:18px;width:160px;height:58px;margin-left:-80px;
  background:url("${VITRINA}") center bottom/contain no-repeat;pointer-events:none}
body.tema-kbeauty .tv-dia{display:inline-block;margin:0 0 16px;padding:5px 20px;border-radius:999px;background:#ffe8de;color:#a1442a;
  font-family:"M PLUS Rounded 1c","Nunito",sans-serif;font-weight:800;font-size:1.28rem;border:2px solid #ffc4ae;box-shadow:0 3px 0 #ffd8c9}
body.tema-kbeauty .tv-contenido{margin:0 0 14px}
body.tema-kbeauty .tv-msg{position:relative;margin:0;padding:20px 18px 18px;border-radius:22px;font-weight:600;font-size:1.1rem;line-height:1.55;color:#6a3f3a;
  background:linear-gradient(100deg,transparent 0 4%,rgba(255,255,255,.8) 6% 9%,transparent 12%),linear-gradient(180deg,#fff,#fff6f1);border:2px solid #ffe0d4;
  box-shadow:inset 0 -4px 0 #fff0e9,0 6px 16px rgba(220,140,120,.12)}
body.tema-kbeauty .tv-msg::before{content:"";position:absolute;right:12px;top:-9px;width:16px;height:18px;background:url("${GOTA_URI}") center/contain no-repeat}
body.tema-kbeauty .tv-foto{position:relative;margin:4px 6px 0;padding:10px;border-radius:28px;
  background:linear-gradient(135deg,#ffd9e4,#fff4ee 40%,#e3f4d6 75%,#ffe3d6);box-shadow:inset 0 0 0 2px rgba(255,255,255,.9),0 12px 24px rgba(200,110,100,.2)}
body.tema-kbeauty .tv-foto img{border-radius:20px;box-shadow:0 0 0 3px #fff}
body.tema-kbeauty .tv-foto::after{content:"";position:absolute;right:20px;top:18px;width:16px;height:16px;border-radius:50%;
  background:radial-gradient(circle at 35% 35%,#fff 0 30%,rgba(255,255,255,.4) 60%,transparent 70%)}
body.tema-kbeauty .tv-foto figcaption{margin-top:10px;font-weight:700;font-size:1.03rem;color:#9a3d55}
body.tema-kbeauty .tv-vale{position:relative;padding:30px 24px 28px;border:0;border-radius:6px;background:linear-gradient(180deg,#e3f2d9,#d4ebc6);color:#2f5e22;
  -webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/16px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/16px 51% repeat-x;
          mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/16px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/16px 51% repeat-x}
body.tema-kbeauty .tv-vale::before{content:"";position:absolute;inset:16px 12px;border:2px dashed #9ccc8a;border-radius:14px;pointer-events:none}
body.tema-kbeauty .tv-vale-por{position:relative;display:inline-block;padding:3px 12px;border-radius:999px;background:#fff;color:#2f5e22;font-size:.76rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
body.tema-kbeauty .tv-vale-que{position:relative;margin:8px 0 4px;font-family:"M PLUS Rounded 1c","Nunito",sans-serif;font-size:1.6rem;font-weight:800;line-height:1.15;color:#264d1b}
body.tema-kbeauty .tv-vale-nota{position:relative;opacity:1;color:#3d6a2f;font-size:.93rem;font-weight:600}
body.tema-kbeauty .tv-cancion{padding:94px 16px 18px;border-radius:24px;background:#fff1f5 url("${COMPACTO}") center 12px/74px 74px no-repeat;color:#7a2f4a;border:2px solid #ffdbe6}
body.tema-kbeauty .tv-cancion-titulo{font-family:"M PLUS Rounded 1c","Nunito",sans-serif;font-size:1.28rem;font-weight:800;color:#a8365c;margin:0 0 6px}
body.tema-kbeauty .tv-cancion-nota{font-weight:600;color:#6a3f3a}
body.tema-kbeauty .tv-boton{min-height:46px;padding:11px 26px;border:0;border-radius:999px;background:#c13f63;color:#fff;font-family:inherit;font-weight:800;font-size:1.02rem;
  box-shadow:0 4px 0 #8f2443,0 8px 16px rgba(193,63,99,.25);text-decoration:none;transition:transform .12s}
body.tema-kbeauty .tv-boton:active{transform:translateY(3px);box-shadow:0 1px 0 #8f2443}
body.tema-kbeauty .tv-regalo{padding:100px 16px 18px;border-radius:24px;background:#fff3ec url("${BOLSA}") center 12px/86px 80px no-repeat;border:2px solid #ffe0d4}
body.tema-kbeauty .tv-regalo-texto{font-family:"M PLUS Rounded 1c","Nunito",sans-serif;font-size:1.24rem;font-weight:800;line-height:1.3;color:#8a3d1c}
body.tema-kbeauty .tv-regalo-nota{opacity:1;color:#7a4a38;font-weight:600;font-size:.97rem}
body.tema-kbeauty .tv-firma{margin:0 0 16px;font-style:italic;font-weight:600;color:#a8485e;opacity:1}
body.tema-kbeauty .tv-cerrar{min-height:46px;padding:10px 30px;border-radius:999px;border:2px solid #ffc4ae;background:#fff;color:#a1442a;font-family:inherit;font-weight:800;font-size:1rem;
  box-shadow:0 4px 0 #ffd8c9;cursor:pointer}
body.tema-kbeauty .tv-cerrar:hover{background:#fff7f3}
body.tema-kbeauty .tv-cerrar:focus-visible,body.tema-kbeauty .tv-boton:focus-visible{outline:3px solid #6f9a58;outline-offset:3px}
body.tema-kbeauty .tv-modal.tv-final .tv-tarjeta{border:4px solid transparent;
  background:radial-gradient(100% 40% at 50% 0,#fff 0,transparent 70%) padding-box,linear-gradient(180deg,#fff7f2,#fffaf8 40%,#f6fbf2) padding-box,
  linear-gradient(135deg,#ffc4ae,#ffb6c8,#cfeec0,#b9e1f2,#e8deff,#ffc4ae) border-box}
body.tema-kbeauty .tv-modal.tv-final .tv-tarjeta::before{display:none}
body.tema-kbeauty .tv-modal.tv-final .tv-dia{background:#fff3d2;color:#7a5208;border-color:#f1cb80;box-shadow:0 3px 0 #f4dca4}
body.tema-kbeauty .tv-modal.tv-final .tv-msg{font-size:1.16rem;text-align:center;border-color:#ffd9e4;
  background:radial-gradient(80% 60% at 50% 0,#fff 0,transparent 70%),linear-gradient(135deg,#fff4f7,#fff7ef 50%,#f3faee)}
body.tema-kbeauty .tv-modal.tv-final .tv-msg::before{left:50%;right:auto;width:22px;height:22px;margin-left:-11px;top:-12px;background-image:url("${FLOR_URI}")}

body.tema-kbeauty .tv-toast{background:#fff;color:#9a3d55;border:2px solid #ffd3c4;border-radius:999px;font-family:"Nunito",system-ui,sans-serif;font-weight:700;padding:10px 18px;
  box-shadow:0 6px 0 #ffe3d8,0 12px 26px rgba(160,70,60,.18)}

@media (min-width:700px){
  body.tema-kbeauty .kb-tienda{max-width:720px}
  body.tema-kbeauty .kb-toldo-400,body.tema-kbeauty .kb-mostrador-400{display:none}
  body.tema-kbeauty .kb-toldo-720,body.tema-kbeauty .kb-mostrador-720{display:block}
  body.tema-kbeauty .kb-vitrina{margin:-30px 24px 0;padding:48px 30px 100px}
  body.tema-kbeauty .tv-puertas{grid-template-columns:repeat(6,minmax(0,1fr));column-gap:20px;row-gap:28px}
  body.tema-kbeauty .tv-puerta::after{left:-11px;right:-11px}
  body.tema-kbeauty .kb-num{font-size:1.8rem}
  body.tema-kbeauty .kb-mostrador{margin-top:-82px}
}

@keyframes kbeauty-flota{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-9px) rotate(6deg)}}
@keyframes kbeauty-balanceo{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
@keyframes kbeauty-guino{0%,100%{transform:scale(.5);opacity:.35}50%{transform:scale(1);opacity:1}}
@keyframes kbeauty-salta{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes kbeauty-brilla{0%,100%{transform:scale(.4) rotate(0);opacity:.3}50%{transform:scale(1) rotate(45deg);opacity:1}}
@keyframes kbeauty-meneo{0%{transform:scale(1)}30%{transform:scale(1.06,.95)}60%{transform:scale(.97,1.04)}100%{transform:scale(1)}}
@keyframes kbeauty-destapa{0%{transform:none}45%{transform:translateY(-70%) rotate(-10deg)}100%{transform:translateY(-120%) rotate(18deg) scale(.8);opacity:.2}}
@keyframes kbeauty-pop{from{transform:scale(.8) translateY(18px);opacity:0}to{transform:none;opacity:1}}

@media (prefers-reduced-motion:reduce){
  body.tema-kbeauty .kb-deco,body.tema-kbeauty .kb-colgante,body.tema-kbeauty .kb-guino path,body.tema-kbeauty .kb-e-hoy,body.tema-kbeauty .kb-brillo,
  body.tema-kbeauty .tv-tarjeta,body.tema-kbeauty .kb-tapa,body.tema-kbeauty .kb-cuerpo{animation:none!important;transition:none!important}
}
`;

  var DESTELLOS = ["#ffc94d", "#ff8fb0", "#7cc8ea", "#ffd27a", "#9ccc8a"];

  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "kbeauty",
    nombre: "K-beauty",
    emoji: "🌸",
    descripcion: "Una tiendita de cuidado de la piel con tarritos pastel, gotitas y mucho brillo.",
    fuentes: "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=Nunito:ital,wght@0,500;0,600;0,700;0,800;1,600&display=swap",
    color: "#f4a7bf",
    css: CSS,
    orden: ORDEN,
    escena: function () {
      return ambiente() +
        '<header class="kb-cabecera">' +
        '<p class="kb-sobre">24 días de glow</p>' +
        '<h1 class="kb-titulo">Calendario <span>de adviento</span></h1>' +
        '<p class="tv-para"></p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<div class="kb-tienda">' + toldo(400) + toldo(720) +
        '<div class="kb-vitrina"><div class="tv-puertas"></div></div>' +
        mostrador(400) + mostrador(720) + "</div>" +
        '<p class="kb-pie">Toca un tarrito para descubrir tu sorpresa</p>';
    },
    puerta: function (n, estado) {
      var pos = ORDEN.indexOf(n);
      var col = n === 24 ? "kb-c6" : "kb-c" + ((pos < 0 ? n : pos) % 5 + 1);
      var forma = n === 24 ? "pote" : FORMAS[(pos < 0 ? n : pos) % 3];
      var h = '<span class="kb-w ' + col + " kb-f-" + forma + " kb-e-" + estado + '" aria-hidden="true">';
      if (estado === "abierta") {
        h += '<span class="kb-cuerpo"><svg class="kb-icono" viewBox="0 0 32 32" focusable="false">' + (ICONO[tipoDe(n)] || ICONO.mensaje) + "</svg>" +
          '<span class="kb-mini">' + n + "</span></span>" + '<span class="kb-tapa"></span>';
      } else {
        h += '<span class="kb-cuerpo"><span class="kb-etq"><span class="kb-num">' + n + '</span><span class="kb-lin"></span></span></span>' +
          '<span class="kb-tapa"></span>';
        if (estado === "bloqueada") h += '<span class="kb-cinta"></span>' + CANDADO;
        else if (estado === "disponible") h += GOTITA;
        else h += '<span class="kb-hoy">¡Hoy!</span>' + GUINO.replace("kb-brillo", "kb-brillo b1") + GUINO.replace("kb-brillo", "kb-brillo b2");
      }
      return h + "</span>";
    },
    alAbrir: function (boton, n, capa) {
      return new Promise(function (resolver) {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { resolver(); return; }
        var r = boton.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.4;
        var piezas = [], i, el, tam, dx, dy, dur, ang, dist;
        boton.classList.add("kb-abriendo");
        if (typeof document.body.animate === "function") {
          var aro = document.createElement("span");
          aro.className = "kb-aro";
          aro.style.cssText = "left:" + (cx - 22) + "px;top:" + (cy - 22) + "px;width:44px;height:44px";
          capa.appendChild(aro); piezas.push(aro);
          aro.animate([{ transform: "scale(.3)", opacity: 1 }, { transform: "scale(3.6)", opacity: 0 }], { duration: 600, easing: "ease-out", fill: "forwards" });
          /* burbujas que suben */
          for (i = 0; i < 18; i++) {
            el = document.createElement("span");
            el.className = "kb-burbuja";
            tam = 10 + Math.random() * 18;
            el.style.width = tam + "px"; el.style.height = tam + "px";
            el.style.left = (cx - tam / 2 + (Math.random() - 0.5) * r.width * 0.6) + "px";
            el.style.top = (cy - tam / 2 + Math.random() * r.height * 0.3) + "px";
            capa.appendChild(el); piezas.push(el);
            dx = (Math.random() - 0.5) * 120; dy = -(70 + Math.random() * 110);
            dur = 600 + Math.random() * 200;
            el.animate([
              { transform: "translate(0,0) scale(.2)", opacity: 0 },
              { transform: "translate(" + (dx * 0.4) + "px," + (dy * 0.45) + "px) scale(1)", opacity: 1, offset: 0.35 },
              { transform: "translate(" + dx + "px," + dy + "px) scale(1.15)", opacity: 0 }
            ], { duration: dur, delay: Math.random() * 120, easing: "cubic-bezier(.2,.7,.4,1)", fill: "both" });
          }
          /* destellos */
          for (i = 0; i < 10; i++) {
            el = document.createElement("span");
            el.className = "kb-destello";
            tam = 12 + Math.random() * 12;
            ang = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
            dist = 34 + Math.random() * 60;
            el.style.width = tam + "px"; el.style.height = tam + "px";
            el.style.left = (cx + Math.cos(ang) * dist - tam / 2) + "px";
            el.style.top = (cy + Math.sin(ang) * dist - tam / 2) + "px";
            el.innerHTML = '<svg viewBox="0 0 24 24">' + chispa(12, 12, 11, DESTELLOS[i % DESTELLOS.length]) + "</svg>";
            capa.appendChild(el); piezas.push(el);
            el.animate([
              { transform: "scale(0) rotate(0deg)", opacity: 0 },
              { transform: "scale(1.1) rotate(45deg)", opacity: 1, offset: 0.45 },
              { transform: "scale(0) rotate(90deg)", opacity: 0 }
            ], { duration: 520, delay: 80 + Math.random() * 260, easing: "ease-out", fill: "both" });
          }
        }
        setTimeout(resolver, 780);
        setTimeout(function () {
          piezas.forEach(function (p) { if (p.parentNode) p.parentNode.removeChild(p); });
          boton.classList.remove("kb-abriendo");
        }, 900);
      });
    }
  });
})();
