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

gsap.registerPlugin(ScrollTrigger);

export default function OnePager({
  headerRef,
  footerRef,
  onAnimationsComplete,
}) {
  const refs = {
    section: useRef(null),
    creative: useRef(null),
    developer: useRef(null),
    model: useRef(null),
    folder: useRef(null),
    videoSection: useRef(null),
    aboutSection: useRef(null),
    latestProjects: useRef(null),
    companies: useRef(null),
    // Role labels
    topLeft: useRef(null),
    topCenter: useRef(null),
    topRight: useRef(null),
    bottomLeft: useRef(null),
    bottomRight: useRef(null),
    midRight: useRef(null),
    bottomCenter: useRef(null),
  };

  const isMobile = window.innerWidth <= 900;
  const easeOut = "power3.out";
  const easeInOut = "power3.inOut";

  const fadeMove = (target, y, duration, ease = easeOut) => ({
    targets: target,
    vars: { opacity: 0, y, duration, ease },
  });

  useEffect(() => {
    const entranceTl = createEntranceAnimations({
      creativeRef: refs.creative,
      developerRef: refs.developer,
      headerRef,
      footerRef,
      modelRef: refs.model,
      topLeftRef: refs.topLeft,
      topCenterRef: refs.topCenter,
      topRightRef: refs.topRight,
      bottomLeftRef: refs.bottomLeft,
      bottomRightRef: refs.bottomRight,
      midRightRef: refs.midRight,
      bottomCenterRef: refs.bottomCenter,
      aboutSectionRef: refs.aboutSection,
      latestProjectsRef: refs.latestProjects,
      onComplete: () => {
        onAnimationsComplete();
        createMainScrollTrigger();
      },
    });

    const createMainScrollTrigger = () => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.section.current,
          start: "top top",
          end: ONEPAGER_CONFIG.scrollSpace,
          scrub: ONEPAGER_CONFIG.scrub,
          pin: true,
          pinSpacing: false,
          markers: true,
        },
      });

      const phases = [
        // PHASE 1: Hero parallax
        () => {
          const tl = gsap
            .timeline()
            .set(refs.videoSection.current, { opacity: 0, scale: 0.5 });
          if (isMobile) {
            tl.to(refs.creative.current, {
              y: "-100vh",
              duration: 6,
              ease: easeOut,
            })
              .to(
                refs.developer.current,
                { y: "100vh", duration: 6, ease: easeOut },
                "<"
              )
              .to(
                refs.folder.current,
                { opacity: 0, scale: 0.5, duration: 6, ease: easeOut },
                "<"
              );
          } else {
            tl.to(refs.creative.current, {
              x: "-100vw",
              y: "-20vh",
              duration: 6,
              ease: easeOut,
            })
              .to(
                refs.developer.current,
                { x: "100vw", y: "20vh", duration: 6, ease: easeOut },
                "<"
              )
              .to(
                refs.folder.current,
                {
                  opacity: 0,
                  scale: 0.5,
                  y: "-30vh",
                  duration: 6,
                  ease: easeOut,
                },
                "<"
              );
          }
          tl.to(
            [
              refs.topLeft.current,
              refs.topCenter.current,
              refs.topRight.current,
              refs.bottomLeft.current,
              refs.bottomRight.current,
              refs.midRight.current,
              refs.bottomCenter.current,
            ],
            {
              opacity: 0,
              y: (i) => (i % 2 === 0 ? "-15vh" : "15vh"),
              duration: 6,
              ease: easeOut,
              stagger: 0.3,
            },
            "<"
          );
          return tl;
        },
        // PHASE 2: Stats
        () => {
          const tl = gsap
            .timeline()
            .to(refs.videoSection.current, {
              opacity: 1,
              scale: 1,
              y: "10vh",
              duration: 6,
              ease: "power2.out",
            });
          if (!isMobile) {
            tl.to(
              ".stats-side.left",
              { x: 0, opacity: 1, duration: 4, ease: "power2.out" },
              "<"
            ).to(
              ".stats-side.right",
              { x: 0, opacity: 1, duration: 4, ease: "power2.out" },
              "<"
            );
          }
          return tl
            .to(
              ".stats-laptop-stack",
              { scale: 1, opacity: 1, duration: 4, ease: "power2.out" },
              "<"
            )
            .to(
              refs.model.current,
              { opacity: 0, y: "25vh", duration: 6, ease: easeInOut },
              "<"
            );
        },
        // PHASE 3: Transition to About
        () =>
          gsap
            .timeline()
            .to(refs.videoSection.current, {
              opacity: 0,
              y: "-50vh",
              duration: 5,
              ease: easeInOut,
            })
            .to(
              refs.folder.current,
              { opacity: 0, duration: 2, ease: easeInOut },
              "<"
            )
            .to(
              refs.aboutSection.current,
              { opacity: 1, y: 0, duration: 5, ease: easeOut },
              "+=2"
            ),
        // PHASE 4: About placeholder
        () => gsap.timeline().to({}, { duration: 75 }),
        // PHASE 5: Fade out About
        () =>
          gsap
            .timeline()
            .to(refs.aboutSection.current, {
              opacity: 0,
              y: "-50vh",
              duration: 8,
              ease: easeInOut,
            }),
        // PHASE 6: Latest Projects
        () =>
          gsap
            .timeline()
            .to(refs.latestProjects.current, {
              opacity: 1,
              y: 0,
              duration: 4,
              ease: easeOut,
            }),
        // PHASE 7: Latest Projects placeholder
        () => gsap.timeline().to({}, { duration: 100 }),
        // PHASE 8: Fade out Latest Projects
        () =>
          gsap
            .timeline()
            .to(refs.latestProjects.current, {
              opacity: 0,
              y: "-50vh",
              duration: 6,
              ease: easeInOut,
            }),
        // PHASE 9: Companies Section
        () =>
          gsap
            .timeline()
            .set(refs.companies.current, {
              opacity: 0,
              y: 100,
              pointerEvents: "none",
            })
            .to(refs.companies.current, {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 6,
              ease: easeOut,
            }),
        // PHASE 10: Final placeholder
        () => gsap.timeline().to({}, { duration: 10 }),
      ];

      // Voeg alle fases toe in één loop
      phases.forEach((makeTl, i) => {
        mainTl.add(
          makeTl(),
          ONEPAGER_CONFIG.delays[Object.keys(ONEPAGER_CONFIG.delays)[i]]
        );
      });
    };

    return () => {
      entranceTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="folder-hero-outer" ref={refs.section}>
      <div className="folder-hero-sticky">
        <div className="main-content-centered">
          {/* Folder icon */}
          <div
            className="folder-icon-container absolute-center pointer-events-none"
            ref={refs.folder}
            style={{ zIndex: 10 }}
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

          {/* Hero Section */}
          <div className="folder-page-container relative">
            <section className="main-section flex-column center-content relative">
              <HeroSection
                creativeRef={refs.creative}
                developerRef={refs.developer}
                modelRef={refs.model}
                topLeftRef={refs.topLeft}
                topCenterRef={refs.topCenter}
                topRightRef={refs.topRight}
                bottomLeftRef={refs.bottomLeft}
                bottomRightRef={refs.bottomRight}
                midRightRef={refs.midRight}
                bottomCenterRef={refs.bottomCenter}
              />
            </section>
          </div>

          {/* Stats Section */}
          <div
            ref={refs.videoSection}
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

          {/* About Section */}
          <div
            ref={refs.aboutSection}
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

          {/* Latest Projects */}
          <div
            ref={refs.latestProjects}
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

          {/* Companies Section */}
          <div
            ref={refs.companies}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              transform: "translateY(100vh)",
              zIndex: 70,
            }}
          >
            <ContactSection />
          </div>
        </div>
      </div>
    </section>
  );
}
