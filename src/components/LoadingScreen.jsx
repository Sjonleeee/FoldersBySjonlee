import React, { useEffect, useState } from "react";

export default function LoadingScreen({ progress }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    setTimeout(() => setFadeIn(true), 50); // slight delay for smoothness
  }, []);

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 1400ms",
        opacity: fadeIn ? 1 : 0
      }}
    >
      <div 
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "6rem",
          height: "6rem",
          marginBottom: "2rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <img
          src="/assets/images/sjonlee.JPG"
          alt="Loading"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
      <div 
        style={{
          width: "16rem",
          height: "0.5rem",
          backgroundColor: "#1f2937",
          borderRadius: "9999px",
          overflow: "hidden",
          marginTop: "2rem"
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "9999px",
            transition: "all 300ms ease-out",
            width: `${progress}%`,
            background: `
              linear-gradient(
                90deg,
                #e0e0e0 0%,
                #b0b0b0 20%,
                #f5f5f5 40%,
                #a0a0a0 60%,
                #e0e0e0 80%,
                #ffffff 100%
              )
            `,
            boxShadow: "0 0 12px 2px rgba(176, 176, 176, 0.53), 0 1px 8px 0 rgba(255, 255, 255, 0.53)"
          }}
        />
      </div>
      <div style={{ marginTop: "1rem", color: "white", fontFamily: "monospace" }}>
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
