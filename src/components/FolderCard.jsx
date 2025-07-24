import React, { useRef, useState } from "react";
import bigFolder from "../assets/images/folderBig.png";
import "../styles/FolderCard.css";

export default function FolderCard({ fancy, title, subtitle, tags, video }) {
  const cardRef = useRef();
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
      className="folder-card"
      style={{
        backgroundImage: `url(${bigFolder})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="folder-card-content">
        <div className="folder-title-row">
          <span className="folder-fancy hermaiona-title-style">{fancy}</span>
          <span className="folder-title">{title}</span>
          {subtitle && <span className="folder-subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="folder-tags">{tags}</div>
      {hover && video && (
        <div
          style={{
            position: "absolute",
            left: mouse.x - 160,
            top: mouse.y - 90,
            width: 320,
            height: 180,
            pointerEvents: "none",
            zIndex: 10,
            borderRadius: 12,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "left 0.08s, top 0.08s",
          }}
        >
          <video
            src={video}
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
              borderRadius: 12,
              background: "#000",
            }}
          />
          <div style={{ padding: "0.5rem 0", fontWeight: 500 }}>Explore</div>
        </div>
      )}
    </div>
  );
} 