import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cambridge Physics — AS & A Level Revision",
  description: "Interactive AS Level Physics revision platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* KaTeX CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
