/* 세계관: 여러 작품이 공유하는 세계의 요소 · 세계의 규칙(법칙, 응보) · 주변 정보(역사 연표, 고사)
   data/world.js 가 W_WORLD.push({...}) 로 들어온다. 근거는 모두 {w,c,p,find} 로 본문에 연결된다. */
(function () {
  const css = document.createElement('style');
  css.textContent = `
  body.mode-world .wrap{grid-template-columns:minmax(0,1fr)!important}
  body.mode-world section.reader{display:none}
  body.mode-world.ev-open section.reader{display:block;position:fixed;top:0;right:0;bottom:0;width:min(640px,94vw);z-index:16;box-shadow:-12px 0 32px rgba(10,42,94,.22);border-left:1px solid var(--line)}
  body.mode-world.ev-open section.reader .rhead{padding-right:132px}
  #evx{display:none}
  body.mode-world.ev-open #evx{display:block;position:fixed;top:9px;right:14px;z-index:17;font:inherit;font-size:13px;font-weight:800;color:#fff;background:var(--navy);border:0;border-radius:16px;padding:7px 14px;cursor:pointer}
  #evshade{display:none}
  body.mode-world.ev-open #evshade{display:block;position:fixed;inset:0;z-index:15;background:rgba(10,42,94,.18)}
  .wv-sub{display:flex;gap:10px 22px;flex-wrap:wrap;margin:0 0 10px;align-items:center}
  .wv-g{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .wv-g.sep{padding-left:22px;border-left:1px solid var(--line)}
  .wv-g.side button{border-style:dashed}
  .wv-g.side button.on{border-style:solid}
  .wv-gl{font-size:13px;font-weight:800;color:var(--muted);margin-right:4px}
  .wv-subsub{display:flex;gap:4px 6px;flex-wrap:wrap;align-items:flex-end;margin:0 0 12px;padding:4px 0 0;border-bottom:1px solid var(--line)}
  .wv-subsub .eqw{margin-left:auto;padding:0 0 6px;flex:0 1 230px;min-width:160px}
  .wv-subsub .eqw input,.ebar input{font:inherit;font-size:13px;width:100%;padding:6px 10px;border:1px solid var(--line);border-radius:4px;background:#fff}
  .ebar input{flex:0 1 260px;min-width:160px}
  .wv-subsub button{font:inherit;font-size:15px;font-weight:800;color:var(--muted);background:none;border:0;border-bottom:3px solid transparent;padding:8px 12px 9px;margin-bottom:-1px;cursor:pointer;display:inline-flex;align-items:baseline;gap:6px}
  .wv-subsub button small{font-size:12px;font-weight:700;color:#8A95A0}
  .wv-subsub button:hover{color:var(--text)}
  .wv-subsub button.on{color:var(--cc);border-bottom-color:var(--cc)}
  .wv-subsub button.on small{color:var(--cc)}
  .wv-subsub button:focus-visible{outline:2px solid var(--blue);outline-offset:-2px}
  .enote{font-size:12px;color:var(--muted);flex:1 1 260px;line-height:1.5}
  @media (max-width:600px){.wv-g.sep{padding-left:0;border-left:0}}
  .wv-sub button{font:inherit;font-size:15px;font-weight:800;border:1px solid var(--line);background:#fff;color:var(--muted);border-radius:20px;padding:8px 18px;cursor:pointer}
  .wv-sub button.on{background:var(--navy);border-color:var(--navy);color:#fff}
  .wv-sub button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
  .wv-head{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap;margin-bottom:4px}
  .wv-head h4{margin:0;font-size:16px;color:var(--navy)}
  .wv-works{display:flex;gap:10px;flex-wrap:wrap;font-size:12px;color:var(--muted)}
  .wv-works span{display:inline-flex;align-items:center;gap:5px}
  .wsym{display:inline-block;width:10px;height:10px;flex:none}
  .wsym.c{border-radius:50%}.wsym.s{border-radius:2px}
  .law{border:1px solid var(--line);border-radius:6px;background:#fff;margin-bottom:10px}
  .law .top{display:grid;grid-template-columns:auto 1fr auto;gap:12px;padding:12px 14px;cursor:pointer;align-items:start}
  .law .top:hover{background:#FAFCFE}
  .law .lid{font-size:11px;font-weight:800;color:#fff;background:var(--navy);border-radius:3px;padding:2px 6px;margin-top:2px}
  .law .stmt{font-size:14.5px;font-weight:800;color:var(--text);line-height:1.45;text-wrap:balance}
  .law .desc{font-size:12.5px;color:var(--muted);line-height:1.6;margin-top:4px}
  .verd{font-size:11px;font-weight:800;border-radius:10px;padding:2px 9px;white-space:nowrap}
  .verd.v1{background:#DDF0E5;color:#145C3A}.verd.v2{background:#E6F0FA;color:#0A2A5E}.verd.v3{background:#FFF0C7;color:#7A5300}.verd.v4{background:#F3E1E1;color:#8A2A2A}
  .tally{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:6px 18px;padding:0 14px 12px 14px}
  .tally .row{font-size:11.5px;color:var(--muted)}
  .tally .bar{display:flex;height:9px;border-radius:2px;overflow:hidden;background:#F0F3F7;margin-top:3px}
  .tally .bar i{display:block;height:100%}
  .tally b{color:var(--text)}
  .law .why{font-size:12.5px;line-height:1.65;padding:0 14px 12px;color:var(--text)}
  .law .rvline{font-size:11.5px;color:#145C3A;background:#F1F8F4;border-top:1px solid var(--line);padding:5px 14px}
  .rvbox{border:1px solid #BFE0CC;background:#F6FBF8;border-radius:6px;padding:12px 14px;margin-bottom:12px}
  .rvbox .rvh{font-size:13px;font-weight:800;color:#145C3A;margin-bottom:8px}.rvbox .rvh span{font-weight:400;color:var(--muted);font-size:11.5px;margin-left:6px}
  .rvbox .rvn{display:flex;flex-wrap:wrap;gap:8px 22px;margin-bottom:8px}.rvbox .rvn div{display:flex;flex-direction:column}
  .rvbox .rvn b{font-size:18px;color:#0A2A5E}.rvbox .rvn span{font-size:11px;color:var(--muted)}
  .rvbox p{font-size:12px;line-height:1.6;margin:0;color:var(--text)}
  .law .why span{font-size:11px;font-weight:800;color:var(--muted);margin-right:6px}
  .cases{border-top:1px solid var(--line);padding:6px 10px 10px}
  .lnotes{border-top:1px solid var(--line);padding:10px 14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px 16px}
  .lnotes .lnh{grid-column:1/-1;font-size:11.5px;font-weight:800;color:var(--muted)}
  .lnotes .ln{font-size:12.5px;line-height:1.6}
  .lnotes .ln b{display:flex;align-items:center;gap:5px;color:var(--navy);font-size:12px;margin-bottom:2px}
  .cfil{display:flex;gap:6px;flex-wrap:wrap;padding:6px 4px}
  .case{display:grid;grid-template-columns:96px 1fr;gap:10px;padding:8px 4px;border-bottom:1px solid #EEF2F6;font-size:12.5px;line-height:1.6}
  .case:last-child{border-bottom:0}
  .case .loc{font-size:11.5px;color:var(--muted)}
  .case .loc b{display:flex;align-items:center;gap:5px;color:var(--navy);font-size:12px}
  .case .t{font-weight:800;color:var(--text)}
  .case q{display:block;quotes:none;color:var(--text);background:#FAFBFD;border-left:3px solid var(--light);padding:3px 8px;margin:4px 0;cursor:pointer}
  .case q:hover{background:var(--tint)}
  .case q em{font-style:normal;font-weight:800;background:#FFE8A8;border-radius:2px}
  .case .nt{color:var(--muted)}
  .case .pr{font-size:11.5px;color:var(--blue);cursor:pointer;font-weight:800}
  .kpill{font-size:10.5px;font-weight:800;border-radius:3px;padding:1px 6px;white-space:nowrap}
  .kpill.ok{background:#DDF0E5;color:#145C3A}.kpill.ex{background:#FDE3D3;color:#9A3412}
  .tl svg{display:block;width:100%;height:auto}
  .tl text{font-size:10.5px;fill:var(--text)}
  .tl .ax text{fill:#8A949D;font-size:9.5px}
  .tl .dot{cursor:pointer}
  .tl .dot:hover{stroke:var(--text);stroke-width:1.5px}
  .tlleg{display:flex;gap:12px;flex-wrap:wrap;font-size:11.5px;color:var(--muted);margin:6px 0}
  .tlleg span{display:inline-flex;gap:5px;align-items:center;white-space:nowrap}
  .roots{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
  .root{border:1px solid var(--line);border-radius:5px;padding:8px 10px;font-size:12.5px;line-height:1.55;cursor:pointer;background:#fff}
  .root:hover{background:var(--tint)}
  .root b{color:var(--navy)}
  .fm{border-collapse:separate;border-spacing:2px;font-size:12px;width:100%;min-width:640px}
  .fm th{font-size:11px;color:var(--muted);font-weight:800;text-align:left;padding:4px;white-space:nowrap}
  .fm td{vertical-align:top;padding:5px;border-radius:4px;background:#F7F9FB;min-width:70px}
  .fm td.z1{background:#E9F5EE}.fm td.z2{background:#EEF3FA}
  .fm td.rh{background:none;font-weight:800;color:var(--text);white-space:nowrap;font-size:12px}
  .vchip{display:inline-flex;align-items:center;gap:4px;margin:2px;padding:2px 7px;border-radius:11px;background:#fff;border:1px solid var(--line);cursor:pointer;font-size:12px;line-height:1.4}
  .vchip.ex{border:1.5px solid #C2410C}
  .vchip:hover{background:var(--tint)}
  .vchip.on{outline:2px solid var(--orange)}
  .zleg{display:flex;gap:14px;flex-wrap:wrap;font-size:11.5px;color:var(--muted);margin:8px 0}
  .zleg i{display:inline-block;width:12px;height:12px;border-radius:2px;vertical-align:-2px;margin-right:4px}
  .vd{font-size:12.5px;line-height:1.65}
  .vd h5{margin:0 0 4px;font-size:14px;color:var(--navy)}
  .enc{width:100%;border-collapse:collapse;font-size:12.5px}
  .enc th{font-size:11px;color:var(--muted);font-weight:800;text-align:left;padding:6px 4px;border-bottom:1px solid var(--line)}
  .enc td{padding:7px 4px;border-bottom:1px solid #EEF2F6;vertical-align:top;line-height:1.55}
  .enc td.k b{color:var(--navy)}
  .uchip{display:inline-block;margin:1px 3px 1px 0;padding:1px 7px;border-radius:10px;font-size:11.5px;cursor:pointer;border:1px solid var(--line);background:#fff}
  .uchip:hover{background:var(--tint)}
  .sp{display:grid;grid-template-columns:150px minmax(0,1fr) minmax(0,1fr);gap:0;font-size:12.5px}
  .sp > div{padding:8px 6px;border-bottom:1px solid #EEF2F6}
  .sp .h{font-size:11px;color:var(--muted);font-weight:800}
  .sp .f{font-weight:800;color:var(--text)}
  .pchip{display:inline-block;margin:1px 3px 2px 0;padding:1px 7px;border-radius:10px;font-size:11.5px;background:var(--tint);cursor:pointer}
  .pchip:hover{background:var(--light)}
  .pchip small{color:var(--muted);margin-left:3px}
  .pat{border-left:3px solid var(--orange);background:#fff;padding:8px 12px;margin-bottom:8px;border-radius:0 5px 5px 0}
  .pat b{display:block;color:var(--navy);font-size:13.5px;margin-bottom:2px}
  .pat span{font-size:12.5px;color:var(--muted);line-height:1.6}
  .ebar{position:sticky;top:-16px;z-index:3;padding:10px 14px}
  .etiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}
  .egrp{font-size:11.5px;font-weight:800;color:var(--muted);margin:12px 0 6px}
  .egrp:first-child{margin-top:0}
  .etile{font:inherit;text-align:left;background:#fff;border:1px solid var(--line);border-left:3px solid var(--cc);border-radius:5px;padding:7px 9px;cursor:pointer;display:flex;flex-direction:column;gap:4px;min-width:0}
  .etile:hover{background:var(--tint)}
  .etile.on{background:var(--navy);border-color:var(--navy);border-left-color:var(--cc)}
  .etile.on b,.etile.on small{color:#fff}
  .etile b{font-size:13px;color:var(--text);line-height:1.35}
  .etile small{font-size:10.5px;color:var(--muted);font-variant-numeric:tabular-nums}
  .eds{display:flex;gap:3px;align-items:center}
  .eds i{width:9px;height:9px;border-radius:50%;border:1.5px solid #C7CFD8;background:transparent;flex:none}
  .eds i.s{border-radius:2px}
  .eds small{margin-left:4px}
  .eds.big i{width:12px;height:12px}
  .etile.on .eds i:not([style*=background]){border-color:rgba(255,255,255,.4)}
  .eshare{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:12.5px;color:var(--muted);margin:6px 0 2px}
  .eshare b{font-size:18px;color:var(--navy)}
  .eshare span{font-size:11.5px}
  .eabs{font-size:12px;color:var(--muted);margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .etile:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
  .edet{border-top:4px solid var(--cc);padding:18px 20px}
  .edet .eyebrow{font-size:11.5px;font-weight:800;color:var(--cc);letter-spacing:.3px}
  .edet h3{margin:4px 0 8px;font-size:22px;color:var(--navy);text-wrap:balance}
  .edet .hj{font-size:15px;color:var(--muted);font-weight:400}
  .edet .edef{font-size:14.5px;line-height:1.7;margin:0 0 6px;max-width:62ch}
  .edet .esrc{font-size:12.5px;color:var(--muted);line-height:1.6;margin:0 0 6px}
  .ecols{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin-top:12px}
  .ecol{background:#FAFBFD;border-radius:6px;padding:10px 12px}
  .ecol .eh{display:flex;align-items:center;gap:6px;font-weight:800;color:var(--navy);font-size:13px;margin-bottom:6px}
  .ecol .eh small{margin-left:auto;color:var(--muted);font-weight:400}
  .eit{padding:7px 0;border-top:1px solid #EEF2F6;font-size:12.5px;line-height:1.6}
  .eit:first-of-type{border-top:0}
  .eit .en{font-weight:800;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
  .eit .ef{font-size:10.5px;font-weight:800;background:#FDE3D3;color:#9A3412;border-radius:3px;padding:0 5px}
  .eit .ew{font-size:11px;color:var(--muted);font-weight:400}
  .eit q{display:block;quotes:none;background:#fff;border-left:3px solid var(--light);padding:3px 8px;margin:4px 0;cursor:pointer}
  .eit q:hover{background:var(--tint)}
  .eit q em{font-style:normal;font-weight:800;background:#FFE8A8;border-radius:2px}
  .eit .nt{color:var(--muted)}
  .eit .eloc{font-size:11px;color:#8A949D;white-space:nowrap}
  .ecmp{margin-top:14px;border-left:3px solid var(--orange);background:#FFFBF0;padding:9px 12px;font-size:13px;line-height:1.7;border-radius:0 5px 5px 0}
  .ecmp span{display:block;font-size:11px;font-weight:800;color:#7A5300;margin-bottom:2px}
  .lrow{margin-top:16px;padding-top:12px;border-top:1px solid #EEF2F6}
  .lh{font-size:12px;font-weight:800;color:var(--text);margin-bottom:8px;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
  .lh small{font-weight:400;color:var(--muted);font-size:11.5px}
  .lchips{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:6px}
  .elaw{font:inherit;font-size:12.5px;font-weight:800;text-align:left;border:1px solid var(--navy);color:var(--navy);background:#fff;border-radius:5px;padding:7px 10px;cursor:pointer;line-height:1.45;display:flex;gap:8px;align-items:flex-start;grid-column:span 2}
  .elaw .lid{font-size:10.5px;color:#fff;background:var(--navy);border-radius:3px;padding:1px 5px;flex:none;margin-top:1px}
  .erel{font:inherit;text-align:left;border:1px solid var(--line);border-left:3px solid var(--cc);background:#fff;border-radius:5px;padding:6px 10px;cursor:pointer;display:flex;flex-direction:column;gap:2px;min-width:0}
  .erel .lc{font-size:10.5px;color:var(--cc);font-weight:800}
  .erel b{font-size:13px;color:var(--text);line-height:1.35}
  .erel .lw{font-size:11px;color:var(--muted)}
  .elaw:focus-visible,.erel:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
  .elaw:hover,.erel:hover{background:var(--tint)}
  .emap{margin-top:10px}.emap svg{display:block;width:100%;max-width:560px;height:auto;border:1px solid var(--line);border-radius:5px}
  #edet{scroll-margin-top:64px}
  .hm{margin:14px 0 4px}
  .hmf{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
  .hplan{display:grid;grid-template-columns:minmax(0,3fr) 26px minmax(0,1.1fr);align-items:stretch}
  .hcomp{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-areas:"g g s" "j m c" "i i i" "t t t" "o o o";gap:8px;padding:26px 12px 26px;border:3px solid #9C8B72;border-radius:4px;background:#FBF8F1}
  .hside{display:contents}
  .hdoor{display:flex;align-items:center;justify-content:center}
  .hdoor span{writing-mode:vertical-rl;font-size:11px;color:#8A7A62;font-weight:800;letter-spacing:2px;border-top:2px dashed #9C8B72;border-bottom:2px dashed #9C8B72;padding:6px 0}
  .hside .hz{border:3px solid #B9A27A;border-radius:4px;background:#FFF9EC}
  .hlab{position:absolute;left:50%;transform:translateX(-50%);font-size:11px;font-weight:800;color:#8A7A62;background:#FBF8F1;padding:0 8px}
  .hback{top:4px}.hfront{bottom:-10px;border:2px solid #9C8B72;border-radius:3px;background:#fff}
  .hgate{display:flex;align-items:center;gap:8px}
  .hgate::before,.hgate::after{content:"";flex:1;border-top:2px dashed #B9A98F}
  .hgate span{font-size:11px;font-weight:800;color:#8A7A62}
  .hz{background:#fff;border:1px solid #E3DACB;border-radius:5px;padding:8px 9px;min-width:0;transition:opacity .15s}
  .hz.dim{opacity:.38}
  .hz.hl{border:2px solid var(--cA);box-shadow:0 0 0 3px rgba(194,65,12,.12)}
  .hzh{display:flex;align-items:baseline;gap:6px}
  .hzh b{font-size:13px;color:var(--navy)}
  .hzh small{font-size:11px;color:var(--muted);margin-left:auto}
  .hzc{font-size:11px;color:var(--muted);line-height:1.45;margin:2px 0 6px}
  .z-JAIL{background:#F6F0F0;border-color:#D9C3C3}
  .hcs{display:flex;flex-wrap:wrap;gap:4px}
  .hc{font:inherit;font-size:12px;display:inline-flex;align-items:center;gap:4px;background:#F4F6F9;border:1px solid transparent;border-radius:11px;padding:2px 8px;cursor:pointer;color:var(--text)}
  .hc:hover{border-color:var(--line);background:#fff}
  .hc.on{border-color:var(--navy);background:#fff;font-weight:800}
  .hnone{font-size:11px;color:#A5AEB7}
  .hoff{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}
  .hoff .hz{border-style:dashed}
  .hinfo{margin-top:10px;font-size:12.5px;line-height:1.6;color:var(--muted);background:#F8FAFC;border:1px solid var(--line);border-radius:6px;padding:9px 12px}
  .hinfo b{color:var(--navy)}
  .hinfo .hzn{font-size:11px;color:var(--cA);font-weight:800;margin-left:4px}
  .hinfo div{color:var(--text);margin:3px 0}
  .hinfo q{display:block;quotes:none;font-size:12.5px;color:var(--text);border-left:3px solid var(--line);padding:3px 8px;margin:5px 0 2px;cursor:pointer}
  .hinfo q:hover{border-left-color:var(--orange);background:#FFFBEF}
  .hinfo q em{font-style:normal;font-weight:800;background:#FFE8A8}
  @media (max-width:760px){.hplan{grid-template-columns:1fr}.hdoor{padding:6px 0}.hdoor span{writing-mode:horizontal-tb;border:0}.hcomp{grid-template-areas:"g g g" "s s s" "j j j" "m m m" "c c c" "i i i" "t t t" "o o o"}.hoff{grid-template-columns:1fr}}
  @media (min-width:1100px){
    .emd{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);gap:14px;align-items:start}
    .emd #eboard .etiles{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}
    .emd #edet{position:sticky;top:0;max-height:calc(100vh - 84px);overflow:auto;border-radius:6px}
    .emd #edet .card{margin-bottom:0}
    .emd .ecols{grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}
  }
  .emap text{font-size:11px;fill:var(--text);paint-order:stroke;stroke:#FBFCFE;stroke-width:3px}
  .emap .gx{fill:#9AA4AE;font-size:9px}
  .emap .mk{cursor:pointer}
  @media (max-width:900px){.ecols{grid-template-columns:1fr}.tally{grid-template-columns:1fr}.case{grid-template-columns:1fr}.sp{grid-template-columns:100px minmax(0,1fr) minmax(0,1fr)}}
  `;
  document.head.appendChild(css);

  let WD = null, loadP = null, view = 'enc';
  try { const v = localStorage.getItem('gd_wv2'); if (v) view = v; } catch (e) {}
  const st2 = { open: new Set(), cf: {}, fsel: null, tsel: null, ckind: '' };
  window.W_WORLD = { push(o) { WD = o; } };
  function load() {
    if (WD) return Promise.resolve();
    return loadP || (loadP = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'data/world.js'; s.onload = ok; s.onerror = () => { loadP = null; no(); }; document.head.appendChild(s); }));
  }
  const wk = id => WD.works.find(w => w.id === id);
  const sym = id => { const w = wk(id); return `<i class="wsym ${w.shape === 's' ? 's' : 'c'}" style="background:${w.color}"></i>`; };
  const WOBJ = id => W.find(x => x.id === id);
  function locate(e) {
    const w = WOBJ(e.w); if (!w || !w.loaded || !w.byUnit[e.c]) return null;
    const idxs = w.byUnit[e.c]; let i = idxs[e.p - 1], pos = i != null ? w.paras[i].t.indexOf(e.find) : -1;
    if (pos < 0) { for (const j of idxs) { const q = w.paras[j].t.indexOf(e.find); if (q >= 0) { i = j; pos = q; break; } } }
    return pos < 0 ? { w, i: idxs[0], pos: -1 } : { w, i, pos };
  }
  function snip(e, n) {
    if (e.q) { const [a, m, b] = e.q; return `${a ? '…' + esc(a) : ''}<em>${esc(m)}</em>${b ? esc(b) + '…' : ''}`; }
    n = n || 60; const L0 = locate(e);
    if (!L0 || L0.pos < 0) return esc(e.find || '');
    const t = L0.w.paras[L0.i].t, a = L0.pos, b = a + e.find.length, L = Math.max(0, a - n), R = Math.min(t.length, b + n);
    return `${L > 0 ? '…' : ''}${esc(t.slice(L, a))}<em>${esc(t.slice(a, b))}</em>${esc(t.slice(b, R))}${R < t.length ? '…' : ''}`;
  }
  // 세계관 화면에서는 본문 창을 평소엔 숨기고, 근거 대목을 누를 때만 오른쪽에서 밀어 연다
  function evPanel(on) {
    document.body.classList.toggle('ev-open', !!on);
    let x = document.getElementById('evx');
    if (on && !x) {
      x = document.createElement('button'); x.id = 'evx'; x.type = 'button'; x.setAttribute('aria-label', '본문 닫기'); x.textContent = '본문 닫기 ✕';
      x.onclick = () => evPanel(false); document.body.appendChild(x);
      const sh = document.createElement('div'); sh.id = 'evshade'; sh.onclick = () => evPanel(false); document.body.appendChild(sh);
      document.addEventListener('keydown', ev => { if (ev.key === 'Escape') evPanel(false); });
    }
  }
  window.__evPanel = evPanel;
  function openEv(e) {
    if (!WOBJ(e.w)) return; // 공개판: 현대어역 본문이 없으면 열지 않는다
    evPanel(true);
    const r = document.getElementById('reader');
    if (!(WOBJ(e.w) || {}).loaded && r) r.innerHTML = `<div class="empty">${esc(wk(e.w).title)} 본문을 불러오는 중입니다…</div>`;
    ensure([e.w]).then(() => openEv2(e)).catch(() => { if (r) r.innerHTML = '<div class="empty">본문을 불러오지 못했습니다. 다시 눌러 주세요.</div>'; });
  }
  function openEv2(e) {
    const L0 = locate(e); if (!L0) return;
    if (L0.pos < 0) window.__gd.openUnit(L0.w, e.c); else window.__gd.openAt(L0.w, L0.i, L0.pos, L0.pos + e.find.length, null);
  }
  const loc = e => `${e.c}${wk(e.w).unit}${e.p ? ' · ' + e.p + '문단' : ''}`;

  // ---------- 법칙 판정 ----------
  const UP = ['존속', '형제·동서', '적처', '자녀·조카'];
  const DOWN = ['첩', '문객·하인', '외부 관료', '궁중·황실', '외적·반란'];
  function l3(v) {
    if (v.end === '미해결') return null;
    const soft = ['개과', '용서'].includes(v.end), hard = ['유배·축출', '처형', '자멸·병사'].includes(v.end);
    if (/^예외/.test(v.note || '')) return '예외';
    if (UP.includes(v.pos)) return soft ? '작동' : '예외';
    if (DOWN.includes(v.pos)) return hard ? '작동' : '예외';
    return null;
  }
  function allCases() {
    const out = [];
    (WD.roots || []).forEach(r => out.push({ law: 'L1', w: r.w, c: r.c, p: r.p, find: r.find, kind: '작동', t: `${r.family} ← ${r.root}`, note: [r.how, r.note].filter(Boolean).join('. '), conf: r.conf }));
    (WD.contacts || []).forEach(x => {
      if (x.kind === '접속') out.push({ law: 'L1', w: x.w, c: x.c, p: x.p, find: x.find, kind: '작동', t: x.who, note: x.note, conf: x.conf });
      // L2: 큰 줄기(즉위·붕어·계승)는 지키고 곁가지를 바꾼다. 운수 표시는 판정과 별개의 꼬리표.
      if (x.kind === '개입·보존' || (x.kind === '보존' && x.l2)) out.push({ law: 'L2', w: x.w, c: x.c, p: x.p, find: x.find, kind: '작동', t: x.who + ' · 큰 줄기 보존' + (x.l2 ? ' · 운수로 설명' : ''), note: x.note, conf: x.conf, hl: x.l2 });
      if (x.kind === '변경') out.push({ law: 'L2', w: x.w, c: x.c, p: x.p, find: x.find, kind: x.trunk ? '예외' : '작동', t: x.who + (x.trunk ? ' · 큰 줄기 변경' : ' · 곁가지 변경') + (x.l2 ? ' · 운수로 설명' : ''), note: x.note, conf: x.conf, hl: x.l2 });
    });
    (WD.villains || []).forEach(v => { const k = l3(v); if (k) out.push({ law: 'L3', w: v.w, c: v.c, p: v.p, find: v.find, kind: k, t: `${v.name} (${v.pos}) → ${v.end}`, note: `${v.crime}. ${v.note || ''}`, conf: v.conf, pair: v.crime_at ? Object.assign({ lab: '악행 대목' }, v.crime_at) : null }); });
    (WD.cases || []).forEach(c => out.push(Object.assign({}, c, { pair: c.pair ? Object.assign({ lab: c.law === 'L4' ? '실현 대목' : c.law === 'L5' ? '바로잡히는 대목' : '결과 대목' }, c.pair) : null })));
    (WD.villains || []).forEach(v => out.push({ law: 'L7', w: v.w, c: v.c, p: v.p, find: v.find, kind: v.end === '미해결' ? '예외' : '작동', t: `${v.name} (${v.pos}) → ${v.end}`, note: `${v.crime}. ${v.note || ''}`, conf: v.conf, pair: v.crime_at ? Object.assign({ lab: '악행 대목' }, v.crime_at) : null }));
    (WD.villains || []).filter(v => v.pos === '존속').forEach(v => out.push({ law: 'L8', w: v.w, c: v.c, p: v.p, find: v.find, kind: ['개과', '용서'].includes(v.end) ? '작동' : '예외', t: `${v.name} → ${v.end}`, note: `${v.rel || ''}. ${v.note || ''}`, conf: v.conf, pair: v.crime_at ? Object.assign({ lab: '박해 대목' }, v.crime_at) : null }));
    ((WD.enc || []).find(e => e.id === 'T03') || { items: [] }).items.forEach(i => out.push({ law: 'L8', w: i.w, c: i.c, p: i.p, find: i.find, kind: '작동', t: `${i.name || ''}의 효`, note: i.note || '', conf: '확인' }));
    return out;
  }
  const VCLS = { '강하게 성립': 'v1', '대체로 성립': 'v2', '부분 성립': 'v3', '약함': 'v4' };

  function drawLaws(el) {
    const C = allCases();
    el.innerHTML = WD.laws.map(L => {
      const cs = C.filter(c => c.law === L.id);
      const tal = WD.works.map(w => { const a = cs.filter(c => c.w === w.id && c.kind === '작동').length, b = cs.filter(c => c.w === w.id && c.kind === '예외').length, mx = Math.max(1, ...WD.works.map(x => cs.filter(c => c.w === x.id).length)); return `<div class="row">${sym(w.id)} ${w.title} · 작동 <b>${a}</b> · 예외 <b>${b}</b><div class="bar"><i style="width:${a / mx * 100}%;background:${w.color}"></i><i style="width:${b / mx * 100}%;background:#E8A07A"></i></div></div>`; }).join('');
      const open = st2.open.has(L.id);
      const RV = WD.review && WD.review.laws && WD.review.laws[L.id];
      const rvLine = RV ? `<div class="rvline">표본 검수 ${RV[0] + RV[1] + RV[2]}건 · 일치 <b>${RV[0]}</b>${RV[1] ? ` · 수정 <b>${RV[1]}</b>` : ''}${RV[2] ? ` · 보류 <b>${RV[2]}</b>` : ''}${L.id === 'L2' ? ' · 검수 결과에 따라 법칙을 다시 정의함, 재검수 예정' : ''}</div>` : '';
      return `<div class="law" data-l="${L.id}"><div class="top" role="button" tabindex="0" aria-expanded="${open}"><span class="lid">${L.id}</span><div><div class="stmt">${esc(L.t)}</div><div class="desc">${esc(L.desc || '')}</div></div><span class="verd ${VCLS[L.verdict] || 'v3'}" title="Claude의 1차 판정">${esc(L.verdict || '')}</span></div>
        ${rvLine}
        <div class="tally">${tal}</div>
        ${L.why ? `<div class="why"><span>작품 비교</span>${esc(L.why)}</div>` : ''}
        ${open && L.notes && Object.values(L.notes).some(Boolean) ? `<div class="lnotes"><div class="lnh">작품별로 보면</div>${WD.works.filter(w => L.notes[w.id]).map(w => `<div class="ln"><b>${sym(w.id)} ${w.title}</b><span>${esc(L.notes[w.id])}</span></div>`).join('')}</div>` : ''}
        ${open ? `<div class="cases">${caseList(L.id, cs)}</div>` : `<div class="why" style="padding-top:0"><button class="btn2" data-open="${L.id}">작품별 설명과 근거 ${cs.length}건 보기</button></div>`}</div>`;
    }).join('') + `<div class="note">판정과 사례 분류는 Claude가 본문을 읽고 단 1차 결과이며, 아래의 표본 검수로 연구자가 확인했습니다. L1·L2는 '역사 연표', L3·L7·L8은 '응보의 질서' 데이터에서 자동으로 모은 것입니다.</div>`;
    const R = WD.review;
    if (R) {
      const ok = R.result['일치'], fx = R.result['수정'], hd = R.result['보류'];
      const pct = (ok / (ok + fx) * 100).toFixed(1);
      el.insertAdjacentHTML('afterbegin', `<div class="rvbox"><div class="rvh">표본 검수 <span>${esc(R.date)}</span></div>
        <div class="rvn"><div><b>${R.sample}</b><span>검수 표본 (검수 당시 근거 ${R.total}건의 ${(R.sample / R.total * 100).toFixed(0)}%)</span></div><div><b>${ok}</b><span>일치</span></div><div><b>${fx}</b><span>수정</span></div><div><b>${hd}</b><span>보류</span></div><div><b>${pct}%</b><span>일치율 (일치 ÷ 일치+수정)</span></div></div>
        <p>${esc(R.note)}</p></div>`);
    }
    const tog = id => { st2.open.has(id) ? st2.open.delete(id) : st2.open.add(id); drawLaws(el); };
    el.querySelectorAll('.law .top').forEach(t => { const id = t.parentElement.dataset.l; t.onclick = () => tog(id); t.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(id); } }; });
    el.querySelectorAll('[data-open]').forEach(b => b.onclick = () => tog(b.dataset.open));
    bindCases(el, C);
  }
  function caseList(lid, cs) {
    const f = st2.cf[lid] || { w: '', k: '' };
    const rows = cs.map((c, i) => [c, i]).filter(([c]) => (!f.w || c.w === f.w) && (!f.k || c.kind === f.k));
    const btn = (key, val, lab) => `<button class="ichip ${(f[key] || '') === val ? '' : 'off'}" data-f="${lid}|${key}|${val}">${lab}</button>`;
    return `<div class="cfil">${btn('w', '', '전체 작품')}${WD.works.map(w => btn('w', w.id, w.title)).join('')}<span style="width:8px"></span>${btn('k', '', '전체')}${btn('k', '작동', '작동')}${btn('k', '예외', '예외')}</div>` +
      rows.map(([c]) => `<div class="case"><div class="loc"><b>${sym(c.w)}${wk(c.w).title}</b>${loc(c)}<br><span class="kpill ${c.kind === '예외' ? 'ex' : 'ok'}">${c.kind}</span>${c.conf === '검토' ? ' <span class="rv">검토</span>' : ''}</div><div><div class="t">${esc(c.t || '')}</div><q data-ev="${esc(JSON.stringify({ w: c.w, c: c.c, p: c.p, find: c.find }))}">${snip(c)}</q><div class="nt">${esc(c.note || '')}</div>${c.pair ? `<span class="pr" data-ev="${esc(JSON.stringify({ w: c.w, c: c.pair.c, p: c.pair.p, find: c.pair.find }))}">${c.pair.lab} 보기 › ${c.pair.c}${wk(c.w).unit}</span>` : ''}</div></div>`).join('') || '<div class="more">해당하는 사례가 없습니다.</div>';
  }
  function bindCases(el) {
    el.querySelectorAll('[data-ev]').forEach(q => q.onclick = e => { e.stopPropagation(); openEv(JSON.parse(q.dataset.ev)); });
    el.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { const [l, k, v] = b.dataset.f.split('|'); st2.cf[l] = Object.assign({ w: '', k: '' }, st2.cf[l], { [k]: v }); drawLaws(el); });
  }

  // ---------- 역사 연표 ----------
  const KC = { '접속': '#6B3FA0', '보존': '#8A949D', '개입·보존': '#1E7B4F', '변경': '#C2410C' };
  function drawHist(el) {
    const SEG = (WD.segments || [[1360, 1590]]);
    const ev = WD.events || [], ct = (WD.contacts || []);
    el.innerHTML = `<div class="card"><div class="k">가문의 뿌리 · 허구 가문이 이어 붙는 실존 인물</div><div class="roots">${(WD.roots || []).map((r, i) => [r, i]).filter(([r], k) => st2.rootsAll || WD.works.findIndex(w => w.id === r.w) >= 0 && (WD.roots || []).filter(x => x.w === r.w).indexOf(r) < 2).map(([r, i]) => `<div class="root" data-r="${i}">${sym(r.w)} <b>${esc(r.family)}</b> ← ${esc(r.root)}<br><span style="color:var(--muted)">${esc(r.how || '')}${r.note ? '. ' + esc(r.note) : ''}</span></div>`).join('')}</div>${(WD.roots || []).length > WD.works.length * 2 ? `<button class="btn2" id="rootsAll" style="margin-top:8px">${st2.rootsAll ? '작품마다 둘씩만 보기' : `전체 ${(WD.roots || []).length}개 보기`}</button>` : ''}</div>
      <div class="card tl"><div class="k">하나의 연표 · 실제 송·명 역사 위의 ${WD.works.length}편</div>
      <div class="tlleg">${Object.entries(KC).map(([k, c]) => `<button class="ichip ${st2.ckind && st2.ckind !== k ? 'off' : ''}" data-ck="${k}"><i style="background:${c}"></i>${k}<b>${ct.filter(x => x.kind === k).length}</b></button>`).join('')}<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="#FCAF17" stroke-width="2.5"/></svg>운수로 설명(L2)</span></div>
      <div id="tlsvg"></div>
      <div class="note">점은 허구 인물이 실존 인물·사건과 만나는 대목입니다. 접속은 허구의 가문을 실제 역사에 이어 붙이는 대목, 보존은 실제 역사를 배경으로만 서술한 대목, 개입·보존은 허구 인물이 끼어들지만 결과는 실제와 같은 대목, 변경은 실제와 다르게 흘러간 대목입니다. 연도를 알 수 없는 대목은 아래 목록에만 있습니다.</div></div>
      <div class="card"><div class="k" id="tlk">접촉점 목록</div><div id="tllist"></div></div>`;
    el.querySelectorAll('.root').forEach(d => d.onclick = () => openEv(WD.roots[+d.dataset.r]));
    const ra = el.querySelector('#rootsAll'); if (ra) ra.onclick = () => { st2.rootsAll = !st2.rootsAll; drawHist(el); };
    el.querySelectorAll('[data-ck]').forEach(b => b.onclick = () => { st2.ckind = st2.ckind === b.dataset.ck ? '' : b.dataset.ck; drawHist(el); });
    const box = el.querySelector('#tlsvg'), Wd = Math.max(560, box.clientWidth || 760);
    const padL = 92, padR = 16, GAP = 26, tot = SEG.reduce((a, s) => a + s[1] - s[0], 0), unit = (Wd - padL - padR - GAP * (SEG.length - 1)) / tot;
    const segOf = y => { let i = SEG.findIndex(s => y >= s[0] && y <= s[1]); if (i < 0) i = SEG.reduce((bi, s, j) => Math.abs((s[0] + s[1]) / 2 - y) < Math.abs((SEG[bi][0] + SEG[bi][1]) / 2 - y) ? j : bi, 0); return i; };
    const x = y => { const i = segOf(y); let off = padL; for (let j = 0; j < i; j++) off += (SEG[j][1] - SEG[j][0]) * unit + GAP; return off + (Math.min(Math.max(y, SEG[i][0]), SEG[i][1]) - SEG[i][0]) * unit; };
    const inSeg = y => SEG.some(s => y >= s[0] && y <= s[1]);
    const reigns = ev.filter(e => e.kind === '왕대' && inSeg(e.y)), evs = ev.filter(e => e.kind !== '왕대' && inSeg(e.y));
    let svg = '', yy = 18;
    // 축
    svg += '<g class="ax">'; SEG.forEach((sg, si) => { for (let y = Math.ceil(sg[0] / 20) * 20; y <= sg[1]; y += 20) svg += `<line x1="${x(y)}" x2="${x(y)}" y1="${yy}" y2="2000" stroke="#EEF2F6"/><text x="${x(y)}" y="${yy - 6}" text-anchor="middle">${y}</text>`; if (si) { const gx = x(sg[0]) - GAP / 2; svg += `<line x1="${gx - 3}" x2="${gx - 3}" y1="${yy}" y2="2000" stroke="#C7CFD8" stroke-dasharray="3 3"/><line x1="${gx + 3}" x2="${gx + 3}" y1="${yy}" y2="2000" stroke="#C7CFD8" stroke-dasharray="3 3"/>`; } }); svg += '</g>';
    // 왕대 띠
    yy += 6; svg += `<text x="4" y="${yy + 14}" style="font-weight:800;fill:#5F6B75">왕대</text>`;
    reigns.forEach((r, i) => { const a = x(r.y), b = x(r.y2 || r.y + 1); svg += `<g><rect x="${a}" y="${yy}" width="${Math.max(1, b - a)}" height="20" fill="${i % 2 ? '#DCE7F4' : '#C9DAEE'}"/>${b - a > 26 ? `<text x="${(a + b) / 2}" y="${yy + 14}" text-anchor="middle" style="font-size:10px">${esc(r.t.replace(/\s*\(.*\)/, ''))}</text>` : ''}<title>${esc(r.t)} ${r.y}~${r.y2 || ''}${r.note ? ' · ' + esc(r.note) : ''}</title></g>`; });
    yy += 30;
    // 사건
    svg += `<text x="4" y="${yy + 12}" style="font-weight:800;fill:#5F6B75">실제 사건</text>`;
    const lanes = []; evs.sort((a, b) => a.y - b.y).forEach(e => { const a = x(e.y), b = Math.max(x(e.y2 || e.y), a + 4), lw = e.t.length * 10.5 + 8; let ln = lanes.findIndex(end => end + 4 < a); if (ln < 0) { ln = lanes.length; lanes.push(0); } lanes[ln] = b + 3 + lw; const ty = yy + ln * 18; svg += `<g><rect x="${a}" y="${ty + 2}" width="${b - a}" height="10" rx="2" fill="#8A2A55" opacity=".75"/><text x="${a + (b - a) + 3}" y="${ty + 11}" style="font-size:10px">${esc(e.t)}</text><title>${esc(e.t)} ${e.y}${e.y2 ? '~' + e.y2 : ''}${e.note ? ' · ' + esc(e.note) : ''}${e.conf === '검토' ? ' (검토 필요)' : ''}</title></g>`; });
    yy += Math.max(1, lanes.length) * 18 + 14;
    // 작품 띠와 접촉점
    const shown = ct.filter(c => c.y && inSeg(c.y) && (!st2.ckind || c.kind === st2.ckind));
    WD.works.forEach(w => {
      const a = x(w.span[0]), b = x(w.span[1]);
      svg += `<text x="4" y="${yy + 18}" style="font-weight:800;fill:${w.color}">${esc(w.title)}</text><rect x="${a}" y="${yy}" width="${b - a}" height="28" rx="4" fill="${w.color}" opacity=".09"/><title>${esc(w.title)} 서사 시간 ${w.span[0]}~${w.span[1]}</title>`;
      const mine = shown.filter(c => c.w === w.id).sort((p, q) => p.y - q.y); const used = {};
      mine.forEach(c => { const cx = x(c.y), k = Math.round(cx / 9); const n = used[k] = (used[k] || 0) + 1; const cy = yy + 14 + ((n - 1) % 3 - 1) * 8 + (n > 3 ? 4 : 0); const ci = ct.indexOf(c);
        svg += `<g class="dot" data-c="${ci}">${c.l2 ? `<circle cx="${cx}" cy="${cy}" r="7.5" fill="none" stroke="#FCAF17" stroke-width="2.5"/>` : ''}<circle cx="${cx}" cy="${cy}" r="4.5" fill="${KC[c.kind] || '#7A8590'}"/><title>${c.y} · ${esc(c.who)} · ${c.kind}${c.fictional ? ' · ' + esc(c.fictional) : ''}</title></g>`; });
      yy += 40;
    });
    box.innerHTML = `<svg viewBox="0 0 ${Wd} ${yy + 4}" role="img" aria-label="작품들과 실제 송·명 역사 연표">${svg}</svg>`;
    box.querySelectorAll('.dot').forEach(d => d.onclick = () => { st2.tsel = +d.dataset.c; list(); openEv(ct[st2.tsel]); });
    function list() {
      const rows = ct.map((c, i) => [c, i]).filter(([c]) => !st2.ckind || c.kind === st2.ckind).sort((a, b) => (a[0].w > b[0].w ? 1 : a[0].w < b[0].w ? -1 : (a[0].c - b[0].c) || (a[0].p - b[0].p)));
      el.querySelector('#tlk').textContent = `접촉점 목록 · ${rows.length}건${st2.ckind ? ' (' + st2.ckind + ')' : ''}`;
      el.querySelector('#tllist').innerHTML = rows.map(([c, i]) => `<div class="case" ${st2.tsel === i ? 'style="background:#FFF8E3"' : ''}><div class="loc"><b>${sym(c.w)}${wk(c.w).title}</b>${loc(c)}${c.y ? `<br>${c.y}년` : ''}<br><span class="kpill" style="background:${KC[c.kind]}22;color:${KC[c.kind]}">${c.kind}</span>${c.l2 ? ' <span class="kpill" style="background:#FFF0C7;color:#7A5300">운수</span>' : ''}${c.conf === '검토' ? ' <span class="rv">검토</span>' : ''}</div><div><div class="t">${esc(c.who)}${c.fictional ? ` <span style="font-weight:400;color:var(--muted)">× ${esc(c.fictional)}</span>` : ''}</div><q data-ev="${esc(JSON.stringify({ w: c.w, c: c.c, p: c.p, find: c.find }))}">${snip(c)}</q><div class="nt">${esc(c.note || '')}</div></div></div>`).join('') || '<div class="more">해당하는 접촉점이 없습니다.</div>';
      el.querySelectorAll('#tllist [data-ev]').forEach(q => q.onclick = () => openEv(JSON.parse(q.dataset.ev)));
    }
    list();
  }

  // ---------- 응보의 질서 ----------
  const POS = ['존속', '형제·동서', '적처', '자녀·조카', '첩', '문객·하인', '외부 관료', '궁중·황실', '외적·반란', '기타'];
  const END = ['개과', '용서', '유배·축출', '처형', '자멸·병사', '미해결'];
  function drawFate(el) {
    const V = WD.villains || [];
    const z = (p, e) => UP.includes(p) && ['개과', '용서'].includes(e) ? 'z1' : DOWN.includes(p) && ['유배·축출', '처형', '자멸·병사'].includes(e) ? 'z2' : '';
    const ex = V.filter(v => l3(v) === '예외');
    el.innerHTML = `<div class="card"><div class="k">악인의 위치와 결말 · ${V.length}명 <span style="font-weight:400">L3 응보는 가문 안의 위치가 정한다</span></div>
      <div class="zleg"><span><i style="background:#E9F5EE"></i>법칙대로: 가문 안 사람은 돌아온다</span><span><i style="background:#EEF3FA"></i>법칙대로: 바깥 사람은 처벌된다</span><span><i style="background:#fff;border:1.5px solid #C2410C"></i>예외</span>${WD.works.map(w => `<span>${sym(w.id)}${w.title}</span>`).join('')}</div>
      <div class="tscroll"><table class="fm"><tr><th></th>${END.map(e => `<th>${e}</th>`).join('')}</tr>${POS.filter(p => V.some(v => v.pos === p)).map(p => `<tr><td class="rh">${p}</td>${END.map(e => `<td class="${z(p, e)}">${V.map((v, i) => [v, i]).filter(([v]) => v.pos === p && v.end === e).map(([v, i]) => `<span class="vchip ${l3(v) === '예외' ? 'ex' : ''} ${st2.fsel === i ? 'on' : ''}" data-v="${i}" title="${esc(v.rel || '')}">${sym(v.w)}${esc(v.name)}</span>`).join('')}</td>`).join('')}</tr>`).join('')}</table></div>
      <div class="note" style="margin-top:6px">이름을 누르면 아래에 악행과 결말 근거가 나오고.</div></div>
      <div class="card vd" id="vdet">${st2.fsel != null && V[st2.fsel] ? vdet(V[st2.fsel]) : '<div class="more">인물을 고르면 여기에 나옵니다.</div>'}</div>
      <div class="card"><div class="k">예외 ${ex.length}명 <span style="font-weight:400">논의할 거리</span></div>${ex.map(v => `<div class="case"><div class="loc"><b>${sym(v.w)}${wk(v.w).title}</b>${v.pos} → ${v.end}</div><div><div class="t">${esc(v.name)} <span style="font-weight:400;color:var(--muted)">${esc(v.rel || '')}</span></div><div class="nt">${esc(v.note || '')}</div><span class="pr" data-v2="${V.indexOf(v)}">자세히 ›</span></div></div>`).join('') || '<div class="more">예외가 없습니다.</div>'}</div>`;
    el.querySelectorAll('[data-v],[data-v2]').forEach(c => c.onclick = () => { st2.fsel = +(c.dataset.v || c.dataset.v2); drawFate(el); openEv(V[st2.fsel]); el.querySelector('#vdet').scrollIntoView({ block: 'nearest' }); });
    bindCases(el);
  }
  function vdet(v) {
    return `<h5>${sym(v.w)} ${esc(v.name)} <span class="pkind">${esc(v.pos)}</span> <span class="kpill ${l3(v) === '예외' ? 'ex' : 'ok'}">${l3(v) || '판정 보류'}</span>${v.conf === '검토' ? ' <span class="rv">검토</span>' : ''}</h5>
      <div style="color:var(--muted)">${esc(wk(v.w).title)} · ${esc(v.rel || '')}</div>
      <div class="case" style="grid-template-columns:70px 1fr"><div class="loc"><b>악행</b>${v.crime_at ? loc(Object.assign({ w: v.w }, v.crime_at)) : ''}</div><div><div class="t">${esc(v.crime || '')}</div>${v.crime_at ? `<q data-ev="${esc(JSON.stringify(Object.assign({ w: v.w }, v.crime_at)))}">${snip(Object.assign({ w: v.w }, v.crime_at))}</q>` : ''}</div></div>
      <div class="case" style="grid-template-columns:70px 1fr"><div class="loc"><b>결말</b>${loc(v)}</div><div><div class="t">${esc(v.end)}</div><q data-ev="${esc(JSON.stringify({ w: v.w, c: v.c, p: v.p, find: v.find }))}">${snip(v)}</q><div class="nt">${esc(v.note || '')}</div></div></div>`;
  }

  // ---------- 세계의 요소 (고사도 같은 화면 틀을 쓴다) ----------
  const CATS2 = [['인물 유형', '#01449E'], ['사물·모티프', '#8A2A55'], ['제도·의례', '#6B3FA0'], ['지리 공간', '#1E7B4F'], ['집안 공간', '#9C7A3C'], ['생활 문화', '#B5487A'], ['고사', '#C2410C']];
  const catColor = c => (CATS2.find(x => x[0] === c) || [0, '#5F6B75'])[1];
  const esE = { sel: null, cat: '', q: '' }, esA = { sel: null, cat: '', q: '' };
  function encEntries() {
    if (WD._enc) return WD._enc;
    const E = (WD.enc || []).map(e => Object.assign({}, e));
    // 같은 작중 인물·사물이 나오는 항목끼리 잇는다
    const names = E.map(e => new Set((e.items || []).map(i => i.w + ':' + (i.name || i.to || '')).filter(s => !/:$/.test(s))));
    E.forEach((e, i) => {
      const score = E.map((f, j) => j === i ? 0 : [...names[i]].filter(n => names[j].has(n)).length);
      const auto = score.map((s, j) => [s, j]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 6).map(x => E[x[1]].id);
      e.links = [...new Set([...(e.rel || []), ...auto])].filter(id => id !== e.id && E.some(f => f.id === id));
      e.why = {};
      e.links.forEach(id => { const j = E.findIndex(f => f.id === id); e.why[id] = [...new Set([...names[i]].filter(n => names[j].has(n)).map(n => n.split(':')[1]))]; });
      e.n = WD.works.map(w => (e.items || []).filter(x => x.w === w.id).length);
      e.share = e.n.filter(Boolean).length;
      // 연작(같은 세계)은 하나로 세어 장르 공유도를 잰다
      const ser = WD.series || [];
      e.shareG = WD.works.filter((w, k) => e.n[k] && !ser.some(sr => sr.slice(1).includes(w.id) && sr.some(x => x !== w.id && e.n[WD.works.findIndex(v => v.id === x)]))).length;
    });
    return (WD._enc = E);
  }
  function drawEnc(el, part) {
    const ALL = encEntries(), isA = part === 'allu';
    const E = ALL.filter(e => isA ? e.cat === '고사' : e.cat !== '고사');
    const es = isA ? esA : esE;
    if (!E.length) { el.innerHTML = '<div class="card"><div class="more">항목이 아직 없습니다.</div></div>'; return; }
    if (!es.sel || !E.some(e => e.id === es.sel)) es.sel = E[0].id;
    const ok = e => (!es.cat || e.cat === es.cat) && (!es.q || [e.key, e.hanja, e.def, e.grp, ...(e.items || []).map(i => (i.name || '') + ' ' + (i.to || '') + ' ' + (i.note || i.use || ''))].join(' ').includes(es.q));
    const subs = isA ? '' : `<div class="wv-subsub" role="tablist" aria-label="세계의 요소 갈래">${[['', '전체', E.length], ...CATS2.filter(([c]) => E.some(e => e.cat === c)).map(([c, col]) => [c, c, E.filter(e => e.cat === c).length, col])].map(([c, l, n, col]) => `<button role="tab" data-c="${c}" aria-selected="${es.cat === c}" class="${es.cat === c ? 'on' : ''}" style="--cc:${col || 'var(--navy)'}">${l}<small>${n}</small></button>`).join('')}</div>`;
    const qbox = `<input type="search" id="eq" placeholder="${isA ? '고사·경전 구절·출전으로 찾기' : '항목·인물·사물 이름으로 찾기'}" aria-label="${isA ? '고사 찾기' : '세계의 요소 찾기'}" value="${esc(es.q)}">`;
    el.innerHTML = (isA ? `<div class="card ebar"><div class="ibar" style="margin:0">${qbox}<span class="enote">작품 속 인물이 끌어다 쓰는 옛이야기와 경전 구절입니다. 세계의 규칙이라기보다 독자와 인물이 함께 아는 교양의 바탕입니다. 한 작품에만 나오는 것도 모두 실었습니다.</span></div></div>` : subs.replace(/<\/div>$/, `<span class="eqw">${qbox}</span></div>`))
      + `<div class="emd"><div id="eboard"></div><div id="edet"></div></div>`;
    el.querySelector('#eq').oninput = e => { es.q = e.target.value.trim(); board(); };
    el.querySelectorAll('.wv-subsub button').forEach(b => b.onclick = () => {
      es.cat = b.dataset.c;
      el.querySelectorAll('.wv-subsub button').forEach(x => { const on = x.dataset.c === es.cat; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); });
      const cur = E.find(e => e.id === es.sel);
      if (es.cat && (!cur || cur.cat !== es.cat)) { const f = E.filter(e => e.cat === es.cat).sort((a, b) => b.share - a.share)[0]; if (f) es.sel = f.id; }
      board(); select(es.sel, false);
    });
    function board() {
      const box = el.querySelector('#eboard'), sh = E.filter(ok);
      let html = '';
      CATS2.forEach(([c, col]) => {
        const es_ = sh.filter(e => e.cat === c).sort((a, b) => c === '집안 공간' ? a.id.localeCompare(b.id) : (b.share - a.share) || (b.shareG - a.shareG)); if (!es_.length) return;
        const GO = ['관직과 벼슬길', '혼인과 가족', '송사와 형벌', '상례', '의복·치장', '여가·놀이', '잔치·절기', '경전 구절', '여성의 덕과 처첩', '효와 부자', '사랑과 혼인', '임금과 신하', '충신과 은일', '우정과 지기', '지략과 무용', '재주와 용모', '신선과 꿈', '기타'];
        const groups = (c === '고사' || c === '제도·의례' || c === '생활 문화') ? [...new Set(es_.map(e => e.grp || '기타'))].sort((a, b) => ((GO.indexOf(a) + 1) || 99) - ((GO.indexOf(b) + 1) || 99)) : [''];
        html += `<div class="card"><div class="k"><i class="wsym s" style="background:${col}"></i>${c} · ${es_.length}</div>` + groups.map(g => `${g ? `<div class="egrp">${esc(g)}</div>` : ''}<div class="etiles">${es_.filter(e => !g || (e.grp || '기타') === g).map(tile).join('')}</div>`).join('') + '</div>';
      });
      box.innerHTML = html || '<div class="card"><div class="more">찾는 항목이 없습니다.</div></div>';
      box.querySelectorAll('.etile').forEach(t => t.onclick = () => select(t.dataset.e, true));
    }
    function tile(e) {
      const tot = e.n.reduce((a, b) => a + b, 0) || 1;
      return `<button class="etile ${es.sel === e.id ? 'on' : ''}" data-e="${e.id}" style="--cc:${catColor(e.cat)}"><b>${esc(e.key)}</b></button>`;
    }
    function select(id, scroll) {
      es.sel = id; el.querySelectorAll('.etile').forEach(t => t.classList.toggle('on', t.dataset.e === id));
      detail(); el.querySelector('#edet').scrollTop = 0; if (scroll && !matchMedia('(min-width:1100px)').matches) el.querySelector('#edet').scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    function detail() {
      const e = E.find(x => x.id === es.sel), box = el.querySelector('#edet');
      const col = w => {
        const its = (e.items || []).filter(i => i.w === w.id);
        if (!its.length) return '';
        return `<div class="ecol"><div class="eh">${sym(w.id)} ${w.title}<small>${its.length}</small></div>${its.map(i => `<div class="eit"><div class="en">${esc(i.name || i.to || '')}${i.func ? `<span class="ef">${esc(i.func)}</span>` : ''}${i.who ? `<span class="ew">${esc(i.who)}${i.to ? ' → ' + esc(i.to) : ''}</span>` : ''}</div><q data-ev="${esc(JSON.stringify({ w: i.w, c: i.c, p: i.p, find: i.find }))}">${snip(i, 46)}</q><div class="nt">${esc(i.note || i.use || '')} <span class="eloc">${loc(i)}</span></div></div>`).join('') || '<div class="more">이 작품에는 해당 대목을 싣지 않았습니다.</div>'}</div>`;
      };
      const links = (e.links || []).map(id => ALL.find(x => x.id === id)).filter(Boolean);
      box.innerHTML = `<div class="card edet" style="--cc:${catColor(e.cat)}">
        <div class="eyebrow">${esc(e.cat)}${e.grp ? ' · ' + esc(e.grp) : ''}${e.conf === '검토' ? ' <span class="rv">검토</span>' : ''}</div>
        <h3>${esc(e.key)}${e.hanja ? ` <span class="hj">${esc(e.hanja)}</span>` : ''}</h3>
        <p class="edef">${esc(e.def || e.gist || '')}</p>
        ${e.cat === '고사' && (e.gist || e.src) ? `<p class="esrc">${e.gist && e.def ? esc(e.gist) + ' ' : ''}${e.src ? `출전: ${esc(e.src)}` : ''}</p>` : ''}
        ${e.real ? `<p class="esrc"><b>실제 제도</b> ${esc(e.real)}</p>` : ''}
        ${/공간$/.test(e.cat) ? `<div id="emap"></div>` : ''}
        <div class="eshare"><b>${e.share}</b>/${WD.works.length}편에 나옴${(WD.series || []).length && e.shareG !== e.share ? ` <span>(연작을 한 세계로 치면 ${e.shareG}편)</span>` : ''}<span class="eds big">${WD.works.map((w, i) => `<i class="${w.shape === 's' ? 's' : ''}" title="${w.title}" style="${e.n[i] ? `background:${w.color};border-color:${w.color}` : ''}"></i>`).join('')}</span></div>
        <div class="ecols">${WD.works.map(col).join('')}</div>
        ${WD.works.some((w, i) => !e.n[i]) ? `<div class="eabs">찾지 못한 작품: ${WD.works.filter((w, i) => !e.n[i]).map(w => `${sym(w.id)} ${w.title}`).join(' ')}</div>` : ''}
        ${e.cmp ? `<div class="ecmp"><span>여러 작품을 겹쳐 보면</span>${esc(e.cmp)}</div>` : ''}
        ${(e.law || []).length ? `<div class="lrow"><div class="lh">이어지는 세계의 법칙<small>누르면 법칙 화면으로 갑니다</small></div><div class="lchips">${(e.law || []).map(l => { const L = WD.laws.find(x => x.id === l); return L ? `<button class="elaw" data-l="${l}"><span class="lid">${l}</span>${esc(L.t)}</button>` : ''; }).join('')}</div></div>` : ''}
        ${links.length ? `<div class="lrow"><div class="lh">함께 볼 항목<small>같은 인물이 나오는 다른 항목입니다</small></div><div class="lchips">${links.map(f => `<button class="erel" data-e="${f.id}" style="--cc:${catColor(f.cat)}"><small class="lc">${esc(f.cat)}${(f.cat === '고사') !== isA ? ' ↗' : ''}</small><b>${esc(f.key)}</b>${(e.why[f.id] || []).length ? `<span class="lw">${e.why[f.id].slice(0, 3).map(esc).join(' · ')}</span>` : ''}</button>`).join('')}</div></div>` : ''}
      </div>`;
      box.querySelectorAll('[data-ev]').forEach(q => q.onclick = () => openEv(JSON.parse(q.dataset.ev)));
      box.querySelectorAll('.erel').forEach(b => b.onclick = () => {
        if (E.some(x => x.id === b.dataset.e)) return select(b.dataset.e, true);
        const f = ALL.find(x => x.id === b.dataset.e); if (!f) return;
        const toA = f.cat === '고사'; (toA ? esA : esE).sel = f.id; (toA ? esA : esE).cat = ''; (toA ? esA : esE).q = '';
        view = toA ? 'allu' : 'enc'; try { localStorage.setItem('gd_wv2', view); } catch (x) {} window.__gd.renderInfo();
        setTimeout(() => { const d = document.querySelector('#edet'); if (d) d.scrollIntoView({ block: 'start' }); }, 60);
      });
      box.querySelectorAll('.elaw').forEach(b => b.onclick = () => { view = 'laws'; st2.open.add(b.dataset.l); try { localStorage.setItem('gd_wv2', view); } catch (x) {} window.__gd.renderInfo(); setTimeout(() => { const d = document.querySelector(`.law[data-l="${b.dataset.l}"]`); if (d) d.scrollIntoView({ block: 'start' }); }, 50); });
      if (e.cat === '집안 공간' && (WD.house || []).length) houseMap(box.querySelector('#emap'), e.zone || null); else if (e.cat === '지리 공간') spaceMap(box.querySelector('#emap'), e.key);
    }
    function houseMap(box, HL) {
      const H = WD.house || [];
      const Z = {
        GARDEN: ['후원·정자', '뒤뜰의 정자와 누각. 시를 짓고 노닐며, 몰래 만나고 엿듣는 곳'],
        SHRINE: ['사당', '조상의 신주를 모신 곳'],
        JAIL: ['후원 누옥·별당 (감금)', '죄를 입은 아내와 며느리를 가두는 곳'],
        MAIN: ['정당', '집안 어른의 거처. 문안을 받고 시비를 가린다'],
        CON: ['측실·첩·창기의 처소', '정실 처소와 떨어진 곁방'],
        IN: ['안채 처소', '정실·며느리의 침소와 신방'],
        OUT: ['바깥채 (외헌·서헌)', '남자들의 공부와 손님맞이, 모의가 벌어지는 곳'],
        PAL: ['곁에 지은 궁', '공주궁·왕부. 담과 협문으로 본가와 이어진다'],
        OTHER: ['다른 집안', '친정·처가·원수의 집'],
        COURT: ['궁궐의 유폐 전각·옥', '황후·후궁 다툼에서 여인을 가두는 곳'],
      };
      let hw = '';
      const cell = (z, area) => {
        const its = H.filter(h => h.zone === z && (!hw || h.w === hw));
        const on = !HL || HL.includes(z);
        return `<div class="hz z-${z} ${on ? (HL ? 'hl' : '') : 'dim'}" ${area ? `style="grid-area:${area}"` : ''}><div class="hzh"><b>${Z[z][0]}</b><small>${its.length || ''}</small></div><div class="hzc">${Z[z][1]}</div><div class="hcs">${its.map(h => `<button class="hc" data-i="${H.indexOf(h)}" title="${esc(wk(h.w).title + ' · ' + (h.note || ''))}">${sym(h.w)}${esc(h.name)}</button>`).join('') || '<span class="hnone">없음</span>'}</div></div>`;
      };
      const draw = () => {
        box.innerHTML = `<div class="hm"><div class="hmf"><button class="ichip ${hw ? 'off' : ''}" data-w="">전체 작품</button>${WD.works.map(w => `<button class="ichip ${hw && hw !== w.id ? 'off' : ''}" data-w="${w.id}">${sym(w.id)}${w.title}</button>`).join('')}</div>
          <div class="hplan"><div class="hcomp"><span class="hlab hback">뒤</span>${cell('GARDEN', 'g')}${cell('SHRINE', 's')}${cell('JAIL', 'j')}${cell('MAIN', 'm')}${cell('CON', 'c')}${cell('IN', 'i')}<div class="hgate" style="grid-area:t"><span>중문</span></div>${cell('OUT', 'o')}<span class="hlab hfront">대문</span></div>
          <div class="hside"><div class="hdoor"><span>담·협문</span></div>${cell('PAL', '')}</div></div>
          <div class="hoff">${cell('OTHER', '')}${cell('COURT', '')}</div>
          <div class="hinfo" id="hinfo">처소 이름을 누르면 설명과 해당 대목을 볼 수 있습니다.</div>
          <div class="note">실제 도면이 아니라, 여섯 작품에 나오는 처소를 쓰임에 따라 한 집 안에 모아 놓은 모식도입니다. 바깥채·안채·후원·사당의 앞뒤 배치는 작품 속 묘사와 명문가 저택의 일반적인 구성을 따랐습니다.</div></div>`;
        box.querySelectorAll('.hmf .ichip').forEach(b => b.onclick = () => { hw = b.dataset.w; draw(); });
        box.querySelectorAll('.hc').forEach(b => b.onclick = () => {
          const h = H[+b.dataset.i], inf = box.querySelector('#hinfo');
          box.querySelectorAll('.hc').forEach(x => x.classList.toggle('on', x === b));
          inf.innerHTML = `<b>${sym(h.w)}${esc(wk(h.w).title)} · ${esc(h.name)}</b> <span class="hzn">${Z[h.zone][0]}</span><div>${esc(h.note || '')}</div>${h.ev ? `<q data-ev="${esc(JSON.stringify({ w: h.ev.w, c: h.ev.c, p: h.ev.p, find: h.ev.find }))}">${snip(h.ev, 46)}</q><span class="eloc">${loc(h.ev)}</span>` : ''}`;
          const q = inf.querySelector('[data-ev]'); if (q) q.onclick = () => openEv(JSON.parse(q.dataset.ev));
        });
      };
      draw();
    }
    function spaceMap(box, func) {
      const pts = (WD.spaces || []).filter(s => typeof s.lat === 'number' && typeof s.lng === 'number' && s.lng >= 97 && s.lng <= 125 && s.lat >= 17 && s.lat <= 43);
      if (!pts.length) { box.remove(); return; }
      const lo = [Math.min(...pts.map(p => p.lng)) - .8, Math.max(...pts.map(p => p.lng)) + 2.5], la = [Math.min(...pts.map(p => p.lat)) - .8, Math.max(...pts.map(p => p.lat)) + .8];
      const Wd = 640, k = Wd / (lo[1] - lo[0]), Hd = Math.round((la[1] - la[0]) * k * 1.12);
      const X = x => (x - lo[0]) * k, Y = y => (la[1] - y) * k * 1.12;
      let g = (WD.land || []).map(r => { let d = ''; for (let i = 0; i < r.length; i += 2) d += (i ? 'L' : 'M') + X(r[i]).toFixed(1) + ' ' + Y(r[i + 1]).toFixed(1); return `<path d="${d}Z"/>`; }).join('');
      g = `<g fill="#F1F0E8" stroke="#A9B4BE" stroke-width=".8" stroke-linejoin="round">${g}</g>`;
      for (let x = Math.ceil(lo[0] / 5) * 5; x <= lo[1]; x += 5) g += `<line x1="${X(x)}" x2="${X(x)}" y1="0" y2="${Hd}" stroke="#D3DCE6" stroke-opacity=".6" stroke-dasharray="2 3"/><text x="${X(x) + 3}" y="${Hd - 4}" class="gx">${x}°E</text>`;
      for (let y = Math.ceil(la[0] / 5) * 5; y <= la[1]; y += 5) g += `<line y1="${Y(y)}" y2="${Y(y)}" x1="0" x2="${Wd}" stroke="#D3DCE6" stroke-opacity=".6" stroke-dasharray="2 3"/><text x="3" y="${Y(y) - 3}" class="gx">${y}°N</text>`;
      const on = pts.filter(p => p.func === func), off = pts.filter(p => p.func !== func && p.func !== '고사 속 장소');
      const mark = (p, hi) => { const w = wk(p.w), r = hi ? 3.5 + Math.sqrt(p.n || 1) * 1.1 : 2.2, x = X(p.lng), y = Y(p.lat); const shp = w.shape === 's' ? `<rect x="${x - r}" y="${y - r}" width="${2 * r}" height="${2 * r}" rx="1.5"` : `<circle cx="${x}" cy="${y}" r="${r}"`; return `<g ${hi ? `class="mk" data-i="${WD.spaces.indexOf(p)}"` : ''}>${shp} fill="${hi ? w.color : '#C7CFD8'}" ${hi ? 'fill-opacity=".8" stroke="#fff"' : ''}/>${hi ? `<text x="${x + r + 3}" y="${y + 4}">${esc(p.name)}</text><title>${esc(w.title)} · ${esc(p.name)} · ${p.n || ''}회${p.note ? ' · ' + esc(p.note) : ''}</title>` : ''}</g>`; };
      box.innerHTML = `<div class="emap"><svg viewBox="0 0 ${Wd} ${Hd}" role="img" aria-label="${esc(func)} 위치"><rect width="${Wd}" height="${Hd}" fill="#EAF2F8"/>${g}${off.map(p => mark(p, false)).join('')}${on.sort((a, b) => (b.n || 0) - (a.n || 0)).map(p => mark(p, true)).join('')}</svg><div class="note">오늘날 해안선(Natural Earth) 위에 작중 지명을 경위도대로 찍었습니다. 국경·행정 경계는 송·명대와 오늘날이 달라 그리지 않았습니다. 회색 점은 다른 기능의 장소이고, 실재 위치를 알 수 없는 작중 지명은 빠져 있습니다.</div></div>`;
      box.querySelectorAll('.mk').forEach(m => m.onclick = () => { const s = WD.spaces[+m.dataset.i]; if (s.ex) openEv(Object.assign({ w: s.w }, s.ex)); });
    }
    detail(); board();
  }

  // 머리글 통계(세계관 화면일 때)
  window.worldStats = function () {
    if (!WD) return '';
    const E = encEntries();
    const all = E.filter(e => e.cat !== '고사' && e.share === WD.works.length).length;
    const C = allCases();
    return [[WD.works.length, '비교 작품'], [WD.laws.length, '세계의 법칙'], [C.length, '근거 사례'], [(WD.contacts || []).length, '역사 접점'], [(WD.villains || []).length, '악인'], [E.filter(e => e.cat !== '고사').length, '세계의 요소'], [all, `${WD.works.length}편 모두에 나옴`], [E.filter(e => e.cat === '고사').length, '고사']].map(([b, s]) => `<div><b>${b}</b>${s}</div>`).join('');
  };
  // ---------- 진입 ----------
  window.drawWorld = function (box) {
    box.innerHTML = '<div class="card"><div class="more">세계관 데이터와 두 작품 본문을 불러오는 중입니다…</div></div>';
    load().then(() => {
      if (!window.__gd.isWorld()) return;
      stats();
      const G = [['', [['enc', '세계의 요소']]], ['세계의 규칙', [['laws', '세계의 법칙'], ['fate', '응보의 질서']]], ['주변 정보', [['hist', '역사 연표'], ['allu', '고사·경전']]]];
      const V = G.flatMap(g => g[1]);
      if (!V.some(v => v[0] === view)) view = 'enc';
      box.innerHTML = `<div class="card"><div class="wv-head"><h4>국문장편의 공유 세계</h4><span class="pkind">시범 · ${WD.works.length}편</span></div>
        <div class="note">독자가 작품을 넘나들며 기대하는 세계를 찾는 화면입니다. 세계에 무엇이 있는지는 '세계의 요소'에, 그 세계가 어떻게 돌아가는지는 '세계의 규칙'에 모았습니다. 실제 역사와 고사는 작품들이 함께 기대는 바탕 지식이어서 '주변 정보'로 따로 두었습니다. 지금 비교하는 작품은 ${WD.works.length}편입니다. 현몽쌍룡기와 조씨삼대록은 같은 조씨 가문을 잇는 연작입니다.</div>
        <div class="wv-works" style="margin-top:6px">${WD.works.map(w => `<span>${sym(w.id)}${w.title} · ${esc(w.era || '')}</span>`).join('')}</div></div>
        <div class="wv-sub" role="tablist">${G.map(([gl, vs], gi) => `<span class="wv-g${gi ? ' sep' : ''}${gi === 2 ? ' side' : ''}">${gl ? `<span class="wv-gl">${gl}</span>` : ''}${vs.map(([k, l]) => `<button role="tab" aria-selected="${view === k}" class="${view === k ? 'on' : ''}" data-v="${k}">${l}</button>`).join('')}</span>`).join('')}</div><div id="wvb"></div>`;
      box.querySelectorAll('.wv-sub button').forEach(b => b.onclick = () => { view = b.dataset.v; try { localStorage.setItem('gd_wv2', view); } catch (e) {} window.drawWorld(box); });
      const el = box.querySelector('#wvb');
      ({ laws: drawLaws, hist: drawHist, fate: drawFate, enc: drawEnc, allu: x => drawEnc(x, 'allu') })[view](el);
    }).catch(() => { box.innerHTML = '<div class="card"><div class="more">세계관 데이터를 불러오지 못했습니다. 페이지를 새로 고쳐 주세요.</div></div>'; });
  };
  if (window.__gd && window.__gd.isWorld()) window.__gd.renderInfo();
})();
