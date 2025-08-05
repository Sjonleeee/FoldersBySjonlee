import React, { useRef } from "react";
import ModelCanvas from "../ModelCanvas";

export default function HeroSection({
  creativeRef,
  developerRef,
  modelRef,
  topLeftRef,
  topCenterRef,
  topRightRef,
  bottomLeftRef,
  bottomRightRef,
  midRightRef,
  bottomCenterRef,
}) {
  return (
    <div className="hero-section">
      <div className="hero-background">
        <div className="hero-content">
          <div className="role-labels">
            <span className="role-label top-left" ref={topLeftRef}>
              3D Designer
            </span>
            <span className="role-label top-center" ref={topCenterRef}>
              Entrepreneur
            </span>
            <span className="role-label top-right" ref={topRightRef}>
              Designer
            </span>
            <span className="role-label bottom-left" ref={bottomLeftRef}>
              Teamplayer
            </span>
            <span className="role-label bottom-right" ref={bottomRightRef}>
              Thinker
            </span>
            <span className="role-label mid-right" ref={midRightRef}>
              Director
            </span>
            <span className="role-label bottom-center" ref={bottomCenterRef}>
              Hussler
            </span>

            <div className="absolute-center title-container">
              <div className="title-center-flex">
                <div className="pointer-none left-title" ref={creativeRef}>
                  <span className="title-text">Creative</span>
                </div>
                <div className="pointer-none right-title" ref={developerRef}>
                  <span className="title-text">Developer</span>
                </div>
              </div>
            </div>
          </div>
          <ModelCanvas ref={modelRef} />
        </div>
      </div>
    </div>
  );
} 