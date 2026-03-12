"use client";

import { useRef, useEffect, useState } from "react";

// Extend window to include KaTeX globals loaded via CDN
declare global {
  interface Window {
    katex?: {
      render: (latex: string, element: HTMLElement, options?: object) => void;
    };
    renderMathInElement?: (element: HTMLElement, options?: object) => void;
  }
}

interface MathTextProps {
  text: string;
}

function useMathReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If KaTeX is already loaded (e.g. from CDN defer scripts)
    const check = () => {
      if (window.katex && window.renderMathInElement) {
        setReady(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    // Poll until loaded (CDN scripts are deferred)
    const interval = setInterval(() => {
      if (check()) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return ready;
}

/**
 * Renders text that may contain inline LaTeX ($...$) and display LaTeX ($$...$$),
 * as well as **bold** markdown, exactly matching the reference UI.
 */
export default function MathText({ text }: MathTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const ready = useMathReady();

  useEffect(() => {
    if (!ready || !ref.current) return;
    ref.current.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
    window.renderMathInElement?.(ref.current, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }, [text, ready]);

  return <span ref={ref}>{text}</span>;
}
