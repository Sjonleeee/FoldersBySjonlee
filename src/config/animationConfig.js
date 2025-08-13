// =====================
// ANIMATION CONFIGURATION
// =====================

// OnePager Timeline Configuration
export const ONEPAGER_CONFIG = {
  scrollSpace: "+=2200%", // Total scroll space
  scrub: 2, // Smoothness
  delays: {
    afterStats: "+=20",
    afterTransition: "+=8",
    afterAbout: "+=2",
    afterAboutFadeOut: "+=3",
    afterLatestProjects: "+=1", // Space between About and Latest Projects
    afterLatestProjectsAnim: "+=25", // More time for Latest Projects animations
    afterLatestProjectsFadeOut: "+=0.5",
    afterCompanies: "+=0",
    afterFinal: "+=0.5",
  },
};

// AboutSection Timeline Configuration
export const ABOUT_CONFIG = {
  scrollSpace: "+=1200%",
  scrub: 3.5,
  durations: {
    imageFadeIn: 2.5,
    titleFadeIn: 2.5,
    mainContentPause: 12,
    imageTitleMove: 2,
    descriptionFadeIn: 3.0,
    descriptionPause: 4,
    skillCardsFadeIn: 3.0,
    descriptionFadeOut: 8,
    skillCardsMove: 4.5,
    skillCardsPause: 12, // Time to read skill cards
    extraPause: 3,
  },
  delays: {
    titleDelay: 0.8,
    mainContentDelay: 1.3,
    imageTitleDelay: 13.3,
    descriptionDelay: 15.3,
    descriptionPauseDelay: 16.3,
    skillCardsDelay: 20.3,
    descriptionFadeOutDelay: 18.5,
    skillCardsMoveDelay: 21.3,
    skillCardsPauseDelay: 26.4,
    extraPauseDelay: 39.4,
  },
  scrollTrigger: {
    skillCardsFadeOut: "top+=95% top", // When skill cards start fading
  },
};
export const LATEST_PROJECTS_CONFIG = {
  scrollSpace: "+=2000%",
  scrub: 2,
  durations: {
    titleFadeIn: 6.0,
    foldersFadeIn: 2.0, // iets langzamer fade-in
    foldersMoveToPosition: 2.0, // langzame move
    pause: 1.8,
    fadeOut: 3.0, // Duration remains the same
  },
  delays: {
    initialPause: 6.0, // Hier zet je de pauze na titel, zodat folder 1 2 seconden later start
    afterTitle: 2.0, // Zorgt dat er 2 sec tussen titel en folder animatie zit
    afterFoldersFadeIn: 1.5, // Increased delay for Volkswagen folder
    afterFoldersMove: 0.6,
    afterPause: 1.5,
  },
  stagger: 0.22,
  fadeOutAnimation: {
    y: "-100%", // Moves upwards during fade-out
    opacity: 0,
    duration: 3.0,
    ease: "power2.inOut",
  },
};
// Contact Section Configuration
export const COMPANIES_CONFIG = {
  scrollSpace: "+=1500%", // Reduced scroll space for faster animation
  scrub: 2, // Smoothness of the animation
  durations: {
    titleFadeIn: 4.0, // Faster title fade-in
    itemsFadeIn: 6.0, // Faster items fade-in
    itemsMoveToPosition: 3.0, // Faster move to position
    pause: 2.0, // Shorter pause duration
    fadeOut: 1.5, // Faster fade-out
  },
  delays: {
    initialPause: 3.0, // Shorter delay before starting the animation
    afterTitle: 1.5, // Shorter delay after the title fade-in
    afterItemsFadeIn: 1.0, // Shorter delay after items fade-in
    afterItemsMove: 0.8, // Shorter delay after items move into position
    afterPause: 1.0, // Shorter delay after the pause
  },
  stagger: 1.5, // Reduced stagger effect for faster sequential animations
  fadeInEase: "power2.out", // Easing function for fade-in
  fadeOutEase: "power2.in", // Easing function for fade-out
};

// Fade Out Durations
export const FADE_OUT_CONFIG = {
  latestProjects: 0.8,
  companies: 2,
};
