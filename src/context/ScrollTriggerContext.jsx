import React, { createContext, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerConfig, debugScrollTriggers } from "../config/scrollTriggerConfig";
import { COMPANIES_CONFIG } from "../config/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerContext = createContext();

export const useScrollTrigger = () => {
  const context = useContext(ScrollTriggerContext);
  if (!context) {
    throw new Error("useScrollTrigger must be used within a ScrollTriggerProvider");
  }
  return context;
};

export const ScrollTriggerProvider = ({ children }) => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const triggersRef = useRef([]);

  // Initialize all ScrollTriggers in DOM order
  useEffect(() => {
    if (!containerRef.current) return;

    // Get all sections in DOM order
    const sections = containerRef.current.querySelectorAll("section");
    sectionsRef.current = Array.from(sections);

    // Clear existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    // Create triggers for each section in DOM order
    sectionsRef.current.forEach((section, index) => {
      const sectionType = getSectionType(section);
      if (!sectionType) return;

      const config = getScrollTriggerConfig(sectionType, {
        trigger: section,
        id: `section-${index}`,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          ...config,
          markers: false, // Set to true for debugging
          onComplete: () => {
            console.log(`Section ${index} (${sectionType}) completed`);
          },
        },
      });

      // Store the trigger for cleanup
      triggersRef.current.push(tl.scrollTrigger);

      // Add section-specific animations here if needed
      addSectionAnimations(tl, section, sectionType);
    });

    // Debug function to check all triggers
    setTimeout(() => {
      debugScrollTriggers();
    }, 1000);

    return () => {
      // Cleanup all triggers
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  // Helper function to determine section type
  const getSectionType = (section) => {
    if (section.querySelector(".about-container")) return "ABOUT";
    if (section.querySelector(".latest-projects-hero")) return "LATEST_PROJECTS";
    if (section.querySelector(".companies-section")) return "COMPANIES";
    if (section.querySelector(".stats-video-section")) return "NON_PINNED";
    if (section.querySelector(".folder-page")) return "FOLDER_PAGE";
    return null;
  };

  // Add section-specific animations
  const addSectionAnimations = (tl, section, sectionType) => {
    if (sectionType === "COMPANIES") {
      tl.fromTo(section, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: COMPANIES_CONFIG.durations.titleFadeIn,
        ease: COMPANIES_CONFIG.fadeInEase,
      });
      tl.fromTo(section.querySelectorAll(".company-item"), {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        stagger: COMPANIES_CONFIG.stagger,
        duration: COMPANIES_CONFIG.durations.itemsFadeIn,
        ease: COMPANIES_CONFIG.fadeInEase,
      });
      tl.to(section, {
        opacity: 0,
        duration: COMPANIES_CONFIG.durations.fadeOut,
        ease: COMPANIES_CONFIG.fadeOutEase,
      });
    }
  };

  const value = {
    containerRef,
    sectionsRef,
    triggersRef,
    debugScrollTriggers,
  };

  return (
    <ScrollTriggerContext.Provider value={value}>
      {children}
    </ScrollTriggerContext.Provider>
  );
};