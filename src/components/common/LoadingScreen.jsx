import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import profileImage from "../../assets/images/sjonleeCH1.JPG";
=======
import profileImage from "../../assets/images/sjonlee.jpeg";
import styles from "./LoadingScreen.module.css";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
>>>>>>> dev

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
<<<<<<< HEAD
=======
  const [fadeOut, setFadeOut] = useState(false);
>>>>>>> dev

  // Animation constants
  const FADE_IN_DELAY = 50; // ms
  const TRANSITION_DURATION = 1400; // ms
  const PROGRESS_TRANSITION = 300; // ms

<<<<<<< HEAD
  // Style constants
  const styles = {
    container: {
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: `opacity ${TRANSITION_DURATION}ms`,
      opacity: fadeIn ? 1 : 0,
      zIndex: 100,
      backgroundColor: "#000000"
    },
    imageContainer: {
      borderRadius: "50%",
      overflow: "hidden",
      width: "6rem",
      height: "6rem",
      marginBottom: "2rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    progressContainer: {
      width: "16rem",
      height: "0.5rem",
      backgroundColor: "#1f2937",
      borderRadius: "9999px",
      overflow: "hidden",
      marginTop: "2rem"
    },
    progressBar: {
      height: "100%",
      borderRadius: "9999px",
      transition: `all ${PROGRESS_TRANSITION}ms ease-out`,
      background: `
        linear-gradient(
          90deg,
          #e0e0e0 0%,
          #b0b0b0 20%,
          #f5f5f5 40%,
          #a0a0a0 60%,
          #e0e0e0 80%,
          #ffffff 100%
        )
      `,
      boxShadow: "0 0 12px 2px rgba(176, 176, 176, 0.53), 0 1px 8px 0 rgba(255, 255, 255, 0.53)"
    },
    progressText: {
      marginTop: "1rem",
      color: "white",
      fontFamily: "monospace",
      fontSize: "0.875rem"
    }
  };

=======
>>>>>>> dev
  // Start fade-in animation when component mounts
  useEffect(() => {
    const fadeInTimer = setTimeout(() => setFadeIn(true), FADE_IN_DELAY);
    return () => clearTimeout(fadeInTimer);
  }, []);

<<<<<<< HEAD
=======
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setFadeOut(true), 800); // Trigger fade-out after a delay
    }
  }, [progress]);

  // Preload 3D model
  useEffect(() => {
    useGLTF.preload("/assets/model/3LOCKEDIN.glb");
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

>>>>>>> dev
  // Ensure progress values are valid for display
  const safeProgress = Math.min(progress, 100);
  const displayProgress = Math.floor(safeProgress);

  return (
<<<<<<< HEAD
    <div style={styles.container}>
      {/* Profile image */}
      <div style={styles.imageContainer}>
        <img
          src={profileImage}
          alt="Loading"
          style={styles.image}
=======
    <div className={`${styles.container} ${fadeIn ? styles.fadeIn : ""} ${fadeOut ? styles.fadeOut : ""}`}>
      {/* Profile image */}
      <div className={styles.imageContainer}>
        <img
          src={profileImage}
          alt="Loading"
          className={styles.image}
>>>>>>> dev
        />
      </div>
      
      {/* Progress bar */}
<<<<<<< HEAD
      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
=======
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
>>>>>>> dev
            width: `${safeProgress}%`
          }}
        />
      </div>
      
      {/* Progress percentage */}
<<<<<<< HEAD
      <div style={styles.progressText}>
=======
      <div className={styles.progressText}>
>>>>>>> dev
        {displayProgress}%
      </div>
    </div>
  );
};

export default LoadingScreen;
