import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#12314f",
          color: "#f8f4ec",
          display: "flex",
          fontFamily: "serif",
          fontSize: 34,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#bd573f",
            borderRadius: 999,
            height: 9,
            position: "absolute",
            right: 11,
            top: 11,
            width: 9,
          }}
        />
        G
      </div>
    ),
    size,
  );
}
