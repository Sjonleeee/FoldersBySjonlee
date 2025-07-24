import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/aboutsection.css";
import img1 from "../assets/images/sjonlee.jpeg";
import img2 from "../assets/images/sjonlee2.jpeg";
import img3 from "../assets/images/sjonlee3.jpeg";
import img4 from "../assets/images/sjonlee4.jpeg";
import img5 from "../assets/images/sjonlee6.jpeg";
import img6 from "../assets/images/sjonlee7.jpeg";

const gridPositions = [
  // Eindposities voor de grid (2 rijen x 3 kolommen)
  { x: "-22vw", y: "-13vh" },
  { x: "0vw",   y: "-13vh" },
  { x: "22vw",  y: "-13vh" },
  { x: "-22vw", y: "13vh" },
  { x: "0vw",   y: "13vh" },
  { x: "22vw",  y: "13vh" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Startposities (zoals je nu hebt)
  const images = [
    { src: img1, x0: "-40vw", y0: "-20vh" },
    { src: img2, x0: "40vw", y0: "-20vh" },
    { src: img3, x0: "-45vw", y0: "20vh" },
    { src: img4, x0: "45vw", y0: "20vh" },
    { src: img5, x0: "-20vw", y0: "40vh" },
    { src: img6, x0: "20vw", y0: "40vh" },
  ];

  // Animatie: van verspreid naar grid
  const xTransforms = images.map((img, i) =>
    useTransform(
      scrollYProgress,
      [0, 0.7, 1],
      [img.x0, "0vw", gridPositions[i].x]
    )
  );
  const yTransforms = images.map((img, i) =>
    useTransform(
      scrollYProgress,
      [0, 0.7, 1],
      [img.y0, "0vh", gridPositions[i].y]
    )
  );
  // Scale: van groot naar normaal
  const imgScale = useTransform(scrollYProgress, [0, 0.7, 1], [1.12, 1, 1]);
  // Fade-in
  const opacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // Titel: fade in, blijft altijd zichtbaar
  return (
    <section className="bindery-hero-outer" ref={ref}>
      <motion.div
        className="bindery-hero-sticky"
        style={{ opacity }}
      >
        <div className="bindery-hero-section">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              className="bindery-hero-img"
              style={{
                x: xTransforms[i],
                y: yTransforms[i],
                scale: imgScale,
                zIndex: 1
              }}
              alt=""
              draggable={false}
            />
          ))}
          <div className="bindery-hero-title-wrapper">
            <motion.h1
              className="bindery-hero-title hermaiona-title-style"
              style={{ zIndex: 2, opacity }}
            >
              Sjonlee Ha
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 