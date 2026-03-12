"use client";

import { useState } from "react";
import MathText from "@/components/ui/MathText";
import LatexPreview from "@/components/ui/LatexPreview";

export interface QuestionData {
  q: string;
  solution: string;
}

export interface GradeResult {
  mark: number;
  maxMark: number;
  feedback: string;
}

export interface QuestionCardProps {
  q: QuestionData;
  idx: number;
  qid: string;
  /** Called when student submits an answer. Returns mark, maxMark, and feedback. */
  onSubmit: (answer: string) => Promise<GradeResult>;
  /** Pre-filled data from a previous attempt */
  initialData?: { ans: string; feedback: string; mark: number };
}

const MARK_COLOUR: Record<number, string> = {
  0: "#dc2626",
  1: "#dc2626",
  2: "#d97706",
  3: "#16a34a",
};

/**
 * Individual practice question card with LaTeX input, live preview,
 * AI grading, feedback, and model solution toggle.
 * All API calls are delegated to the onSubmit prop.
 */
export default function QuestionCard({
  q,
  idx,
  qid: _qid,
  onSubmit,
  initialData,
}: QuestionCardProps) {
  const [ans, setAns] = useState(initialData?.ans ?? "");
  const [submitted, setSubmitted] = useState(!!initialData);
  const [feedback, setFeedback] = useState(initialData?.feedback ?? "");
  const [mark, setMark] = useState<number>(initialData?.mark ?? 0);
  const [maxMark, setMaxMark] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [showSol, setShowSol] = useState(false);

  async function grade() {
    if (!ans.trim()) return;
    setLoading(true);
    try {
      const result = await onSubmit(ans);
      setMark(result.mark);
      setMaxMark(result.maxMark);
      setFeedback(result.feedback);
      setSubmitted(true);
    } catch {
      setFeedback("Error connecting to grading service.");
      setSubmitted(true);
    }
    setLoading(false);
  }

  const markCol = MARK_COLOUR[Math.min(mark, 3)] ?? "#374151";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 9,
        padding: 16,
        marginBottom: 12,
      }}
    >
      {/* Question header */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <span
          style={{
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: 5,
            padding: "2px 9px",
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          Q{idx + 1}
        </span>
        <span style={{ fontSize: 13, color: "#1f2937" }}>
          <MathText text={q.q} />
        </span>
        {submitted && (
          <span
            style={{
              marginLeft: "auto",
              fontWeight: 700,
              fontSize: 12,
              color: markCol,
              whiteSpace: "nowrap",
            }}
          >
            {mark}/{maxMark}
          </span>
        )}
      </div>

      {/* Answer textarea */}
      <textarea
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        disabled={submitted}
        placeholder="Type your answer (LaTeX supported)"
        style={{
          width: "100%",
          minHeight: 58,
          fontFamily: "monospace",
          fontSize: 12,
          padding: 8,
          border: "1px solid #d1d5db",
          borderRadius: 6,
          resize: "vertical",
          boxSizing: "border-box",
          outline: "none",
        }}
      />

      {/* Live LaTeX preview */}
      {ans.length > 0 && !submitted && (
        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            padding: "3px 10px",
            marginTop: 5,
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>Preview</div>
          <LatexPreview latex={ans} />
        </div>
      )}

      {/* Submit / feedback */}
      {!submitted ? (
        <button
          onClick={grade}
          disabled={loading || !ans.trim()}
          style={{
            background: loading || !ans.trim() ? "#9ca3af" : "#1a1a2e",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "7px 16px",
            fontSize: 12,
            cursor: loading || !ans.trim() ? "not-allowed" : "pointer",
            fontWeight: 500,
            marginTop: 4,
          }}
        >
          {loading ? "Grading…" : "Submit Answer"}
        </button>
      ) : (
        <div>
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 7,
              padding: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, color: markCol, marginBottom: 4 }}>
              Mark: {mark}/{maxMark}
            </div>
            <div style={{ fontSize: 12, color: "#374151" }}>{feedback}</div>
          </div>
          <button
            onClick={() => setShowSol((s) => !s)}
            style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
              borderRadius: 6,
              padding: "5px 12px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {showSol ? "Hide" : "Show"} Model Solution
          </button>
          {showSol && (
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 7,
                padding: 10,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#3b82f6",
                  marginBottom: 5,
                }}
              >
                MODEL SOLUTION
              </div>
              <div style={{ fontSize: 12, color: "#1e3a5f" }}>
                <MathText text={q.solution} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
