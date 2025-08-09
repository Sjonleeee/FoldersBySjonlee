import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import bigFolder from "../assets/images/folderBig.png";
import "../styles/FolderCard.css";
import "../styles/OverlayVideoCard.css";
import testImg from "../assets/images/sjonlee1.jpeg";

export default function FolderCard({ fancy, title, subtitle, tags, video, mouseX, mouseY }) {
  const cardRef = useRef();
  const overlayRef = useRef();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  // Overlay dimensions
  const overlayWidth = 220;
  const overlayHeight = 120;
  const overlayRadius = 6;

  // Efficiently get card bounds only when needed
  const getCardBounds = useCallback(() => {
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
  }, []);

  // GSAP hover scale effect
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const handleEnter = () => {
      gsap.to(el, { scale: 0.96, duration: 0.22, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(el, { scale: 1, duration: 0.22, ease: "power2.out" });
    };
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useLayoutEffect(() => {
    const cardBounds = getCardBounds();
    if (!cardBounds || mouseX === null || mouseY === null) {
      setShowOverlay(false);
      return;
    }
    
    // Optimized overlay updates for smooth video performance
    const updateOverlay = () => {
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
      
      if (overlayRef.current && visible) {
        const relX = (mouseX - cardBounds.left) / cardBounds.width;
        const relY = (mouseY - cardBounds.top) / cardBounds.height;
        const maxTilt = 14;
        const tiltX = -(relX - 0.5) * 2 * maxTilt;
        const tiltY = (relY - 0.5) * 2 * maxTilt;
        const x = mouseX - cardBounds.left - overlayWidth / 2;
        const y = mouseY - cardBounds.top - overlayHeight / 2;
        overlayRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) perspective(600px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      }
    };
    
    // Direct execution for smooth video performance
    updateOverlay();
  }, [mouseX, mouseY, getCardBounds]);

  const handleClick = () => {
    gsap.to(cardRef.current, {
      opacity: 0.8,
      duration: 0.5,
      onComplete: () => navigate("/projects"), // Navigate to /projects only
    });
  };

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
      onClick={handleClick}
    >
      <div className="folder-card-content">
        <div className="folder-title-row">
          <span className="folder-fancy hermaiona-title-style">{fancy}</span>
          <span className="folder-title">{title}</span>
          {subtitle && <span className="folder-subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="project-tags">
        {tags && tags.map((tag, i) => (
          <span key={i} className="project-tag-pill">{tag}</span>
        ))}
      </div>
      <div
        ref={overlayRef}
        className="folder-card-overlay"
        style={{
          width: overlayWidth,
          height: overlayHeight,
          borderRadius: overlayRadius,
          opacity: showOverlay ? 1 : 0,
        }}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            preload="auto"
            playsInline
            className="folder-card-overlay-media"
            style={{ borderRadius: overlayRadius }}
          />
        ) : (
          <img
            src={testImg}
            alt="Preview"
            className="folder-card-overlay-media"
            style={{ borderRadius: overlayRadius }}
            loading="lazy"
          />
        )}
        <div className="folder-card-overlay-title">Explore</div>
      </div>
    </div>
  );
}