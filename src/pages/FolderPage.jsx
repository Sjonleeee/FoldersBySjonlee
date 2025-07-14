import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";

export default function FolderPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
    },
  };

  useEffect(() => {
    // Optional entrance logic
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Overlay Header */}
      <motion.div
        variants={fadeDown}
        initial="hidden"
        animate="show"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </motion.div>
      {/* Main Content */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 0,
        }}
      >
        {/* Folder icon in the exact same position and structure as FolderLanding, but now fades in (opacity only) */}
        <div className="absolute-center pointer-events-none z-[1000]">
          <div className="z-front center-folder">
            <img
              src={folderIcon}
              alt="Folder"
              className="folder-icon"
              draggable={false}
            />
          </div>
        </div>
        <div
          className="folder-page-container relative"
          style={{ width: "100%" }}
        >
          <div className="main-content" style={{ zIndex: 1 }}>
            <section className="main-section flex-column center-content relative">
              <div className="full-screen relative z-10">
                {/* Role labels */}
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
          </div>
        </div>
      </motion.div>
      {/* Overlay Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Footer hideIconBar={menuOpen} />
      </div>
    </div>
  );
}
