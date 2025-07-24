import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import bigFolder from "../assets/images/folderBig.png";
import "../styles/FolderCard.css";
import testImg from "../assets/images/sjonlee1.jpeg";

export default function FolderCard({ fancy, title, subtitle, tags, video, mouseX, mouseY }) {
  const cardRef = useRef();
  const overlayRef = useRef();
  const [showOverlay, setShowOverlay] = useState(false);

  // Overlay dimensions
  const overlayWidth = 220;
  const overlayHeight = 120;
  const overlayRadius = 6;

  // Memoize card bounds for performance
  const cardBounds = useMemo(() => {
    if (!cardRef.current) return null;
    const rect = cardRef.current.getBoundingClientRect();
    const sectionRect = cardRef.current.parentElement.parentElement.getBoundingClientRect();
    return {
      left: rect.left - sectionRect.left,
      right: rect.left - sectionRect.left + rect.width,
      top: rect.top - sectionRect.top,
      bottom: rect.top - sectionRect.top + rect.height,
      width: rect.width,
      height: rect.height,
    };
  }, [cardRef.current]);

  // Use refs to store last mouse position for rAF
  const lastPos = useRef({ x: 0, y: 0 });

  // Only update overlay visibility and position via layout effect
  useLayoutEffect(() => {
    if (!cardBounds || mouseX === null || mouseY === null) {
      setShowOverlay(false);
      return;
    }
    const overlayLeft = mouseX - overlayWidth / 2;
    const overlayRight = mouseX + overlayWidth / 2;
    const overlayTop = mouseY - overlayHeight / 2;
    const overlayBottom = mouseY + overlayHeight / 2;
    const visible =
      overlayRight > cardBounds.left &&
      overlayLeft < cardBounds.right &&
      overlayBottom > cardBounds.top &&
      overlayTop < cardBounds.bottom;
    setShowOverlay(visible);
    if (overlayRef.current) {
      // Calculate tilt based on mouse position within the card
      const relX = (mouseX - cardBounds.left) / cardBounds.width; // 0 (left) to 1 (right)
      const relY = (mouseY - cardBounds.top) / cardBounds.height; // 0 (top) to 1 (bottom)
      // Centered: 0.5, 0.5
      const maxTilt = 14; // degrees, adjust for more/less tilt
      // Invert the tilt so the overlay tilts towards the mouse direction
      const tiltX = -(relX - 0.5) * 2 * maxTilt; // right = positive, so negative for right tilt
      const tiltY = (relY - 0.5) * 2 * maxTilt; // down = positive, so positive for downward tilt
      lastPos.current.x = mouseX - cardBounds.left - overlayWidth / 2;
      lastPos.current.y = mouseY - cardBounds.top - overlayHeight / 2;
      window.requestAnimationFrame(() => {
        overlayRef.current.style.transform = `translate3d(${lastPos.current.x}px, ${lastPos.current.y}px, 0) perspective(600px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      });
    }
  }, [mouseX, mouseY, cardBounds]);

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
    >
      <div className="folder-card-content">
        <div className="folder-title-row">
          <span className="folder-fancy hermaiona-title-style">{fancy}</span>
          <span className="folder-title">{title}</span>
          {subtitle && <span className="folder-subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="folder-tags">{tags}</div>
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: overlayWidth,
          height: overlayHeight,
          pointerEvents: "none",
          zIndex: 10,
          borderRadius: overlayRadius,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: showOverlay ? 1 : 0,
          transition: "opacity 0.18s, box-shadow 0.18s",
          willChange: "transform, opacity",
        }}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: overlayRadius,
              background: "#000",
            }}
          />
        ) : (
          <img
            src={testImg}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: overlayRadius,
              background: "#000",
            }}
          />
        )}
      </div>
    </div>
  );
} 