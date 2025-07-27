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
  { x: "-15vw", y: "-40vh" }, // Nieuwe foto boven links - meer naar rechts
  { x: "15vw", y: "-40vh" },  // Nieuwe foto boven rechts - meer naar links
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  const titleRef = useRef(null);
  const zoomRef = useRef(null);
  const extraTextRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Zet startposities - alles start met opacity 0
    imgRefs.current.forEach((img, i) => {
      gsap.set(img, {
        x: startPositions[i].x,
        y: startPositions[i].y,
        scale: 1.1,
        opacity: 0, // Foto's starten onzichtbaar
        zIndex: 1,
      });
    });
    gsap.set(titleRef.current, { opacity: 0, zIndex: 2, scale: 1, y: "8vh" }); // Titel ook onzichtbaar
    gsap.set(zoomRef.current, { scale: 1 });
    gsap.set(extraTextRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0, zIndex: 1 });

    // Timeline animatie
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%", // Nog meer scroll ruimte voor 3 sec extra leestijd
        scrub: 1,
        pin: true,
      },
    });

    // 0. Eerst een pauze zodat je alles kunt zien
    tl.to({}, { duration: 1 });

    // 1. Eerst Sjonlee Ha fade-in
    tl.to(titleRef.current, { opacity: 1, duration: 1.2, ease: "power3.out" });
    
    // 2. Dan één voor één de foto's fade-in (speciale volgorde)
    // Foto 1 (img1)
    tl.to(imgRefs.current[0], {
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "+=0.3");
    
    // Foto 7 & 8 (img2 & img3 hergebruikt) - als 2e en 3e
    tl.to(imgRefs.current[6], {
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "+=0.3");
    
    tl.to(imgRefs.current[7], {
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "+=0.3");
    
    // Foto 2, 3, 4, 5, 6 (originele volgorde)
    for (let i = 1; i <= 5; i++) {
      tl.to(imgRefs.current[i], {
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }, "+=0.3");
    }

    // 3. Foto's bewegen naar het midden, worden gestapeld (met klein tijdverschil)
    imgRefs.current.forEach((img, i) => {
      tl.to(
        img,
        {
          x: "0vw",
          y: "0vh",
          scale: 1,
          duration: 1.8,
          ease: "power2.inOut",
          zIndex: 1,
        },
        "<+0.1" // Klein tijdverschil van 0.1s tussen elke foto
      );
    });

    // 4. Zoom-in animatie op de hele hero (fullscreen effect)
    tl.to(
      zoomRef.current,
      {
        scale: 5,
        duration: 3,
        ease: "power1.inOut",
      },
      "+=0.2"
    );

    // 4a. Donkere overlay fade-in voor leesbaarheid
    tl.to(
      overlayRef.current,
      {
        opacity: 0.7,
        duration: 3,
        ease: "power1.inOut",
      },
      "<"
    );

    // 4b. Titel wrapper beweegt naar beneden om gecentreerd te blijven EN tekst verschijnt tegelijk
    tl.to(
      titleRef.current,
      {
        scale: 1.05,
        y: "2rem", // Beweegt naar beneden om gecentreerd te blijven
        duration: 3,
        ease: "power1.inOut",
      },
      "<"
    );

    // 5. Fade-in van extra tekst onder de titel (tegelijk met titel beweging)
    tl.to(
      extraTextRef.current,
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "<"
    );

    // 6. Extra pauze aan het einde om de tekst te kunnen lezen
    tl.to({}, { duration: 3 });

    return () => tl.kill();
  }, []);

  const images = [img1, img2, img3, img4, img5, img6, img2, img3]; // Extra foto's zijn img2 en img3

  return (
    <section className="about-hero-outer" ref={sectionRef}>
      <div className="about-hero-sticky">
        {/* Titel los erbovenop */}
        <div className="bindery-hero-title-wrapper" ref={titleRef}>
          <h1
            className="bindery-hero-title hermaiona-title-style"
            style={{ zIndex: 2 }}
          >
            Sjonlee Ha
          </h1>
          <div
            className="about-hero-extra-text"
            ref={extraTextRef}
            style={{ opacity: 0 }}
          >
            <p>
              is a 24-year-old creative developer / CEO of Rinkitou with a big curiosity for how things work and how they're made. He believes vision is more than words — and love learning new stuff, building cool things, and creating something meaningful for for others, myself and for my fam.
            </p>
          </div>
        </div>
        {/* Alleen de images worden gezoomd */}
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
            {/* Donkere overlay voor leesbaarheid */}
            <div 
              className="about-hero-overlay" 
              ref={overlayRef}
              style={{
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "rgba(0, 0, 0, 1)",
                zIndex: 1
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 
