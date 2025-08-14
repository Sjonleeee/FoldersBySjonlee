import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FolderLanding from "../components/FolderLanding";
import OnePager from "../components/OnePager";
import AllProjectsPage from "./AllProjectsPage";
import { useLoading } from "../context/LoadingContext";
import LoadingScreen from "../components/common/LoadingScreen";

export default function MainPage() {
  const { loading, progress } = useLoading();

  const [folderOpen, setFolderOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isScrollBlocked, setIsScrollBlocked] = useState(true);
  const [scrollToSection, setScrollToSection] = useState(null);

  const headerRef = useRef(null);
  const footerRef = useRef(null);

  // Handlers memoized
  const handleOpen = useCallback(() => setFolderOpen(true), []);
  const handleBackToLanding = useCallback(() => {
    setFolderOpen(false);
    setShowAllProjects(false);
    setIsScrollBlocked(true); // Block scrolling again
  }, []);
  const handleAnimationsComplete = useCallback(() => {
    setIsScrollBlocked(false); // Restore scrolling after animations
  }, []);
  const handleScrollToAbout = useCallback(() => setScrollToSection("about"), []);

  // Scroll blocking effect - only update DOM if state changes
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const applyScrollBlock = (blocked) => {
      if (blocked) {
        body.style.overflow = "hidden";
        html.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
        html.style.overflow = "";
      }
    };

    applyScrollBlock(isScrollBlocked);

    return () => applyScrollBlock(false);
  }, [isScrollBlocked]);

  // Reduced motion preference effect (runs once)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.body.classList.add("reduced-motion");
    }
  }, []);

  if (loading) return <LoadingScreen progress={progress} />;
  if (!folderOpen) return <FolderLanding onOpen={handleOpen} />;
  if (showAllProjects) return <AllProjectsPage />;

  return (
    <div
      className="onepager-root"
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: isScrollBlocked ? "hidden" : "auto",
        height: isScrollBlocked ? "100vh" : "auto",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Header fixed */}
      <div
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Header onLogoClick={handleBackToLanding} onAboutClick={handleScrollToAbout} />
      </div>

      <div className="onepager-content">
        <section style={{ minHeight: "100vh", position: "relative" }}>
          <OnePager
            headerRef={headerRef}
            footerRef={footerRef}
            onAnimationsComplete={handleAnimationsComplete}
            scrollToSection={scrollToSection}
          />
        </section>
      </div>

      {/* Footer fixed */}
      <div
        ref={footerRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Footer showScrollIndicator />
      </div>
    </div>
  );
}
