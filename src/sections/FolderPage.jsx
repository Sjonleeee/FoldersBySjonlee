import React, { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import folderIcon from "../assets/images/folder.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelCanvas from "../components/three/ModelCanvas";
import { MODEL_CONFIG } from "../config/modelConfig";

gsap.registerPlugin(ScrollTrigger);

export default function FolderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const laptopRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Ensure ScrollTrigger is refreshed when content changes or is shown
    ScrollTrigger.refresh();

    // GSAP ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(
      contentRef.current,
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        yPercent: 0,
        perspective: 800,
      },
      {
        opacity: 0,
        scale: 0.5,
        rotationX: -45,
        yPercent: -20,
        perspective: 200,
        duration: 1,
        ease: "power1.inOut",
      }
    );

    tl.fromTo(
      laptopRef.current,
      {
        opacity: 0,
        scale: 0.5,
        yPercent: 50,
      },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    );

    // Cleanup ScrollTrigger
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isOpen]);

  return (
    <div className="full-screen scroll-container">
      {/* Laptop container for the 3D model */}
      <div
        ref={laptopRef}
        className="absolute-center pointer-none"
        style={{
          width: "clamp(600px, 80vw, 1000px)",
          height: "clamp(350px, 45vw, 600px)",
          opacity: 0,
        }}
      >
        <ModelCanvas configKey="laptop" />
      </div>

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
            ref={contentRef}
            className="full-screen flex-column fade-in" 
            style={{ position: "absolute", inset: 0 }}
          >
            <div className="flex-column" style={{ flex: 1, maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "0 1rem" }}>
              {/* Header */}
              <Header />

              {/* Main content */}
              <main className="flex-column center-content" style={{ flex: 1, position: "relative", width: "100%" }}>
                <section className="main-section flex-column center-content">
                  {/* CreativeDeveloperTitle but without its own folder */}
                  <div className="full-screen" style={{ position: "relative", zIndex: 10 }}>
                    {/* Role Labels - positioned closer to the title */}
                    <span className="role-label" style={{ top: "35%", left: "28%" }}>
                      3D Designer
                    </span>
                    <span className="role-label" style={{ top: "25%", left: "50%", transform: "translateX(-50%)" }}>
                      Entrepreneur
                    </span>
                    <span className="role-label" style={{ top: "35%", right: "28%" }}>
                      Designer
                    </span>
                    <span className="role-label" style={{ bottom: "35%", left: "32%" }}>
                      Teamplayer
                    </span>
                    <span className="role-label" style={{ bottom: "35%", right: "32%" }}>
                      Thinker
                    </span>
                    <span className="role-label" style={{ top: "60%", right: "25%" }}>
                      Director
                    </span>
                    <span className="role-label" style={{ bottom: "20%", left: "50%", transform: "translateX(-50%)" }}>
                      Hussler
                    </span>

                    {/* Just the Creative/Developer text without the folder */}
                    <div className="absolute-center title-container">
                      {/* Position Creative text to the left */}
                      <div className="pointer-none left-title">
                        <span className="title-text" style={{ display: "block", transform: "translateY(0.25em)" }}>
                          Creative
                        </span>
                      </div>

                      {/* Position Developer text to the right */}
                      <div className="pointer-none right-title">
                        <span className="title-text" style={{ display: "block", transform: "translateY(0.25em)" }}>
                          Developer
                        </span>
                      </div>
                    </div>
                  </div>
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
