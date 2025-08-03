// Animation Manager - Coordinates all animations to prevent conflicts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerConfig, cleanupAllScrollTriggers } from "../config/scrollTriggerConfig";

class AnimationManager {
  constructor() {
    this.activeAnimations = new Map();
    this.isInitialized = false;
  }

  // Initialize the animation manager
  init() {
    if (this.isInitialized) return;
    
    // Register ScrollTrigger only once
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up global ScrollTrigger settings
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
    
    this.isInitialized = true;
    console.log("Animation Manager initialized");
  }

  // Create a coordinated animation
  createAnimation(sectionId, config, timeline) {
    // Clean up any existing animation for this section
    this.cleanupSection(sectionId);
    
    // Create the animation with proper configuration
    const animation = {
      timeline,
      config,
      sectionId,
      createdAt: Date.now(),
    };
    
    this.activeAnimations.set(sectionId, animation);
    
    return animation;
  }

  // Clean up a specific section's animations
  cleanupSection(sectionId) {
    const existing = this.activeAnimations.get(sectionId);
    if (existing && existing.timeline) {
      existing.timeline.kill();
    }
    this.activeAnimations.delete(sectionId);
    
    // Also clean up any ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.sectionId === sectionId) {
        trigger.kill();
      }
    });
  }

  // Clean up all animations
  cleanup() {
    this.activeAnimations.forEach((animation, sectionId) => {
      this.cleanupSection(sectionId);
    });
    
    // Clean up all ScrollTriggers
    cleanupAllScrollTriggers();
    
    console.log("All animations cleaned up");
  }

  // Refresh all animations
  refresh() {
    ScrollTrigger.refresh();
  }

  // Get animation status
  getStatus() {
    return {
      activeAnimations: this.activeAnimations.size,
      totalScrollTriggers: ScrollTrigger.getAll().length,
      isInitialized: this.isInitialized,
    };
  }

  // Debug function
  debug() {
    console.log("Animation Manager Status:", this.getStatus());
    console.log("Active Animations:", Array.from(this.activeAnimations.keys()));
    console.log("ScrollTriggers:", ScrollTrigger.getAll().length);
  }
}

// Export singleton instance
export const animationManager = new AnimationManager(); 