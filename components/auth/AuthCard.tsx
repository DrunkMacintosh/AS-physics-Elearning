"use client";

import { useState } from "react";

interface AuthCardProps {
  onLogin: (username: string, isTeacher: boolean) => void;
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 7,
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
  marginBottom: 10,
};

const PW_WRAPPER_STYLE: React.CSSProperties = {
  position: "relative",
  marginBottom: 10,
};

const PW_INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 40px 10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 7,
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
};

const EYE_BTN_STYLE: React.CSSProperties = {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#6b7280",
  fontSize: 16,
  padding: 0,
};

const SUBMIT_BTN_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "11px",
  background: "#1a1a2e",
  color: "#fff",
  border: "none",
  borderRadius: 7,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 4,
};

/**
 * Login / sign-up card matching the reference auth screen.
 * Authentication logic is delegated to the onLogin callback.
 */
export default function AuthCard({ onLogin }: AuthCardProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect username or password.");
      } else {
        onLogin(data.username, data.isTeacher);
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  async function handleSignup() {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Signup failed.");
      } else {
        onLogin(data.username, false);
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          padding: "36px 32px",
          width: "100%",
          maxWidth: 380,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              background: "#1a1a2e",
              color: "#fff",
              borderRadius: 10,
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              margin: "0 auto 12px",
            }}
          >
            φ
          </div>
          <h1 style={{ fontSize: 20, color: "#1a1a2e", margin: "0 0 4px" }}>
            Cambridge Physics
          </h1>
          <div style={{ fontSize: 13, color: "#6b7280" }}>AS &amp; A Level Revision</div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              style={{
                flex: 1,
                padding: "7px 4px",
                background: mode === m ? "#1a1a2e" : "#f3f4f6",
                color: mode === m ? "#fff" : "#374151",
                border: "none",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 7,
              padding: "9px 12px",
              color: "#dc2626",
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        {/* Login form */}
        {mode === "login" && (
          <>
            <input
              style={INPUT_STYLE}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div style={PW_WRAPPER_STYLE}>
              <input
                style={PW_INPUT_STYLE}
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button style={EYE_BTN_STYLE} onClick={() => setShowPw((s) => !s)}>
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
            <button style={SUBMIT_BTN_STYLE} onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in…" : "Log In"}
            </button>
          </>
        )}

        {/* Signup form */}
        {mode === "signup" && (
          <>
            <input
              style={INPUT_STYLE}
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div style={PW_WRAPPER_STYLE}>
              <input
                style={PW_INPUT_STYLE}
                type={showPw ? "text" : "password"}
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button style={EYE_BTN_STYLE} onClick={() => setShowPw((s) => !s)}>
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
            <div style={PW_WRAPPER_STYLE}>
              <input
                style={PW_INPUT_STYLE}
                type={showPw ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              />
              <button style={EYE_BTN_STYLE} onClick={() => setShowPw((s) => !s)}>
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
            <button style={SUBMIT_BTN_STYLE} onClick={handleSignup} disabled={loading}>
              {loading ? "Creating…" : "Create Account"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
