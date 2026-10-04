import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const runtime = "edge";
export const alt = "Rushikesh Powar - GenAI Engineer and Creative Technologist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 15%, #293154 0, transparent 34%), linear-gradient(135deg, #05060b 0%, #090b13 54%, #151827 100%)",
          color: "#f5f7ff",
          padding: "76px 84px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "rgba(245,247,255,0.72)",
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "999px",
              background: "#f5f7ff",
            }}
          />
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              lineHeight: 0.9,
              letterSpacing: -5,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 38,
              color: "rgba(245,247,255,0.78)",
              letterSpacing: 0,
            }}
          >
            GenAI Engineer · Creative Technologist
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(245,247,255,0.58)",
            fontSize: 22,
          }}
        >
          <span>AI-native products · Agentic systems · Fullstack engineering</span>
          <span>rushikeshpowarportfolio.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
