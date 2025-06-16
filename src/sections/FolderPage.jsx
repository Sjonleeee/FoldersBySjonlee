import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FolderDisplay from "../components/FolderDisplay";
import ModelCanvas from "../components/ModelCanvas";
import CreativeDeveloperTitle from "../components/CreativeDeveloperTitle";
import StarBackground from "../components/StarBackground";
import folderIcon from "../assets/images/folder.svg";

export default function FolderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullAnimations, setShowFullAnimations] = useState(false);

  // Check for device capabilities and preferences
  useEffect(() => {
    // Only show full animations on desktop devices that don't prefer reduced motion
    const isDesktop = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setShowFullAnimations(isDesktop && !prefersReducedMotion);
  }, []);

  // Only render the stars when the folder is open and animations are enabled
  const renderStars = useMemo(() => {
    return showFullAnimations && isOpen ? <StarBackground /> : null;
  }, [showFullAnimations, isOpen]);

  return (
    <div className="full-screen">
      {/* Background animation - only when folder is open */}
      {renderStars}

      {/* Common container with fixed dimensions to prevent layout shifts */}
      <div className="full-screen center-content">
        {/* The folder is always in the exact center */}
        <div className="absolute-center">
          <div className="z-front center-folder">
            {/* Folder icon - always visible */}
            <img
              src={folderIcon}
              alt="Folder"
              className={`folder-icon ${!isOpen ? "folder-clickable" : ""}`}
              draggable={false}
              onClick={() => !isOpen && setIsOpen(true)}
            />
          </div>
        </div>

        {/* Content that appears only when folder is opened */}
        {isOpen && (
          <div
            className="full-screen flex-column fade-in"
            style={{ position: "absolute", inset: 0 }}
          >
            <div
              className="flex-column"
              style={{
                flex: 1,
                maxWidth: "1280px",
                margin: "0 auto",
                width: "100%",
                padding: "0 1rem",
              }}
            >
              {/* Header */}
              <Header />

              {/* Main content with 3D model */}
              <main
                className="flex-column center-content"
                style={{ flex: 1, position: "relative", width: "100%" }}
              >
                <section className="main-section flex-column center-content">
                  {/* CreativeDeveloperTitle but without its own folder */}
                  <div
                    className="full-screen"
                    style={{ position: "relative", zIndex: 10 }}
                  >
                    {/* Role Labels - positioned closer to the title */}
                    <span
                      className="role-label"
                      style={{ top: "35%", left: "28%" }}
                    >
                      3D Designer
                    </span>
                    <span
                      className="role-label"
                      style={{
                        top: "25%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      Entrepreneur
                    </span>
                    <span
                      className="role-label"
                      style={{ top: "35%", right: "28%" }}
                    >
                      Designer
                    </span>
                    <span
                      className="role-label"
                      style={{ bottom: "35%", left: "32%" }}
                    >
                      Teamplayer
                    </span>
                    <span
                      className="role-label"
                      style={{ bottom: "35%", right: "32%" }}
                    >
                      Thinker
                    </span>
                    <span
                      className="role-label"
                      style={{ top: "60%", right: "25%" }}
                    >
                      Director
                    </span>
                    <span
                      className="role-label"
                      style={{
                        bottom: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      Hussler
                    </span>

                    {/* Just the Creative/Developer text without the folder */}
                    <div className="absolute-center title-container">
                      {/* Position Creative text to the left */}
                      <div className="pointer-none left-title">
                        <span
                          className="title-text"
                          style={{
                            display: "block",
                            transform: "translateY(0.25em)",
                          }}
                        >
                          Creative
                        </span>
                      </div>

                      {/* Position Developer text to the right */}
                      <div className="pointer-none right-title">
                        <span
                          className="title-text"
                          style={{
                            display: "block",
                            transform: "translateY(0.25em)",
                          }}
                        >
                          Developer
                        </span>
                      </div>
                    </div>
                  </div>
                  <ModelCanvas />
                </section>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
