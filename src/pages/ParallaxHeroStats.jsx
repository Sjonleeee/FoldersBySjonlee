import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FolderPage from "./FolderPage";
import StatsSection from "./StatsSection";

export default function ParallaxHeroStats() {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const heroHeight = 700; // px

  // FolderPage fade out & move up
  const folderOpacity = useTransform(scrollY, [0, heroHeight * 0.6], [1, 0]);
  const folderY = useTransform(scrollY, [0, heroHeight], [0, -60]);

  // StatsSection fade in & move up (overlap ranges!)
  const statsOpacity = useTransform(scrollY, [heroHeight * 0.2, heroHeight * 0.9], [0, 1]);
  const statsY = useTransform(scrollY, [heroHeight * 0.2, heroHeight], [60, 0]);

  return (
    <div ref={ref} style={{ position: "relative", minHeight: heroHeight * 2 }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          opacity: folderOpacity,
          y: folderY,
        }}
      >
        <FolderPage />
      </motion.div>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 11,
          opacity: statsOpacity,
          y: statsY,
        }}
      >
        <StatsSection />
      </motion.div>
    </div>
  );
} 