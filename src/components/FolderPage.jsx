import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import StatsSection from "../components/StatsSection";
import AboutSection from "../pages/AboutSection";
import AnimatedFolderStack from "../components/AnimatedFolderStack";
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
  const aboutSectionRef = useRef(null);
  const latestProjectsRef = useRef(null);

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

    // Set initial states for AboutSection and Latest Projects
    gsap.set(aboutSectionRef.current, { opacity: 0, y: "100vh" });
    gsap.set(latestProjectsRef.current, { opacity: 0, y: "100vh" });

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

          // Main timeline for section coordination
          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=1000%", // Much more scroll space since other sections are hidden
              scrub: 2, // Very smooth scrub for nice scrolling
              pin: true,
              pinSpacing: false, // Prevents overlap
              markers: true,
            },
          });

          // ===== SEPARATE TIMELINES PER SECTION =====

          // PHASE 1: Main Page Parallax Timeline
          const mainPageTl = gsap.timeline();
          
          mainPageTl.set(videoSectionRef.current, {
            opacity: 0,
            scale: 0.5,
          });

          mainPageTl.to(creativeRef.current, {
            x: "-100vw",
            y: "-20vh",
            duration: 6,
            ease: "power2.inOut",
          });

          mainPageTl.to(developerRef.current, {
            x: "100vw",
            y: "20vh",
            duration: 6,
            ease: "power2.inOut",
          }, "<");

          mainPageTl.to([
            topLeftRef.current,
            topCenterRef.current,
            topRightRef.current,
            bottomLeftRef.current,
            bottomRightRef.current,
            midRightRef.current,
            bottomCenterRef.current,
          ], {
            opacity: 0,
            y: (i) => (i % 2 === 0 ? "-15vh" : "15vh"),
            duration: 6,
            ease: "power2.inOut",
            stagger: 0.3,
          }, "<");

          mainPageTl.to(folderRef.current, {
            opacity: 0,
            scale: 0.5,
            y: "-30vh",
            duration: 6,
            ease: "power2.inOut",
          }, "<");

          // PHASE 2: StatsSection Timeline
          const statsTl = gsap.timeline();
          
          statsTl.to(videoSectionRef.current, {
            opacity: 1,
            scale: 1,
            y: "10vh",
            duration: 6,
            ease: "power2.out",
          });

          const isMobile = window.innerWidth <= 900;
          if (!isMobile) {
            statsTl.to(".stats-side.left", {
              x: 0,
              opacity: 1,
              duration: 4,
              ease: "power2.out",
            }, "<");

            statsTl.to(".stats-side.right", {
              x: 0,
              opacity: 1,
              duration: 4,
              ease: "power2.out",
            }, "<");
          }

          statsTl.to(".stats-laptop-stack", {
            scale: 1,
            opacity: 1,
            duration: 4,
            ease: "power2.out",
          }, "<");

          statsTl.to(modelRef.current, {
            opacity: 0,
            y: "25vh",
            duration: 6,
            ease: "power2.inOut",
          }, "<");

          // PHASE 3: Transition Timeline (StatsSection fade out, AboutSection appear)
          const transitionTl = gsap.timeline();
          
          transitionTl.to(videoSectionRef.current, {
            opacity: 0,
            y: "-50vh",
            duration: 5,
            ease: "power2.inOut",
          });

          transitionTl.to(folderRef.current, {
            className: "folder-icon-container",
            duration: 0,
          }, "<");

          transitionTl.to(folderRef.current, {
            opacity: 0,
            duration: 2,
            ease: "power2.inOut",
          }, "<");

          transitionTl.to(aboutSectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 5,
            ease: "power2.out",
          }, "+=2");

          // PHASE 4: AboutSection Timeline (handled by AboutSection component)
          const aboutTl = gsap.timeline();
          aboutTl.to({}, { duration: 75 }); // Placeholder for AboutSection

          // PHASE 5: AboutSection Fade Out Timeline
          const aboutFadeOutTl = gsap.timeline();
          
          aboutFadeOutTl.to(aboutSectionRef.current, {
            opacity: 0,
            y: "-50vh",
            duration: 5,
            ease: "power2.inOut",
          });

          // PHASE 6: Latest Projects Timeline
          const latestProjectsTl = gsap.timeline();
          
          latestProjectsTl.to(latestProjectsRef.current, {
            opacity: 1,
            y: 0,
            duration: 3,
            ease: "power2.out",
          });

          // PHASE 7: Latest Projects Animation Timeline (handled by component)
          const latestProjectsAnimTl = gsap.timeline();
          latestProjectsAnimTl.to({}, { duration: 100 }); // Placeholder

          // PHASE 8: Latest Projects Fade Out Timeline
          const latestProjectsFadeOutTl = gsap.timeline();
          
          latestProjectsFadeOutTl.to(latestProjectsRef.current, {
            opacity: 0,
            y: "50vh",
            duration: 3,
            ease: "power2.inOut",
          });

          latestProjectsFadeOutTl.to(folderRef.current, {
            className: "folder-icon-container absolute-center pointer-events-none",
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
          }, "<");

          // PHASE 9: Final Timeline
          const finalTl = gsap.timeline();
          finalTl.to({}, { duration: 10 });

          // ===== ADD ALL TIMELINES TO MAIN TIMELINE =====
          mainTl.add(mainPageTl, 0);
          mainTl.add(statsTl, "+=2");
          mainTl.add(transitionTl, "+=8");
          mainTl.add(aboutTl, "+=2");
          mainTl.add(aboutFadeOutTl, "+=3");
          mainTl.add(latestProjectsTl, "+=0.5");
          mainTl.add(latestProjectsAnimTl, "+=2");
          mainTl.add(latestProjectsFadeOutTl, "+=0.5");
          mainTl.add(finalTl, "+=0.5");

          // Remove scroll listener after creating ScrollTrigger
          window.removeEventListener("scroll", handleScroll);
        }
      };

      // Add scroll listener
      window.addEventListener("scroll", handleScroll);
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
            className="folder-icon-container absolute-center pointer-events-none"
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

          {/* AboutSection - Hidden initially */}
          <div
            ref={aboutSectionRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              transform: "translateY(100vh)",
              zIndex: 50,
            }}
          >
            <AboutSection />
          </div>

          {/* Latest Projects - Hidden initially */}
          <div
            ref={latestProjectsRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              transform: "translateY(100vh)",
              zIndex: 60,
            }}
          >
            <AnimatedFolderStack />
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
              zIndex: 40,
            }}
          >
            <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
