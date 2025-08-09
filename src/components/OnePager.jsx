import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import folderIcon from "../assets/images/folder.svg";
import HeroSection from "./sections/HeroSection";
import StatsSection from "../components/StatsSection";
import AboutSection from "../pages/AboutSection";
import AnimatedFolderStack from "../components/AnimatedFolderStack";
import ContactSection from "../pages/ContactSection";
import { createEntranceAnimations } from "./animations/EntranceAnimations";
import { ONEPAGER_CONFIG } from "../config/animationConfig";
import "../styles/onepager.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function OnePager({
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
  const companiesSectionRef = useRef(null);

  // Role labels refs
  const topLeftRef = useRef(null);
  const topCenterRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);
  const midRightRef = useRef(null);
  const bottomCenterRef = useRef(null);

  useEffect(() => {
    // Create entrance animations using extracted logic
    const entranceTl = createEntranceAnimations({
      creativeRef,
      developerRef,
      headerRef,
      footerRef,
      modelRef,
      topLeftRef,
      topCenterRef,
      topRightRef,
      bottomLeftRef,
      bottomRightRef,
      midRightRef,
      bottomCenterRef,
      aboutSectionRef,
      latestProjectsRef,
      onComplete: () => {
        onAnimationsComplete();
        createScrollTrigger();
      },
    });

    // Function to create scroll trigger
    const createScrollTrigger = () => {
      let scrollTriggerCreated = false;

      const handleScroll = () => {
        if (!scrollTriggerCreated) {
          scrollTriggerCreated = true;

          // Main timeline for section coordination
          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: ONEPAGER_CONFIG.scrollSpace,
              scrub: ONEPAGER_CONFIG.scrub,
              pin: true,
              pinSpacing: false,
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
            ease: "power3.out", // Smoother easing
            willChange: "transform", // GPU optimization
          });

          mainPageTl.to(
            developerRef.current,
            {
              x: "100vw",
              y: "20vh",
              duration: 6,
              ease: "power3.out",
              willChange: "transform",
            },
            "<"
          );

          mainPageTl.to(
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
              y: (i) => (i % 2 === 0 ? "-15vh" : "15vh"),
              duration: 6,
              ease: "power3.out",
              stagger: 0.3,
              willChange: "transform, opacity",
            },
            "<"
          );

          mainPageTl.to(
            folderRef.current,
            {
              opacity: 0,
              scale: 0.5,
              y: "-30vh",
              duration: 6,
              ease: "power3.out",
              willChange: "transform, opacity",
            },
            "<"
          );

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
            statsTl.to(
              ".stats-side.left",
              {
                x: 0,
                opacity: 1,
                duration: 4,
                ease: "power2.out",
              },
              "<"
            );

            statsTl.to(
              ".stats-side.right",
              {
                x: 0,
                opacity: 1,
                duration: 4,
                ease: "power2.out",
              },
              "<"
            );
          }

          statsTl.to(
            ".stats-laptop-stack",
            {
              scale: 1,
              opacity: 1,
              duration: 4,
              ease: "power2.out",
            },
            "<"
          );

          statsTl.to(
            modelRef.current,
            {
              opacity: 0,
              y: "25vh",
              duration: 6,
              ease: "power2.inOut",
            },
            "<"
          );

          // PHASE 3: Transition Timeline (StatsSection fade out, AboutSection appear)
          const transitionTl = gsap.timeline();

          transitionTl.to(videoSectionRef.current, {
            opacity: 0,
            y: "-50vh",
            duration: 5,
            ease: "power3.inOut",
          });

          transitionTl.to(
            folderRef.current,
            {
              className: "folder-icon-container",
              duration: 0,
            },
            "<"
          );

          transitionTl.to(
            folderRef.current,
            {
              opacity: 0,
              duration: 2,
              ease: "power3.inOut",
            },
            "<"
          );

          transitionTl.to(
            aboutSectionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 5,
              ease: "power3.out",
            },
            "+=2"
          );

          // PHASE 4: AboutSection Timeline (handled by AboutSection component)
          const aboutTl = gsap.timeline();
          aboutTl.to({}, { duration: 75 }); // Placeholder for AboutSection

          // PHASE 5: AboutSection Fade Out Timeline
          const aboutFadeOutTl = gsap.timeline();

          aboutFadeOutTl.to(aboutSectionRef.current, {
            opacity: 0,
            y: "-50vh",
            duration: 8, // Langere fade out
            ease: "power3.inOut", // Soepelere easing
          });

          // PHASE 6: Latest Projects Timeline
          const latestProjectsTl = gsap.timeline();

          latestProjectsTl.to(latestProjectsRef.current, {
            opacity: 1,
            y: 0,
            duration: 8, // Langere duration voor smooth fade in
            ease: "power3.out", // Soepelere easing
          });

          // PHASE 7: Latest Projects Animation Timeline (handled by component)
          const latestProjectsAnimTl = gsap.timeline();
          latestProjectsAnimTl.to({}, { duration: 100 }); // Placeholder

          // PHASE 8: Latest Projects Fade Out Timeline
          const latestProjectsFadeOutTl = gsap.timeline();

          latestProjectsFadeOutTl.to(latestProjectsRef.current, {
            opacity: 0,
            y: "-50vh", // Adjusted to move upwards instead of downwards
            duration: 6, // Keep the smooth duration
            ease: "power3.inOut", // Smoother easing
          });

          // PHASE 9: Companies Section Timeline
          const companiesTl = gsap.timeline();

          companiesTl.set(companiesSectionRef.current, {
            opacity: 0,
            y: 100,
            pointerEvents: "none",
          });

          companiesTl.to(companiesSectionRef.current, {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 6, // Adjusted duration for smoother fade in
            ease: "power3.out", // Smoother easing
          });

          // PHASE 10: Final Timeline
          const finalTl = gsap.timeline();
          finalTl.to({}, { duration: 10 });

          // ===== ADD ALL TIMELINES TO MAIN TIMELINE =====
          mainTl.add(mainPageTl, 0);
          mainTl.add(statsTl, ONEPAGER_CONFIG.delays.afterStats);
          mainTl.add(transitionTl, ONEPAGER_CONFIG.delays.afterTransition);
          mainTl.add(aboutTl, ONEPAGER_CONFIG.delays.afterAbout);
          mainTl.add(aboutFadeOutTl, ONEPAGER_CONFIG.delays.afterAboutFadeOut);
          mainTl.add(
            latestProjectsTl,
            ONEPAGER_CONFIG.delays.afterLatestProjects
          );
          mainTl.add(
            latestProjectsAnimTl,
            ONEPAGER_CONFIG.delays.afterLatestProjectsAnim
          );
          mainTl.add(
            latestProjectsFadeOutTl,
            ONEPAGER_CONFIG.delays.afterLatestProjectsFadeOut
          );
          mainTl.add(companiesTl, ONEPAGER_CONFIG.delays.afterCompanies);
          mainTl.add(finalTl, ONEPAGER_CONFIG.delays.afterFinal);

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
                <HeroSection
                  creativeRef={creativeRef}
                  developerRef={developerRef}
                  modelRef={modelRef}
                  topLeftRef={topLeftRef}
                  topCenterRef={topCenterRef}
                  topRightRef={topRightRef}
                  bottomLeftRef={bottomLeftRef}
                  bottomRightRef={bottomRightRef}
                  midRightRef={midRightRef}
                  bottomCenterRef={bottomCenterRef}
                />
              </section>
            </div>
          </div>
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
          {/* Video Section - Hidden initially */}

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

          {/* Companies Section - Hidden initially */}
          <div
            ref={companiesSectionRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              zIndex: 70,
              transform: "translateY(100vh)",
            }}
          >
            <ContactSection />
          </div>
        </div>
      </div>
    </section>
  );
}
