import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/images/sjonlee1.jpeg";
import img2 from "../assets/images/sjonlee2.jpeg";
import img3 from "../assets/images/sjonlee3.jpeg";
import img4 from "../assets/images/sjonlee4.jpeg";
import img5 from "../assets/images/sjonlee6.jpeg";
import img6 from "../assets/images/sjonlee7.jpeg";

export default function AboutSection() {
  return (
    <section className="about-section" style={{ width: "100vw", height: "100vh", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "none", overflow: "hidden", margin: 0, padding: 0 }}>
      {/* Photo grid left */}
      <motion.div
        className="about-photo-grid"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: "1.2rem", maxWidth: 480, width: "40vw", height: "80vh", minHeight: 400, marginRight: "4vw" }}
      >
        {/* Top left photo with overlay */}
        <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222", width: "100%", height: "100%" }}>
          <img src={img1} alt="Sjonlee 1" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", top: 12, left: 12, color: "#fff", fontFamily: 'monospace', fontSize: 16, fontWeight: 600, textShadow: "0 2px 8px #000" }}>
            <span style={{ color: "#7CFF7C", fontSize: 14, display: "block" }}>●</span>
            Sjonlee<br />Ha
          </div>
        </div>
        {/* Top right photo with overlay */}
        <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222", width: "100%", height: "100%" }}>
          <img src={img2} alt="Sjonlee 2" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", top: 12, right: 12, color: "#fff", fontFamily: 'monospace', fontSize: 14, textAlign: "right", textShadow: "0 2px 8px #000" }}>
            Available for freelance<br />info.sjonlee@gmail.com
          </div>
        </div>
        {/* Middle left photo */}
        <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222", width: "100%", height: "100%" }}>
          <img src={img3} alt="Sjonlee 3" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {/* Middle right photo */}
        <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222", width: "100%", height: "100%" }}>
          <img src={img4} alt="Sjonlee 4" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {/* Bottom left photo with overlay */}
        <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222", width: "100%", height: "100%" }}>
          <img src={img5} alt="Sjonlee 5" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, color: "#fff", fontFamily: 'monospace', fontSize: 13, textShadow: "0 2px 8px #000" }}>
            Locally<br />3:04 PM - Belgium
          </div>
        </div>
        {/* Bottom right photo */}
        <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", background: "#222", width: "100%", height: "100%" }}>
          <img src={img6} alt="Sjonlee 6" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </motion.div>
      {/* About text right */}
      <motion.div
        className="about-bio"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        style={{ flex: 1, minWidth: 320, maxWidth: 700, height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "4vw" }}
      >
        <h2 style={{ fontFamily: 'Hermaiona, serif', fontSize: '4.5rem', margin: 0, lineHeight: 1.1, letterSpacing: 2, textAlign: 'left', fontWeight: 400 }}>
          Sjonlee Ha
        </h2>
        <p style={{ fontSize: 18, color: '#fff', margin: '2rem 0 0 0', maxWidth: 520, lineHeight: 1.7, fontFamily: 'Inter, sans-serif', textAlign: 'left' }}>
          is a 24-year-old creative developer / CEO of Rinkitou with a big curiosity for how things work and how they’re made. He believes vision is more than words — and love learning new stuff, building cool things, and creating something meaningful for others, myself and for my fam.
        </p>
        <div style={{ marginTop: '2.5rem', color: '#fff', fontSize: 14, opacity: 0.7, fontFamily: 'monospace', textAlign: 'right' }}>
          2025<br />by rinkitou®
        </div>
      </motion.div>
    </section>
  );
} 