/* Estilo «Kawaii»: casita pastel con una conejita y un osito propios. Todo el arte es original. */
(function () {
  "use strict";

  var ORDEN = [9, 3, 17, 12, 21, 6,
               14, 1, 23, 8, 19, 11,
               5, 16, 2, 20, 13, 7,
               18, 10, 22, 4, 15, 24];

  function svgUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function corazon(cx, cy, s, fill, extra) {
    return '<path transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')" d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="' + fill + '"' + (extra || "") + "/>";
  }
  function estrella(cx, cy, r, fill, extra) {
    var p = [], i, a, rr;
    for (i = 0; i < 10; i++) {
      a = -Math.PI / 2 + i * Math.PI / 5; rr = i % 2 ? r * 0.5 : r;
      p.push((cx + Math.cos(a) * rr).toFixed(1) + " " + (cy + Math.sin(a) * rr).toFixed(1));
    }
    return '<path d="M' + p.join(" L") + 'Z" fill="' + fill + '" stroke-linejoin="round"' + (extra || "") + "/>";
  }
  function chispa(cx, cy, r, fill, extra) {
    return '<path d="M' + cx + " " + (cy - r) + " Q" + cx + " " + cy + " " + (cx + r) + " " + cy + " Q" + cx + " " + cy + " " + cx + " " + (cy + r) + " Q" + cx + " " + cy + " " + (cx - r) + " " + cy + " Q" + cx + " " + cy + " " + cx + " " + (cy - r) + 'Z" fill="' + fill + '"' + (extra || "") + "/>";
  }

  /* ---------- Personajes propios ---------- */
  function conejita(x, y, s) {
    var b = "#fffafd", l = "#e6b0ca", w = ' stroke="' + l + '" stroke-width="2.2"';
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="2" rx="27" ry="5" fill="#d9c3ea" opacity=".55"/>' +
      '<ellipse cx="-11" cy="-76" rx="8" ry="22" transform="rotate(-12 -11 -76)" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="13" cy="-77" rx="8" ry="22" transform="rotate(16 13 -77)" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="-11" cy="-74" rx="3.6" ry="15" transform="rotate(-12 -11 -74)" fill="#ffc4da"/>' +
      '<ellipse cx="13" cy="-75" rx="3.6" ry="15" transform="rotate(16 13 -75)" fill="#ffc4da"/>' +
      '<ellipse cx="0" cy="-15" rx="21" ry="17" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="-10" cy="0" rx="8" ry="4.5" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="10" cy="0" rx="8" ry="4.5" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="0" cy="-45" rx="27" ry="22" fill="' + b + '"' + w + "/>" +
      '<path d="M-6 -64 q3 -3 6 0" stroke="#ffb3cd" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-9.5" cy="-46" r="3.3" fill="#4a3550"/><circle cx="9.5" cy="-46" r="3.3" fill="#4a3550"/>' +
      '<circle cx="-8.3" cy="-47.3" r="1.2" fill="#fff"/><circle cx="10.7" cy="-47.3" r="1.2" fill="#fff"/>' +
      '<ellipse cx="-17" cy="-38.5" rx="5" ry="3" fill="#ffb0cb"/><ellipse cx="17" cy="-38.5" rx="5" ry="3" fill="#ffb0cb"/>' +
      '<ellipse cx="0" cy="-42" rx="1.9" ry="1.4" fill="#ff8fb3"/>' +
      '<path d="M-3 -39.6 q1.5 2.2 3 0 q1.5 2.2 3 0" stroke="#4a3550" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      corazon(0, -16, 1.45, "#ff7fab", ' stroke="#e2588d" stroke-width=".8"') +
      '<ellipse cx="-9" cy="-15" rx="4.6" ry="3.6" fill="' + b + '" stroke="' + l + '" stroke-width="1.6"/>' +
      '<ellipse cx="9" cy="-15" rx="4.6" ry="3.6" fill="' + b + '" stroke="' + l + '" stroke-width="1.6"/>' +
      "</g>";
  }
  function osito(x, y, s) {
    var b = "#efc195", l = "#c98f60", w = ' stroke="' + l + '" stroke-width="2.2"';
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')">' +
      '<ellipse cx="0" cy="2" rx="28" ry="5" fill="#d9c3ea" opacity=".55"/>' +
      '<circle cx="-20" cy="-63" r="9.5" fill="' + b + '"' + w + '/><circle cx="20" cy="-63" r="9.5" fill="' + b + '"' + w + "/>" +
      '<circle cx="-20" cy="-63" r="4.8" fill="#f8d9bd"/><circle cx="20" cy="-63" r="4.8" fill="#f8d9bd"/>' +
      '<ellipse cx="0" cy="-15" rx="22" ry="17" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="0" cy="-12" rx="12" ry="10" fill="#f8dcc2"/>' +
      '<ellipse cx="-11" cy="0" rx="8.5" ry="4.5" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="11" cy="0" rx="8.5" ry="4.5" fill="' + b + '"' + w + "/>" +
      '<ellipse cx="0" cy="-45" rx="28" ry="23" fill="' + b + '"' + w + "/>" +
      '<path d="M-20 -26 q20 8 40 0 l-1 6 q-19 7 -38 0z" fill="#8fdcc0" stroke="#5fbf9c" stroke-width="1.6"/>' +
      '<path d="M12 -24 l4 14 l-7 -1 z" fill="#8fdcc0" stroke="#5fbf9c" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<ellipse cx="0" cy="-38" rx="11" ry="8" fill="#fff3e4"/>' +
      '<ellipse cx="0" cy="-41" rx="3.6" ry="2.6" fill="#5a3a2a"/>' +
      '<path d="M0 -38.5 v2 M-3 -35.6 q3 2.2 6 0" stroke="#5a3a2a" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-11" cy="-49" r="3.2" fill="#3f2a22"/><circle cx="11" cy="-49" r="3.2" fill="#3f2a22"/>' +
      '<circle cx="-9.9" cy="-50.2" r="1.1" fill="#fff"/><circle cx="12.1" cy="-50.2" r="1.1" fill="#fff"/>' +
      '<ellipse cx="-19" cy="-40" rx="5" ry="3" fill="#ff9fb8" opacity=".75"/><ellipse cx="19" cy="-40" rx="5" ry="3" fill="#ff9fb8" opacity=".75"/>' +
      estrella(0, -14, 9, "#ffd95e", ' stroke="#eab53a" stroke-width="1.4"') +
      '<ellipse cx="-10" cy="-12" rx="4.8" ry="3.8" fill="' + b + '" stroke="' + l + '" stroke-width="1.6"/>' +
      '<ellipse cx="10" cy="-12" rx="4.8" ry="3.8" fill="' + b + '" stroke="' + l + '" stroke-width="1.6"/>' +
      "</g>";
  }
  function arbolito(x, y, s) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')">' +
      '<rect x="-4" y="-8" width="8" height="9" rx="2" fill="#d9a77f"/>' +
      '<path d="M0 -58 L18 -26 H-18Z M0 -40 L22 -6 H-22Z" fill="#9fe0c8" stroke="#6cc3a3" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="-7" cy="-14" r="2.6" fill="#ff8fb6"/><circle cx="8" cy="-20" r="2.6" fill="#b89cff"/><circle cx="-3" cy="-34" r="2.4" fill="#ffd95e"/><circle cx="6" cy="-42" r="2.2" fill="#ff8fb6"/>' +
      estrella(0, -60, 6.5, "#ffd95e", ' stroke="#eab53a" stroke-width="1.2"') +
      "</g>";
  }
  function regalito(x, y, w, h, c, cinta) {
    return '<g transform="translate(' + x + " " + y + ')">' +
      '<rect x="' + (-w / 2) + '" y="' + (-h) + '" width="' + w + '" height="' + h + '" rx="4" fill="' + c + '"/>' +
      '<rect x="-3" y="' + (-h) + '" width="6" height="' + h + '" fill="' + cinta + '"/>' +
      '<path d="M0 ' + (-h) + " c-4 -9 -14 -8 -10 -2 c2 3 7 3 10 2z M0 " + (-h) + ' c4 -9 14 -8 10 -2 c-2 3 -7 3 -10 2z" fill="' + cinta + '"/>' +
      "</g>";
  }

  /* ---------- Techo y base (ancho propio para celular y escritorio) ---------- */
  function techo(W) {
    var H = 132, m = W / 2, id = "kw-teja-" + W, g = "kw-tg-" + W;
    var borde = "M14 118 L" + (m - 18) + " 24 Q" + m + " 10 " + (m + 18) + " 24 L" + (W - 14) + " 118 Q" + (W - 6) + " 128 " + (W - 20) + " 128 H20 Q6 128 14 118Z";
    var s = '<svg class="kw-techo kw-techo-' + W + '" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffbfd5"/><stop offset="1" stop-color="#ff9dc0"/></linearGradient>' +
      '<pattern id="' + id + '" width="22" height="14" patternUnits="userSpaceOnUse"><path d="M0 14 a11 11 0 0 1 22 0" fill="none" stroke="#f585b0" stroke-width="2" opacity=".55"/></pattern></defs>';
    var cx = W * 0.74;
    s += '<rect x="' + (cx - 14) + '" y="34" width="28" height="56" rx="4" fill="#fff4f8" stroke="#f0a6c4" stroke-width="2.5"/>' +
      '<rect x="' + (cx - 18) + '" y="28" width="36" height="10" rx="5" fill="#c9b2ff" stroke="#a88ae8" stroke-width="2"/>';
    s += '<g class="kw-humo">' + corazon(cx - 4, 18, 0.7, "#ffb3cd") + corazon(cx + 6, 6, 0.5, "#d6c3ff") + "</g>";
    s += '<path d="' + borde + '" fill="url(#' + g + ')"/>' + '<path d="' + borde + '" fill="url(#' + id + ')"/>';
    s += '<path d="M' + (m - 18) + " 24 Q" + m + " 10 " + (m + 18) + ' 24" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>';
    /* guirnalda */
    var cols = ["#ffe066", "#9fe0c8", "#b89cff", "#fff", "#8fc8ff"], k, n = Math.round((m - 30) / 26), t, lx, ly, luces = "", cuerda = "";
    [[24, 112, m - 22, 34], [W - 24, 112, m + 22, 34]].forEach(function (L, lado) {
      cuerda += "M" + L[0] + " " + L[1];
      for (k = 0; k <= n; k++) {
        t = k / n; lx = L[0] + (L[2] - L[0]) * t; ly = L[1] + (L[3] - L[1]) * t;
        if (k > 0) cuerda += " Q" + (lx - (L[2] - L[0]) / n / 2).toFixed(1) + " " + (ly - (L[3] - L[1]) / n / 2 + 7).toFixed(1) + " " + lx.toFixed(1) + " " + ly.toFixed(1);
        luces += '<ellipse class="kw-luz" style="animation-delay:' + ((k * 0.37 + lado * 0.2) % 2.4).toFixed(2) + 's" cx="' + lx.toFixed(1) + '" cy="' + (ly + 4).toFixed(1) + '" rx="3.6" ry="4.6" fill="' + cols[(k + lado * 2) % cols.length] + '"/>';
      }
    });
    s += '<path d="' + cuerda + '" fill="none" stroke="#c4689a" stroke-width="1.4" opacity=".7"/>' + luces;
    /* ventanita de corazón */
    s += '<circle cx="' + m + '" cy="72" r="25" fill="#fff8fb" stroke="#ffe3ee" stroke-width="6"/>' +
      '<circle cx="' + m + '" cy="72" r="25" fill="none" stroke="#f08cb4" stroke-width="2"/>' +
      corazon(m, 72, 2, "#ff7fab") + chispa(m + 9, 63, 4, "#fff");
    /* glaseado */
    var gl = "";
    for (k = 20; k <= W - 20; k += 20) gl += '<circle cx="' + k + '" cy="124" r="10.5"/>';
    s += '<rect x="12" y="116" width="' + (W - 24) + '" height="10" rx="5" fill="#fff"/><g fill="#fff">' + gl + "</g>";
    s += '<g fill="#ffd0e1">';
    for (k = 30; k <= W - 30; k += 40) s += '<circle cx="' + k + '" cy="129" r="2"/>';
    s += "</g>";
    s += estrella(m, 14, 13, "#ffd95e", ' stroke="#eab53a" stroke-width="2" class="kw-punta"');
    return s + "</svg>";
  }
  function base(W) {
    var H = 112, y = H - 14;
    var s = '<svg class="kw-base kw-base-' + W + '" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">';
    s += '<ellipse cx="' + (W / 2) + '" cy="' + (H - 22) + '" rx="' + (W / 2 - 4) + '" ry="20" fill="#eadcff" opacity=".6"/>';
    s += '<ellipse cx="' + (W / 2) + '" cy="' + (H - 19) + '" rx="' + (W / 2 - 16) + '" ry="16" fill="#fff"/>';
    s += '<g fill="#f3e8ff">' + '<ellipse cx="' + (W * 0.3) + '" cy="' + (H - 12) + '" rx="22" ry="3"/><ellipse cx="' + (W * 0.7) + '" cy="' + (H - 14) + '" rx="18" ry="3"/></g>';
    if (W > 500) {
      s += arbolito(W * 0.2, y - 4, 1.05) + arbolito(W * 0.8, y - 4, 1.05) +
        regalito(W * 0.36, y, 30, 22, "#c9e5ff", "#8fc8ff") + regalito(W * 0.64, y, 30, 24, "#ffd8c2", "#ff9fc4");
    }
    s += regalito(W / 2 - 22, y, 34, 26, "#ffc8dc", "#b89cff") + regalito(W / 2 + 18, y + 2, 28, 34, "#bfeedd", "#ff8fb6") +
      regalito(W / 2 - 2, y + 4, 22, 16, "#fff0a6", "#8fc8ff");
    if (W <= 500) s += arbolito(W / 2 - 92, y - 2, 0.8) + arbolito(W / 2 + 92, y - 2, 0.8);
    s += conejita(W > 500 ? 92 : 50, y, W > 500 ? 1.08 : 0.92) + osito(W - (W > 500 ? 92 : 50), y, W > 500 ? 1.08 : 0.92);
    s += '<g fill="#fff">' + chispa(W * 0.08, 22, 5) + chispa(W * 0.92, 30, 4) + "</g>";
    return s + "</svg>";
  }

  /* ---------- Piezas de las puertas ---------- */
  var CARA = {
    despierta: '<circle cx="12" cy="8" r="2.8" fill="currentColor"/><circle cx="28" cy="8" r="2.8" fill="currentColor"/><circle cx="12.9" cy="7" r=".95" fill="#fff"/><circle cx="28.9" cy="7" r=".95" fill="#fff"/>' +
      '<ellipse cx="6" cy="12.6" rx="4" ry="2.3" fill="#ff7aa6" opacity=".45"/><ellipse cx="34" cy="12.6" rx="4" ry="2.3" fill="#ff7aa6" opacity=".45"/>' +
      '<path d="M17 11.6 q1.5 2.2 3 0 q1.5 2.2 3 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    dormida: '<path d="M8.5 7.5 q3.5 3.2 7 0 M24.5 7.5 q3.5 3.2 7 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '<ellipse cx="6" cy="12.6" rx="4" ry="2.3" fill="#ff7aa6" opacity=".35"/><ellipse cx="34" cy="12.6" rx="4" ry="2.3" fill="#ff7aa6" opacity=".35"/>' +
      '<ellipse cx="20" cy="13.4" rx="1.7" ry="1.3" fill="currentColor"/>',
    feliz: '<path d="M8.5 9.5 q3.5 -5 7 0 M24.5 9.5 q3.5 -5 7 0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
      '<ellipse cx="6" cy="12.6" rx="4.2" ry="2.5" fill="#ff6f9f" opacity=".6"/><ellipse cx="34" cy="12.6" rx="4.2" ry="2.5" fill="#ff6f9f" opacity=".6"/>' +
      '<path d="M16.4 11.2 h7.2 q0 5.4 -3.6 5.4 q-3.6 0 -3.6 -5.4z" fill="currentColor"/><path d="M18.2 15.2 q1.8 -1.6 3.6 0 q-1.8 1.4 -3.6 0z" fill="#ff8fb3"/>'
  };
  var ACC = [
    /* orejas de conejita */
    '<svg class="kw-acc kw-acc-conejo" viewBox="0 0 60 26" aria-hidden="true" focusable="false"><ellipse class="f" cx="19" cy="15" rx="7.5" ry="15" transform="rotate(-14 19 15)"/><ellipse class="f" cx="41" cy="15" rx="7.5" ry="15" transform="rotate(14 41 15)"/><ellipse class="i" cx="19" cy="16" rx="3.2" ry="10" transform="rotate(-14 19 16)"/><ellipse class="i" cx="41" cy="16" rx="3.2" ry="10" transform="rotate(14 41 16)"/></svg>',
    /* orejas de osito */
    '<svg class="kw-acc kw-acc-oso" viewBox="0 0 60 26" aria-hidden="true" focusable="false"><circle class="f" cx="13" cy="15" r="10"/><circle class="f" cx="47" cy="15" r="10"/><circle class="i" cx="13" cy="15" r="5"/><circle class="i" cx="47" cy="15" r="5"/></svg>',
    /* lazo */
    '<svg class="kw-lazo" viewBox="0 0 40 20" aria-hidden="true" focusable="false"><path class="b" d="M20 10 C12 0 2 1 3.5 10 C2 19 12 20 20 10z M20 10 C28 0 38 1 36.5 10 C38 19 28 20 20 10z"/><path d="M20 10 C14 5 8 5 7.5 10 M20 10 C26 5 32 5 32.5 10" fill="none" stroke="#fff" stroke-width="1.2" opacity=".6"/><circle class="b" cx="20" cy="10" r="4"/><circle cx="19" cy="9" r="1.2" fill="#fff" opacity=".7"/></svg>'
  ];
  var ACC24 = '<svg class="kw-lazo kw-acc-estrella" viewBox="0 0 40 26" aria-hidden="true" focusable="false">' + estrella(20, 14, 12, "#ffd95e", ' stroke="#e9ac2c" stroke-width="2"') + chispa(6, 6, 4, "#fff") + chispa(35, 4, 3, "#fff") + "</svg>";
  var CANDADO = '<svg class="kw-candado" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 7 V5.2 a3 3 0 0 1 6 0 V7" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="7" width="10" height="7.6" rx="2.4" fill="currentColor"/>' + corazon(8, 10.6, 0.32, "#fff") + "</svg>";
  var BRILLO = '<svg class="kw-brillo" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' + chispa(10, 10, 9, "#fff") + "</svg>";
  var ICONO = {
    mensaje: '<rect x="4" y="8" width="24" height="17" rx="3" fill="#fff" stroke="currentColor" stroke-width="2"/><path d="M5 10 l11 8 l11 -8" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' + corazon(24, 6, 0.55, "#ff6f9f"),
    foto: '<rect x="6" y="4" width="20" height="24" rx="2" fill="#fff" stroke="currentColor" stroke-width="2" transform="rotate(-6 16 16)"/><g transform="rotate(-6 16 16)"><rect x="9" y="7" width="14" height="13" rx="1" fill="#cfe8ff"/><circle cx="19" cy="10.5" r="2" fill="#ffd95e"/><path d="M9 20 l5 -6 l4 4 l2 -2 l3 4z" fill="#7cc8a4"/></g>',
    vale: '<path d="M3 10 h26 v4 a2.6 2.6 0 0 0 0 5.2 v4 h-26 v-4 a2.6 2.6 0 0 0 0 -5.2z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M11 11.5 v10.5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>' + corazon(20, 16.8, 0.62, "#ff6f9f"),
    cancion: '<path d="M12 23 V8.5 l13 -3.2 v14.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 12 l13 -3.2" stroke="currentColor" stroke-width="2.4"/><ellipse cx="8.8" cy="23" rx="3.8" ry="3.2" fill="currentColor"/><ellipse cx="21.8" cy="20" rx="3.8" ry="3.2" fill="currentColor"/>',
    regalo: '<rect x="5" y="14" width="22" height="13" rx="2" fill="#fff" stroke="currentColor" stroke-width="2"/><rect x="4" y="10" width="24" height="5" rx="1.5" fill="#ffc8dc" stroke="currentColor" stroke-width="2"/><path d="M16 10 v17" stroke="currentColor" stroke-width="2"/><path d="M16 10 c-3 -6 -9 -5 -7 -1.5 c1 1.6 4.5 1.8 7 1.5z M16 10 c3 -6 9 -5 7 -1.5 c-1 1.6 -4.5 1.8 -7 1.5z" fill="#ffc8dc" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    final: corazon(16, 16, 2.1, "#ff6f9f", ' stroke="currentColor" stroke-width=".9"') + chispa(25, 6, 3.5, "#ffd95e") + chispa(6, 24, 2.6, "#ffd95e")
  };
  function tipoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? "final" : d.tipo;
    } catch (e) { /* sin motor */ }
    return n === 24 ? "final" : "mensaje";
  }

  /* ---------- Escena ---------- */
  function cielo() {
    var cosas = [
      ["c", 6, 10, 22, "#ffb3cd", 0], ["e", 88, 8, 20, "#ffe08a", 0.6], ["x", 18, 30, 14, "#fff", 1.2],
      ["c", 92, 34, 16, "#c9b2ff", 1.8], ["e", 4, 52, 16, "#9fe0c8", 0.3], ["x", 95, 58, 12, "#fff", 2.1],
      ["c", 3, 78, 18, "#ffc8dc", 1.1], ["e", 94, 82, 18, "#ffe08a", 1.6], ["x", 50, 3, 12, "#fff", 0.9]
    ];
    return '<div class="kw-cielo" aria-hidden="true">' + cosas.map(function (c) {
      var forma = c[0] === "c" ? corazon(12, 13, 1.35, c[4]) : c[0] === "e" ? estrella(12, 12, 10, c[4]) : chispa(12, 12, 10, c[4]);
      return '<svg class="kw-deco" viewBox="0 0 24 24" style="left:' + c[1] + "%;top:" + c[2] + "%;width:" + c[3] + "px;animation-delay:" + c[5] + 's">' + forma + "</svg>";
    }).join("") + "</div>";
  }

  var MIRON = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 60">' +
    '<g transform="translate(52 78) scale(.82)">' + conejita(0, 0, 1).replace(/^<g[^>]*>/, "<g>") + "</g>" +
    '<g transform="translate(118 80) scale(.82)">' + osito(0, 0, 1).replace(/^<g[^>]*>/, "<g>") + "</g>" +
    '<g fill="#ffd95e">' + chispa(86, 16, 6, "#ffd95e") + "</g>" + corazon(86, 36, 0.9, "#ff8fb6") + "</svg>");
  var REGALO_SVG = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 72">' +
    '<ellipse cx="40" cy="68" rx="30" ry="4" fill="#f3d3c2"/>' +
    '<rect x="12" y="30" width="56" height="36" rx="6" fill="#ffd8c2" stroke="#e79b74" stroke-width="2.5"/>' +
    '<rect x="8" y="20" width="64" height="13" rx="4" fill="#ffc8dc" stroke="#e58bb0" stroke-width="2.5"/>' +
    '<rect x="35" y="20" width="10" height="46" fill="#b89cff"/>' +
    '<path d="M40 20 c-6 -14 -24 -12 -18 -3 c3 4 12 4 18 3z M40 20 c6 -14 24 -12 18 -3 c-3 4 -12 4 -18 3z" fill="#b89cff" stroke="#8f71e0" stroke-width="2" stroke-linejoin="round"/>' +
    chispa(70, 10, 6, "#ffd95e") + chispa(10, 12, 4, "#ffd95e") + "</svg>");
  var DISCO_SVG = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
    '<circle cx="40" cy="40" r="34" fill="#6d4f8f"/><circle cx="40" cy="40" r="27" fill="none" stroke="#8a6aad" stroke-width="1.5"/><circle cx="40" cy="40" r="20" fill="none" stroke="#8a6aad" stroke-width="1.5"/>' +
    '<circle cx="40" cy="40" r="12" fill="#ffc8dc"/>' + corazon(40, 40, 0.75, "#ff6f9f") +
    '<path d="M18 22 a30 30 0 0 1 16 -9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"/></svg>');
  var CINTA = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 26"><path d="M3 2 h84 l-3 5 l3 5 l-3 5 l3 5 l-3 2 H3 l3 -4 l-3 -5 l3 -5 l-3 -5 l3 -3z" fill="#c9b2ff" opacity=".85"/><g fill="#fff" opacity=".7"><circle cx="18" cy="13" r="2.5"/><circle cx="38" cy="13" r="2.5"/><circle cx="58" cy="13" r="2.5"/><circle cx="78" cy="13" r="2.5"/></g></svg>');
  var PUNTOS = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><circle cx="11" cy="11" r="2.4" fill="#ffffff" opacity=".85"/><circle cx="33" cy="33" r="2.4" fill="#ffffff" opacity=".85"/><path transform="translate(33 11) scale(.4)" d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="#ffc0d6" opacity=".7"/></svg>');
  var CORAZON_URI = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 -10 22 18">' + corazon(0, 0, 1, "#ff7fab") + "</svg>");

  var CSS = `
body.tema-kawaii{
  font-family:"Fredoka","Nunito",system-ui,sans-serif; color:#5b3a5e;
  background-color:#fde8f1;
  background-image:url("${PUNTOS}"),linear-gradient(180deg,#ffe6f0 0%,#f3e9ff 52%,#e4f7ef 100%);
  background-size:44px 44px,100% 100%;
  background-attachment:scroll;
}
body.tema-kawaii #tv-escena{position:relative;padding:0 16px 96px;min-height:100vh;min-height:100dvh}
body.tema-kawaii .kw-cielo{position:absolute;inset:0;pointer-events:none;overflow:hidden}
body.tema-kawaii .kw-deco{position:absolute;height:auto;opacity:.85;animation:kawaii-flota 6s ease-in-out infinite}
body.tema-kawaii .kw-cabecera{position:relative;text-align:center;padding:26px 0 10px;max-width:720px;margin:0 auto}
body.tema-kawaii .kw-sobre{display:inline-flex;align-items:center;gap:8px;margin:0 0 4px;font-size:.82rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#a8325f}
body.tema-kawaii .kw-sobre svg{width:12px;height:12px}
body.tema-kawaii .kw-titulo{margin:0;font-weight:700;font-size:clamp(1.85rem,8.4vw,2.9rem);line-height:1.05;color:#b03a74;letter-spacing:.01em;
  text-shadow:0 3px 0 #fff,0 6px 0 rgba(255,170,205,.45)}
body.tema-kawaii .kw-titulo span{display:block;color:#7a4fc0;font-size:.62em;margin-top:2px}
body.tema-kawaii .tv-para{display:inline-flex;align-items:center;gap:8px;margin:14px 0 0;padding:7px 20px;border-radius:999px;
  background:#fff;color:#8a2f63;font-weight:600;font-size:1.08rem;border:2px dashed #ffb3cd;box-shadow:0 4px 0 #ffd6e5}
body.tema-kawaii .tv-para::before,body.tema-kawaii .tv-para::after{content:"";width:16px;height:13px;background:url("${CORAZON_URI}") center/contain no-repeat}
body.tema-kawaii .tv-cuenta{display:block;width:max-content;max-width:100%;margin:12px auto 0;padding:6px 16px;border-radius:999px;background:#dff6ed;color:#1d6a53;font-weight:500;font-size:.95rem}

body.tema-kawaii .tv-cuenta[hidden]{display:none}
body.tema-kawaii .kw-casa{position:relative;max-width:400px;margin:6px auto 0}
body.tema-kawaii .kw-techo,body.tema-kawaii .kw-base{display:block;width:100%;height:auto;overflow:visible}
body.tema-kawaii .kw-techo{position:relative;z-index:2;filter:drop-shadow(0 6px 6px rgba(200,110,160,.18))}
body.tema-kawaii .kw-techo-720,body.tema-kawaii .kw-base-720{display:none}
body.tema-kawaii .kw-cuerpo{position:relative;z-index:1;margin:-14px 14px 0;padding:30px 10px 30px;border-radius:10px 10px 30px 30px;
  background:#fffaf5 radial-gradient(circle at 50% 0,#fff 0,transparent 70%);
  border:3px solid #ffc6da;border-top:0;
  box-shadow:inset 0 -10px 0 #fff0f5,0 16px 30px rgba(180,100,160,.18)}
body.tema-kawaii .kw-base{position:relative;z-index:3;margin-top:-30px}
body.tema-kawaii .kw-pie{position:relative;text-align:center;margin:10px 0 0;font-size:.95rem;color:#8a5a8a}
body.tema-kawaii .kw-humo path{animation:kawaii-humo 3.2s ease-in-out infinite}
body.tema-kawaii .kw-humo path:nth-child(2){animation-delay:1.1s}
body.tema-kawaii .kw-luz{animation:kawaii-luz 2.4s ease-in-out infinite}

/* Puertas */
body.tema-kawaii .tv-puertas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:10px;row-gap:20px;padding:0}
body.tema-kawaii .tv-puerta{position:relative;display:block;width:100%;aspect-ratio:1/1.08;min-height:56px;padding:0;border:0;background:none;border-radius:22px;
  font-family:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
body.tema-kawaii .tv-puerta:focus-visible{outline:3px solid #7c4dff;outline-offset:4px}
body.tema-kawaii .kw-w{position:absolute;inset:0;display:block}
body.tema-kawaii .kw-c1{--c:#ffc8dc;--s:#f39ab9;--d:#a8325f;--l:#fff2f7;--lazo:#a98bf5}
body.tema-kawaii .kw-c2{--c:#ddccff;--s:#b9a1f2;--d:#5b3da3;--l:#f7f2ff;--lazo:#ff7fab}
body.tema-kawaii .kw-c3{--c:#bfeedd;--s:#8bd5ba;--d:#1d6a53;--l:#eefbf6;--lazo:#ff7fab}
body.tema-kawaii .kw-c4{--c:#ffd8c2;--s:#f3ad8b;--d:#974219;--l:#fff4ed;--lazo:#a98bf5}
body.tema-kawaii .kw-c5{--c:#c9e5ff;--s:#96c4ef;--d:#245a8f;--l:#f0f8ff;--lazo:#ff7fab}
body.tema-kawaii .kw-c6{--c:#fff0a6;--s:#ecc95a;--d:#7d5d00;--l:#fffbe6;--lazo:#ff7fab}
body.tema-kawaii .kw-acc{position:absolute;left:50%;top:-14px;width:66%;height:auto;transform:translateX(-50%)}
body.tema-kawaii .kw-acc .f{fill:var(--c);stroke:var(--s);stroke-width:2}
body.tema-kawaii .kw-acc .i{fill:#fff;opacity:.75}
body.tema-kawaii .kw-lazo{position:absolute;left:50%;top:-9px;width:44%;max-width:44px;height:auto;transform:translateX(-50%);z-index:3;filter:drop-shadow(0 2px 0 rgba(0,0,0,.08))}
body.tema-kawaii .kw-lazo .b{fill:var(--lazo)}
body.tema-kawaii .kw-acc-estrella{top:-15px;width:52%;max-width:50px}
body.tema-kawaii .kw-p{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  border-radius:24px 24px 20px 20px;background:var(--c);color:var(--d);
  box-shadow:inset 0 -6px 0 rgba(255,255,255,.35),inset 0 3px 0 rgba(255,255,255,.6),0 4px 0 var(--s),0 10px 16px rgba(160,90,140,.16);
  transition:transform .18s ease,box-shadow .18s ease}
body.tema-kawaii .kw-p::before{content:"";position:absolute;inset:5px;border:2px dashed rgba(255,255,255,.9);border-radius:19px 19px 15px 15px;pointer-events:none}
body.tema-kawaii .kw-num{position:relative;font-weight:600;font-size:clamp(1.35rem,5.8vw,2rem);line-height:1;letter-spacing:-.01em}
body.tema-kawaii .kw-cara{position:relative;width:56%;max-width:48px;height:auto;display:block}
body.tema-kawaii .tv-puerta:not([data-estado="bloqueada"]):hover .kw-p{transform:translateY(-3px)}
body.tema-kawaii .tv-puerta:not([data-estado="bloqueada"]):active .kw-p{transform:translateY(2px);box-shadow:inset 0 -6px 0 rgba(255,255,255,.35),0 1px 0 var(--s),0 4px 8px rgba(160,90,140,.16)}

/* bloqueada: dormida, con rayitas */
body.tema-kawaii .kw-e-bloqueada .kw-p{background:repeating-linear-gradient(-45deg,rgba(255,255,255,.28) 0 7px,transparent 7px 14px),var(--c)}
body.tema-kawaii .kw-e-bloqueada .kw-acc,body.tema-kawaii .kw-e-bloqueada .kw-lazo{opacity:.9}
body.tema-kawaii .kw-candado{position:absolute;right:7px;bottom:7px;width:15px;height:15px;color:var(--d);opacity:.8}
body.tema-kawaii .kw-zz{position:absolute;top:7px;right:10px;font-size:.72rem;font-weight:600;color:var(--d);opacity:.65;animation:kawaii-zz 3s ease-in-out infinite}

/* hoy */
body.tema-kawaii .kw-e-hoy{animation:kawaii-salta 2.2s ease-in-out infinite}
body.tema-kawaii .kw-e-hoy .kw-p{background:radial-gradient(circle at 50% 30%,#fff 0,var(--c) 70%);
  box-shadow:0 0 0 3px #fff,0 0 0 6px #ff8fb6,0 4px 0 6px #f06a9b,0 0 26px 8px rgba(255,143,182,.55)}
body.tema-kawaii .kw-hoy{position:absolute;z-index:4;right:-8px;top:-10px;padding:3px 8px;border-radius:999px;background:#ffe066;color:#6b4300;
  font-size:.72rem;font-weight:700;letter-spacing:.02em;transform:rotate(10deg);box-shadow:0 2px 0 #e7b82c}
body.tema-kawaii .kw-brillo{position:absolute;z-index:4;width:14px;height:14px;animation:kawaii-brilla 1.6s ease-in-out infinite}
body.tema-kawaii .kw-brillo.b1{left:-6px;top:26%}
body.tema-kawaii .kw-brillo.b2{right:-5px;bottom:18%;width:11px;height:11px;animation-delay:.8s}
body.tema-kawaii .kw-brillo path{fill:#ffd95e}

/* disponible */
body.tema-kawaii .kw-e-disponible .kw-p::after{content:"";position:absolute;top:9px;left:11px;width:9px;height:9px;border-radius:50%;background:#fff;opacity:.8}

/* abierta: puertita abierta y un dibujito adentro */
body.tema-kawaii .kw-e-abierta .kw-p{background:var(--l);justify-content:center;
  box-shadow:inset 0 4px 10px rgba(120,60,110,.14),0 4px 0 var(--s),0 10px 16px rgba(160,90,140,.12)}
body.tema-kawaii .kw-e-abierta .kw-p::before{border-color:var(--c)}
body.tema-kawaii .kw-hoja{position:absolute;left:-3px;top:2px;bottom:2px;width:24%;border-radius:20px 8px 8px 18px;background:var(--c);
  box-shadow:inset -3px 0 0 rgba(255,255,255,.5),2px 2px 6px rgba(120,60,110,.15);transform-origin:left center;transform:perspective(160px) rotateY(-38deg)}
body.tema-kawaii .kw-hoja::after{content:"";position:absolute;right:5px;top:50%;width:5px;height:5px;margin-top:-2.5px;border-radius:50%;background:var(--d);opacity:.5}
body.tema-kawaii .kw-icono{position:relative;width:46%;max-width:46px;height:auto;color:var(--d);margin-left:10%}
body.tema-kawaii .kw-mini{position:absolute;top:7px;right:10px;font-size:clamp(.85rem,3.6vw,1.05rem);font-weight:700;line-height:1;color:var(--d)}
body.tema-kawaii .tv-puerta.kw-abriendo .kw-p{animation:kawaii-meneo .55s ease-in-out}
body.tema-kawaii .tv-puerta.kw-abriendo .kw-hoja{animation:kawaii-abre .5s ease-out both}

/* Efecto al abrir */
body.tema-kawaii .kw-part{position:absolute;left:0;top:0;display:block;will-change:transform,opacity}
body.tema-kawaii .kw-part svg{display:block;width:100%;height:100%}
body.tema-kawaii .kw-aro{position:absolute;border-radius:50%;border:3px solid #ff9fc4;box-shadow:0 0 0 3px #fff inset}

/* Ventana */
body.tema-kawaii .tv-modal{background:rgba(110,60,125,.36);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}
body.tema-kawaii .tv-tarjeta{max-width:400px;padding:76px 22px 22px;border-radius:32px;background:#fffaf6;color:#5b3a5e;border:3px solid #ffc6da;
  box-shadow:0 0 0 6px rgba(255,255,255,.75),0 26px 60px rgba(120,40,100,.35);font-family:"Fredoka","Nunito",system-ui,sans-serif;
  animation:kawaii-pop .42s cubic-bezier(.2,1.4,.4,1) both}
body.tema-kawaii .tv-tarjeta::before{content:"";position:absolute;left:0;right:0;top:0;height:22px;
  background:radial-gradient(circle at 12px 0,#ffd3e3 11px,transparent 12px) 0 0/24px 22px repeat-x}
body.tema-kawaii .tv-tarjeta::after{content:"";position:absolute;left:50%;top:14px;width:150px;height:53px;margin-left:-75px;
  background:url("${MIRON}") center bottom/contain no-repeat;pointer-events:none}
body.tema-kawaii .tv-dia{display:inline-block;margin:0 0 16px;padding:5px 20px;border-radius:999px;background:#ffe1ec;color:#a02c5c;
  font-weight:700;font-size:1.3rem;border:2px solid #ffb3cd;box-shadow:0 3px 0 #ffd0e0}
body.tema-kawaii .tv-contenido{margin:0 0 14px}
body.tema-kawaii .tv-msg{margin:0;padding:16px 16px 14px;border-radius:18px;font-family:"Mali","Fredoka",cursive;font-weight:500;font-size:1.12rem;line-height:30px;color:#5b3a5e;
  background:#fff repeating-linear-gradient(180deg,transparent 0 28px,#ffe1ec 28px 30px);background-position:0 16px;
  border:2px solid #ffe1ec;text-align:left}
body.tema-kawaii .tv-foto{position:relative;margin:6px 8px 0;padding:10px 10px 12px;background:#fff;border-radius:6px;transform:rotate(-1.6deg);
  box-shadow:0 2px 0 #f3dbe6,0 12px 24px rgba(120,60,110,.18)}
body.tema-kawaii .tv-foto::before{content:"";position:absolute;left:50%;top:-11px;width:90px;height:26px;margin-left:-45px;transform:rotate(3deg);
  background:url("${CINTA}") center/contain no-repeat}
body.tema-kawaii .tv-foto img{border-radius:3px}
body.tema-kawaii .tv-foto figcaption{margin-top:10px;font-family:"Mali","Fredoka",cursive;font-weight:600;font-size:1.05rem;color:#8a2f63}
body.tema-kawaii .tv-vale{position:relative;padding:20px 26px 18px;border:0;border-radius:18px;background:#dff6ed;color:#1d6a53;
  -webkit-mask:radial-gradient(circle 13px at 0 50%,transparent 97%,#000) left/51% 100% no-repeat,radial-gradient(circle 13px at 100% 50%,transparent 97%,#000) right/51% 100% no-repeat;
          mask:radial-gradient(circle 13px at 0 50%,transparent 97%,#000) left/51% 100% no-repeat,radial-gradient(circle 13px at 100% 50%,transparent 97%,#000) right/51% 100% no-repeat}
body.tema-kawaii .tv-vale::before{content:"";position:absolute;inset:8px 20px;border:2px dashed #7fcfb3;border-radius:12px;pointer-events:none}
body.tema-kawaii .tv-vale-por{position:relative;display:inline-block;padding:2px 12px;border-radius:999px;background:#fff;color:#1d6a53;font-size:.78rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
body.tema-kawaii .tv-vale-que{position:relative;margin:8px 0 4px;font-size:1.65rem;font-weight:700;line-height:1.15;color:#155a45}
body.tema-kawaii .tv-vale-nota{position:relative;opacity:1;color:#2c6f5a;font-size:.92rem}
body.tema-kawaii .tv-cancion{padding:88px 16px 18px;border-radius:22px;background:#f2ebff url("${DISCO_SVG}") center 14px/68px 68px no-repeat;color:#4b3285}
body.tema-kawaii .tv-cancion-titulo{font-size:1.3rem;font-weight:700;color:#5b3da3;margin:0 0 6px}
body.tema-kawaii .tv-cancion-nota{font-family:"Mali","Fredoka",cursive;font-weight:500;color:#5b3a5e}
body.tema-kawaii .tv-boton{min-height:46px;padding:11px 26px;border:0;border-radius:999px;background:#c2306d;color:#fff;font-family:inherit;font-weight:600;font-size:1.02rem;
  box-shadow:0 4px 0 #8e1f4f;text-decoration:none;transition:transform .12s}
body.tema-kawaii .tv-boton:active{transform:translateY(3px);box-shadow:0 1px 0 #8e1f4f}
body.tema-kawaii .tv-regalo{padding:98px 16px 18px;border-radius:22px;background:#fff1e8 url("${REGALO_SVG}") center 14px/84px 76px no-repeat}
body.tema-kawaii .tv-regalo-texto{font-size:1.28rem;font-weight:600;line-height:1.3;color:#8a3a14}
body.tema-kawaii .tv-regalo-nota{opacity:1;color:#7a4a30;font-family:"Mali","Fredoka",cursive;font-weight:500;font-size:.98rem}
body.tema-kawaii .tv-firma{margin:0 0 16px;font-family:"Mali","Fredoka",cursive;font-style:italic;font-weight:500;color:#a02c5c;opacity:1}
body.tema-kawaii .tv-cerrar{min-height:46px;padding:10px 30px;border-radius:999px;border:2px solid #ffb3cd;background:#fff;color:#a02c5c;font-family:inherit;font-weight:600;font-size:1rem;
  box-shadow:0 4px 0 #ffd0e0;cursor:pointer}
body.tema-kawaii .tv-cerrar:hover{background:#fff5f9}
body.tema-kawaii .tv-cerrar:focus-visible,body.tema-kawaii .tv-boton:focus-visible{outline:3px solid #7c4dff;outline-offset:3px}
body.tema-kawaii .tv-modal.tv-final .tv-tarjeta{border:4px solid transparent;
  background:linear-gradient(#fffaf6,#fffaf6) padding-box,linear-gradient(135deg,#ff9fc4,#c7a8ff,#9fe3c9,#ffe08a,#ff9fc4) border-box}
body.tema-kawaii .tv-modal.tv-final .tv-dia{background:#fff3c4;color:#7a4f00;border-color:#ffd95e;box-shadow:0 3px 0 #f4d27a}
body.tema-kawaii .tv-modal.tv-final .tv-msg{font-size:1.2rem;text-align:center;background:#fff;border-color:#ffd3e3}

body.tema-kawaii .tv-toast{background:#fff;color:#8a2f63;border:2px solid #ffc6da;border-radius:999px;font-family:"Fredoka",system-ui,sans-serif;font-weight:500;padding:10px 18px;
  box-shadow:0 6px 0 #ffd6e5,0 12px 26px rgba(120,60,110,.2)}

@media (min-width:700px){
  body.tema-kawaii .kw-casa{max-width:720px}
  body.tema-kawaii .kw-techo-400,body.tema-kawaii .kw-base-400{display:none}
  body.tema-kawaii .kw-techo-720,body.tema-kawaii .kw-base-720{display:block}
  body.tema-kawaii .kw-cuerpo{margin:-14px 28px 0;padding:34px 24px 40px}
  body.tema-kawaii .tv-puertas{grid-template-columns:repeat(6,minmax(0,1fr));column-gap:16px;row-gap:22px}
  body.tema-kawaii .kw-num{font-size:2rem}
  body.tema-kawaii .kw-cabecera{padding-top:20px}
  body.tema-kawaii .tv-puerta{aspect-ratio:1/1}
  body.tema-kawaii .kw-base{margin-top:-40px}
}

@keyframes kawaii-flota{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-8px) rotate(6deg)}}
@keyframes kawaii-luz{0%,100%{opacity:1}50%{opacity:.45}}
@keyframes kawaii-humo{0%{transform:translateY(6px);opacity:0}30%{opacity:1}100%{transform:translateY(-10px);opacity:0}}
@keyframes kawaii-salta{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-4px) scale(1.04)}}
@keyframes kawaii-brilla{0%,100%{transform:scale(.4) rotate(0);opacity:.3}50%{transform:scale(1) rotate(45deg);opacity:1}}
@keyframes kawaii-zz{0%,100%{transform:translate(0,2px);opacity:.3}50%{transform:translate(2px,-3px);opacity:.75}}
@keyframes kawaii-meneo{0%{transform:scale(1)}25%{transform:scale(1.1) rotate(-5deg)}50%{transform:scale(1.08) rotate(5deg)}75%{transform:scale(1.04) rotate(-2deg)}100%{transform:scale(1)}}
@keyframes kawaii-abre{from{transform:perspective(160px) rotateY(0);width:100%;border-radius:24px}to{transform:perspective(160px) rotateY(-38deg);width:24%}}
@keyframes kawaii-pop{from{transform:scale(.7) translateY(20px);opacity:0}to{transform:none;opacity:1}}

@media (prefers-reduced-motion:reduce){
  body.tema-kawaii .kw-deco,body.tema-kawaii .kw-luz,body.tema-kawaii .kw-humo path,body.tema-kawaii .kw-e-hoy,body.tema-kawaii .kw-brillo,
  body.tema-kawaii .kw-zz,body.tema-kawaii .tv-tarjeta,body.tema-kawaii .kw-p,body.tema-kawaii .kw-hoja{animation:none!important;transition:none!important}
}
`;

  var PARTES = [
    function (c) { return '<svg viewBox="-11 -10 22 18">' + corazon(0, 0, 1, c) + "</svg>"; },
    function (c) { return '<svg viewBox="0 0 24 24">' + estrella(12, 12, 11, c) + "</svg>"; },
    function (c) { return '<svg viewBox="0 0 24 24">' + chispa(12, 12, 11, c) + "</svg>"; }
  ];
  var COLORES = ["#ff7fab", "#ff9fc4", "#b89cff", "#8fdcc0", "#ffd95e", "#8fc8ff", "#ffb38a"];

  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "kawaii",
    nombre: "Kawaii",
    emoji: "🎀",
    descripcion: "Una casita pastel con una conejita y un osito que esperan contigo la Navidad.",
    fuentes: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Mali:ital,wght@0,500;0,600;1,500&display=swap",
    color: "#ff8fb6",
    css: CSS,
    orden: ORDEN,
    escena: function () {
      return cielo() +
        '<header class="kw-cabecera">' +
        '<p class="kw-sobre"><svg viewBox="-11 -10 22 18" aria-hidden="true">' + corazon(0, 0, 1, "#ff7fab") + "</svg>24 sorpresas<svg viewBox=\"-11 -10 22 18\" aria-hidden=\"true\">" + corazon(0, 0, 1, "#ff7fab") + "</svg></p>" +
        '<h1 class="kw-titulo">Calendario <span>de adviento</span></h1>' +
        '<p class="tv-para"></p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<div class="kw-casa">' + techo(400) + techo(720) +
        '<div class="kw-cuerpo"><div class="tv-puertas"></div></div>' +
        base(400) + base(720) + "</div>" +
        '<p class="kw-pie">Toca una puertita para descubrir tu sorpresa</p>';
    },
    puerta: function (n, estado) {
      var pos = ORDEN.indexOf(n);
      var col = n === 24 ? "kw-c6" : "kw-c" + ((pos < 0 ? n : pos) % 5 + 1);
      var acc = n === 24 ? ACC24 : ACC[n % 3];
      var detras = acc.indexOf("kw-acc ") >= 0 ? acc : "", delante = detras ? "" : acc;
      var h = '<span class="kw-w ' + col + " kw-e-" + estado + '" aria-hidden="true">' + detras;
      if (estado === "abierta") {
        h += '<span class="kw-p"><span class="kw-hoja"></span><span class="kw-mini">' + n + "</span>" +
          '<svg class="kw-icono" viewBox="0 0 32 32" focusable="false">' + (ICONO[tipoDe(n)] || ICONO.mensaje) + "</svg></span>";
      } else {
        var cara = estado === "bloqueada" ? CARA.dormida : estado === "hoy" ? CARA.feliz : CARA.despierta;
        h += '<span class="kw-p"><span class="kw-num">' + n + "</span>" +
          '<svg class="kw-cara" viewBox="0 0 40 20" focusable="false">' + cara + "</svg>" +
          (estado === "bloqueada" ? CANDADO + '<span class="kw-zz">z</span>' : "") + "</span>";
        if (estado === "hoy") h += '<span class="kw-hoy">¡Hoy!</span>' + BRILLO.replace("kw-brillo", "kw-brillo b1") + BRILLO.replace("kw-brillo", "kw-brillo b2");
      }
      return h + delante + "</span>";
    },
    alAbrir: function (boton, n, capa) {
      return new Promise(function (resolver) {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { resolver(); return; }
        var r = boton.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var piezas = [], i, el, tam, ang, dist, dx, dy, rot, dur;
        boton.classList.add("kw-abriendo");
        var animar = typeof document.body.animate === "function";
        if (animar) {
          var aro = document.createElement("span");
          aro.className = "kw-aro";
          aro.style.cssText = "left:" + (cx - 20) + "px;top:" + (cy - 20) + "px;width:40px;height:40px";
          capa.appendChild(aro); piezas.push(aro);
          aro.animate([{ transform: "scale(.3)", opacity: 1 }, { transform: "scale(4)", opacity: 0 }], { duration: 620, easing: "ease-out", fill: "forwards" });
          for (i = 0; i < 28; i++) {
            el = document.createElement("span");
            el.className = "kw-part";
            tam = 10 + Math.random() * 14;
            el.style.width = tam + "px"; el.style.height = tam + "px";
            el.style.left = (cx - tam / 2) + "px"; el.style.top = (cy - tam / 2) + "px";
            el.innerHTML = PARTES[i % 3](COLORES[i % COLORES.length]);
            capa.appendChild(el); piezas.push(el);
            ang = (i / 28) * Math.PI * 2 + Math.random() * 0.4;
            dist = 60 + Math.random() * 90;
            dx = Math.cos(ang) * dist; dy = Math.sin(ang) * dist - 20;
            rot = (Math.random() - 0.5) * 120;
            dur = 700 + Math.random() * 250;
            el.animate([
              { transform: "translate(0,0) scale(.2) rotate(0deg)", opacity: 1 },
              { transform: "translate(" + dx + "px," + dy + "px) scale(1) rotate(" + rot + "deg)", opacity: 1, offset: 0.6 },
              { transform: "translate(" + dx * 1.1 + "px," + (dy + 34) + "px) scale(.7) rotate(" + rot * 1.5 + "deg)", opacity: 0 }
            ], { duration: dur, easing: "cubic-bezier(.15,.75,.35,1)", fill: "forwards" });
          }
        }
        setTimeout(resolver, 760);
        setTimeout(function () {
          piezas.forEach(function (p) { if (p.parentNode) p.parentNode.removeChild(p); });
          boton.classList.remove("kw-abriendo");
        }, 1000);
      });
    }
  });
})();
