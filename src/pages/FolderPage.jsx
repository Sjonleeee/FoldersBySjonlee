import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import Footer from "../components/Footer";
import ModelCanvas from "../components/ModelCanvas";
import folderIcon from "../assets/images/folder.svg";

export default function FolderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullAnimations, setShowFullAnimations] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setShowFullAnimations(isDesktop && !prefersReducedMotion);
  }, []);

  // Animation variants
  const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  };
  const containerVariants = {
    show: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="full-screen">
      <div className="full-screen center-content">
        {/* Folder icon always in the center */}
        <div className="absolute-center">
          <div className="z-front center-folder">
            <img
              src={folderIcon}
              alt="Folder"
              className={`folder-icon ${!isOpen ? "folder-clickable" : ""}`}
              draggable={false}
              onClick={() => !isOpen && setIsOpen(true)}
            />
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
              }}
            >
              {/* Header at the top, fade down */}
              <motion.div
                variants={fadeDown}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 10,
                }}
              >
                <Header />
              </motion.div>
              {/* Footer at the bottom, fade up */}
              <motion.div
                variants={fadeUp}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 10,
                }}
              >
                <Footer />
              </motion.div>
              {/* Middle content (letters + 3D) just fade in */}
              <motion.div
                variants={fadeIn}
                className="full-screen flex-column center-content"
                style={{ zIndex: 5 }}
              >
                <section
                  className="main-section flex-column center-content"
                  style={{ position: "relative" }}
                >
                  {/* ...letters and 3D model as before... */}
                  <div
                    className="full-screen"
                    style={{ position: "relative", zIndex: 10 }}
                  >
                    {/* Role Labels */}
                    <span
                      className="role-label"
                      style={{ top: "35%", left: "28%" }}
                    >
                      3D Designer
                    </span>
                    <span
                      className="role-label"
                      style={{
                        top: "25%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      Entrepreneur
                    </span>
                    <span
                      className="role-label"
                      style={{ top: "35%", right: "28%" }}
                    >
                      Designer
                    </span>
                    <span
                      className="role-label"
                      style={{ bottom: "35%", left: "32%" }}
                    >
                      Teamplayer
                    </span>
                    <span
                      className="role-label"
                      style={{ bottom: "35%", right: "32%" }}
                    >
                      Thinker
                    </span>
                    <span
                      className="role-label"
                      style={{ top: "60%", right: "25%" }}
                    >
                      Director
                    </span>
                    <span
                      className="role-label"
                      style={{
                        bottom: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      Hussler
                    </span>
                    <div className="absolute-center title-container">
                      <div className="pointer-none left-title">
                        <span
                          className="title-text"
                          style={{
                            display: "block",
                            transform: "translateY(0.25em)",
                          }}
                        >
                          Creative
                        </span>
                      </div>
                      <div className="pointer-none right-title">
                        <span
                          className="title-text"
                          style={{
                            display: "block",
                            transform: "translateY(0.25em)",
                          }}
                        >
                          Developer
                        </span>
                      </div>
                    </div>
                  </div>
                  <ModelCanvas />
                </section>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
