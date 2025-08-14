import React, { useState, useEffect, forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/StatsSection.css";
import rinkitouVideo from "/assets/videos/rinkitou.mp4";
import deskImg from "/assets/images/DESK.png";

gsap.registerPlugin(ScrollTrigger);

const useIsMobile = (breakpoint = 900) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const CountUpNumber = ({ end, suffix = "", duration = 40, resetTrigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let start = 0;
    const increment = end / (duration * 60);
    let frame;

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timer = setTimeout(animate, 100);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [end, duration, resetTrigger]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Reusable video component
const VideoPlayer = ({ src, className }) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    webkit-playsinline="true"
    controls={false}
    className={className}
  />
);

// Reusable stat block
const StatBlock = ({ end, suffix, label, resetTrigger }) => (
  <div className="stats-block">
    <span className="stats-number">
      <CountUpNumber
        end={end}
        suffix={suffix}
        duration={5}
        resetTrigger={resetTrigger}
      />
    </span>
    <span className="stats-label">{label}</span>
  </div>
);

const StatsSection = forwardRef((props, ref) => {
  const isMobile = useIsMobile();
  const [animationKey, setAnimationKey] = useState(0);
  const laptopRef = useRef(null);
  const statsBlocksRef = useRef(null);

  useEffect(() => setAnimationKey((prev) => prev + 1), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!laptopRef.current || !statsBlocksRef.current || !ref?.current) {
        // Silently return if refs are missing
        return;
      }

      gsap.set([laptopRef.current, statsBlocksRef.current.children], {
        opacity: 0,
      });
      gsap.set(laptopRef.current, { scale: 0.5 });
      gsap.set(statsBlocksRef.current.children, { y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      });

      tl.to(laptopRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          statsBlocksRef.current.children,
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out",
            stagger: 0.4,
          },
          "-=0.5"
        )
        .call(() => setAnimationKey((prev) => prev + 1), null, "+=0.5");

      return () => tl.kill();
    }, 0);

    return () => clearTimeout(timer);
  }, [laptopRef, statsBlocksRef, ref]);

  // Data voor statistieken → minder duplicatie
  const statsData = [
    { end: 4, suffix: "+", label: "Years of creating" },
    { end: 150, suffix: "+", label: "Completed Projects" },
    { end: 26, suffix: "+", label: "Collaborations" },
    { end: 100, suffix: "%", label: "On-Time Delivery rate" },
  ];

  return (
    <div className="stats-video-section" ref={ref}>
      <div className="stats-content-flex">
        {isMobile ? (
          <>
            <div className="stats-laptop-stack" ref={laptopRef}>
              <div className="stats-laptop-wrapper" />
              <img src={deskImg} alt="Desk" className="stats-desk-img" />
              <VideoPlayer src={rinkitouVideo} className="laptop-video" />
            </div>
            <div className="stats-blocks-grid" ref={statsBlocksRef}>
              {statsData.map((stat, i) => (
                <StatBlock key={i} {...stat} resetTrigger={animationKey} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="stats-side left" ref={statsBlocksRef}>
              {statsData.slice(0, 2).map((stat, i) => (
                <StatBlock key={i} {...stat} resetTrigger={animationKey} />
              ))}
            </div>
            <div className="stats-laptop-stack" ref={laptopRef}>
              <div className="stats-laptop-wrapper" />
              <img src={deskImg} alt="Desk" className="stats-desk-img" />
              <VideoPlayer src={rinkitouVideo} className="laptop-video" />
            </div>
            <div className="stats-side right">
              {statsData.slice(2).map((stat, i) => (
                <StatBlock key={i} {...stat} resetTrigger={animationKey} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

StatsSection.displayName = "StatsSection";
export default StatsSection;
