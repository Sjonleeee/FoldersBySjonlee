import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
  { name: "Rinkitou", logo: "Rinkitou" },
];

export default function CompaniesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    // Set initial states
    gsap.set(titleRef.current, { opacity: 0, y: 50 });
    gsap.set(gridRef.current.children, { opacity: 0, y: 30 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 3,
        markers: false,
      },
    });

    // Title animation
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Grid items animation with stagger
    tl.to(
      gridRef.current.children,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="companies-section" ref={sectionRef}>
      <div className="companies-container">
        <h2 className="companies-title" ref={titleRef}>
          Companies I've worked with
        </h2>
        <div className="companies-grid" ref={gridRef}>
          {companies.map((company, index) => (
            <div key={index} className="company-item">
              <span className="company-logo">{company.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
