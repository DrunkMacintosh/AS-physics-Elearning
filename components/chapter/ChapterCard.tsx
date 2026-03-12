"use client";

export interface ChapterSummary {
  id: number;
  title: string;
  summary: string;
  subsections: Array<{ questions: unknown[] }>;
}

interface ChapterCardProps {
  chapter: ChapterSummary;
  onClick: () => void;
}

/**
 * Card showing chapter number, title, summary snippet, and question count.
 * Matches the hover-shadow style from the reference.
 */
export default function ChapterCard({ chapter, onClick }: ChapterCardProps) {
  const questionCount = chapter.subsections.reduce(
    (a, s) => a + s.questions.length,
    0
  );

  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "18px 20px",
        textAlign: "left",
        cursor: "pointer",
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Chapter number badge */}
        <div
          style={{
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: 7,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {chapter.id}
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              color: "#1a1a2e",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            {chapter.title}
          </div>
          <div
            style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5 }}
          >
            {chapter.summary.slice(0, 85)}…
          </div>
          <div style={{ marginTop: 7, fontSize: 11, color: "#3b82f6" }}>
            {chapter.subsections.length} subsections · {questionCount} questions
          </div>
        </div>
      </div>
    </button>
  );
}
