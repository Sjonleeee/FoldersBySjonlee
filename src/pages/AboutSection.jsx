import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../styles/aboutsection.css";
import img1 from "../assets/images/sjonlee.jpeg";
import img2 from "../assets/images/sjonlee2.jpeg";
import img3 from "../assets/images/sjonlee3.jpeg";
import img4 from "../assets/images/sjonlee4.jpeg";
import img5 from "../assets/images/sjonlee6.jpeg";
import img6 from "../assets/images/sjonlee7.jpeg";

const startPositions = [
  { x: "-40vw", y: "-20vh" },
  { x: "40vw", y: "-20vh" },
  { x: "-45vw", y: "20vh" },
  { x: "45vw", y: "20vh" },
  { x: "-20vw", y: "40vh" },
  { x: "20vw", y: "40vh" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  const titleRef = useRef(null);
  const zoomRef = useRef(null);
  const extraTextRef = useRef(null);

  useEffect(() => {
    // Zet startposities en opacity 0
    imgRefs.current.forEach((img, i) => {
      gsap.set(img, {
        x: startPositions[i].x,
        y: startPositions[i].y,
        scale: 1.1,
        opacity: 0,
        zIndex: 1,
      });
    });
    gsap.set(titleRef.current, { opacity: 1, zIndex: 2 });
    gsap.set(zoomRef.current, { scale: 1 });
    gsap.set(extraTextRef.current, { opacity: 0 });

    // Timeline animatie
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=60%",
        scrub: 1,
        pin: true,
      },
    });

    // 1. Foto's faden in en bewegen naar het midden, worden gestapeld
    imgRefs.current.forEach((img, i) => {
      tl.to(
        img,
        {
          x: "0vw",
          y: "0vh",
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          zIndex: 1,
        },
        "<+0.08"
      ); // Stagger effect
    });

    // 2. Zoom-in animatie op de hele hero
    tl.to(
      zoomRef.current,
      {
        scale: 1.18,
        duration: 1.5,
        ease: "power2.out",
      },
      "+=0.2"
    );

    // 3. Fade-in van extra tekst onder de titel
    tl.to(
      extraTextRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      ">"
    );

    return () => tl.kill();
  }, []);

  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <section className="about-hero-outer" ref={sectionRef}>
      <div className="about-hero-sticky">
        <div className="about-hero-zoom" ref={zoomRef}>
          <div className="about-hero-section">
            {images.map((src, i) => (
              <img
                key={i}
                ref={(el) => (imgRefs.current[i] = el)}
                src={src}
                className="bindery-hero-img"
                alt=""
                draggable={false}
                style={{ position: "absolute" }}
              />
            ))}
            <div className="bindery-hero-title-wrapper">
              <h1
                className="bindery-hero-title hermaiona-title-style"
                ref={titleRef}
                style={{ zIndex: 2 }}
              >
                Sjonlee Ha
              </h1>
            </div>
          </div>
        </div>
        <div
          className="about-hero-extra-text"
          ref={extraTextRef}
          style={{ opacity: 0 }}
        ></div>
      </div>
    </section>
  );
}
