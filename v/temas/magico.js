/* Estilo «Mágico»: noche estrellada, castillo de cuento propio y ventanas en arco que brillan. */
(function () {
  "use strict";

  /* ---------- Ayudas para el dibujo ---------- */
  function azar(semilla) {
    var s = semilla;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  function ventanita(x, y, w, h, apagada) {
    var r = w / 2;
    return '<path d="M' + x + " " + (y + h) + " V" + (y + r) + " A" + r + " " + r + " 0 0 1 " + (x + w) + " " + (y + r) + " V" + (y + h) + 'Z" fill="' +
      (apagada ? "#141846" : "#ffd27a") + '"' + (apagada ? "" : ' filter="url(#mg-f-brillo)"') + "/>";
  }
  function almenas(x0, x1, y, paso, ancho, alto, color) {
    var h = "";
    for (var x = x0; x + ancho <= x1; x += paso) h += '<rect x="' + x + '" y="' + y + '" width="' + ancho + '" height="' + alto + '" fill="' + color + '"/>';
    return h;
  }
  function pino(x, y, alto, color) {
    var a = alto, w = alto * 0.55;
    return '<path d="M' + x + " " + (y - a) + " L" + (x - w * 0.45) + " " + (y - a * 0.45) + " L" + (x - w * 0.25) + " " + (y - a * 0.45) +
      " L" + (x - w * 0.5) + " " + y + " L" + (x + w * 0.5) + " " + y + " L" + (x + w * 0.25) + " " + (y - a * 0.45) + " L" + (x + w * 0.45) + " " + (y - a * 0.45) + 'Z" fill="' + color + '"/>';
  }
  function destello(x, y, r, clase) {
    return '<path class="' + (clase || "mg-tw") + '" style="--d:' + ((x * 7 + y * 3) % 40) / 10 + 's" d="M' + x + " " + (y - r) + " Q" + x + " " + y + " " + (x + r) + " " + y +
      " Q" + x + " " + y + " " + x + " " + (y + r) + " Q" + x + " " + y + " " + (x - r) + " " + y + " Q" + x + " " + y + " " + x + " " + (y - r) + 'Z" fill="#fff4cc"/>';
  }

  function castilloSVG() {
    var oro = "#e9c46a";
    var s = '<svg class="mg-castillo-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      "<defs>" +
      '<linearGradient id="mg-g-torre" x1="0" x2="1"><stop offset="0" stop-color="#3b4196"/><stop offset=".42" stop-color="#262b6e"/><stop offset="1" stop-color="#14184a"/></linearGradient>' +
      '<linearGradient id="mg-g-techo" x1="0" x2="1"><stop offset="0" stop-color="#7a5cc4"/><stop offset=".48" stop-color="#43318e"/><stop offset="1" stop-color="#21184f"/></linearGradient>' +
      '<linearGradient id="mg-g-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3076"/><stop offset="1" stop-color="#181c50"/></linearGradient>' +
      '<radialGradient id="mg-g-luna"><stop offset="0" stop-color="#fff6d8" stop-opacity=".5"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="mg-g-halo" cx=".5" cy=".65" r=".55"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".32"/><stop offset=".6" stop-color="#9b7cff" stop-opacity=".08"/><stop offset="1" stop-color="#9b7cff" stop-opacity="0"/></radialGradient>' +
      '<mask id="mg-m-luna"><rect width="800" height="300" fill="#fff"/><circle cx="653" cy="61" r="23" fill="#000"/></mask>' +
      '<filter id="mg-f-brillo" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      "</defs>";

    /* Luna y halo */
    s += '<circle cx="640" cy="70" r="78" fill="url(#mg-g-luna)"/>' +
      '<circle cx="640" cy="70" r="26" fill="#fff3cf" mask="url(#mg-m-luna)"/>' +
      '<ellipse cx="400" cy="205" rx="330" ry="150" fill="url(#mg-g-halo)"/>';

    /* Destellos del cielo */
    s += destello(170, 60, 6) + destello(560, 40, 5) + destello(300, 30, 4) + destello(720, 140, 4) + destello(90, 120, 5) + destello(475, 64, 3);

    /* Montañas lejanas y colinas */
    s += '<path d="M0 232 L60 200 L120 222 L190 176 L260 214 L330 196 L400 222 L470 190 L540 214 L610 180 L690 210 L760 188 L800 204 V300 H0Z" fill="#1c205a" opacity=".85"/>' +
      '<path d="M0 258 Q190 222 400 244 T800 238 V300 H0Z" fill="#151948"/>';

    /* Pinos */
    s += pino(130, 262, 34, "#0f1340") + pino(152, 266, 26, "#0f1340") + pino(108, 268, 22, "#0f1340") +
      pino(640, 262, 36, "#0f1340") + pino(664, 268, 26, "#0f1340") + pino(618, 270, 22, "#0f1340") + pino(690, 270, 18, "#0f1340");

    /* Castillo */
    var c = '<g class="mg-castillo-g">';
    /* torrecilla exterior izquierda */
    c += '<rect x="196" y="214" width="24" height="52" fill="url(#mg-g-torre)"/>' +
      '<polygon points="191,216 208,176 225,216" fill="url(#mg-g-techo)" stroke="' + oro + '" stroke-opacity=".45" stroke-width="1"/>' +
      '<circle cx="208" cy="174" r="2.4" fill="' + oro + '"/>' + ventanita(204, 228, 8, 13);
    /* muralla */
    c += '<rect x="236" y="206" width="334" height="60" fill="url(#mg-g-muro)"/>' +
      almenas(236, 572, 198, 16, 9, 9, "#2b3076") +
      '<rect x="236" y="206" width="334" height="2" fill="' + oro + '" opacity=".35"/>';
    /* torre redonda izquierda */
    c += '<rect x="226" y="160" width="40" height="106" fill="url(#mg-g-torre)"/>' +
      '<rect x="221" y="153" width="50" height="9" rx="2" fill="#2f3580"/>' + almenas(221, 272, 147, 10, 6, 7, "#2f3580") +
      '<polygon points="219,150 246,92 273,150" fill="url(#mg-g-techo)" stroke="' + oro + '" stroke-opacity=".5" stroke-width="1"/>' +
      '<circle cx="246" cy="89" r="3" fill="' + oro + '"/>' +
      ventanita(240, 176, 12, 20) + ventanita(240, 222, 12, 18, true);
    /* torreón cuadrado */
    c += '<rect x="290" y="128" width="88" height="138" fill="url(#mg-g-torre)"/>' +
      '<polygon points="281,131 334,64 387,131" fill="url(#mg-g-techo)" stroke="' + oro + '" stroke-opacity=".5" stroke-width="1"/>' +
      '<path d="M334 64 V50" stroke="' + oro + '" stroke-width="2"/><path d="M334 50 L350 54 L334 59Z" fill="' + oro + '"/>' +
      '<rect x="326" y="96" width="16" height="20" rx="8" fill="#ffd27a" filter="url(#mg-f-brillo)"/>' +
      '<circle cx="334" cy="152" r="10" fill="#ffd27a" filter="url(#mg-f-brillo)"/>' +
      '<path d="M334 142 V162 M324 152 H344" stroke="#b9802f" stroke-width="1.6"/>' +
      ventanita(302, 176, 12, 22) + ventanita(328, 182, 12, 22, true) + ventanita(354, 176, 12, 22) +
      ventanita(310, 222, 10, 18, true) + ventanita(348, 222, 10, 18);
    /* torre mayor (la más alta) */
    c += '<rect x="398" y="86" width="52" height="180" fill="url(#mg-g-torre)"/>' +
      '<rect x="392" y="122" width="64" height="7" rx="2" fill="#2f3580"/><rect x="392" y="122" width="64" height="1.6" fill="' + oro + '" opacity=".7"/>' +
      '<rect x="392" y="190" width="64" height="6" rx="2" fill="#2f3580"/><rect x="392" y="190" width="64" height="1.4" fill="' + oro + '" opacity=".55"/>' +
      '<polygon points="389,89 424,20 459,89" fill="url(#mg-g-techo)" stroke="' + oro + '" stroke-opacity=".6" stroke-width="1.2"/>' +
      '<path d="M398 74 Q424 66 450 74" stroke="' + oro + '" stroke-opacity=".55" stroke-width="1.2" fill="none"/>' +
      '<path d="M424 20 V4" stroke="' + oro + '" stroke-width="2"/><path d="M424 4 Q438 6 448 3 Q440 10 448 15 Q436 13 424 14Z" fill="' + oro + '"/>' +
      '<circle cx="424" cy="20" r="3" fill="#fff0c2"/>' +
      ventanita(418, 96, 12, 20) + ventanita(406, 140, 10, 22) + ventanita(432, 140, 10, 22) + ventanita(418, 206, 12, 24);
    /* puerta principal */
    c += '<path d="M455 266 V246 A13 13 0 0 1 481 246 V266Z" fill="#ffcf7a" filter="url(#mg-f-brillo)"/>' +
      '<path d="M461 266 V242 M468 266 V236 M475 266 V242 M455 252 H481" stroke="#a8722a" stroke-width="1.4"/>' +
      '<path d="M455 266 L436 300 H500 L481 266Z" fill="#ffcf7a" opacity=".14"/>';
    /* torre derecha con torrecilla colgada */
    c += '<rect x="486" y="150" width="40" height="116" fill="url(#mg-g-torre)"/>' +
      '<polygon points="480,153 506,96 532,153" fill="url(#mg-g-techo)" stroke="' + oro + '" stroke-opacity=".5" stroke-width="1"/>' +
      '<circle cx="506" cy="93" r="2.6" fill="' + oro + '"/>' +
      ventanita(500, 166, 12, 20) + ventanita(500, 214, 12, 18) +
      '<rect x="528" y="182" width="20" height="32" fill="url(#mg-g-torre)"/>' +
      '<polygon points="528,214 538,232 548,214" fill="#1d2160"/>' +
      '<polygon points="524,184 538,150 552,184" fill="url(#mg-g-techo)" stroke="' + oro + '" stroke-opacity=".5" stroke-width="1"/>' +
      '<circle cx="538" cy="148" r="2.2" fill="' + oro + '"/>' + ventanita(534, 192, 8, 12);
    c += "</g>";
    s += c;

    /* Chispas doradas alrededor de las torres */
    s += destello(462, 40, 3.5, "mg-tw mg-tw-oro") + destello(372, 58, 3, "mg-tw mg-tw-oro") + destello(276, 112, 2.6, "mg-tw mg-tw-oro") + destello(552, 124, 2.8, "mg-tw mg-tw-oro");

    /* Suelo delantero */
    s += '<path d="M0 282 Q400 252 800 282 V300 H0Z" fill="#11153f"/>';
    s += "</svg>";
    return s;
  }

  function cieloHTML() {
    var r = azar(7), h = '<div class="mg-cielo" aria-hidden="true">';
    for (var i = 0; i < 22; i++) {
      h += '<span class="mg-estrella" style="left:' + (r() * 100).toFixed(1) + "%;top:" + (r() * 70).toFixed(1) + "%;--t:" + (6 + r() * 10).toFixed(1) +
        "px;--d:" + (r() * 5).toFixed(2) + "s;--v:" + (2.6 + r() * 3).toFixed(2) + 's"></span>';
    }
    h += '<span class="mg-fugaz"></span><span class="mg-fugaz mg-fugaz-2"></span></div>';
    return h;
  }

  /* ---------- Íconos que se asoman en las ventanas abiertas ---------- */
  var ICONOS = {
    mensaje: '<svg viewBox="0 0 24 24"><path d="M3 6.5h18v11H3z" fill="#fff8e6" stroke="#8a5a1c" stroke-width="1.4" stroke-linejoin="round"/><path d="M3.5 7l8.5 6.5L20.5 7" fill="none" stroke="#8a5a1c" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 15.8c-.9-.8-2-1.4-2-2.3a1 1 0 0 1 2-.3 1 1 0 0 1 2 .3c0 .9-1.1 1.5-2 2.3z" fill="#d9465f"/></svg>',
    foto: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="#fff8e6" stroke="#8a5a1c" stroke-width="1.4"/><path d="M5 17l4.5-5 3 3.2 2.2-2.2L19 17z" fill="#6f7fd6"/><circle cx="16" cy="9" r="1.7" fill="#f2b84b"/></svg>',
    vale: '<svg viewBox="0 0 24 24"><path d="M3 7h18v3.2a1.8 1.8 0 0 0 0 3.6V17H3v-3.2a1.8 1.8 0 0 0 0-3.6z" fill="#fff8e6" stroke="#8a5a1c" stroke-width="1.4" stroke-linejoin="round"/><path d="M15 7.5v9" stroke="#8a5a1c" stroke-width="1.2" stroke-dasharray="1.6 1.6"/><path d="M9 9.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#e0a530"/></svg>',
    cancion: '<svg viewBox="0 0 24 24"><path d="M9 17.5V6.2l10-2.2v11.3" fill="none" stroke="#8a5a1c" stroke-width="1.8" stroke-linejoin="round"/><ellipse cx="6.8" cy="17.6" rx="2.6" ry="2" fill="#8a5a1c"/><ellipse cx="16.8" cy="15.4" rx="2.6" ry="2" fill="#8a5a1c"/></svg>',
    regalo: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="1" fill="#d9465f" stroke="#8a2a3c" stroke-width="1.2"/><rect x="3" y="7.5" width="18" height="3.5" rx="1" fill="#e85d73" stroke="#8a2a3c" stroke-width="1.2"/><path d="M12 7.5V20" stroke="#ffd36e" stroke-width="2.2"/><path d="M12 7.5c-2-3.5-5.5-3-4.6-1 .6 1.2 2.8 1 4.6 1zm0 0c2-3.5 5.5-3 4.6-1-.6 1.2-2.8 1-4.6 1z" fill="#ffd36e" stroke="#a8722a" stroke-width=".8"/></svg>',
    final: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.6 6.2 6.7.5-5.1 4.3 1.6 6.5L12 16.5 6.2 20l1.6-6.5-5.1-4.3 6.7-.5z" fill="#fff3c4" stroke="#b57d22" stroke-width="1.2" stroke-linejoin="round"/></svg>'
  };
  function iconoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? ICONOS.final : (ICONOS[d.tipo] || ICONOS.final);
    } catch (e) { /* sin datos */ }
    return ICONOS.final;
  }
  var CANDADO = '<svg viewBox="0 0 16 16"><circle cx="8" cy="6.2" r="2.4" fill="currentColor"/><path d="M6.9 7.6h2.2l.7 4.6H6.2z" fill="currentColor"/></svg>';

  /* ---------- Estilos ---------- */
  var T = "body.tema-magico";
  var css = `
${T}{
  --mg-oro:#e9c46a; --mg-oro-claro:#fff0bf; --mg-oro-osc:#a8772c;
  --mg-noche:#0b0e35; --mg-tinta:#f4eedb; --mg-suave:#c9c3e6;
  background:#0b0e35; color:var(--mg-tinta);
  font-family:"Cormorant Garamond", Georgia, "Times New Roman", serif;
}
${T} #tv-escena{position:relative; z-index:1; overflow-x:hidden}
${T} .mg-escena{position:relative; min-height:100vh; min-height:100dvh; padding:0 0 104px}

/* Cielo */
${T} .mg-cielo{position:fixed; inset:0; z-index:-1; overflow:hidden; pointer-events:none;
  background:
    radial-gradient(1px 1px at 12% 18%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 27% 42%, #fff 50%, transparent 100%),
    radial-gradient(1.4px 1.4px at 38% 9%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 52% 28%, #dfe3ff 50%, transparent 100%),
    radial-gradient(1.2px 1.2px at 66% 14%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 79% 36%, #fff 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 88% 8%, #fff8d6 50%, transparent 100%),
    radial-gradient(1px 1px at 6% 55%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 94% 52%, #fff 50%, transparent 100%),
    radial-gradient(1.2px 1.2px at 45% 60%, #dfe3ff 50%, transparent 100%),
    radial-gradient(1px 1px at 70% 66%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 18% 76%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 58% 84%, #fff 50%, transparent 100%),
    radial-gradient(1.3px 1.3px at 84% 80%, #fff 50%, transparent 100%),
    radial-gradient(1px 1px at 33% 92%, #fff 50%, transparent 100%),
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,104,255,.28), transparent 70%),
    radial-gradient(ellipse 70% 40% at 80% 100%, rgba(233,196,106,.10), transparent 70%),
    linear-gradient(180deg, #060825 0%, #0d1145 34%, #1c1b5e 66%, #2c2468 100%);
}
${T} .mg-estrella{position:absolute; width:var(--t); height:var(--t); transform:translate(-50%,-50%);
  background:radial-gradient(circle, #fff 0 12%, rgba(255,244,204,.7) 22%, transparent 60%);
  clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);
  animation:magico-titila var(--v) ease-in-out var(--d) infinite; opacity:.85}
${T} .mg-fugaz{position:absolute; top:10%; left:72%; width:130px; height:2px; border-radius:2px; opacity:0;
  background:linear-gradient(90deg, #fff 0%, rgba(255,236,170,.8) 18%, rgba(255,236,170,0) 100%);
  box-shadow:0 0 6px rgba(255,240,200,.8);
  transform-origin:0 50%; animation:magico-fugaz 11s linear 2.5s infinite}
${T} .mg-fugaz-2{top:4%; left:40%; width:90px; animation-duration:17s; animation-delay:9s}
@keyframes magico-titila{0%,100%{opacity:.25; transform:translate(-50%,-50%) scale(.55)} 50%{opacity:1; transform:translate(-50%,-50%) scale(1)}}
@keyframes magico-fugaz{
  0%{opacity:0; transform:rotate(-24deg) translateX(0)}
  1.5%{opacity:1}
  7%{opacity:0; transform:rotate(-24deg) translateX(-340px)}
  100%{opacity:0; transform:rotate(-24deg) translateX(-340px)}
}

/* Cabecera */
${T} .mg-cabecera{text-align:center; padding:30px 16px 0; position:relative}
${T} .mg-pre{margin:0; font-family:"Cinzel", Georgia, serif; font-weight:500; font-size:.78rem; letter-spacing:.32em; text-transform:uppercase; color:var(--mg-oro)}
${T} .mg-pre span{display:inline-block; margin:0 .55em; font-size:.7em; vertical-align:middle; opacity:.8}
${T} .tv-para{margin:8px 0 0; font-family:"Cinzel Decorative", "Cinzel", Georgia, serif; font-weight:700;
  font-size:clamp(2.05rem, 9.4vw, 3.6rem); line-height:1.08; letter-spacing:.01em;
  background:linear-gradient(180deg, #fff6d6 0%, #f3d27e 45%, #c99238 78%, #f6dc8e 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 2px 10px rgba(233,196,106,.35))}
${T} .mg-sub{margin:6px auto 0; max-width:30ch; font-style:italic; font-size:1.12rem; color:var(--mg-suave)}
${T} .tv-cuenta{display:inline-block; margin:14px auto 0; padding:6px 18px; border-radius:999px; max-width:100%;
  border:1px solid rgba(233,196,106,.55); background:rgba(14,17,60,.6); color:var(--mg-oro-claro);
  font-family:"Cormorant Garamond", Georgia, serif; font-weight:600; font-size:1.06rem; box-shadow:0 0 18px rgba(233,196,106,.15)}

/* Castillo */
${T} .mg-castillo{-webkit-mask-image:linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%); mask-image:linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%); position:relative; max-width:920px; margin:4px auto 0; height:clamp(206px, calc(min(100vw, 920px) * .375), 345px); pointer-events:none}
${T} .mg-castillo-svg{display:block; width:100%; height:100%}
${T} .mg-tw{transform-box:fill-box; transform-origin:center; animation:magico-titila-svg 3.4s ease-in-out var(--d) infinite}
${T} .mg-tw-oro{fill:#ffe39a}
@keyframes magico-titila-svg{0%,100%{opacity:.3; transform:scale(.6)} 50%{opacity:1; transform:scale(1.1)}}

/* Muralla de las puertas */
${T} .mg-muro{position:relative; max-width:920px; margin:-2px 16px 0; padding:26px 12px 26px;
  border-radius:0 0 22px 22px;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 30px),
    radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,207,122,.12), transparent 70%),
    linear-gradient(180deg, #1f2460 0%, #171a4d 60%, #121540 100%);
  box-shadow:inset 0 0 0 1px rgba(233,196,106,.22), inset 0 -30px 60px rgba(4,5,25,.45), 0 24px 50px rgba(2,3,20,.5)}
${T} .mg-muro::before{content:""; position:absolute; left:0; right:0; top:-12px; height:12px;
  background:repeating-linear-gradient(90deg, #1f2460 0 22px, transparent 22px 36px)}
${T} .mg-muro::after{content:""; position:absolute; left:14px; right:14px; top:10px; height:1px;
  background:linear-gradient(90deg, transparent, rgba(233,196,106,.6), transparent)}
${T} .tv-puertas{display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:18px 10px; padding:0}

/* Puerta = ventana en arco */
${T} .tv-puerta{position:relative; display:block; width:100%; aspect-ratio:10/13; min-height:44px; padding:3px; border:0;
  border-radius:50% 50% 7px 7px / 36% 36% 7px 7px;
  background:linear-gradient(160deg, #fbe7a6 0%, #c8963e 40%, #f2d27c 66%, #a8772c 100%);
  box-shadow:0 6px 14px rgba(3,4,24,.55), 0 0 0 1px rgba(0,0,0,.25);
  color:var(--mg-tinta); transition:transform .25s ease, box-shadow .25s ease, filter .25s ease;
  animation:magico-entra .6s cubic-bezier(.2,.8,.3,1) backwards; animation-delay:calc(var(--tv-i) * 28ms)}
${T} .tv-puerta::after{content:""; position:absolute; left:-5px; right:-5px; bottom:-7px; height:8px; border-radius:3px;
  background:linear-gradient(180deg, #f6dc8e, #a8772c); box-shadow:0 3px 6px rgba(0,0,0,.45)}
${T} .tv-puerta:focus-visible{outline:3px solid #fff0bf; outline-offset:4px}
${T} .tv-puerta:not([data-estado="bloqueada"]):hover{transform:translateY(-3px); box-shadow:0 10px 22px rgba(3,4,24,.6), 0 0 22px rgba(255,207,122,.45)}
${T} .tv-puerta:active{transform:translateY(0) scale(.98)}
@keyframes magico-entra{from{opacity:0; transform:translateY(10px) scale(.96)} to{opacity:1; transform:none}}

${T} .mg-ventana{position:relative; display:block; width:100%; height:100%; overflow:hidden;
  border-radius:50% 50% 5px 5px / 35% 35% 5px 5px;
  background:radial-gradient(ellipse 70% 60% at 50% 55%, #fff4c9 0%, #ffd27a 38%, #e59a45 75%, #a8582a 100%)}
${T} .mg-luz{position:absolute; inset:0; display:flex; align-items:center; justify-content:center; padding-bottom:22%}
${T} .mg-luz svg{width:46%; height:auto; filter:drop-shadow(0 2px 3px rgba(120,60,10,.35)); animation:magico-asoma .5s ease-out both}
@keyframes magico-asoma{from{opacity:0; transform:scale(.6)} to{opacity:1; transform:none}}
${T} .mg-hoja{position:absolute; top:0; bottom:0; width:calc(50% - 1px);
  background:
    linear-gradient(90deg, rgba(255,255,255,.07), transparent 30%, transparent 70%, rgba(0,0,0,.18)),
    repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 1px, transparent 1px 25%),
    linear-gradient(180deg, #3b3f9c 0%, #282d78 55%, #1d2160 100%);
  box-shadow:inset 0 0 0 1.5px rgba(233,196,106,.55), inset 0 0 0 4px rgba(13,15,50,.35);
  transition:transform .45s cubic-bezier(.3,.7,.2,1), filter .45s}
${T} .mg-hoja-i{left:0; transform-origin:0 50%}
${T} .mg-hoja-d{right:0; transform-origin:100% 50%}
${T} .mg-num{position:absolute; left:0; right:0; top:36%; text-align:center; pointer-events:none;
  font-family:"Cinzel", Georgia, serif; font-weight:700; font-size:clamp(1.3rem, 6vw, 1.85rem); line-height:1;
  color:#fbe3a0; text-shadow:0 1px 0 #6b4a14, 0 0 10px rgba(255,214,120,.55), 0 2px 6px rgba(0,0,0,.6); z-index:1; isolation:isolate}
${T} .mg-num{display:flex; justify-content:center}
${T} .tv-puerta:not([data-estado="abierta"]) .mg-num::before{content:""; position:absolute; left:50%; top:50%; width:2.05em; height:2.05em; margin:-1.08em 0 0 -1.025em; z-index:-1; border-radius:50%;
  background:radial-gradient(circle at 40% 35%, #2f3488, #161a4f 70%); box-shadow:0 0 0 1.5px rgba(233,196,106,.85), 0 0 0 3.5px rgba(16,19,64,.8), 0 0 0 4.5px rgba(233,196,106,.35), 0 3px 8px rgba(0,0,0,.5)}
${T} .mg-hoy{position:absolute; z-index:2; left:50%; top:13%; transform:translateX(-50%); padding:2px 8px; border-radius:999px;
  font-family:"Cinzel", Georgia, serif; font-weight:700; font-size:.6rem; letter-spacing:.14em; text-transform:uppercase;
  color:#2a1c04; background:linear-gradient(180deg, #fff3c4, #e9c46a); box-shadow:0 0 10px rgba(255,214,120,.8); white-space:nowrap}
${T} .tv-cuenta[hidden]{display:none}
${T} .mg-cerrojo{position:absolute; left:50%; top:auto; bottom:9%; width:15px; height:15px; margin-left:-7.5px; color:rgba(233,196,106,.6)}
${T} .mg-cerrojo svg{display:block; width:100%; height:100%}

/* Bloqueada: cerrada, sobria pero bonita */
${T} .tv-puerta[data-estado="bloqueada"]{background:linear-gradient(160deg, #b8a46c 0%, #7c6634 45%, #b09a62 70%, #5e4a22 100%); cursor:not-allowed}
${T} .tv-puerta[data-estado="bloqueada"] .mg-ventana{background:#0d1036}
${T} .tv-puerta[data-estado="bloqueada"] .mg-hoja{width:50%; filter:saturate(.65) brightness(.78)}
${T} .tv-puerta[data-estado="bloqueada"] .mg-num{color:#d8c690; text-shadow:0 1px 0 #2a2410, 0 2px 6px rgba(0,0,0,.7); opacity:.9}

/* Disponible: luz que se escapa por la rendija */
${T} .tv-puerta[data-estado="disponible"]{box-shadow:0 6px 14px rgba(3,4,24,.55), 0 0 16px rgba(255,207,122,.28)}
${T} .tv-puerta[data-estado="disponible"] .mg-ventana::after,
${T} .tv-puerta[data-estado="hoy"] .mg-ventana::after{content:""; position:absolute; left:50%; top:0; bottom:0; width:6px; margin-left:-3px;
  background:linear-gradient(180deg, rgba(255,240,190,.2), rgba(255,226,150,.95) 50%, rgba(255,240,190,.2)); filter:blur(2px); pointer-events:none}

/* Hoy: brillo que late y estrella encima */
${T} .tv-puerta[data-estado="hoy"]{background:linear-gradient(160deg, #fff4c9 0%, #e9b84f 40%, #fff0bf 66%, #c8963e 100%);
  animation:magico-entra .6s cubic-bezier(.2,.8,.3,1) backwards, magico-latido 2.4s ease-in-out .6s infinite; z-index:1}
${T} .tv-puerta[data-estado="hoy"] .mg-hoja{filter:brightness(1.15)}
${T} .tv-puerta[data-estado="hoy"] .mg-num{top:44%}
${T} .tv-puerta[data-estado="hoy"]::before,
${T} .tv-puerta[data-n="24"]::before{content:""; position:absolute; left:50%; top:-15px; width:22px; height:22px; margin-left:-11px; z-index:2;
  background:radial-gradient(circle, #fff 0 15%, #ffe39a 40%, #e9b84f 70%);
  clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%);
  filter:drop-shadow(0 0 6px rgba(255,220,140,.9))}
${T} .tv-puerta[data-estado="hoy"]::before{animation:magico-gira 6s linear infinite}
${T} .tv-puerta[data-n="24"]::before{width:18px; height:18px; margin-left:-9px; top:-12px}
${T} .tv-puerta[data-n="24"][data-estado="hoy"]::before{width:24px; height:24px; margin-left:-12px; top:-16px}
@keyframes magico-latido{0%,100%{box-shadow:0 6px 14px rgba(3,4,24,.55), 0 0 12px 2px rgba(255,214,120,.45)} 50%{box-shadow:0 6px 14px rgba(3,4,24,.55), 0 0 28px 9px rgba(255,214,120,.75)}}
@keyframes magico-gira{0%{transform:rotate(0) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(1)}}

/* Abierta: postigos abiertos y algo que se asoma */
${T} .tv-puerta[data-estado="abierta"] .mg-hoja-i,
${T} .tv-puerta.mg-abriendo .mg-hoja-i{transform:perspective(220px) rotateY(-74deg); filter:brightness(.8)}
${T} .tv-puerta[data-estado="abierta"] .mg-hoja-d,
${T} .tv-puerta.mg-abriendo .mg-hoja-d{transform:perspective(220px) rotateY(74deg); filter:brightness(.8)}
${T} .tv-puerta.mg-abriendo .mg-num{opacity:0; transition:opacity .2s}
${T} .tv-puerta[data-estado="abierta"] .mg-num{top:auto; bottom:6%; left:22%; right:22%; padding:2px 0 3px; border-radius:6px;
  font-size:clamp(.82rem, 3.6vw, 1.05rem); color:#fff3c4; background:linear-gradient(180deg, #2c3180, #1a1e57);
  box-shadow:0 0 0 1px rgba(233,196,106,.7), 0 2px 5px rgba(80,40,0,.4); text-shadow:none}

/* Pie */
${T} .mg-pie{margin:26px 16px 0; text-align:center; font-style:italic; font-size:1.05rem; color:var(--mg-suave)}
${T} .mg-pie b{font-style:normal; color:var(--mg-oro); font-weight:600}

/* Partículas del efecto de apertura (viven en .tv-capa) */
${T} .mg-cometa{position:absolute; left:0; top:0; width:10px; height:10px; margin:-5px 0 0 -5px; border-radius:50%;
  background:#fff; box-shadow:0 0 8px 3px #fff3c4, 0 0 22px 9px rgba(255,205,110,.65), 0 0 46px 16px rgba(255,190,90,.25)}
${T} .mg-polvo{position:absolute; border-radius:50%;
  background:radial-gradient(circle, #fff 0 22%, #ffe39a 45%, rgba(255,200,90,0) 72%)}
${T} .mg-chispa{position:absolute; background:linear-gradient(135deg, #fff8dc, #ffd36e 55%, #e9a93b);
  clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)}
${T} .mg-aro{position:absolute; width:60px; height:60px; margin:-30px 0 0 -30px; border-radius:50%;
  border:2px solid rgba(255,230,160,.9); box-shadow:0 0 18px rgba(255,214,120,.8), inset 0 0 18px rgba(255,214,120,.6)}

/* Ventana de la sorpresa */
${T} .tv-modal{background:radial-gradient(ellipse at 50% 35%, rgba(46,40,130,.55), rgba(3,4,22,.86) 70%);
  -webkit-backdrop-filter:blur(5px); backdrop-filter:blur(5px)}
${T} .tv-tarjeta{max-width:440px; padding:40px 24px 24px; border-radius:24px; color:var(--mg-tinta);
  font-family:"Cormorant Garamond", Georgia, serif;
  background:
    radial-gradient(1px 1px at 14% 20%, rgba(255,255,255,.7) 50%, transparent 100%),
    radial-gradient(1px 1px at 86% 14%, rgba(255,255,255,.6) 50%, transparent 100%),
    radial-gradient(1.2px 1.2px at 78% 70%, rgba(255,244,204,.6) 50%, transparent 100%),
    radial-gradient(1px 1px at 22% 82%, rgba(255,255,255,.5) 50%, transparent 100%),
    radial-gradient(ellipse 90% 50% at 50% 0%, rgba(124,104,255,.28), transparent 70%),
    linear-gradient(180deg, #20256c 0%, #141749 65%, #0e1037 100%);
  border:1px solid rgba(233,196,106,.75);
  box-shadow:0 0 0 5px #0f1240, 0 0 0 6px rgba(233,196,106,.35), 0 24px 70px rgba(0,0,0,.6), 0 0 90px rgba(124,104,255,.3);
  animation:magico-aparece .5s cubic-bezier(.2,.9,.3,1.15) both}
${T} .tv-tarjeta::before{content:"✦"; position:absolute; left:0; right:0; top:12px; text-align:center;
  font-size:1rem; letter-spacing:.6em; color:var(--mg-oro); text-shadow:0 0 10px rgba(255,214,120,.8)}
${T} .tv-tarjeta::after{content:""; position:absolute; inset:9px; border:1px solid rgba(233,196,106,.22); border-radius:17px; pointer-events:none}
@keyframes magico-aparece{from{opacity:0; transform:translateY(16px) scale(.94)} to{opacity:1; transform:none}}
${T} .tv-dia{display:flex; align-items:center; justify-content:center; gap:12px; margin:0 0 18px;
  font-family:"Cinzel Decorative", "Cinzel", Georgia, serif; font-weight:700; font-size:1.75rem; line-height:1.1; color:#f6d98a}
${T} .tv-dia::before, ${T} .tv-dia::after{content:""; flex:0 1 48px; height:1px; background:linear-gradient(90deg, transparent, var(--mg-oro))}
${T} .tv-dia::after{background:linear-gradient(90deg, var(--mg-oro), transparent)}
${T} .tv-contenido{margin:0 0 18px; position:relative; z-index:1}
${T} .tv-msg{margin:0; padding:4px 6px; font-style:italic; font-weight:500; font-size:1.38rem; line-height:1.42; color:#f8f2df}
${T} .tv-msg::before{content:"\\201C"; display:block; height:.55em; margin-bottom:6px; font-family:"Cinzel Decorative", Georgia, serif; font-size:3rem; line-height:1; color:var(--mg-oro); opacity:.85}
${T} .tv-firma{margin:0 0 18px; font-style:italic; font-size:1.1rem; color:var(--mg-oro); opacity:1; position:relative; z-index:1}
${T} .tv-cerrar{position:relative; z-index:1; min-width:150px; font-family:"Cinzel", Georgia, serif; font-weight:700; letter-spacing:.08em;
  background:transparent; color:var(--mg-oro-claro); border:1px solid rgba(233,196,106,.8); transition:background .2s, color .2s}
${T} .tv-cerrar:hover{background:rgba(233,196,106,.15)}
${T} .tv-cerrar:focus-visible, ${T} .tv-boton:focus-visible{outline:3px solid #fff0bf; outline-offset:3px}

${T} .tv-foto{margin:0}
${T} .tv-foto img{border-radius:50% 50% 8px 8px / 26% 26% 8px 8px; padding:5px;
  background:linear-gradient(160deg, #fbe7a6, #c8963e 40%, #f2d27c 66%, #a8772c); box-shadow:0 10px 26px rgba(0,0,0,.45)}
${T} .tv-foto figcaption{margin-top:12px; font-style:italic; font-size:1.2rem; color:#f6d98a}

${T} .tv-vale{position:relative; padding:22px 18px 20px; border:0; border-radius:14px; color:#3a2a0c;
  background:radial-gradient(ellipse at 30% 0%, rgba(255,255,255,.55), transparent 60%), linear-gradient(135deg, #fdf0c4 0%, #f2cf77 52%, #e2ad4c 100%);
  -webkit-mask:radial-gradient(circle 11px at 0 50%, transparent 98%, #000 100%) left / 51% 100% no-repeat, radial-gradient(circle 11px at 100% 50%, transparent 98%, #000 100%) right / 51% 100% no-repeat;
  mask:radial-gradient(circle 11px at 0 50%, transparent 98%, #000 100%) left / 51% 100% no-repeat, radial-gradient(circle 11px at 100% 50%, transparent 98%, #000 100%) right / 51% 100% no-repeat;
  outline:1.5px dashed rgba(90,60,14,.45); outline-offset:-9px}
${T} .tv-vale-por{font-family:"Cinzel", Georgia, serif; font-weight:700; font-size:.78rem; letter-spacing:.3em; color:#7a5414}
${T} .tv-vale-que{margin:6px 0 4px; font-family:"Cinzel Decorative", "Cinzel", Georgia, serif; font-weight:700; font-size:1.6rem; line-height:1.15; color:#3a2306}
${T} .tv-vale-nota{margin:8px 0 0; font-size:1.08rem; font-style:italic; opacity:1; color:#4d3812}

${T} .tv-cancion::before{content:""; display:block; width:86px; height:86px; margin:0 auto 14px; border-radius:50%;
  background:url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(ICONOS.cancion.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ').replace(/#8a5a1c/g, "#f6d98a"))}") center / 44% no-repeat,
    radial-gradient(circle, #1a1d4f 0 20%, #2b2f73 21% 28%, #1a1d4f 29% 38%, #2b2f73 39% 46%, #1a1d4f 47% 100%);
  box-shadow:0 0 0 2px rgba(233,196,106,.7), 0 0 26px rgba(255,214,120,.35); animation:magico-gira-disco 8s linear infinite}
@keyframes magico-gira-disco{to{transform:rotate(360deg)}}
${T} .tv-cancion-titulo{font-family:"Cinzel", Georgia, serif; font-size:1.3rem; color:#f6d98a; margin:0 0 6px}
${T} .tv-cancion-nota{font-style:italic; font-size:1.18rem; color:#efe8d4; margin:0 0 16px}
${T} .tv-boton{font-family:"Cinzel", Georgia, serif; font-weight:700; letter-spacing:.06em; color:#2a1c04; border:0;
  background:linear-gradient(180deg, #fff0bf, #e9c46a 55%, #c8963e); box-shadow:0 6px 18px rgba(233,196,106,.35)}
${T} .tv-boton:hover{filter:brightness(1.06)}

${T} .tv-regalo{padding:22px 16px 18px; border-radius:16px; border:1px solid rgba(233,196,106,.6);
  background:radial-gradient(ellipse at 50% 0%, rgba(255,207,122,.25), transparent 70%), rgba(10,12,45,.45);
  box-shadow:inset 0 0 30px rgba(255,207,122,.12)}
${T} .tv-regalo::before{content:""; display:block; width:58px; height:58px; margin:0 auto 12px;
  background:url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(ICONOS.regalo.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '))}") center / contain no-repeat;
  filter:drop-shadow(0 0 12px rgba(255,214,120,.55)); animation:magico-flota 3s ease-in-out infinite}
@keyframes magico-flota{0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)}}
${T} .tv-regalo-texto{font-size:1.45rem; font-weight:600; line-height:1.25; color:#f8eccb}
${T} .tv-regalo-nota{margin-top:10px; font-size:1.1rem; font-style:italic; opacity:1; color:#d6cff0}

/* Día 24 */
${T} .tv-modal.tv-final .tv-tarjeta{border-color:#f6d98a;
  box-shadow:0 0 0 5px #0f1240, 0 0 0 6px rgba(246,217,138,.6), 0 24px 70px rgba(0,0,0,.6), 0 0 120px rgba(255,207,122,.35)}
${T} .tv-modal.tv-final .tv-tarjeta::before{content:"✦ Nochebuena ✦"; font-family:"Cinzel", Georgia, serif; font-size:.74rem; letter-spacing:.3em; top:14px}
${T} .tv-modal.tv-final .tv-dia{font-size:2.05rem; margin-top:4px}
${T} .tv-modal.tv-final .tv-msg{font-size:1.45rem}

/* Aviso */
${T} .tv-toast{background:rgba(16,19,64,.96); color:var(--mg-oro-claro); border:1px solid rgba(233,196,106,.6);
  font-family:"Cormorant Garamond", Georgia, serif; font-size:1.08rem; font-weight:600; border-radius:999px; padding:10px 20px;
  box-shadow:0 8px 26px rgba(0,0,0,.45), 0 0 20px rgba(233,196,106,.2)}

/* Pantallas más grandes */
@media (min-width:600px){
  ${T} .mg-cabecera{padding-top:40px}
  ${T} .tv-puertas{grid-template-columns:repeat(6, minmax(0, 1fr)); gap:22px 14px}
  ${T} .mg-muro{padding:30px 22px 30px}
}
@media (min-width:952px){
  ${T} .mg-muro{margin-left:auto; margin-right:auto}
  ${T} .tv-puertas{grid-template-columns:repeat(8, minmax(0, 1fr)); gap:24px 16px}
  ${T} .mg-num{font-size:1.8rem}
}

/* Movimiento reducido */
@media (prefers-reduced-motion: reduce){
  ${T} .mg-estrella, ${T} .mg-fugaz, ${T} .mg-tw, ${T} .tv-puerta, ${T} .tv-puerta::before, ${T} .mg-luz svg,
  ${T} .tv-tarjeta, ${T} .tv-regalo::before, ${T} .tv-cancion::before{animation:none !important}
  ${T} .mg-fugaz{display:none}
  ${T} .mg-hoja, ${T} .tv-puerta{transition:none}
}
`;

  /* ---------- Efecto al abrir: estrella fugaz y polvo de oro ---------- */
  function alAbrir(boton, n, capa) {
    return new Promise(function (listo) {
      var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducido || !capa || !boton || !boton.getBoundingClientRect) { listo(); return; }
      var hechos = [];
      function quitarTodo() {
        hechos.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
        hechos = [];
        boton.classList.remove("mg-abriendo");
      }
      if (typeof document.body.animate !== "function") {
        boton.classList.add("mg-abriendo");
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
      var W = window.innerWidth || 390, H = window.innerHeight || 700;
      var cx = r.left + r.width / 2, cy = r.top + r.height * 0.45;
      var izq = cx < W / 2;
      var sx = izq ? Math.min(W - 12, cx + Math.max(140, W * 0.55)) : Math.max(12, cx - Math.max(140, W * 0.55));
      var sy = Math.max(12, cy - Math.min(H * 0.5, 360));
      var qx = sx * 0.35 + cx * 0.65, qy = sy - 10;
      function punto(t) { var u = 1 - t; return [u * u * sx + 2 * u * t * qx + t * t * cx, u * u * sy + 2 * u * t * qy + t * t * cy]; }
      var vuelo = 460;

      /* estrella fugaz */
      var cometa = nuevo("mg-cometa", 0, 0);
      var marcos = [];
      for (var k = 0; k <= 12; k++) {
        var p = punto(k / 12);
        marcos.push({ transform: "translate(" + p[0].toFixed(1) + "px," + p[1].toFixed(1) + "px) scale(" + (k === 12 ? 1.8 : 1) + ")", opacity: k === 12 ? 0 : 1 });
      }
      cometa.animate(marcos, { duration: vuelo + 60, easing: "cubic-bezier(.45,.05,.8,.6)", fill: "forwards" });

      /* estela de polvo */
      for (var i = 1; i <= 18; i++) {
        var t = i / 19, q = punto(t), tam = 4 + Math.random() * 7;
        var el = nuevo(i % 3 === 0 ? "mg-chispa" : "mg-polvo", q[0] + (Math.random() - 0.5) * 8, q[1] + (Math.random() - 0.5) * 8, i % 3 === 0 ? tam + 7 : tam);
        el.style.opacity = "0";
        el.animate([
          { opacity: 0, transform: "scale(.3)" },
          { opacity: 1, transform: "scale(1)", offset: 0.15 },
          { opacity: 0, transform: "translate(" + ((Math.random() - 0.5) * 16).toFixed(1) + "px," + (14 + Math.random() * 18).toFixed(1) + "px) scale(.2) rotate(90deg)" }
        ], { duration: 620 + Math.random() * 200, delay: t * vuelo, easing: "ease-out", fill: "forwards" });
      }

      /* al llegar: se abren los postigos, destello y explosión de polvo */
      setTimeout(function () {
        boton.classList.add("mg-abriendo");
        var aro = nuevo("mg-aro", cx, cy);
        aro.animate([{ opacity: 1, transform: "scale(.2)" }, { opacity: 0, transform: "scale(2.6)" }], { duration: 520, easing: "ease-out", fill: "forwards" });
        for (var j = 0; j < 36; j++) {
          var ang = (j / 36) * Math.PI * 2 + Math.random() * 0.3, dist = 40 + Math.random() * 80;
          var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
          var estrella = j % 2 === 0;
          var s = nuevo(estrella ? "mg-chispa" : "mg-polvo", cx, cy, estrella ? 10 + Math.random() * 11 : 5 + Math.random() * 6);
          s.animate([
            { opacity: 1, transform: "translate(0,0) scale(.2)" },
            { opacity: 1, transform: "translate(" + (dx * 0.8).toFixed(1) + "px," + (dy * 0.8).toFixed(1) + "px) scale(1) rotate(45deg)", offset: 0.45 },
            { opacity: 0, transform: "translate(" + dx.toFixed(1) + "px," + (dy + 26).toFixed(1) + "px) scale(.3) rotate(120deg)" }
          ], { duration: 650 + Math.random() * 300, easing: "cubic-bezier(.2,.7,.4,1)", fill: "forwards" });
        }
      }, vuelo);

      setTimeout(listo, 870);
      setTimeout(quitarTodo, 1900);
    });
  }

  /* ---------- Registro del estilo ---------- */
  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "magico",
    nombre: "Mágico",
    emoji: "✨",
    descripcion: "Noche de cuento: castillo, estrellas y ventanas que brillan",
    fuentes: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&display=swap",
    color: "#1c1b5e",
    css: css,
    orden: [13, 4, 22, 9, 17, 1, 11, 20, 6, 24, 15, 3, 19, 8, 12, 2, 23, 10, 5, 16, 21, 7, 18, 14],
    escena: function () {
      return '<div class="mg-escena">' + cieloHTML() +
        '<header class="mg-cabecera">' +
        '<p class="mg-pre"><span aria-hidden="true">✦</span>Calendario de adviento<span aria-hidden="true">✦</span></p>' +
        '<h1 class="tv-para"></h1>' +
        '<p class="mg-sub">Cada noche de diciembre se enciende una ventana del castillo.</p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<div class="mg-castillo">' + castilloSVG() + "</div>" +
        '<section class="mg-muro" aria-label="Ventanas del castillo"><div class="tv-puertas"></div></section>' +
        '<p class="mg-pie">Abre una ventana cada noche, hasta <b>Nochebuena</b> ✦</p>' +
        "</div>";
    },
    puerta: function (n, estado) {
      var h = '<span class="mg-ventana" aria-hidden="true">';
      if (estado === "abierta") h += '<span class="mg-luz">' + iconoDe(n) + "</span>";
      h += '<span class="mg-hoja mg-hoja-i"></span><span class="mg-hoja mg-hoja-d"></span></span>';
      if (estado === "hoy") h += '<span class="mg-hoy" aria-hidden="true">Hoy</span>';
      h += '<span class="mg-num" aria-hidden="true">' + n + "</span>";
      if (estado === "bloqueada") h += '<span class="mg-cerrojo" aria-hidden="true">' + CANDADO + "</span>";
      return h;
    },
    alAbrir: alAbrir
  });
})();
