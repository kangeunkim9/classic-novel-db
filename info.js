/* 작품 정보: 인물 관계 · 직함 · 지명 · 고사
   data/<ID>.info.js 가 W_INFO.push({...}) 로 들어오면 본문 태그와 합쳐서 보여 준다.
   현재 정보 파일이 있는 작품: 창선감의록(CSG). 다른 작품은 INFO_WORKS 에 id를 더하고 정보 파일을 올리면 된다. */
(function () {
  const INFO_WORKS = ['CSG'];
  W.forEach(w => { if (INFO_WORKS.includes(w.id)) w.hasInfo = true; });

  const css = document.createElement('style');
  css.textContent = `
  main [hidden],#info[hidden]{display:none!important}
  .topnav{display:flex;gap:4px;margin-left:14px}
  .topnav button{font:inherit;font-weight:800;font-size:16px;line-height:1.2;color:var(--light);background:none;border:0;padding:6px 14px;margin:-4px 0;border-radius:4px;cursor:pointer}
  .topnav button:hover{color:#fff;background:rgba(255,255,255,.08)}
  .topnav button.on{color:#fff;background:rgba(255,255,255,.14);box-shadow:inset 0 -3px 0 var(--orange)}
  .topnav button:focus-visible{outline:2px solid var(--orange);outline-offset:2px}
  body.mode-world aside{display:none}
  body.mode-world .wrap{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)}
  body.mode-world main{padding-left:max(22px,env(safe-area-inset-left,0px))}
  @media (max-width:900px){.topnav{margin-left:0;order:3;width:100%}}
  .mtabs{display:flex;gap:2px;margin:0 0 12px;border-bottom:2px solid var(--line);flex-wrap:wrap}
  .mtabs button{font:inherit;font-size:13px;font-weight:800;background:none;border:0;padding:8px 12px;color:var(--muted);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px}
  .mtabs button.on{color:var(--blue);border-bottom-color:var(--blue)}
  .mtabs button:disabled{color:#B9C1C9;cursor:default}
  .mtabs button small{font-weight:400;font-size:11px;margin-left:4px;color:var(--muted)}
  .mtabs button:focus-visible,.ichip:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
  #info .card h4{margin:0 0 4px;font-size:15px;color:var(--navy)}
  .ibar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px;font-size:12px;color:var(--muted)}
  .ibar select,.ibar input[type=search]{font:inherit;font-size:12.5px;padding:4px 6px;border:1px solid var(--line);border-radius:4px;background:#fff;color:var(--text)}
  .ibar input[type=range]{width:130px}
  .ichip{font:inherit;font-size:12px;border:1px solid var(--line);background:#fff;border-radius:12px;padding:2px 9px;cursor:pointer;display:inline-flex;gap:5px;align-items:center;color:var(--text)}
  .ichip i{width:9px;height:9px;border-radius:50%;display:inline-block}
  .ichip.off{opacity:.38}
  .ichip b{color:var(--muted);font-weight:400}
  .gwrap{position:relative;border:1px solid var(--line);border-radius:6px;background:#FBFCFE;overflow:hidden}
  .gwrap svg{display:block;width:100%;height:540px;touch-action:none}
  .gwrap .gl{position:absolute;left:8px;bottom:6px;font-size:11px;color:var(--muted);background:rgba(255,255,255,.85);padding:2px 6px;border-radius:3px}
  .node text{font-size:11px;fill:var(--text);paint-order:stroke;stroke:#fff;stroke-width:3px;pointer-events:none}
  .node circle{cursor:pointer;stroke:#fff;stroke-width:1.5px}
  .node.sel circle{stroke:var(--orange);stroke-width:3px}
  .node.dim,.link.dim{opacity:.12}
  .pcard .meta{font-size:12.5px;color:var(--muted);line-height:1.6;margin:2px 0 10px}
  .pcard .sec{font-size:11.5px;font-weight:800;color:var(--muted);margin:12px 0 6px}
  .steps{display:flex;flex-wrap:wrap;gap:4px 0;align-items:center;font-size:12.5px}
  .steps span.st{background:var(--tint);border-radius:3px;padding:2px 7px;cursor:pointer}
  .steps span.st:hover{background:var(--light)}
  .steps span.st small{color:var(--muted);margin-right:4px}
  .steps span.ar{color:#A5AEB7;margin:0 5px}
  .rlist{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:12.5px}
  .rlist .ty{font-size:11px;padding:1px 6px;border-radius:3px;color:#fff;white-space:nowrap;align-self:start;margin-top:2px}
  .rlist a{color:var(--blue);cursor:pointer;text-decoration:none;font-weight:800}
  .bars{display:flex;align-items:flex-end;gap:2px;height:40px}
  .bars div{flex:1;background:var(--light);min-height:1px;border-radius:2px 2px 0 0;cursor:pointer}
  .bars div:hover{background:var(--blue)}
  .barl{display:flex;gap:2px;font-size:9.5px;color:var(--muted)}.barl span{flex:1;text-align:center}
  .btn2{font:inherit;font-size:12px;font-weight:800;border:1px solid var(--blue);color:var(--blue);background:#fff;border-radius:4px;padding:4px 10px;cursor:pointer}
  .btn2:hover{background:var(--tint)}
  .ctab{width:100%;border-collapse:collapse;font-size:12.5px}
  .ctab td,.ctab th{border-bottom:1px solid #EEF2F6;padding:6px 4px;vertical-align:top;text-align:left}
  .ctab th{font-size:11px;color:var(--muted);font-weight:800}
  .ctab td.n{text-align:right;font-variant-numeric:tabular-nums;color:var(--muted);white-space:nowrap}
  .ctab tr.cl{cursor:pointer}.ctab tr.cl:hover td{background:var(--tint)}
  .tscroll{overflow-x:auto}
  .heat{display:grid;grid-template-columns:repeat(14,1fr);gap:1px;min-width:196px}
  .heat span{height:16px;border-radius:2px;background:#F0F3F7;cursor:pointer;font-size:9px;color:#fff;text-align:center;line-height:16px;font-variant-numeric:tabular-nums}
  .heat span.z{cursor:default}
  .heatl{display:grid;grid-template-columns:repeat(14,1fr);gap:1px;font-size:9.5px;color:var(--muted);text-align:center;min-width:196px}
  .pkind{font-size:10.5px;border-radius:3px;padding:1px 6px;background:var(--tint);color:var(--navy);white-space:nowrap}
  .rv{font-size:10.5px;border-radius:3px;padding:1px 6px;background:#FFF0C7;color:#7A5300;white-space:nowrap;font-weight:800}
  .al{border-bottom:1px solid #EEF2F6;padding:10px 4px;cursor:pointer}
  .al:hover{background:var(--tint)}
  .al .h{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:11.5px;color:var(--muted)}
  .al .h b{font-size:14px;color:var(--navy)}
  .al q{display:block;quotes:none;font-size:13.5px;line-height:1.65;margin:5px 0;color:var(--text)}
  .al q em{font-style:normal;font-weight:800;background:#FDE3D3;border-radius:2px;padding:0 1px}
  .al p{margin:3px 0;font-size:12.5px;line-height:1.6}
  .al p span{color:var(--muted);font-weight:800;margin-right:6px}
  .map svg{display:block;width:100%;height:auto;max-height:460px}
  .map text{font-size:10.5px;fill:var(--text);paint-order:stroke;stroke:#FBFCFE;stroke-width:3px}
  .note{font-size:12px;color:var(--muted);line-height:1.6}
  `;
  document.head.appendChild(css);

  // ---------- 데이터 연결 ----------
  window.W_INFO = { push(o) { const w = W.find(x => x.id === o.id); if (!w) return; w.info = o; if (w.loaded) applyInfo(w); } };
  const _push = W_EXTRA.push;
  W_EXTRA.push = function (o) { _push.call(W_EXTRA, o); const w = W.find(x => x.id === o.id); if (w && w.info) applyInfo(w); };
  const _ensure = ensure;
  ensure = function (ids) { const extra = ids.filter(id => (W.find(w => w.id === id) || {}).hasInfo).map(id => id + '.info'); return _ensure(ids.concat(extra)); };
  // 처음 열릴 때 이미 불러온 작품에도 정보 파일을 붙인다
  _ensure([...st.works].filter(id => (W.find(w => w.id === id) || {}).hasInfo).map(id => id + '.info')).then(() => { stats(); side(); renderTabs(); if (tab !== 'search') renderInfo(); }).catch(() => {});

  function applyInfo(w) {
    if (w.infoApplied) return;
    const I = w.info;
    // 지명: 표면형 → 지명 항목
    w.places = w.places || {};
    const form = {};
    (I.places || []).forEach((p, i) => {
      const k = 'PL' + i; p.k = k; p.tags = p.tags || [p.tag || 'L'];
      w.places[k] = { name: p.name, note: [p.kind, p.modern, p.note].filter(Boolean).join(' · ') };
      (p.forms || [p.name]).forEach(f => p.tags.forEach(t => (form[t + ':' + f] = form[t + ':' + f] || []).push(p)));
    });
    // 같은 표기가 회에 따라 다른 곳을 가리키면 units 로 가른다
    const pick = (list, c) => (list.find(p => p.units && p.units.includes(c)) || list.find(p => !p.units) || list[0]).k;
    w.paras.forEach(p => p.sp.forEach(s => { if (s[2] === 'L' || s[2] === 'O') { const l = form[s[2] + ':' + p.t.slice(s[0], s[1])]; if (l) s[3] = pick(l, p.c); } }));
    // 고사: 본문 위치를 찾아 A 태그로 넣는다
    (I.allusions || []).forEach((a, j) => {
      const idxs = w.byUnit[a.c] || []; let pi = -1, pos = -1;
      const tryP = i => { if (i == null || i < 0) return false; const at = w.paras[i].t.indexOf(a.find); if (at >= 0) { pi = i; pos = at; return true; } return false; };
      if (!tryP(idxs[a.p - 1])) idxs.some(tryP);
      a.pi = pi; a.at = pos;
      if (pi >= 0) { const sp = w.paras[pi].sp; if (!sp.some(s => s[2] === 'A' && s[0] === pos)) sp.push([pos, pos + a.find.length, 'A', 'AL' + j]); }
    });
    // 인물별 회별 지칭 수
    w.pc = {}; const nU = w.units.length || 14;
    w.paras.forEach(p => p.sp.forEach(([a, b, t, r]) => { if (t !== 'P' && t !== 'R') return; r.split(' ').filter(Boolean).forEach(id => { const arr = (w.pc[id] = w.pc[id] || new Array(nU).fill(0)); arr[w.units.indexOf(p.c)]++; }); }));
    // 관직 풀이 키(긴 것 먼저)
    w.glossKeys = Object.keys(I.gloss || {}).sort((a, b) => b.length - a.length);
    indexW(w);
    w.infoApplied = true;
  }
  function glossFor(w, s) { if (!w.glossKeys) return null; const k = w.glossKeys.find(k => s.includes(k)); return k ? Object.assign({ k }, w.info.gloss[k]) : null; }

  // 본문 툴팁 확장: 고사 설명, 관직 풀이
  const _tipOne = tipOne;
  tipOne = function (w, x) {
    const t = x.getAttribute('t'), r = x.getAttribute('r') || '';
    if (t === 'A' && w.info && r.startsWith('AL')) {
      if (!st.layers.has('A')) return '';
      const a = w.info.allusions[+r.slice(2)];
      return `<b>고사</b> · ${esc(a.t)}<br><span style="color:var(--light)">${esc(a.gist || '')}</span>${a.src ? `<br>출전: ${esc(a.src)}` : ''}${a.conf === '검토' ? ' <span style="color:var(--orange)">(검토 필요)</span>' : ''}`;
    }
    let s = _tipOne(w, x);
    if (t === 'R' && s && w.info) { const g = glossFor(w, x.textContent); if (g) s += `<br><span style="color:var(--orange)">${esc(g.k)}</span> ${esc(g.note || '')}`; }
    return s;
  };

  // ---------- 화면(세계관 / 작품 읽기)과 탭 ----------
  const TABS = [['search', '본문·검색'], ['rel', '인물 관계'], ['title', '직함'], ['place', '지명'], ['allu', '고사']];
  let wtab = 'search';
  try { const t = localStorage.getItem('gd_tab'); if (t && TABS.some(x => x[0] === t)) wtab = t; } catch (e) {}
  let mode = location.hash === '#works' ? 'works' : 'world';
  let tab = mode === 'world' ? 'world' : wtab;
  const infoW = () => sel().find(w => w.info && w.infoApplied);
  const nav = document.createElement('nav'); nav.className = 'topnav'; nav.setAttribute('aria-label', '화면');
  const badge = document.querySelector('header .badge'); badge.after(nav);
  const readerEmpty = document.getElementById('reader').innerHTML;
  function renderNav() {
    nav.innerHTML = [['world', '세계관'], ['works', '작품 읽기']].map(([k, l]) => `<button data-m="${k}" class="${mode === k ? 'on' : ''}" ${mode === k ? 'aria-current="page"' : ''}>${l}</button>`).join('');
    nav.querySelectorAll('button').forEach(b => b.onclick = () => setMode(b.dataset.m));
  }
  function setMode(m, fromHash) {
    mode = m; tab = m === 'world' ? 'world' : wtab;
    if (!fromHash && location.hash !== '#' + m) { try { location.hash = m; } catch (e) {} }
    document.body.classList.toggle('mode-world', m === 'world');
    const r = document.getElementById('reader');
    if (r.querySelector('.empty')) r.innerHTML = m === 'world' ? '<div class="empty">세계관 화면에서 근거 대목이나 사례를 누르면 여기에 그 작품의 본문이 열립니다.</div>' : readerEmpty;
    renderNav(); stats(); renderTabs();
    if (tab !== 'search') renderInfo(); else run();
  }
  window.addEventListener('hashchange', () => { const m = location.hash === '#works' ? 'works' : 'world'; if (m !== mode) setMode(m, true); });
  const _stats = stats;
  stats = function () { const h = mode === 'world' && window.worldStats && window.worldStats(); if (h) document.getElementById('stats').innerHTML = h; else _stats(); };
  function renderTabs() {
    const w = infoW(), I = w && w.info;
    const n = { rel: I ? (I.rels || []).length : 0, title: I ? Object.keys(I.career || {}).length : 0, place: I ? (I.places || []).length : 0, allu: I ? (I.allusions || []).length : 0 };
    const mt = document.getElementById('mtabs');
    mt.hidden = mode === 'world';
    mt.innerHTML = TABS.map(([k, l]) => `<button data-t="${k}" class="${tab === k ? 'on' : ''}">${l}${k !== 'search' && I ? `<small>${n[k]}</small>` : ''}</button>`).join('');
    mt.querySelectorAll('button').forEach(b => b.onclick = () => setTab(b.dataset.t));
    const isS = tab === 'search';
    document.querySelector('main .search').hidden = !isS;
    document.getElementById('hint').hidden = !isS;
    document.getElementById('res').hidden = !isS;
    document.getElementById('info').hidden = isS;
  }
  function setTab(t) { wtab = tab = t; try { localStorage.setItem('gd_tab', t); } catch (e) {} renderTabs(); if (t !== 'search') renderInfo(); else run(); }
  const _refresh = refresh;
  refresh = async function (after) { await _refresh(after); renderTabs(); if (tab !== 'search') renderInfo(); };
  function searchFor(q, cat) { if (mode === 'world') { mode = 'works'; try { location.hash = 'works'; } catch (e) {} document.body.classList.remove('mode-world'); renderNav(); } wtab = tab = 'search'; renderTabs(); st.cat = cat || 'X'; st.ref = null; document.getElementById('q').value = q; st.q = q; side(); run(); document.querySelector('main').scrollTop = 0; }
  // 본문의 특정 위치 열기
  function openAt(w, pi, a, b, t) { const p = w.paras[pi]; openUnit(w, p.c, pi, { p, a, b, t: t || null }); }
  function openFirst(w, c, test) { const idxs = w.byUnit[c] || []; for (const i of idxs) { const r = test(w.paras[i]); if (r) return openAt(w, i, r[0], r[1], r[2]); } openUnit(w, c); }

  function renderInfo() {
    const box = document.getElementById('info'), w = infoW();
    if (tab === 'world') { if (window.drawWorld) window.drawWorld(box); else box.innerHTML = '<div class="card"><div class="more">세계관 화면을 불러오는 중입니다…</div></div>'; return; }
    if (!w) {
      const pending = sel().some(x => x.hasInfo);
      box.innerHTML = `<div class="card"><div class="more">${pending ? '작품 정보를 불러오는 중입니다…' : `선택한 작품에는 아직 주변 정보가 없습니다. 지금은 <b>${W.filter(x => x.hasInfo).map(x => x.title).join(', ')}</b>만 들어 있습니다.`}</div></div>`;
      return;
    }
    const multiNote = sel().length > 1 ? `<div class="hint">여러 작품을 함께 고른 상태입니다. 작품 정보는 <b>${w.title}</b> 것만 보여 줍니다.</div>` : '';
    box.innerHTML = multiNote + '<div id="ibody"></div>';
    ({ rel: drawRel, title: drawTitle, place: drawPlace, allu: drawAllu })[tab](w, document.getElementById('ibody'));
  }

  // ---------- 인물 관계 ----------
  const RT = { '혈연': '#0A2A5E', '혼인': '#E08E00', '주종': '#7A8590', '공모': '#6B3FA0', '적대·모함': '#C2410C', '조력·구원': '#1E7B4F', '사제·신이': '#0F7C8C', '군신·상하': '#4A6FA5' };
  const GC = ['#01449E', '#C2410C', '#1E7B4F', '#B87800', '#6B3FA0', '#8A2A55', '#0F7C8C', '#5B6B2E', '#9C5B2E', '#4A6FA5', '#A23B72', '#2E7D6B', '#7A8590', '#B0B7BF', '#3D4C5C'];
  const rs = { types: new Set(Object.keys(RT)), upto: 14, min: 20, focus: null, groupsOff: new Set() };
  let d3p = null;
  function needD3() { if (window.d3) return Promise.resolve(); return d3p || (d3p = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js'; s.onload = ok; s.onerror = () => { d3p = null; no(); }; document.head.appendChild(s); })); }
  function personTotal(w, id) { return (w.pc[id] || []).reduce((a, b) => a + b, 0); }
  function firstUnit(w, id) { const a = w.pc[id]; if (!a) return 99; const i = a.findIndex(x => x > 0); return i < 0 ? 99 : w.units[i]; }
  function groupList(w) { const g = []; Object.values(w.info.groups || {}).forEach(x => { if (!g.includes(x)) g.push(x); }); return g; }
  function gcolor(w, id) { const g = (w.info.groups || {})[id]; const gl = groupList(w); return GC[Math.max(0, gl.indexOf(g)) % GC.length]; }

  function drawRel(w, el) {
    const I = w.info, gl = groupList(w).filter(g => !/고사 속|익명/.test(g));
    el.innerHTML = `<div class="card">
      <div class="ibar">관계 <span id="rtypes"></span></div>
      <div class="ibar"><label for="rupto">회차</label><input type="range" id="rupto" min="1" max="${w.units.length}" value="${rs.upto}"><span id="ruptoL"></span>
        <label for="rmin" style="margin-left:10px">인물</label><select id="rmin"><option value="0">관계 있는 인물 전부</option><option value="10">지칭 10회 이상</option><option value="20">지칭 20회 이상</option><option value="50">지칭 50회 이상</option><option value="100">지칭 100회 이상</option></select></div>
      <div class="ibar">집단 <span id="rgroups"></span></div>
      <div class="gwrap"><svg id="gsvg" role="img" aria-label="${w.title} 인물 관계도"></svg><div class="gl">끌어서 옮기기 · 휠로 확대 · 인물을 누르면 아래에 정보</div></div>
      <div class="note" style="margin-top:6px">회차를 줄이면 그 회까지 드러난 관계만 남습니다. 선 굵기는 관계 유형, 화살표는 누가 누구에게 한 일인지를 뜻합니다.</div>
    </div><div class="card pcard" id="pcard"><div class="more">인물을 누르면 설명·직함 변천·관계·회별 등장이 여기에 나옵니다.</div></div>
    <div class="card"><div class="k">관계 목록 <span style="font-weight:400" id="rcount"></span></div><div class="tscroll"><table class="ctab" id="rtable"></table></div></div>`;
    document.getElementById('rmin').value = rs.min;
    const types = document.getElementById('rtypes');
    types.innerHTML = Object.keys(RT).map(t => `<button class="ichip ${rs.types.has(t) ? '' : 'off'}" data-t="${t}"><i style="background:${RT[t]}"></i>${t}<b>${I.rels.filter(r => r[2] === t).length}</b></button>`).join('');
    types.querySelectorAll('button').forEach(b => b.onclick = () => { rs.types.has(b.dataset.t) ? rs.types.delete(b.dataset.t) : rs.types.add(b.dataset.t); b.classList.toggle('off'); update(); });
    const grp = document.getElementById('rgroups');
    grp.innerHTML = gl.map(g => { const ids = Object.keys(I.groups).filter(id => I.groups[id] === g); return `<button class="ichip ${rs.groupsOff.has(g) ? 'off' : ''}" data-g="${esc(g)}"><i style="background:${gcolor(w, ids[0])}"></i>${esc(g)}<b>${ids.length}</b></button>`; }).join('');
    grp.querySelectorAll('button').forEach(b => b.onclick = () => { const g = b.dataset.g; rs.groupsOff.has(g) ? rs.groupsOff.delete(g) : rs.groupsOff.add(g); b.classList.toggle('off'); update(); });
    const upto = document.getElementById('rupto');
    upto.oninput = () => { rs.upto = +upto.value; update(); };
    document.getElementById('rmin').onchange = e => { rs.min = +e.target.value; update(); };

    let sim = null;
    function current() {
      const ok = id => w.persons[id] && !rs.groupsOff.has(I.groups[id]) && personTotal(w, id) >= rs.min && firstUnit(w, id) <= rs.upto;
      const links = I.rels.filter(r => rs.types.has(r[2]) && (+r[4] || 1) <= rs.upto && ok(r[0]) && ok(r[1]));
      const ids = new Set(); links.forEach(r => { ids.add(r[0]); ids.add(r[1]); });
      return { links, ids: [...ids] };
    }
    function update() {
      document.getElementById('ruptoL').textContent = rs.upto + w.unit + '까지';
      const { links, ids } = current();
      table(links);
      if (!window.d3) return;
      graph(links, ids);
    }
    function table(links) {
      document.getElementById('rcount').textContent = links.length + '건';
      const nm = id => esc(pname(w, id));
      document.getElementById('rtable').innerHTML = '<tr><th>인물</th><th>관계</th><th>상대</th><th>유형</th><th>회</th></tr>' + links.slice().sort((a, b) => (+a[4] || 0) - (+b[4] || 0)).map(r => `<tr class="cl" data-a="${r[0]}"><td><b>${nm(r[0])}</b></td><td>${esc(r[3] || '')}</td><td>${nm(r[1])}</td><td><span style="color:${RT[r[2]]};font-weight:800">${r[2]}</span></td><td class="n">${r[4] || ''}</td></tr>`).join('');
      document.querySelectorAll('#rtable tr.cl').forEach(tr => tr.onclick = () => focus(tr.dataset.a));
    }
    function graph(links, ids) {
      const svg = d3.select('#gsvg'); if (svg.empty()) return;
      const W0 = svg.node().clientWidth || 600, H0 = 540;
      svg.attr('viewBox', [0, 0, W0, H0]);
      svg.selectAll('*').remove();
      const defs = svg.append('defs');
      Object.entries(RT).forEach(([t, c], i) => defs.append('marker').attr('id', 'ar' + i).attr('viewBox', '0 -4 8 8').attr('refX', 8).attr('refY', 0).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('path').attr('d', 'M0,-4L8,0L0,4').attr('fill', c));
      const g = svg.append('g');
      svg.call(d3.zoom().scaleExtent([.3, 4]).on('zoom', e => g.attr('transform', e.transform)));
      const old = sim ? new Map(sim.nodes().map(n => [n.id, n])) : new Map();
      const nodes = ids.map(id => { const o = old.get(id); return { id, n: personTotal(w, id), x: o ? o.x : W0 / 2 + (Math.random() - .5) * 200, y: o ? o.y : H0 / 2 + (Math.random() - .5) * 200 }; });
      const L = links.map(r => ({ source: r[0], target: r[1], t: r[2], l: r[3] }));
      const rad = d => 4 + Math.sqrt(d.n) * .75;
      const dir = t => !['혈연', '혼인'].includes(t);
      const link = g.append('g').selectAll('line').data(L).join('line').attr('class', 'link').attr('stroke', d => RT[d.t]).attr('stroke-width', d => d.t === '혈연' || d.t === '혼인' ? 2.2 : 1.3).attr('stroke-dasharray', d => d.t === '적대·모함' ? '5 3' : d.t === '주종' ? '2 2' : null).attr('marker-end', d => dir(d.t) ? `url(#ar${Object.keys(RT).indexOf(d.t)})` : null);
      link.append('title').text(d => `${pname(w, d.source)} → ${pname(w, d.target)}: ${d.l} (${d.t})`);
      const node = g.append('g').selectAll('g').data(nodes).join('g').attr('class', 'node');
      node.append('circle').attr('r', rad).attr('fill', d => gcolor(w, d.id));
      node.append('text').text(d => pname(w, d.id)).attr('x', d => rad(d) + 3).attr('y', 4);
      node.on('click', (e, d) => focus(d.id));
      node.call(d3.drag().on('start', (e, d) => { if (!e.active) sim.alphaTarget(.25).restart(); d.fx = d.x; d.fy = d.y; }).on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; }).on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));
      if (sim) sim.stop();
      sim = d3.forceSimulation(nodes).force('link', d3.forceLink(L).id(d => d.id).distance(d => d.t === '혈연' || d.t === '혼인' ? 55 : 95).strength(.5)).force('charge', d3.forceManyBody().strength(-230)).force('center', d3.forceCenter(W0 / 2, H0 / 2)).force('x', d3.forceX(W0 / 2).strength(.04)).force('y', d3.forceY(H0 / 2).strength(.06)).force('col', d3.forceCollide().radius(d => rad(d) + 10));
      sim.on('tick', () => {
        link.each(function (d) { const dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, len = Math.hypot(dx, dy) || 1, rt = rad(d.target) + 2; d3.select(this).attr('x1', d.source.x).attr('y1', d.source.y).attr('x2', d.target.x - dx / len * rt).attr('y2', d.target.y - dy / len * rt); });
        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { sim.stop(); for (let i = 0; i < 300; i++) sim.tick(); sim.on('tick')(); }
      highlight();
    }
    function highlight() {
      if (!window.d3) return;
      const f = rs.focus;
      const nb = new Set([f]);
      if (f) I.rels.forEach(r => { if (r[0] === f) nb.add(r[1]); if (r[1] === f) nb.add(r[0]); });
      d3.selectAll('#gsvg .node').classed('sel', d => d.id === f).classed('dim', d => f && !nb.has(d.id));
      d3.selectAll('#gsvg .link').classed('dim', d => f && d.source.id !== f && d.target.id !== f);
    }
    function focus(id) { rs.focus = rs.focus === id && document.getElementById('pcard').dataset.id === id ? null : id; highlight(); personCard(w, rs.focus, focus); }
    update();
    personCard(w, rs.focus, focus);
    needD3().then(update).catch(() => { document.querySelector('.gwrap').innerHTML = '<div class="more" style="padding:20px">관계도 그리기 도구를 불러오지 못했습니다. 아래 관계 목록은 그대로 쓸 수 있습니다.</div>'; });
  }

  function personCard(w, id, focus) {
    const box = document.getElementById('pcard'); if (!box) return;
    box.dataset.id = id || '';
    if (!id) { box.innerHTML = '<div class="more">인물을 누르면 설명·직함 변천·관계·회별 등장이 여기에 나옵니다.</div>'; return; }
    const I = w.info, p = w.persons[id] || { name: id }, arr = w.pc[id] || [], mx = Math.max(1, ...arr);
    const rels = I.rels.filter(r => r[0] === id || r[1] === id);
    const car = (I.career || {})[id] || [];
    box.innerHTML = `<h4>${esc(p.name)} <span class="pkind">${esc(I.groups[id] || '')}</span></h4>
      <div class="meta">${esc(p.note || '')}${p.alias && p.alias.length ? `<br>달리 부르는 말: ${p.alias.map(esc).join(', ')}` : ''}<br>지칭 ${nf(personTotal(w, id))}회 · ${arr.filter(Boolean).length}개 ${w.unit}에 등장</div>
      ${car.length ? `<div class="sec">직함·봉작 변천</div>${steps(w, id, car)}` : ''}
      <div class="sec">${w.unit}별 등장 <span style="font-weight:400">막대를 누르면 그 ${w.unit}의 첫 등장 대목이 열립니다</span></div>
      <div class="bars">${arr.map((n, i) => `<div data-u="${w.units[i]}" title="${w.units[i]}${w.unit} ${n}회" style="height:${Math.round(n / mx * 100)}%"></div>`).join('')}</div><div class="barl">${w.units.map(u => `<span>${u}</span>`).join('')}</div>
      <div class="sec">관계 ${rels.length}건</div>
      <div class="rlist">${rels.map(r => { const other = r[0] === id ? r[1] : r[0]; const txt = r[0] === id ? `${esc(pname(w, other))}의 ${esc(r[3])}` : `${esc(r[3])}: ${esc(pname(w, other))}`; return `<span class="ty" style="background:${RT[r[2]] || '#7A8590'}">${r[2]}</span><span>${r[0] === id ? `<a data-p="${other}">${esc(pname(w, other))}</a>의 ${esc(r[3])}` : `<a data-p="${other}">${esc(pname(w, other))}</a>는 이 인물의 ${esc(r[3])}`}${r[4] ? ` <small style="color:var(--muted)">${r[4]}${w.unit}</small>` : ''}</span>`; }).join('')}</div>
      <div style="margin-top:12px"><button class="btn2" id="pse">이 인물을 가리킨 모든 용례 보기</button></div>`;
    box.querySelectorAll('.bars div').forEach(b => b.onclick = () => openFirst(w, +b.dataset.u, pa => { const s = pa.sp.find(s => (s[2] === 'P' || s[2] === 'R') && s[3].split(' ').includes(id)); return s ? [s[0], s[1], s[2]] : null; }));
    box.querySelectorAll('a[data-p]').forEach(a => a.onclick = () => focus(a.dataset.p));
    box.querySelector('#pse').onclick = () => searchFor(p.name, 'PR');
    bindSteps(box, w);
  }
  function steps(w, id, car) {
    return `<div class="steps">${car.map((c, i) => `${i ? '<span class="ar">›</span>' : ''}<span class="st" data-c="${c[0]}" data-q="${esc(c[2] || '')}" title="${esc(c[2] || '')}"><small>${c[0]}${w.unit}</small>${esc(c[1])}</span>`).join('')}</div>`;
  }
  function bindSteps(box, w) {
    box.querySelectorAll('.steps .st').forEach(s => s.onclick = () => { const q = s.dataset.q; openFirst(w, +s.dataset.c, pa => { const i = q ? pa.t.indexOf(q) : -1; return i >= 0 ? [i, i + q.length, null] : null; }); });
  }

  // ---------- 직함 ----------
  function drawTitle(w, el) {
    const I = w.info, car = I.career || {};
    const ids = Object.keys(car).filter(id => w.persons[id]).sort((a, b) => personTotal(w, b) - personTotal(w, a));
    // 관직어 사용 빈도: R 태그 표면형에 풀이 키가 들어 있는 경우
    const use = {};
    w.paras.forEach(p => p.sp.forEach(([a, b, t, r]) => { if (t !== 'R') return; const s = p.t.slice(a, b); const k = w.glossKeys.find(k => s.includes(k)); if (!k) return; const u = (use[k] = use[k] || { n: 0, who: {} }); u.n++; r.split(' ').filter(Boolean).forEach(id => u.who[id] = (u.who[id] || 0) + 1); }));
    const keys = Object.keys(I.gloss || {});
    el.innerHTML = `<div class="card"><div class="k">인물별 직함·봉작 변천 · ${ids.length}명 <span style="font-weight:400">칸을 누르면 임명·봉작 대목이 열립니다</span></div>
      <div class="tscroll"><table class="ctab">${ids.map(id => `<tr><td style="width:84px"><a style="font-weight:800;color:var(--navy);cursor:pointer" data-p="${id}">${esc(pname(w, id))}</a><br><small style="color:var(--muted)">${esc(I.groups[id] || '')}</small></td><td>${steps(w, id, car[id])}</td></tr>`).join('')}</table></div></div>
      <div class="card"><div class="k">관직·작위 풀이 · ${keys.length}개</div>
      <div class="ibar"><input type="search" id="gq" placeholder="관직명으로 거르기" aria-label="관직명으로 거르기"><label><input type="checkbox" id="gused"> 본문 호칭에 쓰인 것만</label></div>
      <div class="tscroll"><table class="ctab" id="gtab"></table></div>
      <div class="note" style="margin-top:8px">풀이는 명대 관제를 기준으로 했습니다. 작품 속 관직은 실제 관제와 어긋나는 경우가 있어 그런 점은 풀이에 따로 적었습니다. <span class="rv">검토</span> 표시는 사실 확인이 더 필요한 항목입니다.</div></div>`;
    bindSteps(el, w);
    el.querySelectorAll('a[data-p]').forEach(a => a.onclick = () => { tab = 'rel'; rs.focus = a.dataset.p; renderTabs(); renderInfo(); });
    const tb = el.querySelector('#gtab');
    const draw = () => {
      const q = el.querySelector('#gq').value.trim(), only = el.querySelector('#gused').checked;
      const rows = keys.filter(k => (!q || k.includes(q) || (I.gloss[k].full || '').includes(q)) && (!only || use[k])).sort((a, b) => ((use[b] || {}).n || 0) - ((use[a] || {}).n || 0));
      tb.innerHTML = '<tr><th>직함</th><th>풀이</th><th>쓰인 인물</th><th>호칭</th></tr>' + rows.map(k => { const g = I.gloss[k], u = use[k]; const who = u ? Object.entries(u.who).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => esc(pname(w, id))).join(', ') : ''; return `<tr class="cl" data-k="${esc(k)}"><td><b>${esc(k)}</b>${g.conf === '검토' ? ' <span class="rv">검토</span>' : ''}<br><small style="color:var(--muted)">${esc(g.full || '')}</small></td><td>${esc(g.note || '')}</td><td style="min-width:70px">${who}</td><td class="n">${u ? nf(u.n) : '–'}</td></tr>`; }).join('');
      tb.querySelectorAll('tr.cl').forEach(tr => tr.onclick = () => searchFor(tr.dataset.k, 'PR'));
    };
    el.querySelector('#gq').oninput = draw; el.querySelector('#gused').onchange = draw; draw();
  }

  // ---------- 지명 ----------
  const ps = { kinds: null, sort: 'first' };
  function drawPlace(w, el) {
    const I = w.info, PL = I.places || [];
    // 지명별 회별 빈도와 첫 등장
    const cnt = {}; PL.forEach(p => cnt[p.k] = new Array(w.units.length).fill(0));
    w.paras.forEach(p => p.sp.forEach(s => { if ((s[2] === 'L' || s[2] === 'O') && cnt[s[3]]) cnt[s[3]][w.units.indexOf(p.c)]++; }));
    const kinds = []; PL.forEach(p => { if (!kinds.includes(p.kind)) kinds.push(p.kind); });
    if (!ps.kinds) ps.kinds = new Set(kinds.filter(k => !/태깅 오류/.test(k)));
    const tot = k => cnt[k].reduce((a, b) => a + b, 0);
    const first = k => { const i = cnt[k].findIndex(Boolean); return i < 0 ? 99 : i; };
    const geo = PL.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number' && tot(p.k) > 0);
    el.innerHTML = `<div class="card"><div class="ibar">갈래 <span id="pk"></span></div>
      <div class="ibar"><label for="psort">정렬</label><select id="psort"><option value="first">처음 나오는 순</option><option value="n">많이 나오는 순</option><option value="name">가나다순</option></select></div>
      <div class="tscroll"><table class="ctab" id="ptab"></table></div>
      <div class="note" style="margin-top:8px">칸의 숫자는 그 ${w.unit}에서 장소로 태깅된 횟수입니다. 칸을 누르면 그 ${w.unit}의 첫 용례가 열리고, 이름을 누르면 전체 용례를 찾습니다.</div></div>
      ${geo.length ? `<div class="card map"><div class="k">실재 지명 대략 위치 · ${geo.length}곳 <span style="font-weight:400">경위도 기준 점 배치(해안선·경계 없음)</span></div><div id="pmap"></div></div>` : ''}`;
    const pk = el.querySelector('#pk');
    pk.innerHTML = kinds.map(k => `<button class="ichip ${ps.kinds.has(k) ? '' : 'off'}" data-k="${esc(k)}">${esc(k)}<b>${PL.filter(p => p.kind === k).length}</b></button>`).join('');
    pk.querySelectorAll('button').forEach(b => b.onclick = () => { const k = b.dataset.k; ps.kinds.has(k) ? ps.kinds.delete(k) : ps.kinds.add(k); b.classList.toggle('off'); table(); });
    const so = el.querySelector('#psort'); so.value = ps.sort; so.onchange = () => { ps.sort = so.value; table(); };
    function table() {
      let rows = PL.filter(p => ps.kinds.has(p.kind));
      rows.sort(ps.sort === 'n' ? (a, b) => tot(b.k) - tot(a.k) : ps.sort === 'name' ? (a, b) => a.name.localeCompare(b.name, 'ko') : (a, b) => first(a.k) - first(b.k) || tot(b.k) - tot(a.k));
      const mx = Math.max(1, ...rows.flatMap(p => cnt[p.k]));
      el.querySelector('#ptab').innerHTML = `<tr><th>지명</th><th style="min-width:200px"><div class="heatl">${w.units.map(u => `<span>${u}</span>`).join('')}</div></th><th>계</th></tr>` + rows.map(p => `<tr><td style="min-width:150px"><a style="font-weight:800;color:var(--navy);cursor:pointer" data-n="${esc(p.forms && p.forms[0] || p.name)}" data-t="${p.tags[0]}">${esc(p.name)}</a> <span class="pkind">${esc(p.kind)}</span>${p.conf === '검토' ? ' <span class="rv">검토</span>' : ''}${p.forms && p.forms.length > 1 ? `<br><small style="color:var(--muted)">${p.forms.filter(f => f !== p.name).map(esc).join(', ')}</small>` : ''}<div class="note">${p.modern ? esc(p.modern) + '<br>' : ''}${esc(p.note || '')}</div></td><td><div class="heat">${cnt[p.k].map((n, i) => `<span class="${n ? '' : 'z'}" data-k="${p.k}" data-u="${w.units[i]}" title="${w.units[i]}${w.unit} ${n}회" style="${n ? `background:rgba(30,123,79,${.25 + .75 * n / mx})` : ''}">${n || ''}</span>`).join('')}</div></td><td class="n">${tot(p.k)}</td></tr>`).join('');
      el.querySelectorAll('#ptab .heat span:not(.z)').forEach(c => c.onclick = () => { const k = c.dataset.k; openFirst(w, +c.dataset.u, pa => { const s = pa.sp.find(s => (s[2] === 'L' || s[2] === 'O') && s[3] === k); return s ? [s[0], s[1], s[2]] : null; }); });
      el.querySelectorAll('#ptab a[data-n]').forEach(a => a.onclick = () => searchFor(a.dataset.n, a.dataset.t));
    }
    table();
    if (geo.length) map(geo);
    function map(pts) {
      const lo = [Math.min(...pts.map(p => p.lng)) - 1.5, Math.max(...pts.map(p => p.lng)) + 1.5], la = [Math.min(...pts.map(p => p.lat)) - 1.2, Math.max(...pts.map(p => p.lat)) + 1.2];
      const Wd = 600, k = Wd / (lo[1] - lo[0]), Hd = Math.round((la[1] - la[0]) * k * 1.1);
      const X = x => (x - lo[0]) * k, Y = y => (la[1] - y) * k * 1.1;
      let grid = '';
      for (let x = Math.ceil(lo[0] / 5) * 5; x <= lo[1]; x += 5) grid += `<line x1="${X(x)}" x2="${X(x)}" y1="0" y2="${Hd}" stroke="#E3E9F0"/><text x="${X(x) + 3}" y="${Hd - 4}" style="fill:#8A949D;font-size:9px">${x}°E</text>`;
      for (let y = Math.ceil(la[0] / 5) * 5; y <= la[1]; y += 5) grid += `<line y1="${Y(y)}" y2="${Y(y)}" x1="0" x2="${Wd}" stroke="#E3E9F0"/><text x="3" y="${Y(y) - 3}" style="fill:#8A949D;font-size:9px">${y}°N</text>`;
      const r = p => 3 + Math.sqrt(tot(p.k)) * 1.3;
      document.getElementById('pmap').innerHTML = `<svg viewBox="0 0 ${Wd} ${Hd}" role="img" aria-label="실재 지명 대략 위치"><rect width="${Wd}" height="${Hd}" fill="#FBFCFE"/>${grid}${pts.sort((a, b) => tot(b.k) - tot(a.k)).map(p => `<g style="cursor:pointer" data-n="${esc(p.forms && p.forms[0] || p.name)}"><circle cx="${X(p.lng)}" cy="${Y(p.lat)}" r="${r(p)}" fill="rgba(30,123,79,.55)" stroke="#1E7B4F"/><text x="${X(p.lng) + r(p) + 2}" y="${Y(p.lat) + 4}">${esc(p.name)}</text><title>${esc(p.name)} · ${esc(p.modern || '')} · ${tot(p.k)}회</title></g>`).join('')}</svg>`;
      document.querySelectorAll('#pmap g[data-n]').forEach(g => g.onclick = () => searchFor(g.dataset.n, 'L'));
    }
  }

  // ---------- 고사 ----------
  const as = { kind: '', c: '', rv: false, q: '' };
  function drawAllu(w, el) {
    const A = w.info.allusions || [];
    const kinds = []; A.forEach(a => { if (!kinds.includes(a.kind)) kinds.push(a.kind); });
    el.innerHTML = `<div class="card"><div class="ibar"><button class="ichip ${as.kind ? 'off' : ''}" data-k="">전체<b>${A.length}</b></button>${kinds.map(k => `<button class="ichip ${as.kind && as.kind !== k ? 'off' : ''}" data-k="${esc(k)}">${esc(k)}<b>${A.filter(a => a.kind === k).length}</b></button>`).join('')}</div>
      <div class="ibar"><label for="ac">${w.unit}</label><select id="ac"><option value="">전체</option>${w.units.map(u => `<option value="${u}">${u}${w.unit} (${A.filter(a => a.c === u).length})</option>`).join('')}</select>
      <input type="search" id="aq" placeholder="표제·출전·설명에서 찾기" aria-label="고사 거르기"><label><input type="checkbox" id="arv"> 검토 필요만</label></div>
      <div id="alist"></div>
      <div class="note" style="margin-top:8px">출전·설명은 이 DB를 위해 새로 단 것으로 원서의 역주와는 별개입니다. <span class="rv">검토</span> 표시는 출전 편명이나 해석을 원전과 다시 대조해야 하는 항목입니다. 항목을 누르면 오른쪽 본문에서 그 자리가 열립니다.</div></div>`;
    el.querySelectorAll('.ibar .ichip').forEach(b => b.onclick = () => { as.kind = b.dataset.k; el.querySelectorAll('.ibar .ichip').forEach(x => x.classList.toggle('off', as.kind ? x.dataset.k !== as.kind : false)); list(); });
    const ac = el.querySelector('#ac'), aq = el.querySelector('#aq'), arv = el.querySelector('#arv');
    ac.value = as.c; aq.value = as.q; arv.checked = as.rv;
    ac.onchange = () => { as.c = ac.value; list(); }; aq.oninput = () => { as.q = aq.value.trim(); list(); }; arv.onchange = () => { as.rv = arv.checked; list(); };
    function list() {
      const rows = A.map((a, j) => [a, j]).filter(([a]) => (!as.kind || a.kind === as.kind) && (!as.c || a.c === +as.c) && (!as.rv || a.conf === '검토') && (!as.q || [a.t, a.src, a.gist, a.use, a.find].join(' ').includes(as.q)));
      el.querySelector('#alist').innerHTML = rows.length ? rows.map(([a, j]) => {
        let quote = '';
        if (a.pi >= 0) { const t = w.paras[a.pi].t, L = Math.max(0, a.at - 40), R = Math.min(t.length, a.at + a.find.length + 40); quote = `${L > 0 ? '…' : ''}${esc(t.slice(L, a.at))}<em>${esc(a.find)}</em>${esc(t.slice(a.at + a.find.length, R))}${R < t.length ? '…' : ''}`; }
        const pn = a.pi >= 0 ? w.byUnit[a.c].indexOf(a.pi) + 1 : a.p;
        return `<div class="al" data-j="${j}"><div class="h"><b>${esc(a.t)}</b><span>${a.c}${w.unit} · ${pn}문단</span><span class="pkind">${esc(a.kind)}</span>${a.conf === '검토' ? '<span class="rv">검토</span>' : ''}</div>${quote ? `<q>${quote}</q>` : ''}${a.src ? `<p><span>출전</span>${esc(a.src)}</p>` : ''}<p><span>내용</span>${esc(a.gist || '')}</p>${a.use ? `<p><span>작중</span>${esc(a.use)}</p>` : ''}</div>`;
      }).join('') : '<div class="more">조건에 맞는 고사가 없습니다.</div>';
      el.querySelectorAll('.al').forEach(d => d.onclick = () => { const a = A[+d.dataset.j]; if (a.pi >= 0) openAt(w, a.pi, a.at, a.at + a.find.length, 'A'); else openUnit(w, a.c); });
    }
    list();
  }

  window.__gd = { openAt, openUnit: (w, c) => openUnit(w, c), searchFor, renderInfo, isWorld: () => mode === 'world', setMode };
  setMode(mode, true);
})();

/* ---------- 휴대폰에서 작품 읽기 ----------
   좁은 화면에서는 왼쪽 설정 칸을 접고, 회·권이나 용례를 누르면 본문이 화면 전체로 열린다.
   태그 설명은 손가락으로 누르면 아래쪽에 뜬다. */
(function () {
  const mq = matchMedia('(max-width: 900px)');
  const css = document.createElement('style');
  css.textContent = `
  @media (max-width: 900px){
    header #stats{display:none!important}
    header{gap:8px;padding-top:10px;padding-bottom:10px}
    header h1{font-size:16px}
    .topnav{margin-left:0;flex-wrap:wrap}
    .topnav button{font-size:14px;padding:6px 8px}
    body:not(.mode-world) aside{display:none}
    body:not(.mode-world).m-aside aside{display:block;position:fixed;inset:0;z-index:35;overflow:auto;padding:0 16px 90px;-webkit-overflow-scrolling:touch}
    body.m-aside{overflow:hidden}
    .m-ahead{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:8px;background:#fff;margin:0 -16px 12px;padding:12px 16px;border-bottom:1px solid var(--line)}
    .m-ahead b{font-size:16px;color:var(--navy)}
    .m-ahead button,.m-afoot button{font:inherit;font-size:14px;font-weight:800;border:0;background:var(--navy);color:#fff;border-radius:18px;padding:8px 16px;cursor:pointer;margin-left:auto}
    .m-afoot{position:fixed;left:0;right:0;bottom:0;z-index:36;background:#fff;border-top:1px solid var(--line);padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));display:flex}
    .m-afoot button{margin:0;width:100%;padding:12px}
    aside .chk,aside .cat{padding:9px 8px;font-size:15px}
    aside .orig{max-height:none!important}
    .m-bar{display:flex;gap:8px;margin:2px 0 10px;flex-wrap:wrap}
    .m-bar button{font:inherit;font-size:14px;font-weight:800;border:1px solid var(--line);background:#fff;color:var(--navy);border-radius:18px;padding:8px 14px;cursor:pointer}
    .m-bar button.on{background:var(--navy);color:#fff;border-color:var(--navy)}
    body:not(.mode-world) section.reader{display:none}
    body:not(.mode-world).m-read section.reader{display:block;position:fixed;inset:0;z-index:30;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch}
    body.m-read{overflow:hidden}
    .rhead{flex-wrap:wrap;gap:6px 10px;padding:10px 12px}
    .rhead .m-back{font:inherit;font-size:14px;font-weight:800;border:0;background:var(--navy);color:#fff;border-radius:16px;padding:6px 12px;cursor:pointer}
    .rhead .nav{margin-left:0;width:100%;justify-content:space-between}
    .rhead .nav button{font-size:14px;padding:7px 12px}
    .rhead .m-fs{display:inline-flex;gap:4px;margin-left:auto}
    .rhead .m-fs button{font:inherit;font-size:13px;font-weight:800;border:1px solid var(--line);background:#fff;border-radius:4px;padding:4px 9px;cursor:pointer}
    .rtext{padding:12px 14px 120px;font-size:var(--m-fs,17px);line-height:1.9}
    .rtext p{padding:4px 2px}
    #tip.m-tip{left:10px!important;right:10px;top:auto!important;bottom:12px;max-width:none;font-size:14px;padding:12px 14px;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.3);z-index:40}
    .kw{padding:10px 4px}
    .kw .ctx{font-size:15px}
    .toc{grid-template-columns:repeat(2,minmax(0,1fr))}
  }
  .m-bar{display:none}.m-ahead,.m-afoot{display:none}
  @media (max-width: 900px){ .m-bar{display:flex} body.m-aside .m-ahead,body.m-aside .m-afoot{display:flex} }`;
  document.head.appendChild(css);

  // 설정 칸 여닫기 버튼
  const main = document.querySelector('main'), search = document.querySelector('.search');
  const bar = document.createElement('div'); bar.className = 'm-bar';
  bar.innerHTML = '<button type="button" id="mAside">작품 고르기·검색 설정</button><button type="button" id="mLast" hidden>읽던 본문 열기</button>';
  search.parentNode.insertBefore(bar, search.nextSibling);
  const aside = document.querySelector('aside');
  const ah = document.createElement('div'); ah.className = 'm-ahead';
  ah.innerHTML = '<b>작품 고르기·검색 설정</b><button type="button">닫기 ✕</button>';
  aside.insertBefore(ah, aside.firstChild);
  const af = document.createElement('div'); af.className = 'm-afoot';
  af.innerHTML = '<button type="button">적용하고 닫기</button>';
  document.body.appendChild(af);
  const setAside = on => { document.body.classList.toggle('m-aside', on); bar.querySelector('#mAside').classList.toggle('on', on); if (on) aside.scrollTop = 0; };
  ah.querySelector('button').onclick = () => setAside(false);
  af.querySelector('button').onclick = () => setAside(false);
  bar.querySelector('#mAside').onclick = () => setAside(!document.body.classList.contains('m-aside'));
  bar.querySelector('#mLast').onclick = () => openRead();
  // 작품을 고르면 설정 칸을 다시 접는다
  document.querySelector('aside').addEventListener('change', e => {
    if (mq.matches && e.target.matches('input[data-w]') && !document.getElementById('multi').checked) {
      setAside(false);
    }
  });
  aside.addEventListener('click', e => { if (mq.matches && e.target.closest('.cat')) setTimeout(() => setAside(false), 120); });

  let fs = 17; try { fs = +localStorage.getItem('gd_mfs') || 17; } catch (e) {}
  const applyFs = () => document.documentElement.style.setProperty('--m-fs', fs + 'px');
  applyFs();

  function openRead() {
    if (!mq.matches || document.body.classList.contains('mode-world')) return;
    document.body.classList.add('m-read');
    try { history.pushState({ mread: 1 }, ''); } catch (e) {}
  }
  function closeRead() {
    document.body.classList.remove('m-read');
    const tp = document.getElementById('tip'); if (tp) { tp.style.display = 'none'; tp.classList.remove('m-tip'); }
  }
  window.addEventListener('popstate', () => { if (document.body.classList.contains('m-read')) closeRead(); });

  // 본문을 열 때마다 머리줄에 돌아가기·글자 크기 단추를 붙이고 전체 화면으로 연다
  const orig = window.openUnit;
  window.openUnit = function (w, c, pi, h) {
    const r = orig.apply(this, arguments);
    const head = document.querySelector('#reader .rhead');
    if (head && !head.querySelector('.m-back') && mq.matches) {
      const b = document.createElement('button'); b.className = 'm-back'; b.type = 'button'; b.textContent = '← 목록';
      b.onclick = () => { if (history.state && history.state.mread) history.back(); else closeRead(); };
      head.insertBefore(b, head.firstChild);
      const f = document.createElement('span'); f.className = 'm-fs';
      f.innerHTML = '<button type="button" data-d="-1" aria-label="글자 작게">가-</button><button type="button" data-d="1" aria-label="글자 크게">가+</button>';
      f.querySelectorAll('button').forEach(x => x.onclick = () => { fs = Math.max(14, Math.min(24, fs + +x.dataset.d)); applyFs(); try { localStorage.setItem('gd_mfs', fs); } catch (e) {} });
      head.insertBefore(f, head.querySelector('.nav'));
    }
    if (!document.body.classList.contains('m-read')) openRead();
    const rd = document.getElementById('reader'); if (pi == null) rd.scrollTop = 0;
    document.getElementById('mLast').hidden = false;
    return r;
  };

  // 태그 설명: 손가락으로 누르면 아래쪽에 띄운다
  document.getElementById('reader').addEventListener('click', ev => {
    if (!mq.matches) return;
    const x = ev.target.closest('x-t'), tp = document.getElementById('tip');
    if (!x || !st.cur) { tp.style.display = 'none'; tp.classList.remove('m-tip'); return; }
    tip(ev, st.cur.w, x); tp.classList.add('m-tip');
  });
})();
