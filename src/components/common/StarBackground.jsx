import React, { useEffect, useState, useRef } from "react";

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const starsContainerRef = useRef(null);
  
  useEffect(() => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // If user prefers reduced motion, don't generate stars
    if (prefersReducedMotion) {
      return;
    }
    
    // Determine number of stars based on device capability
    // Use fewer stars on mobile devices
    const isMobile = window.innerWidth < 768;
    const numberOfStars = isMobile ? 15 : 30;
    
    // Create stars with random positions
    const generateStars = () => {
      const newStars = [];
      
      for (let i = 0; i < numberOfStars; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${0.5 + Math.random() * 1.5}px`, // Smaller sizes for better performance
          animationDuration: `${5 + Math.random() * 10}s`, // Longer durations for smoother animation
          animationDelay: `${Math.random() * 5}s`,
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    // Clean up animation frames on unmount
    return () => {
      if (starsContainerRef.current) {
        starsContainerRef.current.classList.add('cleanup');
      }
    };
  }, []);
  
  // If there are no stars (reduced motion preference), render nothing
  if (stars.length === 0) return null;
  
  return (
    <div className="stars-container" ref={starsContainerRef}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            animation: `twinkle ${star.animationDuration} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground; 