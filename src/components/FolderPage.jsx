import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import StatsSection from "../components/StatsSection";
import "../styles/folderpage.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FolderPage() {
  const sectionRef = useRef(null);
  const creativeRef = useRef(null);
  const developerRef = useRef(null);
  const modelRef = useRef(null);
  const folderRef = useRef(null);
  const videoSectionRef = useRef(null);
  
  // Role labels refs
  const topLeftRef = useRef(null);
  const topCenterRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);
  const midRightRef = useRef(null);
  const bottomCenterRef = useRef(null);

  useEffect(() => {
    // GSAP Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true,
      },
    });

    // 1. Creative section naar links wegfaden
    tl.to(creativeRef.current, {
      x: "-100vw",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // 2. Developer section naar rechts wegfaden (tegelijkertijd)
    tl.to(developerRef.current, {
      x: "100vw",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // 3. Folder icon wegfaden (tegelijkertijd)
    tl.to(folderRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // 4. Alle role labels wegfaden (tegelijkertijd)
    tl.to([topLeftRef.current, topCenterRef.current, topRightRef.current, 
           bottomLeftRef.current, bottomRightRef.current, midRightRef.current, 
           bottomCenterRef.current], {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // 5. Video section container infaden (3D model blijft zichtbaar)
    tl.to(videoSectionRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    }, "+=0.5");

    // 6. Left stats slide in from left
    tl.to(".stats-side.left", {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "<");

    // 7. Right stats slide in from right
    tl.to(".stats-side.right", {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "<");

    // 8. Laptop stack scale in
    tl.to(".stats-laptop-stack", {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "<");

    // 9. 3D model wegfaden (tegelijkertijd met video section volledig infaden)
    tl.to(modelRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // 10. Extra tijd om video section te bekijken (3 seconden)
    tl.to({}, { duration: 3 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="folder-hero-outer" ref={sectionRef}>
      <div className="folder-hero-sticky">
        {/* Main Content */}
        <div className="main-content-centered">
          {/* Folder icon */}
          <div className="absolute-center pointer-events-none z-[1000]" ref={folderRef}>
            <div className="z-front center-folder">
              <img
                src={folderIcon}
                alt="Folder"
                className="folder-icon"
                draggable={false}
              />
            </div>
          </div>
          
          <div className="folder-page-container relative">
            <div className="main-content main-content-z1">
              <section className="main-section flex-column center-content relative">
                <div className="full-screen full-screen-z10">
                  {/* Role labels */}
                  <span className="role-label top-left" ref={topLeftRef}>3D Designer</span>
                  <span className="role-label top-center" ref={topCenterRef}>Entrepreneur</span>
                  <span className="role-label top-right" ref={topRightRef}>Designer</span>
                  <span className="role-label bottom-left" ref={bottomLeftRef}>Teamplayer</span>
                  <span className="role-label bottom-right" ref={bottomRightRef}>Thinker</span>
                  <span className="role-label mid-right" ref={midRightRef}>Director</span>
                  <span className="role-label bottom-center" ref={bottomCenterRef}>Hussler</span>
                  
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
              </section>
            </div>
          </div>
          
          {/* Video Section - Hidden initially */}
          <div 
            ref={videoSectionRef}
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              opacity: 0,
              transform: "scale(0.5)",
              zIndex: 10
            }}
          >
            <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
