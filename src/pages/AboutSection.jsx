import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/aboutsection.css";
import profileImg from "../assets/images/sjonlee.jpeg";
import img1 from "../assets/images/sjonlee2.jpeg";
import img2 from "../assets/images/sjonlee3.jpeg";
import img3 from "../assets/images/sjonlee4.jpeg";
import img4 from "../assets/images/sjonlee6.jpeg";
import img5 from "../assets/images/sjonlee7.jpeg";

gsap.registerPlugin(ScrollTrigger);

const mouseImages = [img1, img2, img3, img4, img5];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillCardsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [visibleImages, setVisibleImages] = useState([]);
  const [hoverImagesDisabled, setHoverImagesDisabled] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Set initial states
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
    });

    gsap.set(imageRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.set(descriptionRef.current, {
      opacity: 0,
      y: 30,
    });

    // Create the main timeline with ScrollTrigger for internal animations
            const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-container",
            start: "top top",
            end: "+=1200%", // Much more scroll space for smooth animations
            scrub: 3.5, // Ultra smooth scrub for professional scrolling
            pin: true,
            pinSpacing: false, // Prevents overlap
            markers: false, // Disable markers for performance
            onComplete: () => setHasAnimated(true),
          },
        });

    // Phase 1: Image appears - SMOOTH
    tl.to(
      imageRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 2.5, // Much longer
        ease: "power3.out", // Smoother easing
      },
      0
    );

    // Phase 2: Title appears over the image - SMOOTH
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2.5, // Much longer
        ease: "power3.out", // Smoother easing
      },
      0.8 // Longer delay
    );

    // Phase 3: LONGER PAUSE for reading main content (image + title)
    tl.to({}, { duration: 12 }, 1.3); // Much longer pause

    // Phase 4: Move image and title up, description appears
    tl.to(
      [imageRef.current, titleRef.current],
      {
        y: -300,
        scale: 0.8,
        duration: 2,
        ease: "power1.inOut",
      },
      13.3 // Adjusted timing
    );

    // Phase 5: Description appears - SMOOTH
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 3.0, // Much longer
        ease: "power3.out", // Smoother easing
      },
      15.3 // Adjusted timing
    );

    // Phase 6: Pause for reading description - SHORTER
    tl.to({}, { duration: 4 }, 16.3); // Shorter pause

    // Phase 7: Skill cards appear from sides with GSAP - ULTRA SMOOTH
    tl.to(
      skillCardsRef.current,
      {
        opacity: 1,
        duration: 3.0, // Slightly faster but still smooth
        ease: "power4.out", // Ultra smooth easing
      },
      20.3 // Earlier timing (was 28.3)
    );

    // Phase 7.5: Fade out description, image and title to top FIRST - ULTRA SMOOTH
    tl.to(
      [descriptionRef.current, imageRef.current, titleRef.current],
      {
        opacity: 0,
        y: -500, // Move up much much more - really disappear
        duration: 8, // Much longer duration for ultra smooth fade
        ease: "power5.inOut", // Ultra smooth easing
        onComplete: () => setHoverImagesDisabled(true), // Disable hover images after description fadeout
      },
      18.5 // Earlier timing (was 28.5)
    );

    // Phase 7.6: Individual skill cards slide up with 3D rotation to final position - ULTRA SMOOTH
    const skillCards = skillCardsRef.current?.querySelectorAll('.skill-card');
    if (skillCards) {
      tl.to(
        skillCards[0], // Left card (DESIGN) - direct to final position
        {
          opacity: 1,
          y: -20, // Direct to final position (up)
          x: -50, // Direct to final position (left)
          rotateY: 0, // Rotate to flat
          rotateX: 0, // Rotate to flat
          rotateZ: 5, // Final rotation
          duration: 4.5, // Slightly faster but still smooth
          ease: "power4.out", // Smooth easing
        },
      21.3 // Earlier timing (was 29.3)
      );
      
      tl.to(
        skillCards[1], // Right card (DEVELOPMENT) - direct to final position
        {
          opacity: 1,
          y: 20, // Direct to final position (down)
          x: 50, // Direct to final position (right)
          rotateY: 0, // Rotate to flat
          rotateX: 0, // Rotate to flat
          rotateZ: -5, // Final rotation
          duration: 4.5, // Slightly faster but still smooth
          ease: "power4.out", // Smooth easing
        },
      21.9 // Slight stagger (21.3 + 0.6)
      );
    }

    // Phase 9: Pause for reading cards - SHORTER
    tl.to({}, { duration: 25 }, 31.3); // Shorter pause

    // Phase 10: Cards fade out and move up with stagger - ULTRA SMOOTH
    const skillCardsForFadeOut = skillCardsRef.current?.querySelectorAll('.skill-card');
    if (skillCardsForFadeOut) {
      // Fade out left card first, then right card
      tl.to(
        skillCardsForFadeOut[0], // Left card (DESIGN) - fade out first
        {
          opacity: 0,
          y: -200, // Move up more
          duration: 6, // Smooth fade out
          ease: "power3.inOut", // Smooth easing
        },
      56.3 // Adjusted timing (31.3 + 25 = 56.3)
      );
      
      tl.to(
        skillCardsForFadeOut[1], // Right card (DEVELOPMENT) - fade out second
        {
          opacity: 0,
          y: -200, // Move up more
          duration: 6, // Smooth fade out
          ease: "power3.inOut", // Smooth easing
        },
      56.6 // Small delay after left card (56.3 + 0.3)
      );
    }

    // Phase 11: Extra pause to ensure everything is faded before next section
    tl.to({}, { duration: 2 }, 64.3); // Adjusted timing (56.3 + 6 + 2 = 64.3)

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [hasAnimated]);

  // Combined mouse tracking effect for both hover images and skill cards
  useEffect(() => {
    let mouseMoveTimeout;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let currentImageIndex = 0;

    const handleMouseMove = (e) => {
      // Throttle mouse events for better performance
      if (mouseMoveTimeout) return;
      
      mouseMoveTimeout = setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // === HOVER IMAGES EFFECT (only active when not disabled) ===
        // Check if mouse moved enough to trigger new image
        const distance = Math.sqrt((x - lastMouseX) ** 2 + (y - lastMouseY) ** 2);

        if (distance > 60 && !hoverImagesDisabled) {
          // Add new image at mouse position
          const newImage = {
            id: Date.now(),
            src: mouseImages[currentImageIndex],
            x: x - 75,
            y: y - 75,
            index: currentImageIndex,
          };

          setVisibleImages((prev) => [...prev, newImage]);

          // Remove image after delay
          setTimeout(() => {
            setVisibleImages((prev) =>
              prev.filter((img) => img.id !== newImage.id)
            );
          }, 1200);

          // Move to next image
          currentImageIndex = (currentImageIndex + 1) % mouseImages.length;
        }

        // === SKILL CARDS 3D EFFECT (only when skill cards are visible) ===
        const skillCards = skillCardsRef.current?.querySelectorAll('.skill-card');
        if (skillCards && skillCards.length > 0) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Only update if mouse moved significantly (performance optimization)
          const cardDistance = Math.sqrt((mouseX - lastMouseX) ** 2 + (mouseY - lastMouseY) ** 2);
          if (cardDistance > 10) {
        // Calculate center of container
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate mouse position relative to center
        const relativeX = mouseX - centerX;
        const relativeY = mouseY - centerY;

        // Calculate rotation based on mouse position
        const maxRotation = 15; // Maximum rotation in degrees
        const rotateX = -(relativeY / centerY) * maxRotation;
        const rotateY = (relativeX / centerX) * maxRotation;

        // Apply 3D transform to each skill card while preserving their skewed position
        skillCards.forEach((card, index) => {
          // Get the current skewed position from CSS
          const isLeftCard = index === 0;
          const baseX = isLeftCard ? -50 : 50; // Left card: -50px, Right card: 50px
          const baseY = isLeftCard ? -20 : 20;  // Left card: -20px, Right card: 20px
          const baseRotateZ = isLeftCard ? 5 : -5; // Left card: 5deg, Right card: -5deg
          
          card.style.transform = `
            perspective(1000px)
            translateX(${baseX}px)
            translateY(${baseY}px)
            rotateZ(${baseRotateZ}deg)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
          `;
        });
          }
        }

        lastMouseX = x;
        lastMouseY = y;
        mouseMoveTimeout = null;
      }, 32); // ~30fps for better performance
    };

    const handleMouseLeave = () => {
      // Reset skill cards to original position
      const skillCards = skillCardsRef.current?.querySelectorAll('.skill-card');
      if (skillCards) {
      skillCards.forEach((card, index) => {
        const isLeftCard = index === 0;
        const baseX = isLeftCard ? -50 : 50;
        const baseY = isLeftCard ? -20 : 20;
        const baseRotateZ = isLeftCard ? 5 : -5;
        
        card.style.transform = `
          perspective(1000px)
          translateX(${baseX}px)
          translateY(${baseY}px)
          rotateZ(${baseRotateZ}deg)
          rotateX(0deg)
          rotateY(0deg)
          translateZ(0px)
        `;
      });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [hoverImagesDisabled]);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container" ref={containerRef}>
        {/* Background Image */}
        <div className="about-image-container" ref={imageRef}>
          <img
            src={profileImg}
            alt="Sjonlee Ha"
            className="about-profile-image"
            draggable={false}
          />
        </div>

        {/* Mouse Follow Images */}
        {visibleImages.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt=""
            className="about-mouse-image"
            style={{
              left: image.x,
              top: image.y,
              zIndex: 10 + image.index,
            }}
            draggable={false}
          />
        ))}

        {/* Overlay Title */}
        <div className="about-title-overlay" ref={titleRef}>
          <h1 className="about-title">Sjonlee Ha</h1>
        </div>

        {/* Description Text - appears later */}
        <div className="about-description-container" ref={descriptionRef}>
          <div className="about-description-content">
            <p>
              Sjonlee Ha is a 24-year-old creative developer / CEO of Rinkitou
              with a big curiosity for making everything look aestethically. He
              believes vision is more than words and love learning new stuff,
              building cool things, and creating something meaningful for for
              others, myself and for my fam.
            </p>
          </div>
        </div>

        {/* Skill Cards - appear after description */}
        <div className="skill-cards-container" ref={skillCardsRef}>
          <div className="skill-card">
            <h3 className="skill-card-title">Design</h3>
            <ul className="skill-list">
              <li className="skill-item">3D DESIGN</li>
              <li className="skill-item">AESTHETICS</li>
              <li className="skill-item">GRAPHIC DESIGN</li>
              <li className="skill-item">CLOTHING</li>
              <li className="skill-item">UX/UX DESIGN</li>
            </ul>
          </div>
          
          <div className="skill-card">
            <h3 className="skill-card-title">Development</h3>
            <ul className="skill-list">
              <li className="skill-item">WEB DEVELOPMENT</li>
              <li className="skill-item">THREE.JS</li>
              <li className="skill-item">CREATIVE DEV</li>
              <li className="skill-item">REACT.JS</li>
              <li className="skill-item">TOUCHDESIGNER</li>
              <li className="skill-item">SOMETIMES</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
