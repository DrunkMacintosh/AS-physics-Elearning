"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import ScoreTable from "@/components/teacher/ScoreTable";
import ChapterCard from "@/components/chapter/ChapterCard";
import SubsectionPanel from "@/components/chapter/SubsectionPanel";
import CheckpointTest from "@/components/question/CheckpointTest";
import { CHAPTERS } from "@/data/chapters";

export default function TeacherDashboardPage() {
  const [view, setView] = useState<"dashboard" | "materials">("dashboard");
  const [chPage, setChPage] = useState<"home" | number>("home");

  const ch = typeof chPage === "number" ? CHAPTERS.find((c) => c.id === chPage) : null;

  async function handleQuestionSubmit(answer: string, qid: string) {
    const res = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer, qid }),
    });
    return res.json();
  }

  async function handleCheckpointSubmit(answers: Record<string, string>, chId: number) {
    const res = await fetch("/api/checkpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, chId }),
    });
    return res.json();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Header
        user="Robin"
        isTeacher={true}
        currentView={view}
        onLogout={() => { window.location.href = "/login"; }}
        onNavigate={(v) => { setView(v as "dashboard" | "materials"); setChPage("home"); }}
      />
      {view === "dashboard" ? (
        <>
          <div style={{ background: "#1a1a2e", color: "#fff", padding: "20px 26px", maxWidth: 980, margin: "0 auto", borderRadius: "0 0 12px 12px" }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 22 }}>Class Progress Overview</h1>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>All student results and scores</div>
          </div>
          <ScoreTable />
        </>
      ) : (
        <>
          {chPage === "home" ? (
            <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px" }}>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, color: "#1a1a2e", margin: "0 0 8px" }}>AS Level Physics — Materials</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
                {CHAPTERS.map((c) => (
                  <ChapterCard key={c.id} chapter={c} onClick={() => setChPage(c.id)} />
                ))}
              </div>
            </div>
          ) : ch ? (
            <div style={{ maxWidth: 820, margin: "0 auto", padding: "26px 20px" }}>
              <button
                onClick={() => setChPage("home")}
                style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: 13, marginBottom: 14 }}
              >
                ← All Chapters
              </button>
              <div style={{ background: "#1a1a2e", color: "#fff", borderRadius: 12, padding: "22px 26px", marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>Chapter {ch.id}</div>
                <h1 style={{ margin: "0 0 7px", fontSize: 21 }}>{ch.title}</h1>
                <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6, fontSize: 13 }}>{ch.summary}</p>
              </div>
              {ch.subsections.map((sub, i) => (
                <SubsectionPanel
                  key={i}
                  sub={sub}
                  chId={ch.id}
                  si={i}
                  user="Robin"
                  onSubmitQuestion={(answer, qid) => handleQuestionSubmit(answer, qid)}
                />
              ))}
              {ch.checkpoint && (
                <CheckpointTest
                  test={ch.checkpoint}
                  chId={ch.id}
                  user="Robin"
                  onSubmit={(answers) => handleCheckpointSubmit(answers, ch.id)}
                />
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
