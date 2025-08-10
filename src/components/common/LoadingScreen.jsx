import React, { useEffect, useState } from "react";
import profileImage from "../../assets/images/sjonlee.jpeg";
import styles from "./LoadingScreen.module.css";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

/**
 * LoadingScreen Component
 * Displays an animated loading screen with profile image and progress indicator
 * 
 * @param {Object} props
 * @param {number} props.progress - Current loading progress (0-100)
 * @returns {React.ReactElement} Loading screen UI
 */
const LoadingScreen = ({ progress }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Animation constants
  const FADE_IN_DELAY = 50; // ms
  const TRANSITION_DURATION = 1400; // ms
  const PROGRESS_TRANSITION = 300; // ms

  // Start fade-in animation when component mounts
  useEffect(() => {
    const fadeInTimer = setTimeout(() => setFadeIn(true), FADE_IN_DELAY);
    return () => clearTimeout(fadeInTimer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setFadeOut(true), 800); // Trigger fade-out after a delay
    }
  }, [progress]);

  // Preload 3D model
  useEffect(() => {
    useGLTF.preload("/src/assets/model/3LOCKEDIN.glb");
  }, []);

  useEffect(() => {
    if (fadeOut) {
      gsap.to(`.${styles.container}`, {
        opacity: 0,
        duration: 1.2,
        onComplete: () => {
          // Trigger any additional actions after fade-out
        },
      });
    }
  }, [fadeOut]);

  // Ensure progress values are valid for display
  const safeProgress = Math.min(progress, 100);
  const displayProgress = Math.floor(safeProgress);

  return (
    <div className={`${styles.container} ${fadeIn ? styles.fadeIn : ""} ${fadeOut ? styles.fadeOut : ""}`}>
      {/* Profile image */}
      <div className={styles.imageContainer}>
        <img
          src={profileImage}
          alt="Loading"
          className={styles.image}
        />
      </div>
      
      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${safeProgress}%`
          }}
        />
      </div>
      
      {/* Progress percentage */}
      <div className={styles.progressText}>
        {displayProgress}%
      </div>
    </div>
  );
};

export default LoadingScreen;
