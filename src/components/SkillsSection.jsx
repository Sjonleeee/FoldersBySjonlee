import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerConfig } from "../config/scrollTriggerConfig";
import "../styles/skillssection.css";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const skillCardsRef = useRef(null);
  const hasShownSkillCards = useRef(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Use GSAP context for better cleanup and performance
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(skillCardsRef.current, {
        clearProps: "all"
      });

      gsap.set(skillCardsRef.current, {
        opacity: 0,
      });

      // Create the main timeline with improved ScrollTrigger config
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
        defaults: {
          ease: "power2.out",
          duration: 1,
        }
      });

      // Phase 1: Initial pause to ensure About section is finished
      tl.to({}, { duration: 1 }, 0);

      // Phase 2: Skill cards container becomes visible
      tl.to(skillCardsRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onStart: () => {
          if (hasShownSkillCards.current) return;

          // Add visible class to cards for staggered animation
          const cards = skillCardsRef.current?.querySelectorAll('.skill-card');
          cards?.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 200); // Shorter stagger for better flow
          });

          hasShownSkillCards.current = true;
        }
      }, 1);

      // Phase 3: Pause for reading cards (shorter)
      tl.to({}, { duration: 4 }, 2);

      // Phase 4: Cards fade out
      tl.to(skillCardsRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power2.inOut",
      }, 6);

      // Phase 5: Final pause to ensure complete fade (shorter)
      tl.to({}, { duration: 0.5 }, 7.5);

      // Note: Section will be hidden by ScrollTrigger onLeave callback
      // instead of hiding it here to allow Latest Projects section to be visible

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [hasAnimated]);

  // Reset skill cards state when section is completed
  useEffect(() => {
    if (!hasAnimated) return;
    hasShownSkillCards.current = false;
  }, [hasAnimated]);

  return (
    <section className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        {/* Skill Cards */}
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