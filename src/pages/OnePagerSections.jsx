import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FolderPage from "./FolderPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const sections = [
  { key: "folder", component: <FolderPage /> },
  {
    key: "stats",
    component: (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "3rem" }}>
          Stats Section (example)
        </h1>
      </div>
    ),
  },
];

export default function OnePagerSections() {
  const [pageIndex, setPageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWheel = useCallback(
    (e) => {
      if (isTransitioning) return;
      if (e.deltaY > 0 && pageIndex < sections.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setPageIndex(pageIndex + 1);
          setIsTransitioning(false);
        }, 900);
      } else if (e.deltaY < 0 && pageIndex > 0) {
        setIsTransitioning(true);
        setTimeout(() => {
          setPageIndex(pageIndex - 1);
          setIsTransitioning(false);
        }, 900);
      }
    },
    [isTransitioning, pageIndex]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
      onWheel={handleWheel}
    >
      {/* Overlay Header */}
      {pageIndex !== 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 100,
          }}
        >
          <Header />
        </div>
      )}
      {/* Animated Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sections[pageIndex].key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          {sections[pageIndex].component}
        </motion.div>
      </AnimatePresence>
      {/* Overlay Footer */}
      {pageIndex !== 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 100,
          }}
        ></div>
      )}
      {/* Overlay transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="overlay"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 110,
              transformOrigin: "top",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
