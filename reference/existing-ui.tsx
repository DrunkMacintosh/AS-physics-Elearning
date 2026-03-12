import { useState, useEffect, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const TEACHER_USER = "Robin";
const TEACHER_PASSWORD = "ConCarne5117!";
const SK = { users: "users", scores: "scores" };

// ── Storage ───────────────────────────────────────────────────────────────────
async function sGet(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function sSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ── KaTeX ─────────────────────────────────────────────────────────────────────
function useMath() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.katex && window.renderMathInElement) { setReady(true); return; }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
    document.head.appendChild(css);
    const s1 = document.createElement("script");
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js";
      s2.onload = () => setReady(true);
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  }, []);
  return ready;
}

function MathText({ text }) {
  const ref = useRef(null);
  const ready = useMath();
  useEffect(() => {
    if (!ready || !ref.current) return;
    ref.current.innerHTML = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
    window.renderMathInElement(ref.current, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false });
  }, [text, ready]);
  return <span ref={ref}>{text}</span>;
}

function LatexPreview({ latex }) {
  const ref = useRef(null);
  const ready = useMath();
  useEffect(() => {
    if (!ready || !ref.current) return;
    try { window.katex.render(latex || "\\text{Your answer will appear here}", ref.current, { throwOnError: false, displayMode: true }); }
    catch { ref.current.textContent = latex; }
  }, [latex, ready]);
  return <div ref={ref} style={{ minHeight: 36, padding: "6px 0", color: latex ? "#1a1a2e" : "#aaa" }} />;
}

// ── SVG Diagrams ──────────────────────────────────────────────────────────────
const D = {
  siUnits: (
    <svg viewBox="0 0 500 180" style={{ width: "100%", maxWidth: 500, display: "block", margin: "0 auto" }}>
      <rect width="500" height="180" fill="#f8fafc" rx="8" />
      <text x="250" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">SI Base Quantities</text>
      {[["Length","m","#3b82f6",55,65],["Mass","kg","#10b981",155,65],["Time","s","#f59e0b",255,65],["Current","A","#ef4444",355,65],["Temperature","K","#8b5cf6",105,140],["Amount","mol","#06b6d4",255,140],["Luminosity","cd","#f97316",405,140]].map(([n,s,c,x,y]) => (
        <g key={n}><rect x={x-45} y={y-22} width="90" height="48" rx="7" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1.5" />
          <text x={x} y={y-4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={c}>{n}</text>
          <text x={x} y={y+16} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a2e">{s}</text></g>
      ))}
    </svg>),
  vectorResolution: (
    <svg viewBox="0 0 360 230" style={{ width: "100%", maxWidth: 360, display: "block", margin: "0 auto" }}>
      <rect width="360" height="230" fill="#f8fafc" rx="8" />
      <text x="180" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Resolving a Vector into Components</text>
      <defs>
        <marker id="ra" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#1a1a2e" /></marker>
        <marker id="rb" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3b82f6" /></marker>
        <marker id="rc" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ef4444" /></marker>
      </defs>
      <line x1="55" y1="185" x2="310" y2="185" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ra)" />
      <line x1="55" y1="185" x2="55" y2="45" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ra)" />
      <text x="315" y="189" fontSize="11" fill="#6b7280">x</text><text x="51" y="40" fontSize="11" fill="#6b7280">y</text>
      <line x1="55" y1="185" x2="245" y2="75" stroke="#1a1a2e" strokeWidth="2.5" markerEnd="url(#ra)" />
      <text x="138" y="117" fontSize="13" fontWeight="bold" fill="#1a1a2e" transform="rotate(-30,138,117)">F</text>
      <line x1="55" y1="185" x2="245" y2="185" stroke="#3b82f6" strokeWidth="2.2" markerEnd="url(#rb)" />
      <text x="150" y="202" textAnchor="middle" fontSize="11" fill="#3b82f6">Fx = F cosθ</text>
      <line x1="245" y1="185" x2="245" y2="75" stroke="#ef4444" strokeWidth="2.2" markerEnd="url(#rc)" />
      <text x="278" y="133" textAnchor="middle" fontSize="11" fill="#ef4444">Fy = F sinθ</text>
      <line x1="55" y1="75" x2="245" y2="75" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,3" />
      <path d="M 98 185 A 43 43 0 0 1 129 158" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="108" y="174" fontSize="11" fill="#f59e0b">θ</text>
    </svg>),
  svtGraphs: (
    <svg viewBox="0 0 500 200" style={{ width: "100%", maxWidth: 500, display: "block", margin: "0 auto" }}>
      <rect width="500" height="200" fill="#f8fafc" rx="8" />
      <text x="122" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1a1a2e">Displacement–Time</text>
      <text x="372" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1a1a2e">Velocity–Time</text>
      <line x1="250" y1="5" x2="250" y2="195" stroke="#e5e7eb" strokeWidth="1" />
      <line x1="28" y1="160" x2="220" y2="160" stroke="#374151" strokeWidth="1.5" /><line x1="28" y1="28" x2="28" y2="160" stroke="#374151" strokeWidth="1.5" />
      <text x="222" y="164" fontSize="10" fill="#6b7280">t</text><text x="20" y="24" fontSize="10" fill="#6b7280">s</text>
      <path d="M 28 155 Q 88 145 138 112 T 215 35" fill="none" stroke="#3b82f6" strokeWidth="2.2" />
      <text x="175" y="50" fontSize="10" fill="#3b82f6">gradient=v</text>
      <line x1="98" y1="160" x2="160" y2="78" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
      <circle cx="128" cy="122" r="3.5" fill="#3b82f6" />
      <line x1="262" y1="160" x2="478" y2="160" stroke="#374151" strokeWidth="1.5" /><line x1="262" y1="28" x2="262" y2="160" stroke="#374151" strokeWidth="1.5" />
      <text x="480" y="164" fontSize="10" fill="#6b7280">t</text><text x="254" y="24" fontSize="10" fill="#6b7280">v</text>
      <line x1="262" y1="155" x2="420" y2="55" stroke="#ef4444" strokeWidth="2.2" />
      <text x="400" y="48" fontSize="10" fill="#ef4444">gradient=a</text>
      <polygon points="262,160 420,160 420,55" fill="#ef4444" fillOpacity="0.1" />
      <text x="345" y="142" fontSize="10" fill="#ef4444">area=s</text>
    </svg>),
  projectile: (
    <svg viewBox="0 0 480 210" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      <rect width="480" height="210" fill="#f8fafc" rx="8" />
      <text x="240" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Projectile Motion</text>
      <defs>
        <marker id="pa" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#374151" /></marker>
        <marker id="pb" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3b82f6" /></marker>
        <marker id="pc" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ef4444" /></marker>
      </defs>
      <line x1="20" y1="185" x2="460" y2="185" stroke="#374151" strokeWidth="2" />
      <path d="M 40 185 Q 230 20 420 185" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6,3" />
      <path d="M 70 185 A 30 30 0 0 1 90 162" fill="none" stroke="#f59e0b" strokeWidth="1.5" /><text x="78" y="176" fontSize="10" fill="#f59e0b">θ</text>
      <line x1="40" y1="185" x2="108" y2="185" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pb)" />
      <text x="74" y="198" textAnchor="middle" fontSize="10" fill="#3b82f6">u cosθ (const)</text>
      <line x1="40" y1="185" x2="40" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#pc)" />
      <text x="16" y="152" fontSize="10" fill="#ef4444" transform="rotate(-90,16,152)">u sinθ</text>
      <line x1="230" y1="88" x2="230" y2="125" stroke="#374151" strokeWidth="2" markerEnd="url(#pa)" /><text x="242" y="112" fontSize="11" fill="#374151">g</text>
      <line x1="230" y1="36" x2="278" y2="36" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pb)" />
      <text x="252" y="28" textAnchor="middle" fontSize="10" fill="#3b82f6">u cosθ</text>
      <text x="240" y="56" textAnchor="middle" fontSize="10" fill="#6b7280">vy=0 at peak</text>
    </svg>),
  momentDiagram: (
    <svg viewBox="0 0 420 190" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
      <rect width="420" height="190" fill="#f8fafc" rx="8" />
      <text x="210" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Moment of a Force</text>
      <defs><marker id="ma" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ef4444" /></marker></defs>
      <rect x="55" y="95" width="310" height="12" rx="3" fill="#94a3b8" />
      <polygon points="210,107 196,132 224,132" fill="#374151" /><line x1="186" y1="132" x2="234" y2="132" stroke="#374151" strokeWidth="2" />
      <text x="210" y="148" textAnchor="middle" fontSize="11" fill="#374151">Pivot</text>
      <line x1="98" y1="95" x2="98" y2="48" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#ma)" /><text x="98" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444">F₁</text>
      <line x1="98" y1="162" x2="210" y2="162" stroke="#3b82f6" strokeWidth="1.5" /><line x1="98" y1="156" x2="98" y2="168" stroke="#3b82f6" strokeWidth="1.5" /><line x1="210" y1="156" x2="210" y2="168" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="154" y="178" textAnchor="middle" fontSize="11" fill="#3b82f6">d₁</text>
      <line x1="328" y1="95" x2="328" y2="48" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#ma)" /><text x="328" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10b981">F₂</text>
      <line x1="210" y1="162" x2="328" y2="162" stroke="#10b981" strokeWidth="1.5" /><line x1="210" y1="156" x2="210" y2="168" stroke="#10b981" strokeWidth="1.5" /><line x1="328" y1="156" x2="328" y2="168" stroke="#10b981" strokeWidth="1.5" />
      <text x="269" y="178" textAnchor="middle" fontSize="11" fill="#10b981">d₂</text>
      <text x="210" y="84" textAnchor="middle" fontSize="10" fill="#6b7280">F₁d₁ = F₂d₂ (equilibrium)</text>
    </svg>),
  energyConservation: (
    <svg viewBox="0 0 440 190" style={{ width: "100%", maxWidth: 440, display: "block", margin: "0 auto" }}>
      <rect width="440" height="190" fill="#f8fafc" rx="8" />
      <text x="220" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Conservation of Energy</text>
      <line x1="30" y1="168" x2="410" y2="168" stroke="#374151" strokeWidth="2" />
      {[[80,48,"h","mgh","0","#ef4444"],[220,108,"h/2","½mgh","½mv²","#f59e0b"],[360,158,"0","0","mgh","#10b981"]].map(([x,y,h,pe,ke,col]) => (
        <g key={x}><circle cx={x} cy={y} r="13" fill={col} fillOpacity="0.2" stroke={col} strokeWidth="2" />
          <line x1={x} y1={y+13} x2={x} y2={168} stroke={col} strokeWidth="1.2" strokeDasharray="4,3" />
          <text x={x} y={y} textAnchor="middle" fontSize="9" fill={col} fontWeight="bold">h={h}</text>
          <text x={x} y={178} textAnchor="middle" fontSize="9" fill="#ef4444">PE={pe}</text>
          <text x={x} y={188} textAnchor="middle" fontSize="9" fill="#10b981">KE={ke}</text></g>
      ))}
    </svg>),
  stressStrain: (
    <svg viewBox="0 0 420 220" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
      <rect width="420" height="220" fill="#f8fafc" rx="8" />
      <text x="210" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Stress–Strain Graph</text>
      <defs><marker id="sa" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#374151" /></marker></defs>
      <line x1="50" y1="185" x2="390" y2="185" stroke="#374151" strokeWidth="1.5" markerEnd="url(#sa)" />
      <line x1="50" y1="185" x2="50" y2="25" stroke="#374151" strokeWidth="1.5" markerEnd="url(#sa)" />
      <text x="395" y="189" fontSize="11" fill="#6b7280">strain</text><text x="36" y="20" fontSize="11" fill="#6b7280">stress</text>
      <line x1="50" y1="185" x2="160" y2="80" stroke="#3b82f6" strokeWidth="2.5" />
      <path d="M 160 80 Q 200 60 240 58 T 320 75 T 370 110" fill="none" stroke="#ef4444" strokeWidth="2.5" />
      <line x1="160" y1="80" x2="160" y2="185" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" />
      <text x="155" y="200" textAnchor="middle" fontSize="10" fill="#10b981">E (elastic limit)</text>
      <line x1="240" y1="58" x2="240" y2="185" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
      <text x="250" y="50" fontSize="10" fill="#f59e0b">UTS</text>
      <text x="90" y="120" fontSize="10" fill="#3b82f6">Hooke's</text><text x="88" y="132" fontSize="10" fill="#3b82f6">Law region</text>
      <text x="280" y="90" fontSize="10" fill="#ef4444">plastic</text><text x="275" y="102" fontSize="10" fill="#ef4444">deformation</text>
    </svg>),
  waveDiagram: (
    <svg viewBox="0 0 480 180" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      <rect width="480" height="180" fill="#f8fafc" rx="8" />
      <text x="240" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Transverse Wave — Key Quantities</text>
      <line x1="30" y1="100" x2="460" y2="100" stroke="#d1d5db" strokeWidth="1" />
      <path d="M 30 100 C 60 40,90 40,120 100 S 180 160,210 100 S 270 40,300 100 S 360 160,390 100 S 440 60,460 100" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
      <line x1="120" y1="100" x2="120" y2="40" stroke="#ef4444" strokeWidth="1.5" />
      <text x="128" y="72" fontSize="11" fill="#ef4444">A (amplitude)</text>
      <line x1="30" y1="155" x2="210" y2="155" stroke="#10b981" strokeWidth="1.5" />
      <line x1="30" y1="148" x2="30" y2="162" stroke="#10b981" strokeWidth="1.5" /><line x1="210" y1="148" x2="210" y2="162" stroke="#10b981" strokeWidth="1.5" />
      <text x="120" y="170" textAnchor="middle" fontSize="11" fill="#10b981">λ (wavelength)</text>
      <text x="75" y="36" textAnchor="middle" fontSize="10" fill="#6b7280">crest</text>
      <text x="165" y="170" textAnchor="middle" fontSize="10" fill="#6b7280">trough</text>
    </svg>),
  superposition: (
    <svg viewBox="0 0 480 200" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      <rect width="480" height="200" fill="#f8fafc" rx="8" />
      <text x="240" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1a1a2e">Principle of Superposition</text>
      <text x="30" y="48" fontSize="10" fill="#3b82f6">Wave 1</text>
      <path d="M 30 50 C 55 25,80 25,105 50 S 155 75,180 50 S 230 25,255 50 S 305 75,330 50" fill="none" stroke="#3b82f6" strokeWidth="1.8" />
      <text x="30" y="108" fontSize="10" fill="#ef4444">Wave 2</text>
      <path d="M 30 110 C 55 85,80 85,105 110 S 155 135,180 110 S 230 85,255 110 S 305 135,330 110" fill="none" stroke="#ef4444" strokeWidth="1.8" />
      <text x="30" y="168" fontSize="10" fill="#10b981">Resultant</text>
      <path d="M 30 170 C 55 120,80 120,105 170 S 155 220,180 170 S 230 120,255 170 S 305 220,330 170" fill="none" stroke="#10b981" strokeWidth="2.5" />
      <text x="360" y="60" fontSize="10" fill="#6b7280">In phase</text>
      <text x="360" y="72" fontSize="10" fill="#6b7280">→ constructive</text>
      <text x="360" y="84" fontSize="10" fill="#6b7280">interference</text>
    </svg>),
  circuitSymbols: (
    <svg viewBox="0 0 480 200" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      <rect width="480" height="200" fill="#f8fafc" rx="8" />
      <text x="240" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Common Circuit Symbols</text>
      <line x1="30" y1="60" x2="60" y2="60" stroke="#374151" strokeWidth="1.5" /><line x1="60" y1="50" x2="60" y2="70" stroke="#374151" strokeWidth="3" /><line x1="65" y1="54" x2="65" y2="66" stroke="#374151" strokeWidth="1.5" /><line x1="65" y1="60" x2="90" y2="60" stroke="#374151" strokeWidth="1.5" /><text x="60" y="88" textAnchor="middle" fontSize="10" fill="#6b7280">Cell</text>
      <line x1="110" y1="60" x2="130" y2="60" stroke="#374151" strokeWidth="1.5" /><rect x="130" y="50" width="50" height="20" fill="none" stroke="#374151" strokeWidth="1.5" /><line x1="180" y1="60" x2="200" y2="60" stroke="#374151" strokeWidth="1.5" /><text x="155" y="88" textAnchor="middle" fontSize="10" fill="#6b7280">Resistor</text>
      <line x1="220" y1="60" x2="240" y2="60" stroke="#374151" strokeWidth="1.5" /><circle cx="255" cy="60" r="15" fill="none" stroke="#374151" strokeWidth="1.5" /><line x1="244" y1="49" x2="266" y2="71" stroke="#374151" strokeWidth="1.5" /><line x1="244" y1="71" x2="266" y2="49" stroke="#374151" strokeWidth="1.5" /><line x1="270" y1="60" x2="290" y2="60" stroke="#374151" strokeWidth="1.5" /><text x="255" y="88" textAnchor="middle" fontSize="10" fill="#6b7280">Lamp</text>
      <line x1="310" y1="60" x2="330" y2="60" stroke="#374151" strokeWidth="1.5" /><circle cx="330" cy="60" r="3" fill="#374151" /><line x1="330" y1="60" x2="358" y2="48" stroke="#374151" strokeWidth="1.5" /><circle cx="360" cy="60" r="3" fill="#374151" /><line x1="360" y1="60" x2="380" y2="60" stroke="#374151" strokeWidth="1.5" /><text x="345" y="88" textAnchor="middle" fontSize="10" fill="#6b7280">Switch</text>
      <line x1="30" y1="140" x2="50" y2="140" stroke="#374151" strokeWidth="1.5" /><circle cx="65" cy="140" r="15" fill="none" stroke="#374151" strokeWidth="1.5" /><text x="65" y="144" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#374151">A</text><line x1="80" y1="140" x2="100" y2="140" stroke="#374151" strokeWidth="1.5" /><text x="65" y="168" textAnchor="middle" fontSize="10" fill="#6b7280">Ammeter</text>
      <line x1="120" y1="140" x2="140" y2="140" stroke="#374151" strokeWidth="1.5" /><circle cx="155" cy="140" r="15" fill="none" stroke="#374151" strokeWidth="1.5" /><text x="155" y="144" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#374151">V</text><line x1="170" y1="140" x2="190" y2="140" stroke="#374151" strokeWidth="1.5" /><text x="155" y="168" textAnchor="middle" fontSize="10" fill="#6b7280">Voltmeter</text>
      <line x1="220" y1="140" x2="240" y2="140" stroke="#374151" strokeWidth="1.5" /><polygon points="240,130 240,150 260,140" fill="#374151" /><line x1="260" y1="130" x2="260" y2="150" stroke="#374151" strokeWidth="2" /><line x1="260" y1="140" x2="280" y2="140" stroke="#374151" strokeWidth="1.5" /><text x="250" y="168" textAnchor="middle" fontSize="10" fill="#6b7280">Diode</text>
      <line x1="310" y1="140" x2="330" y2="140" stroke="#374151" strokeWidth="1.5" /><rect x="330" y="130" width="40" height="20" fill="none" stroke="#374151" strokeWidth="1.5" /><text x="350" y="144" textAnchor="middle" fontSize="9" fill="#374151">LDR</text><line x1="370" y1="140" x2="390" y2="140" stroke="#374151" strokeWidth="1.5" /><text x="350" y="168" textAnchor="middle" fontSize="10" fill="#6b7280">LDR</text>
    </svg>),
  seriesParallel: (
    <svg viewBox="0 0 480 220" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      <rect width="480" height="220" fill="#f8fafc" rx="8" />
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1a1a2e">Series Circuit</text>
      <text x="360" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1a1a2e">Parallel Circuit</text>
      <line x1="240" y1="5" x2="240" y2="215" stroke="#e5e7eb" strokeWidth="1" />
      <line x1="20" y1="60" x2="40" y2="60" stroke="#374151" strokeWidth="1.5" /><rect x="40" y="50" width="36" height="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" /><text x="58" y="64" textAnchor="middle" fontSize="9" fill="#3b82f6">R₁</text><line x1="76" y1="60" x2="100" y2="60" stroke="#374151" strokeWidth="1.5" /><rect x="100" y="50" width="36" height="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" /><text x="118" y="64" textAnchor="middle" fontSize="9" fill="#3b82f6">R₂</text><line x1="136" y1="60" x2="160" y2="60" stroke="#374151" strokeWidth="1.5" /><rect x="160" y="50" width="36" height="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" /><text x="178" y="64" textAnchor="middle" fontSize="9" fill="#3b82f6">R₃</text><line x1="196" y1="60" x2="220" y2="60" stroke="#374151" strokeWidth="1.5" />
      <line x1="20" y1="60" x2="20" y2="110" stroke="#374151" strokeWidth="1.5" /><line x1="220" y1="60" x2="220" y2="110" stroke="#374151" strokeWidth="1.5" /><line x1="20" y1="110" x2="50" y2="110" stroke="#374151" strokeWidth="1.5" /><line x1="65" y1="100" x2="65" y2="120" stroke="#374151" strokeWidth="2.5" /><line x1="72" y1="104" x2="72" y2="116" stroke="#374151" strokeWidth="1.5" /><line x1="72" y1="110" x2="220" y2="110" stroke="#374151" strokeWidth="1.5" />
      <text x="120" y="135" textAnchor="middle" fontSize="10" fill="#374151">R_total = R₁+R₂+R₃</text>
      <text x="120" y="148" textAnchor="middle" fontSize="10" fill="#374151">Same current through all</text>
      <line x1="260" y1="60" x2="290" y2="60" stroke="#374151" strokeWidth="1.5" /><line x1="290" y1="40" x2="290" y2="80" stroke="#374151" strokeWidth="1.5" /><line x1="290" y1="40" x2="310" y2="40" stroke="#374151" strokeWidth="1.5" /><rect x="310" y="32" width="36" height="16" fill="none" stroke="#ef4444" strokeWidth="1.5" /><text x="328" y="44" textAnchor="middle" fontSize="9" fill="#ef4444">R₁</text><line x1="346" y1="40" x2="370" y2="40" stroke="#374151" strokeWidth="1.5" /><line x1="290" y1="60" x2="310" y2="60" stroke="#374151" strokeWidth="1.5" /><rect x="310" y="52" width="36" height="16" fill="none" stroke="#ef4444" strokeWidth="1.5" /><text x="328" y="64" textAnchor="middle" fontSize="9" fill="#ef4444">R₂</text><line x1="346" y1="60" x2="370" y2="60" stroke="#374151" strokeWidth="1.5" /><line x1="290" y1="80" x2="310" y2="80" stroke="#374151" strokeWidth="1.5" /><rect x="310" y="72" width="36" height="16" fill="none" stroke="#ef4444" strokeWidth="1.5" /><text x="328" y="84" textAnchor="middle" fontSize="9" fill="#ef4444">R₃</text><line x1="346" y1="80" x2="370" y2="80" stroke="#374151" strokeWidth="1.5" /><line x1="370" y1="40" x2="370" y2="80" stroke="#374151" strokeWidth="1.5" /><line x1="370" y1="60" x2="400" y2="60" stroke="#374151" strokeWidth="1.5" /><line x1="260" y1="110" x2="400" y2="110" stroke="#374151" strokeWidth="1.5" /><line x1="260" y1="60" x2="260" y2="110" stroke="#374151" strokeWidth="1.5" /><line x1="400" y1="60" x2="400" y2="110" stroke="#374151" strokeWidth="1.5" />
      <text x="330" y="135" textAnchor="middle" fontSize="10" fill="#374151">1/R = 1/R₁+1/R₂+1/R₃</text>
      <text x="330" y="148" textAnchor="middle" fontSize="10" fill="#374151">Same voltage across all</text>
    </svg>),
  atomModel: (
    <svg viewBox="0 0 360 200" style={{ width: "100%", maxWidth: 360, display: "block", margin: "0 auto" }}>
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <text x="180" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Nuclear Atom Model</text>
      <circle cx="180" cy="108" r="12" fill="#ef4444" fillOpacity="0.8" stroke="#dc2626" strokeWidth="1.5" />
      <text x="180" y="112" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">nucleus</text>
      <ellipse cx="180" cy="108" rx="55" ry="30" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4,2" />
      <ellipse cx="180" cy="108" rx="85" ry="50" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4,2" />
      <ellipse cx="180" cy="108" rx="115" ry="68" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4,2" />
      {[[235,78],[265,120],[225,158],[140,60],[95,108],[135,155]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
      ))}
      <text x="60" y="112" fontSize="10" fill="#6b7280">electron</text><text x="60" y="124" fontSize="10" fill="#6b7280">shells</text>
    </svg>),
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER CELLS — each chapter is a self-contained data object
// ═══════════════════════════════════════════════════════════════════════════════

// ── Chapter 1: Physical Quantities & Units ────────────────────────────────────
const CH1 = {
  id: 1, title: "Physical Quantities & Units",
  summary: "Physics is built on precise measurement. This chapter introduces the SI system, dimensional analysis, scalars and vectors, and experimental uncertainty.",
  subsections: [
    { title: "1.1 Physical Quantities and SI Units",
      objectives: ["Recall the seven SI base quantities and their units", "Use SI prefixes and convert between them", "Express derived units in SI base units"],
      diagrams: [{ label: "The Seven SI Base Quantities", svg: D.siUnits }],
      content: "All physical quantities have a **numerical magnitude** and a **unit**. The SI system defines seven base quantities. A **derived unit** is formed by combining base units — e.g. force (N) $= kg\\,m\\,s^{-2}$, pressure (Pa) $= kg\\,m^{-1}\\,s^{-2}$, energy (J) $= kg\\,m^{2}\\,s^{-2}$.\n\nPrefixes avoid writing extreme numbers: nano ($10^{-9}$), micro ($10^{-6}$), milli ($10^{-3}$), kilo ($10^3$), mega ($10^6$), giga ($10^9$).",
      examples: [{ title: "Expressing a derived unit in base units", steps: ["Express the joule (J) in SI base units.", "$J = N\\cdot m$, and $N = kg\\,m\\,s^{-2}$", "Therefore $J = kg\\,m^{2}\\,s^{-2}$ ✓"] }],
      questions: [
        { q: "State the SI unit of force and express it in terms of base units.", solution: "The Newton (N). $N = kg\\cdot m\\cdot s^{-2}$" },
        { q: "Convert $450\\,nm$ to metres in standard form.", solution: "$450\\times10^{-9}\\,m = 4.50\\times10^{-7}\\,m$" },
        { q: "Express the unit of pressure (Pa) in SI base units.", solution: "$Pa = N/m^2 = kg\\,m^{-1}\\,s^{-2}$" },
        { q: "Identify the base SI quantities: force, length, temperature, velocity, current.", solution: "Base quantities: **length**, **temperature**, **current**. Force and velocity are derived." },
        { q: "Convert $3.6\\,\\mu A$ to amperes.", solution: "$3.6\\times10^{-6}\\,A$" }
      ]
    },
    { title: "1.2 Scalars and Vectors",
      objectives: ["Distinguish scalar and vector quantities", "Add coplanar vectors graphically", "Resolve a vector into perpendicular components"],
      diagrams: [{ label: "Resolving a Vector into Components", svg: D.vectorResolution }],
      content: "A **scalar** has magnitude only (mass, speed, temperature). A **vector** has magnitude and direction (force, velocity, displacement).\n\nTo add vectors: place **head-to-tail** — the resultant goes from the tail of the first to the head of the last (triangle law).\n\nResolution: a vector $F$ at angle $\\theta$ to horizontal splits into $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$.",
      examples: [{ title: "Finding resultant of two perpendicular forces", steps: ["6 N east and 8 N north.", "$R = \\sqrt{6^2+8^2} = 10\\,N$", "$\\theta = \\arctan(8/6) \\approx 53°$ north of east"] }],
      questions: [
        { q: "A force of 12 N acts at 30° above horizontal. Find its horizontal and vertical components.", solution: "$F_x = 12\\cos30° \\approx 10.4\\,N$, $F_y = 12\\sin30° = 6.0\\,N$" },
        { q: "Two forces of 5 N and 12 N act at right angles. Find the resultant magnitude and direction.", solution: "$R = \\sqrt{169} = 13\\,N$; $\\theta = \\arctan(5/12) \\approx 22.6°$ from the 12 N force" },
        { q: "State two examples each of scalar and vector quantities.", solution: "Scalars: mass, temperature. Vectors: force, velocity." },
        { q: "A displacement of 10 m acts at 60° to the x-axis. Find x and y components.", solution: "$x = 10\\cos60° = 5.0\\,m$; $y = 10\\sin60° \\approx 8.66\\,m$" },
        { q: "Explain why velocity is a vector but speed is a scalar.", solution: "Speed is the magnitude of motion with no direction. Velocity specifies both the magnitude and direction of motion." }
      ]
    },
    { title: "1.3 Measurement and Uncertainties",
      objectives: ["Distinguish systematic and random errors", "Express uncertainty as absolute and percentage", "Combine uncertainties in calculations"],
      diagrams: [],
      content: "**Random errors** cause scatter; reduced by averaging. **Systematic errors** cause consistent offset; cannot be reduced by repetition.\n\nCombining uncertainties:\n- Add/subtract: add **absolute** uncertainties\n- Multiply/divide: add **percentage** uncertainties\n- Power $z=a^n$: % uncertainty in $z = n \\times$ % uncertainty in $a$",
      examples: [{ title: "Combining uncertainties", steps: ["$v = d/t$, $d=(2.50\\pm0.02)\\,m$, $t=(0.80\\pm0.02)\\,s$", "$v = 3.125\\,m\\,s^{-1}$", "% uncertainty: $\\frac{0.02}{2.50}\\times100 + \\frac{0.02}{0.80}\\times100 = 0.8+2.5 = 3.3\\%$", "Absolute: $3.3\\%\\times3.125\\approx0.10$", "Result: $(3.1\\pm0.1)\\,m\\,s^{-1}$"] }],
      questions: [
        { q: "A mass is $(4.52\\pm0.05)\\,kg$. Calculate the percentage uncertainty.", solution: "$\\frac{0.05}{4.52}\\times100 \\approx 1.1\\%$" },
        { q: "$l_1=(3.4\\pm0.1)\\,cm$, $l_2=(2.1\\pm0.1)\\,cm$. State $l_1+l_2$ with uncertainty.", solution: "$(5.5\\pm0.2)\\,cm$" },
        { q: "Distinguish systematic from random error with one example each.", solution: "Random: reaction-time scatter when timing. Systematic: zero error on a balance." },
        { q: "$L=(0.40\\pm0.01)\\,m$. Find % uncertainty in $L^2$.", solution: "% in $L = 2.5\\%$; % in $L^2 = 2\\times2.5 = 5.0\\%$" },
        { q: "Five readings: 1.23, 1.25, 1.22, 1.24, 1.21 s. Find the mean and estimate uncertainty.", solution: "Mean $= 1.23\\,s$; range $= 0.04\\,s$; uncertainty $\\approx 0.02\\,s$; result $(1.23\\pm0.02)\\,s$" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c1q1", stem:"Define what is meant by a physical quantity.", marks:2, solution:"A physical quantity is something that can be measured [1]. It consists of a numerical magnitude and a unit [1]." },
      { id:"c1q2", stem:"The speed of light is $3.00\\times10^8\\,m\\,s^{-1}$.", parts:[
        { q:"Express this speed in km per hour.", marks:3, solution:"$3.00\\times10^8\\times3600 = 1.08\\times10^{12}\\,m\\,hr^{-1}$; divide by 1000: $1.08\\times10^9\\,km\\,hr^{-1}$ [3]" },
        { q:"State the SI base units of speed.", marks:1, solution:"$m\\,s^{-1}$ [1]" }
      ]},
      { id:"c1q3", stem:"A force $F$ is given by $F = mv^2/r$. Use base units to show that this equation is homogeneous.", marks:3, solution:"LHS: $N = kg\\,m\\,s^{-2}$. RHS: $\\frac{kg\\cdot(m\\,s^{-1})^2}{m} = kg\\,m\\,s^{-2}$ [3]. Units match." },
      { id:"c1q4", stem:"A student measures the diameter of a wire with a micrometer. Five readings (mm): 1.23, 1.25, 1.24, 1.22, 1.26.", parts:[
        { q:"Calculate the mean diameter and uncertainty.", marks:3, solution:"Mean $= 1.24\\,mm$ [1]; range $= 0.04\\,mm$; uncertainty $= 0.02\\,mm$ [1]; result $(1.24\\pm0.02)\\,mm$ [1]." },
        { q:"Calculate the percentage uncertainty in the cross-sectional area $A=\\pi r^2$.", marks:2, solution:"% in $r = 1.6\\%$ [1]; % in $A = 2\\times1.6 = 3.2\\%$ [1]." }
      ]},
      { id:"c1q5", stem:"A vector $P$ of magnitude 15 N acts at 55° above horizontal. A second vector $Q$ of magnitude 8 N acts horizontally.", parts:[
        { q:"Calculate the horizontal and vertical components of $P$.", marks:2, solution:"$P_x = 15\\cos55° = 8.60\\,N$ [1]; $P_y = 15\\sin55° = 12.3\\,N$ [1]." },
        { q:"Find the magnitude and direction of the resultant of $P$ and $Q$.", marks:4, solution:"Horizontal: $8.60+8=16.6\\,N$ [1]. Vertical: $12.3\\,N$ [1]. $R=\\sqrt{16.6^2+12.3^2}=20.7\\,N$ [1]. $\\theta=\\arctan(12.3/16.6)=36.5°$ above horizontal [1]." }
      ]},
    ]
  }
};

// ── Chapter 2: Kinematics ─────────────────────────────────────────────────────
const CH2 = {
  id: 2, title: "Kinematics",
  summary: "Kinematics describes motion. This chapter covers displacement, velocity, acceleration, SUVAT equations, graphical analysis, and projectile motion.",
  subsections: [
    { title: "2.1 Equations of Uniform Motion",
      objectives: ["Define displacement, velocity and acceleration", "Use the SUVAT equations", "Interpret s–t and v–t graphs"],
      diagrams: [{ label: "Displacement–Time and Velocity–Time Graphs", svg: D.svtGraphs }],
      content: "For **uniform acceleration**, the four SUVAT equations are:\n$$v = u+at \\qquad s = ut+\\tfrac{1}{2}at^2 \\qquad v^2 = u^2+2as \\qquad s = \\tfrac{1}{2}(u+v)t$$\n\nOn a **v–t graph**: gradient = acceleration; area = displacement.\nOn an **s–t graph**: gradient = velocity; curve means acceleration.",
      examples: [{ title: "Using SUVAT", steps: ["Car starts from rest, $a=3.0\\,m\\,s^{-2}$, $t=6.0\\,s$. Find $s$.", "$s = ut+\\frac{1}{2}at^2 = 0+\\frac{1}{2}(3.0)(36) = 54\\,m$"] }],
      questions: [
        { q: "A car accelerates from rest at $2.5\\,m\\,s^{-2}$ for 8.0 s. Calculate the distance.", solution: "$s = \\frac{1}{2}(2.5)(64) = 80\\,m$" },
        { q: "A ball is thrown upward at 15 m/s. Find maximum height. $(g=9.81\\,m\\,s^{-2})$", solution: "$v^2=u^2-2gs \\Rightarrow s = 225/19.62 \\approx 11.5\\,m$" },
        { q: "A v–t graph shows a horizontal line at 8.0 m/s for 5.0 s. State acceleration and find displacement.", solution: "Acceleration $= 0$; displacement $= 8.0\\times5.0 = 40\\,m$" },
        { q: "A train decelerates from 30 m/s to rest over 500 m. Find the deceleration.", solution: "$v^2=u^2+2as \\Rightarrow a = -900/1000 = -0.90\\,m\\,s^{-2}$" },
        { q: "What does a decreasing gradient on an s–t graph represent?", solution: "Decreasing velocity — the object is decelerating." }
      ]
    },
    { title: "2.2 Projectile Motion",
      objectives: ["Describe horizontal and vertical independence in projectile motion", "Solve problems for projectiles", "Describe the parabolic trajectory"],
      diagrams: [{ label: "Projectile Motion", svg: D.projectile }],
      content: "In projectile motion (no air resistance):\n- **Horizontal**: no force → constant velocity $u_x = u\\cos\\theta$\n- **Vertical**: gravity acts → $a = g = 9.81\\,m\\,s^{-2}$ downward\n\nAt the highest point $v_y = 0$. Time of flight is found from vertical motion; range $R = u_x \\times t_{flight}$.",
      examples: [{ title: "Projectile launched at an angle", steps: ["$u=20\\,m\\,s^{-1}$ at $30°$. Find range.", "$u_y = 20\\sin30° = 10\\,m\\,s^{-1}$; $u_x = 20\\cos30° = 17.3\\,m\\,s^{-1}$", "$T = 2u_y/g = 2.04\\,s$", "$R = 17.3\\times2.04 \\approx 35\\,m$"] }],
      questions: [
        { q: "A ball is launched horizontally at 8.0 m/s from 45 m height. How far does it land from the base?", solution: "$t=\\sqrt{90/9.81}=3.03\\,s$; $x=8.0\\times3.03\\approx24\\,m$" },
        { q: "Explain why horizontal and vertical components of projectile motion are independent.", solution: "No horizontal force acts (gravity is purely vertical). Perpendicular directions cannot affect each other." },
        { q: "A projectile is launched at 25 m/s at 40°. Find vertical initial velocity and time to maximum height.", solution: "$u_y=25\\sin40°=16.1\\,m\\,s^{-1}$; $t=16.1/9.81\\approx1.64\\,s$" },
        { q: "At what point does a projectile have minimum speed? Explain.", solution: "At the highest point — $v_y=0$, so only the constant horizontal component $u_x$ remains." },
        { q: "A ball is kicked at 18 m/s at 35°. Calculate the horizontal range.", solution: "$u_x=14.75$, $u_y=10.32$, $T=2.10\\,s$, $R=14.75\\times2.10\\approx31\\,m$" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c2q1", stem:"Define acceleration and state its SI unit.", marks:2, solution:"Acceleration is the rate of change of velocity [1]. SI unit: $m\\,s^{-2}$ [1]." },
      { id:"c2q2", stem:"A car travelling at $18\\,m\\,s^{-1}$ brakes uniformly and stops in $4.5\\,s$.", parts:[
        { q:"Calculate the deceleration.", marks:2, solution:"$a=(0-18)/4.5=-4.0\\,m\\,s^{-2}$; deceleration $=4.0\\,m\\,s^{-2}$ [2]." },
        { q:"Calculate the distance travelled during braking.", marks:2, solution:"$s=\\frac{1}{2}(18+0)(4.5)=40.5\\,m$ [2]." },
        { q:"Sketch a velocity–time graph. Label axes and mark initial velocity.", marks:2, solution:"Straight line from $(0,18)$ to $(4.5,0)$ [1]. Both axes labelled with units [1]." }
      ]},
      { id:"c2q3", stem:"A ball is thrown horizontally at $12\\,m\\,s^{-1}$ from a building of height $80\\,m$. $(g=9.81\\,m\\,s^{-2})$", parts:[
        { q:"Show that the ball takes approximately 4.0 s to reach the ground.", marks:2, solution:"$t=\\sqrt{2\\times80/9.81}=\\sqrt{16.3}=4.04\\approx4.0\\,s$ [2]." },
        { q:"Calculate the horizontal distance from the base.", marks:2, solution:"$x=12\\times4.04=48.5\\,m$ [2]." },
        { q:"Calculate the speed just before impact.", marks:3, solution:"$v_y=9.81\\times4.04=39.6\\,m\\,s^{-1}$ [1]; $v=\\sqrt{12^2+39.6^2}\\approx41.4\\,m\\,s^{-1}$ [2]." }
      ]},
      { id:"c2q4", stem:"Explain the difference between distance and displacement, and between speed and velocity.", marks:3, solution:"Distance is scalar — total path length [1]. Displacement is vector — straight-line distance with direction [1]. Speed is magnitude of velocity; velocity includes direction [1]." },
    ]
  }
};

// ── Chapter 3: Dynamics ───────────────────────────────────────────────────────
const CH3 = {
  id: 3, title: "Dynamics",
  summary: "Dynamics links forces to motion. This chapter covers Newton's Laws, momentum, impulse, and conservation of momentum.",
  subsections: [
    { title: "3.1 Newton's Laws of Motion",
      objectives: ["State and apply Newton's three laws", "Define momentum and impulse", "Use F = Δp/Δt"],
      diagrams: [],
      content: "**1st Law:** A body remains at rest or uniform velocity unless a net force acts.\n**2nd Law:** $F = \\Delta p/\\Delta t = ma$ (for constant mass).\n**3rd Law:** Forces come in equal, opposite pairs acting on **different** bodies.\n\n**Momentum** $p = mv$ (unit: $kg\\,m\\,s^{-1}$). **Impulse** $= F\\Delta t = \\Delta p$.",
      examples: [{ title: "Impulse calculation", steps: ["Ball ($m=0.16\\,kg$) bowled at $30\\,m\\,s^{-1}$, returns at $40\\,m\\,s^{-1}$, contact $0.005\\,s$.", "$\\Delta p = 0.16(-40-30) = -11.2\\,N\\,s$", "$F = -11.2/0.005 = -2240\\,N$ on ball"] }],
      questions: [
        { q: "A 1200 kg car accelerates at 3.0 m/s². Find the net force.", solution: "$F=ma=1200\\times3.0=3600\\,N$" },
        { q: "State Newton's Third Law and give an example.", solution: "If A exerts force on B, B exerts equal and opposite force on A. Example: rocket expels gas downward; gas pushes rocket upward." },
        { q: "A 500 N force acts for 0.40 s. Calculate the impulse.", solution: "$\\text{Impulse}=500\\times0.40=200\\,N\\,s$" },
        { q: "Why does landing on sand hurt less than concrete from the same height?", solution: "Same $\\Delta p$ but sand increases contact time $\\Delta t$, so $F=\\Delta p/\\Delta t$ is smaller." },
        { q: "A 0.5 kg ball hits a wall at 6 m/s and rebounds at 4 m/s. Contact time 0.02 s. Find average force.", solution: "$\\Delta p=0.5(-4-6)=-5\\,N\\,s$; $F=-5/0.02=-250\\,N$; magnitude $250\\,N$" }
      ]
    },
    { title: "3.2 Conservation of Momentum",
      objectives: ["State conservation of linear momentum", "Apply to collisions and explosions", "Distinguish elastic from inelastic collisions"],
      diagrams: [],
      content: "**Conservation of momentum:** In a closed system, total momentum is constant:\n$$\\sum p_{before} = \\sum p_{after}$$\n\n**Elastic:** KE and momentum both conserved.\n**Inelastic:** Only momentum conserved; KE decreases.\n**Perfectly inelastic:** Objects stick together.",
      examples: [{ title: "Perfectly inelastic collision", steps: ["3 kg at 4 m/s hits stationary 1 kg; they stick.", "$3\\times4 = (3+1)v$", "$v = 3.0\\,m\\,s^{-1}$", "KE before $=24\\,J$; after $=18\\,J$; lost $6\\,J$ → inelastic."] }],
      questions: [
        { q: "A 3 kg trolley at 4 m/s collides with a stationary 1 kg trolley and they stick. Find common velocity.", solution: "$12=(4)v \\Rightarrow v=3.0\\,m\\,s^{-1}$" },
        { q: "A 2 kg gun fires a 0.01 kg bullet at 300 m/s. Find recoil speed.", solution: "$0=0.01\\times300+2v \\Rightarrow v=-1.5\\,m\\,s^{-1}$; recoil $1.5\\,m\\,s^{-1}$" },
        { q: "Distinguish elastic from inelastic collisions.", solution: "Elastic: momentum and KE both conserved. Inelastic: only momentum conserved; KE converts to heat/sound." },
        { q: "State the condition for momentum conservation.", solution: "No net external force acts on the system (closed system)." },
        { q: "Two equal masses m collide elastically head-on at equal speeds u. What happens?", solution: "They exchange velocities — each reverses direction at speed u." }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c3q1", stem:"State Newton's Second Law in terms of momentum.", marks:2, solution:"Net force equals rate of change of momentum [1]: $F=\\Delta p/\\Delta t$ [1]." },
      { id:"c3q2", stem:"A tennis ball of mass 58 g travelling at $30\\,m\\,s^{-1}$ is struck and returns at $40\\,m\\,s^{-1}$. Contact time $= 5.0\\,ms$.", parts:[
        { q:"Calculate the change in momentum.", marks:2, solution:"$\\Delta p=0.058(-40-30)=-4.06\\,N\\,s$ [2]; magnitude $4.06\\,N\\,s$." },
        { q:"Calculate the average force on the ball.", marks:2, solution:"$F=4.06/(5.0\\times10^{-3})=812\\,N$ [2]." },
        { q:"State the force on the racket with justification.", marks:2, solution:"$812\\,N$ in original direction of ball [1]. Newton's Third Law — equal and opposite [1]." }
      ]},
      { id:"c3q3", stem:"A stationary nucleus of mass 222 u decays, emitting an alpha particle (mass 4 u) at $1.5\\times10^7\\,m\\,s^{-1}$.", parts:[
        { q:"Calculate the recoil speed of the daughter nucleus (mass 218 u).", marks:3, solution:"$0=4\\times1.5\\times10^7+218v$ [1]; $v=-2.75\\times10^5\\,m\\,s^{-1}$ [1]; speed $=2.75\\times10^5\\,m\\,s^{-1}$ [1]." },
        { q:"State whether this is elastic or inelastic. Explain.", marks:2, solution:"Inelastic [1]. KE is created from nuclear binding energy — kinetic energy is not conserved [1]." }
      ]},
      { id:"c3q4", stem:"State the principle of conservation of momentum and the condition under which it applies.", marks:3, solution:"Total momentum remains constant [1]; before equals after [1]; provided no net external force acts [1]." },
    ]
  }
};

// ── Chapter 4: Forces, Density & Pressure ─────────────────────────────────────
const CH4 = {
  id: 4, title: "Forces, Density & Pressure",
  summary: "This chapter covers turning effects, equilibrium, density, and fluid pressure including Archimedes' principle.",
  subsections: [
    { title: "4.1 Turning Effects and Equilibrium",
      objectives: ["Define moment of a force", "Apply principle of moments", "State conditions for equilibrium"],
      diagrams: [{ label: "Moments About a Pivot", svg: D.momentDiagram }],
      content: "**Moment** $M = F\\times d_\\perp$ (N m), where $d_\\perp$ is the perpendicular distance to the line of action.\n\n**Principle of moments:** For equilibrium, sum of clockwise moments = sum of anticlockwise moments.\n\n**Conditions for equilibrium:**\n1. Resultant force in every direction = 0\n2. Resultant moment about any point = 0",
      examples: [{ title: "Principle of moments", steps: ["Beam pivoted at centre. 20 N at 0.5 m left. Where must 10 N go on right?", "Anticlockwise: $20\\times0.5 = 10\\,N\\,m$", "$10\\times d = 10 \\Rightarrow d = 1.0\\,m$ right of pivot"] }],
      questions: [
        { q: "A 4 N force acts 0.3 m from a pivot. Calculate the moment.", solution: "$M=4\\times0.3=1.2\\,N\\,m$" },
        { q: "State the two conditions for a rigid body to be in equilibrium.", solution: "1. Resultant force in every direction = 0. 2. Resultant moment about any point = 0." },
        { q: "A 30 N load is 0.4 m from one end of a 2.0 m beam (pivoted at centre). Find where a 20 N load balances it.", solution: "$30\\times0.6=18\\,N\\,m$; $20d=18 \\Rightarrow d=0.90\\,m$ from centre" },
        { q: "Why does a wider base make an object more stable?", solution: "The centre of gravity must shift further before its line of action leaves the base, making toppling harder." },
        { q: "60 N at 0.5 m and 40 N at 0.8 m on opposite sides of pivot. Is it in equilibrium?", solution: "CW: $30\\,N\\,m$; ACW: $32\\,N\\,m$. Not equal → **not in equilibrium**." }
      ]
    },
    { title: "4.2 Density and Pressure",
      objectives: ["Define density and pressure", "Use p = ρgh", "State Archimedes' principle and apply upthrust"],
      diagrams: [],
      content: "**Density:** $\\rho = m/V$ ($kg\\,m^{-3}$).\n**Pressure:** $p = F/A$ (Pa).\n**Fluid pressure at depth $h$:** $p = \\rho g h$.\n\n**Archimedes' principle:** Upthrust $= \\rho_{fluid}\\,g\\,V_{submerged}$ (weight of fluid displaced).\nObject floats if $\\rho_{object} \\leq \\rho_{fluid}$.",
      examples: [{ title: "Upthrust and floating", steps: ["Cube side 0.10 m, density $800\\,kg\\,m^{-3}$, in water ($1000\\,kg\\,m^{-3}$).", "$V=10^{-3}\\,m^3$; Upthrust $=1000\\times9.81\\times10^{-3}=9.81\\,N$", "Weight $=800\\times9.81\\times10^{-3}=7.85\\,N$", "Upthrust > Weight → **floats**"] }],
      questions: [
        { q: "Find pressure at 20 m depth in seawater ($\\rho=1025\\,kg\\,m^{-3}$). $(g=9.81)$", solution: "$p=1025\\times9.81\\times20\\approx2.01\\times10^5\\,Pa$" },
        { q: "A block of mass 0.45 kg has volume $6.0\\times10^{-4}\\,m^3$. Does it float in water?", solution: "$\\rho=750\\,kg\\,m^{-3} < 1000$ → **floats**." },
        { q: "State Archimedes' principle.", solution: "An object submerged in a fluid experiences an upthrust equal to the weight of fluid displaced." },
        { q: "Why does pressure increase with depth?", solution: "More fluid above means greater weight pressing down. $p=\\rho gh$ increases linearly with depth." },
        { q: "Block 0.2×0.3×0.1 m, mass 3 kg, rests on largest face. Find pressure it exerts.", solution: "$A=0.06\\,m^2$; $W=29.4\\,N$; $p=490\\,Pa$" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c4q1", stem:"Define pressure and state its SI unit.", marks:2, solution:"Pressure is normal force per unit area [1]. SI unit: pascal, Pa [1]." },
      { id:"c4q2", stem:"A uniform diving board (weight 250 N, length 3.0 m) is fixed at one end and supported 0.5 m from the fixed end. A diver (weight 650 N) stands at the free end.", parts:[
        { q:"Calculate the moment of the diver's weight about the pivot (support point).", marks:2, solution:"Distance $=3.0-0.5=2.5\\,m$ [1]; moment $=650\\times2.5=1625\\,N\\,m$ [1]." },
        { q:"Calculate the upward force at the support.", marks:3, solution:"Clockwise moments about fixed end: $250\\times1.5+650\\times3.0=2325\\,N\\,m$ [1]; $F_s\\times0.5=2325$ [1]; $F_s=4650\\,N$ [1]." },
        { q:"State the two conditions for the board to be in equilibrium.", marks:2, solution:"Resultant force = 0 [1]. Resultant moment = 0 [1]." }
      ]},
      { id:"c4q3", stem:"A submarine is at 250 m depth. Seawater density $=1025\\,kg\\,m^{-3}$, atmospheric pressure $=1.01\\times10^5\\,Pa$.", parts:[
        { q:"Calculate the pressure due to seawater at this depth.", marks:2, solution:"$p=1025\\times9.81\\times250=2.51\\times10^6\\,Pa$ [2]." },
        { q:"Calculate the total pressure at this depth.", marks:1, solution:"$p_{total}=2.51\\times10^6+1.01\\times10^5=2.61\\times10^6\\,Pa$ [1]." }
      ]},
      { id:"c4q4", stem:"A wooden block, volume $2.0\\times10^{-3}\\,m^3$, density $700\\,kg\\,m^{-3}$, is fully submerged in water.", parts:[
        { q:"Calculate the weight of the block.", marks:2, solution:"$m=700\\times2.0\\times10^{-3}=1.4\\,kg$ [1]; $W=1.4\\times9.81=13.7\\,N$ [1]." },
        { q:"Calculate the upthrust and determine whether it floats or sinks.", marks:2, solution:"Upthrust $=1000\\times9.81\\times2.0\\times10^{-3}=19.6\\,N$ [1]; upthrust > weight → **floats** [1]." }
      ]},
    ]
  }
};

// ── Chapter 5: Work, Energy & Power ──────────────────────────────────────────
const CH5 = {
  id: 5, title: "Work, Energy & Power",
  summary: "Energy is the capacity to do work. This chapter covers the work–energy theorem, forms of energy, conservation of energy, power, and efficiency.",
  subsections: [
    { title: "5.1 Work and Energy",
      objectives: ["Define work done using W = Fd cosθ", "State the work–energy theorem", "Calculate KE and GPE", "Apply conservation of energy"],
      diagrams: [{ label: "Conservation of Energy", svg: D.energyConservation }],
      content: "**Work:** $W = Fd\\cos\\theta$ (J). No work done if force ⊥ displacement.\n\n**Work–energy theorem:** $W_{net} = \\Delta E_k = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mu^2$\n\n**GPE:** $E_p = mgh$. **KE:** $E_k = \\tfrac{1}{2}mv^2$.\n\n**Conservation of energy:** $\\Delta E_p = \\Delta E_k$ (no friction): $mgh = \\tfrac{1}{2}mv^2$.",
      examples: [{ title: "Using conservation of energy", steps: ["2 kg block slides down smooth 3.0 m ramp.", "$mgh = \\frac{1}{2}mv^2$", "$v = \\sqrt{2\\times9.81\\times3.0} \\approx 7.67\\,m\\,s^{-1}$"] }],
      questions: [
        { q: "A 40 N force at 60° moves an object 5.0 m. Calculate work done.", solution: "$W=40\\times5.0\\times\\cos60°=100\\,J$" },
        { q: "A 2 kg ball is dropped from 10 m. Find speed before impact.", solution: "$v=\\sqrt{2\\times9.81\\times10}\\approx14.0\\,m\\,s^{-1}$" },
        { q: "State the work–energy theorem.", solution: "Net work done on an object equals its change in kinetic energy: $W_{net}=\\Delta E_k$." },
        { q: "A 500 kg roller coaster at 2 m/s atop a 30 m hill. Find speed at bottom (no friction).", solution: "$v=\\sqrt{4+2\\times9.81\\times30}\\approx24.3\\,m\\,s^{-1}$" },
        { q: "Why does a satellite in circular orbit do no work against gravity?", solution: "Gravity is perpendicular to velocity, so $W=Fd\\cos90°=0$." }
      ]
    },
    { title: "5.2 Power and Efficiency",
      objectives: ["Define power P = W/t", "Use P = Fv", "Define and calculate efficiency"],
      diagrams: [],
      content: "**Power:** $P = W/t = Fv$ (W = J s⁻¹).\n\n**Efficiency:** $\\eta = \\frac{P_{useful}}{P_{input}}\\times100\\%$.\n\nAlways $<100\\%$ because friction converts energy to thermal energy that cannot be recovered.",
      examples: [{ title: "Using P = Fv", steps: ["Car force $3000\\,N$ at $25\\,m\\,s^{-1}$.", "$P=3000\\times25=75\\,kW$", "Work in 1 min $= 75000\\times60 = 4.5\\,MJ$"] }],
      questions: [
        { q: "A motor does 6000 J in 30 s. Find its power.", solution: "$P=6000/30=200\\,W$" },
        { q: "A car engine exerts 2500 N at 20 m/s. Find power output.", solution: "$P=2500\\times20=50\\,kW$" },
        { q: "A pump inputs 800 W and delivers 600 W useful power. Find efficiency.", solution: "$\\eta=600/800\\times100=75\\%$" },
        { q: "Explain why efficiency is always < 100%.", solution: "Friction converts KE to thermal energy, which cannot be recovered as useful output." },
        { q: "A 70 kg person climbs 4.0 m stairs in 6.0 s. Find useful power output.", solution: "$W=70\\times9.81\\times4.0=2746.8\\,J$; $P\\approx458\\,W$" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c5q1", stem:"Define work done by a force.", marks:2, solution:"Work done is force multiplied by displacement in the direction of the force [1]: $W=Fd\\cos\\theta$ [1]." },
      { id:"c5q2", stem:"A crate (mass 40 kg) is pulled along a rough floor by a rope at 25° to horizontal, tension 120 N. The crate moves 8.0 m.", parts:[
        { q:"Calculate the work done by the tension.", marks:2, solution:"$W=120\\times8.0\\times\\cos25°=869\\,J$ [2]." },
        { q:"Frictional force is 75 N. Calculate the work done against friction.", marks:1, solution:"$W_f=75\\times8.0=600\\,J$ [1]." },
        { q:"Using the work–energy theorem, find the final speed (starting from rest).", marks:3, solution:"Net work $=869-600=269\\,J$ [1]; $\\frac{1}{2}mv^2=269$ [1]; $v=\\sqrt{2\\times269/40}=3.67\\,m\\,s^{-1}$ [1]." }
      ]},
      { id:"c5q3", stem:"A motor of input power 2.5 kW lifts a 180 kg load through 6.0 m in 8.0 s.", parts:[
        { q:"Calculate the useful power output.", marks:2, solution:"$W=180\\times9.81\\times6.0=10594\\,J$ [1]; $P=10594/8.0=1324\\,W$ [1]." },
        { q:"Calculate the efficiency.", marks:2, solution:"$\\eta=1324/2500\\times100=53\\%$ [2]." },
        { q:"Suggest one reason why efficiency is less than 100%.", marks:1, solution:"Friction in motor/pulley converts input energy to thermal energy [1]." }
      ]},
      { id:"c5q4", stem:"A roller coaster car (mass 800 kg) starts from rest at height 45 m. Speed at the bottom is $26\\,m\\,s^{-1}$.", parts:[
        { q:"Calculate the loss in gravitational potential energy.", marks:2, solution:"$\\Delta E_p=800\\times9.81\\times45=3.53\\times10^5\\,J$ [2]." },
        { q:"Calculate the gain in kinetic energy.", marks:2, solution:"$E_k=\\frac{1}{2}\\times800\\times26^2=2.70\\times10^5\\,J$ [2]." },
        { q:"Account for the difference between (a) and (b).", marks:1, solution:"Energy lost to friction and air resistance, converted to thermal energy and sound [1]." }
      ]},
    ]
  }
};

// ── Chapter 6: Deformation of Solids ─────────────────────────────────────────
const CH6 = {
  id: 6, title: "Deformation of Solids",
  summary: "This chapter examines how materials respond to applied forces. It covers Hooke's Law, elastic and plastic behaviour, stress, strain, and the Young modulus.",
  subsections: [
    { title: "6.1 Hooke's Law and Springs",
      objectives: ["State and apply Hooke's Law", "Define the spring constant k", "Distinguish elastic and plastic deformation", "Calculate elastic potential energy stored in a spring"],
      diagrams: [{ label: "Stress–Strain Curve", svg: D.stressStrain }],
      content: "**Hooke's Law:** The extension of a spring is directly proportional to the applied force, provided the elastic limit is not exceeded:\n$F = kx$\nwhere $k$ is the spring constant (N m⁻¹) and $x$ is the extension.\n\n**Elastic deformation:** the material returns to its original shape when the force is removed.\n**Plastic deformation:** permanent change — occurs beyond the elastic limit.\n\n**Elastic potential energy** stored in a stretched spring:\n$E = \\tfrac{1}{2}kx^2$",
      examples: [{ title: "Elastic PE in a spring", steps: ["A spring ($k=200\\,N\\,m^{-1}$) is extended by 0.15 m.", "$E = \\frac{1}{2}kx^2 = \\frac{1}{2}\\times200\\times0.15^2 = 2.25\\,J$"] }],
      questions: [
        { q: "A spring extends 4.0 cm when a 6.0 N force is applied. Calculate the spring constant.", solution: "$k = F/x = 6.0/0.04 = 150\\,N\\,m^{-1}$" },
        { q: "A spring ($k=80\\,N\\,m^{-1}$) is compressed by 5.0 cm. Calculate the elastic PE stored.", solution: "$E = \\frac{1}{2}\\times80\\times0.05^2 = 0.10\\,J$" },
        { q: "Distinguish between elastic and plastic deformation.", solution: "Elastic: material returns to original shape when force removed. Plastic: permanent deformation remains after force is removed." },
        { q: "Sketch a force–extension graph for a spring that obeys Hooke's Law up to its elastic limit, then deforms plastically.", solution: "Straight line through origin (gradient = k) up to elastic limit point, then a curved section beyond this point that does not return to the origin on unloading." },
        { q: "Two springs each of constant $k=100\\,N\\,m^{-1}$ are connected in series. What is the combined spring constant?", solution: "For springs in series: $\\frac{1}{k_{total}} = \\frac{1}{k_1}+\\frac{1}{k_2} = \\frac{1}{100}+\\frac{1}{100}$; $k_{total}=50\\,N\\,m^{-1}$" }
      ]
    },
    { title: "6.2 Stress, Strain and the Young Modulus",
      objectives: ["Define tensile stress and tensile strain", "Define the Young modulus and use it in calculations", "Describe an experiment to measure the Young modulus of a wire"],
      diagrams: [],
      content: "**Stress** $\\sigma = F/A$ (Pa): force per unit cross-sectional area.\n**Strain** $\\varepsilon = x/L$ (dimensionless): fractional extension.\n\n**Young modulus:**\n$E = \\frac{\\sigma}{\\varepsilon} = \\frac{FL}{Ax}$\nUnit: Pa. The Young modulus is a property of the material (not the object).",
      examples: [{ title: "Calculating Young modulus", steps: ["Wire: length $2.0\\,m$, diameter $0.50\\,mm$, loaded with $20\\,N$, extends $1.6\\,mm$.", "$A = \\pi(0.25\\times10^{-3})^2 = 1.96\\times10^{-7}\\,m^2$", "$\\sigma = 20/(1.96\\times10^{-7}) = 1.02\\times10^8\\,Pa$", "$\\varepsilon = 1.6\\times10^{-3}/2.0 = 8.0\\times10^{-4}$", "$E = 1.02\\times10^8/8.0\\times10^{-4} = 1.28\\times10^{11}\\,Pa$"] }],
      questions: [
        { q: "Define tensile stress and tensile strain.", solution: "Stress $= F/A$: force per unit cross-sectional area (Pa). Strain $= x/L$: extension per unit original length (dimensionless)." },
        { q: "A steel wire (length 1.5 m, cross-section $2.0\\times10^{-7}\\,m^2$, $E=2.0\\times10^{11}\\,Pa$) is stretched by a 60 N force. Find the extension.", solution: "$\\varepsilon = \\sigma/E = (60/2.0\\times10^{-7})/(2.0\\times10^{11}) = 1.5\\times10^{-3}$; $x = 1.5\\times10^{-3}\\times1.5 = 2.25\\times10^{-3}\\,m$" },
        { q: "Explain why the Young modulus is a property of a material, not of a particular sample.", solution: "It is the ratio of stress to strain, both normalised by area and length — so sample dimensions cancel out." },
        { q: "State two precautions when measuring the Young modulus of a wire experimentally.", solution: "Use a long, thin wire to maximise extension. Take several readings and average. Use a control wire to correct for thermal expansion. Ensure the load does not exceed the elastic limit." },
        { q: "A rubber band and a steel wire have the same dimensions and are stretched by the same force. The rubber extends much more. What does this tell us about their Young moduli?", solution: "Rubber has a much lower Young modulus than steel. For the same stress, rubber produces a much greater strain." }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c6q1", stem:"State Hooke's Law and define the spring constant.", marks:3, solution:"The extension of a spring is proportional to the applied force, provided the elastic limit is not exceeded [1]: $F=kx$ [1]. The spring constant $k$ is the force per unit extension (N m⁻¹) [1]." },
      { id:"c6q2", stem:"A spring of constant $k=250\\,N\\,m^{-1}$ is stretched by a force of 15 N.", parts:[
        { q:"Calculate the extension.", marks:2, solution:"$x=F/k=15/250=0.060\\,m$ [2]." },
        { q:"Calculate the elastic potential energy stored.", marks:2, solution:"$E=\\frac{1}{2}kx^2=\\frac{1}{2}\\times250\\times0.060^2=0.45\\,J$ [2]." }
      ]},
      { id:"c6q3", stem:"A metal wire has length 2.5 m, cross-sectional area $3.0\\times10^{-7}\\,m^2$ and Young modulus $1.8\\times10^{11}\\,Pa$. A tensile force of 90 N is applied.", parts:[
        { q:"Calculate the stress in the wire.", marks:2, solution:"$\\sigma=F/A=90/(3.0\\times10^{-7})=3.0\\times10^8\\,Pa$ [2]." },
        { q:"Calculate the strain.", marks:2, solution:"$\\varepsilon=\\sigma/E=3.0\\times10^8/1.8\\times10^{11}=1.67\\times10^{-3}$ [2]." },
        { q:"Calculate the extension.", marks:2, solution:"$x=\\varepsilon L=1.67\\times10^{-3}\\times2.5=4.2\\times10^{-3}\\,m$ [2]." }
      ]},
      { id:"c6q4", stem:"Describe a laboratory experiment to determine the Young modulus of a metal wire. Include how you would minimise errors.", marks:5, solution:"Clamp a long thin wire horizontally/vertically [1]. Measure original length with ruler and diameter with micrometer at several points [1]. Add known masses and measure extension with vernier scale/travelling microscope [1]. Plot stress vs strain — gradient gives $E$ [1]. Use a control wire of same material to correct for thermal expansion; avoid exceeding elastic limit [1]." },
      { id:"c6q5", stem:"Distinguish between elastic and plastic deformation, and explain what happens at the atomic level during each.", marks:4, solution:"Elastic: material returns to original shape when force removed [1] — atoms return to equilibrium positions as interatomic bonds are stretched but not broken [1]. Plastic: permanent deformation remains [1] — atomic planes slip past each other; bonds break and reform in new positions [1]." },
    ]
  }
};

// ── Chapter 7: Waves ──────────────────────────────────────────────────────────
const CH7 = {
  id: 7, title: "Waves",
  summary: "Waves transfer energy without transferring matter. This chapter covers the properties of progressive waves, the electromagnetic spectrum, and the nature of transverse and longitudinal waves.",
  subsections: [
    { title: "7.1 Progressive Waves",
      objectives: ["Define displacement, amplitude, wavelength, frequency, period and wave speed", "Use the wave equation v = fλ", "Distinguish transverse and longitudinal waves", "Describe intensity and its relationship to amplitude"],
      diagrams: [{ label: "Transverse Wave Properties", svg: D.waveDiagram }],
      content: "A **progressive wave** transfers energy from one point to another.\n\nKey quantities:\n- **Amplitude** $A$: maximum displacement from equilibrium (m)\n- **Wavelength** $\\lambda$: distance between two adjacent points in phase (m)\n- **Frequency** $f$: number of complete oscillations per second (Hz)\n- **Period** $T = 1/f$ (s)\n- **Wave speed:** $v = f\\lambda$\n\n**Transverse waves:** oscillations perpendicular to direction of energy transfer (e.g. light, water waves).\n**Longitudinal waves:** oscillations parallel to direction of energy transfer (e.g. sound).\n\n**Intensity** $I = P/A$ (W m⁻²): $I \\propto A^2$.",
      examples: [{ title: "Using the wave equation", steps: ["Sound travels at $340\\,m\\,s^{-1}$. A note has frequency $440\\,Hz$. Find the wavelength.", "$\\lambda = v/f = 340/440 = 0.773\\,m$"] }],
      questions: [
        { q: "A wave has frequency 500 Hz and wavelength 0.68 m. Calculate the wave speed.", solution: "$v = f\\lambda = 500\\times0.68 = 340\\,m\\,s^{-1}$" },
        { q: "Distinguish between transverse and longitudinal waves with one example of each.", solution: "Transverse: oscillations perpendicular to energy transfer, e.g. light. Longitudinal: oscillations parallel to energy transfer, e.g. sound." },
        { q: "The amplitude of a wave is doubled. By what factor does the intensity change?", solution: "$I\\propto A^2$, so doubling $A$ increases $I$ by a factor of $4$." },
        { q: "A wave has period 0.025 s. Find its frequency.", solution: "$f = 1/T = 1/0.025 = 40\\,Hz$" },
        { q: "Explain what is meant by the intensity of a wave.", solution: "Intensity is the power transmitted per unit area perpendicular to the direction of propagation. Unit: $W\\,m^{-2}$." }
      ]
    },
    { title: "7.2 The Electromagnetic Spectrum",
      objectives: ["State that all EM waves travel at the same speed in a vacuum", "List the EM spectrum in order of frequency/wavelength", "Describe properties and uses of different regions"],
      diagrams: [],
      content: "All electromagnetic waves:\n- Are **transverse** waves\n- Travel at $c = 3.0\\times10^8\\,m\\,s^{-1}$ in a vacuum\n\nThe EM spectrum in order of **increasing frequency** (decreasing wavelength):\n\nRadio → Microwave → Infrared → **Visible** → Ultraviolet → X-rays → Gamma rays\n\nWavelength range: $\\sim10^{3}\\,m$ (radio) to $\\sim10^{-12}\\,m$ (gamma).",
      examples: [{ title: "EM wave calculation", steps: ["Find the frequency of green light ($\\lambda = 550\\,nm$).", "$f = c/\\lambda = (3.0\\times10^8)/(550\\times10^{-9}) = 5.45\\times10^{14}\\,Hz$"] }],
      questions: [
        { q: "State the speed of all electromagnetic waves in a vacuum.", solution: "$c = 3.0\\times10^8\\,m\\,s^{-1}$" },
        { q: "List the EM spectrum in order of increasing wavelength.", solution: "Gamma → X-rays → UV → Visible → IR → Microwave → Radio" },
        { q: "Calculate the wavelength of a radio wave of frequency 100 MHz.", solution: "$\\lambda = c/f = (3.0\\times10^8)/(100\\times10^6) = 3.0\\,m$" },
        { q: "State one use each of X-rays and infrared radiation.", solution: "X-rays: medical imaging. Infrared: thermal imaging / remote controls." },
        { q: "Explain why gamma rays are more dangerous to living tissue than radio waves.", solution: "Gamma rays have much higher frequency and energy per photon. They can penetrate tissue and ionise atoms, damaging DNA and causing cell mutations." }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c7q1", stem:"Define the amplitude, wavelength and frequency of a wave.", marks:3, solution:"Amplitude: maximum displacement from equilibrium [1]. Wavelength: distance between adjacent points in phase [1]. Frequency: number of complete oscillations per second [1]." },
      { id:"c7q2", stem:"A water wave has wavelength 0.80 m and period 0.40 s.", parts:[
        { q:"Calculate the frequency.", marks:1, solution:"$f=1/T=1/0.40=2.5\\,Hz$ [1]." },
        { q:"Calculate the wave speed.", marks:2, solution:"$v=f\\lambda=2.5\\times0.80=2.0\\,m\\,s^{-1}$ [2]." },
        { q:"The amplitude is doubled. By what factor does the intensity change?", marks:2, solution:"$I\\propto A^2$; doubling $A$ increases $I$ by factor $4$ [2]." }
      ]},
      { id:"c7q3", stem:"Describe the difference between transverse and longitudinal waves. Give one example of each.", marks:4, solution:"Transverse: oscillations perpendicular to direction of energy transfer [1]; e.g. light/water waves [1]. Longitudinal: oscillations parallel to direction of energy transfer [1]; e.g. sound [1]." },
      { id:"c7q4", stem:"A radio station broadcasts at a frequency of 97.6 MHz.", parts:[
        { q:"Calculate the wavelength. $(c=3.0\\times10^8\\,m\\,s^{-1})$", marks:2, solution:"$\\lambda=c/f=3.0\\times10^8/(97.6\\times10^6)=3.07\\,m$ [2]." },
        { q:"State the region of the EM spectrum and give one other use.", marks:2, solution:"Radio waves [1]. Uses: TV broadcasting, radio telescopes [1]." }
      ]},
      { id:"c7q5", stem:"Explain why gamma radiation is harmful to humans but infrared radiation from a warm object is not.", marks:4, solution:"Both are EM waves but differ in frequency and energy [1]. Gamma photons have very high energy [1] and can ionise atoms and damage DNA [1]. Infrared photons have much lower energy and only cause heating of surface tissue [1]." },
    ]
  }
};

// ── Chapter 8: Superposition ──────────────────────────────────────────────────
const CH8 = {
  id: 8, title: "Superposition",
  summary: "When waves meet, they superpose. This chapter covers the principle of superposition, interference, diffraction, and standing waves.",
  subsections: [
    { title: "8.1 Superposition and Interference",
      objectives: ["State the principle of superposition", "Explain constructive and destructive interference", "State the conditions for observable interference", "Describe Young's double-slit experiment"],
      diagrams: [{ label: "Principle of Superposition", svg: D.superposition }],
      content: "**Principle of superposition:** When two or more waves meet at a point, the resultant displacement equals the algebraic sum of the individual displacements.\n\n**Constructive interference:** waves in phase (path difference $= n\\lambda$) → amplitude doubles.\n**Destructive interference:** waves in antiphase (path difference $= (n+\\tfrac{1}{2})\\lambda$) → amplitude cancels.\n\nFor observable interference, waves must be **coherent** (same frequency, constant phase difference).\n\n**Young's double-slit fringe spacing:**\n$w = \\frac{\\lambda D}{d}$",
      examples: [{ title: "Young's double slit", steps: ["$\\lambda=600\\,nm$, $d=0.5\\,mm$, $D=2.0\\,m$. Find fringe spacing.", "$w = \\frac{600\\times10^{-9}\\times2.0}{0.5\\times10^{-3}} = 2.4\\times10^{-3}\\,m = 2.4\\,mm$"] }],
      questions: [
        { q: "State the principle of superposition.", solution: "When two or more waves meet, the resultant displacement is the algebraic (vector) sum of the individual displacements." },
        { q: "In Young's double-slit experiment, $\\lambda=500\\,nm$, slit separation $0.4\\,mm$, screen $1.5\\,m$ away. Find the fringe spacing.", solution: "$w = \\lambda D/d = (500\\times10^{-9}\\times1.5)/(0.4\\times10^{-3}) = 1.875\\times10^{-3}\\,m \\approx 1.9\\,mm$" },
        { q: "State the conditions necessary for two sources to produce observable interference.", solution: "The sources must be coherent (same frequency and constant phase difference) and have similar amplitudes." },
        { q: "Explain the difference between constructive and destructive interference.", solution: "Constructive: waves arrive in phase (path difference $= n\\lambda$); amplitudes add. Destructive: waves arrive in antiphase (path difference $= (n+½)\\lambda$); amplitudes cancel." },
        { q: "In Young's experiment, when the slit separation is halved, what happens to the fringe spacing?", solution: "$w = \\lambda D/d$; halving $d$ doubles $w$ — the fringes become twice as wide apart." }
      ]
    },
    { title: "8.2 Stationary Waves and Diffraction",
      objectives: ["Explain how stationary waves are formed", "Identify nodes and antinodes", "Use the relationship between harmonics and string length", "Describe diffraction through a single slit and a gap"],
      diagrams: [],
      content: "**Stationary (standing) waves** form when two identical waves travel in opposite directions and superpose. They do **not** transfer energy.\n\n**Nodes:** points of zero amplitude. **Antinodes:** points of maximum amplitude.\n\nFor a string of length $L$ fixed at both ends, the **fundamental** has $\\lambda = 2L$, so $f_1 = v/2L$. Harmonics: $f_n = nf_1$.\n\n**Diffraction:** spreading of waves through a gap. Significant when gap width $\\approx \\lambda$.",
      examples: [{ title: "String harmonics", steps: ["A guitar string (length 0.65 m) has wave speed 400 m/s. Find the fundamental frequency.", "$f_1 = v/2L = 400/(2\\times0.65) = 308\\,Hz$", "Second harmonic: $f_2 = 2\\times308 = 615\\,Hz$"] }],
      questions: [
        { q: "Explain how a stationary wave is formed on a stretched string.", solution: "A wave travels along the string and reflects from the fixed end. The incident and reflected waves superpose to produce a standing wave pattern." },
        { q: "A string of length 0.80 m has a wave speed of 320 m/s. Find the fundamental frequency.", solution: "$f_1 = v/2L = 320/(2\\times0.80) = 200\\,Hz$" },
        { q: "State the difference between a node and an antinode.", solution: "A node is a point of zero displacement (always still). An antinode is a point of maximum displacement amplitude." },
        { q: "Explain why diffraction is more noticeable when the gap width is similar to the wavelength.", solution: "When gap width $\\approx \\lambda$, the Huygens wavelets from the gap edges interfere strongly, causing significant spreading." },
        { q: "A stationary wave on a string shows 3 loops. The string is 1.2 m long. Find the wavelength.", solution: "3 loops = 3 half-wavelengths: $L = 3\\lambda/2$; $\\lambda = 2L/3 = 2\\times1.2/3 = 0.80\\,m$" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c8q1", stem:"State the principle of superposition.", marks:2, solution:"When two or more waves meet at a point, the resultant displacement is the algebraic (vector) sum of the individual displacements at that point [2]." },
      { id:"c8q2", stem:"In a Young's double-slit experiment using light of wavelength 620 nm, the slit separation is 0.45 mm and the screen is 1.8 m away.", parts:[
        { q:"Calculate the fringe spacing.", marks:2, solution:"$w=\\lambda D/d=(620\\times10^{-9}\\times1.8)/(0.45\\times10^{-3})=2.48\\times10^{-3}\\,m\\approx2.5\\,mm$ [2]." },
        { q:"State what would happen to the fringe spacing if the wavelength was increased.", marks:1, solution:"$w\\propto\\lambda$; increasing $\\lambda$ increases fringe spacing [1]." },
        { q:"Explain why the two slits must be coherent sources.", marks:2, solution:"Coherent sources have a constant phase difference [1]. If phase difference were random, the fringe pattern would wash out [1]." }
      ]},
      { id:"c8q3", stem:"A string of length 0.60 m is fixed at both ends and vibrates in its second harmonic. The wave speed in the string is 240 m/s.", parts:[
        { q:"Draw the second harmonic pattern and determine the wavelength.", marks:2, solution:"Second harmonic has 2 loops — one full wavelength fits in the string [1]: $\\lambda=L=0.60\\,m$ [1]." },
        { q:"Calculate the frequency of the second harmonic.", marks:2, solution:"$f=v/\\lambda=240/0.60=400\\,Hz$ [2]." }
      ]},
      { id:"c8q4", stem:"Explain the difference between constructive and destructive interference in terms of path difference.", marks:3, solution:"Constructive: path difference $=n\\lambda$ [1] — waves arrive in phase, amplitudes add [1]. Destructive: path difference $=(n+½)\\lambda$ [1] — waves arrive in antiphase, amplitudes cancel. (3 marks for 3 correct points.)" },
    ]
  }
};

// ── Chapter 9: Electricity ────────────────────────────────────────────────────
const CH9 = {
  id: 9, title: "Electricity",
  summary: "This chapter introduces electric charge, current, potential difference, resistance, and Ohm's Law — the foundational concepts for analysing electrical circuits.",
  subsections: [
    { title: "9.1 Charge, Current and Potential Difference",
      objectives: ["Define electric charge and current", "Use Q = It", "Define potential difference and the volt", "Define the electronvolt as a unit of energy"],
      diagrams: [{ label: "Common Circuit Symbols", svg: D.circuitSymbols }],
      content: "**Electric current** $I = \\Delta Q/\\Delta t$ (A): the rate of flow of charge.\n\n**Charge:** $Q = It$ (C). The charge of one electron is $e = 1.6\\times10^{-19}\\,C$.\n\n**Potential difference** (voltage): $V = W/Q$ (V): the energy transferred per unit charge.\n\n**Electronvolt (eV):** $1\\,eV = 1.6\\times10^{-19}\\,J$\n\n**E.m.f.:** the energy supplied per unit charge by a source.",
      examples: [{ title: "Using Q = It", steps: ["A current of 2.5 A flows for 4 minutes. Find the charge transferred.", "$Q = It = 2.5\\times(4\\times60) = 600\\,C$", "Number of electrons $= Q/e = 600/(1.6\\times10^{-19}) = 3.75\\times10^{21}$"] }],
      questions: [
        { q: "A charge of 120 C passes a point in 3.0 minutes. Calculate the current.", solution: "$I = Q/t = 120/180 = 0.67\\,A$" },
        { q: "Define potential difference.", solution: "The potential difference between two points is the work done per unit charge in moving a positive charge from one point to the other. Unit: volt (V = J C⁻¹)." },
        { q: "An electron is accelerated through 500 V. Calculate the kinetic energy gained in both joules and electronvolts.", solution: "$E = QV = 1.6\\times10^{-19}\\times500 = 8.0\\times10^{-17}\\,J = 500\\,eV$" },
        { q: "Explain the difference between e.m.f. and potential difference.", solution: "E.m.f. is the energy supplied per unit charge by a source. Potential difference is the energy transferred per unit charge between two points in a circuit." },
        { q: "Calculate the number of electrons passing a point per second when a current of 3.2 mA flows.", solution: "$n = I/e = 3.2\\times10^{-3}/1.6\\times10^{-19} = 2.0\\times10^{16}\\,electrons\\,s^{-1}$" }
      ]
    },
    { title: "9.2 Resistance and Ohm's Law",
      objectives: ["Define resistance using V = IR", "State Ohm's Law and identify ohmic conductors", "Describe I–V characteristics of a wire, filament lamp and diode", "Use resistivity ρ = RA/L"],
      diagrams: [],
      content: "**Resistance:** $R = V/I$ (Ω).\n\n**Ohm's Law:** for a metallic conductor at constant temperature, $V \\propto I$ — the I–V graph is a straight line through the origin.\n\n**Non-ohmic devices:**\n- *Filament lamp*: resistance increases with temperature; I–V curve bends.\n- *Diode*: conducts in one direction only.\n\n**Resistivity:** $\\rho = RA/L$ (Ω m): a material property independent of dimensions.",
      examples: [{ title: "Resistivity calculation", steps: ["A wire of length 2.0 m, diameter 0.60 mm, resistance 3.5 Ω. Find resistivity.", "$A = \\pi(0.30\\times10^{-3})^2 = 2.83\\times10^{-7}\\,m^2$", "$\\rho = RA/L = 3.5\\times2.83\\times10^{-7}/2.0 = 4.95\\times10^{-7}\\,\\Omega\\,m$"] }],
      questions: [
        { q: "A resistor has $V = 12\\,V$ across it and $I = 0.40\\,A$ through it. Find its resistance.", solution: "$R = V/I = 12/0.40 = 30\\,\\Omega$" },
        { q: "State Ohm's Law.", solution: "The current through a metallic conductor is directly proportional to the potential difference across it, provided temperature and other physical conditions remain constant." },
        { q: "Sketch the I–V characteristic of a filament lamp and explain its shape.", solution: "The graph is a curve, not a straight line. As current increases, the filament heats up, increasing resistance, so the gradient (1/R) decreases." },
        { q: "A nichrome wire (length 1.5 m, $\\rho=1.1\\times10^{-6}\\,\\Omega\\,m$) has cross-section $2.0\\times10^{-7}\\,m^2$. Find its resistance.", solution: "$R = \\rho L/A = (1.1\\times10^{-6}\\times1.5)/(2.0\\times10^{-7}) = 8.25\\,\\Omega$" },
        { q: "Explain why a diode only conducts in one direction.", solution: "A diode is a semiconductor p-n junction. In forward bias, charge carriers can cross the junction; in reverse bias, the depletion region widens and no current flows." }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c9q1", stem:"Define electric current and state its SI unit.", marks:2, solution:"Electric current is the rate of flow of charge [1]: $I=\\Delta Q/\\Delta t$; SI unit ampere (A) [1]." },
      { id:"c9q2", stem:"A battery of e.m.f. 9.0 V drives a current of 1.5 A through a resistor.", parts:[
        { q:"Calculate the resistance of the resistor.", marks:2, solution:"$R=V/I=9.0/1.5=6.0\\,\\Omega$ [2]." },
        { q:"Calculate the power dissipated in the resistor.", marks:2, solution:"$P=IV=1.5\\times9.0=13.5\\,W$ [2]." },
        { q:"Calculate the charge that flows in 5 minutes.", marks:2, solution:"$Q=It=1.5\\times300=450\\,C$ [2]." }
      ]},
      { id:"c9q3", stem:"Sketch I–V characteristics for (a) a metallic wire at constant temperature, (b) a filament lamp. Explain the difference in shape.", marks:5, solution:"(a) Straight line through origin [1] — constant resistance, ohmic behaviour [1]. (b) Curve bending towards V-axis [1] — as current increases, filament temperature rises [1], increasing resistance [1]." },
      { id:"c9q4", stem:"A wire of resistivity $1.7\\times10^{-8}\\,\\Omega\\,m$ has length 3.0 m and diameter 0.80 mm.", parts:[
        { q:"Calculate the cross-sectional area.", marks:1, solution:"$A=\\pi(0.40\\times10^{-3})^2=5.03\\times10^{-7}\\,m^2$ [1]." },
        { q:"Calculate the resistance of the wire.", marks:2, solution:"$R=\\rho L/A=(1.7\\times10^{-8}\\times3.0)/(5.03\\times10^{-7})=0.101\\,\\Omega\\approx0.10\\,\\Omega$ [2]." }
      ]},
    ]
  }
};

// ── Chapter 10: D.C. Circuits ─────────────────────────────────────────────────
const CH10 = {
  id: 10, title: "D.C. Circuits",
  summary: "This chapter applies Kirchhoff's Laws to analyse series and parallel circuits, introduces the potential divider, and considers the effect of internal resistance on EMF.",
  subsections: [
    { title: "10.1 Series and Parallel Circuits",
      objectives: ["Apply Kirchhoff's current and voltage laws", "Calculate total resistance in series and parallel", "Analyse circuits using Kirchhoff's laws"],
      diagrams: [{ label: "Series and Parallel Resistors", svg: D.seriesParallel }],
      content: "**Kirchhoff's First Law (KCL):** The sum of currents entering a junction equals the sum leaving. (Charge conservation.)\n\n**Kirchhoff's Second Law (KVL):** The sum of e.m.f.s around any closed loop equals the sum of potential drops. (Energy conservation.)\n\n**Series:** $R_{total} = R_1+R_2+\\ldots$ &nbsp;|&nbsp; same current, voltages add.\n\n**Parallel:** $\\frac{1}{R_{total}} = \\frac{1}{R_1}+\\frac{1}{R_2}+\\ldots$ &nbsp;|&nbsp; same voltage, currents add.",
      examples: [{ title: "Mixed series-parallel circuit", steps: ["$R_1=6\\,\\Omega$ in series with parallel $R_2=4\\,\\Omega$ and $R_3=12\\,\\Omega$. EMF $=9\\,V$.", "Parallel: $1/R_p = 1/4+1/12 = 4/12$; $R_p = 3\\,\\Omega$", "Total: $R = 6+3 = 9\\,\\Omega$", "Current: $I = 9/9 = 1.0\\,A$"] }],
      questions: [
        { q: "State Kirchhoff's First Law.", solution: "The algebraic sum of currents at any junction in a circuit is zero — the sum of currents entering equals the sum leaving." },
        { q: "Three resistors of 4 Ω, 6 Ω and 12 Ω are connected in parallel. Find the combined resistance.", solution: "$1/R = 1/4+1/6+1/12 = 6/12$; $R = 2\\,\\Omega$" },
        { q: "A 10 Ω and 15 Ω resistor are in series with a 6 V battery. Find the current and the voltage across each resistor.", solution: "$R_{total}=25\\,\\Omega$; $I=6/25=0.24\\,A$; $V_{10}=2.4\\,V$; $V_{15}=3.6\\,V$" },
        { q: "State Kirchhoff's Second Law.", solution: "The sum of the e.m.f.s in a closed loop equals the sum of the potential differences (IR drops) around the loop." },
        { q: "Two resistors of 6 Ω and 3 Ω are in parallel, connected to a 12 V supply. Find the total current drawn.", solution: "$R_p = (6\\times3)/(6+3)=2\\,\\Omega$; $I=12/2=6\\,A$" }
      ]
    },
    { title: "10.2 Potential Dividers and Internal Resistance",
      objectives: ["Analyse potential divider circuits", "Derive and use the potential divider formula", "Define internal resistance and terminal p.d.", "Use ε = I(R + r)"],
      diagrams: [],
      content: "**Potential divider:** $V_{out} = \\frac{R_2}{R_1+R_2}V_s$\n\nReplacing one resistor with an LDR or thermistor gives a sensor circuit.\n\n**Internal resistance:** A real cell has internal resistance $r$. Terminal p.d.:\n$\\varepsilon = I(R+r) \\quad \\Rightarrow \\quad V_{terminal} = \\varepsilon - Ir$\nWhere $Ir$ is the 'lost volts'.",
      examples: [{ title: "Internal resistance", steps: ["Cell: $\\varepsilon=6.0\\,V$, $r=0.5\\,\\Omega$, external $R=11.5\\,\\Omega$.", "$I = 6.0/12.0 = 0.50\\,A$", "Terminal p.d. $= 6.0-0.50\\times0.5 = 5.75\\,V$"] }],
      questions: [
        { q: "A potential divider has $R_1=3\\,k\\Omega$, $R_2=1\\,k\\Omega$, supply 8 V. Find $V_{out}$ across $R_2$.", solution: "$V_{out} = \\frac{1}{3+1}\\times8 = 2.0\\,V$" },
        { q: "A cell has e.m.f. 4.5 V and internal resistance 1.2 Ω. It drives a current of 0.80 A. Find the terminal p.d.", solution: "$V = \\varepsilon - Ir = 4.5-0.80\\times1.2 = 3.54\\,V$" },
        { q: "Explain what is meant by the 'lost volts' in a circuit with internal resistance.", solution: "Lost volts $= Ir$: the potential difference dropped across the internal resistance of the cell. It represents energy wasted as heat inside the cell." },
        { q: "In a potential divider, $R_1$ is replaced by a thermistor. Describe how $V_{out}$ (across $R_2$) changes as temperature increases.", solution: "As temperature increases, thermistor resistance decreases, so more is dropped across $R_2$ — $V_{out}$ increases." },
        { q: "A cell with internal resistance 0.8 Ω drives 2.0 A through a 5.0 Ω resistor. Find the e.m.f.", solution: "$\\varepsilon = I(R+r) = 2.0\\times(5.0+0.8) = 11.6\\,V$" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c10q1", stem:"State Kirchhoff's First and Second Laws and state the conservation law each represents.", marks:4, solution:"First Law: sum of currents entering a junction = sum leaving [1] — conservation of charge [1]. Second Law: sum of e.m.f.s in a loop = sum of p.d.s [1] — conservation of energy [1]." },
      { id:"c10q2", stem:"A circuit consists of a 12 V battery (negligible internal resistance) connected to a 4 Ω resistor in series with a parallel combination of 6 Ω and 3 Ω.", parts:[
        { q:"Calculate the combined resistance of the parallel combination.", marks:2, solution:"$1/R_p=1/6+1/3=3/6$; $R_p=2\\,\\Omega$ [2]." },
        { q:"Calculate the total circuit resistance and the current from the battery.", marks:2, solution:"$R_{total}=4+2=6\\,\\Omega$ [1]; $I=12/6=2.0\\,A$ [1]." },
        { q:"Calculate the current through the 6 Ω resistor.", marks:2, solution:"$V_{parallel}=IR_p=2.0\\times2=4\\,V$ [1]; $I_{6\\Omega}=4/6=0.67\\,A$ [1]." }
      ]},
      { id:"c10q3", stem:"A cell has e.m.f. $\\varepsilon=6.0\\,V$ and internal resistance $r=1.5\\,\\Omega$. It is connected to an external resistance $R=4.5\\,\\Omega$.", parts:[
        { q:"Calculate the current in the circuit.", marks:2, solution:"$I=\\varepsilon/(R+r)=6.0/(4.5+1.5)=1.0\\,A$ [2]." },
        { q:"Calculate the terminal p.d. and the 'lost volts'.", marks:2, solution:"Terminal p.d. $=\\varepsilon-Ir=6.0-1.0\\times1.5=4.5\\,V$ [1]; lost volts $=Ir=1.5\\,V$ [1]." }
      ]},
      { id:"c10q4", stem:"In a potential divider circuit, a supply of 10 V is connected across $R_1=8\\,k\\Omega$ and $R_2=2\\,k\\Omega$ in series. $R_2$ is replaced by an LDR.", parts:[
        { q:"Calculate $V_{out}$ across $R_2$ when the resistance values are as given.", marks:2, solution:"$V_{out}=\\frac{2}{8+2}\\times10=2.0\\,V$ [2]." },
        { q:"Describe and explain how $V_{out}$ changes when the LDR is covered.", marks:2, solution:"$V_{out}$ decreases [1]. In darkness, LDR resistance increases, so a smaller fraction of the supply is dropped across it [1]." }
      ]},
    ]
  }
};

// ── Chapter 11: Particle Physics ──────────────────────────────────────────────
const CH11 = {
  id: 11, title: "Particle Physics",
  summary: "This chapter introduces the structure of matter at the subatomic level: atomic structure, nuclear composition, radioactive decay, and the fundamental particles of the Standard Model.",
  subsections: [
    { title: "11.1 Atomic Structure and Radioactivity",
      objectives: ["Describe the nuclear model of the atom", "Define proton number Z and nucleon number A", "Describe alpha, beta and gamma radiation and their properties", "Write and balance nuclear equations"],
      diagrams: [{ label: "Nuclear Atom Model", svg: D.atomModel }],
      content: "The **nuclear atom** consists of a tiny, dense, positively charged nucleus (protons and neutrons) surrounded by electrons in shells.\n\n**Notation:** ${}^A_Z X$ where $A$ = nucleon number, $Z$ = proton number.\n\n| Radiation | Nature | Charge | Stopped by |\n|---|---|---|---|\n| Alpha (α) | ²He nucleus | +2e | Paper / few cm air |\n| Beta (β⁻) | Electron | −e | Few mm Al |\n| Gamma (γ) | EM radiation | 0 | Several cm Pb |\n\nConservation in nuclear equations: total nucleon number and total charge are both conserved.",
      examples: [{ title: "Balancing a nuclear equation", steps: ["Alpha decay of radium-226: ${}^{226}_{88}Ra \\rightarrow {}^A_Z X + {}^4_2\\alpha$", "Nucleons: $226 = A+4 \\Rightarrow A=222$", "Charge: $88 = Z+2 \\Rightarrow Z=86$", "Product: ${}^{222}_{86}Rn$ (radon)"] }],
      questions: [
        { q: "State the composition of an alpha particle.", solution: "An alpha particle consists of 2 protons and 2 neutrons — identical to a helium-4 nucleus. Charge $= +2e$." },
        { q: "Write a balanced nuclear equation for the beta-minus decay of carbon-14 (${}^{14}_6C$).", solution: "${}^{14}_6C \\rightarrow {}^{14}_7N + {}^0_{-1}\\beta + \\bar{\\nu}_e$" },
        { q: "Explain why gamma radiation is the most penetrating of the three types.", solution: "Gamma rays are high-energy electromagnetic radiation with no charge and negligible mass. They interact weakly with matter, requiring thick lead or concrete to attenuate significantly." },
        { q: "A nucleus ${}^{234}_{90}Th$ undergoes beta-minus decay. Write the equation and identify the daughter nucleus.", solution: "${}^{234}_{90}Th \\rightarrow {}^{234}_{91}Pa + {}^0_{-1}\\beta + \\bar{\\nu}_e$" },
        { q: "State two quantities that are conserved in every nuclear reaction.", solution: "Nucleon number (mass number) and charge (proton number/atomic number)." }
      ]
    },
    { title: "11.2 Fundamental Particles",
      objectives: ["Describe the quark model of hadrons", "State the quark composition of protons and neutrons", "Distinguish hadrons, leptons and quarks", "Describe beta decay in terms of quarks"],
      diagrams: [],
      content: "**Quarks:** building blocks of hadrons. Six flavours: up (u), down (d), charm, strange, top, bottom. Charge: u = +⅔e, d = −⅓e.\n- **Proton:** uud (charge = +e)\n- **Neutron:** udd (charge = 0)\n\n**Hadrons:** made of quarks (e.g. protons, neutrons). Baryons (3 quarks) or mesons (quark + antiquark).\n\n**Leptons:** fundamental particles not made of quarks (e.g. electrons, neutrinos).\n\n**Beta-minus decay:** a down quark changes to an up quark:\n$d \\rightarrow u + e^- + \\bar{\\nu}_e$",
      examples: [{ title: "Quark composition check", steps: ["Verify proton charge: quarks u+u+d", "Charge $= +\\frac{2}{3}+\\frac{2}{3}-\\frac{1}{3} = +\\frac{3}{3} = +1e$ ✓", "Verify neutron: u+d+d", "Charge $= +\\frac{2}{3}-\\frac{1}{3}-\\frac{1}{3} = 0$ ✓"] }],
      questions: [
        { q: "State the quark composition and charge of a proton and a neutron.", solution: "Proton: uud; charge $= +\\frac{2}{3}+\\frac{2}{3}-\\frac{1}{3} = +e$.\nNeutron: udd; charge $= +\\frac{2}{3}-\\frac{1}{3}-\\frac{1}{3} = 0$." },
        { q: "Distinguish between hadrons and leptons.", solution: "Hadrons are particles made up of quarks (e.g. protons, neutrons). Leptons are fundamental particles that do not experience the strong nuclear force and are not made of quarks (e.g. electrons, neutrinos)." },
        { q: "Describe beta-minus decay in terms of quarks.", solution: "A down quark in a neutron changes to an up quark: $d \\rightarrow u + e^- + \\bar{\\nu}_e$. The neutron (udd) becomes a proton (uud)." },
        { q: "State the charges of the up and down quarks.", solution: "Up quark: $+\\frac{2}{3}e$. Down quark: $-\\frac{1}{3}e$." },
        { q: "A pion $\\pi^+$ consists of an up quark and an anti-down quark. Verify that its charge is $+e$.", solution: "Charge of $u = +\\frac{2}{3}e$; charge of $\\bar{d} = +\\frac{1}{3}e$. Total $= +\\frac{2}{3}+\\frac{1}{3} = +e$ ✓" }
      ]
    }
  ],
  checkpoint: {
    questions: [
      { id:"c11q1", stem:"Compare the properties of alpha, beta-minus and gamma radiation.", marks:6, solution:"Alpha: helium-4 nucleus, charge +2e, mass 4u, range few cm in air, stopped by paper [2]. Beta: electron, charge −e, negligible mass, range few mm Al [2]. Gamma: EM radiation, no charge/mass, requires cm of lead to attenuate significantly [2]." },
      { id:"c11q2", stem:"Uranium-238 (${}^{238}_{92}U$) undergoes alpha decay to form thorium.", parts:[
        { q:"Write the balanced nuclear equation.", marks:3, solution:"${}^{238}_{92}U \\rightarrow {}^{234}_{90}Th + {}^4_2\\alpha$ [3] — 1 mark each for correct A, Z, and symbol." },
        { q:"State the two conservation laws applied to balance the equation.", marks:2, solution:"Conservation of nucleon number [1] and conservation of charge (proton number) [1]." }
      ]},
      { id:"c11q3", stem:"State the quark composition of a proton and a neutron, and verify the charge of each.", marks:4, solution:"Proton: uud [1]; charge $= +\\frac{2}{3}+\\frac{2}{3}-\\frac{1}{3}=+e$ ✓ [1]. Neutron: udd [1]; charge $= +\\frac{2}{3}-\\frac{1}{3}-\\frac{1}{3}=0$ ✓ [1]." },
      { id:"c11q4", stem:"Describe beta-minus decay at the quark level and write the equation.", marks:3, solution:"A down quark changes to an up quark [1]: $d \\rightarrow u + e^- + \\bar{\\nu}_e$ [1]. The neutron (udd) becomes a proton (uud) [1]." },
      { id:"c11q5", stem:"Distinguish between hadrons and leptons, giving one example of each.", marks:2, solution:"Hadrons are made of quarks (e.g. proton/neutron) [1]. Leptons are fundamental, not made of quarks (e.g. electron/neutrino) [1]." },
    ]
  }
};

// ── Chapter registry ──────────────────────────────────────────────────────────
const CHAPTERS = [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8, CH9, CH10, CH11];

// ═══════════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function buildQid(chId, si, qi) { return `ch${chId}_s${si}_q${qi}`; }
function buildSubId(chId, si) { return `ch${chId}_s${si}`; }

function WorkedExample({ title, steps }) {
  return (
    <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 9, padding: 14, marginBottom: 18 }}>
      <div style={{ fontWeight: 700, color: "#92400e", fontSize: 12, marginBottom: 8 }}>
        <span style={{ background: "#f59e0b", color: "#fff", borderRadius: 4, padding: "1px 7px", fontSize: 11, marginRight: 8 }}>WORKED EXAMPLE</span>{title}
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <span style={{ background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}><MathText text={s} /></div>
        </div>
      ))}
    </div>
  );
}

function QuestionCard({ q, idx, qid, user }) {
  const [ans, setAns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [savedMark, setSavedMark] = useState(null);

  useEffect(() => {
    sGet(`ans:${user}:${qid}`).then(d => {
      if (d) { setAns(d.ans || ""); setFeedback(d.feedback || ""); setSubmitted(true); setSavedMark(d.mark ?? null); }
    });
  }, [qid, user]);

  async function grade() {
    if (!ans.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 600,
          messages: [{ role: "user", content: `You are a Cambridge AS Physics examiner. Grade concisely.\n\nQuestion: ${q.q}\nModel solution: ${q.solution}\nStudent answer (LaTeX): ${ans}\n\nRespond ONLY:\nMARK: X/3\nFEEDBACK: [2-3 sentences]` }]
        })
      });
      const d = await res.json();
      const txt = d.content?.map(c => c.text || "").join("") || "Error.";
      const mark = parseInt(txt.match(/MARK:\s*(\d)/)?.[1] || "0");
      setFeedback(txt); setSubmitted(true); setSavedMark(mark);
      await sSet(`ans:${user}:${qid}`, { ans, feedback: txt, mark });
      const scores = await sGet(SK.scores) || {};
      if (!scores[user]) scores[user] = {};
      scores[user][qid] = mark;
      await sSet(SK.scores, scores);
    } catch { setFeedback("Error connecting to grading service."); setSubmitted(true); }
    setLoading(false);
  }

  const markNum = savedMark !== null ? savedMark : parseInt(feedback.match(/MARK:\s*(\d)/)?.[1] || "0");
  const fb = feedback.replace(/MARK:\s*\d\/3\s*/, "").replace("FEEDBACK:", "").trim();
  const markCol = ["#dc2626", "#dc2626", "#d97706", "#16a34a"][markNum] || "#374151";

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 9, padding: 16, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <span style={{ background: "#1a1a2e", color: "#fff", borderRadius: 5, padding: "2px 9px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>Q{idx + 1}</span>
        <span style={{ fontSize: 13, color: "#1f2937" }}><MathText text={q.q} /></span>
        {submitted && <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 12, color: markCol, whiteSpace: "nowrap" }}>{markNum}/3</span>}
      </div>
      <textarea value={ans} onChange={e => setAns(e.target.value)} disabled={submitted}
        placeholder="Type your answer (LaTeX supported)"
        style={{ width: "100%", minHeight: 58, fontFamily: "monospace", fontSize: 12, padding: 8, border: "1px solid #d1d5db", borderRadius: 6, resize: "vertical", boxSizing: "border-box", outline: "none" }} />
      {ans.length > 0 && !submitted && (
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 10px", marginTop: 5, marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>Preview</div>
          <LatexPreview latex={ans} />
        </div>
      )}
      {!submitted
        ? <button onClick={grade} disabled={loading || !ans.trim()} style={{ background: loading ? "#9ca3af" : "#1a1a2e", color: "#fff", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 12, cursor: loading || !ans.trim() ? "not-allowed" : "pointer", fontWeight: 500, marginTop: 4 }}>
          {loading ? "Grading…" : "Submit Answer"}
        </button>
        : <div>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 7, padding: 10, marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: markCol, marginBottom: 4 }}>Mark: {markNum}/3</div>
            <div style={{ fontSize: 12, color: "#374151" }}>{fb}</div>
          </div>
          <button onClick={() => setShowSol(s => !s)} style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>
            {showSol ? "Hide" : "Show"} Model Solution
          </button>
          {showSol && (
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 7, padding: 10, marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", marginBottom: 5 }}>MODEL SOLUTION</div>
              <div style={{ fontSize: 12, color: "#1e3a5f" }}><MathText text={q.solution} /></div>
            </div>
          )}
        </div>
      }
    </div>
  );
}

function CheckpointTest({ test, chId, user }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [totalMark, setTotalMark] = useState(null);
  const storageKey = `checkpoint:${user}:ch${chId}`;

  useEffect(() => {
    sGet(storageKey).then(d => {
      if (d) { setAnswers(d.answers || {}); setResults(d.results || {}); setSubmitted(true); setTotalMark(d.total ?? null); }
    });
  }, [storageKey]);

  const maxTotal = test.questions.reduce((a, q) => a + (q.parts ? q.parts.reduce((b, p) => b + p.marks, 0) : q.marks), 0);

  function allAnswered() {
    return test.questions.every(q => q.parts ? q.parts.every((_, pi) => answers[`${q.id}-${pi}`]?.trim()) : answers[q.id]?.trim());
  }

  async function handleSubmit() {
    setLoading(true);
    const newResults = {};
    let total = 0;
    for (const q of test.questions) {
      if (q.parts) {
        for (let pi = 0; pi < q.parts.length; pi++) {
          const part = q.parts[pi];
          const ans = answers[`${q.id}-${pi}`] || "";
          try {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400,
                messages: [{ role: "user", content: `Cambridge AS Physics examiner. Grade concisely.\n\nQuestion: ${q.stem} — Part (${String.fromCharCode(97 + pi)}): ${part.q} [${part.marks} marks]\nMark scheme: ${part.solution}\nStudent answer: ${ans}\n\nRespond ONLY:\nMARK: X/${part.marks}\nFEEDBACK: [1-2 sentences]` }]
              })
            });
            const d = await res.json();
            const txt = d.content?.map(c => c.text || "").join("") || "";
            const m = Math.min(parseInt(txt.match(/MARK:\s*(\d+)/)?.[1] || "0"), part.marks);
            newResults[`${q.id}-${pi}`] = { mark: m, max: part.marks, feedback: txt.replace(/MARK:\s*\d+\/\d+\s*/, "").replace("FEEDBACK:", "").trim() };
            total += m;
          } catch { newResults[`${q.id}-${pi}`] = { mark: 0, max: part.marks, feedback: "Grading error." }; }
        }
      } else {
        const ans = answers[q.id] || "";
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400,
              messages: [{ role: "user", content: `Cambridge AS Physics examiner. Grade concisely.\n\nQuestion: ${q.stem} [${q.marks} marks]\nMark scheme: ${q.solution}\nStudent answer: ${ans}\n\nRespond ONLY:\nMARK: X/${q.marks}\nFEEDBACK: [1-2 sentences]` }]
            })
          });
          const d = await res.json();
          const txt = d.content?.map(c => c.text || "").join("") || "";
          const m = Math.min(parseInt(txt.match(/MARK:\s*(\d+)/)?.[1] || "0"), q.marks);
          newResults[q.id] = { mark: m, max: q.marks, feedback: txt.replace(/MARK:\s*\d+\/\d+\s*/, "").replace("FEEDBACK:", "").trim() };
          total += m;
        } catch { newResults[q.id] = { mark: 0, max: q.marks, feedback: "Grading error." }; }
      }
    }
    setResults(newResults); setSubmitted(true); setTotalMark(total);
    await sSet(storageKey, { answers, results: newResults, total });
    const scores = await sGet(SK.scores) || {};
    if (!scores[user]) scores[user] = {};
    scores[user][`ch${chId}_checkpoint`] = total;
    await sSet(SK.scores, scores);
    setLoading(false);
  }

  const grade = totalMark === null ? null : totalMark >= maxTotal * 0.8 ? "A" : totalMark >= maxTotal * 0.67 ? "B" : totalMark >= maxTotal * 0.5 ? "C" : totalMark >= maxTotal * 0.34 ? "D" : "U";
  const gradeCol = { A: "#16a34a", B: "#3b82f6", C: "#f59e0b", D: "#ef4444", U: "#9ca3af" }[grade] || "#374151";
  const taStyle = { width: "100%", minHeight: 56, fontFamily: "monospace", fontSize: 12, padding: 8, border: "1px solid #d1d5db", borderRadius: 6, resize: "vertical", boxSizing: "border-box", outline: "none" };

  return (
    <div style={{ marginTop: 28, border: "2px solid #1a1a2e", borderRadius: 13, overflow: "hidden" }}>
      <button onClick={() => setShowTest(o => !o)} style={{ width: "100%", background: "#1a1a2e", color: "#fff", border: "none", padding: "16px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>
          📝 Chapter Checkpoint Test — {maxTotal} marks
          {submitted && grade && <span style={{ marginLeft: 12, background: gradeCol, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>{totalMark}/{maxTotal} — Grade {grade}</span>}
        </span>
        <span style={{ fontWeight: 300, fontSize: 20 }}>{showTest ? "−" : "+"}</span>
      </button>
      {showTest && (
        <div style={{ background: "#fff", padding: "24px 26px" }}>
          <div style={{ border: "2px solid #1a1a2e", borderRadius: 9, padding: "14px 18px", marginBottom: 22, background: "#f8fafc" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>Cambridge International AS Level Physics 9702</div>
            <div style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}>Chapter {chId} Checkpoint Test &nbsp;|&nbsp; Total: {maxTotal} marks &nbsp;|&nbsp; Suggested time: 25 minutes</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Show all working. Give answers to appropriate significant figures. Include units where required.</div>
          </div>
          {test.questions.map((q, qi) => (
            <div key={q.id} style={{ marginBottom: 26, paddingBottom: 20, borderBottom: qi < test.questions.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 10 }}>
                {qi + 1}.&nbsp;<MathText text={q.stem} />
                {!q.parts && <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 12, marginLeft: 8 }}>[{q.marks} {q.marks === 1 ? "mark" : "marks"}]</span>}
              </div>
              {q.parts ? q.parts.map((part, pi) => {
                const pKey = `${q.id}-${pi}`;
                const res = results[pKey];
                const mc = res ? (res.mark === res.max ? "#16a34a" : res.mark > 0 ? "#d97706" : "#dc2626") : "#374151";
                return (
                  <div key={pi} style={{ marginLeft: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, color: "#374151", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <span>({String.fromCharCode(97 + pi)})&nbsp;<MathText text={part.q} /></span>
                      <span style={{ color: "#6b7280", fontSize: 12, whiteSpace: "nowrap" }}>[{part.marks} {part.marks === 1 ? "mark" : "marks"}]</span>
                    </div>
                    <textarea value={answers[pKey] || ""} onChange={e => setAnswers(a => ({ ...a, [pKey]: e.target.value }))} disabled={submitted} placeholder={`Answer part (${String.fromCharCode(97 + pi)})…`} style={taStyle} />
                    {answers[pKey]?.length > 0 && !submitted && (
                      <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 10px", marginTop: 4 }}>
                        <div style={{ fontSize: 10, color: "#9ca3af" }}>Preview</div>
                        <LatexPreview latex={answers[pKey]} />
                      </div>
                    )}
                    {submitted && res && (
                      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 7, padding: "8px 12px", marginTop: 6 }}>
                        <span style={{ fontWeight: 700, color: mc, fontSize: 13 }}>{res.mark}/{res.max} — </span>
                        <span style={{ fontSize: 12, color: "#374151" }}>{res.feedback}</span>
                      </div>
                    )}
                    {submitted && (
                      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 7, padding: "8px 12px", marginTop: 4 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", marginBottom: 3 }}>MARK SCHEME</div>
                        <div style={{ fontSize: 12, color: "#1e3a5f" }}><MathText text={part.solution} /></div>
                      </div>
                    )}
                  </div>
                );
              }) : (
                <div style={{ marginLeft: 20 }}>
                  <textarea value={answers[q.id] || ""} onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))} disabled={submitted} placeholder="Write your answer here…" style={taStyle} />
                  {answers[q.id]?.length > 0 && !submitted && (
                    <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 10px", marginTop: 4 }}>
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>Preview</div>
                      <LatexPreview latex={answers[q.id]} />
                    </div>
                  )}
                  {submitted && results[q.id] && (
                    <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 7, padding: "8px 12px", marginTop: 6 }}>
                      <span style={{ fontWeight: 700, color: results[q.id].mark === results[q.id].max ? "#16a34a" : results[q.id].mark > 0 ? "#d97706" : "#dc2626", fontSize: 13 }}>{results[q.id].mark}/{results[q.id].max} — </span>
                      <span style={{ fontSize: 12, color: "#374151" }}>{results[q.id].feedback}</span>
                    </div>
                  )}
                  {submitted && (
                    <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 7, padding: "8px 12px", marginTop: 4 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", marginBottom: 3 }}>MARK SCHEME</div>
                      <div style={{ fontSize: 12, color: "#1e3a5f" }}><MathText text={q.solution} /></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {!submitted && (
            <div style={{ borderTop: "2px solid #e5e7eb", paddingTop: 18, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button onClick={handleSubmit} disabled={loading || !allAnswered()}
                style={{ background: loading || !allAnswered() ? "#9ca3af" : "#1a1a2e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 14, fontWeight: 700, cursor: loading || !allAnswered() ? "not-allowed" : "pointer" }}>
                {loading ? "Grading all answers…" : "Submit Test"}
              </button>
              {!allAnswered() && !loading && <span style={{ fontSize: 12, color: "#9ca3af" }}>Answer all questions before submitting.</span>}
              {loading && <span style={{ fontSize: 12, color: "#6b7280" }}>This may take a moment…</span>}
            </div>
          )}
          {submitted && (
            <div style={{ borderTop: "2px solid #e5e7eb", paddingTop: 18, background: "#f8fafc", borderRadius: 9, padding: 18, marginTop: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>
                Final Score:&nbsp;<span style={{ color: gradeCol }}>{totalMark}/{maxTotal}</span>
                <span style={{ marginLeft: 14, background: gradeCol, color: "#fff", borderRadius: 7, padding: "2px 14px", fontSize: 15 }}>Grade {grade}</span>
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {grade === "A" ? "Excellent — well prepared for this topic." : grade === "B" ? "Good — review any lost marks carefully." : grade === "C" ? "Satisfactory — revisit the subsections before the exam." : "Needs further revision — work through the subsections again."}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Subsection({ sub, chId, si, user }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 16, border: "1px solid #e5e7eb", borderRadius: 11, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", textAlign: "left", background: open ? "#1a1a2e" : "#f9fafb", color: open ? "#fff" : "#1f2937", border: "none", padding: "13px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {sub.title}<span style={{ fontSize: 18, fontWeight: 300 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "20px 22px", background: "#fff" }}>
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: 14, marginBottom: 18 }}>
            <div style={{ fontWeight: 700, color: "#0369a1", marginBottom: 7, fontSize: 11, letterSpacing: 0.5 }}>LEARNING OBJECTIVES</div>
            <ul style={{ margin: 0, paddingLeft: 16 }}>{sub.objectives.map((o, i) => <li key={i} style={{ marginBottom: 4, fontSize: 13, color: "#1e40af" }}>{o}</li>)}</ul>
          </div>
          {sub.diagrams?.map((d, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              {d.label && <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{d.label}</div>}
              {d.svg}
            </div>
          ))}
          <div style={{ color: "#374151", fontSize: 13, lineHeight: 1.75, marginBottom: 18 }}><MathText text={sub.content} /></div>
          {sub.examples?.map((ex, i) => <WorkedExample key={i} title={ex.title} steps={ex.steps} />)}
          <div style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 10, fontSize: 13, borderBottom: "2px solid #e5e7eb", paddingBottom: 7 }}>Practice Questions</div>
          {sub.questions.map((q, i) => <QuestionCard key={i} q={q} idx={i} qid={buildQid(chId, si, i)} user={user} />)}
        </div>
      )}
    </div>
  );
}

function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const scores = await sGet(SK.scores) || {};
      const us = await sGet(SK.users) || {};
      setData(scores); setUsers(us); setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>Loading dashboard…</div>;

  const studentNames = Object.keys(users).filter(u => u !== TEACHER_USER);
  const subGroups = {};
  CHAPTERS.forEach(ch => ch.subsections.forEach((sub, si) => {
    const sid = buildSubId(ch.id, si);
    subGroups[sid] = { title: sub.title, qids: sub.questions.map((_, qi) => buildQid(ch.id, si, qi)) };
  }));
  const allQids = [];
  CHAPTERS.forEach(ch => ch.subsections.forEach((sub, si) => sub.questions.forEach((_, qi) => {
    allQids.push({ qid: buildQid(ch.id, si, qi), label: `Ch${ch.id} ${sub.title.split(" ")[0]} Q${qi + 1}` });
  })));

  const cS = { padding: "7px 10px", borderBottom: "1px solid #f1f5f9", fontSize: 12, textAlign: "center" };
  const hS = { ...cS, background: "#f8fafc", fontWeight: 700, color: "#374151", fontSize: 11 };

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 20px" }}>
      {studentNames.length === 0 && (
        <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 9, padding: 18, color: "#92400e", fontSize: 14 }}>No students have registered yet.</div>
      )}
      {studentNames.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 16, color: "#1a1a2e", marginBottom: 12 }}>📊 Cumulative Scoresheet</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <thead>
                <tr>
                  <th style={{ ...hS, textAlign: "left", minWidth: 120 }}>Student</th>
                  {Object.values(subGroups).map(g => <th key={g.title} style={{ ...hS, minWidth: 80, fontSize: 10 }}>{g.title.length > 18 ? g.title.slice(0, 16) + "…" : g.title}</th>)}
                  {CHAPTERS.map(ch => <th key={`cp${ch.id}`} style={{ ...hS, minWidth: 70, fontSize: 10, background: "#fef9c3" }}>Ch{ch.id} Test</th>)}
                  <th style={{ ...hS, background: "#1a1a2e", color: "#fff" }}>Total</th>
                  <th style={{ ...hS, background: "#1a1a2e", color: "#fff" }}>%</th>
                </tr>
              </thead>
              <tbody>
                {studentNames.map(u => {
                  const sc = data[u] || {};
                  let grandTotal = 0, grandMax = 0;
                  const subCells = Object.entries(subGroups).map(([sid, g]) => {
                    const subTotal = g.qids.reduce((a, qid) => a + (sc[qid] ?? 0), 0);
                    const subMax = g.qids.filter(qid => sc[qid] !== undefined).length * 3;
                    const attempted = g.qids.some(qid => sc[qid] !== undefined);
                    grandTotal += subTotal; grandMax += subMax;
                    const pct = subMax > 0 ? subTotal / subMax : null;
                    const bg = !attempted ? "#f9fafb" : pct >= 0.67 ? "#f0fdf4" : pct >= 0.34 ? "#fefce8" : "#fef2f2";
                    return <td key={sid} style={{ ...cS, background: bg, color: !attempted ? "#9ca3af" : "#1a1a2e" }}>{attempted ? `${subTotal}/${subMax}` : "—"}</td>;
                  });
                  const cpCells = CHAPTERS.map(ch => {
                    const cpKey = `ch${ch.id}_checkpoint`;
                    const cpScore = sc[cpKey];
                    const cpMax = ch.checkpoint?.questions.reduce((a, q) => a + (q.parts ? q.parts.reduce((b, p) => b + p.marks, 0) : q.marks), 0) || 20;
                    if (cpScore !== undefined) { grandTotal += cpScore; grandMax += cpMax; }
                    const pct = cpScore !== undefined ? cpScore / cpMax : null;
                    const bg = cpScore === undefined ? "#f9fafb" : pct >= 0.67 ? "#f0fdf4" : pct >= 0.34 ? "#fefce8" : "#fef2f2";
                    return <td key={cpKey} style={{ ...cS, background: bg, color: cpScore === undefined ? "#9ca3af" : "#1a1a2e", fontWeight: cpScore !== undefined ? 600 : 400 }}>{cpScore !== undefined ? `${cpScore}/${cpMax}` : "—"}</td>;
                  });
                  return (
                    <tr key={u}>
                      <td style={{ ...cS, textAlign: "left", fontWeight: 600, color: "#1a1a2e" }}>{u}</td>
                      {subCells}{cpCells}
                      <td style={{ ...cS, fontWeight: 700, background: "#f0f9ff", color: "#1e40af" }}>{grandTotal}</td>
                      <td style={{ ...cS, fontWeight: 700, background: "#f0f9ff", color: "#1e40af" }}>{grandMax > 0 ? Math.round(grandTotal / grandMax * 100) + "%" : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>🟩 ≥67% &nbsp; 🟨 34–66% &nbsp; 🟥 &lt;34% &nbsp; — = not attempted</div>
        </div>
      )}
      {studentNames.length > 0 && Object.entries(subGroups).map(([sid, g]) => {
        const attempted = studentNames.some(u => g.qids.some(qid => data[u]?.[qid] !== undefined));
        if (!attempted) return null;
        return (
          <div key={sid} style={{ marginBottom: 26 }}>
            <h2 style={{ fontSize: 15, color: "#1a1a2e", marginBottom: 10 }}>📋 {g.title}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <thead><tr>
                  <th style={{ ...hS, textAlign: "left", minWidth: 110 }}>Student</th>
                  {g.qids.map((_, i) => <th key={i} style={hS}>Q{i + 1}</th>)}
                  <th style={{ ...hS, background: "#e0f2fe", color: "#0369a1" }}>Score</th>
                  <th style={{ ...hS, background: "#e0f2fe", color: "#0369a1" }}>Grade</th>
                </tr></thead>
                <tbody>
                  {studentNames.map(u => {
                    const sc = data[u] || {};
                    const marks = g.qids.map(qid => sc[qid]);
                    const answered = marks.filter(m => m !== undefined);
                    const total = answered.reduce((a, b) => a + b, 0);
                    const max = answered.length * 3;
                    const pct = max > 0 ? total / max : null;
                    const grade = pct === null ? "—" : pct >= 0.8 ? "A" : pct >= 0.67 ? "B" : pct >= 0.5 ? "C" : pct >= 0.34 ? "D" : "U";
                    const gc = { A: "#16a34a", B: "#3b82f6", C: "#f59e0b", D: "#ef4444", U: "#9ca3af", "—": "#9ca3af" }[grade];
                    return (
                      <tr key={u}>
                        <td style={{ ...cS, textAlign: "left", fontWeight: 500 }}>{u}</td>
                        {marks.map((m, i) => {
                          const col = m === undefined ? "#9ca3af" : m === 3 ? "#16a34a" : m === 2 ? "#f59e0b" : "#dc2626";
                          return <td key={i} style={{ ...cS, color: col, fontWeight: 600 }}>{m === undefined ? "—" : m + "/3"}</td>;
                        })}
                        <td style={{ ...cS, fontWeight: 700, background: "#f0f9ff" }}>{max > 0 ? `${total}/${max}` : "—"}</td>
                        <td style={{ ...cS, fontWeight: 800, fontSize: 14, color: gc, background: "#f0f9ff" }}>{grade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
      {studentNames.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, color: "#1a1a2e", marginBottom: 10 }}>🔍 Class Question Analysis</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <thead><tr>
                <th style={{ ...hS, textAlign: "left", minWidth: 120 }}>Question</th>
                <th style={hS}>Attempted</th>
                <th style={{ ...hS, color: "#dc2626" }}>0/3</th>
                <th style={{ ...hS, color: "#dc2626" }}>1/3</th>
                <th style={{ ...hS, color: "#d97706" }}>2/3</th>
                <th style={{ ...hS, color: "#16a34a" }}>3/3</th>
                <th style={{ ...hS, background: "#1a1a2e", color: "#fff" }}>Avg</th>
                <th style={{ ...hS, background: "#1a1a2e", color: "#fff" }}>Flag</th>
              </tr></thead>
              <tbody>
                {allQids.filter(({ qid }) => studentNames.some(u => data[u]?.[qid] !== undefined)).map(({ qid, label }) => {
                  const marks = studentNames.map(u => data[u]?.[qid]).filter(m => m !== undefined);
                  const counts = [0, 1, 2, 3].map(v => marks.filter(m => m === v).length);
                  const avg = marks.length ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1) : "—";
                  const struggling = parseFloat(avg) < 1.5 && marks.length > 0;
                  return (
                    <tr key={qid} style={{ background: struggling ? "#fef2f2" : "#fff" }}>
                      <td style={{ ...cS, textAlign: "left", fontSize: 11 }}>{label}</td>
                      <td style={cS}>{marks.length}</td>
                      {counts.map((c, i) => <td key={i} style={{ ...cS, fontWeight: c > 0 ? 700 : 400, color: c > 0 ? ["#dc2626", "#dc2626", "#d97706", "#16a34a"][i] : "#d1d5db" }}>{c}</td>)}
                      <td style={{ ...cS, fontWeight: 700, background: "#f8fafc" }}>{avg}</td>
                      <td style={{ ...cS, fontSize: 14 }}>{struggling ? "⚠️" : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>⚠️ = class average below 1.5/3</div>
        </div>
      )}
    </div>
  );
}

function TeacherApp({ onLogout }) {
  const [view, setView] = useState("dashboard");
  const [chPage, setChPage] = useState("home");
  const ch = CHAPTERS.find(c => c.id === chPage);

  const Header = () => (
    <header style={{ background: "#1a1a2e", color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: "#3b82f6", borderRadius: 7, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>φ</div>
        <div><div style={{ fontWeight: 700, fontSize: 15 }}>Cambridge Physics</div><div style={{ fontSize: 10, color: "#94a3b8" }}>{view === "dashboard" ? "Teacher Dashboard" : "Course Materials"}</div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>👤 Robin</span>
        <button onClick={() => { setView("dashboard"); setChPage("home"); }} style={{ background: view === "dashboard" ? "#3b82f6" : "none", border: "1px solid #334155", color: "#fff", borderRadius: 6, padding: "4px 11px", cursor: "pointer", fontSize: 12 }}>📊 Dashboard</button>
        <button onClick={() => { setView("materials"); setChPage("home"); }} style={{ background: view === "materials" ? "#3b82f6" : "none", border: "1px solid #334155", color: "#fff", borderRadius: 6, padding: "4px 11px", cursor: "pointer", fontSize: 12 }}>📚 Materials</button>
        <button onClick={onLogout} style={{ background: "none", border: "1px solid #334155", color: "#94a3b8", borderRadius: 6, padding: "4px 11px", cursor: "pointer", fontSize: 12 }}>Log out</button>
      </div>
    </header>
  );

  const ChapterGrid = () => (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, color: "#1a1a2e", margin: "0 0 8px" }}>AS Level Physics — Materials</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
        {CHAPTERS.map(c => (
          <button key={c.id} onClick={() => setChPage(c.id)}
            style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ background: "#1a1a2e", color: "#fff", borderRadius: 7, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{c.id}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5 }}>{c.summary.slice(0, 85)}…</div>
                <div style={{ marginTop: 7, fontSize: 11, color: "#3b82f6" }}>{c.subsections.length} subsections · {c.subsections.reduce((a, s) => a + s.questions.length, 0)} questions</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  if (view === "dashboard") return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <Header />
      <div style={{ background: "#1a1a2e", color: "#fff", padding: "20px 26px", maxWidth: 980, margin: "0 auto", borderRadius: "0 0 12px 12px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 22 }}>Class Progress Overview</h1>
        <div style={{ color: "#94a3b8", fontSize: 13 }}>All student results and scores</div>
      </div>
      <TeacherDashboard />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <Header />
      {chPage === "home" ? <ChapterGrid /> : (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "26px 20px" }}>
          <button onClick={() => setChPage("home")} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: 13, marginBottom: 14 }}>← All Chapters</button>
          <div style={{ background: "#1a1a2e", color: "#fff", borderRadius: 12, padding: "22px 26px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>Chapter {ch.id}</div>
            <h1 style={{ margin: "0 0 7px", fontSize: 21 }}>{ch.title}</h1>
            <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6, fontSize: 13 }}>{ch.summary}</p>
          </div>
          {ch.subsections.map((sub, i) => <Subsection key={i} sub={sub} chId={ch.id} si={i} user="Robin" />)}
          {ch.checkpoint && <CheckpointTest test={ch.checkpoint} chId={ch.id} user="Robin" />}
        </div>
      )}
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  async function handleSignup() {
    setError(""); setLoading(true);
    if (!username.trim() || !password.trim()) { setError("Please fill in all fields."); setLoading(false); return; }
    if (password !== confirm) { setError("Passwords do not match."); setLoading(false); return; }
    if (username === TEACHER_USER) { setError("That username is reserved."); setLoading(false); return; }
    const users = await sGet(SK.users) || {};
    if (users[username]) { setError("Username already taken."); setLoading(false); return; }
    users[username] = { password };
    await sSet(SK.users, users);
    onLogin(username, false);
    setLoading(false);
  }

  async function handleLogin() {
    setError(""); setLoading(true);
    if (username === TEACHER_USER && password === TEACHER_PASSWORD) { onLogin(TEACHER_USER, true); setLoading(false); return; }
    const users = await sGet(SK.users) || {};
    if (!users[username] || users[username].password !== password) { setError("Incorrect username or password."); setLoading(false); return; }
    onLogin(username, false);
    setLoading(false);
  }

  const iS = { width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 7, fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 10 };
  const pwW = { position: "relative", marginBottom: 10 };
  const pwI = { width: "100%", padding: "10px 40px 10px 12px", border: "1px solid #d1d5db", borderRadius: 7, fontSize: 14, boxSizing: "border-box", outline: "none" };
  const eyeB = { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 16, padding: 0 };
  const btnS = { width: "100%", padding: "11px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4 };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.10)", padding: "36px 32px", width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ background: "#1a1a2e", color: "#fff", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, margin: "0 auto 12px" }}>φ</div>
          <h1 style={{ fontSize: 20, color: "#1a1a2e", margin: "0 0 4px" }}>Cambridge Physics</h1>
          <div style={{ fontSize: 13, color: "#6b7280" }}>AS & A Level Revision</div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "7px 4px", background: mode === m ? "#1a1a2e" : "#f3f4f6", color: mode === m ? "#fff" : "#374151", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>
        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7, padding: "9px 12px", color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</div>}
        {mode === "login" && <>
          <input style={iS} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <div style={pwW}>
            <input style={pwI} type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
            <button style={eyeB} onClick={() => setShowPw(s => !s)}>{showPw ? "🙈" : "👁️"}</button>
          </div>
          <button style={btnS} onClick={handleLogin} disabled={loading}>{loading ? "Logging in…" : "Log In"}</button>
        </>}
        {mode === "signup" && <>
          <input style={iS} placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} />
          <div style={pwW}>
            <input style={pwI} type={showPw ? "text" : "password"} placeholder="Choose a password" value={password} onChange={e => setPassword(e.target.value)} />
            <button style={eyeB} onClick={() => setShowPw(s => !s)}>{showPw ? "🙈" : "👁️"}</button>
          </div>
          <div style={pwW}>
            <input style={pwI} type={showPw ? "text" : "password"} placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSignup()} />
            <button style={eyeB} onClick={() => setShowPw(s => !s)}>{showPw ? "🙈" : "👁️"}</button>
          </div>
          <button style={btnS} onClick={handleSignup} disabled={loading}>{loading ? "Creating…" : "Create Account"}</button>
        </>}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [page, setPage] = useState("home");

  function handleLogin(u, teacher) { setUser(u); setIsTeacher(teacher); setPage("home"); }
  function handleLogout() { setUser(null); setIsTeacher(false); setPage("home"); }

  if (!user) return <AuthScreen onLogin={handleLogin} />;
  if (isTeacher) return <TeacherApp onLogout={handleLogout} />;

  const ch = CHAPTERS.find(c => c.id === page);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <header style={{ background: "#1a1a2e", color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "#3b82f6", borderRadius: 7, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>φ</div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>Cambridge Physics</div><div style={{ fontSize: 10, color: "#94a3b8" }}>AS & A Level Revision</div></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>👤 {user}</span>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "1px solid #334155", color: "#94a3b8", borderRadius: 6, padding: "4px 11px", cursor: "pointer", fontSize: 12 }}>Chapters</button>
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid #334155", color: "#94a3b8", borderRadius: 6, padding: "4px 11px", cursor: "pointer", fontSize: 12 }}>Log out</button>
        </div>
      </header>
      {page === "home" ? (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, color: "#1a1a2e", margin: "0 0 8px" }}>AS Level Physics</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Select a chapter to begin. Your answers and marks are saved to your profile.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
            {CHAPTERS.map(c => (
              <button key={c.id} onClick={() => setPage(c.id)}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ background: "#1a1a2e", color: "#fff", borderRadius: 7, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{c.id}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5 }}>{c.summary.slice(0, 85)}…</div>
                    <div style={{ marginTop: 7, fontSize: 11, color: "#3b82f6" }}>{c.subsections.length} subsections · {c.subsections.reduce((a, s) => a + s.questions.length, 0)} questions + checkpoint test</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "26px 20px" }}>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: 13, marginBottom: 14 }}>← All Chapters</button>
          <div style={{ background: "#1a1a2e", color: "#fff", borderRadius: 12, padding: "22px 26px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>Chapter {ch.id}</div>
            <h1 style={{ margin: "0 0 7px", fontSize: 21 }}>{ch.title}</h1>
            <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6, fontSize: 13 }}>{ch.summary}</p>
          </div>
          {ch.subsections.map((sub, i) => <Subsection key={i} sub={sub} chId={ch.id} si={i} user={user} />)}
          {ch.checkpoint && <CheckpointTest test={ch.checkpoint} chId={ch.id} user={user} />}
        </div>
      )}
    </div>
  );
}
