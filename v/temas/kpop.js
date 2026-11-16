/* Estilo «K-pop»: escenario de concierto propio, focos, público con barras de luz genéricas
   y photocards holográficas en su funda. Todo el arte es original (sin grupos, logos ni diseños reales). */
(function () {
  "use strict";

  var ORDEN = [7, 15, 2, 20, 11, 23,
               4, 18, 9, 13, 1, 22,
               16, 6, 24, 10, 19, 3,
               12, 21, 5, 17, 8, 14];

  /* ---------- Ayudas para el dibujo ---------- */
  function azar(semilla) {
    var s = semilla;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  function svgUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function corazon(cx, cy, s, fill, extra) {
    return '<path transform="translate(' + cx + " " + cy + ") scale(" + s + ')" d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="' + fill + '"' + (extra || "") + "/>";
  }
  function destello(x, y, r, color) {
    return '<path class="kp-tw" style="--d:' + ((x * 7 + y * 3) % 40) / 10 + 's" d="M' + x + " " + (y - r) + " Q" + x + " " + y + " " + (x + r) + " " + y +
      " Q" + x + " " + y + " " + x + " " + (y + r) + " Q" + x + " " + y + " " + (x - r) + " " + y + " Q" + x + " " + y + " " + x + " " + (y - r) + 'Z" fill="' + (color || "#fff") + '"/>';
  }

  var LUCES = ["#ff9ad9", "#d6b8ff", "#9ff3ff", "#fff3a8", "#ffffff", "#ffb8e6"];

  /* Una persona del público, con o sin barra de luz (genérica: palito y bombilla redonda) */
  function persona(x, y, s, r, conBarra) {
    var col = "#1a0832";
    var h = '<g transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + s.toFixed(2) + ')">';
    if (conBarra) {
      var luz = LUCES[Math.floor(r() * LUCES.length)];
      var lado = r() < 0.5 ? -1 : 1;
      h += '<g class="kp-ls" style="--d:' + (r() * 1.6).toFixed(2) + "s;--v:" + (1.6 + r() * 0.9).toFixed(2) + 's">' +
        '<path d="M' + (lado * 9) + " -14 L" + (lado * 13) + ' -40" stroke="' + col + '" stroke-width="5.5" stroke-linecap="round"/>' +
        '<rect x="' + (lado * 13 - 1.8) + '" y="-58" width="3.6" height="20" rx="1.8" fill="#e9defa"/>' +
        '<circle cx="' + (lado * 13) + '" cy="-62" r="10" fill="' + luz + '" opacity=".35" filter="url(#kp-f-difuso)"/>' +
        '<circle cx="' + (lado * 13) + '" cy="-62" r="5.6" fill="' + luz + '"/>' +
        '<circle cx="' + (lado * 13 - 1.4) + '" cy="-63.5" r="2" fill="#fff" opacity=".9"/>' +
        "</g>";
    }
    h += '<path d="M-16 14 Q-16 -6 0 -7 Q16 -6 16 14Z" fill="' + col + '"/>' +
      '<circle cx="0" cy="-15" r="9.5" fill="' + col + '"/></g>';
    return h;
  }

  function escenarioSVG() {
    var r = azar(11);
    var s = '<svg class="kp-escenario-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      "<defs>" +
      '<linearGradient id="kp-g-pantalla" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5fc1"/><stop offset=".5" stop-color="#a24bff"/><stop offset="1" stop-color="#4a23b8"/></linearGradient>' +
      '<linearGradient id="kp-g-piso" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a1a78"/><stop offset="1" stop-color="#1c0836"/></linearGradient>' +
      '<linearGradient id="kp-g-pilar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8ad6"/><stop offset=".5" stop-color="#b16bff"/><stop offset="1" stop-color="#6be4ff"/></linearGradient>' +
      '<linearGradient id="kp-g-haz-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8ad6" stop-opacity=".55"/><stop offset="1" stop-color="#ff8ad6" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="kp-g-haz-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9a6ff" stop-opacity=".55"/><stop offset="1" stop-color="#c9a6ff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="kp-g-haz-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ff3ff" stop-opacity=".5"/><stop offset="1" stop-color="#9ff3ff" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="kp-g-bruma" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#ff5fc1" stop-opacity=".38"/><stop offset=".6" stop-color="#8d4bff" stop-opacity=".12"/><stop offset="1" stop-color="#8d4bff" stop-opacity="0"/></radialGradient>' +
      '<pattern id="kp-p-led" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="none"/><circle cx="2.5" cy="2.5" r="1.1" fill="#fff" opacity=".16"/></pattern>' +
      '<filter id="kp-f-brillo" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="kp-f-difuso" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3.5"/></filter>' +
      "</defs>";

    /* Bruma de fondo */
    s += '<ellipse cx="400" cy="160" rx="400" ry="160" fill="url(#kp-g-bruma)"/>';

    /* Haces de luz desde la estructura */
    var focos = [[170, "r", -1], [285, "l", 1], [400, "c", -1], [515, "l", -1], [630, "r", 1]];
    focos.forEach(function (f, i) {
      s += '<polygon class="kp-haz" style="--o:' + f[0] + "px 26px;--d:" + (i * 0.7).toFixed(1) + "s;--g:" + (f[2] * 9) + 'deg" points="' +
        (f[0] - 6) + ",26 " + (f[0] + 6) + ",26 " + (f[0] + 70) + ",250 " + (f[0] - 70) + ',250" fill="url(#kp-g-haz-' + f[1] + ')"/>';
    });

    /* Pilares LED a los lados */
    [[214, 0], [566, 1]].forEach(function (p) {
      var x = p[0];
      s += '<rect x="' + (x - 20) + '" y="52" width="40" height="150" rx="4" fill="#1d0a38"/>' +
        '<rect class="kp-pilar" style="--d:' + (p[1] * 0.9) + 's" x="' + (x - 16) + '" y="56" width="32" height="142" rx="3" fill="url(#kp-g-pilar)"/>' +
        '<rect x="' + (x - 16) + '" y="56" width="32" height="142" fill="url(#kp-p-led)"/>';
      for (var k = 0; k < 6; k++) s += corazon(x, 72 + k * 24, 0.9, "#fff", ' opacity=".55"');
    });

    /* Pantalla grande */
    s += '<rect x="258" y="42" width="284" height="148" rx="8" fill="#14062a"/>' +
      '<rect x="264" y="48" width="272" height="136" rx="4" fill="url(#kp-g-pantalla)"/>' +
      '<ellipse cx="400" cy="116" rx="120" ry="60" fill="#fff" opacity=".12" filter="url(#kp-f-difuso)"/>' +
      '<g class="kp-latido">' + corazon(400, 104, 4.6, "#fff", ' filter="url(#kp-f-brillo)"') + "</g>" +
      destello(338, 76, 7) + destello(470, 88, 6) + destello(452, 64, 4) + destello(350, 136, 4);
    /* ecualizador */
    for (var e = 0; e < 17; e++) {
      var bx = 284 + e * 14.4, bh = 10 + ((e * 37) % 22);
      s += '<rect class="kp-eq" style="--d:' + ((e * 0.13) % 0.9).toFixed(2) + 's" x="' + bx.toFixed(1) + '" y="' + (176 - bh) + '" width="8" height="' + bh + '" rx="2" fill="#fff" opacity=".75"/>';
    }
    s += '<rect x="264" y="48" width="272" height="136" rx="4" fill="url(#kp-p-led)"/>';

    /* Estructura (truss) con focos */
    var t = '<rect x="60" y="12" width="680" height="14" rx="3" fill="#2a1046" stroke="#7d4fc0" stroke-width="1.4"/><path d="';
    for (var z = 60; z < 740; z += 14) t += "M" + z + " 13 L" + (z + 7) + " 25 L" + (z + 14) + " 13 ";
    t += '" stroke="#7d4fc0" stroke-width="1.1" fill="none" opacity=".8"/>';
    s += t;
    focos.forEach(function (f) {
      s += '<rect x="' + (f[0] - 7) + '" y="24" width="14" height="10" rx="3" fill="#1a0832"/>' +
        '<circle cx="' + f[0] + '" cy="34" r="5" fill="#fff" filter="url(#kp-f-brillo)"/>';
    });

    /* Altavoces */
    [[96, 150], [704, 150]].forEach(function (a) {
      s += '<rect x="' + (a[0] - 26) + '" y="' + a[1] + '" width="52" height="58" rx="5" fill="#170730" stroke="#4b2585" stroke-width="1.2"/>' +
        '<circle cx="' + a[0] + '" cy="' + (a[1] + 20) + '" r="11" fill="#0e041d" stroke="#5b2fa0" stroke-width="2"/>' +
        '<circle cx="' + a[0] + '" cy="' + (a[1] + 44) + '" r="6" fill="#0e041d" stroke="#5b2fa0" stroke-width="1.6"/>';
    });

    /* Piso del escenario y borde de luces */
    s += '<polygon points="110,198 690,198 770,236 30,236" fill="url(#kp-g-piso)"/>' +
      '<polygon points="300,200 500,200 560,234 240,234" fill="#ff7bd0" opacity=".12"/>' +
      '<rect x="30" y="236" width="740" height="7" fill="#12052a"/>';
    for (var d = 0; d < 37; d++) {
      s += '<circle class="kp-led" style="--d:' + ((d % 6) * 0.25).toFixed(2) + 's" cx="' + (40 + d * 20) + '" cy="239.5" r="2.2" fill="' + LUCES[d % 4] + '"/>';
    }

    /* Corazones que suben */
    s += '<g class="kp-sube" style="--d:0s">' + corazon(300, 214, 1.3, "#ff9ad9") + "</g>" +
      '<g class="kp-sube" style="--d:1.6s">' + corazon(520, 220, 1.1, "#d6b8ff") + "</g>" +
      '<g class="kp-sube" style="--d:3.1s">' + corazon(420, 226, 0.9, "#fff") + "</g>";

    /* Público: fila de atrás y fila de adelante */
    var fila = "";
    for (var i = 0; i < 31; i++) {
      var x1 = i * 26.5 + r() * 6;
      fila += persona(x1, 266 + r() * 4, 0.78 + r() * 0.08, r, r() < 0.62);
    }
    for (var j = 0; j < 22; j++) {
      var x2 = 14 + j * 37 + r() * 8;
      fila += persona(x2, 292 + r() * 4, 1.05 + r() * 0.1, r, r() < 0.5);
    }
    s += '<g class="kp-publico">' + fila + "</g>";

    /* Destellos del aire */
    s += destello(120, 70, 5, "#ffd6f2") + destello(680, 60, 6, "#e6d6ff") + destello(612, 118, 4) + destello(190, 128, 4) + destello(740, 110, 3.5, "#bff6ff") + destello(60, 110, 3.5, "#bff6ff");
    s += "</svg>";
    return s;
  }

  function fondoHTML() {
    var r = azar(5), h = '<div class="kp-fondo" aria-hidden="true">' +
      '<span class="kp-foco kp-foco-1"></span><span class="kp-foco kp-foco-2"></span><span class="kp-foco kp-foco-3"></span>';
    for (var i = 0; i < 18; i++) {
      h += '<span class="kp-chispa" style="left:' + (r() * 100).toFixed(1) + "%;top:" + (r() * 92).toFixed(1) + "%;--t:" + (5 + r() * 9).toFixed(1) +
        "px;--d:" + (r() * 5).toFixed(2) + "s;--v:" + (2.4 + r() * 3).toFixed(2) + 's"></span>';
    }
    for (var k = 0; k < 7; k++) {
      h += '<span class="kp-flota" style="left:' + (6 + r() * 88).toFixed(1) + "%;--t:" + (10 + r() * 12).toFixed(0) + "px;--d:" + (r() * 12).toFixed(1) +
        "s;--v:" + (12 + r() * 10).toFixed(1) + 's"></span>';
    }
    return h + "</div>";
  }

  /* ---------- Íconos del dorso de las photocards ---------- */
  var ICONOS = {
    mensaje: '<svg viewBox="0 0 24 24"><path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 20 17h-8.5L7 20.5V17H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5z" fill="#fff" stroke="#6a2a9a" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 14.6c-1.4-1.1-3-2-3-3.4a1.5 1.5 0 0 1 3-.4 1.5 1.5 0 0 1 3 .4c0 1.4-1.6 2.3-3 3.4z" fill="#ff4fb0"/></svg>',
    foto: '<svg viewBox="0 0 24 24"><rect x="5" y="2.8" width="14" height="18.4" rx="2" fill="#fff" stroke="#6a2a9a" stroke-width="1.4" transform="rotate(-6 12 12)"/><rect x="7" y="5" width="10" height="10.5" rx="1" fill="#d9c2ff" transform="rotate(-6 12 12)"/><path d="M12 13.2c-1.2-.9-2.5-1.7-2.5-2.9a1.25 1.25 0 0 1 2.5-.35 1.25 1.25 0 0 1 2.5.35c0 1.2-1.3 2-2.5 2.9z" fill="#ff4fb0" transform="rotate(-6 12 12)"/></svg>',
    vale: '<svg viewBox="0 0 24 24"><path d="M2.5 7h19v3a2 2 0 0 0 0 4v3h-19v-3a2 2 0 0 0 0-4z" fill="#fff" stroke="#6a2a9a" stroke-width="1.4" stroke-linejoin="round"/><path d="M16 7.6v8.8" stroke="#6a2a9a" stroke-width="1.2" stroke-dasharray="1.5 1.5"/><path d="M9 9.2l.9 1.9 2 .3-1.5 1.4.4 2L9 13.8l-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#ff4fb0"/></svg>',
    cancion: '<svg viewBox="0 0 24 24"><circle cx="15.5" cy="7.5" r="4.6" fill="#fff" stroke="#6a2a9a" stroke-width="1.4"/><path d="M12.6 9.8l-7.9 8.6a1.4 1.4 0 0 0 2 2l8.6-7.9" fill="#d9c2ff" stroke="#6a2a9a" stroke-width="1.4" stroke-linejoin="round"/><path d="M12.8 5.6l4.6 4.6" stroke="#6a2a9a" stroke-width="1" opacity=".5"/><path d="M4 4.5v4.2M4 8.7a1.3 1.3 0 1 1-1.3-1.3" stroke="#ff4fb0" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>',
    regalo: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="1.2" fill="#ff7cc8" stroke="#6a2a9a" stroke-width="1.3"/><rect x="3" y="7.4" width="18" height="3.6" rx="1" fill="#ff9ad9" stroke="#6a2a9a" stroke-width="1.3"/><path d="M12 7.4V20" stroke="#fff" stroke-width="2.4"/><path d="M12 7.4c-2-3.6-5.6-3-4.6-1 .6 1.2 2.8 1 4.6 1zm0 0c2-3.6 5.6-3 4.6-1-.6 1.2-2.8 1-4.6 1z" fill="#d9c2ff" stroke="#6a2a9a" stroke-width=".9"/></svg>',
    final: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.6 6.2 6.7.5-5.1 4.3 1.6 6.5L12 16.5 6.2 20l1.6-6.5-5.1-4.3 6.7-.5z" fill="#fff3a8" stroke="#b0721d" stroke-width="1.2" stroke-linejoin="round"/><path d="M12 13.4c-1-.8-2.1-1.4-2.1-2.4a1.05 1.05 0 0 1 2.1-.3 1.05 1.05 0 0 1 2.1.3c0 1-1.1 1.6-2.1 2.4z" fill="#ff4fb0"/></svg>'
  };
  /* Mano haciendo corazón con los dedos (dibujo propio y simple) */
  var DEDOS = '<svg viewBox="0 0 32 32"><path d="M24.5 9.6c-1.5-1.2-3.2-2.2-3.2-3.7a1.6 1.6 0 0 1 3.2-.45 1.6 1.6 0 0 1 3.2.45c0 1.5-1.7 2.5-3.2 3.7z" fill="#ff4fb0"/>' +
    '<rect x="11.5" y="5" width="5.6" height="16" rx="2.8" fill="#ffe3f3" stroke="#7a2d96" stroke-width="1.4" transform="rotate(14 14.3 20)"/>' +
    '<rect x="7" y="16" width="15" height="13" rx="5.5" fill="#ffe3f3" stroke="#7a2d96" stroke-width="1.4"/>' +
    '<path d="M7.6 20.5h5M7.6 24h5" stroke="#7a2d96" stroke-width="1.2" stroke-linecap="round"/>' +
    '<rect x="16" y="9" width="6" height="13" rx="3" fill="#ffe3f3" stroke="#7a2d96" stroke-width="1.4" transform="rotate(-34 19 21)"/></svg>';
  var CORAZON = '<svg viewBox="-10 -10 20 18"><path d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="#ff4fb0" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><path d="M-5 -4.5 q1.5 -2 3 -.6" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".85"/></svg>';
  var ESTRELLA = '<svg viewBox="0 0 24 24"><path d="M12 1.8l2.9 6.6 7.1.6-5.4 4.6 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9l7.1-.6z" fill="#ffd95e" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>';
  var CANDADO = '<svg viewBox="0 0 16 16"><path d="M5 7V5.2a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="7" width="9" height="7" rx="1.8" fill="currentColor"/><circle cx="8" cy="10.3" r="1.1" fill="#2a1446"/></svg>';

  function tipoDe(n, info) {
    var d = info;
    if (!d || !d.tipo) {
      try { d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n]; } catch (e) { d = null; }
    }
    if (!d) return "final";
    return d.final ? "final" : (ICONOS[d.tipo] ? d.tipo : "mensaje");
  }
  function dorsoHTML(n, info) {
    return '<span class="kp-icono">' + ICONOS[tipoDe(n, info)] + '</span><span class="kp-num-dorso">' + n + "</span>";
  }

  /* ---------- Estilos ---------- */
  var T = "body.tema-kpop";
  var HOLO = "linear-gradient(125deg, #ffd3f1 0%, #d9c4ff 16%, #a9f1ff 32%, #fff4c2 46%, #ffc3e6 60%, #c7adff 76%, #9ff0e4 90%, #ffd3f1 100%)";
  var HOLO_ORO = "linear-gradient(125deg, #fff3c4 0%, #ffd27a 18%, #fff8de 34%, #ffc2e4 50%, #ffe39a 66%, #fff6d2 82%, #f6c56a 100%)";
  var DISPLAY = '"Baloo 2", "Fredoka", "Arial Rounded MT Bold", system-ui, sans-serif';
  var SANS = '"Nunito", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  var css = `
${T}{
  --kp-rosa:#ff4fb0; --kp-rosa-claro:#ffb8e6; --kp-lila:#c9a6ff; --kp-cian:#9ff3ff;
  --kp-noche:#140526; --kp-tinta:#fbf3ff; --kp-suave:#d9c8f2;
  background:#140526; color:var(--kp-tinta); font-family:${SANS};
}
${T} #tv-escena{position:relative; z-index:1; overflow-x:hidden}
${T} .kp-escena{position:relative; min-height:100vh; min-height:100dvh; padding:0 0 96px}

/* Fondo: escenario, focos y brillos */
${T} .kp-fondo{position:fixed; inset:0; z-index:-1; overflow:hidden; pointer-events:none;
  background:
    radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,79,176,.34), transparent 70%),
    radial-gradient(ellipse 70% 40% at 15% 100%, rgba(120,70,255,.30), transparent 70%),
    radial-gradient(ellipse 70% 40% at 90% 85%, rgba(255,79,176,.20), transparent 70%),
    linear-gradient(180deg, #10041f 0%, #2a0a4a 32%, #4a0f62 62%, #24073f 100%)}
${T} .kp-foco{position:absolute; top:-8%; width:46vmax; height:120vh; margin-left:-23vmax; transform-origin:50% 0; mix-blend-mode:screen;
  clip-path:polygon(47% 0, 53% 0, 100% 100%, 0 100%); opacity:.55;
  animation:kpop-barre 9s ease-in-out infinite alternate}
${T} .kp-foco-1{left:18%; background:linear-gradient(180deg, rgba(255,140,214,.55), rgba(255,140,214,0) 72%); --a:-16deg; --b:10deg}
${T} .kp-foco-2{left:50%; background:linear-gradient(180deg, rgba(190,160,255,.5), rgba(190,160,255,0) 70%); --a:9deg; --b:-9deg; animation-duration:11s}
${T} .kp-foco-3{left:84%; background:linear-gradient(180deg, rgba(150,240,255,.45), rgba(150,240,255,0) 70%); --a:14deg; --b:-12deg; animation-duration:8s; animation-delay:-3s}
@keyframes kpop-barre{from{transform:rotate(var(--a))} to{transform:rotate(var(--b))}}
${T} .kp-chispa{position:absolute; width:var(--t); height:var(--t); transform:translate(-50%,-50%);
  background:radial-gradient(circle, #fff 0 14%, rgba(255,214,242,.75) 26%, transparent 62%);
  clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);
  animation:kpop-titila var(--v) ease-in-out var(--d) infinite; opacity:.8}
@keyframes kpop-titila{0%,100%{opacity:.2; transform:translate(-50%,-50%) scale(.5)} 50%{opacity:1; transform:translate(-50%,-50%) scale(1)}}
${T} .kp-flota{position:absolute; bottom:-30px; width:var(--t); height:var(--t); opacity:0;
  background:url("${svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 20 18"><path d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="#ff9ad9"/></svg>')}") center / contain no-repeat;
  filter:drop-shadow(0 0 6px rgba(255,120,210,.8));
  animation:kpop-flota var(--v) linear var(--d) infinite}
@keyframes kpop-flota{0%{opacity:0; transform:translateY(0) rotate(-10deg)} 10%{opacity:.75} 80%{opacity:.5} 100%{opacity:0; transform:translateY(-105vh) rotate(14deg)}}

/* Cabecera */
${T} .kp-cabecera{text-align:center; padding:26px 16px 0; position:relative}
${T} .kp-pre{display:inline-flex; align-items:center; gap:8px; margin:0; padding:5px 14px 5px 6px; border-radius:999px; max-width:100%;
  background:rgba(255,255,255,.08); border:1px solid rgba(255,184,230,.35);
  font-weight:800; font-size:.72rem; letter-spacing:.16em; text-transform:uppercase; color:#ffd9f1}
${T} .kp-vivo{display:inline-flex; align-items:center; gap:5px; padding:3px 8px; border-radius:999px; background:#ff3f8f; color:#fff; letter-spacing:.1em; box-shadow:0 0 12px rgba(255,63,143,.7)}
${T} .kp-vivo::before{content:""; width:6px; height:6px; border-radius:50%; background:#fff; animation:kpop-parpadea 1.2s ease-in-out infinite}
@keyframes kpop-parpadea{50%{opacity:.25}}
${T} .tv-para{margin:10px 0 0; font-family:${DISPLAY}; font-weight:800;
  font-size:clamp(2.3rem, 11vw, 4rem); line-height:1.02; letter-spacing:-.01em;
  background:linear-gradient(100deg, #ffd6f2 0%, #ff8ad6 30%, #d6b8ff 58%, #9ff3ff 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 0 14px rgba(255,90,190,.45)) drop-shadow(0 3px 0 rgba(60,10,90,.6))}
${T} .kp-sub{margin:8px auto 0; max-width:32ch; font-size:1.02rem; font-weight:600; color:var(--kp-suave)}
${T} .kp-sub b{color:#ffb8e6; font-weight:800}
${T} .tv-cuenta{display:inline-block; text-wrap:balance; margin:14px auto 0; padding:8px 18px; border-radius:14px; max-width:100%;
  background:linear-gradient(90deg, rgba(255,79,176,.25), rgba(140,90,255,.25)); border:1px dashed rgba(255,200,240,.6);
  color:#fff; font-weight:800; font-size:.98rem; box-shadow:0 0 22px rgba(255,79,176,.2)}
${T} .tv-cuenta[hidden]{display:none}

/* Escenario */
${T} .kp-escenario{position:relative; max-width:920px; margin:6px auto 0; height:clamp(214px, calc(min(100vw, 920px) * .4), 368px); pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%); mask-image:linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%)}
${T} .kp-escenario-svg{display:block; width:100%; height:100%}
${T} .kp-haz{transform-box:view-box; transform-origin:var(--o); mix-blend-mode:screen; animation:kpop-haz 4.5s ease-in-out var(--d) infinite alternate}
@keyframes kpop-haz{from{transform:rotate(calc(var(--g) * -1))} to{transform:rotate(var(--g))}}
${T} .kp-tw{transform-box:fill-box; transform-origin:center; animation:kpop-tw 3s ease-in-out var(--d) infinite}
@keyframes kpop-tw{0%,100%{opacity:.25; transform:scale(.55)} 50%{opacity:1; transform:scale(1.1)}}
${T} .kp-latido{transform-box:fill-box; transform-origin:center; animation:kpop-latido 1.1s ease-in-out infinite}
@keyframes kpop-latido{0%,100%{transform:scale(1)} 15%{transform:scale(1.12)} 30%{transform:scale(.98)} 45%{transform:scale(1.07)}}
${T} .kp-eq{transform-box:fill-box; transform-origin:50% 100%; animation:kpop-eq .9s ease-in-out var(--d) infinite alternate}
@keyframes kpop-eq{from{transform:scaleY(.35)} to{transform:scaleY(1.15)}}
${T} .kp-pilar{animation:kpop-pilar 2.6s ease-in-out var(--d) infinite alternate}
@keyframes kpop-pilar{from{opacity:.65} to{opacity:1}}
${T} .kp-led{animation:kpop-led 1.5s steps(2, jump-none) var(--d) infinite}
@keyframes kpop-led{0%{opacity:.35} 100%{opacity:1}}
${T} .kp-ls{transform-box:fill-box; transform-origin:30% 100%; animation:kpop-ondea var(--v) ease-in-out var(--d) infinite alternate}
@keyframes kpop-ondea{from{transform:rotate(-11deg)} to{transform:rotate(11deg)}}
${T} .kp-sube{transform-box:fill-box; transform-origin:center; animation:kpop-sube 4.6s ease-out var(--d) infinite; opacity:0}
@keyframes kpop-sube{0%{opacity:0; transform:translateY(0) scale(.6)} 15%{opacity:1} 100%{opacity:0; transform:translateY(-120px) scale(1.2)}}

/* La valla: zona de las photocards */
${T} .kp-valla{position:relative; max-width:920px; margin:0 12px; padding:30px 12px 26px; border-radius:26px;
  background:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,79,176,.20), transparent 70%),
    linear-gradient(180deg, rgba(44,12,78,.92) 0%, rgba(26,7,48,.95) 100%);
  border:1px solid rgba(255,170,230,.28);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14), 0 -10px 40px rgba(255,79,176,.18), 0 24px 50px rgba(0,0,0,.5)}
${T} .kp-valla::before{content:""; position:absolute; left:22px; right:22px; top:10px; height:4px; border-radius:4px;
  background:repeating-linear-gradient(90deg, #ff8ad6 0 6px, transparent 6px 12px, #c9a6ff 12px 18px, transparent 18px 24px, #9ff3ff 24px 30px, transparent 30px 36px);
  box-shadow:0 0 10px rgba(255,140,214,.6); background-size:72px 4px; animation:kpop-marquesina 2.4s linear infinite}
@keyframes kpop-marquesina{to{background-position:72px 0}}
${T} .kp-etiqueta{display:flex; align-items:center; justify-content:center; gap:8px; margin:4px 0 16px;
  font-family:${DISPLAY}; font-weight:700; font-size:1.05rem; letter-spacing:.02em; color:#ffd9f1}
${T} .kp-etiqueta svg{display:block; width:30px; height:30px; flex:none; filter:drop-shadow(0 0 8px rgba(255,120,210,.55))}
${T} .tv-puertas{display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:16px 10px; padding:0}

/* Puerta = photocard holográfica dentro de su funda */
${T} .tv-puerta{position:relative; display:block; width:100%; aspect-ratio:5/7; min-height:44px; padding:0; border:0; background:none;
  color:#3a0f5c; border-radius:12px; transition:transform .25s ease;
  animation:kpop-entra .55s cubic-bezier(.2,.8,.3,1.2) backwards; animation-delay:calc(var(--tv-i) * 26ms)}
@keyframes kpop-entra{from{opacity:0; transform:translateY(12px) rotate(-3deg) scale(.94)} to{opacity:1; transform:none}}
${T} .tv-puerta:focus-visible{outline:3px solid #fff; outline-offset:4px}
${T} .tv-puerta:not([data-estado="bloqueada"]):hover{transform:translateY(-4px) rotate(-1.5deg)}
${T} .tv-puerta:not([data-estado="bloqueada"]):active{transform:scale(.97)}
${T} .kp-funda{position:absolute; inset:0; display:block; border-radius:12px; perspective:640px;
  background:linear-gradient(160deg, rgba(255,255,255,.34), rgba(255,255,255,.08) 45%, rgba(255,255,255,.2));
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.45), 0 8px 18px rgba(8,0,24,.55); transition:box-shadow .3s}
${T} .kp-funda::after{content:""; position:absolute; inset:0; border-radius:12px; pointer-events:none; z-index:2;
  background:linear-gradient(115deg, transparent 30%, rgba(255,255,255,.38) 40%, transparent 48%, transparent 64%, rgba(255,255,255,.18) 68%, transparent 72%)}
${T} .kp-carta{position:absolute; inset:4px; display:block; border-radius:8px; transform-style:preserve-3d; transition:transform .6s cubic-bezier(.3,.7,.2,1)}
${T} .kp-frente, ${T} .kp-dorso{position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:8px; overflow:hidden;
  -webkit-backface-visibility:hidden; backface-visibility:hidden}
${T} .kp-frente{background:
    radial-gradient(circle at 20% 15%, rgba(255,255,255,.7) 0 1.5px, transparent 2.5px) 0 0 / 14px 14px,
    ${HOLO}; background-size:14px 14px, 260% 260%;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.7);
  animation:kpop-holo 6s ease-in-out calc(var(--tv-i) * -.4s) infinite alternate}
@keyframes kpop-holo{from{background-position:0 0, 0% 30%} to{background-position:0 0, 100% 70%}}
${T} .kp-brillo{position:absolute; inset:-40%; background:linear-gradient(115deg, transparent 42%, rgba(255,255,255,.75) 50%, transparent 58%);
  animation:kpop-reflejo 4.8s ease-in-out calc(var(--tv-i) * .21s) infinite; pointer-events:none}
@keyframes kpop-reflejo{0%,62%{transform:translateX(-60%)} 100%{transform:translateX(60%)}}
${T} .kp-dic{position:relative; z-index:1; font-weight:800; font-size:.56rem; letter-spacing:.24em; color:rgba(58,15,92,.7); margin-bottom:-2px}
${T} .kp-num{position:relative; z-index:1; font-family:${DISPLAY}; font-weight:800; font-size:clamp(1.6rem, 7.6vw, 2.3rem); line-height:1;
  color:#3a0f5c; text-shadow:0 2px 0 rgba(255,255,255,.85), 0 0 14px rgba(255,255,255,.6)}
${T} .kp-sticker{position:absolute; z-index:3; top:-5px; right:-5px; width:28%; max-width:26px; aspect-ratio:1; transform:rotate(14deg);
  filter:drop-shadow(0 2px 2px rgba(40,0,60,.45))}
${T} .kp-sticker svg{display:block; width:100%; height:100%}
${T} .kp-hoy{position:absolute; z-index:4; left:50%; top:-10px; transform:translateX(-50%); padding:2px 10px; border-radius:999px; white-space:nowrap;
  font-family:${DISPLAY}; font-weight:800; font-size:.7rem; line-height:1.4; letter-spacing:.12em; color:#fff;
  background:linear-gradient(90deg, #ff3f8f, #b44dff); box-shadow:0 0 0 2px #fff, 0 0 16px rgba(255,79,176,.9)}
${T} .kp-cerrojo{position:absolute; z-index:1; left:50%; bottom:10%; width:15px; height:15px; margin-left:-7.5px; color:#bba4e6}
${T} .kp-cerrojo svg{display:block; width:100%; height:100%}

/* Bloqueada: photocard sellada, sin brillo */
${T} .tv-puerta[data-estado="bloqueada"]{cursor:not-allowed}
${T} .tv-puerta[data-estado="bloqueada"] .kp-funda{background:linear-gradient(160deg, rgba(255,255,255,.14), rgba(255,255,255,.04)); box-shadow:inset 0 0 0 1px rgba(255,255,255,.18), 0 6px 14px rgba(8,0,24,.5)}
${T} .tv-puerta[data-estado="bloqueada"] .kp-frente{animation:none;
  background:radial-gradient(circle at 20% 15%, rgba(255,255,255,.12) 0 1.2px, transparent 2px) 0 0 / 12px 12px,
    linear-gradient(125deg, rgba(255,160,220,.16), rgba(160,140,255,.14) 50%, rgba(140,230,255,.12)),
    linear-gradient(170deg, #3e2264, #2a1548 60%, #23113e);
  box-shadow:inset 0 0 0 1px rgba(201,166,255,.28)}
${T} .tv-puerta[data-estado="bloqueada"] .kp-brillo{display:none}
${T} .tv-puerta[data-estado="bloqueada"] .kp-num{color:#cdb8f2; text-shadow:0 2px 0 rgba(0,0,0,.35); font-size:clamp(1.4rem, 6.4vw, 2rem)}
${T} .tv-puerta[data-estado="bloqueada"] .kp-dic{color:rgba(205,184,242,.6)}
${T} .tv-puerta[data-estado="bloqueada"] .kp-sticker{filter:grayscale(.55) brightness(.75) drop-shadow(0 2px 2px rgba(0,0,0,.4))}

/* Disponible: brillo suave alrededor */
${T} .tv-puerta[data-estado="disponible"] .kp-funda{box-shadow:inset 0 0 0 1px rgba(255,255,255,.5), 0 8px 18px rgba(8,0,24,.55), 0 0 18px rgba(255,140,214,.3)}

/* Hoy: la photocard bajo el foco */
${T} .tv-puerta[data-estado="hoy"]{z-index:1; animation:kpop-entra .55s cubic-bezier(.2,.8,.3,1.2) backwards, kpop-salta 2.4s ease-in-out .6s infinite}
${T} .tv-puerta[data-estado="hoy"] .kp-funda{animation:kpop-foco 2.4s ease-in-out infinite}
${T} .tv-puerta[data-estado="hoy"] .kp-frente::after{content:""; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse 90% 60% at 50% -5%, rgba(255,255,255,.95), rgba(255,255,255,.2) 55%, transparent 75%);
  animation:kpop-luz 2.4s ease-in-out infinite}
${T} .tv-puerta[data-estado="hoy"]::before{content:""; position:absolute; left:-18%; right:-18%; bottom:-14px; height:22px; border-radius:50%; pointer-events:none;
  background:radial-gradient(ellipse, rgba(255,200,240,.75), rgba(255,79,176,.25) 50%, transparent 72%); filter:blur(2px); animation:kpop-luz 2.4s ease-in-out infinite}
@keyframes kpop-foco{0%,100%{box-shadow:inset 0 0 0 1.5px #fff, 0 8px 18px rgba(8,0,24,.55), 0 0 14px 3px rgba(255,120,210,.55)} 50%{box-shadow:inset 0 0 0 1.5px #fff, 0 8px 18px rgba(8,0,24,.55), 0 0 30px 10px rgba(255,170,230,.85)}}
@keyframes kpop-luz{0%,100%{opacity:.65} 50%{opacity:1}}
@keyframes kpop-salta{0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)}}

/* Abierta (y al abrir): la photocard se voltea y muestra su dorso */
${T} .tv-puerta[data-estado="abierta"] .kp-carta,
${T} .tv-puerta.kp-volteando .kp-carta{transform:rotateY(180deg)}
${T} .kp-dorso{transform:rotateY(180deg); gap:6%;
  background:
    url("${svgUri('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path transform="translate(9 9) scale(.32)" d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="#c58ae8" opacity=".35"/></svg>')}") 0 0 / 18px 18px,
    radial-gradient(ellipse at 50% 30%, #fff7fd 0%, #f6e4ff 55%, #e9d2ff 100%);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.9), inset 0 0 0 4px rgba(201,166,255,.35)}
${T} .kp-icono{display:block; width:54%; filter:drop-shadow(0 3px 4px rgba(106,42,154,.3))}
${T} .kp-icono svg{display:block; width:100%; height:auto}
${T} .tv-puerta[data-estado="abierta"] .kp-icono{animation:kpop-asoma .5s cubic-bezier(.2,.9,.3,1.4) both}
@keyframes kpop-asoma{from{opacity:0; transform:scale(.5)} to{opacity:1; transform:none}}
${T} .kp-num-dorso{min-width:2.2em; padding:1px 8px; border-radius:999px; text-align:center;
  font-family:${DISPLAY}; font-weight:800; font-size:clamp(.8rem, 3.4vw, 1rem); line-height:1.35; color:#fff;
  background:linear-gradient(90deg, #ff4fb0, #a24bff); box-shadow:0 2px 6px rgba(106,42,154,.35)}
${T} .tv-puerta.kp-volteando .kp-funda{box-shadow:inset 0 0 0 1.5px #fff, 0 0 34px 12px rgba(255,170,230,.85)}

/* Día 24: photocard dorada */
${T} .tv-puerta[data-n="24"]:not([data-estado="bloqueada"]) .kp-frente{background-image:radial-gradient(circle at 20% 15%, rgba(255,255,255,.8) 0 1.5px, transparent 2.5px), ${HOLO_ORO}}
${T} .tv-puerta[data-n="24"] .kp-sticker{width:34%; max-width:30px; top:-8px; right:-8px}
${T} .tv-puerta[data-n="24"][data-estado="bloqueada"] .kp-frente{box-shadow:inset 0 0 0 1px rgba(255,217,94,.45)}

/* Pie */
${T} .kp-pie{margin:22px 16px 0; text-align:center; font-weight:700; font-size:.98rem; color:var(--kp-suave)}
${T} .kp-pie b{color:#ffb8e6; font-weight:800}

/* Efecto de apertura (en .tv-capa) */
${T} .kp-destello{position:absolute; width:80px; height:80px; margin:-40px 0 0 -40px; border-radius:50%;
  background:radial-gradient(circle, #fff 0 18%, rgba(255,200,240,.8) 35%, rgba(255,79,176,0) 70%)}
${T} .kp-confeti{position:absolute; left:0; top:0; display:block; line-height:1; font-family:${SANS}; font-weight:900; will-change:transform, opacity}
${T} .kp-ola{position:absolute; bottom:-6px; width:30px; height:min(34vh, 210px); margin-left:-15px; transform-origin:50% 100%; will-change:transform}
${T} .kp-ola::before{content:""; position:absolute; left:50%; top:22px; bottom:0; width:9px; margin-left:-4.5px; border-radius:5px;
  background:linear-gradient(90deg, #cbbde6, #ffffff 45%, #a996cc); box-shadow:0 0 0 1px rgba(40,10,70,.35)}
${T} .kp-ola::after{content:""; position:absolute; left:50%; top:0; width:30px; height:30px; margin-left:-15px; border-radius:50%;
  background:radial-gradient(circle at 40% 35%, #fff 0 22%, var(--c) 55%, var(--c) 100%);
  box-shadow:0 0 14px 4px var(--c), 0 0 40px 14px var(--c)}

/* Ventana de la sorpresa */
${T} .tv-modal{background:radial-gradient(ellipse at 50% 30%, rgba(160,40,140,.5), rgba(10,2,24,.88) 72%);
  -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px)}
${T} .tv-tarjeta{max-width:430px; padding:44px 22px 22px; border-radius:26px; color:var(--kp-tinta); font-family:${SANS};
  border:2px solid transparent;
  background:
    radial-gradient(ellipse 90% 40% at 50% 0%, rgba(255,79,176,.28), transparent 70%) padding-box,
    linear-gradient(180deg, #2b0c4c 0%, #1b0733 70%, #150529 100%) padding-box,
    ${HOLO} border-box;
  box-shadow:0 24px 70px rgba(0,0,0,.6), 0 0 80px rgba(255,79,176,.3);
  animation:kpop-aparece .5s cubic-bezier(.2,.9,.3,1.2) both}
${T} .tv-tarjeta::before{content:"EN VIVO"; position:absolute; left:50%; top:14px; transform:translateX(-50%); padding:3px 10px 3px 20px; border-radius:999px;
  font-weight:900; font-size:.64rem; letter-spacing:.18em; color:#fff;
  background:radial-gradient(circle 3.5px at 10px 50%, #fff 98%, transparent 100%), #ff3f8f; box-shadow:0 0 12px rgba(255,63,143,.6)}
@keyframes kpop-aparece{from{opacity:0; transform:translateY(18px) scale(.92) rotate(-1.5deg)} to{opacity:1; transform:none}}
${T} .tv-dia{margin:0 0 16px; font-family:${DISPLAY}; font-weight:800; font-size:2.2rem; line-height:1.05;
  background:linear-gradient(100deg, #ffd6f2, #ff8ad6 40%, #d6b8ff 70%, #9ff3ff); -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 0 10px rgba(255,90,190,.45))}
${T} .tv-contenido{margin:0 0 16px; position:relative; z-index:1}
${T} .tv-msg{margin:0; padding:20px 18px 18px; border-radius:20px; position:relative;
  background:rgba(255,255,255,.07); border:1px solid rgba(255,200,240,.22);
  font-weight:600; font-size:1.16rem; line-height:1.5; color:#fff4fb}
${T} .tv-msg::before{content:""; display:block; width:44px; height:44px; margin:-4px auto 8px;
  background:url("${svgUri(DEDOS.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '))}") center / contain no-repeat;
  filter:drop-shadow(0 0 10px rgba(255,120,210,.6))}
${T} .tv-firma{margin:0 0 16px; font-family:${DISPLAY}; font-weight:700; font-style:normal; font-size:1.12rem; color:#ffb8e6; opacity:1; position:relative; z-index:1}
${T} .tv-firma::before{content:"♥ "; color:#ff4fb0}
${T} .tv-cerrar{position:relative; z-index:1; min-width:150px; font-family:${DISPLAY}; font-weight:800; font-size:1.02rem; letter-spacing:.02em;
  color:#fff; border:2px solid rgba(255,200,240,.7); background:rgba(255,255,255,.06); transition:background .2s, transform .2s}
${T} .tv-cerrar:hover{background:rgba(255,140,214,.2)}
${T} .tv-cerrar:focus-visible, ${T} .tv-boton:focus-visible{outline:3px solid #fff; outline-offset:3px}

/* Foto: como photocard impresa */
${T} .tv-foto{position:relative; margin:4px 6px 0; padding:8px 8px 12px; border-radius:16px; transform:rotate(-1.5deg);
  background:linear-gradient(#fff, #fff) padding-box, ${HOLO} border-box; border:3px solid transparent;
  box-shadow:0 14px 30px rgba(0,0,0,.45)}
${T} .tv-foto::after{content:""; position:absolute; top:-12px; right:-10px; width:34px; height:34px; transform:rotate(16deg);
  background:url("${svgUri(CORAZON.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '))}") center / contain no-repeat; filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))}
${T} .tv-foto img{border-radius:10px}
${T} .tv-foto figcaption{margin-top:10px; font-family:${DISPLAY}; font-weight:700; font-size:1.1rem; color:#5a1f86}

/* Vale: entrada de concierto */
${T} .tv-vale{position:relative; padding:22px 18px 46px; border:0; border-radius:14px; color:#fff;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(255,255,255,.35), transparent 55%),
    linear-gradient(120deg, #ff4fb0 0%, #c04bff 55%, #6a5bff 100%);
  -webkit-mask:radial-gradient(circle 12px at 0 50%, transparent 98%, #000 100%) left / 51% 100% no-repeat, radial-gradient(circle 12px at 100% 50%, transparent 98%, #000 100%) right / 51% 100% no-repeat;
  mask:radial-gradient(circle 12px at 0 50%, transparent 98%, #000 100%) left / 51% 100% no-repeat, radial-gradient(circle 12px at 100% 50%, transparent 98%, #000 100%) right / 51% 100% no-repeat;
  outline:2px dashed rgba(255,255,255,.5); outline-offset:-9px; box-shadow:0 0 30px rgba(255,79,176,.35)}
${T} .tv-vale::before{content:"PASE VIP"; position:absolute; top:12px; right:14px; padding:2px 8px; border-radius:6px; transform:rotate(8deg);
  font-weight:900; font-size:.62rem; letter-spacing:.14em; color:#5a1f86; background:#fff3a8}
${T} .tv-vale::after{content:""; position:absolute; left:50%; bottom:14px; width:58%; height:20px; transform:translateX(-50%); opacity:.85;
  background:repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 4px, #fff 4px 5px, transparent 5px 8px, #fff 8px 11px, transparent 11px 13px)}
${T} .tv-vale-por{font-weight:900; font-size:.78rem; letter-spacing:.3em; color:#ffe3f5}
${T} .tv-vale-que{margin:6px 0 4px; font-family:${DISPLAY}; font-weight:800; font-size:1.85rem; line-height:1.1; color:#fff; text-shadow:0 2px 0 rgba(80,10,110,.35)}
${T} .tv-vale-nota{margin:8px 0 0; font-weight:600; font-size:1rem; opacity:1; color:#fff0fa}

/* Canción: reproductor */
${T} .tv-cancion{padding:18px 16px 20px; border-radius:20px; background:rgba(255,255,255,.06); border:1px solid rgba(255,200,240,.2)}
${T} .tv-cancion::before{content:""; display:block; width:120px; height:120px; margin:0 auto 14px; border-radius:18px;
  background:url("${svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><g fill="#fff"><rect x="26" y="66" width="8" height="26" rx="4" opacity=".9"/><rect x="40" y="52" width="8" height="40" rx="4"/><rect x="54" y="60" width="8" height="32" rx="4" opacity=".9"/><rect x="68" y="44" width="8" height="48" rx="4"/><rect x="82" y="58" width="8" height="34" rx="4" opacity=".9"/></g><path transform="translate(60 30) scale(1.5)" d="M0 6 C-7 1 -10 -4 -6.5 -7 C-4 -9 -1.5 -7.5 0 -5.2 C1.5 -7.5 4 -9 6.5 -7 C10 -4 7 1 0 6Z" fill="#fff"/></svg>')}") center / 70% no-repeat,
    linear-gradient(135deg, #ff5fc1, #a24bff 60%, #5b6bff);
  box-shadow:0 10px 26px rgba(160,40,200,.45), 0 0 0 3px rgba(255,255,255,.15); animation:kpop-pulso 1.2s ease-in-out infinite}
@keyframes kpop-pulso{0%,100%{transform:scale(1)} 50%{transform:scale(1.04)}}
${T} .tv-cancion-titulo{font-family:${DISPLAY}; font-weight:800; font-size:1.4rem; color:#fff; margin:0 0 10px}
${T} .tv-cancion-titulo::after{content:""; display:block; height:5px; margin:10px auto 0; max-width:240px; border-radius:5px;
  background:linear-gradient(90deg, #ff8ad6 0 38%, rgba(255,255,255,.2) 38%); box-shadow:0 0 8px rgba(255,140,214,.5)}
${T} .tv-cancion-nota{font-weight:600; font-size:1.05rem; color:#f0e2fb; margin:0 0 16px}
${T} .tv-boton{font-family:${DISPLAY}; font-weight:800; font-size:1.05rem; color:#fff; border:0;
  background:linear-gradient(90deg, #ff4fb0, #a24bff); box-shadow:0 6px 20px rgba(255,79,176,.45)}
${T} .tv-boton:hover{filter:brightness(1.08)}

/* Regalo */
${T} .tv-regalo{padding:20px 16px 18px; border-radius:20px; border:2px solid transparent;
  background:linear-gradient(180deg, #321057, #22093e) padding-box, ${HOLO} border-box;
  box-shadow:0 0 30px rgba(255,79,176,.25)}
${T} .tv-regalo::before{content:""; display:block; width:64px; height:64px; margin:0 auto 12px;
  background:url("${svgUri(ICONOS.regalo.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '))}") center / contain no-repeat;
  filter:drop-shadow(0 0 14px rgba(255,140,214,.7)); animation:kpop-flota-regalo 2.6s ease-in-out infinite}
@keyframes kpop-flota-regalo{0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-6px) rotate(4deg)}}
${T} .tv-regalo-texto{font-family:${DISPLAY}; font-weight:800; font-size:1.45rem; line-height:1.2; color:#fff}
${T} .tv-regalo-nota{margin-top:10px; font-weight:600; font-size:1.02rem; opacity:1; color:#e6d6fa}

/* Día 24: gran final */
${T} .tv-modal.tv-final .tv-tarjeta{background:
    radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,217,94,.28), transparent 70%) padding-box,
    linear-gradient(180deg, #2f0d52 0%, #1c0735 70%, #160529 100%) padding-box,
    ${HOLO_ORO} border-box;
  box-shadow:0 24px 70px rgba(0,0,0,.6), 0 0 110px rgba(255,200,120,.35), 0 0 60px rgba(255,79,176,.3)}
${T} .tv-modal.tv-final .tv-tarjeta::before{content:"★ GRAN FINAL ★"; padding:3px 12px; color:#4a2600; background:linear-gradient(90deg, #fff3c4, #ffd95e); box-shadow:0 0 14px rgba(255,217,94,.7)}
${T} .tv-modal.tv-final .tv-dia{font-size:2.5rem; background-image:linear-gradient(100deg, #fff3c4, #ffd95e 40%, #ffb8e6 75%, #d6b8ff)}
${T} .tv-modal.tv-final .tv-msg{font-size:1.22rem; border-color:rgba(255,217,94,.4); background:rgba(255,217,94,.07)}
${T} .tv-modal.tv-final .tv-msg::before{width:52px; height:52px; background-image:url("${svgUri(ESTRELLA.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '))}"); filter:drop-shadow(0 0 12px rgba(255,217,94,.8)); animation:kpop-flota-regalo 2.6s ease-in-out infinite}
${T} .tv-modal.tv-final .tv-contenido::before, ${T} .tv-modal.tv-final .tv-contenido::after{content:"✦"; position:absolute; top:-6px; left:8px; font-size:1.3rem; color:#ffd95e; text-shadow:0 0 10px rgba(255,217,94,.9); animation:kpop-tw-css 2s ease-in-out infinite}
${T} .tv-modal.tv-final .tv-contenido::after{left:auto; right:10px; top:auto; bottom:-8px; font-size:1rem; color:#ffb8e6; animation-delay:-1s}
@keyframes kpop-tw-css{0%,100%{opacity:.35; transform:scale(.7)} 50%{opacity:1; transform:scale(1.15)}}

/* Aviso */
${T} .tv-toast{background:linear-gradient(90deg, #3a0f62, #5a1480); color:#fff; border:1px solid rgba(255,184,230,.5);
  font-family:${SANS}; font-weight:700; font-size:1rem; border-radius:999px; padding:10px 20px;
  box-shadow:0 8px 26px rgba(0,0,0,.45), 0 0 20px rgba(255,79,176,.3)}

/* Pantallas más grandes */
@media (min-width:600px){
  ${T} .kp-cabecera{padding-top:38px}
  ${T} .kp-valla{margin:0 24px; padding:34px 22px 30px}
  ${T} .tv-puertas{grid-template-columns:repeat(6, minmax(0, 1fr)); gap:22px 16px}
  ${T} .kp-num{font-size:2.3rem}
}
@media (min-width:968px){
  ${T} .kp-valla{margin-left:auto; margin-right:auto}
  ${T} .tv-puertas{grid-template-columns:repeat(8, minmax(0, 1fr)); gap:24px 18px}
}

/* Movimiento reducido */
@media (prefers-reduced-motion: reduce){
  ${T} .kp-foco, ${T} .kp-chispa, ${T} .kp-flota, ${T} .kp-vivo::before, ${T} .kp-haz, ${T} .kp-tw, ${T} .kp-latido, ${T} .kp-eq,
  ${T} .kp-pilar, ${T} .kp-led, ${T} .kp-ls, ${T} .kp-sube, ${T} .kp-valla::before, ${T} .tv-puerta, ${T} .kp-funda, ${T} .kp-frente,
  ${T} .kp-frente::after, ${T} .tv-puerta::before, ${T} .tv-msg::before, ${T} .tv-contenido::before, ${T} .tv-contenido::after, ${T} .kp-brillo, ${T} .kp-icono, ${T} .tv-tarjeta, ${T} .tv-cancion::before, ${T} .tv-regalo::before{animation:none !important}
  ${T} .kp-flota, ${T} .kp-brillo{display:none}
  ${T} .kp-sube{opacity:.7}
  ${T} .kp-carta, ${T} .tv-puerta{transition:none}
}
`;

  /* ---------- Efecto al abrir: la photocard se voltea, confeti y ola de barras de luz ---------- */
  function alAbrir(boton, n, capa, info) {
    return new Promise(function (listo) {
      var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducido || !capa || !boton || !boton.getBoundingClientRect) { listo(); return; }
      var dorso = boton.querySelector(".kp-dorso");
      if (dorso && !dorso.firstChild) dorso.innerHTML = dorsoHTML(n, info);
      var hechos = [];
      function quitarTodo() {
        hechos.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
        hechos = [];
        boton.classList.remove("kp-volteando");
      }
      boton.classList.add("kp-volteando");
      if (typeof document.body.animate !== "function") {
        setTimeout(listo, 600);
        setTimeout(quitarTodo, 900);
        return;
      }
      function nuevo(clase, x, y) {
        var e = document.createElement("span");
        e.className = clase;
        if (x != null) { e.style.left = x + "px"; e.style.top = y + "px"; }
        capa.appendChild(e); hechos.push(e);
        return e;
      }
      var r = boton.getBoundingClientRect();
      var W = window.innerWidth || 390, H = window.innerHeight || 700;
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;

      /* destello */
      var fl = nuevo("kp-destello", cx, cy);
      fl.animate([{ opacity: 0, transform: "scale(.3)" }, { opacity: 1, transform: "scale(1.2)", offset: 0.3 }, { opacity: 0, transform: "scale(2.4)" }],
        { duration: 600, easing: "ease-out", fill: "forwards" });

      /* confeti: tiras, corazones y estrellitas */
      var colores = ["#ff4fb0", "#ff9ad9", "#c9a6ff", "#9ff3ff", "#fff3a8", "#ffffff", "#a24bff"];
      for (var i = 0; i < 44; i++) {
        var c = nuevo("kp-confeti");
        var col = colores[i % colores.length], tipo = i % 4;
        if (tipo === 0) { c.textContent = "♥"; c.style.color = col; c.style.fontSize = (12 + Math.random() * 10).toFixed(0) + "px"; }
        else if (tipo === 1) { c.textContent = "✦"; c.style.color = col; c.style.fontSize = (10 + Math.random() * 8).toFixed(0) + "px"; }
        else { c.style.width = (5 + Math.random() * 4).toFixed(1) + "px"; c.style.height = (10 + Math.random() * 6).toFixed(1) + "px"; c.style.background = col; c.style.borderRadius = "2px"; }
        var ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5, dist = 70 + Math.random() * 120;
        var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
        var giro = (Math.random() - 0.5) * 720;
        c.animate([
          { transform: "translate(" + cx.toFixed(0) + "px," + cy.toFixed(0) + "px) scale(.3) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + (cx + dx).toFixed(0) + "px," + (cy + dy).toFixed(0) + "px) scale(1) rotate(" + (giro / 2).toFixed(0) + "deg)", opacity: 1, offset: 0.4 },
          { transform: "translate(" + (cx + dx * 1.2).toFixed(0) + "px," + (cy + dy + 110 + Math.random() * 60).toFixed(0) + "px) scale(.8) rotate(" + giro.toFixed(0) + "deg)", opacity: 0 }
        ], { duration: 720 + Math.random() * 120, easing: "cubic-bezier(.15,.7,.35,1)", fill: "forwards" });
      }

      /* ola de barras de luz desde abajo */
      var cuantas = W < 600 ? 7 : 11, luces = ["#ff8ad6", "#c9a6ff", "#9ff3ff", "#fff3a8", "#ffb8e6"];
      for (var k = 0; k < cuantas; k++) {
        var ola = nuevo("kp-ola", ((k + 0.5) / cuantas) * W, null);
        ola.style.top = "auto";
        ola.style.setProperty("--c", luces[k % luces.length]);
        ola.animate([
          { transform: "translateY(105%) rotate(-14deg)" },
          { transform: "translateY(12%) rotate(14deg)", offset: 0.35 },
          { transform: "translateY(12%) rotate(-14deg)", offset: 0.65 },
          { transform: "translateY(105%) rotate(10deg)" }
        ], { duration: 640, delay: k * (220 / cuantas), easing: "ease-in-out", fill: "both" });
      }

      setTimeout(listo, 860);
      setTimeout(quitarTodo, 900);
    });
  }

  /* ---------- Registro del estilo ---------- */
  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "kpop",
    nombre: "K-pop",
    emoji: "🎤",
    descripcion: "Concierto de diciembre: focos, barras de luz y photocards holográficas",
    fuentes: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@600;700;800;900&display=swap",
    color: "#2a0a4a",
    css: css,
    orden: ORDEN,
    escena: function () {
      return '<div class="kp-escena">' + fondoHTML() +
        '<header class="kp-cabecera">' +
        '<p class="kp-pre"><span class="kp-vivo">En vivo</span>Calendario de adviento</p>' +
        '<h1 class="tv-para"></h1>' +
        '<p class="kp-sub">24 días, 24 photocards: <b>tu concierto de diciembre</b> empieza aquí.</p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<div class="kp-escenario">' + escenarioSVG() + "</div>" +
        '<section class="kp-valla" aria-label="Photocards del calendario">' +
        '<p class="kp-etiqueta"><span aria-hidden="true">' + DEDOS + "</span>Tu colección de diciembre</p>" +
        '<div class="tv-puertas"></div></section>' +
        '<p class="kp-pie">Voltea una photocard cada día, hasta el <b>gran final del 24</b> ♥</p>' +
        "</div>";
    },
    puerta: function (n, estado, info) {
      var h = '<span class="kp-funda" aria-hidden="true"><span class="kp-carta">' +
        '<span class="kp-frente"><span class="kp-brillo"></span><span class="kp-dic">DIC</span><span class="kp-num">' + n + "</span>";
      if (estado === "bloqueada") h += '<span class="kp-cerrojo">' + CANDADO + "</span>";
      h += "</span>" +
        '<span class="kp-dorso">' + (estado === "abierta" ? dorsoHTML(n, info) : "") + "</span>" +
        "</span>" +
        '<span class="kp-sticker">' + (n === 24 ? ESTRELLA : CORAZON) + "</span></span>";
      if (estado === "hoy") h += '<span class="kp-hoy" aria-hidden="true">HOY</span>';
      return h;
    },
    alAbrir: alAbrir
  });
})();
