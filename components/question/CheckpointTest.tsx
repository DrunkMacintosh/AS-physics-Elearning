"use client";

import { useState } from "react";
import MathText from "@/components/ui/MathText";
import LatexPreview from "@/components/ui/LatexPreview";

export interface CheckpointPart {
  q: string;
  marks: number;
  solution: string;
}

export interface CheckpointQuestion {
  id: string;
  stem: string;
  marks?: number;
  solution?: string;
  parts?: CheckpointPart[];
}

export interface CheckpointTestData {
  questions: CheckpointQuestion[];
}

export interface PartResult {
  mark: number;
  maxMark: number;
  feedback: string;
}

export interface CheckpointTestProps {
  test: CheckpointTestData;
  chId: number;
  user: string;
  /**
   * Called on submit. Receives all answer values keyed by answer-key.
   * Returns results keyed by the same keys.
   */
  onSubmit: (
    answers: Record<string, string>
  ) => Promise<{ results: Record<string, PartResult> }>;
}

const GRADE_COLOUR: Record<string, string> = {
  A: "#16a34a",
  B: "#3b82f6",
  C: "#f59e0b",
  D: "#ef4444",
  U: "#9ca3af",
};

function gradeFromPercent(pct: number): string {
  if (pct >= 0.8) return "A";
  if (pct >= 0.67) return "B";
  if (pct >= 0.5) return "C";
  if (pct >= 0.34) return "D";
  return "U";
}

const TA_STYLE: React.CSSProperties = {
  width: "100%",
  minHeight: 56,
  fontFamily: "monospace",
  fontSize: 12,
  padding: 8,
  border: "1px solid #d1d5db",
  borderRadius: 6,
  resize: "vertical",
  boxSizing: "border-box",
  outline: "none",
};

/**
 * Full chapter checkpoint test component.
 * All grading is delegated to the onSubmit prop — no direct API calls here.
 */
export default function CheckpointTest({
  test,
  chId,
  onSubmit,
}: CheckpointTestProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, PartResult>>({});
  const [loading, setLoading] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [totalMark, setTotalMark] = useState<number | null>(null);

  const maxTotal = test.questions.reduce(
    (a, q) =>
      a + (q.parts ? q.parts.reduce((b, p) => b + p.marks, 0) : (q.marks ?? 0)),
    0
  );

  function allAnswered(): boolean {
    return test.questions.every((q) =>
      q.parts
        ? q.parts.every((_, pi) => answers[`${q.id}-${pi}`]?.trim())
        : answers[q.id]?.trim()
    );
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const { results: newResults } = await onSubmit(answers);
      setResults(newResults);
      const total = Object.values(newResults).reduce((a, r) => a + r.mark, 0);
      setTotalMark(total);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setLoading(false);
  }

  const grade =
    totalMark === null ? null : gradeFromPercent(totalMark / maxTotal);
  const gradeCol = grade ? GRADE_COLOUR[grade] : "#374151";

  return (
    <div
      style={{
        marginTop: 28,
        border: "2px solid #1a1a2e",
        borderRadius: 13,
        overflow: "hidden",
      }}
    >
      {/* Toggle header */}
      <button
        onClick={() => setShowTest((o) => !o)}
        style={{
          width: "100%",
          background: "#1a1a2e",
          color: "#fff",
          border: "none",
          padding: "16px 22px",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          📝 Chapter Checkpoint Test — {maxTotal} marks
          {submitted && grade && (
            <span
              style={{
                marginLeft: 12,
                background: gradeCol,
                color: "#fff",
                borderRadius: 6,
                padding: "2px 10px",
                fontSize: 13,
              }}
            >
              {totalMark}/{maxTotal} — Grade {grade}
            </span>
          )}
        </span>
        <span style={{ fontWeight: 300, fontSize: 20 }}>{showTest ? "−" : "+"}</span>
      </button>

      {showTest && (
        <div style={{ background: "#fff", padding: "24px 26px" }}>
          {/* Exam header */}
          <div
            style={{
              border: "2px solid #1a1a2e",
              borderRadius: 9,
              padding: "14px 18px",
              marginBottom: 22,
              background: "#f8fafc",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>
              Cambridge International AS Level Physics 9702
            </div>
            <div style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}>
              Chapter {chId} Checkpoint Test &nbsp;|&nbsp; Total: {maxTotal} marks &nbsp;|&nbsp;
              Suggested time: 25 minutes
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Show all working. Give answers to appropriate significant figures.
              Include units where required.
            </div>
          </div>

          {/* Questions */}
          {test.questions.map((q, qi) => (
            <div
              key={q.id}
              style={{
                marginBottom: 26,
                paddingBottom: 20,
                borderBottom:
                  qi < test.questions.length - 1
                    ? "1px solid #f1f5f9"
                    : "none",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#1a1a2e",
                  marginBottom: 10,
                }}
              >
                {qi + 1}.&nbsp;
                <MathText text={q.stem} />
                {!q.parts && (
                  <span
                    style={{
                      fontWeight: 400,
                      color: "#6b7280",
                      fontSize: 12,
                      marginLeft: 8,
                    }}
                  >
                    [{q.marks} {q.marks === 1 ? "mark" : "marks"}]
                  </span>
                )}
              </div>

              {q.parts ? (
                q.parts.map((part, pi) => {
                  const pKey = `${q.id}-${pi}`;
                  const res = results[pKey];
                  const mc = res
                    ? res.mark === res.maxMark
                      ? "#16a34a"
                      : res.mark > 0
                      ? "#d97706"
                      : "#dc2626"
                    : "#374151";
                  return (
                    <div key={pi} style={{ marginLeft: 20, marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#374151",
                          marginBottom: 6,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <span>
                          ({String.fromCharCode(97 + pi)})&nbsp;
                          <MathText text={part.q} />
                        </span>
                        <span
                          style={{
                            color: "#6b7280",
                            fontSize: 12,
                            whiteSpace: "nowrap",
                          }}
                        >
                          [{part.marks} {part.marks === 1 ? "mark" : "marks"}]
                        </span>
                      </div>
                      <textarea
                        value={answers[pKey] ?? ""}
                        onChange={(e) =>
                          setAnswers((a) => ({ ...a, [pKey]: e.target.value }))
                        }
                        disabled={submitted}
                        placeholder={`Answer part (${String.fromCharCode(97 + pi)})…`}
                        style={TA_STYLE}
                      />
                      {(answers[pKey]?.length ?? 0) > 0 && !submitted && (
                        <div
                          style={{
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: 6,
                            padding: "3px 10px",
                            marginTop: 4,
                          }}
                        >
                          <div style={{ fontSize: 10, color: "#9ca3af" }}>Preview</div>
                          <LatexPreview latex={answers[pKey]} />
                        </div>
                      )}
                      {submitted && res && (
                        <div
                          style={{
                            background: "#f0fdf4",
                            border: "1px solid #bbf7d0",
                            borderRadius: 7,
                            padding: "8px 12px",
                            marginTop: 6,
                          }}
                        >
                          <span style={{ fontWeight: 700, color: mc, fontSize: 13 }}>
                            {res.mark}/{res.maxMark} —{" "}
                          </span>
                          <span style={{ fontSize: 12, color: "#374151" }}>{res.feedback}</span>
                        </div>
                      )}
                      {submitted && (
                        <div
                          style={{
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: 7,
                            padding: "8px 12px",
                            marginTop: 4,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: "#3b82f6",
                              marginBottom: 3,
                            }}
                          >
                            MARK SCHEME
                          </div>
                          <div style={{ fontSize: 12, color: "#1e3a5f" }}>
                            <MathText text={part.solution} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div style={{ marginLeft: 20 }}>
                  <textarea
                    value={answers[q.id] ?? ""}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                    }
                    disabled={submitted}
                    placeholder="Write your answer here…"
                    style={TA_STYLE}
                  />
                  {(answers[q.id]?.length ?? 0) > 0 && !submitted && (
                    <div
                      style={{
                        background: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: 6,
                        padding: "3px 10px",
                        marginTop: 4,
                      }}
                    >
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>Preview</div>
                      <LatexPreview latex={answers[q.id]} />
                    </div>
                  )}
                  {submitted && results[q.id] && (
                    <div
                      style={{
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: 7,
                        padding: "8px 12px",
                        marginTop: 6,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color:
                            results[q.id].mark === results[q.id].maxMark
                              ? "#16a34a"
                              : results[q.id].mark > 0
                              ? "#d97706"
                              : "#dc2626",
                          fontSize: 13,
                        }}
                      >
                        {results[q.id].mark}/{results[q.id].maxMark} —{" "}
                      </span>
                      <span style={{ fontSize: 12, color: "#374151" }}>
                        {results[q.id].feedback}
                      </span>
                    </div>
                  )}
                  {submitted && q.solution && (
                    <div
                      style={{
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        borderRadius: 7,
                        padding: "8px 12px",
                        marginTop: 4,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#3b82f6",
                          marginBottom: 3,
                        }}
                      >
                        MARK SCHEME
                      </div>
                      <div style={{ fontSize: 12, color: "#1e3a5f" }}>
                        <MathText text={q.solution} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Footer */}
          {!submitted ? (
            <div
              style={{
                borderTop: "2px solid #e5e7eb",
                paddingTop: 18,
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleSubmit}
                disabled={loading || !allAnswered()}
                style={{
                  background: loading || !allAnswered() ? "#9ca3af" : "#1a1a2e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: loading || !allAnswered() ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Grading all answers…" : "Submit Test"}
              </button>
              {!allAnswered() && !loading && (
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  Answer all questions before submitting.
                </span>
              )}
              {loading && (
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  This may take a moment…
                </span>
              )}
            </div>
          ) : (
            <div
              style={{
                borderTop: "2px solid #e5e7eb",
                paddingTop: 18,
                background: "#f8fafc",
                borderRadius: 9,
                padding: 18,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: 4,
                }}
              >
                Final Score:&nbsp;
                <span style={{ color: gradeCol }}>
                  {totalMark}/{maxTotal}
                </span>
                {grade && (
                  <span
                    style={{
                      marginLeft: 14,
                      background: gradeCol,
                      color: "#fff",
                      borderRadius: 7,
                      padding: "2px 14px",
                      fontSize: 15,
                    }}
                  >
                    Grade {grade}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {grade === "A"
                  ? "Excellent — well prepared for this topic."
                  : grade === "B"
                  ? "Good — review any lost marks carefully."
                  : grade === "C"
                  ? "Satisfactory — revisit the subsections before the exam."
                  : "Needs further revision — work through the subsections again."}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
