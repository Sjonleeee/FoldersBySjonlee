// Centralized ScrollTrigger Configuration
// This ensures all sections use consistent settings and prevent overlaps
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger only once
gsap.registerPlugin(ScrollTrigger);

export const SCROLL_TRIGGER_CONFIG = {
  // Main sections that need pinning and coordination
  MAIN_SECTIONS: {
    group: "main-sections",
    preventOverlaps: true,
    fastScrollEnd: true,
    anticipatePin: 1,
  },
  
  // About Section - Slow and comfortable viewing with better group management
  ABOUT: {
    start: "top top",
    end: "+=250%",
    scrub: 15,
    pin: true,
    pinSpacing: false,
    fastScrollEnd: false, // Slower for comfortable viewing
    group: "about-section",
    preventOverlaps: true,
    anticipatePin: 1,
  },
  
  // Latest Projects - Start after About section is completely finished
  LATEST_PROJECTS: {
    start: "top top", // Start when section top hits viewport top (much later)
    end: "+=400%", // Meer scroll ruimte voor smooth animatie
    scrub: 5, // Langzamere scrub voor smooth animatie
    pin: true,
    pinSpacing: false, // Voorkomt overlap met volgende sectie
    fastScrollEnd: true,
    group: "latest-projects-section",
    preventOverlaps: true,
    anticipatePin: 1,
  },
  
  // Folder Page - Initial section
  FOLDER_PAGE: {
    start: "top top",
    end: "+=120%",
    scrub: 3,
    pin: true,
    fastScrollEnd: true,
    group: "folder-section",
    preventOverlaps: true,
    anticipatePin: 1,
  },
  
  // Non-pinned sections (Companies, Stats, Contact)
  NON_PINNED: {
    start: "top center",
    end: "bottom center",
    scrub: 3,
    pin: false,
    fastScrollEnd: true,
  },
  
  // Contact section special config
  CONTACT: {
    start: "top 80%",
    end: "bottom 20%",
    scrub: false,
    toggleActions: "play none none reverse",
    fastScrollEnd: true,
  },
};

// Helper function to get consistent config for any section
export const getScrollTriggerConfig = (sectionType, customOverrides = {}) => {
  const baseConfig = SCROLL_TRIGGER_CONFIG[sectionType];
  
  return {
    ...baseConfig,
    ...customOverrides,
  };
};

// Helper function to create a timeline with consistent settings
export const createCoordinatedTimeline = (config, onComplete = null) => {
  const timelineConfig = {
    scrollTrigger: {
      ...config,
      markers: false, // Set to true for debugging
      onComplete,
    },
  };
  
  return gsap.timeline(timelineConfig);
};

// Debug function to check ScrollTrigger status
export const debugScrollTriggers = () => {
  const triggers = ScrollTrigger.getAll();
  console.log("Active ScrollTriggers:", triggers.length);
  triggers.forEach((trigger, index) => {
    console.log(`Trigger ${index}:`, {
      trigger: trigger.vars.trigger,
      start: trigger.vars.start,
      end: trigger.vars.end,
      group: trigger.vars.group,
      preventOverlaps: trigger.vars.preventOverlaps,
    });
  });
};

// Cleanup function to kill all ScrollTriggers
export const cleanupAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Function to refresh all ScrollTriggers
export const refreshAllScrollTriggers = () => {
  ScrollTrigger.refresh();
}; 