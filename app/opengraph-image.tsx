import { ImageResponse } from "next/og";

export const size = {
  width: 800,
  height: 1200,
};

export const contentType = "image/png";

export default function Image() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <img
        src={`${baseUrl}/assets/img/HDVWn.jpg`}
        alt="Preview"
        width="1200"
        height="630"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>,
    size,
  );
}
