import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_PATH = "/og-image.png";

let cachedBackground: string | null = null;

async function loadBackgroundDataUrl(): Promise<string> {
  if (cachedBackground) return cachedBackground;
  const file = await readFile(path.join(process.cwd(), "public/og-image.png"));
  cachedBackground = `data:image/png;base64,${file.toString("base64")}`;
  return cachedBackground;
}

export async function createBrandedOgImage(title: string, subtitle?: string) {
  const background = await loadBackgroundDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background:
              "linear-gradient(180deg, rgba(5,6,8,0.05) 0%, rgba(5,6,8,0.55) 55%, rgba(5,6,8,0.94) 100%)",
            padding: "48px 64px",
          }}
        >
          <p
            style={{
              fontSize: title.length > 42 ? 40 : 48,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: 980,
            }}
          >
            {title}
          </p>
          {subtitle ? (
            <p
              style={{
                fontSize: 24,
                color: "#1FD9CA",
                marginTop: 16,
                marginBottom: 0,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}

export async function createStaticOgImage() {
  const background = await loadBackgroundDataUrl();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background}
          alt=""
          width={1200}
          height={630}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
