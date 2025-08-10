import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { getScrollTriggerConfig } from "../config/scrollTriggerConfig";
import "../styles/skillssection.css";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const skillCardsRef = useRef(null);
  const hasShownSkillCards = useRef(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return; // prevent rerunning animation

    const ctx = gsap.context(() => {
      // Reset any inline styles on skillCards container for clean start
      gsap.set(skillCardsRef.current, { clearProps: "all", opacity: 0, y: 0 });

      const config = getScrollTriggerConfig("SKILLS", {
        trigger: sectionRef.current,
        onComplete: () => setHasAnimated(true),
        group: "skills-section",
        preventOverlaps: true,
        fastScrollEnd: false,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: config,
        defaults: { ease: "power2.out", duration: 1 },
      });

      // 1. Pause briefly at start (waiting for About section)
      tl.to({}, { duration: 1 }, 0);

      // 2. Fade in skill cards container & stagger adding "visible" class to children
      tl.to(skillCardsRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onStart: () => {
          if (hasShownSkillCards.current) return;

          const cards = skillCardsRef.current.querySelectorAll(".skill-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, index * 200); // stagger faster for smooth flow
          });

          hasShownSkillCards.current = true;
        },
      }, 1);

      // 3. Hold visible for reading time (reduced from 5 to 4 seconds)
      tl.to({}, { duration: 4 }, 2);

      // 4. Fade out skill cards container with upward move
      tl.to(skillCardsRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power2.inOut",
      }, 6);

      // 5. Small pause after fade out to finish smoothly
      tl.to({}, { duration: 0.5 }, 7.5);

      // Section visibility handled by ScrollTrigger callbacks outside this timeline

    }, sectionRef);

    return () => ctx.revert(); // cleanup GSAP context on unmount or re-run
  }, [hasAnimated]);

  // Reset internal state if needed after animation completes (if you rerun animations)
  useEffect(() => {
    if (!hasAnimated) return;
    hasShownSkillCards.current = false;
  }, [hasAnimated]);

  return (
    <section className="skills-section" ref={sectionRef}>
      <div className="skills-container">
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
