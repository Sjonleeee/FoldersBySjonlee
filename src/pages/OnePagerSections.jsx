import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FolderPage from "./FolderPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import rinkitouVideo from "../assets/videos/rinkitou.mp4";
// import laptopImg from "../assets/images/mackbookmockup.png";
// import laptopDeskImg from "../assets/images/LaptopDesk.png";
import deskImg from "../assets/images/DESK.png";

// CountUpNumber component for animated numbers
function CountUpNumber({ end, suffix = '', duration = 1.2 }) {
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
  return <span>{count}{suffix}</span>;
}

// Add fade variants for sequential animation
const fadeBlock = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: [0.4, 0, 0.2, 1] },
  },
});

// Add fadeInCenter variant for the center stack
const fadeInCenter = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.1, delay: 2.0, ease: [0.4, 0, 0.2, 1] },
  },
};

const sections = [
  { key: "folder", component: <FolderPage /> },
  {
    key: "stats",
    component: (
      <div className="stats-video-section">
        <div className="stats-content-flex">
          {/* Left stats */}
          <div className="stats-side left">
            <motion.div
              className="stats-block"
              variants={fadeBlock(0)}
              initial="hidden"
              animate="show"
            >
              <span className="stats-number"><CountUpNumber end={4} suffix="+" duration={2.2} /></span>
              <span className="stats-label">Years of creating</span>
            </motion.div>
            <motion.div
              className="stats-block"
              variants={fadeBlock(1.0)}
              initial="hidden"
              animate="show"
            >
              <span className="stats-number"><CountUpNumber end={150} suffix="+" duration={2.2} /></span>
              <span className="stats-label">Completed Projects</span>
            </motion.div>
          </div>
          {/* Centered Laptop + Desk */}
          <motion.div
            className="stats-laptop-stack"
            variants={fadeInCenter}
            initial="hidden"
            animate="show"
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
          {/* Right stats */}
          <div className="stats-side right">
            <motion.div
              className="stats-block"
              variants={fadeBlock(0.5)}
              initial="hidden"
              animate="show"
            >
              <span className="stats-number"><CountUpNumber end={26} suffix="+" duration={2.2} /></span>
              <span className="stats-label">Collaborations</span>
            </motion.div>
            <motion.div
              className="stats-block"
              variants={fadeBlock(1.5)}
              initial="hidden"
              animate="show"
            >
              <span className="stats-number"><CountUpNumber end={100} suffix="%" duration={2.2} /></span>
              <span className="stats-label">On-Time Delivery rate</span>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },
];

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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
      onWheel={handleWheel}
    >
      {/* Overlay Header */}
      {pageIndex !== 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 100,
          }}
        >
          <Header />
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
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          {sections[pageIndex].component}
        </motion.div>
      </AnimatePresence>
      {/* Overlay Footer */}

      {pageIndex !== 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
         
          }}
        >
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
