import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HimoSoft — Software Development & IT Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #050608 0%, #0a100e 50%, #050608 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "linear-gradient(135deg, #26C6DA, #43A047)",
            }}
          />
          <span style={{ fontSize: 48, fontWeight: 700 }}>HimoSoft</span>
        </div>
        <p style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, maxWidth: 900, margin: 0 }}>
          Software Development & IT Solutions
        </p>
        <p style={{ fontSize: 28, color: "rgba(255,255,255,0.82)", marginTop: 24, maxWidth: 820 }}>
          Custom software · Web & mobile · Payments · Deployment · Maintenance
        </p>
        <p style={{ fontSize: 22, color: "#26C6DA", marginTop: 40 }}>himosoft.com.bd</p>
      </div>
    ),
    { ...size },
  );
}
