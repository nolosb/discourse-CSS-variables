/* Shared page behaviour: theme, section index, and the interactive parts of each page. */
/* ---------- rendering helpers ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function segLine(segs) {
  return '<span class="seg-line">' + segs.map((s, i) =>
    (i > 0 && !(segs[i - 1].slot === "prefix" && segs[i - 1].w === "--") ? '<span class="dash">-</span>' : "") +
    `<span class="seg c-${s.slot}"><span class="w">${esc(s.w)}</span><span class="l">${esc(s.label)}</span></span>`
  ).join("") + "</span>";
}


/* ---------- section index with scroll-spy ---------- */
(function () {
  const box = document.getElementById("toc-links");
  if (!box) return;
  const heads = [...document.querySelectorAll("main h2[id]")];
  box.innerHTML = heads.map(h => {
    const n = h.querySelector(".n");
    const label = [...h.childNodes].filter(c => c !== n).map(c => c.textContent).join("").trim();
    return `<a href="#${h.id}">${n ? `<span class="n">${esc(n.textContent)}</span>` : ""}<span>${esc(label)}</span></a>`;
  }).join("");
  const links = [...box.querySelectorAll("a")];
  function spy() {
    let i = 0;
    heads.forEach((h, j) => { if (h.getBoundingClientRect().top < 140) i = j; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) i = heads.length - 1;
    links.forEach((l, j) => l.classList.toggle("on", j === i));
  }
  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", spy);
  spy();
})();

/* ---------- anatomy ---------- */
(function () {
  const box = document.getElementById("anatomy-rows");
  if (!box) return;
  const rows = [
    [["--d-sys","prefix","prefix"],["color","category","category"],["background","property","property"],["danger","role","role"],["bold","variant","variant"]],
    [["--d-comp","prefix","prefix"],["DButton","owner","component"],["color","category","category"],["background","property","property"],["primary","kind","role · kind"],["hovered","state","state"]],
    [["--p","prefix","prefix"],["Chat","owner","owner"],["ChatComposer","component","component"],["color","category","category"],["border","property","property"],["focused","state","state"]]
  ];
  box.innerHTML = rows.map(r =>
    '<div class="anat-row">' + segLine(r.map(([w, slot, label]) => ({ w, slot, label }))) + "</div>").join("");
})();

/* ---------- vocabulary tables ---------- */
(function () {
  const code = a => a.map(x => `<code>${esc(x)}</code>`).join(" ");
  const none = '<span class="muted">none</span>';
  const pb = document.getElementById("props-body");
  if (pb) pb.innerHTML = V.categories.map(c => {
    const ps = Object.keys(V.props[c]).filter(p => p);
    const extra = V.compExtraProps[c] || [];
    return `<tr><td class="key c-category">${c}</td><td>${ps.length ? code(ps) : none}</td><td>${extra.length ? code(extra) : ""}</td></tr>`;
  }).join("");
  const rb = document.getElementById("roles-body");
  if (rb) {
    let html = "";
    for (const c of V.categories) for (const p of Object.keys(V.props[c])) {
      const s = V.props[c][p];
      if (!s.roles.length) continue;
      html += `<tr><td class="code">${c}${p ? "-" + esc(p) : ""}</td><td>${code(s.roles)}${s.roleOptional ? " (optional; a state may follow directly)" : ""}</td></tr>`;
    }
    rb.innerHTML = html;
  }
})();

/* ---------- parser UI ---------- */
(function () {
  if (!document.getElementById("p-in")) return;
  const input = document.getElementById("p-in");
  const outEl = document.getElementById("p-out");
  const tries = ["--d-sys-color-text-muted", "--d-sys-color-surface-selected-hovered", "--d-comp-DButton-primary-color-background",
    "--d-sys-font-size-large", "--d-comp-dbutton-color-text", "--t-Horizon-TopicCard-shadow", "--d-sys-color-text-link--hover"];
  document.getElementById("p-tries").innerHTML = tries.map(t => `<button type="button" data-t="${esc(t)}">${esc(t)}</button>`).join("");
  document.getElementById("p-tries").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return; input.value = b.dataset.t; render();
    list.hidden = true; input.setAttribute("aria-expanded", "false");
  });
  function render() {
    const r = parseToken(input.value);
    const layerName = { sys: "system", comp: "core component", t: "theme", tc: "theme component", p: "plugin" }[r.layer] || "unknown";
    outEl.innerHTML = (r.segs.length ? '<div class="anat-row">' + segLine(r.segs) + "</div>" : "") +
      `<div class="verdict ${r.errors.length ? "bad" : "ok"}">${r.errors.length ? "Does not follow the grammar" : "Valid"} · ${esc(layerName)}</div>` +
      (r.errors.length || r.notes.length ? `<ul class="notes">${r.errors.map(e => `<li>${esc(e)}</li>`).join("")}${r.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : "");
  }
  const list = document.getElementById("p-suggest");
  let items = [], activeIdx = -1;
  function close() { list.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); items = []; activeIdx = -1; }
  function setActive(i) {
    activeIdx = i;
    list.querySelectorAll("li[role=option]").forEach((li, j) => li.setAttribute("aria-selected", String(j === i)));
    const li = document.getElementById("p-opt-" + i);
    if (li) { input.setAttribute("aria-activedescendant", li.id); li.scrollIntoView({ block: "nearest" }); }
    else input.removeAttribute("aria-activedescendant");
  }
  function openSuggest() {
    const s = suggest(input.value, EX);
    items = s.words.map(w => ({ full: w.full, slot: w.slot, label: w.label, word: w.word }))
      .concat(s.names.map(n => ({ full: n, slot: "name", label: "example", word: n })));
    if (!items.length) { close(); return; }
    let html = "", i = 0;
    const row = it => {
      const done = it.slot === "name" ? "" : it.full.slice(0, it.full.length - it.word.length - (it.full.endsWith("-") && it.slot !== "prefix" ? 1 : 0));
      const tail = it.full.slice(done.length);
      return `<li role="option" id="p-opt-${i}" data-i="${i++}" aria-selected="false"><span class="full"><span class="done">${esc(done)}</span>${esc(tail)}</span><span class="tag c-${it.slot === "name" ? "prefix" : it.slot}">${esc(it.label)}</span></li>`;
    };
    const words = items.filter(x => x.slot !== "name"), names = items.filter(x => x.slot === "name");
    if (words.length) html += `<li class="head" role="presentation">Next block</li>` + words.map(row).join("");
    if (names.length) html += `<li class="head" role="presentation">Example names</li>` + names.map(row).join("");
    list.innerHTML = html;
    items = words.concat(names);
    list.hidden = false; input.setAttribute("aria-expanded", "true");
    setActive(-1);
  }
  function accept(i) {
    const it = items[i]; if (!it) return;
    input.value = it.full; render(); openSuggest();
    if (it.slot === "name") close();
    input.focus();
  }
  input.addEventListener("input", () => { render(); openSuggest(); });
  input.addEventListener("focus", openSuggest);
  input.addEventListener("blur", () => setTimeout(close, 120));
  input.addEventListener("keydown", e => {
    if (list.hidden) { if (e.key === "ArrowDown") { openSuggest(); e.preventDefault(); } return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
    else if (e.key === "Enter") { if (activeIdx >= 0) { e.preventDefault(); accept(activeIdx); } }
    else if (e.key === "Tab") { if (items.length && !e.shiftKey) { e.preventDefault(); accept(activeIdx >= 0 ? activeIdx : 0); } }
    else if (e.key === "Escape") { close(); }
  });
  list.addEventListener("mousedown", e => e.preventDefault());
  list.addEventListener("click", e => { const li = e.target.closest("li[role=option]"); if (li) accept(+li.dataset.i); });
  function fromHash() {
    let n = "";
    try { n = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
    if (!n.startsWith("--")) { try { n = sessionStorage.getItem("dcv-check") || ""; } catch (e) {} }
    if (n.startsWith("--")) input.value = n;
    render(); close();
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();



(function () {
  if (!document.getElementById("ex-list")) return;
  const groups = ["All", "System", "Component", "Extension"];
  let active = "All";
  const chipsEl = document.getElementById("ex-chips");
  chipsEl.innerHTML = groups.map(g => `<button type="button" aria-pressed="${g === active}" data-g="${g}">${g}</button>`).join("");
  const q = document.getElementById("ex-q");
  const list = document.getElementById("ex-list");
  const count = document.getElementById("ex-count");
  function render() {
    const term = q.value.trim().toLowerCase();
    let n = 0, html = "";
    for (const [group, rows] of EX) {
      if (active !== "All" && !group.startsWith(active)) continue;
      const hits = rows.filter(([name, was]) => !term || name.toLowerCase().includes(term) || (was || "").toLowerCase().includes(term));
      if (!hits.length) continue;
      n += hits.length;
      html += `<div class="ex-group">${esc(group)}</div>` + hits.map(([name, was]) => {
        const bad = parseToken(name).errors.length ? ' <span class="bad-flag">fails checker</span>' : "";
        return `<div class="ex"><a class="n" href="playground.html#${esc(name)}">${esc(name)}</a><span class="was">${was ? "was " + esc(was) : ""}${bad}</span></div>`;
      }).join("");
    }
    list.innerHTML = html || '<div class="ex"><span>No names match this filter.</span></div>';
    count.textContent = `${n} names`;
  }
  chipsEl.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    active = b.dataset.g;
    chipsEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    render();
  });
  list.addEventListener("click", e => { const b = e.target.closest("a.n"); if (b) { try { sessionStorage.setItem("dcv-check", b.textContent); } catch (err) {} } });
  q.addEventListener("input", render);
  render();
})();


/* ---------- theme toggle ---------- */
(function () {
  if (!document.getElementById("theme-toggle")) return;
  const btn = document.getElementById("theme-toggle");
  const order = ["system", "light", "dark"];
  let mode = "system";
  try { mode = localStorage.getItem("dcv-theme") || "system"; } catch (e) {}
  if (!order.includes(mode)) mode = "system";
  function apply() {
    if (mode === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", mode);
    btn.textContent = "Theme: " + mode;
  }
  btn.addEventListener("click", () => {
    mode = order[(order.indexOf(mode) + 1) % order.length];
    try { localStorage.setItem("dcv-theme", mode); } catch (e) {}
    apply();
  });
  apply();
})();
