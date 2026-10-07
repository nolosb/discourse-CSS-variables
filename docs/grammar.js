/* Grammar, vocabulary, name parser and suggestions for Discourse CSS variables. */
const V = {
  categories: ["color","font","shadow","space","size","border","outline","opacity","motion"],
  sizes: ["3xs","2xs","xs","sm","md","lg","xl","2xl","3xl","4xl","5xl"],
  steps: ["half","1","2","3","4","5","6","7","8","9","10","11","12"],
  strength: ["subtlest","subtle","bold"],
  weights: ["regular","medium","semibold","bold"],
  intents: ["accent","danger","success","warning","info","highlight","love"],
  condition: ["selected","checked","current","expanded","disabled","invalid","visited","read"],
  interaction: ["hovered","pressed","focused"],
  axes: ["inline","block","inline-start","inline-end","block-start","block-end"],
  // category -> property -> { roles, variant: "size"|"strength"|"weight"|null }
  props: {
    color: {
      text:       { roles: ["default","muted","faint","inverse","link","accent","danger","success","warning","info"], variant: "strength" },
      icon:       { roles: ["default","muted","faint","inverse","accent","danger","success","warning","info","love"], variant: "strength" },
      background: { roles: ["default","raised","sunken","overlay","input","inverse","backdrop","highlight","accent","danger","success","warning","info","love"], variant: "strength" },
      border:     { roles: ["default","muted","strong","input","accent","danger","success","warning"], variant: "strength" },
      outline:    { roles: ["default","danger"], variant: null }
    },
    font: {
      family:           { roles: ["body","heading","monospace"], variant: null },
      size:             { roles: [], variant: "size" },
      weight:           { roles: [], variant: "weight" },
      "line-height":    { roles: ["none","heading","body","prose"], variant: null },
      "letter-spacing": { roles: ["default","heading"], variant: null }
    },
    shadow: { "": { roles: ["overflow","raised","overlay","dialog"], variant: null } },
    space: {
      gap:     { roles: [], variant: "step" },
      padding: { roles: [], variant: "step" },
      margin:  { roles: [], variant: "step" }
    },
    size: {
      icon:      { roles: [], variant: "size" },
      avatar:    { roles: [], variant: "size" },
      control:   { roles: [], variant: "size" },
      container: { roles: [], variant: "size" }
    },
    border: {
      radius: { roles: [], variant: "size", extraVariants: ["full"] },
      width:  { roles: [], variant: "size" },
      style:  { roles: ["default"], variant: null }
    },
    outline: {
      width:  { roles: ["default"], variant: null },
      offset: { roles: ["default"], variant: null },
      style:  { roles: ["default"], variant: null }
    },
    opacity: { "": { roles: ["backdrop"], variant: null, roleOptional: true } },
    motion: {
      duration: { roles: [], variant: "size" },
      easing:   { roles: ["standard","enter","exit"], variant: null }
    }
  },
  compExtraProps: {
    size: ["inline","block","min-inline","max-inline","min-block","max-block"],
    motion: ["transition"],
    font: ["align"]
  }
};
const MULTI = new Set(["line-height","letter-spacing","min-inline","max-inline","min-block","max-block",
  "inline-start","inline-end","block-start","block-end"]);

const ALL_CLOSED = (() => {
  const s = new Set([...V.categories, ...V.sizes, ...V.steps, ...V.strength, ...V.weights, ...V.condition, ...V.interaction, ...V.axes]);
  for (const c in V.props) for (const p in V.props[c]) { if (p) s.add(p); V.props[c][p].roles.forEach(r => s.add(r)); }
  for (const c in V.compExtraProps) V.compExtraProps[c].forEach(p => s.add(p));
  return s;
})();

function variantWords(kind) {
  return kind === "size" ? V.sizes : kind === "step" ? V.steps : kind === "strength" ? V.strength : kind === "weight" ? V.weights : [];
}

// Returns { segs: [{w, slot, label}], errors: [], notes: [], layer }
function parseToken(raw) {
  const out = { segs: [], errors: [], notes: [], layer: null };
  const name = (raw || "").trim();
  if (!name.startsWith("--")) { out.errors.push("A custom property starts with --."); return out; }
  let rest = name.slice(2);
  let prefixText = "--";

  let layer = null;
  for (const [p, l] of [["d-sys-","sys"],["d-comp-","comp"],["tc-","tc"],["t-","t"],["p-","p"]]) {
    if (rest.startsWith(p)) { layer = l; prefixText += p.slice(0, -1); rest = rest.slice(p.length); break; }
  }
  if (!layer) {
    if (rest.startsWith("d-")) out.errors.push("Under --d- only sys and comp are allowed.");
    else out.errors.push("Unknown prefix. Use --d-sys-, --d-comp-, --t-, --tc- or --p-.");
    out.segs.push({ w: name, slot: "error", label: "unknown" });
    return out;
  }
  out.layer = layer;
  out.segs.push({ w: prefixText, slot: "prefix", label: "prefix" });

  let parts = rest.split("-").filter((x, i, a) => !(x === "" && i === a.length - 1));
  if (parts.some(x => x === "")) { out.errors.push("Double dash inside the name. Every slot is separated by a single dash."); }
  parts = parts.filter(x => x !== "");


  const isPascal = w => /^[A-Z][A-Za-z0-9]*$/.test(w);
  const hasUpper = w => /[A-Z]/.test(w);
  const isComp = layer !== "sys";

  if (isComp) {
    const owner = parts.shift();
    if (!owner || !isPascal(owner)) {
      out.errors.push(`The owner after the prefix must be PascalCase${owner ? `, got "${owner}"` : ""}.`);
      if (owner) out.segs.push({ w: owner, slot: "error", label: "owner?" });
    } else out.segs.push({ w: owner, slot: "owner", label: layer === "comp" ? "component" : "owner" });
    if (layer !== "comp" && parts[0] && isPascal(parts[0])) out.segs.push({ w: parts.shift(), slot: "component", label: "component" });
  }
  // merge multi-word entries
  const words = [];
  for (let i = 0; i < parts.length; i++) {
    const two = parts[i] + "-" + parts[i + 1];
    if (MULTI.has(two)) { words.push(two); i++; } else words.push(parts[i]);
  }
  for (const w of words) if (hasUpper(w)) out.errors.push(`"${w}": only the owner and component are PascalCase; everything after is lowercase.`);

  let i = 0;
  const push = (w, slot, label) => out.segs.push({ w, slot, label: label || slot });
  if (isComp && words[i] && !V.categories.includes(words[i])) {
    if (ALL_CLOSED.has(words[i])) { out.errors.push(`"${words[i]}" is a vocabulary word and cannot be a part. A category must come first.`); push(words[i], "error", "part?"); }
    else {
      push(words[i], "part");
      if (["primary","secondary","default","flat","transparent"].includes(words[i]))
        out.notes.push(`"${words[i]}" reads as a part here. If it is the component's kind, it belongs in the role slot after the property.`);
    }
    i++;
  }
  const cat = words[i];
  if (!cat) { out.errors.push("A category is required (color, font, space, …)."); return out; }
  if (!V.categories.includes(cat)) {
    out.errors.push(`"${cat}" is not a category. Use one of: ${V.categories.join(", ")}.`);
    push(cat, "error", "category?"); i++;
    words.slice(i).forEach(w => push(w, "error", "?"));
    return out;
  }
  push(cat, "category"); i++;

  const catProps = V.props[cat];
  let spec = null, prop = null;
  if (catProps[""]) { spec = catProps[""]; }
  else {
    const w = words[i];
    const extra = isComp ? (V.compExtraProps[cat] || []) : [];
    if (w && catProps[w]) { prop = w; spec = catProps[w]; push(w, "property"); i++; }
    else if (w && extra.includes(w)) { prop = w; spec = { roles: [], variant: null, extra: true }; push(w, "property"); out.notes.push(`"${w}" is a component-only property.`); i++; }
    else {
      out.errors.push(`"${cat}" needs a property: ${Object.keys(catProps).concat(extra).join(", ")}.`);
      if (w) { push(w, "error", "property?"); i++; }
      words.slice(i).forEach(x => push(x, "error", "?"));
      return out;
    }
  }

  // role slot
  let role = null, w = words[i];
  const isState = x => V.condition.includes(x) || V.interaction.includes(x);
  const vwords = variantWords(spec.variant).concat(spec.extraVariants || []);
  if (w && spec.roles.includes(w) && !(spec.roles.length === 0)) { role = w; push(w, "role"); i++; }
  else if (w && isComp && cat === "space" && V.axes.includes(w)) { role = w; push(w, "axis", "role · axis"); i++; }
  else if (w && isComp && !isState(w) && !vwords.includes(w) && !V.sizes.includes(w)) {
    role = w; push(w, "kind", "role · kind");
    out.notes.push(`"${w}" is read as a component kind. Kinds must be registered for this component in vocabulary.json.`);
    i++;
  }
  if (!role && spec.roles.length && !isComp && !spec.roleOptional) out.errors.push(`A role is required here: ${spec.roles.join(", ")}.`);

  // variant slot
  w = words[i];
  let variant = null;
  if (w && vwords.includes(w)) {
    if (spec.variant === "strength" && !V.intents.includes(role)) {
      out.errors.push(`Strength "${w}" only follows an intent role (${V.intents.join(", ")}).`);
      push(w, "error", "variant?");
    } else push(w, "variant");
    variant = w; i++;
  } else if (w && V.sizes.includes(w) && spec.variant !== "size") {
    out.errors.push(spec.variant === "step"
      ? `Spacing counts 4px steps instead of sizes: half, 1 to 12 (so "${w}" is not allowed).`
      : `"${w}" is a size, but ${cat}${prop ? "-" + prop : ""} has no size scale.`);
    push(w, "error", "variant?"); i++;
  }
  if (!variant && spec.variant && spec.variant !== "strength" && !spec.roles.length && !isComp)
    out.errors.push(`A ${spec.variant} variant is required: ${variantWords(spec.variant).join(", ")}.`);

  // states
  const states = [];
  while (i < words.length) {
    w = words[i];
    if (isState(w)) { states.push(w); push(w, "state"); }
    else if (w === "active") { out.errors.push(`"active" is not allowed. Use pressed, current or selected.`); push(w, "error", "state?"); }
    else if (w === "hover" || w === "focus" || w === "press") { out.errors.push(`States use the past participle: "${w}ed".`); push(w, "error", "state?"); }
    else if (w === "large" || w === "small" || w === "medium") { out.errors.push(`Use the short size words (sm, md, lg), not "${w}".`); push(w, "error", "variant?"); }
    else { out.errors.push(`"${w}" does not fit any slot at this position.`); push(w, "error", "?"); }
    i++;
  }
  if (states.length > 2) out.errors.push("At most two states.");
  if (states.length === 2) {
    const [a, b] = states;
    if (!(V.condition.includes(a) && V.interaction.includes(b))) out.errors.push("Two states go condition first, interaction second (selected-hovered).");
  }
  return out;
}
// ---------- suggestions ----------
const PREFIXES = ["--d-sys-", "--d-comp-", "--t-", "--tc-", "--p-"];
const PREFIX_LAYER = { "--d-sys-": "sys", "--d-comp-": "comp", "--t-": "t", "--tc-": "tc", "--p-": "p" };

function nextOptions(base, layer, names) {
  const r = parseToken(base);
  if (r.segs.some(s => s.slot === "error")) return null;
  const segs = r.segs;
  const last = segs[segs.length - 1];
  const isComp = layer !== "sys";
  const opt = (words, slot, label) => words.map(w => ({ word: w, slot, label: label || slot }));
  const sameStart = names.filter(n => n.startsWith(base));
  const nextSegOf = (slotWanted) => {
    const set = new Set();
    for (const n of sameStart) {
      const s = parseToken(n).segs[segs.length];
      if (s && slotWanted.includes(s.slot)) set.add(s.w);
    }
    return [...set];
  };
  const cats = opt(V.categories, "category");
  if (last.slot === "prefix") {
    if (!isComp) return cats;
    return opt(nextSegOf(["owner"]), "owner", layer === "comp" ? "component" : "owner");
  }
  if (last.slot === "owner" || last.slot === "component" || last.slot === "part") {
    let o = [];
    if (last.slot === "owner" && layer !== "comp") o = o.concat(opt(nextSegOf(["component"]), "component"));
    if (last.slot !== "part") o = o.concat(opt(nextSegOf(["part"]), "part"));
    return o.concat(cats);
  }
  const catSeg = segs.find(s => s.slot === "category");
  if (!catSeg) return [];
  const cat = catSeg.w;
  const catProps = V.props[cat];
  const propSeg = segs.find(s => s.slot === "property");
  let spec = catProps[""] || (propSeg && (catProps[propSeg.w] || { roles: [], variant: null }));
  const states = opt(V.condition.concat(V.interaction), "state");
  if (last.slot === "category") {
    if (!catProps[""]) {
      const props = Object.keys(catProps).concat(isComp ? (V.compExtraProps[cat] || []) : []);
      return opt(props, "property");
    }
  }
  if (!spec) return [];
  const roleSeg = segs.find(s => ["role", "kind", "axis"].includes(s.slot));
  const variantSeg = segs.find(s => s.slot === "variant");
  const stateSegs = segs.filter(s => s.slot === "state");
  const variantsFor = role => {
    let w = variantWords(spec.variant).concat(spec.extraVariants || []);
    if (spec.variant === "strength" && !V.intents.includes(role)) w = [];
    return opt(w, "variant");
  };
  if (last.slot === "category" || last.slot === "property") {
    const kinds = isComp ? nextSegOf(["kind", "role"]) : [];
    let o = isComp ? opt(kinds, "kind", "role · kind") : [];
    o = o.concat(opt(spec.roles.filter(r => !kinds.includes(r)), "role"));
    if (isComp && cat === "space") o = o.concat(opt(V.axes, "axis", "role · axis"));
    if (spec.variant && spec.variant !== "strength") o = o.concat(variantsFor(null));
    return o.concat(states);
  }
  if (last.slot === "role" || last.slot === "kind" || last.slot === "axis") return variantsFor(roleSeg && roleSeg.w).concat(states);
  if (last.slot === "variant") return states;
  if (last.slot === "state" && stateSegs.length === 1 && V.condition.includes(last.w)) return opt(V.interaction, "state");
  return [];
}

function suggest(value, examples) {
  const v = value || "";
  const names = examples.flatMap(([, rows]) => rows.map(r => r[0]));
  const out = { words: [], names: [] };
  if (v.length >= 3) {
    const low = v.toLowerCase();
    out.names = names.filter(n => n !== v && n.toLowerCase().includes(low))
      .sort((a, b) => (b.startsWith(v) - a.startsWith(v)) || a.length - b.length).slice(0, 5);
  }
  const layerP = PREFIXES.find(p => v.startsWith(p));
  if (!layerP) {
    out.words = PREFIXES.filter(p => p.startsWith(v) && p !== v).map(p => ({ word: p, slot: "prefix", label: "prefix", full: p }));
    return out;
  }
  const layer = PREFIX_LAYER[layerP];
  const segs = v.slice(layerP.length).split("-");
  const seen = new Set();
  for (const k of [2, 1]) {
    if (segs.length < k) continue;
    const partial = segs.slice(segs.length - k).join("-");
    const done = segs.slice(0, segs.length - k).join("-");
    const base = layerP + (done ? done + "-" : "");
    const opts = nextOptions(base, layer, names);
    if (!opts) continue;
    for (const o of opts) {
      if (k === 2 && !o.word.includes("-")) continue;
      if (!o.word.startsWith(partial) || seen.has(o.word)) continue;
      seen.add(o.word);
      const end = (o.slot === "state" && V.interaction.includes(o.word)) ? "" : "-";
      out.words.push({ ...o, full: base + o.word + end });
    }
  }
  out.words = out.words.slice(0, 30);
  return out;
}
