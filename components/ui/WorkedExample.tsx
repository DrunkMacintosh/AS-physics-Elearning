"use client";

import MathText from "./MathText";

interface WorkedExampleProps {
  title: string;
  steps: string[];
}

/**
 * Displays a worked example with numbered steps, matching the reference yellow-themed card.
 */
export default function WorkedExample({ title, steps }: WorkedExampleProps) {
  return (
    <div
      style={{
        background: "#fefce8",
        border: "1px solid #fde68a",
        borderRadius: 9,
        padding: 14,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: "#92400e",
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            background: "#f59e0b",
            color: "#fff",
            borderRadius: 4,
            padding: "1px 7px",
            fontSize: 11,
            marginRight: 8,
          }}
        >
          WORKED EXAMPLE
        </span>
        {title}
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <span
            style={{
              background: "#f59e0b",
              color: "#fff",
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            {i + 1}
          </span>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>
            <MathText text={s} />
          </div>
        </div>
      ))}
    </div>
  );
}
