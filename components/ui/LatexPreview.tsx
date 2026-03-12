"use client";

import { useRef, useEffect, useState } from "react";

declare global {
  interface Window {
    katex?: {
      render: (latex: string, element: HTMLElement, options?: object) => void;
    };
    renderMathInElement?: (element: HTMLElement, options?: object) => void;
  }
}

interface LatexPreviewProps {
  latex: string;
}

function useMathReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      if (window.katex && window.renderMathInElement) {
        setReady(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const interval = setInterval(() => {
      if (check()) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return ready;
}

/**
 * Renders a single LaTeX expression in KaTeX display mode.
 * Falls back to plain text if rendering fails.
 */
export default function LatexPreview({ latex }: LatexPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useMathReady();

  useEffect(() => {
    if (!ready || !ref.current) return;
    try {
      window.katex?.render(
        latex || "\\text{Your answer will appear here}",
        ref.current,
        { throwOnError: false, displayMode: true }
      );
    } catch {
      if (ref.current) ref.current.textContent = latex;
    }
  }, [latex, ready]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: 36,
        padding: "6px 0",
        color: latex ? "#1a1a2e" : "#aaa",
      }}
    />
  );
}
