import React, { useState, useEffect, forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/StatsSection.css";
import rinkitouVideo from "../assets/videos/rinkitou.mp4";
import deskImg from "../assets/images/DESK.png";

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

    const timer = setTimeout(() => {
      animate();
    }, 100);

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

const StatsSection = forwardRef((props, ref) => {
  const isMobile = useIsMobile();
  const [animationKey, setAnimationKey] = useState(0);
  const laptopRef = useRef(null);
  const statsBlocksRef = useRef(null);

  // Trigger animation when component mounts
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  // GSAP animations for laptop and stats blocks
  useEffect(() => {
    // Wait for next tick to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!laptopRef?.current || !statsBlocksRef?.current || !ref?.current) return;

      // Set initial states
      gsap.set(laptopRef.current, { opacity: 0, scale: 0.5 });
      gsap.set(statsBlocksRef.current.children, { opacity: 0, y: 30 });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%", // Adjusted to trigger earlier
          end: "bottom 10%", // Added end to ensure proper visibility
          toggleActions: "play none none none",
        },
      });

      // Laptop animation
      tl.to(laptopRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2, // Slower animation for laptop
        ease: "power2.out",
      });

      // Stats blocks animation with stagger
      tl.to(
        statsBlocksRef.current.children,
        {
          opacity: 1,
          y: 0,
          duration: 2, // Slower animation for stats blocks
          ease: "power2.out",
          stagger: 0.4, // Increased stagger for slower effect
        },
        "-=0.5"
      );

      // Trigger animationKey increment after fade-in animation
      tl.call(() => {
        setAnimationKey((prev) => prev + 1);
      }, null, "+=0.5"); // Delay to ensure fade-in is complete

      return () => {
        tl.kill();
      };
    }, 0);

    // Ensure refs are not null before initializing ScrollTrigger
    if (!laptopRef?.current || !statsBlocksRef?.current || !ref?.current) {
      console.warn("One or more refs are null. Skipping ScrollTrigger initialization.");
      return;
    }

    // Ensure counters animate at a fixed speed regardless of scroll speed
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      end: "bottom 10%",
      onUpdate: (self) => {
        if (self.isActive) {
          setAnimationKey((prev) => prev + 1);
        }
      },
      once: false, // Allow multiple triggers
    });

    return () => {
      clearTimeout(timer);
    };
  }, [ref]);

  return (
    <>
      {/* Stats and Video Section - Full Page */}
      <div className="stats-video-section" ref={ref}>
        <div className="stats-content-flex">
          {isMobile ? (
            <>
              <div className="stats-laptop-stack" ref={laptopRef}>
                <div className="stats-laptop-wrapper" />
                <img src={deskImg} alt="Desk" className="stats-desk-img" />
                <video
                  src={rinkitouVideo}
                  autoPlay
                  loop
                  muted
                  className="laptop-video"
                />
              </div>
              <div className="stats-blocks-grid" ref={statsBlocksRef}>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={4}
                      suffix="+"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">Years of creating</span>
                </div>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={150}
                      suffix="+"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">Completed Projects</span>
                </div>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={26}
                      suffix="+"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">Collaborations</span>
                </div>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={100}
                      suffix="%"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">On-Time Delivery rate</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="stats-side left" ref={statsBlocksRef}>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={4}
                      suffix="+"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">Years of creating</span>
                </div>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={150}
                      suffix="+"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">Completed Projects</span>
                </div>
              </div>
              <div className="stats-laptop-stack" ref={laptopRef}>
                <div className="stats-laptop-wrapper" />
                <img src={deskImg} alt="Desk" className="stats-desk-img" />
                <video
                  src={rinkitouVideo}
                  autoPlay
                  loop
                  muted
                  className="laptop-video"
                />
              </div>
              <div className="stats-side right">
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={26}
                      suffix="+"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">Collaborations</span>
                </div>
                <div className="stats-block">
                  <span className="stats-number">
                    <CountUpNumber
                      end={100}
                      suffix="%"
                      duration={5}
                      resetTrigger={animationKey}
                    />
                  </span>
                  <span className="stats-label">On-Time Delivery rate</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
