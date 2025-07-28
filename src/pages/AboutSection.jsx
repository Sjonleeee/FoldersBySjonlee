import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/aboutsection.css";
import img1 from "../assets/images/sjonlee.jpeg";
import img2 from "../assets/images/sjonlee2.jpeg";
import img3 from "../assets/images/sjonlee3.jpeg";
import img4 from "../assets/images/sjonlee4.jpeg";
import img5 from "../assets/images/sjonlee6.jpeg";
import img6 from "../assets/images/sjonlee7.jpeg";

gsap.registerPlugin(ScrollTrigger);

// Image starting positions
const IMAGE_POSITIONS = [
  { x: "-40vw", y: "-20vh" },
  { x: "40vw", y: "-20vh" },
  { x: "-45vw", y: "20vh" },
  { x: "45vw", y: "20vh" },
  { x: "-20vw", y: "40vh" },
  { x: "20vw", y: "40vh" },
  { x: "-15vw", y: "-40vh" },
  { x: "15vw", y: "-40vh" },
];

// Animation durations
const DURATIONS = {
  titleFadeIn: 1.6, // 1.2 * 1.3
  imagesFadeIn: 1.3, // 1.0 * 1.3
  imagesMoveToCenter: 2.3, // 1.8 * 1.3
  zoomAndDarken: 2.6, // 2.0 * 1.3
  textFadeIn: 2.0, // 1.5 * 1.3
  pause: 1.2, // unchanged
  fadeOut: 1.3, // 1.0 * 1.3
  imagesFadeOut: 1.0, // 0.8 * 1.3
};

// Animation delays
const DELAYS = {
  afterTitle: 0.4, // Increased for smoother transition
  afterImagesFadeIn: 0.5, // Increased for smoother transition
  afterImagesMove: 0.3, // Increased for smoother transition
  afterZoom: 0.6, // Increased for more reading time
  afterPause: 0.3, // Increased for more reading time
  afterTextFadeOut: 0.4, // Increased for more reading time
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  const titleRef = useRef(null);
  const zoomRef = useRef(null);
  const extraTextRef = useRef(null);
  const overlayRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggerId = useRef(`about-section-${Math.random()}`);

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
      // Only kill triggers with our specific ID
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === triggerId.current) t.kill();
      });
    };
  }, [hasAnimated]);

  const setupInitialStates = () => {
    // Set images initial positions
    imgRefs.current.forEach((img, i) => {
      gsap.set(img, {
        x: IMAGE_POSITIONS[i].x,
        y: IMAGE_POSITIONS[i].y,
        scale: 1.1,
        opacity: 0,
        zIndex: 1,
        filter: "brightness(1)",
      });
    });

    // Set other elements initial states
    gsap.set(titleRef.current, { 
      opacity: 0, 
      zIndex: 2, 
      scale: 1, 
      y: "8vh" 
    });
    gsap.set(zoomRef.current, { scale: 1 });
    gsap.set(extraTextRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, { 
      backgroundColor: "rgba(0, 0, 0, 0)",
      opacity: 1,
      zIndex: 1 
    });
  };

  const createAnimationTimeline = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        // === AboutSection ScrollTrigger ===
        trigger: sectionRef.current,
        start: "top top",
        end: "+=130%", // Much longer scroll for more time
        scrub: 2.0, // Increased scrub for smoother feel
        pin: true,
        id: triggerId.current,
        markers: true, // Show GSAP markers for debugging
        onComplete: () => setHasAnimated(true),
      },
    });

    // PHASE 1: Title fade in
    tl.to(titleRef.current, { 
      opacity: 1, 
      duration: DURATIONS.titleFadeIn, 
      ease: "power2.out" 
    });

    // PHASE 2: Images fade in
    tl.to(imgRefs.current, {
      opacity: 1,
      duration: DURATIONS.imagesFadeIn,
      ease: "power2.out",
      stagger: 0.15, // Increased stagger for smoother effect
    }, `+=${DELAYS.afterTitle}`);

    // PHASE 3: Images move to center
    tl.to(imgRefs.current, {
      x: "0vw",
      y: "0vh",
      scale: 1,
      duration: DURATIONS.imagesMoveToCenter,
      ease: "power1.inOut", // Smoother easing
      stagger: 0.08, // Increased stagger for smoother movement
    }, `+=${DELAYS.afterImagesFadeIn}`);

    // PHASE 4: Zoom and darken (all together)
    tl.to(zoomRef.current, {
      scale: 5,
      duration: DURATIONS.zoomAndDarken,
      ease: "power1.out", // Smoother easing for zoom
    }, `+=${DELAYS.afterImagesMove}`);

    // Darken overlay
    tl.to(overlayRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      duration: DURATIONS.zoomAndDarken,
      ease: "power1.out", // Smoother easing
    }, "<");

    // Darken images - CHANGE THIS LINE
    tl.to(imgRefs.current, {
      filter: "brightness(0.8) saturate(1.1)", // Changed from 0.6 to 0.8
      duration: DURATIONS.zoomAndDarken,
      ease: "power1.out", // Smoother easing
    }, "<");

    // Scale title
    tl.to(titleRef.current, {
      scale: 1.05,
      y: "2rem",
      duration: DURATIONS.zoomAndDarken,
      ease: "power1.inOut",
    }, "<");

    // Show extra text
    tl.to(extraTextRef.current, {
      opacity: 1,
      duration: DURATIONS.textFadeIn,
      ease: "power2.out",
    }, "<");

    // PHASE 5: Pause for reading
    tl.to({}, { duration: DURATIONS.pause });

    // PHASE 6: Additional reading time
    tl.to({}, { duration: 2.0 }); // Extra 2 seconds for reading

    // PHASE 7: Fade out title first
    tl.to(titleRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power1.out",
    }, `+=${DELAYS.afterZoom}`);

    // PHASE 8: Fade out extra text
    tl.to(extraTextRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power1.out",
    }, "+=0.3");

    // PHASE 9: Hide text elements
    tl.to([titleRef.current, extraTextRef.current], {
      visibility: "hidden",
      zIndex: -1,
      duration: 0,
    }, "+=0.2");

    // PHASE 10: Additional pause before images fade
    tl.to({}, { duration: 1.0 }); // Extra pause before images fade

    // PHASE 11: Fade out images with stagger
    tl.to(imgRefs.current, {
      opacity: 0,
      duration: 1.0,
      ease: "power1.out",
      stagger: 0.08, // Stagger effect for smoother fade
    }, `+=${DELAYS.afterTextFadeOut}`);

    // PHASE 12: Hide images completely
    tl.to(imgRefs.current, {
      visibility: "hidden",
      zIndex: -1,
      duration: 0,
    }, "+=0.5");

    return tl;
  };

  const images = [img1, img2, img3, img4, img5, img6, img2, img3];

  return (
    <section className="about-hero-outer" ref={sectionRef}>
      <div className="about-hero-sticky">
        {/* Title */}
        <div className="bindery-hero-title-wrapper" ref={titleRef}>
          <h1 className="bindery-hero-title hermaiona-title-style" style={{ zIndex: 2 }}>
            Sjonlee Ha
          </h1>
          <div className="about-hero-extra-text" ref={extraTextRef} style={{ opacity: 0 }}>
            <p>
              is a 24-year-old creative developer / CEO of Rinkitou with a big
              curiosity for how things work and how they're made. He believes
              vision is more than words — and love learning new stuff, building
              cool things, and creating something meaningful for for others,
              myself and for my fam.
            </p>
          </div>
        </div>
        
        {/* Images */}
        <div className="about-hero-zoom" ref={zoomRef}>
          <div className="about-hero-section">
            {images.map((src, i) => (
              <img
                key={i}
                ref={(el) => (imgRefs.current[i] = el)}
                src={src}
                className="bindery-hero-img"
                alt=""
                draggable={false}
                style={{ position: "absolute" }}
              />
            ))}
            <div
              className="about-hero-overlay"
              ref={overlayRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0)",
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
