// Simple ScrollTrigger Manager
// Just works, no complexity

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION_CONFIGS, createSimpleTimeline } from "../config/simpleScrollConfig";

// ScrollTrigger is already registered in scrollTriggerConfig.js

class SimpleScrollManager {
  constructor() {
    this.triggers = [];
    this.sections = [];
  }

  // Initialize all sections in DOM order
  init(container) {
    this.cleanup();
    
    if (!container) return;
    
    // Get all sections in DOM order
    this.sections = Array.from(container.querySelectorAll("section"));
    
    // Create triggers for each section
    this.sections.forEach((section, index) => {
      const config = this.getConfigForSection(section);
      if (!config) return;
      
      const tl = createSimpleTimeline(section, config, () => {
        console.log(`Section ${index} completed`);
      });
      
      this.triggers.push(tl.scrollTrigger);
    });
    
    console.log(`Initialized ${this.triggers.length} sections`);
  }

  // Get config based on section content
  getConfigForSection(section) {
    if (section.querySelector(".about-container")) {
      return SECTION_CONFIGS.ABOUT;
    }
    if (section.querySelector(".latest-projects-hero")) {
      return SECTION_CONFIGS.LATEST_PROJECTS;
    }
    return SECTION_CONFIGS.OTHERS;
  }

  // Cleanup all triggers
  cleanup() {
    this.triggers.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    this.triggers = [];
    this.sections = [];
  }

  // Refresh triggers
  refresh() {
    ScrollTrigger.refresh();
  }
}

// Export singleton instance
export const scrollManager = new SimpleScrollManager(); 