/* Estilo «Para él»: taller y barra de café — pared azul marino, madera cálida, cuero, latón y papel kraft.
   Las puertas son cajones de madera con número de plantilla y tirador de cuero. Arte original. */
(function () {
  "use strict";

  /* ---------- Paleta ---------- */
  var C = {
    marino: "#1c2a42", marinoOsc: "#121c2e", marinoClaro: "#2b3d5c",
    madera: "#a8703e", maderaClara: "#c98d55", maderaOsc: "#6e4526", nogal: "#4a2f1c",
    cuero: "#a86a3a", cueroOsc: "#6f4220",
    laton: "#c9a24a", latonClaro: "#f1d88e", latonOsc: "#86662a",
    kraft: "#cfa86f", kraftClaro: "#e2c594", crema: "#f3e8d2"
  };

  /* ---------- Escena: tablero perforado, repisa, lámpara, taza y planta ---------- */
  function herramientasSVG() {
    var s = "";
    /* llave inglesa (genérica) */
    s += '<g transform="translate(150 70) rotate(18)">' +
      '<rect x="-4" y="0" width="8" height="70" rx="4" fill="#8e98a8"/>' +
      '<path d="M-11 -2 a12 12 0 1 1 22 0 l-5 -1 v-9 h-12 v9z" fill="#a9b3c2"/>' +
      '<path d="M-9 70 a10 10 0 1 0 18 0 l-4 1 v7 h-10 v-7z" fill="#a9b3c2"/>' +
      '<rect x="-1.5" y="10" width="3" height="50" rx="1.5" fill="#6f7888" opacity=".6"/></g>';
    /* martillo con mango de madera */
    s += '<g transform="translate(205 66) rotate(-8)">' +
      '<rect x="-4.5" y="10" width="9" height="74" rx="4" fill="' + C.maderaClara + '"/>' +
      '<rect x="-4.5" y="62" width="9" height="22" rx="4" fill="' + C.cueroOsc + '"/>' +
      '<path d="M-22 0 h30 l8 4 v10 l-8 2 h-30 a5 5 0 0 1 -5 -5 v-6 a5 5 0 0 1 5 -5z" fill="#7d8797"/>' +
      '<path d="M16 4 q12 1 14 -9 q-2 12 -14 12z" fill="#7d8797"/></g>';
    /* rollo de pabilo */
    s += '<g transform="translate(600 92)"><circle r="20" fill="#d9c08f"/><circle r="20" fill="none" stroke="#b89a64" stroke-width="1" stroke-dasharray="2 3"/>' +
      '<circle r="13" fill="none" stroke="#b89a64" stroke-width="1"/><circle r="6" fill="#7a5a32"/>' +
      '<path d="M14 14 q16 18 4 40 q-6 10 4 18" fill="none" stroke="#d9c08f" stroke-width="2"/></g>';
    /* etiqueta kraft colgada */
    s += '<g transform="translate(652 74) rotate(8)"><path d="M0 0 v14" stroke="#d9c08f" stroke-width="1.6"/>' +
      '<path d="M-14 14 h28 v40 h-28z M-6 14 l6 -6 l6 6" fill="' + C.kraft + '"/>' +
      '<path d="M-14 14 l8 -8 h12 l8 8" fill="' + C.kraft + '"/>' +
      '<circle cx="0" cy="12" r="2.6" fill="#7a5a32"/>' +
      '<path d="M-8 30 h16 M-8 37 h11" stroke="#7a5a32" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g>';
    /* escuadra */
    s += '<path d="M690 70 v66 h44 z" fill="none" stroke="#b9c1cc" stroke-width="6" stroke-linejoin="round" opacity=".85"/>';
    return s;
  }

  function escenaSVG() {
    var s = '<svg class="pe-escena-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      "<defs>" +
      '<pattern id="pe-p-hoyos" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="2.1" fill="#5c4127" opacity=".55"/></pattern>' +
      '<linearGradient id="pe-g-tablero" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9a674"/><stop offset="1" stop-color="#b58f5d"/></linearGradient>' +
      '<linearGradient id="pe-g-repisa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d39a60"/><stop offset=".35" stop-color="#b07440"/><stop offset="1" stop-color="#7c4d28"/></linearGradient>' +
      '<linearGradient id="pe-g-laton" x1="0" x2="1"><stop offset="0" stop-color="#86662a"/><stop offset=".35" stop-color="#f1d88e"/><stop offset=".6" stop-color="#c9a24a"/><stop offset="1" stop-color="#7a5a22"/></linearGradient>' +
      '<radialGradient id="pe-g-luz" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset=".55" stop-color="#ffc56a" stop-opacity=".12"/><stop offset="1" stop-color="#ffc56a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="pe-g-taza" x1="0" x2="1"><stop offset="0" stop-color="#e9e2d2"/><stop offset=".45" stop-color="#fbf7ee"/><stop offset="1" stop-color="#cfc6b2"/></linearGradient>' +
      '<linearGradient id="pe-g-maceta" x1="0" x2="1"><stop offset="0" stop-color="#a0532f"/><stop offset=".45" stop-color="#c96f43"/><stop offset="1" stop-color="#8a4426"/></linearGradient>' +
      '<filter id="pe-f-brillo" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      "</defs>";

    /* Tablero perforado con marco */
    s += '<rect x="96" y="40" width="608" height="170" rx="6" fill="#5a3b22"/>' +
      '<rect x="104" y="48" width="592" height="154" rx="3" fill="url(#pe-g-tablero)"/>' +
      '<rect x="104" y="48" width="592" height="154" rx="3" fill="url(#pe-p-hoyos)"/>';
    s += herramientasSVG();

    /* Cono de luz de la lámpara */
    s += '<path class="pe-cono" d="M378 58 L250 250 H550 L422 58Z" fill="url(#pe-g-luz)"/>';
    /* Lámpara colgante de latón */
    s += '<path d="M400 0 V34" stroke="#2a2a2a" stroke-width="2"/>' +
      '<rect x="394" y="30" width="12" height="10" rx="2" fill="url(#pe-g-laton)"/>' +
      '<path d="M366 62 Q368 40 400 38 Q432 40 434 62Z" fill="url(#pe-g-laton)"/>' +
      '<rect x="362" y="60" width="76" height="5" rx="2.5" fill="#86662a"/>' +
      '<ellipse cx="400" cy="66" rx="14" ry="6" fill="#fff3c9" filter="url(#pe-f-brillo)"/>' +
      '<path d="M376 46 Q384 42 392 41" stroke="#fff6d6" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>';

    /* Repisa con escuadras de latón */
    s += '<path d="M150 252 v22 l18 -22z M632 252 v22 l18 -22z" fill="#86662a"/>' +
      '<path d="M150 252 v22 l4 0 v-18 l14 -4z" fill="#f1d88e" opacity=".6"/>' +
      '<rect x="70" y="238" width="660" height="16" rx="3" fill="url(#pe-g-repisa)"/>' +
      '<path d="M78 243 q120 3 240 0 t240 1 t160 -1" stroke="#7c4d28" stroke-width="1" fill="none" opacity=".45"/>' +
      '<rect x="70" y="252" width="660" height="4" rx="2" fill="#4a2f1c" opacity=".55"/>';

    /* Planta en maceta */
    s += '<g class="pe-planta">' +
      '<path d="M196 238 V196" stroke="#3f6a3a" stroke-width="2.4"/>' +
      '<path d="M196 214 q-26 -6 -32 -28 q22 2 32 26z" fill="#4f8a4a"/>' +
      '<path d="M196 206 q24 -10 26 -34 q-22 8 -26 32z" fill="#5e9c55"/>' +
      '<path d="M196 196 q-12 -18 -2 -36 q12 16 2 36z" fill="#6aa95f"/>' +
      '<path d="M197 222 q20 -2 32 -14 q-20 -4 -32 12z" fill="#447c40"/>' +
      '<path d="M195 224 q-20 0 -30 -12 q18 -4 30 10z" fill="#3f733b"/>' +
      "</g>" +
      '<path d="M174 210 h44 l-5 30 h-34z" fill="url(#pe-g-maceta)"/>' +
      '<rect x="171" y="206" width="50" height="8" rx="2" fill="#b4603a"/>';

    /* Libros apilados */
    s += '<rect x="248" y="226" width="62" height="12" rx="2" fill="' + C.marinoClaro + '"/><rect x="248" y="226" width="62" height="2" fill="#c9a24a" opacity=".7"/>' +
      '<rect x="254" y="214" width="54" height="12" rx="2" fill="#7a3b2a"/><rect x="292" y="214" width="3" height="12" fill="#c9a24a" opacity=".8"/>' +
      '<rect x="250" y="203" width="58" height="11" rx="2" fill="#3d5a4a"/>';

    /* Taza de café con vapor */
    s += '<g class="pe-vapores"><path class="pe-vapor" d="M352 192 q-8 -12 0 -24 q8 -12 0 -24" style="--d:0s"/>' +
      '<path class="pe-vapor" d="M366 194 q8 -12 0 -24 q-8 -12 0 -24" style="--d:.9s"/>' +
      '<path class="pe-vapor" d="M380 192 q-8 -12 0 -24 q8 -12 0 -24" style="--d:1.8s"/></g>' +
      '<path d="M394 208 a14 12 0 0 1 0 22" fill="none" stroke="#e9e2d2" stroke-width="6"/>' +
      '<path d="M338 198 h58 v26 a14 14 0 0 1 -14 14 h-30 a14 14 0 0 1 -14 -14z" fill="url(#pe-g-taza)"/>' +
      '<ellipse cx="367" cy="198" rx="29" ry="5" fill="#4a2a16"/><ellipse cx="367" cy="198" rx="29" ry="5" fill="none" stroke="' + C.marino + '" stroke-width="2"/>' +
      '<rect x="338" y="214" width="58" height="5" fill="' + C.marino + '" opacity=".85"/>' +
      '<ellipse cx="367" cy="239" rx="40" ry="3" fill="#7c4d28"/>';

    /* Caja de regalo kraft con pabilo y etiqueta */
    s += '<rect x="452" y="196" width="72" height="42" rx="2" fill="#c9a067"/>' +
      '<rect x="448" y="188" width="80" height="12" rx="2" fill="#d8b47c"/>' +
      '<rect x="484" y="188" width="8" height="50" fill="' + C.marino + '"/>' +
      '<path d="M488 188 q-18 -18 -24 -6 q4 8 24 6z M488 188 q18 -18 24 -6 q-4 8 -24 6z" fill="' + C.marino + '"/>' +
      '<path d="M492 196 l22 14" stroke="#e9d9b4" stroke-width="1.2"/>' +
      '<g transform="translate(514 210) rotate(14)"><path d="M0 -6 h22 v12 h-22 l-5 -6z" fill="' + C.kraftClaro + '"/><circle cx="-1" cy="0" r="1.6" fill="#7a5a32"/></g>';

    /* Cepillo de carpintero (genérico) */
    s += '<g transform="translate(560 214)"><path d="M0 24 h86 l-6 -16 h-72z" fill="' + C.maderaClara + '"/>' +
      '<path d="M8 8 h72" stroke="#7c4d28" stroke-width="1"/>' +
      '<path d="M26 8 q4 -18 18 -16 q8 2 6 16z" fill="' + C.cuero + '"/>' +
      '<path d="M58 8 l6 -12 h8 l-4 12z" fill="url(#pe-g-laton)"/>' +
      '<rect x="0" y="22" width="86" height="2" fill="#4a2f1c" opacity=".5"/></g>';
    /* Virutas sobre la repisa */
    s += '<path d="M660 236 q6 -10 12 -2 q-6 6 -10 0" fill="none" stroke="#e0b07a" stroke-width="2"/>' +
      '<path d="M676 237 q4 -8 10 -2" fill="none" stroke="#d29c63" stroke-width="2"/>';
    s += "</svg>";
    return s;
  }

  /* ---------- Íconos que aparecen dentro del cajón abierto ---------- */
  var ICONOS = {
    mensaje: '<svg viewBox="0 0 24 24"><path d="M2.8 6.5h18.4v11.2H2.8z" fill="#e2c594" stroke="#6e4526" stroke-width="1.3" stroke-linejoin="round"/><path d="M3.2 7l8.8 6.4L20.8 7" fill="none" stroke="#6e4526" stroke-width="1.3" stroke-linejoin="round"/><circle cx="12" cy="13.2" r="2.4" fill="#9a3b2a" stroke="#6b2418" stroke-width=".6"/><path d="M11 13.2h2" stroke="#e9b3a3" stroke-width=".7"/></svg>',
    foto: '<svg viewBox="0 0 24 24"><path d="M4 3.5h16v17H4z" fill="#fbf7ee" stroke="#6e4526" stroke-width="1.2" transform="rotate(-6 12 12)"/><g transform="rotate(-6 12 12)"><rect x="6" y="5.5" width="12" height="10" fill="#2b3d5c"/><path d="M6 15.5l4-4.4 2.6 2.8 1.8-1.8 3.6 3.4z" fill="#5e9c55"/><circle cx="15.2" cy="8.4" r="1.4" fill="#f1d88e"/></g><rect x="9" y="1.6" width="6" height="3" fill="#e2c594" opacity=".85" transform="rotate(4 12 3)"/></svg>',
    vale: '<svg viewBox="0 0 24 24"><path d="M2.5 12L7 6.5h14.5v11H7z" fill="#a86a3a" stroke="#4a2f1c" stroke-width="1.2" stroke-linejoin="round"/><path d="M4.4 12L7.6 8h12.4v8H7.6z" fill="none" stroke="#f1d88e" stroke-width=".7" stroke-dasharray="1.1 .9"/><circle cx="6.6" cy="12" r="1.3" fill="#1c2a42" stroke="#c9a24a" stroke-width=".8"/><path d="M14 9.4l.8 1.6 1.8.3-1.3 1.2.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.2 1.8-.3z" fill="#f1d88e"/></svg>',
    cancion: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.4" fill="#16161a" stroke="#4a2f1c" stroke-width=".8"/><circle cx="12" cy="12" r="7" fill="none" stroke="#3a3a42" stroke-width=".6"/><circle cx="12" cy="12" r="5.2" fill="none" stroke="#3a3a42" stroke-width=".6"/><circle cx="12" cy="12" r="3.3" fill="#c9a24a"/><circle cx="12" cy="12" r=".9" fill="#16161a"/><path d="M6.5 7.2a7 7 0 0 1 4-2.4" stroke="#fff" stroke-width=".8" fill="none" opacity=".35" stroke-linecap="round"/></svg>',
    regalo: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx=".8" fill="#c9a067" stroke="#6e4526" stroke-width="1.1"/><rect x="3" y="7.4" width="18" height="3.4" rx=".8" fill="#d8b47c" stroke="#6e4526" stroke-width="1.1"/><path d="M12 7.4V20" stroke="#1c2a42" stroke-width="2.2"/><path d="M12 7.4c-2-3.4-5.4-2.8-4.5-.9.6 1.1 2.7 .9 4.5.9zm0 0c2-3.4 5.4-2.8 4.5-.9-.6 1.1-2.7.9-4.5.9z" fill="#1c2a42"/></svg>',
    final: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.6 6.2 6.7.5-5.1 4.3 1.6 6.5L12 16.5 6.2 20l1.6-6.5-5.1-4.3 6.7-.5z" fill="#f1d88e" stroke="#86662a" stroke-width="1.2" stroke-linejoin="round"/><path d="M12 6l1.3 3.2" stroke="#fff6d6" stroke-width="1" stroke-linecap="round"/></svg>'
  };
  function iconoDe(n, info) {
    try {
      var d = info && info.tipo ? info : (window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n]);
      if (d) return d.final ? ICONOS.final : (ICONOS[d.tipo] || ICONOS.mensaje);
    } catch (e) { /* sin datos */ }
    return ICONOS.mensaje;
  }
  var CANDADO = '<svg viewBox="0 0 16 16"><path d="M5 7V5.2a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="3.4" y="7" width="9.2" height="7" rx="1.4" fill="currentColor"/><circle cx="8" cy="10.2" r="1" fill="#3a2610"/><path d="M8 10.6v1.6" stroke="#3a2610" stroke-width=".9"/></svg>';

  function svgUri(svg) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '));
  }

  /* ---------- Estilos ---------- */
  var T = "body.tema-para-el";
  var MADERA = "repeating-linear-gradient(90deg, rgba(60,30,10,.0) 0 7px, rgba(60,30,10,.16) 7px 8px, rgba(60,30,10,0) 8px 19px, rgba(255,220,170,.08) 19px 21px, rgba(60,30,10,0) 21px 31px)," +
    "repeating-linear-gradient(180deg, rgba(255,230,190,.05) 0 2px, rgba(0,0,0,.05) 2px 5px)";
  var css = `
${T}{
  --pe-marino:${C.marino}; --pe-marino-osc:${C.marinoOsc}; --pe-laton:${C.laton}; --pe-laton-claro:${C.latonClaro}; --pe-laton-osc:${C.latonOsc};
  --pe-kraft:${C.kraft}; --pe-crema:${C.crema}; --pe-cuero:${C.cuero}; --pe-nogal:${C.nogal};
  background:${C.marinoOsc}; color:var(--pe-crema);
  font-family:"Roboto Slab", Rockwell, Georgia, serif;
}
${T} #tv-escena{position:relative; z-index:1; overflow-x:hidden}
${T} .pe-escena{position:relative; min-height:100vh; min-height:100dvh; padding:0 0 96px; overflow:hidden}
${T} .pe-pared{position:fixed; inset:0; z-index:-1; pointer-events:none;
  background:
    radial-gradient(ellipse 60% 38% at 50% 8%, rgba(255,200,120,.16), transparent 70%),
    radial-gradient(ellipse 120% 60% at 50% 110%, rgba(0,0,0,.45), transparent 70%),
    repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 2px, rgba(255,255,255,.025) 2px 3px, transparent 3px 96px),
    linear-gradient(180deg, #22324e 0%, #1c2a42 45%, #141f33 100%)}

/* Cabecera */
${T} .pe-cabecera{text-align:center; padding:26px 16px 0; position:relative}
${T} .pe-etiqueta{position:relative; display:inline-flex; align-items:center; gap:8px; margin:0; padding:6px 16px 6px 22px;
  font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; font-size:.78rem; letter-spacing:.24em; text-transform:uppercase;
  color:#4a2f1c; background:linear-gradient(180deg, ${C.kraftClaro}, ${C.kraft});
  clip-path:polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%);
  box-shadow:0 2px 0 rgba(0,0,0,.2)}
${T} .pe-etiqueta::before{content:""; position:absolute; left:9px; top:50%; width:6px; height:6px; margin-top:-3px; border-radius:50%; background:#1c2a42; box-shadow:0 0 0 1.5px ${C.laton}}
${T} .tv-para{margin:12px 0 0; font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:700; text-transform:uppercase;
  font-size:clamp(2.3rem, 11vw, 4rem); line-height:1; letter-spacing:.04em; color:var(--pe-crema);
  text-shadow:0 2px 0 #0b1220, 0 0 24px rgba(255,200,120,.18)}
${T} .pe-raya{display:flex; align-items:center; justify-content:center; gap:10px; margin:10px auto 0; max-width:280px; color:var(--pe-laton)}
${T} .pe-raya::before, ${T} .pe-raya::after{content:""; flex:1; height:2px; background:linear-gradient(90deg, transparent, var(--pe-laton))}
${T} .pe-raya::after{background:linear-gradient(90deg, var(--pe-laton), transparent)}
${T} .pe-raya span{width:9px; height:9px; transform:rotate(45deg); background:linear-gradient(135deg, ${C.latonClaro}, ${C.laton} 55%, ${C.latonOsc})}
${T} .pe-sub{margin:10px auto 0; max-width:34ch; text-wrap:balance; font-size:1rem; line-height:1.45; color:#c7cfdc}
${T} .tv-cuenta{display:inline-block; margin:14px auto 0; padding:8px 18px; max-width:100%; border-radius:10px;
  font-family:"Roboto Slab", Georgia, serif; font-weight:500; font-size:.98rem; color:#fbeedb;
  background:linear-gradient(180deg, #a86a3a, #87512a); outline:1.5px dashed rgba(255,226,180,.55); outline-offset:-5px;
  box-shadow:0 4px 12px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.15)}
${T} .tv-cuenta[hidden]{display:none}

/* Escena del taller */
${T} .pe-taller{position:relative; max-width:920px; margin:6px auto 0; height:clamp(180px, calc(min(100vw, 920px) * .36), 330px); pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%); mask-image:linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%)}
${T} .pe-escena-svg{display:block; width:100%; height:100%}
${T} .pe-vapor{fill:none; stroke:#f6efe2; stroke-width:3; stroke-linecap:round; opacity:0; animation:para-el-vapor 3.2s ease-in-out var(--d) infinite}
${T} .pe-cono{animation:para-el-luz 5s ease-in-out infinite}
${T} .pe-planta{transform-box:fill-box; transform-origin:50% 100%; animation:para-el-hoja 6s ease-in-out infinite}
@keyframes para-el-vapor{0%{opacity:0; transform:translateY(8px)} 30%{opacity:.55} 100%{opacity:0; transform:translateY(-16px)}}
@keyframes para-el-luz{0%,100%{opacity:.85} 50%{opacity:1}}
@keyframes para-el-hoja{0%,100%{transform:rotate(0)} 50%{transform:rotate(2deg)}}

/* Mueble de cajones */
${T} .pe-mueble{position:relative; max-width:920px; margin:-6px 16px 0; padding:40px 12px 16px; border-radius:10px 10px 6px 6px;
  background:${MADERA}, linear-gradient(180deg, #6a4224 0%, #553419 100%);
  box-shadow:inset 0 0 0 2px rgba(0,0,0,.25), inset 0 2px 0 rgba(255,220,170,.22), 0 22px 44px rgba(0,0,0,.5)}
${T} .pe-mueble::before{content:""; position:absolute; left:-6px; right:-6px; top:-8px; height:16px; border-radius:5px;
  background:${MADERA}, linear-gradient(180deg, #c98d55, #8e5a30); box-shadow:0 4px 8px rgba(0,0,0,.4)}
${T} .pe-placa{position:absolute; left:50%; top:13px; transform:translateX(-50%); margin:0; padding:3px 14px; border-radius:3px; white-space:nowrap;
  font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; font-size:.7rem; letter-spacing:.26em; text-transform:uppercase; color:#3a2610;
  background:linear-gradient(180deg, ${C.latonClaro}, ${C.laton} 55%, ${C.latonOsc}); box-shadow:0 1px 0 rgba(255,255,255,.3) inset, 0 2px 4px rgba(0,0,0,.45)}
${T} .pe-placa::before, ${T} .pe-placa::after{content:""; position:absolute; top:50%; width:4px; height:4px; margin-top:-2px; border-radius:50%; background:#6b5020; box-shadow:inset 0 1px 0 rgba(255,255,255,.4)}
${T} .pe-placa::before{left:4px} ${T} .pe-placa::after{right:4px}
${T} .tv-puertas{display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:10px 8px; padding:10px; border-radius:4px;
  background:#22150b; box-shadow:inset 0 3px 10px rgba(0,0,0,.7)}

/* Cajón */
${T} .tv-puerta{position:relative; display:block; width:100%; aspect-ratio:1/1; min-height:44px; padding:0; border:0; border-radius:4px;
  background:#120b05; color:var(--pe-crema); transition:transform .2s ease, filter .2s ease;
  animation:para-el-entra .5s cubic-bezier(.2,.8,.3,1) backwards; animation-delay:calc(var(--tv-i) * 24ms)}
${T} .tv-puerta:focus-visible{outline:3px solid ${C.latonClaro}; outline-offset:3px}
${T} .tv-puerta:not([data-estado="bloqueada"]):hover{filter:brightness(1.08)}
${T} .tv-puerta:not([data-estado="bloqueada"]):not([data-estado="abierta"]):hover .pe-frente{transform:translateY(3px)}
${T} .tv-puerta:active{transform:scale(.98)}
@keyframes para-el-entra{from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:none}}

${T} .pe-hueco{position:absolute; inset:0; overflow:hidden; border-radius:4px;
  background:linear-gradient(180deg, #1a0f07 0%, #3b2614 60%, #4a301a 100%);
  box-shadow:inset 0 6px 10px rgba(0,0,0,.7)}
${T} .pe-dentro{position:absolute; left:0; right:0; top:0; height:60%; display:flex; align-items:center; justify-content:center;
  background:radial-gradient(ellipse 70% 80% at 50% 100%, rgba(226,197,148,.55), transparent 70%)}
${T} .pe-dentro::after{content:""; position:absolute; left:6%; right:6%; bottom:2px; height:28%;
  background:repeating-linear-gradient(115deg, #d8b47c 0 3px, #b89060 3px 5px, #e2c594 5px 8px); border-radius:40% 40% 0 0 / 80% 80% 0 0; opacity:.9}
${T} .pe-dentro svg{position:relative; z-index:1; width:44%; height:auto; margin-bottom:6%; filter:drop-shadow(0 3px 3px rgba(0,0,0,.5)); animation:para-el-asoma .45s ease-out both}
@keyframes para-el-asoma{from{opacity:0; transform:translateY(10px) scale(.7)} to{opacity:1; transform:none}}

${T} .pe-frente{position:absolute; inset:0; display:block; border-radius:4px;
  background:${MADERA}, linear-gradient(170deg, #c98d55 0%, #a8703e 55%, #8a5a30 100%);
  box-shadow:inset 0 0 0 1.5px rgba(40,20,5,.45), inset 0 2px 0 rgba(255,225,180,.35), inset 0 -3px 0 rgba(0,0,0,.25), 0 2px 3px rgba(0,0,0,.5);
  transition:transform .4s cubic-bezier(.3,.7,.2,1), filter .3s}
${T} .tv-puerta:nth-child(3n+2) .pe-frente{background:${MADERA}, linear-gradient(170deg, #b97c48 0%, #966035 55%, #7a4c28 100%)}
${T} .tv-puerta:nth-child(4n+3) .pe-frente{background:${MADERA}, linear-gradient(170deg, #d49b63 0%, #b37a45 55%, #93613a 100%)}
${T} .pe-frente::before{content:""; position:absolute; inset:5px; border-radius:2px; border:1px solid rgba(50,25,8,.35); box-shadow:inset 0 1px 0 rgba(255,225,180,.2)}

${T} .pe-num{position:absolute; left:0; right:0; top:22%; text-align:center; pointer-events:none;
  font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:700; font-size:clamp(1.55rem, 7.4vw, 2.2rem); line-height:1; letter-spacing:.02em;
  background:linear-gradient(180deg, #f6ead2, #efe0c2);
  -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 1px 0 rgba(60,30,10,.55))}
${T} .pe-tirador{position:absolute; left:50%; bottom:13%; width:34%; height:15%; min-height:9px; transform:translateX(-50%); border-radius:3px 3px 8px 8px;
  background:linear-gradient(180deg, #8a5228, #6a3c1c); outline:1px dashed rgba(255,214,160,.55); outline-offset:-3px;
  box-shadow:0 2px 3px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,220,170,.25)}
${T} .pe-tirador::before, ${T} .pe-tirador::after{content:""; position:absolute; top:28%; width:5px; height:5px; border-radius:50%;
  background:radial-gradient(circle at 35% 35%, ${C.latonClaro}, ${C.laton} 55%, ${C.latonOsc}); box-shadow:0 1px 1px rgba(0,0,0,.5)}
${T} .pe-tirador::before{left:10%} ${T} .pe-tirador::after{right:10%}
${T} .pe-cerrojo{position:absolute; right:7%; top:7%; width:14px; height:14px; color:#9b8250}
${T} .pe-cerrojo svg{display:block; width:100%; height:100%}

${T} .pe-estrella{position:absolute; right:7%; top:7%; width:14px; height:14px;
  background:linear-gradient(135deg, ${C.latonClaro}, ${C.laton} 55%, ${C.latonOsc});
  clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); filter:drop-shadow(0 1px 1px rgba(0,0,0,.5))}
/* Bloqueada: madera apagada */
${T} .tv-puerta[data-estado="bloqueada"]{cursor:not-allowed}
${T} .tv-puerta[data-estado="bloqueada"] .pe-frente{filter:saturate(.8) brightness(.58)}
${T} .tv-puerta[data-estado="bloqueada"] .pe-num{opacity:.75}

/* Disponible: placa de latón encendida en el tirador */
${T} .tv-puerta[data-estado="disponible"] .pe-frente{box-shadow:inset 0 0 0 1.5px rgba(40,20,5,.45), inset 0 2px 0 rgba(255,225,180,.35), inset 0 -3px 0 rgba(0,0,0,.25), 0 2px 3px rgba(0,0,0,.5), 0 0 0 1px rgba(201,162,74,.35)}

/* Hoy: luz de lámpara de latón sobre el cajón */
${T} .tv-puerta[data-estado="hoy"]{z-index:1; animation:para-el-entra .5s cubic-bezier(.2,.8,.3,1) backwards, para-el-hoy 2.6s ease-in-out .5s infinite}
${T} .tv-puerta[data-estado="hoy"] .pe-frente{filter:brightness(1.14) saturate(1.1)}
${T} .tv-puerta[data-estado="hoy"] .pe-frente::after{content:""; position:absolute; inset:0; border-radius:4px; pointer-events:none;
  background:radial-gradient(ellipse 80% 70% at 50% 0%, rgba(255,226,150,.55), rgba(255,200,110,.12) 60%, transparent 80%)}
${T} .tv-puerta[data-estado="hoy"] .pe-num{top:30%}
${T} .pe-hoy{position:absolute; z-index:2; left:50%; top:-7px; transform:translateX(-50%); padding:2px 8px 2px 10px;
  font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; line-height:1.3; white-space:nowrap;
  color:#2a1a08; background:linear-gradient(180deg, ${C.latonClaro}, ${C.laton}); border-radius:3px;
  box-shadow:0 0 12px rgba(255,214,120,.85), 0 2px 3px rgba(0,0,0,.45)}
@keyframes para-el-hoy{0%,100%{box-shadow:0 0 0 2px rgba(201,162,74,.6), 0 0 10px 2px rgba(255,206,120,.35)} 50%{box-shadow:0 0 0 2px rgba(241,216,142,.95), 0 0 26px 8px rgba(255,206,120,.6)}}

/* Abierta: cajón jalado, se ve lo que hay dentro */
${T} .tv-puerta[data-estado="abierta"] .pe-frente,
${T} .tv-puerta.pe-abriendo .pe-frente{transform:translateY(64%); filter:brightness(.92)}
${T} .tv-puerta[data-estado="abierta"] .pe-num{top:6%; font-size:clamp(.9rem, 4vw, 1.15rem)}
${T} .tv-puerta[data-estado="abierta"] .pe-tirador{display:none}
${T} .tv-puerta.pe-abriendo .pe-hueco::after{content:""; position:absolute; inset:0; background:radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,214,140,.55), transparent 75%)}
${T} .tv-puerta.pe-abriendo .pe-num, ${T} .tv-puerta.pe-abriendo .pe-hoy{opacity:0; transition:opacity .15s}

/* Pie */
${T} .pe-pie{margin:22px 16px 0; text-align:center; font-size:.98rem; color:#c7cfdc}
${T} .pe-pie b{font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; letter-spacing:.06em; color:var(--pe-laton-claro)}

/* Efecto al abrir (vive en .tv-capa) */
${T} .pe-aserrin{position:absolute; left:0; top:0; border-radius:40% 60% 50% 45%; background:#d9a96e}
${T} .pe-viruta{position:absolute; left:0; top:0; width:14px; height:14px; border-radius:50%;
  border:3px solid #e2b77e; border-right-color:transparent; border-bottom-color:transparent}
${T} .pe-brillo{position:absolute; left:0; top:0; width:26px; height:26px; margin:-13px 0 0 -13px;
  background:radial-gradient(circle, #fff 0 14%, #fff2c2 32%, #f1d88e 55%, rgba(241,216,142,0) 72%);
  clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%)}
${T} .pe-reflejo{position:absolute; overflow:hidden; border-radius:4px}

/* Ventana de la sorpresa: tarjeta de papel kraft con correa de cuero */
${T} .tv-modal{background:radial-gradient(ellipse at 50% 30%, rgba(43,61,92,.6), rgba(8,12,22,.88) 72%); -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px)}
${T} .tv-tarjeta{max-width:430px; padding:46px 22px 22px; border-radius:8px; color:#2a2016;
  font-family:"Roboto Slab", Georgia, serif;
  background:
    radial-gradient(1.5px 1.5px at 18% 30%, rgba(90,60,30,.25) 50%, transparent 100%),
    radial-gradient(1px 1px at 72% 18%, rgba(90,60,30,.3) 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 84% 64%, rgba(90,60,30,.22) 50%, transparent 100%),
    radial-gradient(1px 1px at 34% 78%, rgba(90,60,30,.3) 50%, transparent 100%),
    radial-gradient(1px 1px at 58% 46%, rgba(90,60,30,.22) 50%, transparent 100%),
    repeating-linear-gradient(8deg, rgba(120,80,40,.035) 0 2px, transparent 2px 6px),
    radial-gradient(ellipse at 50% 0%, #e6cc9e, #d5b47f 60%, #c9a36b 100%);
  box-shadow:0 0 0 1px rgba(80,50,20,.4), 0 24px 60px rgba(0,0,0,.6), inset 0 0 40px rgba(110,70,30,.25);
  animation:para-el-aparece .45s cubic-bezier(.2,.9,.3,1.12) both}
${T} .tv-tarjeta::before{content:""; position:absolute; left:0; right:0; top:0; height:26px; border-radius:8px 8px 0 0;
  background:
    radial-gradient(circle at 18px 13px, ${C.latonClaro} 0 2px, ${C.laton} 2.5px 4px, transparent 4.5px),
    radial-gradient(circle at calc(100% - 18px) 13px, ${C.latonClaro} 0 2px, ${C.laton} 2.5px 4px, transparent 4.5px),
    linear-gradient(180deg, #a86a3a, #7e4a24);
  box-shadow:inset 0 -2px 0 rgba(0,0,0,.25)}
${T} .tv-tarjeta::after{content:""; position:absolute; left:8px; right:8px; top:5px; height:16px; border-top:1px dashed rgba(255,220,170,.7); border-bottom:1px dashed rgba(255,220,170,.7); pointer-events:none}
@keyframes para-el-aparece{from{opacity:0; transform:translateY(18px) rotate(-1.2deg)} to{opacity:1; transform:none}}
${T} .tv-dia{display:inline-block; margin:0 0 16px; padding:2px 14px 0; font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:700; font-size:2rem; line-height:1.15; letter-spacing:.08em; text-transform:uppercase;
  color:${C.marino}; border-bottom:3px solid ${C.laton}}
${T} .tv-contenido{margin:0 0 18px; position:relative; z-index:1}
${T} .tv-msg{margin:0; padding:4px 4px; font-size:1.18rem; line-height:1.55; color:#2a2016}
${T} .tv-firma{margin:0 0 18px; font-style:italic; font-size:1.02rem; color:#6e4526; opacity:1}
${T} .tv-cerrar{min-width:150px; font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; letter-spacing:.14em; text-transform:uppercase; border-radius:6px;
  background:${C.marino}; color:var(--pe-crema); border:1px solid ${C.laton}; box-shadow:0 3px 0 #0b1220; transition:transform .15s, background .2s}
${T} .tv-cerrar:hover{background:${C.marinoClaro}}
${T} .tv-cerrar:active{transform:translateY(2px); box-shadow:0 1px 0 #0b1220}
${T} .tv-cerrar:focus-visible, ${T} .tv-boton:focus-visible{outline:3px solid ${C.marino}; outline-offset:3px}

${T} .tv-foto{margin:0; padding:10px 10px 12px; background:#fbf7ee; transform:rotate(-1.4deg); box-shadow:0 8px 18px rgba(60,35,10,.35); position:relative}
${T} .tv-foto::before{content:""; position:absolute; left:50%; top:-10px; width:84px; height:22px; margin-left:-42px; transform:rotate(3deg);
  background:rgba(232,214,170,.85); box-shadow:0 1px 2px rgba(0,0,0,.15)}
${T} .tv-foto img{border-radius:2px}
${T} .tv-foto figcaption{margin-top:10px; font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:500; font-size:1.08rem; letter-spacing:.04em; color:${C.marino}}

${T} .tv-vale{position:relative; padding:20px 18px 20px 34px; border:0; border-radius:10px 6px 6px 10px; color:#fbeedb; text-align:center;
  background:radial-gradient(ellipse at 30% 0%, rgba(255,230,190,.22), transparent 60%), linear-gradient(160deg, #b0733f, #8a5228 60%, #74421f);
  outline:1.5px dashed rgba(255,220,170,.7); outline-offset:-8px; box-shadow:0 8px 18px rgba(60,35,10,.35)}
${T} .tv-vale::before{content:""; position:absolute; left:12px; top:50%; width:12px; height:12px; margin-top:-6px; border-radius:50%;
  background:#d5b47f; box-shadow:0 0 0 3px ${C.laton}, 0 0 0 4px ${C.latonOsc}}
${T} .tv-vale-por{font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; font-size:.8rem; letter-spacing:.32em; color:${C.latonClaro}}
${T} .tv-vale-que{margin:6px 0 4px; font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:700; font-size:1.75rem; line-height:1.12; text-transform:uppercase; letter-spacing:.03em; color:#fff6e4}
${T} .tv-vale-nota{margin:8px 0 0; font-size:1rem; opacity:1; color:#f1dcc0}

${T} .tv-cancion::before{content:""; display:block; width:96px; height:96px; margin:0 auto 14px; border-radius:50%;
  background:url("${svgUri(ICONOS.cancion)}") center / 100% no-repeat; box-shadow:0 8px 16px rgba(40,20,5,.45);
  animation:para-el-disco 6s linear infinite}
@keyframes para-el-disco{to{transform:rotate(360deg)}}
${T} .tv-cancion-titulo{font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:700; font-size:1.4rem; letter-spacing:.06em; text-transform:uppercase; color:${C.marino}; margin:0 0 6px}
${T} .tv-cancion-nota{font-size:1.06rem; color:#3b2c1c; margin:0 0 16px}
${T} .tv-boton{font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; letter-spacing:.12em; text-transform:uppercase; border-radius:6px; color:#2a1a08; border:1px solid ${C.latonOsc};
  background:linear-gradient(180deg, ${C.latonClaro}, ${C.laton} 60%, #a8842f); box-shadow:0 3px 0 ${C.latonOsc}}
${T} .tv-boton:hover{filter:brightness(1.06)}

${T} .tv-regalo{padding:20px 16px 18px; border-radius:6px; background:rgba(255,248,232,.45); border:1px solid rgba(110,69,38,.35)}
${T} .tv-regalo::before{content:""; display:block; width:64px; height:64px; margin:0 auto 10px;
  background:url("${svgUri(ICONOS.regalo)}") center / contain no-repeat; filter:drop-shadow(0 4px 4px rgba(60,35,10,.35));
  animation:para-el-flota 3s ease-in-out infinite}
@keyframes para-el-flota{0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)}}
${T} .tv-regalo-texto{font-size:1.3rem; font-weight:700; line-height:1.3; color:${C.marino}}
${T} .tv-regalo-nota{margin-top:10px; font-size:1.02rem; opacity:1; color:#4a3a28}

/* Día 24: tarjeta azul marino con marco de latón */
${T} .tv-modal.tv-final .tv-tarjeta{color:var(--pe-crema);
  background:radial-gradient(ellipse at 50% 0%, rgba(255,200,120,.22), transparent 60%), linear-gradient(180deg, #24365a, #172338);
  box-shadow:0 0 0 2px ${C.laton}, 0 0 0 6px #121c2e, 0 0 0 7px rgba(201,162,74,.55), 0 24px 70px rgba(0,0,0,.6), 0 0 90px rgba(255,200,120,.2)}
${T} .tv-modal.tv-final .tv-tarjeta::before{content:"Nochebuena"; display:flex; align-items:center; justify-content:center; height:28px;
  font-family:"Oswald", "Arial Narrow", sans-serif; font-weight:600; font-size:.74rem; letter-spacing:.34em; text-transform:uppercase; color:#fbeedb}
${T} .tv-modal.tv-final .tv-dia{color:var(--pe-laton-claro); border-bottom-color:${C.laton}; font-size:2.2rem}
${T} .tv-modal.tv-final .tv-msg{color:#f3e8d2; font-size:1.22rem}
${T} .tv-modal.tv-final .tv-msg::before{content:""; display:block; width:40px; height:40px; margin:0 auto 10px;
  background:url("${svgUri(ICONOS.final)}") center / contain no-repeat; filter:drop-shadow(0 0 10px rgba(255,214,120,.7))}
${T} .tv-modal.tv-final .tv-firma{color:var(--pe-laton-claro)}
${T} .tv-modal.tv-final .tv-cerrar{background:transparent; color:var(--pe-laton-claro); border-color:${C.laton}; box-shadow:none}
${T} .tv-modal.tv-final .tv-cerrar:hover{background:rgba(201,162,74,.15)}
${T} .tv-modal.tv-final .tv-cerrar:focus-visible{outline-color:${C.latonClaro}}

/* Aviso */
${T} .tv-toast{background:#2a1a0c; color:#fbeedb; border:1px solid rgba(201,162,74,.7); border-radius:8px;
  font-family:"Roboto Slab", Georgia, serif; font-size:.98rem; box-shadow:0 8px 24px rgba(0,0,0,.45)}

/* Pantallas más grandes */
@media (min-width:600px){
  ${T} .pe-cabecera{padding-top:38px}
  ${T} .tv-puertas{grid-template-columns:repeat(6, minmax(0, 1fr)); gap:12px 10px; padding:12px}
  ${T} .pe-mueble{padding:44px 18px 20px}
}
@media (min-width:952px){
  ${T} .pe-mueble{margin-left:auto; margin-right:auto}
  ${T} .tv-puertas{grid-template-columns:repeat(8, minmax(0, 1fr)); gap:14px 12px; padding:14px}
  ${T} .pe-num{font-size:2.3rem}
}

/* Movimiento reducido */
@media (prefers-reduced-motion: reduce){
  ${T} .pe-vapor, ${T} .pe-cono, ${T} .pe-planta, ${T} .tv-puerta, ${T} .pe-dentro svg,
  ${T} .tv-tarjeta, ${T} .tv-regalo::before, ${T} .tv-cancion::before{animation:none !important}
  ${T} .pe-vapor{opacity:.35}
  ${T} .pe-frente, ${T} .tv-puerta{transition:none}
}
`;

  /* ---------- Efecto al abrir: aserrín, virutas y un destello de latón ---------- */
  function alAbrir(boton, n, capa) {
    return new Promise(function (listo) {
      var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducido || !capa || !boton || !boton.getBoundingClientRect) { listo(); return; }
      var hechos = [];
      function quitarTodo() {
        hechos.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
        hechos = [];
        boton.classList.remove("pe-abriendo");
      }
      boton.classList.add("pe-abriendo");
      if (typeof document.body.animate !== "function") {
        setTimeout(listo, 420);
        setTimeout(quitarTodo, 880);
        return;
      }
      function nuevo(clase, x, y, w, h) {
        var e = document.createElement("span");
        e.className = clase;
        e.style.left = x + "px"; e.style.top = y + "px";
        if (w) { e.style.width = w + "px"; e.style.height = (h || w) + "px"; e.style.marginLeft = (-w / 2) + "px"; e.style.marginTop = (-(h || w) / 2) + "px"; }
        capa.appendChild(e); hechos.push(e);
        return e;
      }
      var r = boton.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height * 0.62;
      var colores = ["#e2b77e", "#d29c63", "#c48a52", "#f0cf9c", "#a8703e"];

      /* reflejo de latón que cruza el cajón */
      var ref = nuevo("pe-reflejo", r.left, r.top);
      ref.style.width = r.width + "px"; ref.style.height = r.height + "px";
      var franja = document.createElement("span");
      franja.style.cssText = "position:absolute;top:-20%;bottom:-20%;left:-60%;width:40%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,rgba(255,240,200,.8),transparent)";
      ref.appendChild(franja);
      franja.animate([{ left: "-60%" }, { left: "130%" }], { duration: 480, easing: "ease-in-out", fill: "forwards" });

      /* bocanada de aserrín */
      for (var i = 0; i < 30; i++) {
        var ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.25;
        var dist = 30 + Math.random() * 60;
        var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
        var tam = 3.5 + Math.random() * 5;
        var p = nuevo("pe-aserrin", cx + (Math.random() - 0.5) * r.width * 0.5, cy, tam, tam * (0.6 + Math.random() * 0.5));
        p.style.background = colores[i % colores.length];
        p.animate([
          { opacity: 0, transform: "translate(0,0) scale(.4)" },
          { opacity: 1, transform: "translate(" + (dx * 0.7).toFixed(1) + "px," + (dy * 0.7).toFixed(1) + "px) scale(1) rotate(60deg)", offset: 0.4 },
          { opacity: 0, transform: "translate(" + dx.toFixed(1) + "px," + (dy + 34).toFixed(1) + "px) scale(.7) rotate(160deg)" }
        ], { duration: 560 + Math.random() * 240, delay: 60 + Math.random() * 60, easing: "cubic-bezier(.2,.7,.4,1)", fill: "both" });
      }
      /* virutas enroscadas */
      for (var j = 0; j < 8; j++) {
        var a2 = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
        var d2 = 36 + Math.random() * 46;
        var v = nuevo("pe-viruta", cx, cy, 10 + Math.random() * 8);
        v.style.borderTopColor = colores[j % colores.length];
        v.style.borderLeftColor = colores[(j + 2) % colores.length];
        v.animate([
          { opacity: 0, transform: "translate(0,0) rotate(0) scale(.5)" },
          { opacity: 1, transform: "translate(" + (Math.cos(a2) * d2 * 0.7).toFixed(1) + "px," + (Math.sin(a2) * d2 * 0.7).toFixed(1) + "px) rotate(200deg) scale(1)", offset: 0.45 },
          { opacity: 0, transform: "translate(" + (Math.cos(a2) * d2).toFixed(1) + "px," + (Math.sin(a2) * d2 + 30).toFixed(1) + "px) rotate(420deg) scale(.8)" }
        ], { duration: 640 + Math.random() * 160, delay: 80, easing: "cubic-bezier(.2,.7,.4,1)", fill: "both" });
      }
      /* destello de latón en la esquina */
      var b = nuevo("pe-brillo", r.right - r.width * 0.18, r.top + r.height * 0.16);
      b.animate([
        { opacity: 0, transform: "scale(.2) rotate(0)" },
        { opacity: 1, transform: "scale(1.5) rotate(45deg)", offset: 0.4 },
        { opacity: 0, transform: "scale(.4) rotate(90deg)" }
      ], { duration: 560, delay: 220, easing: "ease-out", fill: "both" });

      setTimeout(listo, 800);
      setTimeout(quitarTodo, 880);
    });
  }

  /* ---------- Registro del estilo ---------- */
  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "para-el",
    nombre: "Para él",
    emoji: "🧔",
    descripcion: "Taller con café: madera, cuero, latón y cajones con sorpresa",
    fuentes: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Roboto+Slab:wght@400;500;700&display=swap",
    color: "#1c2a42",
    css: css,
    orden: [7, 15, 2, 20, 11, 5, 18, 1, 23, 9, 13, 4, 16, 22, 6, 10, 3, 19, 12, 24, 8, 14, 21, 17],
    escena: function () {
      return '<div class="pe-escena"><div class="pe-pared" aria-hidden="true"></div>' +
        '<header class="pe-cabecera">' +
        '<p class="pe-etiqueta">Calendario de adviento</p>' +
        '<h1 class="tv-para"></h1>' +
        '<div class="pe-raya" aria-hidden="true"><span></span></div>' +
        '<p class="pe-sub">Un cajón del taller por cada día de diciembre. Sírvete un café y abre el de hoy.</p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<div class="pe-taller">' + escenaSVG() + "</div>" +
        '<section class="pe-mueble" aria-label="Cajones del calendario"><p class="pe-placa" aria-hidden="true">Diciembre</p><div class="tv-puertas"></div></section>' +
        '<p class="pe-pie">Un cajón por día, hasta <b>Nochebuena</b>.</p>' +
        "</div>";
    },
    puerta: function (n, estado, info) {
      var h = '<span class="pe-hueco" aria-hidden="true">';
      if (estado === "abierta") h += '<span class="pe-dentro">' + iconoDe(n, info) + "</span>";
      h += '<span class="pe-frente"><span class="pe-num">' + n + '</span><span class="pe-tirador"></span>';
      if (estado === "bloqueada") h += '<span class="pe-cerrojo">' + CANDADO + "</span>";
      else if (n === 24 && estado !== "abierta") h += '<span class="pe-estrella"></span>';
      h += "</span></span>";
      if (estado === "hoy") h += '<span class="pe-hoy" aria-hidden="true">Hoy</span>';
      return h;
    },
    alAbrir: alAbrir
  });
})();
