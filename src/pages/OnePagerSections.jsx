import React, { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import FolderPage from "./FolderPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import rinkitouVideo from "../assets/videos/rinkitou.mp4";
import deskImg from "../assets/images/DESK.png";
import sjonlee1 from "../assets/images/sjonlee1.jpeg";
import sjonlee2 from "../assets/images/sjonlee2.jpeg";
import sjonlee3 from "../assets/images/sjonlee3.jpeg";
import sjonlee4 from "../assets/images/sjonlee4.jpeg";
import sjonlee from "../assets/images/sjonlee.jpeg";
import "../styles/onepager.css";

// Responsive hook
function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// CountUpNumber component for animated numbers
function CountUpNumber({ end, suffix = "", duration = 1.2 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60fps
    let frame;
    function animate() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// Add fadeInCenter variant for the center stack
const fadeInCenter = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, delay: 0, ease: [0.4, 0, 0.2, 1] },
  },
};

function StatsSection() {
  const isMobile = useIsMobile();
  const [showStats, setShowStats] = useState(false);

  // Custom fadeBlock with faster duration on mobile
  const fadeBlockCustom = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 1.1,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  });

  return (
    <div className="stats-video-section">
      <div className="stats-content-flex">
        {isMobile ? (
          <>
            <motion.div
              className="stats-laptop-stack"
              variants={fadeInCenter}
              initial="hidden"
              animate="show"
              onAnimationComplete={() => setShowStats(true)}
            >
              <div className="stats-laptop-wrapper"></div>
              <img src={deskImg} alt="Desk" className="stats-desk-img" />
              <video
                src={rinkitouVideo}
                autoPlay
                loop
                muted
                className="laptop-video"
              />
            </motion.div>
            <div
              className="stats-blocks-grid"
              style={
                !showStats ? { visibility: "hidden", minHeight: "8rem" } : {}
              }
            >
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={4} suffix="+" duration={2.2} />
                </span>
                <span className="stats-label">Years of creating</span>
              </motion.div>
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0.2)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={150} suffix="+" duration={2.2} />
                </span>
                <span className="stats-label">Completed Projects</span>
              </motion.div>
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0.4)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={26} suffix="+" duration={2.2} />
                </span>
                <span className="stats-label">Collaborations</span>
              </motion.div>
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0.6)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={100} suffix="%" duration={2.2} />
                </span>
                <span className="stats-label">On-Time Delivery rate</span>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <div className="stats-side left">
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={4} suffix="+" duration={2.2} />
                </span>
                <span className="stats-label">Years of creating</span>
              </motion.div>
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0.2)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={150} suffix="+" duration={2.2} />
                </span>
                <span className="stats-label">Completed Projects</span>
              </motion.div>
            </div>
            <motion.div
              className="stats-laptop-stack"
              variants={fadeInCenter}
              initial="hidden"
              animate="show"
              onAnimationComplete={() => setShowStats(true)}
            >
              <div className="stats-laptop-wrapper"></div>
              <img src={deskImg} alt="Desk" className="stats-desk-img" />
              <video
                src={rinkitouVideo}
                autoPlay
                loop
                muted
                className="laptop-video"
              />
            </motion.div>
            <div className="stats-side right">
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0.4)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={26} suffix="+" duration={2.2} />
                </span>
                <span className="stats-label">Collaborations</span>
              </motion.div>
              <motion.div
                className="stats-block"
                variants={fadeBlockCustom(0.6)}
                initial="hidden"
                animate={showStats ? "show" : "hidden"}
              >
                <span className="stats-number">
                  <CountUpNumber end={100} suffix="%" duration={2.2} />
                </span>
                <span className="stats-label">On-Time Delivery rate</span>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AboutPhotoSection() {
  return (
    <section
      className="about-photo-section"
      style={{ display: "flex", minHeight: "100vh", background: "none" }}
    >
      {/* Photo grid */}
      <div
        className="photo-grid"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: 500,
          margin: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <img
            src={sjonlee1}
            alt="sjonlee1"
            style={{ width: "50%", borderRadius: "12px", objectFit: "cover" }}
          />
          <img
            src={sjonlee2}
            alt="sjonlee2"
            style={{ width: "50%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <img
            src={sjonlee3}
            alt="sjonlee3"
            style={{ width: "50%", borderRadius: "12px", objectFit: "cover" }}
          />
          <img
            src={sjonlee4}
            alt="sjonlee4"
            style={{ width: "50%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
        <img
          src={sjonlee}
          alt="sjonlee"
          style={{
            width: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            marginTop: "1rem",
          }}
        />
      </div>
      {/* About text */}
      <div
        className="about-bio"
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "2rem 4rem",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "Hermaiona, serif",
            fontSize: "4rem",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Sjonlee Ha
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontSize: "1.3rem",
            maxWidth: 600,
            margin: "2rem 0 0 0",
            lineHeight: 1.6,
          }}
        >
          is a 24-year-old creative developer / CEO of Rinkitou with a big
          curiosity for how things work and how they’re made. He believes vision
          is more than words — and love learning new stuff, building cool
          things, and creating something meaningful for others, myself and for
          my fam.
        </motion.p>
        <div style={{ marginTop: "2rem", fontSize: "1rem", color: "#aaa" }}>
          2025
          <br />
          by rinkitou®
        </div>
      </div>
    </section>
  );
}

function ParallaxHeroStats({ onHeroGone }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const heroHeight = 700; // px, adjust as needed for your design

  // FolderPage fades out and moves up
  const folderOpacity = useTransform(scrollY, [0, heroHeight * 0.7], [1, 0]);
  const folderY = useTransform(scrollY, [0, heroHeight], [0, -100]);

  // StatsSection fades in and moves up, but starts at same Y as FolderPage
  const statsOpacity = useTransform(
    scrollY,
    [heroHeight * 0.3, heroHeight],
    [0, 1]
  );
  const statsY = useTransform(
    scrollY,
    [heroHeight * 0.3, heroHeight],
    [100, 0]
  );

  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const unsubOpacity = folderOpacity.on("change", (v) => setOpacity(v));
    return () => {
      unsubOpacity();
    };
  }, [folderOpacity]);

  useEffect(() => {
    if (onHeroGone) onHeroGone(opacity <= 0.53);
  }, [opacity, onHeroGone]);

  return (
    <div ref={ref} style={{ position: "relative", minHeight: heroHeight * 2 }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10, // FolderPage below StatsSection
          opacity: folderOpacity,
          y: folderY,
        }}
      >
        <FolderPage />
      </motion.div>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 11, // StatsSection overlays FolderPage
          opacity: statsOpacity,
          y: statsY,
        }}
      >
        <StatsSection />
      </motion.div>
    </div>
  );
}

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function OnePagerSections({ onBackToLanding }) {
  const [showCopyright, setShowCopyright] = useState(false);

  return (
    <div
      className="onepager-root"
      style={{ width: "100%", overflowX: "hidden" }}
    >
      <motion.div
        variants={fadeDown}
        initial="hidden"
        animate="show"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Header onLogoClick={onBackToLanding} />
      </motion.div>
      <div className="onepager-content">
        <ParallaxHeroStats onHeroGone={setShowCopyright} />
        <AboutPhotoSection />
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Footer showCopyright={showCopyright} />
      </motion.div>
    </div>
  );
}
