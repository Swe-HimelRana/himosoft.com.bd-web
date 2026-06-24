"use client";

import Image from "next/image";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f172a 0%, #0f172a 40%, #064e3b 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "42rem",
              borderRadius: "1.5rem",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              padding: "2.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Image src="/logo.svg" alt="HimoSoft" width={44} height={44} />
              <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>HimoSoft</span>
            </div>

            <p
              style={{
                marginTop: "2rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1fd9ca",
              }}
            >
              Application error
            </p>
            <h1 style={{ marginTop: "1rem", fontSize: "2rem", lineHeight: 1.2 }}>
              Something went wrong
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
              A critical error occurred and the page could not be loaded. Please try again or
              return to the homepage.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
              <button
                type="button"
                onClick={reset}
                style={{
                  border: "none",
                  borderRadius: "9999px",
                  padding: "0.875rem 1.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#fff",
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "9999px",
                  padding: "0.875rem 1.75rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                Go to homepage
              </a>
            </div>

            {process.env.NODE_ENV === "development" && error.message ? (
              <pre
                style={{
                  marginTop: "2rem",
                  overflow: "auto",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  fontSize: "0.8125rem",
                  background: "rgba(0,0,0,0.35)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {error.message}
              </pre>
            ) : null}
          </div>
        </main>
      </body>
    </html>
  );
}
