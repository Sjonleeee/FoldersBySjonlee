// =====================
// ANIMATION CONFIGURATION
// =====================

// OnePager Timeline Configuration
export const ONEPAGER_CONFIG = {
  scrollSpace: "+=2300%", // Total scroll space
  scrub: 2, // Smoothness
  delays: {
    afterStats: "+=2",
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

// Latest Projects Configuration
export const LATEST_PROJECTS_CONFIG = {
  scrollSpace: "+=2300%", // Meer scroll space
  scrub: 2,
  durations: {
    titleFadeIn: 6.0, // Langere title fade in
    foldersFadeIn: 2.0, // Langere folders fade in
    foldersMoveToPosition: 2.0,
    pause: 2.0, // Meer pause tijd
    fadeOut: 3.0,
  },
  delays: {
    initialPause: 6, // Meer initial pause
    afterTitle: 3.0, // Meer delay na title
    afterFoldersFadeIn: 1.5, // Meer delay na folders fade in
    afterFoldersMove: 0.8,
    afterPause: 2.0, // Meer delay na pause
  },
  stagger: 0.3, // Langere stagger
};

// Companies Section Configuration
export const COMPANIES_CONFIG = {
  scrollSpace: "+=2000%", // Adjust scroll space for smoother transitions
  scrub: 2, // Smoothness of the animation
  durations: {
    titleFadeIn: 5.0, // Duration for the title fade-in
    itemsFadeIn: 8.0, // Duration for the items fade-in
    itemsMoveToPosition: 4.0, // Duration for items moving into position
    pause: 3.0, // Pause duration to allow users to view the content
    fadeOut: 2.0, // Duration for fade-out animation
  },
  delays: {
    initialPause: 4.0, // Delay before starting the animation
    afterTitle: 2.0, // Delay after the title fade-in
    afterItemsFadeIn: 1.5, // Delay after items fade-in
    afterItemsMove: 1.0, // Delay after items move into position
    afterPause: 1.5, // Delay after the pause
  },
  stagger: 2, // Stagger effect for animating items sequentially
  fadeInEase: "power2.out", // Easing function for fade-in
  fadeOutEase: "power2.in", // Easing function for fade-out
};

// Fade Out Durations
export const FADE_OUT_CONFIG = {
  latestProjects: 0.8,
  companies: 2,
};
