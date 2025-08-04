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
            end: "+=600%", // Much more scroll space since other sections are hidden
            scrub: 1.5, // Very smooth scrub for nice scrolling
            pin: true,
            pinSpacing: false, // Prevents overlap
            markers: false, // Disable markers for performance
            onComplete: () => setHasAnimated(true),
          },
        });

    // Phase 1: Image appears
    tl.to(
      imageRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    // Phase 2: Title appears over the image
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      0.3
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

    // Phase 5: Description appears
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      15.3 // Adjusted timing
    );

    // Phase 6: Pause for reading description
    tl.to({}, { duration: 8 }, 16.3); // Adjusted timing

    // Phase 7: Skill cards appear from sides with GSAP
    tl.to(
      skillCardsRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      28.3 // Adjusted timing
    );

    // Phase 7.5: Individual skill cards slide in with stagger
    const skillCards = skillCardsRef.current?.querySelectorAll('.skill-card');
    if (skillCards) {
      tl.to(
        skillCards,
        {
          opacity: 1,
          x: 0, // Slide to center
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2, // Stagger effect
        },
      29.3 // Adjusted timing
      );
    }

    // Phase 8: Fade out description, image and title while cards come in
    tl.to(
      [descriptionRef.current, imageRef.current, titleRef.current],
      {
        opacity: 0,
        y: -50,
        duration: 2,
        ease: "power1.inOut",
      },
      29.3 // Adjusted timing
    );

    // Phase 9: Pause for reading cards
    tl.to({}, { duration: 45 }, 31.3); // Adjusted timing

    // Phase 10: Cards fade out and move up
    tl.to(
      skillCardsRef.current,
      {
        opacity: 0,
        y: -100,
        duration: 3,
        ease: "power1.inOut",
      },
      76.3 // Adjusted timing (31.3 + 45 = 76.3)
    );

    // Phase 11: Extra pause to ensure everything is faded before next section
    tl.to({}, { duration: 2 }, 79.3); // Adjusted timing

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [hasAnimated]);

  // Mouse follow effect
  useEffect(() => {
    let lastMouseX = 0;
    let lastMouseY = 0;
    let currentImageIndex = 0;

    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse moved enough to trigger new image
      const distance = Math.sqrt((x - lastMouseX) ** 2 + (y - lastMouseY) ** 2);

      if (distance > 60) {
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

        lastMouseX = x;
        lastMouseY = y;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

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
