import React, { useState, useEffect, forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const CountUpNumber = ({ end, suffix = "", duration = 1.2, resetTrigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Reset count to 0 when component mounts or resetTrigger changes
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

    // Small delay to ensure the component is visible
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
          trigger: ref?.current,
          start: "top center",
          end: "bottom center",
          scrub: 3,
          markers: true,
        },
      });

      // Laptop animation
      tl.to(laptopRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });

      // Stats blocks animation with stagger
      tl.to(statsBlocksRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      }, "-=0.5");

      return () => {
        tl.kill();
      };
    }, 0);

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
                      duration={2.2}
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
                      duration={2.2}
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
                      duration={2.2}
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
                      duration={2.2}
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
                      duration={2.2}
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
                      duration={2.2}
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
                      duration={2.2}
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
                      duration={2.2}
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
