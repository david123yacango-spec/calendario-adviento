/* Estilo «Glam»: boutique de lujo en negro, dorado y rosa empolvado.
   Puertas como cajitas de regalo con lazo de satén y filete dorado. Arte propio. */
(function () {
  "use strict";

  var ESTRELLA = "M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z";

  /* Lazo de satén (dibujo propio). Colores por CSS según la caja. */
  var LAZO =
    '<svg class="gl-lazo" viewBox="0 0 60 34" aria-hidden="true" focusable="false">' +
    '<path class="gl-lz-c" d="M28 20L19 33L23.5 31.5L26 34L30.5 21Z"/>' +
    '<path class="gl-lz-c" d="M32 20L41 33L36.5 31.5L34 34L29.5 21Z"/>' +
    '<path class="gl-lz-c" d="M30 18C22 4 6 0 4 11C2 21 18 23 30 18Z"/>' +
    '<path class="gl-lz-c" d="M30 18C38 4 54 0 56 11C58 21 42 23 30 18Z"/>' +
    '<path class="gl-lz-o" d="M30 18C24 9 13 6 11 12C10 17 20 19 30 18Z"/>' +
    '<path class="gl-lz-o" d="M30 18C36 9 47 6 49 12C50 17 40 19 30 18Z"/>' +
    '<path class="gl-lz-l" d="M8 9C11 5 18 6 22 9C17 7.5 12 7.5 8 9Z"/>' +
    '<path class="gl-lz-l" d="M52 9C49 5 42 6 38 9C43 7.5 48 7.5 52 9Z"/>' +
    '<rect class="gl-lz-c" x="25.5" y="13.5" width="9" height="10" rx="3"/>' +
    '<rect class="gl-lz-l" x="27" y="15" width="2.2" height="7" rx="1.1"/>' +
    "</svg>";

  var CANDADO =
    '<svg class="gl-candado" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
    '<path d="M5 7.5V5.2a3 3 0 0 1 6 0v2.3" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
    '<rect x="3.2" y="7.2" width="9.6" height="7.2" rx="1.6" fill="currentColor"/>' +
    '<circle cx="8" cy="10.6" r="1.1" fill="#141012"/></svg>';

  /* Iconos de lo que asoma en una caja abierta, según el tipo de sorpresa */
  var ICONOS = {
    mensaje: '<rect x="3.5" y="6.5" width="17" height="12" rx="1.5"/><path d="M4 7.5l8 6 8-6"/>',
    foto: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><circle cx="15.5" cy="9.5" r="1.6"/><path d="M4 17l5-5.5 4 4 2.5-2.5 4.5 4.5"/>',
    vale: '<path d="M3.5 7.5h17v3a1.8 1.8 0 0 0 0 3v3h-17v-3a1.8 1.8 0 0 0 0-3z"/><path d="M14.5 8v8" stroke-dasharray="1.4 1.6"/>',
    cancion: '<path d="M9.5 17V6.5l10-2V15"/><circle cx="7.3" cy="17" r="2.3"/><circle cx="17.3" cy="15" r="2.3"/>',
    regalo: '<rect x="4" y="10" width="16" height="10" rx="1"/><path d="M3 7.5h18v2.5H3zM12 7.5V20"/><path d="M12 7.5C10 4 6.5 4.5 7.5 6.5S11 7.5 12 7.5zM12 7.5c2-3.5 5.5-3 4.5-1S13 7.5 12 7.5z"/>',
    final: '<path d="M12 19.5s-7.5-4.4-7.5-9.6A4 4 0 0 1 12 7.6a4 4 0 0 1 7.5 2.3c0 5.2-7.5 9.6-7.5 9.6z"/>'
  };

  function tipoDe(n) {
    try {
      var d = window.TV_MOTOR && window.TV_MOTOR.dias && window.TV_MOTOR.dias[n];
      if (d) return d.final ? "final" : d.tipo;
    } catch (e) { /* sin datos */ }
    return n === 24 ? "final" : "mensaje";
  }

  function icono(n) {
    var t = tipoDe(n);
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONOS[t] || ICONOS.mensaje) + "</svg>";
  }

  /* Guirnalda de perlas para la parte de arriba */
  function guirnalda() {
    var h = "";
    var tramos = [[0, 300], [300, 600], [600, 900], [900, 1200]];
    tramos.forEach(function (tr) {
      var x0 = tr[0], x1 = tr[1], xm = (x0 + x1) / 2;
      for (var i = 0; i <= 26; i++) {
        var t = i / 26;
        var x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * xm + t * t * x1;
        var y = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 62 + t * t * 4;
        if (i % 3 === 1) h += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.9" fill="#d9b768"/>';
        else h += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.6" fill="url(#gl-perla)"/>';
      }
      h += '<path d="M' + xm + ' 37 v7" stroke="#c9a45c" stroke-width="1"/>' +
        '<path transform="translate(' + (xm - 6) + ' 43) scale(.5)" d="' + ESTRELLA + '" fill="#e6c983"/>';
    });
    [0, 300, 600, 900, 1200].forEach(function (x) {
      h += '<circle cx="' + x + '" cy="4" r="5" fill="#c9a45c"/><circle cx="' + x + '" cy="4" r="2.2" fill="#f6e3a8"/>';
    });
    return '<svg class="gl-guirnalda" viewBox="0 0 1200 60" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">' +
      '<defs><radialGradient id="gl-perla" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#f7e6e4"/><stop offset="1" stop-color="#cfa9ad"/></radialGradient></defs>' +
      h + "</svg>";
  }

  function brillos() {
    var b = [
      [6, 10, 14, 0], [88, 7, 18, 1.2], [14, 30, 10, 2.1], [92, 26, 12, .6],
      [4, 62, 12, 1.7], [95, 70, 16, .3], [8, 88, 10, 2.6], [90, 92, 12, 1.1]
    ];
    return b.map(function (v) {
      return '<span class="gl-brillo" style="left:' + v[0] + "%;top:" + v[1] + "%;width:" + v[2] + "px;height:" + v[2] + "px;animation-delay:" + v[3] + 's" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path d="' + ESTRELLA + '"/></svg></span>';
    }).join("");
  }

  var DIVISOR =
    '<svg class="gl-divisor" viewBox="0 0 240 24" aria-hidden="true" focusable="false">' +
    '<path d="M8 12H94M146 12H232" stroke="url(#gl-linea)" stroke-width="1"/>' +
    '<defs><linearGradient id="gl-linea" x1="0" x2="1"><stop offset="0" stop-color="#c9a45c" stop-opacity="0"/><stop offset=".4" stop-color="#c9a45c"/><stop offset=".6" stop-color="#c9a45c"/><stop offset="1" stop-color="#c9a45c" stop-opacity="0"/></linearGradient></defs>' +
    '<circle cx="100" cy="12" r="1.6" fill="#e6c983"/><circle cx="140" cy="12" r="1.6" fill="#e6c983"/>' +
    '<g transform="translate(108 3) scale(.4)" fill="#e6c983">' +
    '<path d="M30 18C22 4 6 0 4 11C2 21 18 23 30 18Z"/><path d="M30 18C38 4 54 0 56 11C58 21 42 23 30 18Z"/>' +
    '<path d="M28 20L19 33L23.5 31.5L26 34L30.5 21Z"/><path d="M32 20L41 33L36.5 31.5L34 34L29.5 21Z"/><rect x="25.5" y="13.5" width="9" height="10" rx="3"/></g></svg>';

  var ESQUINA = '<svg viewBox="0 0 30 30" aria-hidden="true" focusable="false"><path d="M1 29V9a8 8 0 0 1 8-8h20" fill="none" stroke="#c9a45c" stroke-width="1"/><path d="M5 29V12a7 7 0 0 1 7-7h17" fill="none" stroke="#c9a45c" stroke-width=".6" opacity=".6"/><circle cx="9" cy="9" r="1.6" fill="#e6c983"/></svg>';

  /* Datos URI para la tarjeta */
  var LAZO_URI = "data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 34'>" +
    "<path d='M28 20L19 33L23.5 31.5L26 34L30.5 21Z' fill='#c9a45c'/><path d='M32 20L41 33L36.5 31.5L34 34L29.5 21Z' fill='#c9a45c'/>" +
    "<path d='M30 18C22 4 6 0 4 11C2 21 18 23 30 18Z' fill='#d9b768'/><path d='M30 18C38 4 54 0 56 11C58 21 42 23 30 18Z' fill='#d9b768'/>" +
    "<path d='M30 18C24 9 13 6 11 12C10 17 20 19 30 18Z' fill='#a8833c'/><path d='M30 18C36 9 47 6 49 12C50 17 40 19 30 18Z' fill='#a8833c'/>" +
    "<path d='M8 9C11 5 18 6 22 9C17 7.5 12 7.5 8 9Z' fill='#fbeec4'/><path d='M52 9C49 5 42 6 38 9C43 7.5 48 7.5 52 9Z' fill='#fbeec4'/>" +
    "<rect x='25.5' y='13.5' width='9' height='10' rx='3' fill='#c9a45c'/></svg>");
  var REGALO_URI = "data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 90'>" +
    "<rect x='14' y='38' width='72' height='48' fill='#efc3ca' stroke='#c9a45c'/>" +
    "<rect x='8' y='26' width='84' height='15' fill='#f5d6da' stroke='#c9a45c'/>" +
    "<rect x='44' y='26' width='12' height='60' fill='#141012'/>" +
    "<rect x='46' y='26' width='3' height='60' fill='#4a3c41'/>" +
    "<g transform='translate(20 0)'><path d='M30 26C22 10 6 6 4 17C2 27 18 30 30 26Z' fill='#141012'/><path d='M30 26C38 10 54 6 56 17C58 27 42 30 30 26Z' fill='#141012'/>" +
    "<path d='M9 15C12 11 18 12 22 15C17 13.5 12 13.5 9 15Z' fill='#5a4a50'/><path d='M51 15C48 11 42 12 38 15C43 13.5 48 13.5 51 15Z' fill='#5a4a50'/>" +
    "<rect x='25' y='20' width='10' height='10' rx='3' fill='#141012'/></g>" +
    "<path d='M90 6l1.5 4.5L96 12l-4.5 1.5L90 18l-1.5-4.5L84 12l4.5-1.5z' fill='#c9a45c'/>" +
    "<path d='M10 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1z' fill='#c9a45c'/></svg>");
  var DIVISOR_URI = "data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 10'><path d='M0 5H50M70 5H120' stroke='#c9a45c' stroke-width='.8'/>" +
    "<path d='M60 0L65 5L60 10L55 5Z' fill='#c9a45c'/></svg>");
  var BRILLOS_URI = "data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
    "<path transform='translate(20 24) scale(.5)' d='" + ESTRELLA + "' fill='#e6c983' opacity='.8'/>" +
    "<path transform='translate(160 40) scale(.35)' d='" + ESTRELLA + "' fill='#e6c983' opacity='.6'/>" +
    "<path transform='translate(176 150) scale(.45)' d='" + ESTRELLA + "' fill='#e6c983' opacity='.7'/>" +
    "<path transform='translate(14 160) scale(.3)' d='" + ESTRELLA + "' fill='#e6c983' opacity='.5'/>" +
    "<circle cx='120' cy='18' r='1.2' fill='#f6e3a8'/><circle cx='60' cy='186' r='1.2' fill='#f6e3a8'/><circle cx='190' cy='96' r='1' fill='#f6e3a8'/></svg>");

  var S = "body.tema-glam ";

  var css = [
    /* ---- Página ---- */
    S + "{ --gl-oro:#c9a45c; --gl-oro-cl:#e6c983; --gl-oro-os:#7a5a22; --gl-negro:#141012; --gl-rosa:#f3d4d8; --gl-marfil:#fbf6f0;" +
    " margin:0; color:#f6ece6; font-family:'Jost',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif; font-weight:300;" +
    " background-color:#0e0a0c;" +
    " background-image:radial-gradient(900px 520px at 50% -8%, rgba(232,170,184,.20), transparent 65%), radial-gradient(700px 420px at 50% 108%, rgba(201,164,92,.16), transparent 62%), linear-gradient(180deg,#120d10 0%,#0c090b 100%);" +
    " min-height:100vh; }",
    S + ".gl-escena{ position:relative; overflow:hidden; padding:0 0 104px; min-height:100vh; }",
    S + ".gl-guirnalda{ display:block; width:100%; height:54px; filter:drop-shadow(0 2px 3px rgba(0,0,0,.5)); }",
    S + ".gl-brillo{ position:absolute; display:block; color:var(--gl-oro-cl); fill:currentColor; opacity:.0; animation:glam-titila 4.2s ease-in-out infinite; pointer-events:none; }",
    S + ".gl-brillo svg{ display:block; width:100%; height:100%; }",
    S + ".gl-cabecera{ position:relative; text-align:center; padding:10px 16px 6px; }",
    S + ".gl-sobre{ margin:6px 0 10px; font-size:.7rem; font-weight:400; letter-spacing:.42em; text-transform:uppercase; color:var(--gl-rosa); padding-left:.42em; }",
    S + ".gl-titulo{ margin:0; font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-weight:500; line-height:1; font-size:clamp(2.3rem,10.5vw,3.6rem); color:#fbf3ea; letter-spacing:.01em; }",
    S + ".gl-titulo em{ display:block; font-style:italic; font-weight:500; font-size:.82em; margin-top:.06em; color:var(--gl-oro-cl);" +
    " background:linear-gradient(100deg,#b8893a 0%,#f6e3a8 30%,#d4ad5e 52%,#fff1c9 70%,#b8893a 100%); background-size:220% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:glam-oro 7s ease-in-out infinite; }",
    S + ".gl-divisor{ display:block; width:220px; max-width:70%; height:22px; margin:12px auto 4px; }",
    S + ".tv-para{ margin:2px 0 0; font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-weight:500; font-size:1.45rem; color:var(--gl-rosa); }",
    S + ".tv-cuenta{ display:inline-block; margin:12px auto 0; padding:7px 16px; border:1px solid rgba(201,164,92,.55); border-radius:999px; font-size:.82rem; letter-spacing:.04em; color:#f6ece6; background:rgba(20,16,18,.6); }",
    S + ".tv-cuenta[hidden]{ display:none; }",

    /* ---- Vitrina ---- */
    S + ".gl-vitrina{ position:relative; margin:20px 16px 0; }",
    S + ".gl-marco{ position:relative; container-type:inline-size; max-width:1020px; margin:0 auto; padding:22px 12px 24px;" +
    " background:linear-gradient(180deg,rgba(32,24,28,.92),rgba(18,13,16,.94)); border:1px solid rgba(201,164,92,.6); border-radius:4px;" +
    " box-shadow:inset 0 0 0 5px rgba(14,10,12,.9), inset 0 0 0 6px rgba(201,164,92,.28), 0 30px 60px rgba(0,0,0,.45); }",
    S + ".gl-esq{ position:absolute; width:22px; height:22px; pointer-events:none; }",
    S + ".gl-esq svg{ display:block; width:100%; height:100%; }",
    S + ".gl-esq-1{ top:9px; left:9px; } " + S + ".gl-esq-2{ top:9px; right:9px; transform:scaleX(-1); } " +
    S + ".gl-esq-3{ bottom:9px; left:9px; transform:scaleY(-1); } " + S + ".gl-esq-4{ bottom:9px; right:9px; transform:scale(-1,-1); }",
    S + ".gl-pie{ margin:22px 16px 0; text-align:center; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:rgba(243,212,216,.78); }",

    /* ---- Rejilla de cajas ---- */
    S + ".tv-puertas{ --gl-cols:4; --gl-gap:10px; --gl-celda:76px; --gl-celda:calc((100cqw - (var(--gl-cols) - 1) * var(--gl-gap)) / var(--gl-cols));" +
    " display:grid; grid-template-columns:repeat(var(--gl-cols),minmax(0,1fr)); grid-auto-rows:calc(var(--gl-celda) * 1.14); grid-auto-flow:dense;" +
    " gap:14px var(--gl-gap); padding:0; margin:0; }",
    S + ".tv-puerta[data-n='7']{ grid-column:span 2; }",
    S + ".tv-puerta[data-n='24']{ grid-column:span 2; grid-row:span 2; --gl-k:1.7; }",
    "@media (min-width:720px){ " + S + ".tv-puertas{ --gl-cols:6; --gl-gap:16px; row-gap:18px; } " + S + ".tv-puerta[data-n='13'], " + S + ".tv-puerta[data-n='18']{ grid-column:span 2; } " + S + ".gl-marco{ padding:30px 26px 32px; } " + S + ".gl-vitrina{ margin-top:26px; } }",
    "@media (min-width:1000px){ " + S + ".tv-puertas{ --gl-cols:8; } " + S + ".tv-puerta[data-n='3'], " + S + ".tv-puerta[data-n='21']{ grid-column:span 2; } }",
    "@supports not (width:1cqw){ " + S + ".tv-puertas{ --gl-celda:72px; } }",

    /* ---- Puerta (caja de regalo) ---- */
    S + ".tv-puerta{ --gl-k:1; position:relative; display:block; width:100%; height:100%; min-height:44px; padding:0; border:0; background:none; color:inherit; cursor:pointer; border-radius:6px; -webkit-tap-highlight-color:transparent; }",
    S + ".tv-puerta[data-n='24']{ --gl-k:1.7; }",
    S + ".tv-puerta:focus-visible{ outline:2px solid #f3d27a; outline-offset:4px; }",
    S + ".gl-regalo{ position:absolute; inset:0; display:block; transition:transform .35s cubic-bezier(.3,1.3,.5,1), filter .3s; }",
    S + ".gl-noir{ --gl-c1:#2a2127; --gl-c2:#0f0b0d; --gl-cin:#d9b768; --gl-cin-o:#a8833c; --gl-cin-l:#fbeec4; --gl-se-bg:#fbf6f0; --gl-se-tx:#1a1214; --gl-filete:rgba(201,164,92,.55); }",
    S + ".gl-rosa{ --gl-c1:#f7dfe2; --gl-c2:#e2adb6; --gl-cin:#221a1e; --gl-cin-o:#0b0809; --gl-cin-l:#6a585f; --gl-se-bg:#141012; --gl-se-tx:#ecd08a; --gl-filete:rgba(150,110,50,.5); }",
    S + ".gl-marfil{ --gl-c1:#fffaf3; --gl-c2:#eadbc6; --gl-cin:#e5a7b2; --gl-cin-o:#c4808e; --gl-cin-l:#fbe1e6; --gl-se-bg:#141012; --gl-se-tx:#ecd08a; --gl-filete:rgba(150,110,50,.45); }",
    /* cuerpo */
    S + ".gl-caja{ position:absolute; left:7%; right:7%; top:31%; bottom:3%; z-index:2; border:1px solid var(--gl-oro); border-radius:2px; overflow:hidden;" +
    " background:linear-gradient(160deg,var(--gl-c1) 0%,var(--gl-c2) 100%); box-shadow:0 10px 18px rgba(0,0,0,.45), inset 0 -10px 18px rgba(0,0,0,.12); }",
    S + ".gl-caja::after{ content:''; position:absolute; inset:3px; border:1px solid var(--gl-filete); pointer-events:none; }",
    S + ".gl-caja::before{ content:''; position:absolute; inset:0; background:linear-gradient(115deg,transparent 30%,rgba(255,246,220,.42) 46%,transparent 60%); background-size:260% 100%; background-position:120% 0; opacity:0; pointer-events:none; }",
    /* tapa */
    S + ".gl-tapa{ position:absolute; left:3%; right:3%; top:17%; height:17%; z-index:3; border:1px solid var(--gl-oro); border-radius:2px;" +
    " background:linear-gradient(175deg,var(--gl-c1) 0%,var(--gl-c2) 140%); box-shadow:0 4px 6px rgba(0,0,0,.35); transform-origin:15% 100%; transition:transform .5s cubic-bezier(.3,1.4,.5,1); }",
    S + ".gl-tapa::after{ content:''; position:absolute; left:0; right:0; top:0; height:40%; background:linear-gradient(180deg,rgba(255,255,255,.22),transparent); }",
    /* cinta de satén */
    S + ".gl-cinta{ position:absolute; left:50%; top:17%; bottom:3%; z-index:4; width:calc(var(--gl-celda) * .13 * var(--gl-k)); transform:translateX(-50%); transform-origin:50% 0;" +
    " background:linear-gradient(90deg,var(--gl-cin-o) 0%,var(--gl-cin) 22%,var(--gl-cin-l) 45%,var(--gl-cin) 62%,var(--gl-cin-o) 100%); box-shadow:0 0 0 .5px rgba(0,0,0,.25); }",
    /* lazo */
    S + ".gl-lazo{ position:absolute; left:50%; top:0; z-index:6; width:calc(var(--gl-celda) * .64 * var(--gl-k)); height:auto; aspect-ratio:60/34; transform:translateX(-50%); transform-origin:50% 60%; filter:drop-shadow(0 2px 2px rgba(0,0,0,.4)); overflow:visible; }",
    S + ".gl-lz-c{ fill:var(--gl-cin); } " + S + ".gl-lz-o{ fill:var(--gl-cin-o); } " + S + ".gl-lz-l{ fill:var(--gl-cin-l); opacity:.75; }",
    /* sello con el número */
    S + ".gl-sello{ position:absolute; left:50%; top:66%; z-index:5; width:calc(var(--gl-celda) * .46 * var(--gl-k)); aspect-ratio:1; transform:translate(-50%,-50%);" +
    " display:flex; align-items:center; justify-content:center; border-radius:50%; background:var(--gl-se-bg); color:var(--gl-se-tx);" +
    " border:1px solid var(--gl-oro); box-shadow:0 0 0 2px var(--gl-se-bg), 0 0 0 3px var(--gl-oro), 0 3px 8px rgba(0,0,0,.35); }",
    S + ".gl-num{ font-family:'Cormorant Garamond',Georgia,serif; font-weight:600; font-size:calc(var(--gl-celda) * .26 * var(--gl-k)); line-height:1; font-variant-numeric:lining-nums; margin-top:-.06em; }",
    /* candado */
    S + ".gl-candado{ position:absolute; right:calc(7% + 5px); bottom:calc(3% + 5px); z-index:6; width:13px; height:13px; color:var(--gl-oro-cl); filter:drop-shadow(0 1px 1px rgba(0,0,0,.6)); }",
    S + ".gl-rosa .gl-candado, " + S + ".gl-marfil .gl-candado{ color:#8a6526; filter:none; }",
    /* hoy */
    S + ".gl-hoy{ position:absolute; left:50%; bottom:-7px; z-index:7; transform:translateX(-50%); padding:3px 9px 3px 11px; border-radius:999px; white-space:nowrap;" +
    " background:linear-gradient(100deg,#c9a45c,#f6e3a8 50%,#c9a45c); color:#141012; font-size:.62rem; font-weight:500; letter-spacing:.24em; text-transform:uppercase; box-shadow:0 3px 8px rgba(0,0,0,.45); }",

    /* Estados */
    S + ".tv-puerta[data-estado='bloqueada'] .gl-regalo{ filter:saturate(.7) brightness(.82); }",
    S + ".tv-puerta[data-estado='bloqueada'] .gl-lazo{ filter:none; }",
    S + ".tv-puerta[data-estado='hoy'] .gl-regalo{ animation:glam-flota 3.2s ease-in-out infinite; }",
    S + ".tv-puerta[data-estado='hoy'] .gl-regalo::before{ content:''; position:absolute; inset:-10% -8% -6%; z-index:0; border-radius:50%; background:radial-gradient(closest-side, rgba(240,200,120,.55), rgba(232,170,184,.18) 60%, transparent); animation:glam-halo 2.4s ease-in-out infinite; }",
    S + ".tv-puerta[data-estado='hoy'] .gl-caja::before{ opacity:1; animation:glam-brillo 2.8s ease-in-out infinite; }",
    S + ".tv-puerta[data-estado='hoy'] .gl-lazo{ animation:glam-lazo-vive 3.2s ease-in-out infinite; }",
    S + ".tv-puerta[data-estado='hoy'] .gl-caja, " + S + ".tv-puerta[data-estado='hoy'] .gl-tapa{ border-color:#f6e3a8; box-shadow:0 0 0 1px rgba(246,227,168,.6), 0 0 22px 4px rgba(240,200,120,.5), 0 10px 18px rgba(0,0,0,.45); }",
    S + ".tv-puerta[data-estado='abierta'] .gl-tapa{ z-index:0; transform:translate(16%,-34%) rotate(13deg); filter:brightness(.9); }",
    S + ".tv-puerta[data-estado='abierta'] .gl-caja{ background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,transparent 22%), linear-gradient(160deg,var(--gl-c1) 0%,var(--gl-c2) 100%); }",
    S + ".tv-puerta[data-estado='abierta'] .gl-sello{ top:70%; width:calc(var(--gl-celda) * .38 * var(--gl-k)); }",
    S + ".tv-puerta[data-estado='abierta'] .gl-num{ font-size:calc(var(--gl-celda) * .22 * var(--gl-k)); }",
    S + ".gl-asomo{ position:absolute; left:50%; top:9%; z-index:1; width:calc(var(--gl-celda) * .44 * var(--gl-k)); aspect-ratio:1; transform:translateX(-50%) rotate(-6deg);" +
    " display:flex; align-items:center; justify-content:center; border-radius:50%; background:radial-gradient(circle at 35% 30%,#2a2026,#100c0e); border:1px solid var(--gl-oro); box-shadow:0 0 14px rgba(240,200,120,.45); }",
    S + ".gl-asomo svg{ width:56%; height:56%; fill:none; stroke:var(--gl-oro-cl); stroke-width:1.4; stroke-linecap:round; stroke-linejoin:round; }",
    S + ".gl-asomo::after{ content:''; position:absolute; right:-18%; top:-12%; width:34%; aspect-ratio:1; background:url(\"" + BRILLOS_URI + "\") center/300% no-repeat; }",

    /* Interacción */
    "@media (hover:hover){ " + S + ".tv-puerta:not([data-estado='bloqueada']):hover .gl-regalo{ transform:translateY(-4px); } " + S + ".tv-puerta:not([data-estado='bloqueada']):hover .gl-caja::before{ opacity:1; animation:glam-brillo 1.2s ease-out 1; } }",
    S + ".tv-puerta:active .gl-regalo{ transform:scale(.97); }",

    /* Abriendo (efecto) */
    S + ".tv-puerta.gl-abriendo .gl-regalo{ animation:none; }",
    S + ".tv-puerta.gl-abriendo .gl-lazo{ animation:glam-desata .48s cubic-bezier(.5,0,.8,.4) forwards; }",
    S + ".tv-puerta.gl-abriendo .gl-cinta{ animation:glam-cinta .42s .16s ease-in forwards; }",
    S + ".tv-puerta.gl-abriendo .gl-tapa{ animation:glam-tapa .5s .32s cubic-bezier(.3,1.5,.5,1) forwards; }",
    S + ".tv-puerta.gl-abriendo .gl-caja::before{ opacity:1; animation:glam-brillo .7s .2s ease-out 1 both; }",
    S + ".gl-fx{ position:absolute; inset:0; pointer-events:none; }",
    S + ".gl-fx > *{ position:absolute; left:0; top:0; will-change:transform,opacity; }",
    S + ".gl-destello{ width:160px; height:160px; margin:-80px 0 0 -80px; border-radius:50%; background:radial-gradient(closest-side, rgba(255,240,200,.9), rgba(240,200,120,.45) 40%, rgba(232,170,184,.15) 70%, transparent); mix-blend-mode:screen; }",
    S + ".gl-chispa{ width:15px; height:15px; margin:-7.5px 0 0 -7.5px; fill:#f1d58e; filter:drop-shadow(0 0 4px rgba(255,220,140,.9)); }",
    S + ".gl-confeti{ width:6px; height:12px; margin:-6px 0 0 -3px; border-radius:1px; }",
    S + ".gl-punto{ width:4px; height:4px; margin:-2px 0 0 -2px; border-radius:50%; background:#fff1c9; box-shadow:0 0 6px 1px rgba(255,220,140,.9); }",

    /* ---- Ventana de la sorpresa ---- */
    S + ".tv-modal{ background:rgba(10,7,9,.74); -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); }",
    S + ".tv-modal.on .tv-tarjeta{ animation:glam-entra .45s cubic-bezier(.2,.9,.3,1.1) both; }",
    S + ".tv-tarjeta{ position:relative; width:100%; max-width:420px; overflow:auto; text-align:center; color:#241a1d; border-radius:3px; padding:44px 26px 26px;" +
    " background:radial-gradient(120% 60% at 50% 0%, #fdebee 0%, rgba(253,235,238,0) 60%), #fbf6f0;" +
    " box-shadow:0 0 0 1px #c9a45c, 0 34px 80px rgba(0,0,0,.6); }",
    S + ".tv-tarjeta::before{ content:''; position:absolute; inset:9px; border:1px solid rgba(184,147,74,.55); pointer-events:none; }",
    S + ".tv-tarjeta::after{ content:''; position:absolute; top:12px; left:50%; width:58px; height:33px; transform:translateX(-50%); background:url(\"" + LAZO_URI + "\") center/contain no-repeat; pointer-events:none; }",
    S + ".tv-dia{ margin:14px 0 18px; font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-weight:500; font-size:2.2rem; line-height:1.05; color:var(--gl-oro-os); }",
    S + ".tv-dia::before{ content:'Tu sorpresa del'; display:block; margin-bottom:6px; font-family:'Jost',system-ui,sans-serif; font-style:normal; font-weight:400; font-size:.66rem; letter-spacing:.36em; text-transform:uppercase; color:#8a5f68; }",
    S + ".tv-dia::after{ content:''; display:block; width:110px; height:10px; margin:12px auto 0; background:url(\"" + DIVISOR_URI + "\") center/contain no-repeat; }",
    S + ".tv-contenido{ margin:0 0 20px; }",
    S + ".tv-msg{ margin:0; font-family:'Cormorant Garamond',Georgia,serif; font-weight:500; font-size:1.36rem; line-height:1.42; color:#2a1f22; }",
    S + ".tv-msg::before{ content:'\\201C'; display:block; height:.5em; margin-bottom:.15em; font-size:3.4rem; line-height:1; color:#c9a45c; }",
    /* foto */
    S + ".tv-foto{ margin:4px 6px 0; padding:10px 10px 6px; background:#fff; border:1px solid rgba(184,147,74,.5); box-shadow:0 14px 28px rgba(60,30,40,.18); transform:rotate(-1.2deg); }",
    S + ".tv-foto img{ display:block; width:100%; height:auto; border-radius:1px; }",
    S + ".tv-foto figcaption{ margin:8px 0 2px; font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-size:1.2rem; color:#5c4448; }",
    /* vale */
    S + ".tv-vale{ position:relative; margin:4px 2px 0; padding:26px 22px 22px; border:0; border-radius:6px; color:#fbf3ea;" +
    " background:radial-gradient(120% 90% at 50% 0%, #2c2127 0%, #141012 70%); box-shadow:inset 0 0 0 1px #c9a45c, inset 0 0 0 6px #141012, inset 0 0 0 7px rgba(201,164,92,.45), 0 12px 26px rgba(20,10,14,.3); }",
    S + ".tv-vale::before, " + S + ".tv-vale::after{ content:''; position:absolute; top:50%; width:20px; height:20px; margin-top:-10px; border-radius:50%; background:#fbf6f0; box-shadow:inset 0 0 0 1px #c9a45c; }",
    S + ".tv-vale::before{ left:-10px; } " + S + ".tv-vale::after{ right:-10px; }",
    S + ".tv-vale-por{ font-size:.7rem; font-weight:400; letter-spacing:.42em; text-transform:uppercase; color:var(--gl-oro-cl); padding-left:.42em; }",
    S + ".tv-vale-que{ margin:6px 0 8px; font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-weight:500; font-size:2.1rem; line-height:1.1; color:#f7dfe3; }",
    S + ".tv-vale-nota{ margin:0; font-size:.9rem; line-height:1.45; color:rgba(251,243,234,.86); opacity:1; }",
    /* canción */
    S + ".tv-cancion::before{ content:''; display:block; width:118px; height:118px; margin:2px auto 16px; border-radius:50%;" +
    " background:radial-gradient(circle at 50% 50%, #141012 0 3%, #e8b4bc 3.5% 18%, #c9a45c 18.5% 19.5%, transparent 20%), conic-gradient(from 20deg, rgba(255,240,200,0) 0 8%, rgba(255,240,200,.22) 12%, rgba(255,240,200,0) 18% 58%, rgba(255,240,200,.16) 62%, rgba(255,240,200,0) 68%), repeating-radial-gradient(circle, #141012 0 2px, #2a2126 2.5px 3.5px);" +
    " box-shadow:0 0 0 1px #c9a45c, 0 12px 26px rgba(20,10,14,.3); animation:glam-gira 9s linear infinite; }",
    S + ".tv-cancion-titulo{ margin:0 0 8px; font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-weight:500; font-size:1.75rem; color:#241a1d; }",
    S + ".tv-cancion-nota{ margin:0 0 18px; font-size:.98rem; color:#5c4448; }",
    S + ".tv-boton, " + S + ".tv-cerrar{ display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:46px; padding:12px 30px; border-radius:999px; cursor:pointer; text-decoration:none;" +
    " font-family:'Jost',system-ui,sans-serif; font-weight:500; font-size:.78rem; letter-spacing:.26em; text-transform:uppercase;" +
    " background:#141012; color:#f0d48a; border:1px solid #c9a45c; box-shadow:0 8px 18px rgba(20,10,14,.25); transition:transform .2s, box-shadow .2s, background .2s; }",
    S + ".tv-boton:hover, " + S + ".tv-cerrar:hover{ transform:translateY(-1px); box-shadow:0 12px 22px rgba(20,10,14,.3); background:#231b1f; }",
    S + ".tv-boton:focus-visible, " + S + ".tv-cerrar:focus-visible{ outline:2px solid #b8893a; outline-offset:3px; }",
    /* regalo */
    S + ".tv-regalo::before{ content:''; display:block; width:104px; height:94px; margin:0 auto 12px; background:url(\"" + REGALO_URI + "\") center/contain no-repeat; filter:drop-shadow(0 10px 12px rgba(60,30,40,.2)); }",
    S + ".tv-regalo-texto{ margin:0; font-family:'Cormorant Garamond',Georgia,serif; font-weight:600; font-size:1.55rem; line-height:1.2; color:#241a1d; }",
    S + ".tv-regalo-nota{ margin:10px 0 0; font-size:.95rem; color:#5c4448; opacity:1; }",
    /* firma */
    S + ".tv-firma{ margin:0 0 20px; font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-size:1.18rem; color:var(--gl-oro-os); opacity:1; }",
    /* final */
    S + ".tv-modal.tv-final .tv-tarjeta{ color:#fbf3ea; background:radial-gradient(closest-side at 50% 52%, rgba(24,18,21,.97) 0%, rgba(24,18,21,.94) 80%, rgba(24,18,21,0) 100%) 50% 56%/116% 80% no-repeat, url(\"" + BRILLOS_URI + "\") 0 0/180px 180px repeat, radial-gradient(120% 70% at 50% 0%, #3a2a31 0%, #141012 70%); box-shadow:0 0 0 1px #e6c983, 0 0 60px rgba(230,201,131,.25), 0 34px 80px rgba(0,0,0,.6); }",
    S + ".tv-modal.tv-final .tv-tarjeta::before{ border-color:rgba(230,201,131,.7); }",
    S + ".tv-modal.tv-final .tv-dia{ color:#ecd08a; } " + S + ".tv-modal.tv-final .tv-dia::before{ content:'La última puerta'; color:#f3d4d8; }",
    S + ".tv-modal.tv-final .tv-msg{ color:#fbeff1; } " + S + ".tv-modal.tv-final .tv-firma{ color:#e6c983; }",
    S + ".tv-modal.tv-final .tv-cerrar{ background:linear-gradient(100deg,#c9a45c,#f6e3a8 50%,#c9a45c); color:#141012; border-color:#f6e3a8; }",
    S + ".tv-modal.tv-final .tv-cerrar:focus-visible{ outline-color:#f6e3a8; }",

    /* aviso */
    S + ".tv-toast{ background:#141012; color:#f6e7c0; border:1px solid rgba(201,164,92,.75); border-radius:999px; padding:11px 20px; font-family:'Jost',system-ui,sans-serif; font-weight:400; font-size:.9rem; letter-spacing:.02em; box-shadow:0 10px 26px rgba(0,0,0,.5); }",

    /* ---- Animaciones ---- */
    "@keyframes glam-titila{ 0%,100%{ opacity:0; transform:scale(.4) rotate(0); } 50%{ opacity:.9; transform:scale(1) rotate(45deg); } }",
    "@keyframes glam-oro{ 0%,100%{ background-position:0% 0; } 50%{ background-position:100% 0; } }",
    "@keyframes glam-flota{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-4px); } }",
    "@keyframes glam-halo{ 0%,100%{ opacity:.55; transform:scale(.94); } 50%{ opacity:1; transform:scale(1.04); } }",
    "@keyframes glam-brillo{ 0%{ background-position:120% 0; } 60%,100%{ background-position:-30% 0; } }",
    "@keyframes glam-lazo-vive{ 0%,100%{ transform:translateX(-50%) rotate(0); } 25%{ transform:translateX(-50%) rotate(-4deg); } 75%{ transform:translateX(-50%) rotate(4deg); } }",
    "@keyframes glam-desata{ 0%{ transform:translateX(-50%) scale(1); opacity:1; } 30%{ transform:translateX(-50%) scale(1.18,.9) rotate(-6deg); opacity:1; } 100%{ transform:translateX(-50%) translateY(-60%) scale(.2) rotate(70deg); opacity:0; } }",
    "@keyframes glam-cinta{ to{ transform:translateX(-50%) scaleY(0); opacity:0; } }",
    "@keyframes glam-tapa{ 0%{ transform:none; } 100%{ transform:translate(16%,-34%) rotate(13deg); } }",
    "@keyframes glam-entra{ 0%{ opacity:0; transform:translateY(18px) scale(.96); } 100%{ opacity:1; transform:none; } }",
    "@keyframes glam-gira{ to{ transform:rotate(360deg); } }",
    "@media (prefers-reduced-motion: reduce){ " + S + "*, " + S + "*::before, " + S + "*::after{ animation:none !important; transition:none !important; } " + S + ".gl-brillo{ opacity:.6; } }"
  ].join("\n");

  /* Orden de las cajas, mezclado como en los calendarios de verdad */
  var ORDEN = [7, 15, 2, 19, 11, 24, 4, 22, 9, 1, 17, 13, 6, 20, 3, 14, 10, 23, 5, 18, 12, 8, 21, 16];
  var VARIANTES = ["noir", "rosa", "marfil"];
  var COLOR_VARIANTE = {};
  ORDEN.forEach(function (n, i) { COLOR_VARIANTE[n] = VARIANTES[(i + Math.floor(i / 4)) % 3]; });
  COLOR_VARIANTE[24] = "noir";

  function reducido() {
    try { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  function efecto(boton, capa) {
    var caja = document.createElement("div");
    caja.className = "gl-fx";
    capa.appendChild(caja);
    var r = boton.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height * 0.3;
    var animar = typeof caja.animate === "function";
    function quitar(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

    if (animar) {
      var d = document.createElement("div");
      d.className = "gl-destello";
      d.style.transform = "translate(" + cx + "px," + cy + "px)";
      caja.appendChild(d);
      d.animate([
        { transform: "translate(" + cx + "px," + cy + "px) scale(.2)", opacity: 0 },
        { transform: "translate(" + cx + "px," + cy + "px) scale(1)", opacity: 1, offset: .35 },
        { transform: "translate(" + cx + "px," + cy + "px) scale(1.5)", opacity: 0 }
      ], { duration: 900, delay: 220, easing: "ease-out", fill: "both" }).onfinish = function () { quitar(d); };

      var colores = ["#e6c983", "#f6e3a8", "#f3c6cf", "#e8a9b5", "#fbf6f0", "#c9a45c"];
      for (var i = 0; i < 46; i++) {
        var tipo = i % 3, el;
        if (tipo === 0) {
          el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          el.setAttribute("viewBox", "0 0 24 24");
          el.setAttribute("class", "gl-chispa");
          el.innerHTML = '<path d="' + ESTRELLA + '"/>';
        } else if (tipo === 1) {
          el = document.createElement("div");
          el.className = "gl-confeti";
          el.style.background = colores[i % colores.length];
        } else {
          el = document.createElement("div");
          el.className = "gl-punto";
        }
        caja.appendChild(el);
        var ang = (-90 + (Math.random() * 150 - 75)) * Math.PI / 180;
        var dist = (70 + Math.random() * 120) * Math.max(1, Math.min(1.8, r.width / 90));
        var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
        var giro = (Math.random() * 540 - 270) | 0;
        var esc = tipo === 0 ? .6 + Math.random() * .9 : 1;
        var dur = 900 + Math.random() * 500;
        var a = el.animate([
          { transform: "translate(" + cx + "px," + cy + "px) scale(" + (esc * .3) + ") rotate(0deg)", opacity: 0 },
          { transform: "translate(" + (cx + dx * .7) + "px," + (cy + dy * .7) + "px) scale(" + esc + ") rotate(" + (giro / 2) + "deg)", opacity: 1, offset: .35 },
          { transform: "translate(" + (cx + dx) + "px," + (cy + dy + 90) + "px) scale(" + (esc * .7) + ") rotate(" + giro + "deg)", opacity: 0 }
        ], { duration: dur, delay: 240 + Math.random() * 120, easing: "cubic-bezier(.15,.7,.35,1)", fill: "both" });
        a.onfinish = (function (x) { return function () { quitar(x); }; })(el);
      }
    }
    setTimeout(function () { quitar(caja); }, 2200);
  }

  (window.TEMAS_VIRTUAL = window.TEMAS_VIRTUAL || []).push({
    id: "glam",
    nombre: "Glam",
    emoji: "🖤",
    descripcion: "Boutique de lujo: cajitas negras, doradas y rosa empolvado",
    fuentes: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap",
    color: "#141012",
    css: css,
    orden: ORDEN,

    escena: function () {
      return '<div class="gl-escena">' +
        guirnalda() + brillos() +
        '<header class="gl-cabecera">' +
        '<p class="gl-sobre">Edición especial · Diciembre</p>' +
        '<h1 class="gl-titulo">Calendario <em>de adviento</em></h1>' +
        DIVISOR +
        '<p class="tv-para"></p>' +
        '<p class="tv-cuenta"></p>' +
        "</header>" +
        '<section class="gl-vitrina" aria-label="Cajitas de regalo">' +
        '<div class="gl-marco">' +
        '<span class="gl-esq gl-esq-1" aria-hidden="true">' + ESQUINA + "</span>" +
        '<span class="gl-esq gl-esq-2" aria-hidden="true">' + ESQUINA + "</span>" +
        '<span class="gl-esq gl-esq-3" aria-hidden="true">' + ESQUINA + "</span>" +
        '<span class="gl-esq gl-esq-4" aria-hidden="true">' + ESQUINA + "</span>" +
        '<div class="tv-puertas"></div>' +
        "</div></section>" +
        '<p class="gl-pie">Un pequeño lujo para cada día</p>' +
        "</div>";
    },

    puerta: function (n, estado) {
      var v = COLOR_VARIANTE[n] || "noir";
      var abierta = estado === "abierta";
      return '<span class="gl-regalo gl-' + v + '" aria-hidden="true">' +
        (abierta ? '<span class="gl-asomo">' + icono(n) + "</span>" : "") +
        '<span class="gl-caja"></span>' +
        '<span class="gl-tapa"></span>' +
        (abierta ? "" : '<span class="gl-cinta"></span>' + LAZO) +
        '<span class="gl-sello"><span class="gl-num">' + n + "</span></span>" +
        (estado === "hoy" ? '<span class="gl-hoy">Hoy</span>' : "") +
        (estado === "bloqueada" ? CANDADO : "") +
        "</span>";
    },

    alAbrir: function (boton, n, capa) {
      return new Promise(function (resolver) {
        if (reducido()) { resolver(); return; }
        try {
          boton.classList.add("gl-abriendo");
          if (capa) efecto(boton, capa);
        } catch (e) { /* si algo falla, igual se abre */ }
        setTimeout(function () {
          boton.classList.remove("gl-abriendo");
          resolver();
        }, 820);
      });
    }
  });
})();
