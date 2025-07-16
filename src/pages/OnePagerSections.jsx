import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FolderPage from "./FolderPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import rinkitouVideo from "../assets/videos/rinkitou.mp4";
// import laptopImg from "../assets/images/mackbookmockup.png";
// import laptopDeskImg from "../assets/images/LaptopDesk.png";
import deskImg from "../assets/images/DESK.png";
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

const sections = [
  { key: "folder", component: <FolderPage /> },
  {
    key: "stats",
    component: <StatsSection />,
  },
];

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

export default function OnePagerSections() {
  const [pageIndex, setPageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWheel = useCallback(
    (e) => {
      if (isTransitioning) return;
      if (e.deltaY > 0 && pageIndex < sections.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setPageIndex(pageIndex + 1);
          setIsTransitioning(false);
        }, 900);
      } else if (e.deltaY < 0 && pageIndex > 0) {
        setIsTransitioning(true);
        setTimeout(() => {
          setPageIndex(pageIndex - 1);
          setIsTransitioning(false);
        }, 900);
      }
    },
    [isTransitioning, pageIndex]
  );

  return (
    <div className="page-root" onWheel={handleWheel}>
      {/* Overlay Header */}
      {pageIndex !== 0 && (
        <div className="overlay-header">
          <Header onLogoClick={() => window.location.reload()} />
        </div>
      )}
      {/* Animated Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sections[pageIndex].key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="main-content-centered"
        >
          {sections[pageIndex].component}
        </motion.div>
      </AnimatePresence>
      {/* Overlay Footer */}
      {pageIndex !== 0 && (
        <div className="overlay-footer">
          <Footer hideIconBar={true} />
        </div>
      )}
      {/* Overlay transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="overlay"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 110,
              transformOrigin: "top",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
