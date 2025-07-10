import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import { useLoading } from "../context/LoadingContext";

export default function FolderPage() {
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
    show: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
    },
  };

  const { loading } = useLoading();

  useEffect(() => {
    // Optional entrance logic
  }, []);

  return (
    <>
      {/* Folder icon in the exact same position and structure as FolderLanding, but now fades in (opacity only) */}
      <motion.div
        className="absolute-center pointer-events-none z-[1000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="z-front center-folder">
          <img
            src={folderIcon}
            alt="Folder"
            className="folder-icon"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* ✅ Page wrapper with fade-ins */}
      <div className="folder-page-container relative">
        <motion.div variants={fadeDown} initial="hidden" animate="show">
          <Header />
        </motion.div>

        <AnimatePresence>
          {!loading && (
            <motion.div
              className="main-content"
              variants={fadeIn}
              initial="hidden"
              animate="show"
              style={{ zIndex: 1 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
