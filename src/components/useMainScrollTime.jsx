import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ONEPAGER_CONFIG } from "../config/animationConfig";

gsap.registerPlugin(ScrollTrigger);

export function useMainScrollTimeline(refs, isMobile) {
  useEffect(() => {
    if (!refs.section) return;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.section,
        start: "top top",
        end: ONEPAGER_CONFIG.scrollSpace,
        scrub: ONEPAGER_CONFIG.scrub,
        pin: true,
        pinSpacing: false,
        markers: true,
      },
    });

    const phases = [
      // Phase 1: Hero parallax animation
      () => {
        const tl = gsap.timeline().set(refs.videoSection, { opacity: 0, scale: 0.5 });

        if (isMobile) {
          tl.to(refs.creative, { y: "-100vh", duration: 6, ease: "power3.out" })
            .to(refs.developer, { y: "100vh", duration: 6, ease: "power3.out" }, "<")
            .to(refs.folder, { opacity: 0, scale: 0.5, duration: 6, ease: "power3.out" }, "<");
        } else {
          tl.to(refs.creative, { x: "-100vw", y: "-20vh", duration: 6, ease: "power3.out" })
            .to(refs.developer, { x: "100vw", y: "20vh", duration: 6, ease: "power3.out" }, "<")
            .to(refs.folder, { opacity: 0, scale: 0.5, y: "-30vh", duration: 6, ease: "power3.out" }, "<");
        }

        tl.to(
          [
            refs.topLeft,
            refs.topCenter,
            refs.topRight,
            refs.bottomLeft,
            refs.bottomRight,
            refs.midRight,
            refs.bottomCenter,
          ],
          {
            opacity: 0,
            y: (i) => (i % 2 === 0 ? "-15vh" : "15vh"),
            duration: 6,
            ease: "power3.out",
            stagger: 0.3,
          },
          "<"
        );

        return tl;
      },

      // Phase 2: Stats section fade in
      () => {
        const tl = gsap.timeline().to(refs.videoSection, {
          opacity: 1,
          scale: 1,
          y: "10vh",
          duration: 6,
          ease: "power2.out",
        });

        if (!isMobile) {
          tl.to(".stats-side.left", { x: 0, opacity: 1, duration: 4, ease: "power2.out" }, "<")
            .to(".stats-side.right", { x: 0, opacity: 1, duration: 4, ease: "power2.out" }, "<");
        }

        return tl
          .to(".stats-laptop-stack", { scale: 1, opacity: 1, duration: 4, ease: "power2.out" }, "<")
          .to(refs.model, { opacity: 0, y: "25vh", duration: 6, ease: "power3.inOut" }, "<");
      },

      // Phase 3: Transition to About section
      () =>
        gsap.timeline()
          .to(refs.videoSection, { opacity: 0, y: "-50vh", duration: 5, ease: "power3.inOut" })
          .to(refs.folder, { opacity: 0, duration: 2, ease: "power3.inOut" }, "<")
          .to(refs.aboutSection, { opacity: 1, y: 0, duration: 5, ease: "power3.out" }, "+=2"),

      // Phase 4: About placeholder pause
      () => gsap.timeline().to({}, { duration: 75 }),

      // Phase 5: Fade out About
      () => gsap.timeline().to(refs.aboutSection, { opacity: 0, y: "-50vh", duration: 8, ease: "power3.inOut" }),

      // Phase 6: Latest Projects fade in
      () => gsap.timeline().to(refs.latestProjects, { opacity: 1, y: 0, duration: 4, ease: "power3.out" }),

      // Phase 7: Latest Projects placeholder pause
      () => gsap.timeline().to({}, { duration: 100 }),

      // Phase 8: Fade out Latest Projects
      () => gsap.timeline().to(refs.latestProjects, { opacity: 0, y: "-50vh", duration: 6, ease: "power3.inOut" }),

      // Phase 9: Companies Section fade in
      () =>
        gsap.timeline()
          .set(refs.companies, { opacity: 0, y: 100, pointerEvents: "none" })
          .to(refs.companies, { opacity: 1, y: 0, pointerEvents: "auto", duration: 6, ease: "power3.out" }),

      // Phase 10: Final placeholder pause
      () => gsap.timeline().to({}, { duration: 10 }),
    ];

    // Add phases with delays from config
    phases.forEach((phaseFn, i) => {
      const delayKeys = Object.keys(ONEPAGER_CONFIG.delays);
      mainTl.add(phaseFn(), ONEPAGER_CONFIG.delays[delayKeys[i]]);
    });

    return () => {
      mainTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [
    refs.section,
    refs.creative,
    refs.developer,
    refs.folder,
    refs.videoSection,
    refs.topLeft,
    refs.topCenter,
    refs.topRight,
    refs.bottomLeft,
    refs.bottomRight,
    refs.midRight,
    refs.bottomCenter,
    refs.model,
    refs.aboutSection,
    refs.latestProjects,
    refs.companies,
    isMobile,
  ]);
}
