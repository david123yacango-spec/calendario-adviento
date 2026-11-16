/* Estilo «Joyero»: tocador antiguo con espejo, perlas y gemas; cada día es un cajoncito de terciopelo con tirador dorado. */
(function () {
  "use strict";

  /* ---------- Ayudas para el dibujo ---------- */
  function perla(x, y, r) {
    return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '" fill="url(#jy-g-perla)"/>';
  }
  /* Perlas a lo largo de una curva cuadrática */
  function hilo(x0, y0, qx, qy, x1, y1, cuantas, r) {
    var h = "";
    for (var i = 0; i <= cuantas; i++) {
      var t = i / cuantas, u = 1 - t;
      h += perla(u * u * x0 + 2 * u * t * qx + t * t * x1, u * u * y0 + 2 * u * t * qy + t * t * y1, r);
    }
    return h;
  }
  /* Perlas alrededor de una elipse */
  function aroPerlas(cx, cy, rx, ry, cuantas, r) {
    var h = "";
    for (var i = 0; i < cuantas; i++) {
      var a = (i / cuantas) * Math.PI * 2;
      h += perla(cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, r);
    }
    return h;
  }
  /* Gema tallada vista de frente (cojín) */
  function gema(x, y, w, claro, medio, oscuro) {
    var h = w * 0.78, m = w / 2;
    return '<g transform="translate(' + x + " " + y + ')">' +
      '<path d="M' + (-m) + " " + (-h * 0.18) + " L" + (-m * 0.55) + " " + (-h * 0.5) + " L" + (m * 0.55) + " " + (-h * 0.5) + " L" + m + " " + (-h * 0.18) + " L0 " + (h * 0.5) + 'Z" fill="' + medio + '"/>' +
      '<path d="M' + (-m) + " " + (-h * 0.18) + " L" + m + " " + (-h * 0.18) + " L0 " + (h * 0.5) + 'Z" fill="' + oscuro + '" opacity=".55"/>' +
      '<path d="M' + (-m * 0.55) + " " + (-h * 0.5) + " L" + (-m * 0.2) + " " + (-h * 0.18) + " L" + (m * 0.2) + " " + (-h * 0.18) + " L" + (m * 0.55) + " " + (-h * 0.5) + 'Z" fill="' + claro + '"/>' +
      '<path d="M' + (-m * 0.2) + " " + (-h * 0.18) + " L0 " + (h * 0.5) + " L" + (m * 0.2) + " " + (-h * 0.18) + 'Z" fill="' + claro + '" opacity=".5"/>' +
      "</g>";
  }
  function destello(x, y, r, d) {
    return '<path class="jy-tw" style="--d:' + d + 's" d="M' + x + " " + (y - r) + " Q" + x + " " + y + " " + (x + r) + " " + y +
      " Q" + x + " " + y + " " + x + " " + (y + r) + " Q" + x + " " + y + " " + (x - r) + " " + y + " Q" + x + " " + y + " " + x + " " + (y - r) + 'Z" fill="#fffaf0"/>';
  }

  function tocadorSVG() {
    var s = '<svg class="jy-tocador-svg" viewBox="0 0 800 270" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      "<defs>" +
      '<linearGradient id="jy-g-oro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1c9"/><stop offset=".3" stop-color="#d9b26a"/><stop offset=".55" stop-color="#f6dfa4"/><stop offset=".8" stop-color="#a87b34"/><stop offset="1" stop-color="#e9c983"/></linearGradient>' +
      '<linearGradient id="jy-g-oro-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe8b8"/><stop offset=".5" stop-color="#c9a05a"/><stop offset="1" stop-color="#8a6326"/></linearGradient>' +
      '<linearGradient id="jy-g-espejo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4eef2"/><stop offset=".38" stop-color="#cfc5d3"/><stop offset=".62" stop-color="#e9e2ea"/><stop offset="1" stop-color="#a99eb2"/></linearGradient>' +
      '<radialGradient id="jy-g-reflejo" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#ffe2ea" stop-opacity=".75"/><stop offset="1" stop-color="#ffe2ea" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="jy-g-perla" cx=".36" cy=".32" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#fbf5ec"/><stop offset=".8" stop-color="#ddd0bd"/><stop offset="1" stop-color="#b9a993"/></radialGradient>' +
      '<radialGradient id="jy-g-terciopelo" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#b8456c"/><stop offset=".55" stop-color="#7d2245"/><stop offset="1" stop-color="#4a1028"/></radialGradient>' +
      '<radialGradient id="jy-g-halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd9b0" stop-opacity=".35"/><stop offset="1" stop-color="#ffd9b0" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="jy-c-espejo"><ellipse cx="400" cy="124" rx="104" ry="84"/></clipPath>' +
      '<filter id="jy-f-sombra" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1a0310" flood-opacity=".55"/></filter>' +
      "</defs>";

    /* Halo cálido detrás del espejo */
    s += '<ellipse cx="400" cy="130" rx="260" ry="150" fill="url(#jy-g-halo)"/>';

    /* Patas del espejo y peana */
    s += '<g filter="url(#jy-f-sombra)">' +
      '<path d="M318 196 C300 222 296 240 282 258 H300 C312 240 322 222 334 204Z" fill="url(#jy-g-oro-v)"/>' +
      '<path d="M482 196 C500 222 504 240 518 258 H500 C488 240 478 222 466 204Z" fill="url(#jy-g-oro-v)"/>' +
      '<rect x="268" y="254" width="264" height="10" rx="5" fill="url(#jy-g-oro)"/>' +
      '<circle cx="282" cy="259" r="7" fill="url(#jy-g-oro)"/><circle cx="518" cy="259" r="7" fill="url(#jy-g-oro)"/>';

    /* Marco del espejo */
    s += '<ellipse cx="400" cy="124" rx="122" ry="102" fill="url(#jy-g-oro)"/>' +
      '<ellipse cx="400" cy="124" rx="114" ry="94" fill="none" stroke="#7a5420" stroke-width="1.5" opacity=".6"/>' +
      '<ellipse cx="400" cy="124" rx="110" ry="90" fill="#6a1a3a"/>';
    s += "</g>";

    /* Cristal con reflejos */
    s += '<g clip-path="url(#jy-c-espejo)">' +
      '<rect x="290" y="34" width="220" height="180" fill="url(#jy-g-espejo)"/>' +
      '<rect x="290" y="34" width="220" height="180" fill="url(#jy-g-reflejo)"/>' +
      '<path d="M300 150 L390 30 L420 30 L330 150Z" fill="#fff" opacity=".38"/>' +
      '<path d="M342 170 L432 50 L446 50 L356 170Z" fill="#fff" opacity=".28"/>' +
      '<path d="M410 214 L500 94 L520 94 L430 214Z" fill="#fff" opacity=".18"/>' +
      '<ellipse cx="400" cy="200" rx="90" ry="22" fill="#8c6f86" opacity=".18"/>' +
      "</g>";
    /* Perlas engastadas en el marco */
    s += aroPerlas(400, 124, 118, 98, 44, 3.3);

    /* Copete: volutas y gema rosa */
    s += '<g filter="url(#jy-f-sombra)">' +
      '<path d="M400 34 C384 20 360 22 352 34 C346 44 356 52 364 46 C368 42 364 36 358 38" fill="none" stroke="url(#jy-g-oro-v)" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M400 34 C416 20 440 22 448 34 C454 44 444 52 436 46 C432 42 436 36 442 38" fill="none" stroke="url(#jy-g-oro-v)" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M384 22 Q400 0 416 22 Q400 16 384 22Z" fill="url(#jy-g-oro)"/>' +
      '<circle cx="400" cy="25" r="13" fill="url(#jy-g-oro)"/>' +
      gema(400, 25, 16, "#ffd0de", "#e0517f", "#7d1238") +
      "</g>";
    /* Volutas laterales */
    s += '<path d="M280 112 C266 104 262 122 272 128 C280 133 288 124 280 118" fill="none" stroke="url(#jy-g-oro-v)" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M520 112 C534 104 538 122 528 128 C520 133 512 124 520 118" fill="none" stroke="url(#jy-g-oro-v)" stroke-width="4" stroke-linecap="round"/>' +
      gema(272, 146, 9, "#c9ffe6", "#1f9a6a", "#0b4a33") + gema(528, 146, 9, "#c9ffe6", "#1f9a6a", "#0b4a33");

    /* Collar de perlas en guirnalda */
    s += hilo(290, 164, 400, 262, 510, 164, 30, 4.4) +
      hilo(304, 178, 400, 240, 496, 178, 22, 3.4) +
      '<path d="M400 212 V220" stroke="url(#jy-g-oro-v)" stroke-width="1.6"/>' + perla(400, 227, 6.4);

    /* Izquierda: cojín con anillo solitario */
    s += '<g transform="translate(96 0)" filter="url(#jy-f-sombra)">' +
      '<path d="M-48 248 Q-52 222 -26 218 H26 Q52 222 48 248 Q50 262 26 262 H-26 Q-50 262 -48 248Z" fill="url(#jy-g-terciopelo)"/>' +
      '<path d="M-30 226 Q0 220 30 226" stroke="#e7a7bf" stroke-width="1.2" fill="none" opacity=".5"/>' +
      '<path d="M0 222 V256" stroke="#3a0a1e" stroke-width="2" opacity=".55"/>' +
      '<ellipse cx="0" cy="214" rx="17" ry="20" fill="none" stroke="url(#jy-g-oro)" stroke-width="5"/>' +
      '<path d="M-8 194 L8 194 L4 189 L-4 189Z" fill="url(#jy-g-oro-v)"/>' +
      gema(0, 183, 18, "#ffffff", "#dfe8f6", "#8aa0c4") +
      "</g>";
    /* Derecha: platito con pulsera de perlas y pendiente esmeralda */
    s += '<g transform="translate(704 0)" filter="url(#jy-f-sombra)">' +
      '<path d="M-14 262 H14 L10 252 H-10Z" fill="url(#jy-g-oro-v)"/>' +
      '<path d="M-50 236 Q0 268 50 236 Q0 246 -50 236Z" fill="url(#jy-g-oro)"/>' +
      '<ellipse cx="0" cy="236" rx="50" ry="8" fill="#8a6326"/>' +
      '<ellipse cx="0" cy="235" rx="46" ry="6" fill="#f2d79a"/>' +
      hilo(-30, 232, 0, 214, 30, 232, 12, 4) + hilo(-26, 234, 0, 242, 26, 234, 9, 3.6) +
      '<path d="M40 232 Q48 214 40 204" stroke="url(#jy-g-oro-v)" stroke-width="1.6" fill="none"/>' +
      '<circle cx="40" cy="203" r="3" fill="url(#jy-g-oro)"/>' +
      gema(46, 246, 14, "#c9ffe6", "#1f9a6a", "#0b4a33") +
      "</g>";

    /* Gemas sueltas sobre el tocador */
    s += gema(196, 258, 12, "#ffd0de", "#e0517f", "#7d1238") + gema(226, 262, 9, "#d6e4ff", "#3c63c9", "#162c6e") +
      gema(588, 260, 11, "#c9ffe6", "#1f9a6a", "#0b4a33") + gema(612, 263, 8, "#fff3c9", "#e2b13c", "#8a5f10") +
      perla(250, 263, 4.6) + perla(566, 262, 4.2);

    /* Brillos */
    s += destello(352, 74, 9, 0) + destello(450, 168, 6, 1.4) + destello(96, 176, 7, .7) + destello(400, 18, 6, 2.1) +
      destello(750, 226, 5, 1.1) + destello(200, 246, 5, 2.6) + destello(612, 248, 4, .3);
    s += "</svg>";
    return s;
  }

  function fondoHTML() {
    var h = '<div class="jy-fondo" aria-hidden="true">';
    var pos = [[8, 14], [22, 64], [36, 26], [64, 12], [78, 48], [92, 22], [14, 86], [50, 78], [86, 82], [58, 40]];
    pos.forEach(function (p, i) {
      h += '<span class="jy-luz" style="left:' + p[0] + "%;top:" + p[1] + "%;--d:" + (i * 0.7).toFixed(1) + "s;--t:" + (10 + (i * 7) % 14) + 'px"></span>';
    });
    return h + "</div>";
  }

  /* ---------- Íconos que descansan sobre el terciopelo ---------- */
  var ICONOS = {
    mensaje: '<svg viewBox="0 0 24 24"><path d="M3 6.5h18v11H3z" fill="#fffaf2" stroke="#9a6f2c" stroke-width="1.2" stroke-linejoin="round"/><path d="M3.4 7l8.6 6.2L20.6 7" fill="none" stroke="#9a6f2c" stroke-width="1.2" stroke-linejoin="round"/><circle cx="12" cy="13.4" r="2.9" fill="#b3264f" stroke="#7a1233" stroke-width=".6"/><path d="M12 14.9c-.7-.6-1.5-1-1.5-1.7a.75.75 0 0 1 1.5-.2.75.75 0 0 1 1.5.2c0 .7-.8 1.1-1.5 1.7z" fill="#ffd3df"/></svg>',
    foto: '<svg viewBox="0 0 24 24"><path d="M12 1.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 1 1 0-3.2z" fill="none" stroke="#c49a4e" stroke-width="1.1"/><ellipse cx="12" cy="13.6" rx="7.4" ry="8.6" fill="#e9c983" stroke="#8a6326" stroke-width="1"/><ellipse cx="12" cy="13.6" rx="5.4" ry="6.6" fill="#f3e7ef"/><path d="M7.4 17.6l2.8-3.2 2 2 1.6-1.4 2.8 2.6c-1 1.4-2.6 2.4-4.6 2.4s-3.6-.9-4.6-2.4z" fill="#b3577d"/><circle cx="14.2" cy="11" r="1.2" fill="#e8b84a"/></svg>',
    vale: '<svg viewBox="0 0 24 24"><path d="M8 5h12.5v14H8L3.5 12z" fill="#fbecc7" stroke="#9a6f2c" stroke-width="1.2" stroke-linejoin="round"/><circle cx="7.6" cy="12" r="1.3" fill="#7d2245"/><path d="M7.6 12C5 9 3 9.5 1.5 8" fill="none" stroke="#b3264f" stroke-width=".9"/><path d="M14.3 8.6l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z" fill="#c9962f"/></svg>',
    cancion: '<svg viewBox="0 0 24 24"><path d="M9 17.5V6.2l10-2.2v11.3" fill="none" stroke="#9a6f2c" stroke-width="1.8" stroke-linejoin="round"/><ellipse cx="6.8" cy="17.6" rx="2.6" ry="2" fill="#9a6f2c"/><ellipse cx="16.8" cy="15.4" rx="2.6" ry="2" fill="#9a6f2c"/><circle cx="6.1" cy="17" r=".7" fill="#ffe7a8"/><circle cx="16.1" cy="14.8" r=".7" fill="#ffe7a8"/></svg>',
    regalo: '<svg viewBox="0 0 24 24"><path d="M4 9.5l1.4-5.2h13.2L20 9.5z" fill="#f6e2ae" stroke="#8a6326" stroke-width="1"/><path d="M6.4 8.6l.9-3h9.4l.9 3z" fill="#2c0816"/><rect x="4" y="12.5" width="16" height="8" rx="1.2" fill="#e9c983" stroke="#8a6326" stroke-width="1"/><rect x="4" y="11" width="16" height="2.6" fill="#fff3cf" stroke="#8a6326" stroke-width=".6"/><ellipse cx="12" cy="10.4" rx="3.2" ry="2.9" fill="none" stroke="#fff6dc" stroke-width="1.5"/><path d="M10.2 7.6h3.6l-.7-1.7h-2.2z" fill="#ffffff" stroke="#7e93c0" stroke-width=".5"/></svg>',
    final: '<svg viewBox="0 0 24 24"><path d="M6.5 4h11l4 5.2L12 21 2.5 9.2z" fill="#eef4ff" stroke="#7e93c0" stroke-width="1" stroke-linejoin="round"/><path d="M2.5 9.2h19M8.6 4 7 9.2 12 21l5-11.8L15.4 4M7 9.2 12 4l5 5.2" fill="none" stroke="#9fb3d6" stroke-width=".8" stroke-linejoin="round"/><path d="M6.5 4 7 9.2 2.5 9.2z" fill="#ffffff"/><path d="M12 4l-5 5.2h10z" fill="#ffffff" opacity=".7"/></svg>'
  };
  function iconoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? ICONOS.final : (ICONOS[d.tipo] || ICONOS.final);
    } catch (e) { /* sin datos */ }
    return ICONOS.final;
  }
  function uri(svg, de, a) {
    var t = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
    if (de) t = t.split(de).join(a);
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t);
  }
  var CERRADURA = '<svg viewBox="0 0 16 16"><circle cx="8" cy="6.2" r="2.3" fill="currentColor"/><path d="M6.9 7.4h2.2l.8 5H6.1z" fill="currentColor"/></svg>';

  /* Fondo de damasco propio */
  var DAMASCO = uri('<svg viewBox="0 0 80 80"><g fill="none" stroke="#f0cf8e" stroke-width=".9" opacity=".5"><path d="M40 2L78 40L40 78L2 40Z"/><path d="M40 10c-4 6-10 8-10 14 0 5 6 6 10 2 4 4 10 3 10-2 0-6-6-8-10-14zM40 70c-4-6-10-8-10-14 0-5 6-6 10-2 4-4 10-3 10 2 0 6-6 8-10 14z"/><path d="M10 40c6-4 8-10 14-10 5 0 6 6 2 10 4 4 3 10-2 10-6 0-8-6-14-10zM70 40c-6-4-8-10-14-10-5 0-6 6-2 10-4 4-3 10 2 10 6 0 8-6 14-10z"/></g><g fill="#f0cf8e" opacity=".55"><circle cx="40" cy="40" r="2.2"/><circle cx="0" cy="0" r="2"/><circle cx="80" cy="0" r="2"/><circle cx="0" cy="80" r="2"/><circle cx="80" cy="80" r="2"/></g></svg>');

  /* Collar de perlas para la tarjeta */
  var COLLAR = uri('<svg viewBox="0 0 300 26"><defs><radialGradient id="p" cx=".36" cy=".32" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#fbf5ec"/><stop offset=".8" stop-color="#ddd0bd"/><stop offset="1" stop-color="#b9a993"/></radialGradient></defs>' +
    hilo(8, 5, 150, 30, 292, 5, 34, 3.6).replace(/url\(#jy-g-perla\)/g, "url(#p)") +
    '<path d="M150 17.5v3" stroke="#c9a05a" stroke-width="1.2"/><circle cx="150" cy="23" r="3" fill="url(#p)"/></svg>');

  /* ---------- Estilos ---------- */
  var T = "body.tema-joyero";
  var css = `
${T}{
  --jy-oro:#e2c27f; --jy-oro-claro:#fbecc6; --jy-oro-osc:#9a6f2c;
  --jy-rosa:#7d2245; --jy-rosa-osc:#4a1028; --jy-vino:#2c0816;
  --jy-tinta:#fbefe2; --jy-suave:#e8c9d3; --jy-ciruela:#3d1022;
  background:#3a0c1d; color:var(--jy-tinta);
  font-family:"Cormorant Garamond", Georgia, "Times New Roman", serif;
}
${T} #tv-escena{position:relative; z-index:1; overflow-x:hidden}
${T} .jy-escena{position:relative; min-height:100vh; min-height:100dvh; padding:0 0 104px}

/* Fondo: damasco rosa y luces cálidas */
${T} .jy-fondo{position:fixed; inset:0; z-index:-1; overflow:hidden; pointer-events:none;
  background:
    radial-gradient(ellipse 75% 45% at 50% 0%, rgba(255,205,170,.26), transparent 70%),
    radial-gradient(ellipse 60% 50% at 50% 110%, rgba(20,2,10,.7), transparent 70%),
    url("${DAMASCO}") center top / 80px 80px,
    linear-gradient(180deg, #4b1027 0%, #651a37 38%, #521330 72%, #36091b 100%);
  background-blend-mode:normal, normal, soft-light, normal}
${T} .jy-fondo::after{content:""; position:absolute; inset:0; background:radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(16,1,8,.55) 100%)}
${T} .jy-luz{position:absolute; width:var(--t); height:var(--t); transform:translate(-50%,-50%); opacity:.6;
  background:radial-gradient(circle, #fff 0 10%, rgba(255,226,180,.7) 24%, transparent 62%);
  clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);
  animation:joyero-titila 3.8s ease-in-out var(--d) infinite}
@keyframes joyero-titila{0%,100%{opacity:.15; transform:translate(-50%,-50%) scale(.5)} 50%{opacity:.9; transform:translate(-50%,-50%) scale(1)}}

/* Cabecera */
${T} .jy-cabecera{text-align:center; padding:28px 16px 0}
${T} .jy-pre{margin:0; font-family:"Playfair Display", Georgia, serif; font-weight:600; font-size:.74rem; letter-spacing:.34em; text-transform:uppercase; color:var(--jy-oro)}
${T} .jy-pre span{display:inline-block; margin:0 .6em; font-size:.8em; vertical-align:middle; opacity:.85}
${T} .tv-para{margin:2px 0 0; padding:0 .15em; font-family:"Pinyon Script", "Great Vibes", cursive; font-weight:400;
  font-size:clamp(2.9rem, 13vw, 4.6rem); line-height:1.15; letter-spacing:0;
  background:linear-gradient(180deg, #fff6dc 0%, #f1d08c 42%, #c3954a 72%, #f8e3b0 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 2px 0 rgba(60,8,26,.55)) drop-shadow(0 0 14px rgba(255,214,160,.28))}
${T} .jy-sub{margin:0 auto; max-width:32ch; font-style:italic; font-size:1.14rem; line-height:1.35; color:var(--jy-suave)}
${T} .tv-cuenta{display:inline-block; margin:14px auto 0; padding:6px 18px; border-radius:999px; max-width:100%;
  border:1px solid rgba(226,194,127,.65); background:rgba(44,8,22,.55); color:var(--jy-oro-claro);
  font-weight:600; font-size:1.06rem; box-shadow:0 0 18px rgba(226,194,127,.16)}
${T} .tv-cuenta[hidden]{display:none}

/* Tocador con espejo */
${T} .jy-tocador{position:relative; max-width:920px; margin:6px auto 0; height:clamp(196px, calc(min(100vw, 920px) * .34), 312px); pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%); mask-image:linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%)}
${T} .jy-tocador-svg{display:block; width:100%; height:100%}
${T} .jy-tw{transform-box:fill-box; transform-origin:center; animation:joyero-titila-svg 3.2s ease-in-out var(--d) infinite}
@keyframes joyero-titila-svg{0%,100%{opacity:.2; transform:scale(.5) rotate(0)} 50%{opacity:1; transform:scale(1.1) rotate(20deg)}}

/* Mueble joyero */
${T} .jy-mueble{position:relative; max-width:920px; margin:0 16px; padding:22px 12px 22px; border-radius:6px 6px 14px 14px;
  background:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,220,170,.14), transparent 70%),
    linear-gradient(90deg, rgba(0,0,0,.25), transparent 8%, transparent 92%, rgba(0,0,0,.25)),
    linear-gradient(180deg, #4e1426 0%, #3b0d1c 100%);
  box-shadow:inset 0 0 0 2px #b88d48, inset 0 0 0 4px #2a0714, inset 0 0 0 5px rgba(226,194,127,.45), 0 26px 50px rgba(10,0,5,.55)}
${T} .jy-mueble::before{content:""; position:absolute; left:-8px; right:-8px; top:-12px; height:14px; border-radius:4px;
  background:linear-gradient(180deg, #fff0c8 0%, #d6ae64 40%, #9a6f2c 75%, #e2c27f 100%);
  box-shadow:0 3px 6px rgba(20,0,8,.45)}
${T} .jy-mueble::after{content:""; position:absolute; left:6%; right:6%; bottom:-14px; height:14px;
  background:
    radial-gradient(circle at 50% 0, #f3d998 0 30%, #a87b34 62%, transparent 64%) 0 0 / 22px 22px no-repeat,
    radial-gradient(circle at 50% 0, #f3d998 0 30%, #a87b34 62%, transparent 64%) 100% 0 / 22px 22px no-repeat}
${T} .tv-puertas{display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:10px 8px; padding:0}

/* Cajón */
${T} .tv-puerta{position:relative; display:block; width:100%; aspect-ratio:1/0.92; min-height:44px; padding:3px; border:0; border-radius:5px;
  background:linear-gradient(145deg, #fbe8b8 0%, #c9a05a 35%, #f1d695 60%, #8a6326 100%);
  box-shadow:0 3px 7px rgba(14,0,6,.55);
  color:var(--jy-tinta); transition:transform .22s ease, box-shadow .22s ease, filter .22s ease;
  animation:joyero-entra .55s cubic-bezier(.2,.8,.3,1) backwards; animation-delay:calc(var(--tv-i) * 26ms)}
${T} .tv-puerta:focus-visible{outline:3px solid #fff2cc; outline-offset:3px}
${T} .tv-puerta:not([data-estado="bloqueada"]):hover{transform:translateY(-2px); box-shadow:0 8px 16px rgba(14,0,6,.6), 0 0 18px rgba(255,214,150,.35)}
${T} .tv-puerta:active{transform:scale(.98)}
@keyframes joyero-entra{from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:none}}

${T} .jy-hueco{position:absolute; inset:3px; border-radius:3px; overflow:visible;
  background:radial-gradient(ellipse 80% 70% at 50% 30%, #3a0a1d, #170309)}
${T} .jy-bandeja{position:absolute; left:7%; right:7%; top:6%; height:60%; display:flex; align-items:center; justify-content:center;
  clip-path:polygon(7% 0, 93% 0, 100% 100%, 0 100%);
  background:
    repeating-linear-gradient(115deg, rgba(255,255,255,.035) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse 70% 70% at 50% 45%, #c44f78 0%, #8f2a52 55%, #5c1534 100%);
  box-shadow:inset 0 6px 10px rgba(30,0,12,.6)}
${T} .jy-bandeja svg{width:56%; max-width:44px; height:auto; filter:drop-shadow(0 3px 2px rgba(40,0,14,.55)); animation:joyero-asoma .5s ease-out both}
@keyframes joyero-asoma{from{opacity:0; transform:translateY(5px) scale(.7)} to{opacity:1; transform:none}}

${T} .jy-frente{position:absolute; left:0; right:0; bottom:0; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7%;
  border-radius:3px;
  background:
    repeating-linear-gradient(115deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse 90% 80% at 40% 25%, #b1416a 0%, #7d2245 52%, #521330 100%);
  box-shadow:inset 0 1px 0 rgba(255,220,230,.25), inset 0 -5px 10px rgba(30,0,12,.5), inset 0 0 0 1px rgba(30,0,12,.4);
  transition:height .42s cubic-bezier(.3,.7,.2,1), transform .42s cubic-bezier(.3,.7,.2,1), box-shadow .42s}
${T} .jy-frente::before{content:""; position:absolute; inset:5px; border-radius:2px; border:1.5px dotted rgba(240,212,150,.75); pointer-events:none}
${T} .jy-placa{position:relative; z-index:1; min-width:58%; padding:2px 6px 1px; border-radius:3px 3px 3px 3px / 50% 50% 50% 50%;
  font-family:"Playfair Display", Georgia, serif; font-weight:700; font-size:clamp(1rem, 4.6vw, 1.3rem); line-height:1.25; text-align:center;
  color:#4a2a08; background:linear-gradient(180deg, #fff3cf 0%, #e6c47e 45%, #b88d48 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.4) inset, 0 0 0 1px #7a5420, 0 2px 3px rgba(20,0,8,.5); text-shadow:0 1px 0 rgba(255,245,215,.7)}
${T} .jy-tirador{position:relative; z-index:1; width:15px; height:15px; border-radius:50%;
  background:radial-gradient(circle at 35% 30%, #fffbe8 0 12%, #f0d28c 30%, #b28440 70%, #6f4c18 100%);
  box-shadow:0 0 0 2.5px rgba(122,84,32,.55), 0 2px 3px rgba(20,0,8,.6)}
${T} .jy-cerradura{position:relative; z-index:1; width:16px; height:16px; color:#d2b678; opacity:.75}
${T} .jy-cerradura svg{display:block; width:100%; height:100%}
${T} .jy-hoy{position:absolute; z-index:3; left:50%; top:-9px; transform:translateX(-50%); padding:1px 9px 2px; border-radius:999px;
  font-family:"Playfair Display", Georgia, serif; font-weight:700; font-size:.6rem; letter-spacing:.16em; text-transform:uppercase; white-space:nowrap;
  color:#4a2a08; background:linear-gradient(180deg, #fff3cf, #e2c27f); box-shadow:0 0 0 1px #9a6f2c, 0 0 12px rgba(255,220,150,.85)}

/* Bloqueada: terciopelo apagado y cerradura */
${T} .tv-puerta[data-estado="bloqueada"]{background:linear-gradient(145deg, #b9a173 0%, #7f6334 45%, #a88f5e 70%, #5a4220 100%); cursor:not-allowed}
${T} .tv-puerta[data-estado="bloqueada"] .jy-frente{filter:saturate(.62) brightness(.8)}
${T} .tv-puerta[data-estado="bloqueada"] .jy-placa{background:linear-gradient(180deg, #e7d6ad, #b39462); color:#4b3815}

/* Disponible: tirador que brilla */
${T} .tv-puerta[data-estado="disponible"] .jy-tirador{box-shadow:0 0 0 2.5px rgba(122,84,32,.55), 0 2px 3px rgba(20,0,8,.6), 0 0 8px rgba(255,226,160,.6)}

/* Hoy: destello que recorre el cajón */
${T} .tv-puerta[data-estado="hoy"]{z-index:1; background:linear-gradient(145deg, #fff6d6 0%, #e7bd63 35%, #fff0c4 60%, #b88d48 100%);
  animation:joyero-entra .55s cubic-bezier(.2,.8,.3,1) backwards, joyero-latido 2.4s ease-in-out .6s infinite}
${T} .tv-puerta[data-estado="hoy"] .jy-frente{overflow:hidden; background:
    repeating-linear-gradient(115deg, rgba(255,255,255,.04) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse 90% 80% at 40% 25%, #c9517c 0%, #8f2a52 52%, #5c1534 100%)}
${T} .tv-puerta[data-estado="hoy"] .jy-frente::after{content:""; position:absolute; top:-20%; bottom:-20%; left:-60%; width:40%; transform:skewX(-20deg);
  background:linear-gradient(90deg, transparent, rgba(255,246,222,.75), transparent); animation:joyero-brilla 2.8s ease-in-out 1s infinite}
${T} .tv-puerta[data-estado="hoy"]::after{content:""; position:absolute; right:-6px; top:-6px; width:18px; height:18px; z-index:2;
  background:radial-gradient(circle, #fff 0 16%, #ffe8b0 40%, #e2b45a 72%);
  clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%);
  filter:drop-shadow(0 0 5px rgba(255,230,170,.9)); animation:joyero-gira 3s ease-in-out infinite}
@keyframes joyero-latido{0%,100%{box-shadow:0 3px 7px rgba(14,0,6,.55), 0 0 10px 2px rgba(255,214,150,.45)} 50%{box-shadow:0 3px 7px rgba(14,0,6,.55), 0 0 24px 8px rgba(255,214,150,.7)}}
@keyframes joyero-brilla{0%{left:-60%} 45%,100%{left:130%}}
@keyframes joyero-gira{0%,100%{transform:scale(.7) rotate(0)} 50%{transform:scale(1.15) rotate(45deg)}}

/* Día 24: diamante sobre el cajón */
${T} .tv-puerta[data-n="24"]::before{content:""; position:absolute; left:50%; top:-13px; width:20px; height:16px; margin-left:-10px; z-index:2;
  background:url("${uri(ICONOS.final)}") center / contain no-repeat; filter:drop-shadow(0 0 5px rgba(220,235,255,.85))}
${T} .tv-puerta[data-n="24"][data-estado="hoy"] .jy-hoy{top:auto; bottom:-9px}

/* Abierta (y abriéndose): el cajón sale y deja ver el terciopelo */
${T} .tv-puerta[data-estado="abierta"]{background:linear-gradient(145deg, #e9d2a0 0%, #a98443 45%, #d9bb7a 70%, #6f4c18 100%)}
${T} .tv-puerta[data-estado="abierta"] .jy-frente,
${T} .tv-puerta.jy-abriendo .jy-frente{height:36%; transform:translateY(16%) scale(1.07); flex-direction:row; gap:6%;
  box-shadow:inset 0 1px 0 rgba(255,220,230,.25), inset 0 -3px 6px rgba(30,0,12,.5), 0 -5px 7px rgba(20,0,8,.55), 0 4px 5px rgba(20,0,8,.5)}
${T} .tv-puerta[data-estado="abierta"] .jy-frente::before{inset:3px}
${T} .tv-puerta[data-estado="abierta"] .jy-placa{min-width:0; padding:0 7px; font-size:clamp(.78rem, 3.4vw, .98rem); line-height:1.3}
${T} .tv-puerta[data-estado="abierta"] .jy-tirador{width:9px; height:9px; box-shadow:0 0 0 1.5px rgba(122,84,32,.55)}
${T} .tv-puerta.jy-abriendo .jy-placa, ${T} .tv-puerta.jy-abriendo .jy-tirador{opacity:0; transition:opacity .15s}

/* Pie */
${T} .jy-pie{margin:30px 16px 0; text-align:center; font-style:italic; font-size:1.08rem; color:var(--jy-suave)}
${T} .jy-pie b{font-family:"Pinyon Script", cursive; font-style:normal; font-weight:400; font-size:1.5em; color:var(--jy-oro); vertical-align:-.08em}

/* Partículas del efecto (viven en .tv-capa) */
${T} .jy-gema{position:absolute; left:0; top:0;
  clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)}
${T} .jy-perla{position:absolute; left:0; top:0; border-radius:50%;
  background:radial-gradient(circle at 34% 30%, #fff 0 14%, #fbf4ea 34%, #e0d2be 72%, #b9a993 100%);
  box-shadow:0 2px 4px rgba(30,0,12,.45)}
${T} .jy-faceta{position:absolute; left:0; top:0;
  clip-path:polygon(25% 0,75% 0,100% 35%,50% 100%,0 35%)}
${T} .jy-destello{position:absolute; width:70px; height:70px; margin:-35px 0 0 -35px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,250,235,.95) 0 12%, rgba(255,220,160,.55) 35%, rgba(255,200,140,0) 70%)}

/* Tarjeta: estuche forrado en seda marfil */
${T} .tv-modal{background:radial-gradient(ellipse at 50% 35%, rgba(110,29,59,.55), rgba(18,2,9,.88) 72%);
  -webkit-backdrop-filter:blur(5px); backdrop-filter:blur(5px)}
${T} .tv-tarjeta{max-width:440px; padding:46px 24px 24px; border-radius:20px; color:var(--jy-ciruela);
  font-family:"Cormorant Garamond", Georgia, serif;
  background:
    linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 45%, transparent 60%),
    radial-gradient(ellipse 90% 60% at 50% 0%, #fff 0%, transparent 70%),
    linear-gradient(180deg, #fffaf3 0%, #f8ede1 60%, #f1e0cf 100%);
  border:1px solid #c9a05a;
  box-shadow:0 0 0 6px #7d2245, 0 0 0 7px #e2c27f, 0 0 0 9px #4a1028, 0 26px 70px rgba(0,0,0,.6), 0 0 90px rgba(255,190,200,.18);
  animation:joyero-aparece .5s cubic-bezier(.2,.9,.3,1.15) both}
${T} .tv-tarjeta::before{content:""; position:absolute; left:16px; right:16px; top:10px; height:26px; pointer-events:none;
  background:url("${COLLAR}") center top / contain no-repeat}
${T} .tv-tarjeta::after{content:""; position:absolute; inset:9px; border:1px solid rgba(201,160,90,.55); border-radius:13px; pointer-events:none}
@keyframes joyero-aparece{from{opacity:0; transform:translateY(16px) scale(.94)} to{opacity:1; transform:none}}
${T} .tv-dia{display:flex; align-items:center; justify-content:center; gap:12px; margin:0 0 14px;
  font-family:"Pinyon Script", cursive; font-weight:400; font-size:2.5rem; line-height:1.15; color:#8a2448}
${T} .tv-dia::before, ${T} .tv-dia::after{content:""; flex:0 1 52px; height:1px; background:linear-gradient(90deg, transparent, #c9a05a)}
${T} .tv-dia::after{background:linear-gradient(90deg, #c9a05a, transparent)}
${T} .tv-contenido{margin:0 0 16px; position:relative; z-index:1}
${T} .tv-msg{margin:0; padding:2px 6px; font-style:italic; font-weight:500; font-size:1.36rem; line-height:1.42; color:#3d1022}
${T} .tv-msg::before{content:"\\2766"; display:block; margin:0 0 8px; font-style:normal; font-size:1.3rem; line-height:1; color:#b88d48}
${T} .tv-firma{margin:0 0 18px; font-family:"Pinyon Script", cursive; font-style:normal; font-size:1.6rem; color:#7a5520; opacity:1; position:relative; z-index:1}
${T} .tv-cerrar{position:relative; z-index:1; min-width:150px; font-family:"Playfair Display", Georgia, serif; font-weight:600; letter-spacing:.08em;
  color:#fbecc6; border:1px solid #c9a05a; background:linear-gradient(180deg, #9a3260 0%, #7d2245 50%, #5c1534 100%);
  box-shadow:inset 0 1px 0 rgba(255,220,230,.3), 0 4px 12px rgba(74,16,40,.35); transition:filter .2s}
${T} .tv-cerrar:hover{filter:brightness(1.12)}
${T} .tv-cerrar:focus-visible, ${T} .tv-boton:focus-visible{outline:3px solid #c9a05a; outline-offset:3px}

/* Foto en relicario */
${T} .tv-foto{position:relative; margin:6px 0 0; padding-top:10px}
${T} .tv-foto::before{content:""; position:absolute; left:50%; top:-4px; width:18px; height:18px; margin-left:-9px; border-radius:50%;
  border:3px solid #c9a05a; box-shadow:0 1px 2px rgba(60,20,0,.35)}
${T} .tv-foto img{border-radius:50%; padding:7px;
  background:linear-gradient(145deg, #fbe8b8, #c9a05a 35%, #f1d695 60%, #8a6326);
  box-shadow:0 0 0 1px #7a5420, 0 12px 26px rgba(74,16,40,.35)}
${T} .tv-foto figcaption{margin-top:10px; font-family:"Pinyon Script", cursive; font-size:1.7rem; line-height:1.2; color:#8a2448}

/* Vale: etiqueta de joyería con cordón */
${T} .tv-vale{position:relative; margin:4px 0 0; padding:18px 16px 18px 34px; border:0; border-radius:4px 12px 12px 4px; color:#3d1022;
  background:radial-gradient(ellipse at 30% 0%, rgba(255,255,255,.7), transparent 60%), linear-gradient(135deg, #fff6dd 0%, #f2dca6 55%, #e2c27f 100%);
  clip-path:polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%);
  outline:1.5px solid rgba(154,111,44,.55); outline-offset:-7px}
${T} .tv-vale::before{content:""; position:absolute; left:14px; top:50%; width:12px; height:12px; margin-top:-6px; border-radius:50%;
  background:#f8ede1; box-shadow:inset 0 0 0 2px #b88d48, inset 0 2px 3px rgba(60,20,0,.35)}
${T} .tv-vale-por{font-family:"Playfair Display", Georgia, serif; font-weight:600; font-size:.74rem; letter-spacing:.3em; text-transform:uppercase; color:#8a5f1c}
${T} .tv-vale-que{margin:4px 0 2px; font-family:"Playfair Display", Georgia, serif; font-style:italic; font-weight:700; font-size:1.55rem; line-height:1.15; color:#6e1d3b}
${T} .tv-vale-nota{margin:6px 0 0; font-size:1.08rem; font-style:italic; opacity:1; color:#4d2a1a}

/* Canción: disco de cajita de música */
${T} .tv-cancion::before{content:""; display:block; width:92px; height:92px; margin:0 auto 14px; border-radius:50%;
  background:url("${uri(ICONOS.cancion, "#9a6f2c", "#5c1534")}") center / 38% no-repeat,
    repeating-conic-gradient(from 0deg, rgba(92,21,52,.45) 0 2deg, transparent 2deg 15deg),
    radial-gradient(circle, #fff3cf 0 22%, #e2c27f 23% 30%, #f6e2ae 31% 44%, #c9a05a 45% 52%, #f1d695 53% 100%);
  box-shadow:0 0 0 2px #9a6f2c, 0 0 0 5px #7d2245, 0 0 0 6px #c9a05a, 0 8px 20px rgba(74,16,40,.35);
  animation:joyero-gira-disco 9s linear infinite}
@keyframes joyero-gira-disco{to{transform:rotate(360deg)}}
${T} .tv-cancion-titulo{font-family:"Playfair Display", Georgia, serif; font-style:italic; font-size:1.35rem; color:#6e1d3b; margin:0 0 6px}
${T} .tv-cancion-nota{font-style:italic; font-size:1.18rem; color:#4d2a1a; margin:0 0 16px}
${T} .tv-boton{font-family:"Playfair Display", Georgia, serif; font-weight:600; letter-spacing:.05em; color:#4a2a08; border:0;
  background:linear-gradient(180deg, #fff3cf, #e2c27f 55%, #b88d48); box-shadow:0 0 0 1px #9a6f2c, 0 6px 16px rgba(154,111,44,.35)}
${T} .tv-boton:hover{filter:brightness(1.06)}

/* Regalo: estuche de anillo */
${T} .tv-regalo{padding:20px 16px 18px; border-radius:16px; color:#3d1022;
  background:radial-gradient(ellipse at 50% 0%, rgba(196,79,120,.16), transparent 70%), rgba(255,255,255,.4);
  box-shadow:inset 0 0 0 1px rgba(201,160,90,.6)}
${T} .tv-regalo::before{content:""; display:block; width:64px; height:64px; margin:0 auto 10px;
  background:url("${uri(ICONOS.regalo)}") center / contain no-repeat;
  filter:drop-shadow(0 4px 6px rgba(74,16,40,.35)); animation:joyero-flota 3s ease-in-out infinite}
@keyframes joyero-flota{0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)}}
${T} .tv-regalo-texto{font-size:1.42rem; font-weight:600; line-height:1.25; color:#5c1534}
${T} .tv-regalo-nota{margin-top:10px; font-size:1.1rem; font-style:italic; opacity:1; color:#4d2a1a}

/* Día 24: estuche de terciopelo */
${T} .tv-modal.tv-final .tv-tarjeta{color:var(--jy-tinta);
  background:
    linear-gradient(115deg, transparent 30%, rgba(255,230,240,.14) 45%, transparent 60%),
    repeating-linear-gradient(115deg, rgba(255,255,255,.025) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse 90% 70% at 50% 20%, #a3355e 0%, #7d2245 50%, #4a1028 100%);
  border-color:#e2c27f;
  box-shadow:0 0 0 6px #2c0816, 0 0 0 7px #e2c27f, 0 0 0 9px #2c0816, 0 26px 70px rgba(0,0,0,.6), 0 0 120px rgba(255,214,160,.3)}
${T} .tv-modal.tv-final .tv-tarjeta::after{border-color:rgba(226,194,127,.6)}
${T} .tv-modal.tv-final .tv-dia{color:#f6dfa4; font-size:2.8rem}
${T} .tv-modal.tv-final .tv-dia::before{background:linear-gradient(90deg, transparent, #e2c27f)}
${T} .tv-modal.tv-final .tv-dia::after{background:linear-gradient(90deg, #e2c27f, transparent)}
${T} .tv-modal.tv-final .tv-contenido::before{content:"Nochebuena"; display:block; margin:-8px 0 12px; font-family:"Playfair Display", Georgia, serif; font-weight:600;
  font-size:.72rem; letter-spacing:.42em; text-transform:uppercase; color:#e2c27f}
${T} .tv-modal.tv-final .tv-msg{color:#fff3e6; font-size:1.42rem}
${T} .tv-modal.tv-final .tv-msg::before{content:""; width:46px; height:36px; margin:0 auto 10px;
  background:url("${uri(ICONOS.final)}") center / contain no-repeat; filter:drop-shadow(0 0 10px rgba(220,235,255,.8))}
${T} .tv-modal.tv-final .tv-firma{color:#f6dfa4}
${T} .tv-modal.tv-final .tv-cerrar{color:#4a2a08; background:linear-gradient(180deg, #fff3cf, #e2c27f 55%, #b88d48); border-color:#fff0c8}

/* Aviso */
${T} .tv-toast{background:linear-gradient(180deg, #8f2a52, #5c1534); color:var(--jy-oro-claro); border:1px solid rgba(226,194,127,.75);
  font-family:"Cormorant Garamond", Georgia, serif; font-size:1.08rem; font-weight:600; border-radius:999px; padding:10px 20px;
  box-shadow:0 8px 26px rgba(0,0,0,.45)}

/* Pantallas más grandes */
@media (min-width:600px){
  ${T} .jy-cabecera{padding-top:38px}
  ${T} .jy-mueble{padding:26px 20px 26px}
  ${T} .tv-puertas{grid-template-columns:repeat(6, minmax(0, 1fr)); gap:14px 12px}
  ${T} .jy-tirador{width:17px; height:17px}
}
@media (min-width:952px){
  ${T} .jy-mueble{margin-left:auto; margin-right:auto; padding:30px 26px}
  ${T} .tv-puertas{grid-template-columns:repeat(8, minmax(0, 1fr)); gap:16px 14px}
  ${T} .jy-placa{font-size:1.35rem}
}

/* Movimiento reducido */
@media (prefers-reduced-motion: reduce){
  ${T} .jy-luz, ${T} .jy-tw, ${T} .tv-puerta, ${T} .tv-puerta::after, ${T} .jy-frente::after, ${T} .jy-bandeja svg,
  ${T} .tv-tarjeta, ${T} .tv-regalo::before, ${T} .tv-cancion::before{animation:none !important}
  ${T} .tv-puerta[data-estado="hoy"] .jy-frente::after{display:none}
  ${T} .jy-frente, ${T} .tv-puerta{transition:none}
}
`;

  /* ---------- Efecto al abrir: el cajón sale, chispas de gemas y perlas que ruedan ---------- */
  var COLORES = [
    ["#fff6fa", "#f07aa0", "#b3264f"],
    ["#f0fff8", "#4fd39a", "#13784f"],
    ["#f2f6ff", "#7aa2ff", "#2c4fb5"],
    ["#fffbea", "#ffd977", "#c48f1f"],
    ["#ffffff", "#e6eefc", "#9fb3d6"]
  ];
  function alAbrir(boton, n, capa) {
    return new Promise(function (listo) {
      var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducido || !capa || !boton || !boton.getBoundingClientRect) { listo(); return; }
      var hechos = [];
      function quitarTodo() {
        hechos.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
        hechos = [];
        boton.classList.remove("jy-abriendo");
      }
      boton.classList.add("jy-abriendo");
      if (typeof document.body.animate !== "function") {
        setTimeout(listo, 450);
        setTimeout(quitarTodo, 900);
        return;
      }
      function nuevo(clase, x, y, tam) {
        var e = document.createElement("span");
        e.className = clase;
        e.style.left = x + "px"; e.style.top = y + "px";
        if (tam) { e.style.width = tam + "px"; e.style.height = tam + "px"; e.style.marginLeft = (-tam / 2) + "px"; e.style.marginTop = (-tam / 2) + "px"; }
        capa.appendChild(e); hechos.push(e);
        return e;
      }
      var r = boton.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height * 0.4;

      /* destello de luz al salir el cajón */
      var luz = nuevo("jy-destello", cx, cy);
      luz.animate([{ opacity: 0, transform: "scale(.3)" }, { opacity: 1, transform: "scale(1.3)", offset: 0.35 }, { opacity: 0, transform: "scale(2.2)" }],
        { duration: 600, delay: 120, easing: "ease-out", fill: "both" });

      /* chispas de gemas: estrellas de colores que giran */
      for (var i = 0; i < 18; i++) {
        var c = COLORES[i % COLORES.length];
        var ang = (i / 18) * Math.PI * 2 + Math.random() * 0.3, dist = 45 + Math.random() * 75;
        var tam = 9 + Math.random() * 12;
        var g = nuevo(i % 3 === 2 ? "jy-faceta" : "jy-gema", cx, cy, tam);
        g.style.background = "linear-gradient(135deg," + c[0] + "," + c[1] + " 55%," + c[2] + ")";
        g.style.filter = "drop-shadow(0 0 4px " + c[1] + ")";
        var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
        g.animate([
          { opacity: 0, transform: "translate(0,0) scale(.2) rotate(0deg)" },
          { opacity: 1, transform: "translate(" + (dx * 0.75).toFixed(1) + "px," + (dy * 0.75).toFixed(1) + "px) scale(1.1) rotate(70deg)", offset: 0.45 },
          { opacity: 0, transform: "translate(" + dx.toFixed(1) + "px," + (dy + 18).toFixed(1) + "px) scale(.3) rotate(160deg)" }
        ], { duration: 520 + Math.random() * 160, delay: 120 + Math.random() * 60, easing: "cubic-bezier(.2,.7,.4,1)", fill: "both" });
      }

      /* perlas que saltan y caen rebotando */
      for (var j = 0; j < 12; j++) {
        var lado = j % 2 === 0 ? -1 : 1;
        var vx = lado * (25 + Math.random() * 80), alto = 40 + Math.random() * 60, caida = 50 + Math.random() * 50;
        var p = nuevo("jy-perla", cx + (Math.random() - 0.5) * r.width * 0.4, cy + r.height * 0.2, 6 + Math.random() * 6);
        p.animate([
          { opacity: 0, transform: "translate(0,0) scale(.4)" },
          { opacity: 1, transform: "translate(" + (vx * 0.35).toFixed(1) + "px," + (-alto).toFixed(1) + "px) scale(1)", offset: 0.3 },
          { opacity: 1, transform: "translate(" + (vx * 0.75).toFixed(1) + "px," + caida.toFixed(1) + "px) scale(1)", offset: 0.72 },
          { opacity: 1, transform: "translate(" + (vx * 0.88).toFixed(1) + "px," + (caida - 14).toFixed(1) + "px) scale(1)", offset: 0.85 },
          { opacity: 0, transform: "translate(" + vx.toFixed(1) + "px," + caida.toFixed(1) + "px) scale(.9)" }
        ], { duration: 640 + Math.random() * 80, delay: 90 + j * 8, easing: "linear", fill: "both" });
      }

      setTimeout(listo, 760);
      setTimeout(quitarTodo, 900);
    });
  }

  /* ---------- Registro del estilo ---------- */
  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "joyero",
    nombre: "Joyero",
    emoji: "💍",
    descripcion: "Tocador antiguo: terciopelo, perlas y cajoncitos con tirador dorado",
    fuentes: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap",
    color: "#4b1027",
    css: css,
    orden: [7, 14, 2, 19, 11, 23, 5, 16, 21, 9, 1, 13, 18, 4, 24, 10, 15, 3, 20, 8, 12, 17, 6, 22],
    escena: function () {
      return '<div class="jy-escena">' + fondoHTML() +
        '<header class="jy-cabecera">' +
        '<p class="jy-pre"><span aria-hidden="true">✧</span>Calendario de adviento<span aria-hidden="true">✧</span></p>' +
        '<h1 class="tv-para"></h1>' +
        '<p class="jy-sub">Un cajoncito con brillo para cada día de diciembre.</p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<div class="jy-tocador">' + tocadorSVG() + "</div>" +
        '<section class="jy-mueble" aria-label="Cajones del joyero"><div class="tv-puertas"></div></section>' +
        '<p class="jy-pie">Abre un cajón cada día, hasta <b>Nochebuena</b></p>' +
        "</div>";
    },
    puerta: function (n, estado) {
      var h = '<span class="jy-hueco" aria-hidden="true">';
      if (estado !== "bloqueada") h += '<span class="jy-bandeja">' + iconoDe(n) + "</span>";
      h += '<span class="jy-frente"><span class="jy-placa">' + n + "</span>" +
        (estado === "bloqueada" ? '<span class="jy-cerradura">' + CERRADURA + "</span>" : '<span class="jy-tirador"></span>') +
        "</span></span>";
      if (estado === "hoy") h += '<span class="jy-hoy" aria-hidden="true">Hoy</span>';
      return h;
    },
    alAbrir: alAbrir
  });
})();
