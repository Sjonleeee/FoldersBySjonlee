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

const images = [img1, img2, img3, img4, img5, img6, img2, img3];

// Image starting positions - Nu onder de desktop
const IMAGE_POSITIONS = [
  { x: "-30vw", y: "-15vh" },
  { x: "30vw", y: "-15vh" },
  { x: "-35vw", y: "15vh" },
  { x: "35vw", y: "15vh" },
  { x: "-15vw", y: "25vh" },
  { x: "15vw", y: "25vh" },
  { x: "-10vw", y: "-25vh" },
  { x: "10vw", y: "-25vh" },
];

// Initial positions - Midden van het scherm (bij Sjonlee Ha)
const INITIAL_POSITIONS = images.map(() => ({ x: "0vw", y: "0vh" }));

// Animation durations - Originele versie
const DURATIONS = {
  titleFadeIn: 1.2,
  imagesFadeIn: 1.0,
  imagesMoveToCenter: 1.8,
  zoomAndDarken: 2.0,
  textFadeIn: 1.5,
  pause: 1.5,
  fadeOut: 1.5,
  imagesFadeOut: 1.2,
};

// Animation delays - Originele versie
const DELAYS = {
  afterTitle: 0.4,
  afterImagesFadeIn: 0.2,
  afterImagesMove: 0.2,
  afterZoom: 0.5,
  afterPause: 0.3,
  afterTextFadeOut: 0.3,
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
      // Cosmos-stijl cleanup - kill all related triggers
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === triggerId.current) {
          t.kill();
        }
      });
      // Force refresh to prevent glitches
      ScrollTrigger.refresh();
    };
  }, [hasAnimated]);

  const setupInitialStates = () => {
    // Set images initial positions - Midden van het scherm
    imgRefs.current.forEach((img, i) => {
      gsap.set(img, {
        x: INITIAL_POSITIONS[i].x,
        y: INITIAL_POSITIONS[i].y,
        scale: 1.0,
        opacity: 1, // Direct zichtbaar
        zIndex: 1 
      });
    });

    // Set other elements initial states - Originele versie
    gsap.set(titleRef.current, { 
      opacity: 0, 
      zIndex: 2, 
      scale: 1.2, // Originele scale
      y: "20vh" // Originele start positie
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
        end: "+=140%", // Originele scroll lengte
        scrub: 0.15, // Originele scrub waarde
        pin: true,
        id: triggerId.current,
        markers: false,
        onComplete: () => setHasAnimated(true),
      },
    });

    // PHASE 1: Epic entrance from VideoSection - Title emerges from darkness
    tl.to(titleRef.current, { 
        opacity: 1,
        y: "0vh", // Start from below and rise up
        scale: 1.2, // Start bigger and scale down
        duration: DURATIONS.titleFadeIn * 2.0, // Much longer for epic effect
        ease: "power3.out" // Epic easing
    });

    // PHASE 1.5: Title settles into position
    tl.to(titleRef.current, {
        scale: 1.0,
        y: "-5vh", // Final parallax position
        duration: DURATIONS.titleFadeIn * 1.0,
        ease: "power2.inOut"
    }, "+=0.5");

    // PHASE 2: Parallax effect - Images move to their positions with different speeds
    imgRefs.current.forEach((img, i) => {
      // Different parallax speeds for each image
      const parallaxSpeed = 0.8 + (i * 0.1); // Different speed for each image
      
      tl.to(img, {
        x: IMAGE_POSITIONS[i].x,
        y: IMAGE_POSITIONS[i].y,
        duration: 3.5 * parallaxSpeed, // Different duration for parallax effect
        ease: "power2.inOut",
      }, `+=${DELAYS.afterTitle + (i * 0.05)}`); // Staggered start for parallax
    });

    // PHASE 3: (fade-in verwijderd)

    // PHASE 4: Parallax zoom and darken - Performance geoptimaliseerd
    tl.to(zoomRef.current, {
      scale: 3.5, // Meer zoom omdat afbeeldingen kleiner zijn
      y: "10vh", // Parallax beweging naar beneden
      duration: DURATIONS.zoomAndDarken * 1.3, // Langzamer voor parallax
      ease: "power1.inOut", // Smooth easing voor parallax
    }, `+=${DELAYS.afterImagesMove}`);

    // Parallax darken overlay
    tl.to(overlayRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Minder donker voor performance
      y: "5vh", // Subtiele parallax beweging
      duration: DURATIONS.zoomAndDarken * 1.1, // Langzamer voor parallax
      ease: "power1.inOut", // Smooth easing voor parallax
    }, "<");

    // Darken images - Performance geoptimaliseerd
    tl.to(imgRefs.current.map(ref => ref).filter(Boolean), {
      filter: "brightness(0.6)", // Minder donker voor performance
      duration: DURATIONS.zoomAndDarken,
      ease: "none", // Geen easing voor performance
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

    // PHASE 7: Fade out everything together - performance geoptimaliseerd
    tl.to([titleRef.current, extraTextRef.current, ...imgRefs.current.map(ref => ref).filter(Boolean)], {
        opacity: 0,
      y: "-10vh", // Zeer subtiele fade out naar boven
      duration: 2.0, // Langzamer fade out
      ease: "none", // Geen easing voor performance
    }, `+=${DELAYS.afterZoom}`);

    // PHASE 8: Hide everything
    tl.to([titleRef.current, extraTextRef.current, ...imgRefs.current.map(ref => ref).filter(Boolean)], {
      visibility: "hidden",
      zIndex: -1,
      duration: 0,
    }, "+=0.2");

    // PHASE 9: Final cleanup
    tl.to(sectionRef.current, {
        visibility: "hidden",
        zIndex: -1,
      duration: 0,
    }, "+=0.5");

    return tl;
  };

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
                style={{ position: "absolute", zIndex: 1 }}
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
