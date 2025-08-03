// Simple ScrollTrigger Configuration
// Clean, working setup without complexity

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger is already registered in scrollTriggerConfig.js

// Simple section configurations
export const SECTION_CONFIGS = {
  // About Section - Slow and comfortable
  ABOUT: {
    start: "top top",
    end: "+=300%",
    scrub: 15,
    pin: true,
    pinSpacing: false,
  },
  
  // Latest Projects - Medium speed
  LATEST_PROJECTS: {
    start: "top top",
    end: "+=200%",
    scrub: 8,
    pin: true,
    pinSpacing: false,
  },
  
  // Other sections - Simple animations
  OTHERS: {
    start: "top center",
    end: "bottom center",
    scrub: 3,
    pin: false,
  },
};

// Simple function to create a timeline
export const createSimpleTimeline = (trigger, config, onComplete = null) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      ...config,
      markers: false,
      onComplete,
    },
  });
}; 