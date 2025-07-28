import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FolderCard from "./FolderCard";
import "../styles/latestprojects.css";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.MP4";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const folders = [
  {
    fancy: "V",
    title: "Volkswagen Project",
    subtitle: "®",
    tags: ["UX / UI", "Interface Design", "Concept"],
    video: video1, // Gebruik geïmporteerde video
  },
  {
    fancy: "C",
    title: "Chrome Magazine",
    subtitle: "®",
    tags: ["Magazine design", "Graphic Assistant", "Video editting"],
    video: video2, // Gebruik geïmporteerde video
  },
  {
    fancy: "R",
    title: "Rinkitou Creative Agency",
    subtitle: "®",
    tags: ["Branding", "Entrepreneurship", "Management"],
    video: video3, // Gebruik geïmporteerde video
  },
];

function AnimatedFolderStack() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const folderRefs = useRef(folders.map(() => React.createRef()));
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggerId = useRef(`latest-projects-trigger-${Math.random()}`);

  useEffect(() => {
    // Kill any existing ScrollTrigger with this specific ID
    const existingTrigger = ScrollTrigger.getById(triggerId.current);
    if (existingTrigger) {
      existingTrigger.kill();
    }

    if (hasAnimated) return;

    let ctx;

    function createAnimation() {
      ctx = gsap.context(() => {
        function isMobile() {
          return window.innerWidth <= 600;
        }

        // Set initial positions - behoud originele styling
        gsap.set(titleRef.current, {
          top: "50%",
          transform: "translateX(-50%)",
          fontSize: "8.4rem",
          opacity: 0,
        });

        folderRefs.current.forEach((ref, i) => {
          gsap.set(ref.current, {
            y: "100vh",
            x: isMobile() ? 0 : i === 0 ? -16 : i === 2 ? 16 : 0,
            rotation: isMobile() ? 0 : i === 0 ? 4 : i === 2 ? -4 : 0,
            zIndex: i + 1,
          });
        });

        // Timeline met originele animaties
        const tl = gsap.timeline({
          scrollTrigger: {
            // === Latest Projects ScrollTrigger ===
            trigger: sectionRef.current,
            start: "top top",
            end: "+=60%", // Balanced timing
            scrub: 1.5, // Slightly smoother scrub for better feel
            pin: true,
            id: triggerId.current,
            markers: true, // Show GSAP markers for debugging
            onComplete: () => setHasAnimated(true),
          },
        });

        // Titel animatie - originele styling
        tl.fromTo(
          titleRef.current,
          {
            top: "50%",
            transform: "translateX(-50%)",
            fontSize: "8.4rem",
            opacity: 0,
          },
          {
            top: "15vh",
            fontSize: "8.4rem",
            opacity: 1,
            duration: 0.3, // Verkort van 0.38 naar 0.3
            ease: "power2.inOut",
          }
        );

        if (isMobile()) {
          // Mobile animatie - originele styling
          const sectionHeight = window.innerHeight * 0.6;
          const folderGap = 6;
          const folderHeight = (sectionHeight - 2 * folderGap) / 3;
          const stackStartY = -120;
          const foldersOffsetY = 40;

          folderRefs.current.forEach((ref, i) => {
            tl.fromTo(
              ref.current,
              { y: "100vh", x: 0, rotation: 0, zIndex: i + 1 },
              {
                y:
                  stackStartY + foldersOffsetY + i * (folderHeight + folderGap),
                x: 0,
                rotation: 0,
                zIndex: i + 1,
                duration: 0.25, // Verkort van 0.32 naar 0.25
              }
            );
          });
        } else {
          // Desktop animatie - originele styling
          folderRefs.current.forEach((ref, i) => {
            const xOffset = i === 0 ? -16 : i === 2 ? 16 : 0;
            const yOffset = i * 16;
            const rotation = i === 0 ? 4 : i === 2 ? -4 : 0;

            tl.fromTo(
              ref.current,
              { y: "100vh", x: xOffset, rotation, zIndex: i + 1 },
              {
                y: yOffset,
                x: xOffset,
                rotation,
                zIndex: i + 1,
                duration: 0.25,
              } // Verkort van 0.32 naar 0.25
            );
          });

          // Desktop folder posities - originele styling
          tl.to(folderRefs.current[0].current, {
            x: "-30.5vw",
            y: "10vh",
            scale: 1,
            rotation: 0,
            zIndex: 1,
            duration: 0.25, // Verkort van 0.32 naar 0.25
          });
          tl.to(
            folderRefs.current[1].current,
            {
              x: "0vw",
              y: "10vh",
              scale: 1,
              rotation: 0,
              zIndex: 2,
              duration: 0.25, // Verkort van 0.32 naar 0.25
            },
            "<"
          );
          tl.to(
            folderRefs.current[2].current,
            {
              x: "30.5vw",
              y: "10vh",
              scale: 1,
              rotation: 0,
              zIndex: 3,
              duration: 0.25, // Verkort van 0.32 naar 0.25
            },
            "<"
          );
        }

        tl.to({}, { duration: 1.2 }); // Increased pause for reading time

        // Fade out everything together
        tl.to(
          [titleRef.current, ...folderRefs.current.map((ref) => ref.current)],
          {
            opacity: 0,
            duration: 1.2,
            ease: "power1.out",
          },
          "+=0.5"
        );

        // Final cleanup
        tl.to(
          [...folderRefs.current.map((ref) => ref.current), titleRef.current],
          {
            visibility: "hidden",
            zIndex: -1,
            duration: 0,
          },
          "+=0.5"
        );
      }, sectionRef);
    }

    createAnimation();

    window.addEventListener("resize", createAnimation);

    return () => {
      // Only kill triggers with our specific ID
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === triggerId.current) t.kill();
      });
      if (ctx) ctx.revert();
    };
  }, [hasAnimated]);

  // Track mouse X position relative to the section
  function handleMouseMove(e) {
    if (!sectionRef.current) return;
    const bounds = sectionRef.current.getBoundingClientRect();
    setMouseX(e.clientX - bounds.left);
    setMouseY(e.clientY - bounds.top);
  }

  function handleMouseLeave() {
    setMouseX(null);
    setMouseY(null);
  }

  return (
    <section
      className="latest-projects-hero"
      ref={sectionRef}
      style={{
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sticky titel van de sectie, animatie op scale/position */}
      <div
        className="latest-projects-title hermaiona-title-style"
        ref={titleRef}
        style={{
          position: "absolute",
          top: "20vh",
          left: "50%",
          transform: "translate(-50%, 0%)",
          zIndex: 2,
          fontSize: "8.4rem",
        }}
      >
        Latest Projects
      </div>
      {/* Stack/grid van folder-cards */}
      <div
        className="latest-projects-stack"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        {folders.map((folder, i) => (
          <div
            ref={folderRefs.current[i]}
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "46%",
              transform: "translate(-50%, 0)",
              zIndex: i + 1,
              // GSAP will animate x/y/zIndex
            }}
          >
            <FolderCard
              fancy={folder.fancy}
              title={folder.title}
              subtitle={folder.subtitle}
              tags={folder.tags}
              video={folder.video}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnimatedFolderStack;
