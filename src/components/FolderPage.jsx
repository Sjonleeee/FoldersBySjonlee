import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import StatsSection from "../components/StatsSection";
import "../styles/folderpage.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FolderPage({
  headerRef,
  footerRef,
  onAnimationsComplete,
}) {
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
    // Initial entrance animations
    const entranceTl = gsap.timeline({
      onComplete: () => {
        // Wait a bit more to ensure everything is settled
        setTimeout(() => {
          // Enable scrolling after all animations are complete
          onAnimationsComplete();

          // Create ScrollTrigger after initial animations are complete
          createScrollTrigger();
        }, 500);
      },
    });

    // Set initial positions
    gsap.set(creativeRef.current, { x: "-100vw", opacity: 0 });
    gsap.set(developerRef.current, { x: "100vw", opacity: 0 });
    gsap.set(headerRef.current, { y: "-100vh", opacity: 0 });
    gsap.set(footerRef.current, { y: "100vh", opacity: 0 });
    gsap.set(modelRef.current, { opacity: 0 });
    gsap.set(".footer-scroll-card", { opacity: 0 });
    gsap.set(
      [
        topLeftRef.current,
        topCenterRef.current,
        topRightRef.current,
        bottomLeftRef.current,
        bottomRightRef.current,
        midRightRef.current,
        bottomCenterRef.current,
      ],
      { opacity: 0 }
    );

    // 1. Creative slides in from left
    entranceTl.to(creativeRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    });

    // 2. Developer slides in from right (together with Creative)
    entranceTl.to(
      developerRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "<"
    );

    // 3. Header and Footer slide in together (same time as Creative/Developer)
    entranceTl.to(
      [headerRef.current, footerRef.current],
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "<"
    );

    // 4. 3D model and all labels fade in together
    entranceTl.to(
      [
        modelRef.current,
        topLeftRef.current,
        topCenterRef.current,
        topRightRef.current,
        bottomLeftRef.current,
        bottomRightRef.current,
        midRightRef.current,
        bottomCenterRef.current,
      ],
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "+=0.6"
    );

    // Function to create scroll trigger
    const createScrollTrigger = () => {
      // Don't create ScrollTrigger immediately
      // Wait for user to actually start scrolling
      let scrollTriggerCreated = false;
      
      const handleScroll = () => {
        if (!scrollTriggerCreated) {
          scrollTriggerCreated = true;
          
          // Clean, simple approach - one timeline for everything
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=120%",
              scrub: 3,
              pin: true,
            },
          });

          // Set initial states for elements that need it
          tl.set(videoSectionRef.current, {
            opacity: 0,
            scale: 0.5,
          });

          // Start parallax scroll animations
          tl.to(creativeRef.current, {
            x: "-100vw",
            y: "-20vh", // Parallax beweging naar boven
            duration: 2.5,
            ease: "power2.inOut",
          });

          tl.to(developerRef.current, {
            x: "100vw",
            y: "20vh", // Parallax beweging naar beneden
            duration: 2.5,
            ease: "power2.inOut",
          }, "<");

          tl.to(
            [
              topLeftRef.current,
              topCenterRef.current,
              topRightRef.current,
              bottomLeftRef.current,
              bottomRightRef.current,
              midRightRef.current,
              bottomCenterRef.current,
            ],
            {
              opacity: 0,
              y: (i) => (i % 2 === 0 ? "-15vh" : "15vh"), // Parallax beweging voor labels
              duration: 2.5,
              ease: "power2.inOut",
              stagger: 0.1,
            },
            "<"
          );

          tl.to(folderRef.current, {
            opacity: 0,
            scale: 0.5,
            y: "-30vh", // Parallax beweging naar boven
            duration: 2.5,
            ease: "power2.inOut",
          }, "<");

          tl.to(videoSectionRef.current, {
            opacity: 1,
            scale: 1,
            y: "10vh", // Parallax beweging naar beneden
            duration: 3.0,
            ease: "power2.out",
          }, "+=0.5");

          // Only animate stats-side elements on desktop (not mobile)
          const isMobile = window.innerWidth <= 900;
          if (!isMobile) {
            tl.to(".stats-side.left", {
              x: 0,
              opacity: 1,
              duration: 2.5,
              ease: "power2.out",
            }, "<");

            tl.to(".stats-side.right", {
              x: 0,
              opacity: 1,
              duration: 2.5,
              ease: "power2.out",
            }, "<");
          }

          tl.to(".stats-laptop-stack", {
            scale: 1,
            opacity: 1,
            duration: 2.5,
            ease: "power2.out",
          }, "<");

          tl.to(modelRef.current, {
            opacity: 0,
            y: "25vh", // Parallax beweging naar beneden
            duration: 3.0,
            ease: "power2.inOut",
          }, "<");

          tl.to({}, { duration: 3 });
          
          // Remove scroll listener after creating ScrollTrigger
          window.removeEventListener('scroll', handleScroll);
        }
      };
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll);
    };

    return () => {
      entranceTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="folder-hero-outer" ref={sectionRef}>
      <div className="folder-hero-sticky">
      {/* Main Content */}
        <div className="main-content-centered">
          {/* Folder icon */}
          <div
            className="absolute-center pointer-events-none"
            ref={folderRef}
            style={{ zIndex: 9999 }}
          >
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
                  <span
                    className="role-label bottom-right"
                    ref={bottomRightRef}
                  >
                    Thinker
                  </span>
                  <span className="role-label mid-right" ref={midRightRef}>
                    Director
                  </span>
                  <span
                    className="role-label bottom-center"
                    ref={bottomCenterRef}
                  >
                    Hussler
                  </span>

                <div className="absolute-center title-container">
                  <div className="title-center-flex">
                      <div
                        className="pointer-none left-title"
                        ref={creativeRef}
                      >
                    <span className="title-text">Creative</span>
                  </div>
                      <div
                        className="pointer-none right-title"
                        ref={developerRef}
                      >
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
              zIndex: 10,
            }}
          >
            <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
