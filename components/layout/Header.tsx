"use client";

interface HeaderProps {
  user: string;
  isTeacher?: boolean;
  currentView?: string;
  onLogout: () => void;
  onNavigate?: (target: string) => void;
}

/**
 * Sticky top navigation header matching the reference design.
 * Renders differently for teachers (dashboard + materials tabs) vs students.
 */
export default function Header({
  user,
  isTeacher = false,
  currentView,
  onLogout,
  onNavigate,
}: HeaderProps) {
  return (
    <header
      style={{
        background: "#1a1a2e",
        color: "#fff",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            background: "#3b82f6",
            borderRadius: 7,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          φ
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Cambridge Physics</div>
          <div style={{ fontSize: 10, color: "#94a3b8" }}>
            {isTeacher
              ? currentView === "dashboard"
                ? "Teacher Dashboard"
                : "Course Materials"
              : "AS & A Level Revision"}
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>👤 {user}</span>

        {isTeacher ? (
          <>
            <button
              onClick={() => onNavigate?.("dashboard")}
              style={{
                background: currentView === "dashboard" ? "#3b82f6" : "none",
                border: "1px solid #334155",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 11px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => onNavigate?.("materials")}
              style={{
                background: currentView === "materials" ? "#3b82f6" : "none",
                border: "1px solid #334155",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 11px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              📚 Materials
            </button>
          </>
        ) : (
          <button
            onClick={() => onNavigate?.("home")}
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#94a3b8",
              borderRadius: 6,
              padding: "4px 11px",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Chapters
          </button>
        )}

        <button
          onClick={onLogout}
          style={{
            background: "none",
            border: "1px solid #334155",
            color: "#94a3b8",
            borderRadius: 6,
            padding: "4px 11px",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
