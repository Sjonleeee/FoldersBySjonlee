import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FolderCard from "./FolderCard";
import "../styles/latestprojects.css";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.MP4";

gsap.registerPlugin(ScrollTrigger);

const folders = [
  {
    fancy: "V",
    title: "olkswagen Project",
    subtitle: <sup>®</sup>,
    tags: "{ UX / UI, Interface Design, Concept }",
    video: video1,
  },
  {
    fancy: "C",
    title: "hrome Magazine Berlin",
    subtitle: <sup>®</sup>,
    tags: "{ Magazine design, Graphic Assistant, Video editing }",
    video: video2,
  },
  {
    fancy: "R",
    title: "inkitou Creative Agency",
    subtitle: <sup>®</sup>,
    tags: "{ Branding, Entrepreneurship, Management }",
    video: video3,
  },
];

function AnimatedFolderStack() {
  const sectionRef = useRef();
  const folderRefs = [useRef(), useRef(), useRef()];
  const titleRef = useRef();
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  useLayoutEffect(() => {
    let ctx;
    function createAnimation() {
      if (ctx) ctx.revert(); // Clean up previous GSAP context
      ctx = gsap.context(() => {
        function isMobile() {
          return window.innerWidth <= 600;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            scrub: true,
            pin: true,
          },
        });

        // Titel animatie: fade-in + bestaande beweging
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
            duration: 0.38,
            ease: "power2.inOut",
          }
        );

        if (isMobile()) {
          // Kleiner sectionHeight en kleinere gap
          const sectionHeight = window.innerHeight * 0.6; // 60% van viewport
          const folderGap = 6;
          const folderHeight = (sectionHeight - 2 * folderGap) / 3;
          const stackStartY = -120;
          const foldersOffsetY = 40; // <-- Extra ruimte onder de titel

          tl.fromTo(
            folderRefs[0].current,
            { y: "100vh", x: 0, rotation: 0, zIndex: 1 },
            {
              y: stackStartY + foldersOffsetY,
              x: 0,
              rotation: 0,
              zIndex: 1,
              duration: 0.32,
            }
          );
          tl.fromTo(
            folderRefs[1].current,
            { y: "100vh", x: 0, rotation: 0, zIndex: 2 },
            {
              y: stackStartY + foldersOffsetY + folderHeight + folderGap,
              x: 0,
              rotation: 0,
              zIndex: 2,
              duration: 0.32,
            }
          );
          tl.fromTo(
            folderRefs[2].current,
            { y: "100vh", x: 0, rotation: 0, zIndex: 3 },
            {
              y: stackStartY + foldersOffsetY + 2 * (folderHeight + folderGap),
              x: 0,
              rotation: 0,
              zIndex: 3,
              duration: 0.32,
            }
          );
        } else {
          // Desktop: bestaande animatie
          tl.fromTo(
            folderRefs[0].current,
            { y: "100vh", x: -16, rotation: 4, zIndex: 1 },
            { y: 0, x: -16, rotation: 4, zIndex: 1, duration: 0.32 }
          );
          tl.fromTo(
            folderRefs[1].current,
            { y: "100vh", x: 0, rotation: 0, zIndex: 2 },
            { y: 16, x: 0, rotation: 0, zIndex: 2, duration: 0.32 }
          );
          tl.fromTo(
            folderRefs[2].current,
            { y: "100vh", x: 16, rotation: -4, zIndex: 3 },
            { y: 32, x: 16, rotation: -4, zIndex: 3, duration: 0.32 }
          );
          tl.to(folderRefs[0].current, {
            x: "-30.5vw",
            y: "10vh",
            scale: 1,
            rotation: 0,
            zIndex: 1,
            duration: 0.32,
          });
          tl.to(
            folderRefs[1].current,
            {
              x: "0vw",
              y: "10vh",
              scale: 1,
              rotation: 0,
              zIndex: 2,
              duration: 0.32,
            },
            "<"
          );
          tl.to(
            folderRefs[2].current,
            {
              x: "30.5vw",
              y: "10vh",
              scale: 1,
              rotation: 0,
              zIndex: 3,
              duration: 0.32,
            },
            "<"
          );
        }
        tl.to({}, { duration: 0.4 });
      }, sectionRef);
    }

    createAnimation();

    window.addEventListener("resize", createAnimation);

    return () => {
      window.removeEventListener("resize", createAnimation);
      if (ctx) ctx.revert();
    };
  }, []);

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
      style={{ position: "relative" }}
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
            ref={folderRefs[i]}
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
