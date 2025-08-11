import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FolderCard from "./FolderCard";
import "../styles/latestprojects.css";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.MP4";
import { LATEST_PROJECTS_CONFIG } from "../config/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const folders = [
  {
    fancy: "V",
    title: "Volkswagen Project",
    subtitle: "®",
    tags: [
      "UX / UI",
      "Elevator pitching",
      "Interface Design",
      "Concept",
      "3D Design",
    ],
    video: video1,
  },
  {
    fancy: "C",
    title: "Chrome Magazine",
    subtitle: "®",
    tags: [
      "Magazine design",
      "Graphic Assistant",
      "Video editting",
      "Concept",
      "3D Design",
    ],
    video: video2,
  },
  {
    fancy: "R",
    title: "Rinkitou Creative Agency",
    subtitle: "®",
    tags: [
      "Branding",
      "Entrepreneurship",
      "Video Editing",
      "Clothing Engineering",
      "Webeshops",
      "Concept Thinking",
    ],
    video: video3,
  },
];

function AnimatedFolderStack({ setSelectedProject }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const folderRefs = useRef(folders.map(() => React.createRef()));
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggerId = useRef(`latest-projects-${Math.random()}`);

  useEffect(() => {
    // Clean up existing trigger
    const existingTrigger = ScrollTrigger.getById(triggerId.current);
    if (existingTrigger) existingTrigger.kill();

    if (hasAnimated) return;

    // Set initial states
    setupInitialStates();

    // Create animation timeline
    const timeline = createAnimationTimeline();

    return () => {
      timeline.kill();
      // Cosmos-stijl cleanup - kill all related triggers
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === triggerId.current) {
          t.kill();
        }
      });
      // Force refresh to prevent glitches
      ScrollTrigger.refresh();
    };
  }, [hasAnimated]);

  // Optimize isMobile function by moving it outside to avoid redefinition
  const isMobile = () => window.innerWidth <= 600;

  // Optimize setupInitialStates
  const setupInitialStates = () => {
    gsap.set(titleRef.current, {
      top: "50%",
      transform: "translateX(-50%)",
      fontSize: "8.4rem",
      opacity: 0,
      visibility: "hidden",
      willChange: "transform, opacity",
    });

    folderRefs.current.forEach((ref, i) => {
      const x = isMobile() ? 0 : i === 0 ? -16 : i === 2 ? 16 : 0;
      const rotation = isMobile() ? 0 : i === 0 ? 4 : i === 2 ? -4 : 0;
      gsap.set(ref.current, {
        y: "100vh",
        x,
        rotation,
        zIndex: i + 1,
        opacity: 0,
        visibility: "hidden",
        willChange: "transform, opacity",
      });
    });
  };

  const createAnimationTimeline = () => {
    function isMobile() {
      return window.innerWidth <= 600;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        // === Latest Projects ScrollTrigger ===
        trigger: sectionRef.current,
        start: "top top", // Consistent start position
        end: LATEST_PROJECTS_CONFIG.scrollSpace, // Much more scroll space to see full animation
        scrub: LATEST_PROJECTS_CONFIG.scrub, // Smooth scrub for elegant response
        pin: true,
        pinSpacing: false, // Prevents overlap
        id: triggerId.current,
        markers: false, // Disable markers for performance
        onComplete: () => setHasAnimated(true),
      },
    });

    // PHASE 1: Pause before title appears - TITLE FIRST
    tl.to({}, { duration: LATEST_PROJECTS_CONFIG.delays.initialPause }, 0);

    // PHASE 2: Title fade in - TITLE FIRST
    tl.fromTo(
      titleRef.current,
      {
        top: "50%",
        transform: "translateX(-50%)",
        fontSize: "8.4rem",
        opacity: 0,
        visibility: "hidden",
      },
      {
        top: "15vh",
        fontSize: "8.4rem",
        opacity: 1,
        visibility: "visible",
        duration: LATEST_PROJECTS_CONFIG.durations.titleFadeIn,
        ease: "power3.out", // Smooth easing
      },
      LATEST_PROJECTS_CONFIG.delays.initialPause
    );

    // PHASE 3: Pause after title appears - SMOOTH FLOW
    tl.to({}, { duration: 2 }, `+=3.0`); // Smooth pause to see title

    // PHASE 4: Folders fade in with stagger - LATER IN SCROLL
    tl.to(
      folderRefs.current.map((ref) => ref.current),
      {
        opacity: 1,
        visibility: "visible",
        duration: LATEST_PROJECTS_CONFIG.durations.foldersFadeIn,
        ease: "power2.out", // Smooth easing
        stagger: LATEST_PROJECTS_CONFIG.stagger, // Smooth stagger for elegant appearance
      },
      `+=${LATEST_PROJECTS_CONFIG.delays.afterTitle + 8}` // +8 extra delay voor later animatie
    );

    if (isMobile()) {
      // PHASE 3A: Mobile - Folders move to stack position - LATER
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
            y: stackStartY + foldersOffsetY + i * (folderHeight + folderGap),
            x: 0,
            rotation: 0,
            zIndex: i + 1,
            duration: LATEST_PROJECTS_CONFIG.durations.foldersMoveToPosition,
            ease: "power2.inOut", // Smooth easing voor mobile
          },
          `+=${LATEST_PROJECTS_CONFIG.delays.afterFoldersFadeIn + 4}` // +4 extra delay
        );
      });
    } else {
      // PHASE 3B: Desktop - Folders komen LATER omhoog naar centrale stapel
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
            duration: LATEST_PROJECTS_CONFIG.durations.foldersMoveToPosition,
            ease: "power2.inOut", // Smooth easing
          },
          `+=${LATEST_PROJECTS_CONFIG.delays.afterFoldersFadeIn + 4}` // +4 extra delay
        );
      });

      // PHASE 5: Desktop - Folders move to final positions - NOG LATER
      tl.to(
        folderRefs.current[0].current,
        {
          x: "-30.5vw",
          y: "10vh",
          scale: 1,
          rotation: 0,
          zIndex: 1,
          duration: LATEST_PROJECTS_CONFIG.durations.foldersMoveToPosition,
          ease: "power2.inOut", // Smooth easing
        },
        `+=${LATEST_PROJECTS_CONFIG.delays.afterFoldersMove + 6}` // +6 extra delay
      );

      tl.to(
        folderRefs.current[1].current,
        {
          x: "0vw",
          y: "10vh",
          scale: 1,
          rotation: 0,
          zIndex: 2,
          duration: LATEST_PROJECTS_CONFIG.durations.foldersMoveToPosition,
          ease: "power2.inOut", // Smooth easing
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
          duration: LATEST_PROJECTS_CONFIG.durations.foldersMoveToPosition,
          ease: "power2.inOut", // Smooth easing
        },
        "<"
      );
    }

    // PHASE 6: Pause for viewing - ORIGINAL FLOW
    tl.to({}, { duration: LATEST_PROJECTS_CONFIG.durations.pause });

    // PHASE 7: Additional viewing time - FULL ANIMATION VISIBLE
    tl.to({}, { duration: 8.0 }); // Much more time to enjoy the final state

    // PHASE 8: Fade out title first - ORIGINAL FLOW
    tl.to(
      titleRef.current,
      {
        opacity: 0,
        duration: 4.0, // Longer fade out
        ease: "power2.out", // Smooth easing
      },
      `+=${LATEST_PROJECTS_CONFIG.delays.afterPause}`
    );

    // PHASE 9: Fade out folders with stagger - ORIGINAL FLOW
    tl.to(
      folderRefs.current.map((ref) => ref.current),
      {
        opacity: 0,
        duration: LATEST_PROJECTS_CONFIG.durations.fadeOut,
        ease: "power2.out", // Smooth easing
        stagger: 0.4, // Original stagger
      },
      "+=0.8" // More time for fade out
    );

    // PHASE 10: Hide everything - ORIGINAL FLOW
    tl.to(
      [
        ...folderRefs.current.map((ref) => ref.current),
        titleRef.current,
        sectionRef.current,
      ],
      {
        visibility: "hidden",
        zIndex: -1,
        display: "none",
        duration: 0,
      },
      "+=0.3"
    );

    return tl;
  };

  // Track mouse X position relative to the section with optimized throttling
  let mouseMoveTimeout;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Optimize handleMouseMove with better throttling
  const handleMouseMove = (e) => {
    if (!sectionRef.current || mouseMoveTimeout) return;

    mouseMoveTimeout = setTimeout(() => {
      const bounds = sectionRef.current.getBoundingClientRect();
      const newMouseX = e.clientX - bounds.left;
      const newMouseY = e.clientY - bounds.top;

      const distance = Math.sqrt(
        (newMouseX - lastMouseX) ** 2 + (newMouseY - lastMouseY) ** 2
      );
      if (distance > 10) {
        setMouseX(newMouseX);
        setMouseY(newMouseY);
        lastMouseX = newMouseX;
        lastMouseY = newMouseY;
      }

      mouseMoveTimeout = null;
    }, 50); // ~20fps
  };

  function handleMouseLeave() {
    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = null;
    }
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
      {/* Title */}
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

      {/* Folder cards */}
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
              width: window.innerWidth > 600 ? "500px" : "100%", // Fixed width for desktop
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
              setSelectedProject={setSelectedProject}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnimatedFolderStack;
