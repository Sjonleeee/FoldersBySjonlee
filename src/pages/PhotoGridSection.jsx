import React from "react";
import { motion } from "framer-motion";

import img1 from "../assets/images/sjonlee1.jpeg";
import img2 from "../assets/images/sjonlee2.jpeg";
import img3 from "../assets/images/sjonlee3.jpeg";
import img4 from "../assets/images/sjonlee4.jpeg";
import img5 from "../assets/images/sjonlee6.jpeg";
import img6 from "../assets/images/sjonlee7.jpeg";
import img7 from "../assets/images/sjonlee.jpeg";
import img8 from "../assets/images/sjonlee.JPG";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function PhotoGridSection() {
  return (
    <section className="photo-grid-section" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "4rem 0" }}>
      <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem", maxWidth: 500, width: "100%" }}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222" }}
          >
            <img src={src} alt={`Sjonlee ${i+1}`} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 