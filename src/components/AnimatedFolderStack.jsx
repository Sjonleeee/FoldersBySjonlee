import React, { useRef, useEffect, useState } from "react";
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

// Animation durations - SUPER SMOOTH
const DURATIONS = {
  titleFadeIn: 4.0, // Much longer voor ultra smooth effect
  foldersFadeIn: 3.5, // Much longer voor ultra smooth effect
  foldersMoveToPosition: 5.0, // Much longer voor ultra smooth effect
  pause: 4.0, // Meer tijd om te kijken
  fadeOut: 4.0, // Much longer fade out
};

// Animation delays - SUPER SMOOTH
const DELAYS = {
  afterTitle: 1.2, // Meer tijd tussen phases
  afterFoldersFadeIn: 0.8, // Meer tijd tussen phases
  afterFoldersMove: 0.8, // Meer tijd tussen phases
  afterPause: 1.5, // Meer tijd voor fade out
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

    const tl = gsap.timeline({
      scrollTrigger: {
        // === Latest Projects ScrollTrigger ===
        trigger: sectionRef.current,
        start: "top top", // Consistent start position
        end: "+=1500%", // Much more scroll space for ultra smooth animations
        scrub: 3, // Ultra smooth scrub for professional scrolling
        pin: true,
        pinSpacing: false, // Prevents overlap
        id: triggerId.current,
        markers: false, // Disable markers for performance
        onComplete: () => setHasAnimated(true),
      },
    });

    // PHASE 1: Pause before title appears - ULTRA SMOOTH
    tl.to({}, { duration: 16 }, 0);

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

    // PHASE 5: Pause for viewing
    tl.to({}, { duration: DURATIONS.pause });

    // PHASE 6: Additional viewing time - ULTRA SMOOTH
    tl.to({}, { duration: 6.0 }); // Much more time to enjoy the final state

    // PHASE 7: Fade out title first - ULTRA SMOOTH
    tl.to(
      titleRef.current,
      {
        opacity: 0,
        duration: 5.0, // Much longer fade out
        ease: "power2.out", // Smoother easing
      },
      `+=${DELAYS.afterPause}`
    );

    // PHASE 8: Fade out folders with stagger - ULTRA SMOOTH
    tl.to(
      folderRefs.current.map((ref) => ref.current),
      {
        opacity: 0,
        duration: DURATIONS.fadeOut,
        ease: "power2.out", // Smoother easing
        stagger: 0.4, // Much longer stagger
      },
      "+=0.8" // Meer tijd voor fade out
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

  // Track mouse X position relative to the section with throttling
  let mouseMoveTimeout;
  function handleMouseMove(e) {
    if (!sectionRef.current) return;
    
    // Throttle mouse events for better performance
    if (mouseMoveTimeout) return;
    
    mouseMoveTimeout = setTimeout(() => {
      const bounds = sectionRef.current.getBoundingClientRect();
      setMouseX(e.clientX - bounds.left);
      setMouseY(e.clientY - bounds.top);
      mouseMoveTimeout = null;
    }, 16); // ~60fps
  }

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
