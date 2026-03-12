"use client";

import { useEffect, useState } from "react";
import { CHAPTERS } from "@/data/chapters";

type ScoresData = Record<string, Record<string, number>>;

function buildQid(chId: number, si: number, qi: number) {
  return `ch${chId}_s${si}_q${qi}`;
}
function buildSubId(chId: number, si: number) {
  return `ch${chId}_s${si}`;
}

const CS: React.CSSProperties = {
  padding: "7px 10px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: 12,
  textAlign: "center",
};
const HS: React.CSSProperties = {
  ...CS,
  background: "#f8fafc",
  fontWeight: 700,
  color: "#374151",
  fontSize: 11,
};

/**
 * Teacher dashboard score table — cumulative scoresheet plus per-subsection
 * breakdowns and class question analysis.
 * Fetches data from /api/scores.
 */
export default function ScoreTable() {
  const [data, setData] = useState<ScoresData | null>(null);
  const [studentNames, setStudentNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/scores")
      .then((r) => r.json())
      .then((d) => {
        setData(d.scores ?? {});
        setStudentNames(d.students ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        Loading dashboard…
      </div>
    );
  }

  const scores = data ?? {};

  const subGroups: Record<string, { title: string; qids: string[] }> = {};
  CHAPTERS.forEach((ch) =>
    ch.subsections.forEach((sub, si) => {
      const sid = buildSubId(ch.id, si);
      subGroups[sid] = {
        title: sub.title,
        qids: sub.questions.map((_, qi) => buildQid(ch.id, si, qi)),
      };
    })
  );

  const allQids: { qid: string; label: string }[] = [];
  CHAPTERS.forEach((ch) =>
    ch.subsections.forEach((sub, si) =>
      sub.questions.forEach((_, qi) => {
        allQids.push({
          qid: buildQid(ch.id, si, qi),
          label: `Ch${ch.id} ${sub.title.split(" ")[0]} Q${qi + 1}`,
        });
      })
    )
  );

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 20px" }}>
      {studentNames.length === 0 ? (
        <div
          style={{
            background: "#fef9c3",
            border: "1px solid #fde68a",
            borderRadius: 9,
            padding: 18,
            color: "#92400e",
            fontSize: 14,
          }}
        >
          No students have registered yet.
        </div>
      ) : (
        <>
          {/* Cumulative scoresheet */}
          <div style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 16, color: "#1a1a2e", marginBottom: 12 }}>
              📊 Cumulative Scoresheet
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...HS, textAlign: "left", minWidth: 120 }}>Student</th>
                    {Object.values(subGroups).map((g) => (
                      <th key={g.title} style={{ ...HS, minWidth: 80, fontSize: 10 }}>
                        {g.title.length > 18 ? g.title.slice(0, 16) + "…" : g.title}
                      </th>
                    ))}
                    {CHAPTERS.map((ch) => (
                      <th
                        key={`cp${ch.id}`}
                        style={{ ...HS, minWidth: 70, fontSize: 10, background: "#fef9c3" }}
                      >
                        Ch{ch.id} Test
                      </th>
                    ))}
                    <th style={{ ...HS, background: "#1a1a2e", color: "#fff" }}>Total</th>
                    <th style={{ ...HS, background: "#1a1a2e", color: "#fff" }}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {studentNames.map((u) => {
                    const sc = scores[u] ?? {};
                    let grandTotal = 0,
                      grandMax = 0;

                    const subCells = Object.entries(subGroups).map(([sid, g]) => {
                      const subTotal = g.qids.reduce((a, qid) => a + (sc[qid] ?? 0), 0);
                      const subMax =
                        g.qids.filter((qid) => sc[qid] !== undefined).length * 3;
                      const attempted = g.qids.some((qid) => sc[qid] !== undefined);
                      grandTotal += subTotal;
                      grandMax += subMax;
                      const pct = subMax > 0 ? subTotal / subMax : null;
                      const bg = !attempted
                        ? "#f9fafb"
                        : pct! >= 0.67
                        ? "#f0fdf4"
                        : pct! >= 0.34
                        ? "#fefce8"
                        : "#fef2f2";
                      return (
                        <td
                          key={sid}
                          style={{ ...CS, background: bg, color: !attempted ? "#9ca3af" : "#1a1a2e" }}
                        >
                          {attempted ? `${subTotal}/${subMax}` : "—"}
                        </td>
                      );
                    });

                    const cpCells = CHAPTERS.map((ch) => {
                      const cpKey = `ch${ch.id}_checkpoint`;
                      const cpScore = sc[cpKey];
                      const cpMax =
                        ch.checkpoint?.questions.reduce(
                          (a: number, q: { marks?: number; parts?: { marks: number }[] }) =>
                            a + (q.parts ? q.parts.reduce((b: number, p: { marks: number }) => b + p.marks, 0) : (q.marks ?? 0)),
                          0
                        ) ?? 20;
                      if (cpScore !== undefined) {
                        grandTotal += cpScore;
                        grandMax += cpMax;
                      }
                      const pct = cpScore !== undefined ? cpScore / cpMax : null;
                      const bg =
                        cpScore === undefined
                          ? "#f9fafb"
                          : pct! >= 0.67
                          ? "#f0fdf4"
                          : pct! >= 0.34
                          ? "#fefce8"
                          : "#fef2f2";
                      return (
                        <td
                          key={cpKey}
                          style={{
                            ...CS,
                            background: bg,
                            color: cpScore === undefined ? "#9ca3af" : "#1a1a2e",
                            fontWeight: cpScore !== undefined ? 600 : 400,
                          }}
                        >
                          {cpScore !== undefined ? `${cpScore}/${cpMax}` : "—"}
                        </td>
                      );
                    });

                    return (
                      <tr key={u}>
                        <td style={{ ...CS, textAlign: "left", fontWeight: 600, color: "#1a1a2e" }}>
                          {u}
                        </td>
                        {subCells}
                        {cpCells}
                        <td style={{ ...CS, fontWeight: 700, background: "#f0f9ff", color: "#1e40af" }}>
                          {grandTotal}
                        </td>
                        <td style={{ ...CS, fontWeight: 700, background: "#f0f9ff", color: "#1e40af" }}>
                          {grandMax > 0
                            ? Math.round((grandTotal / grandMax) * 100) + "%"
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>
              🟩 ≥67% &nbsp; 🟨 34–66% &nbsp; 🟥 &lt;34% &nbsp; — = not attempted
            </div>
          </div>

          {/* Per-subsection breakdowns */}
          {Object.entries(subGroups).map(([sid, g]) => {
            const attempted = studentNames.some((u) =>
              g.qids.some((qid) => scores[u]?.[qid] !== undefined)
            );
            if (!attempted) return null;
            return (
              <div key={sid} style={{ marginBottom: 26 }}>
                <h2 style={{ fontSize: 15, color: "#1a1a2e", marginBottom: 10 }}>
                  📋 {g.title}
                </h2>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      background: "#fff",
                      borderRadius: 10,
                      overflow: "hidden",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ ...HS, textAlign: "left", minWidth: 110 }}>Student</th>
                        {g.qids.map((_, i) => (
                          <th key={i} style={HS}>Q{i + 1}</th>
                        ))}
                        <th style={{ ...HS, background: "#e0f2fe", color: "#0369a1" }}>Score</th>
                        <th style={{ ...HS, background: "#e0f2fe", color: "#0369a1" }}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentNames.map((u) => {
                        const sc = scores[u] ?? {};
                        const marks = g.qids.map((qid) => sc[qid]);
                        const answered = marks.filter((m) => m !== undefined) as number[];
                        const total = answered.reduce((a, b) => a + b, 0);
                        const max = answered.length * 3;
                        const pct = max > 0 ? total / max : null;
                        const grade =
                          pct === null
                            ? "—"
                            : pct >= 0.8
                            ? "A"
                            : pct >= 0.67
                            ? "B"
                            : pct >= 0.5
                            ? "C"
                            : pct >= 0.34
                            ? "D"
                            : "U";
                        const gc: Record<string, string> = {
                          A: "#16a34a",
                          B: "#3b82f6",
                          C: "#f59e0b",
                          D: "#ef4444",
                          U: "#9ca3af",
                          "—": "#9ca3af",
                        };
                        return (
                          <tr key={u}>
                            <td style={{ ...CS, textAlign: "left", fontWeight: 500 }}>{u}</td>
                            {marks.map((m, i) => {
                              const col =
                                m === undefined
                                  ? "#9ca3af"
                                  : m === 3
                                  ? "#16a34a"
                                  : m === 2
                                  ? "#f59e0b"
                                  : "#dc2626";
                              return (
                                <td key={i} style={{ ...CS, color: col, fontWeight: 600 }}>
                                  {m === undefined ? "—" : m + "/3"}
                                </td>
                              );
                            })}
                            <td style={{ ...CS, fontWeight: 700, background: "#f0f9ff" }}>
                              {max > 0 ? `${total}/${max}` : "—"}
                            </td>
                            <td
                              style={{
                                ...CS,
                                fontWeight: 800,
                                fontSize: 14,
                                color: gc[grade],
                                background: "#f0f9ff",
                              }}
                            >
                              {grade}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* Class question analysis */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, color: "#1a1a2e", marginBottom: 10 }}>
              🔍 Class Question Analysis
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...HS, textAlign: "left", minWidth: 120 }}>Question</th>
                    <th style={HS}>Attempted</th>
                    <th style={{ ...HS, color: "#dc2626" }}>0/3</th>
                    <th style={{ ...HS, color: "#dc2626" }}>1/3</th>
                    <th style={{ ...HS, color: "#d97706" }}>2/3</th>
                    <th style={{ ...HS, color: "#16a34a" }}>3/3</th>
                    <th style={{ ...HS, background: "#1a1a2e", color: "#fff" }}>Avg</th>
                    <th style={{ ...HS, background: "#1a1a2e", color: "#fff" }}>Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {allQids
                    .filter(({ qid }) =>
                      studentNames.some((u) => scores[u]?.[qid] !== undefined)
                    )
                    .map(({ qid, label }) => {
                      const marks = studentNames
                        .map((u) => scores[u]?.[qid])
                        .filter((m) => m !== undefined) as number[];
                      const counts = [0, 1, 2, 3].map(
                        (v) => marks.filter((m) => m === v).length
                      );
                      const avg =
                        marks.length
                          ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1)
                          : "—";
                      const struggling =
                        parseFloat(avg) < 1.5 && marks.length > 0;
                      return (
                        <tr
                          key={qid}
                          style={{ background: struggling ? "#fef2f2" : "#fff" }}
                        >
                          <td style={{ ...CS, textAlign: "left", fontSize: 11 }}>{label}</td>
                          <td style={CS}>{marks.length}</td>
                          {counts.map((c, i) => (
                            <td
                              key={i}
                              style={{
                                ...CS,
                                fontWeight: c > 0 ? 700 : 400,
                                color: c > 0
                                  ? (["#dc2626", "#dc2626", "#d97706", "#16a34a"] as const)[i]
                                  : "#d1d5db",
                              }}
                            >
                              {c}
                            </td>
                          ))}
                          <td style={{ ...CS, fontWeight: 700, background: "#f8fafc" }}>{avg}</td>
                          <td style={{ ...CS, fontSize: 14 }}>{struggling ? "⚠️" : ""}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>
              ⚠️ = class average below 1.5/3
            </div>
          </div>
        </>
      )}
    </div>
  );
}
