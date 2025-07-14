import React, { useEffect, useRef } from "react";
import "./MouseFollower.css";

const MouseFollower = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrame;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      if (circle) {
        circle.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div ref={circleRef} className="mouse-follower-circle" />;
};

export default MouseFollower; 