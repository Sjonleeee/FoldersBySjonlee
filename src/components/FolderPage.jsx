import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import "../styles/folderpage.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FolderPage() {
  const pageRef = useRef(null);
  const creativeRef = useRef(null);
  const developerRef = useRef(null);
  const modelRef = useRef(null);
  const folderRef = useRef(null);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    // GSAP Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top top",
        end: "+=300%",
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

    // 2. Developer section naar rechts wegfaden
    tl.to(developerRef.current, {
      x: "100vw",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // 3. 3D model wegfaden
    tl.to(modelRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.2");

    // 4. Folder icon wegfaden
    tl.to(folderRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.2");

    // 5. Video section infaden
    tl.to(videoSectionRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    }, "+=0.3");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="page-root" ref={pageRef}>
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
                <span className="role-label top-left">3D Designer</span>
                <span className="role-label top-center">Entrepreneur</span>
                <span className="role-label top-right">Designer</span>
                <span className="role-label bottom-left">Teamplayer</span>
                <span className="role-label bottom-right">Thinker</span>
                <span className="role-label mid-right">Director</span>
                <span className="role-label bottom-center">Hussler</span>
                
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
          className="stats-video-section" 
          ref={videoSectionRef}
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            opacity: 0,
            zIndex: 10
          }}
        >
          {/* Import and render StatsSection content here */}
          <div className="stats-content-flex">
            <div className="stats-side left">
              <div className="stats-block">
                <span className="stats-number">4+</span>
                <span className="stats-label">Years of creating</span>
              </div>
              <div className="stats-block">
                <span className="stats-number">150+</span>
                <span className="stats-label">Completed Projects</span>
              </div>
            </div>
            <div className="stats-side right">
              <div className="stats-block">
                <span className="stats-number">26+</span>
                <span className="stats-label">Collaborations</span>
              </div>
              <div className="stats-block">
                <span className="stats-number">100%</span>
                <span className="stats-label">On-Time Delivery rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
