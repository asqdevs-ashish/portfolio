import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

let fontCache: {
  inter: ArrayBuffer | null;
  serif: ArrayBuffer | null;
} | null = null;

// The two brand fonts are bundled locally (src/lib/og-fonts), so OG image
// generation never depends on a network call during build.
function loadLocalFont(file: string): ArrayBuffer | null {
  try {
    const buf = readFileSync(path.join(process.cwd(), "src/lib/og-fonts", file));
    return buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength,
    ) as ArrayBuffer;
  } catch {
    return null;
  }
}

async function getFonts() {
  if (fontCache) return fontCache;

  fontCache = {
    inter: loadLocalFont("inter-600.ttf"),
    serif: loadLocalFont("instrument-serif-italic.ttf"),
  };
  return fontCache;
}

type OgProps = {
  /** Small gold eyebrow line, e.g. "Ashish Pathak". */
  eyebrow: string;
  /** Big headline. Wrap an accent phrase in <span style={serifAccent}> for the serif italic gold treatment. */
  children: ReactNode;
  /** Left footer line (subtitle / category). */
  footerLeft: string;
};

const serifAccent = {
  fontFamily: "Instrument Serif",
  fontStyle: "italic",
  color: "#c9a96e",
  fontWeight: 400,
} as const;

export { serifAccent };

export async function renderOg({ eyebrow, children, footerLeft }: OgProps) {
  const { inter, serif } = await getFonts();

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600;
    style: "normal" | "italic";
  }[] = [];
  if (inter) {
    fonts.push({ name: "Inter", data: inter, weight: 600, style: "normal" });
  }
  if (serif) {
    fonts.push({
      name: "Instrument Serif",
      data: serif,
      weight: 400,
      style: "italic",
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        {/* Corner marks, matching the site's hero framing */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 44,
            width: 68,
            height: 68,
            borderTop: "2px solid #c9a96e",
            borderLeft: "2px solid #c9a96e",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 44,
            width: 68,
            height: 68,
            borderBottom: "1px solid #33332f",
            borderRight: "1px solid #33332f",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#c9a96e",
              }}
            />
            <span
              style={{
                fontSize: 20,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a96e",
              }}
            >
              {eyebrow}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 62,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#e8e6e3",
              maxWidth: 980,
            }}
          >
            {children}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 26, color: "#8f8d86", maxWidth: 700 }}>
            {footerLeft}
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.08em",
              color: "#8f8d86",
            }}
          >
            ashish-pathak.online
          </div>
        </div>
      </div>
    ),
    { width: OG_SIZE.width, height: OG_SIZE.height, fonts },
  );
}