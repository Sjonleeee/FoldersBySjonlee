import { gsap } from "gsap";

export const createEntranceAnimations = ({
  creativeRef,
  developerRef,
  headerRef,
  footerRef,
  modelRef,
  topLeftRef,
  topCenterRef,
  topRightRef,
  bottomLeftRef,
  bottomRightRef,
  midRightRef,
  bottomCenterRef,
  aboutSectionRef,
  latestProjectsRef,
  onComplete,
}) => {
  // Set initial positions
  gsap.set(creativeRef.current, { x: "-100vw", opacity: 0 });
  gsap.set(developerRef.current, { x: "100vw", opacity: 0 });
  gsap.set(headerRef.current, { y: "-100vh", opacity: 0 });
  gsap.set(footerRef.current, { y: "100vh", opacity: 0 });
  gsap.set(modelRef.current, { opacity: 0 });
  gsap.set(".footer-scroll-card", { opacity: 0 });
  gsap.set(
    [
      topLeftRef.current,
      topCenterRef.current,
      topRightRef.current,
      bottomLeftRef.current,
      bottomRightRef.current,
      midRightRef.current,
      bottomCenterRef.current,
    ],
    { opacity: 0 }
  );

  // Set initial states for AboutSection and Latest Projects
  gsap.set(aboutSectionRef.current, { opacity: 0, y: "100vh" });
  gsap.set(latestProjectsRef.current, { opacity: 0, y: "100vh" });

  // Create entrance timeline
  const entranceTl = gsap.timeline({
    onComplete: () => {
      // Wait a bit more to ensure everything is settled
      setTimeout(() => {
        onComplete();
      }, 500);
    },
  });

  // 1. Creative slides in from left
  entranceTl.to(creativeRef.current, {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
  });

  // 2. Developer slides in from right (together with Creative)
  entranceTl.to(
    developerRef.current,
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    },
    "<"
  );

  // 3. Header and Footer slide in together (same time as Creative/Developer)
  entranceTl.to(
    [headerRef.current, footerRef.current],
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    },
    "<"
  );

  // 4. 3D model and all labels fade in together
  entranceTl.to(
    [
      modelRef.current,
      topLeftRef.current,
      topCenterRef.current,
      topRightRef.current,
      bottomLeftRef.current,
      bottomRightRef.current,
      midRightRef.current,
      bottomCenterRef.current,
    ],
    {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    },
    "+=0.6"
  );

  return entranceTl;
}; 