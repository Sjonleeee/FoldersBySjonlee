import React, { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import rinkitouVideo from "../assets/videos/rinkitou.mp4";
import deskImg from "../assets/images/DESK.png";

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

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

const fadeInCenter = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, delay: 0, ease: [0.4, 0, 0.2, 1] },
  },
};

const StatsSection = forwardRef((props, ref) => {
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
    <div className="stats-video-section" ref={ref}>
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
});

StatsSection.displayName = 'StatsSection';

export default StatsSection; 