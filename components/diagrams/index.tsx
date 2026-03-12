// All SVG diagrams extracted from reference/existing-ui.tsx
// Each diagram is a named React element matching the original exactly.

export const SiUnitsDiagram = (
  <svg viewBox="0 0 500 180" style={{ width: "100%", maxWidth: 500, display: "block", margin: "0 auto" }}>
    <rect width="500" height="180" fill="#f8fafc" rx="8" />
    <text x="250" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">SI Base Quantities</text>
    {([["Length","m","#3b82f6",55,65],["Mass","kg","#10b981",155,65],["Time","s","#f59e0b",255,65],["Current","A","#ef4444",355,65],["Temperature","K","#8b5cf6",105,140],["Amount","mol","#06b6d4",255,140],["Luminosity","cd","#f97316",405,140]] as Array<[string,string,string,number,number]>).map(([n,s,c,x,y]) => (
      <g key={n}>
        <rect x={x-45} y={y-22} width="90" height="48" rx="7" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1.5" />
        <text x={x} y={y-4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={c}>{n}</text>
        <text x={x} y={y+16} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a2e">{s}</text>
      </g>
    ))}
  </svg>
);

export const VectorResolutionDiagram = (
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
  </svg>
);

export const SvtGraphsDiagram = (
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
  </svg>
);

export const ProjectileDiagram = (
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
  </svg>
);

export const MomentDiagram = (
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
  </svg>
);

export const EnergyConservationDiagram = (
  <svg viewBox="0 0 440 190" style={{ width: "100%", maxWidth: 440, display: "block", margin: "0 auto" }}>
    <rect width="440" height="190" fill="#f8fafc" rx="8" />
    <text x="220" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Conservation of Energy</text>
    <line x1="30" y1="168" x2="410" y2="168" stroke="#374151" strokeWidth="2" />
    {([[80,48,"h","mgh","0","#ef4444"],[220,108,"h/2","½mgh","½mv²","#f59e0b"],[360,158,"0","0","mgh","#10b981"]] as Array<[number,number,string,string,string,string]>).map(([x,y,h,pe,ke,col]) => (
      <g key={x}>
        <circle cx={x} cy={y} r="13" fill={col} fillOpacity="0.2" stroke={col} strokeWidth="2" />
        <line x1={x} y1={y+13} x2={x} y2={168} stroke={col} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x={x} y={y} textAnchor="middle" fontSize="9" fill={col} fontWeight="bold">h={h}</text>
        <text x={x} y={178} textAnchor="middle" fontSize="9" fill="#ef4444">PE={pe}</text>
        <text x={x} y={188} textAnchor="middle" fontSize="9" fill="#10b981">KE={ke}</text>
      </g>
    ))}
  </svg>
);

export const StressStrainDiagram = (
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
    <text x="90" y="120" fontSize="10" fill="#3b82f6">Hooke&apos;s</text><text x="88" y="132" fontSize="10" fill="#3b82f6">Law region</text>
    <text x="280" y="90" fontSize="10" fill="#ef4444">plastic</text><text x="275" y="102" fontSize="10" fill="#ef4444">deformation</text>
  </svg>
);

export const WaveDiagram = (
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
  </svg>
);

export const SuperpositionDiagram = (
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
  </svg>
);

export const CircuitSymbolsDiagram = (
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
  </svg>
);

export const SeriesParallelDiagram = (
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
  </svg>
);

export const AtomModelDiagram = (
  <svg viewBox="0 0 360 200" style={{ width: "100%", maxWidth: 360, display: "block", margin: "0 auto" }}>
    <rect width="360" height="200" fill="#f8fafc" rx="8" />
    <text x="180" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e">Nuclear Atom Model</text>
    <circle cx="180" cy="108" r="12" fill="#ef4444" fillOpacity="0.8" stroke="#dc2626" strokeWidth="1.5" />
    <text x="180" y="112" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">nucleus</text>
    <ellipse cx="180" cy="108" rx="55" ry="30" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4,2" />
    <ellipse cx="180" cy="108" rx="85" ry="50" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4,2" />
    <ellipse cx="180" cy="108" rx="115" ry="68" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4,2" />
    {([[235,78],[265,120],[225,158],[140,60],[95,108],[135,155]] as Array<[number,number]>).map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
    ))}
    <text x="60" y="112" fontSize="10" fill="#6b7280">electron</text><text x="60" y="124" fontSize="10" fill="#6b7280">shells</text>
  </svg>
);

// Map from diagram key to component (used by SubsectionPanel)
export const DIAGRAM_MAP: Record<string, React.ReactElement> = {
  siUnits: SiUnitsDiagram,
  vectorResolution: VectorResolutionDiagram,
  svtGraphs: SvtGraphsDiagram,
  projectile: ProjectileDiagram,
  momentDiagram: MomentDiagram,
  energyConservation: EnergyConservationDiagram,
  stressStrain: StressStrainDiagram,
  waveDiagram: WaveDiagram,
  superposition: SuperpositionDiagram,
  circuitSymbols: CircuitSymbolsDiagram,
  seriesParallel: SeriesParallelDiagram,
  atomModel: AtomModelDiagram,
};
