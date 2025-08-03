import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerConfig } from "../config/scrollTriggerConfig";
import FolderCard from "./FolderCard";
import "../styles/latestprojects.css";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.MP4";

const folders = [
  {
    fancy: "V",
    title: "Volkswagen Project",
    subtitle: "®",
    tags: ["UX / UI", "Interface Design", "Concept"],
    video: video1,
  },
  {
    fancy: "C",
    title: "Chrome Magazine",
    subtitle: "®",
    tags: ["Magazine design", "Graphic Assistant", "Video editting"],
    video: video2,
  },
  {
    fancy: "R",
    title: "Rinkitou Creative Agency",
    subtitle: "®",
    tags: ["Branding", "Entrepreneurship", "Management"],
    video: video3,
  },
];

// Animation durations - Performance geoptimaliseerd
const DURATIONS = {
  titleFadeIn: 1.5, // Smooth voor mobile
  foldersFadeIn: 1.2, // Smooth voor mobile
  foldersMoveToPosition: 2.0, // Smooth voor mobile
  pause: 1.5, // Kortere pause
  fadeOut: 1.5, // Smooth voor mobile
};

// Animation delays - Performance geoptimaliseerd
const DELAYS = {
  afterTitle: 0.3, // Smooth delays
  afterFoldersFadeIn: 0.2, // Smooth delays
  afterFoldersMove: 0.2, // Smooth delays
  afterPause: 0.4, // Smooth delays
};

function AnimatedFolderStack() {
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

    // Use GSAP context for better cleanup and performance
    const ctx = gsap.context(() => {
      // Set initial states with better performance
      gsap.set([titleRef.current, ...folderRefs.current.map(ref => ref.current)], {
        clearProps: "all" // Clear any existing animations
      });

      // Set initial states
      setupInitialStates();

      // Create animation timeline
      createAnimationTimeline();

    }, sectionRef); // Scope to section for better cleanup

    return () => {
      // Better cleanup with context revert
      ctx.revert();
    };
  }, [hasAnimated]);

  const setupInitialStates = () => {
    function isMobile() {
      return window.innerWidth <= 600;
    }

    // Set title initial state
    gsap.set(titleRef.current, {
      top: "50%",
      transform: "translateX(-50%)",
      fontSize: "8.4rem",
      opacity: 0,
    });

    // Set folders initial states
    folderRefs.current.forEach((ref, i) => {
      gsap.set(ref.current, {
        y: "100vh",
        x: isMobile() ? 0 : i === 0 ? -16 : i === 2 ? 16 : 0,
        rotation: isMobile() ? 0 : i === 0 ? 4 : i === 2 ? -4 : 0,
        zIndex: i + 1,
        opacity: 0,
      });
    });
  };

  const createAnimationTimeline = () => {
    function isMobile() {
      return window.innerWidth <= 600;
    }

    // Use centralized config but with custom settings for this specific animation
    const config = getScrollTriggerConfig("LATEST_PROJECTS", {
      trigger: sectionRef.current,
      start: "top bottom", // Start when section top hits viewport bottom (after About)
      end: "+=200%", // Meer scroll ruimte voor smooth animatie
      scrub: 5, // Langzamere scrub voor smooth animatie
      pin: true,
      pinSpacing: false, // Voorkomt overlap met volgende sectie
      id: triggerId.current,
      markers: false, // Disable markers for smooth performance
      onComplete: () => setHasAnimated(true),
    });

    const tl = gsap.timeline({
      scrollTrigger: config,
      // Better timeline defaults
      defaults: {
        ease: "power2.out",
        duration: 1,
      }
    });

    // PHASE 1: Pause before title appears
    tl.to({}, { duration: 8 }, 0);

    // PHASE 2: Title fade in - Smooth en natuurlijk
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
        duration: DURATIONS.titleFadeIn,
        ease: "power3.out", // Soepelere easing
      },
      2
    );

    // PHASE 3: Folders fade in with stagger - Smooth
    tl.to(
      folderRefs.current.map((ref) => ref.current),
      {
        opacity: 1,
        duration: DURATIONS.foldersFadeIn,
        ease: "power2.out", // Smooth easing
        stagger: 0.3, // Smooth stagger voor mobile
      },
      `+=${DELAYS.afterTitle}`
    );

    if (isMobile()) {
      // PHASE 3A: Mobile - Folders move to stack position - Smooth
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
            duration: DURATIONS.foldersMoveToPosition,
            ease: "power2.inOut", // Smooth easing voor mobile
          },
          `+=${DELAYS.afterFoldersFadeIn}`
        );
      });
    } else {
      // PHASE 3B: Desktop - Folders move to initial positions - Smooth
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
            duration: DURATIONS.foldersMoveToPosition,
            ease: "power2.inOut", // Smooth easing
          },
          `+=${DELAYS.afterFoldersFadeIn}`
        );
      });

      // PHASE 4: Desktop - Folders move to final positions - Smooth
      tl.to(
        folderRefs.current[0].current,
        {
          x: "-30.5vw",
          y: "10vh",
          scale: 1,
          rotation: 0,
          zIndex: 1,
          duration: DURATIONS.foldersMoveToPosition,
          ease: "power2.inOut", // Smooth easing
        },
        `+=${DELAYS.afterFoldersMove}`
      );

      tl.to(
        folderRefs.current[1].current,
        {
          x: "0vw",
          y: "10vh",
          scale: 1,
          rotation: 0,
          zIndex: 2,
          duration: DURATIONS.foldersMoveToPosition,
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
          duration: DURATIONS.foldersMoveToPosition,
          ease: "power2.inOut", // Smooth easing
        },
        "<"
      );
    }

    // PHASE 5: Pause for viewing - KORTER
    tl.to({}, { duration: DURATIONS.pause });

    // PHASE 6: Additional viewing time - KORTER
    tl.to({}, { duration: 1.0 }); // Extra 1 seconde voor viewing

    // PHASE 7: Fade out title first - SNEL
    tl.to(
      titleRef.current,
      {
        opacity: 0,
        duration: 1.0,
        ease: "power1.out",
      },
      `+=${DELAYS.afterPause}`
    );

    // PHASE 8: Fade out folders with stagger - SNEL
    tl.to(
      folderRefs.current.map((ref) => ref.current),
      {
        opacity: 0,
        duration: DURATIONS.fadeOut,
        ease: "power1.out",
        stagger: 0.05, // Snellere stagger
      },
      "+=0.2"
    );

    // PHASE 9: Hide everything
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
