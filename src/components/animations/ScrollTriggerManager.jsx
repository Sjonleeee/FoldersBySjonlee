import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const createScrollTriggerManager = ({
  sectionRef,
  latestProjectsRef,
  videoSectionRef,
  contactSectionRef, // Updated from companiesSectionRef
  headerRef,
  footerRef,
}) => {
  const createScrollTrigger = () => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = scrollY / maxScroll;

      // Calculate which section should be visible based on scroll position
      if (scrollProgress < 0.25) {
        // Hero section
        gsap.to(latestProjectsRef.current, { opacity: 0, y: "100vh" });
        gsap.to(videoSectionRef.current, { opacity: 0, scale: 0.5 });
        gsap.to(contactSectionRef.current, { opacity: 0, y: "100vh" });
      } else if (scrollProgress < 0.5) {
        // Latest Projects section
        gsap.to(latestProjectsRef.current, { opacity: 1, y: 0 });
        gsap.to(videoSectionRef.current, { opacity: 0, scale: 0.5 });
        gsap.to(contactSectionRef.current, { opacity: 0, y: "100vh" });
      } else {
        // Contact section
        gsap.to(latestProjectsRef.current, { opacity: 0, y: "-100vh" });
        gsap.to(videoSectionRef.current, { opacity: 0, scale: 0.5 });
        gsap.to(contactSectionRef.current, { opacity: 1, y: 0 });
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial call to set correct state
    handleScroll();

    // Return cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  };

  return { createScrollTrigger };
};