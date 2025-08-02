import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/aboutsection.css";
import profileImg from "../assets/images/sjonlee2.jpeg";
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    if (hasAnimated) return;

    // Set initial states
    gsap.set(titleRef.current, { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    });
    
    gsap.set(imageRef.current, { 
      opacity: 0, 
      scale: 0.8
    });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        markers: false,
        onComplete: () => setHasAnimated(true),
      }
    });

    // Phase 1: Image appears
    tl.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, 0);

    // Phase 2: Title appears over the image
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, 0.3);

    // Phase 3: Subtle parallax movement
    tl.to([imageRef.current, titleRef.current], {
      y: -30,
      duration: 1,
      ease: "power1.inOut"
    }, 1);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
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
          index: currentImageIndex
        };

        setVisibleImages(prev => [...prev, newImage]);

        // Remove image after delay
        setTimeout(() => {
          setVisibleImages(prev => prev.filter(img => img.id !== newImage.id));
        }, 1200);

        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % mouseImages.length;
        
        lastMouseX = x;
        lastMouseY = y;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
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
              zIndex: 10 + image.index
            }}
            draggable={false}
          />
        ))}

        {/* Overlay Title */}
        <div className="about-title-overlay" ref={titleRef}>
          <h1 className="about-title">
            Sjonlee Ha
          </h1>
        </div>
      </div>
    </section>
  );
} 
