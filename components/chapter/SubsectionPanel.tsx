"use client";

import { useState } from "react";
import MathText from "@/components/ui/MathText";
import WorkedExample from "@/components/ui/WorkedExample";
import QuestionCard, { type GradeResult } from "@/components/question/QuestionCard";

export interface SubsectionDiagram {
  label: string;
  svg: React.ReactElement;
}

export interface SubsectionQuestion {
  q: string;
  solution: string;
}

export interface SubsectionExample {
  title: string;
  steps: string[];
}

export interface SubsectionData {
  title: string;
  objectives: string[];
  content: string;
  diagrams?: SubsectionDiagram[];
  examples?: SubsectionExample[];
  questions: SubsectionQuestion[];
}

interface SubsectionPanelProps {
  sub: SubsectionData;
  chId: number;
  si: number;
  user: string;
  /**
   * Called when student submits an answer to a practice question.
   * answer — the raw LaTeX string
   * qid    — unique question identifier
   */
  onSubmitQuestion: (answer: string, qid: string) => Promise<GradeResult>;
}

function buildQid(chId: number, si: number, qi: number): string {
  return `ch${chId}_s${si}_q${qi}`;
}

/**
 * Collapsible subsection panel containing learning objectives, diagrams,
 * content text, worked examples, and practice questions.
 */
export default function SubsectionPanel({
  sub,
  chId,
  si,
  onSubmitQuestion,
}: SubsectionPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginBottom: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 11,
        overflow: "hidden",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          textAlign: "left",
          background: open ? "#1a1a2e" : "#f9fafb",
          color: open ? "#fff" : "#1f2937",
          border: "none",
          padding: "13px 18px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {sub.title}
        <span style={{ fontSize: 18, fontWeight: 300 }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div style={{ padding: "20px 22px", background: "#fff" }}>
          {/* Learning objectives */}
          <div
            style={{
              background: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: 8,
              padding: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#0369a1",
                marginBottom: 7,
                fontSize: 11,
                letterSpacing: 0.5,
              }}
            >
              LEARNING OBJECTIVES
            </div>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {sub.objectives.map((o, i) => (
                <li key={i} style={{ marginBottom: 4, fontSize: 13, color: "#1e40af" }}>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Diagrams */}
          {sub.diagrams?.map((d, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              {d.label && (
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    marginBottom: 5,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                  }}
                >
                  {d.label}
                </div>
              )}
              {d.svg}
            </div>
          ))}

          {/* Content text */}
          <div
            style={{
              color: "#374151",
              fontSize: 13,
              lineHeight: 1.75,
              marginBottom: 18,
            }}
          >
            <MathText text={sub.content} />
          </div>

          {/* Worked examples */}
          {sub.examples?.map((ex, i) => (
            <WorkedExample key={i} title={ex.title} steps={ex.steps} />
          ))}

          {/* Practice questions */}
          <div
            style={{
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: 10,
              fontSize: 13,
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: 7,
            }}
          >
            Practice Questions
          </div>
          {sub.questions.map((q, i) => {
            const qid = buildQid(chId, si, i);
            return (
              <QuestionCard
                key={i}
                q={q}
                idx={i}
                qid={qid}
                onSubmit={(answer) => onSubmitQuestion(answer, qid)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
