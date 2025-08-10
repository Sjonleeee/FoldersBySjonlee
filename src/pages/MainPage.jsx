import React, { useState, useRef, useEffect } from "react";
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
  const [scrollToSection, setScrollToSection] = useState(null); // Added state for scrolling

  const showScrollIndicator = true;
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const handleOpen = () => {
    setFolderOpen(true);
  };

  const handleBackToLanding = () => {
    setFolderOpen(false);
    setShowAllProjects(false);
  };

  const handleAnimationsComplete = () => {
    setIsScrollBlocked(false);
    // Re-enable scrolling on body and html
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.body.classList.remove("scroll-blocked");
  };

  const handleScrollToAbout = () => {
    setScrollToSection("about");
  };

  // Block scrolling when component mounts
  useEffect(() => {
    if (folderOpen && isScrollBlocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("scroll-blocked");
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.classList.remove("scroll-blocked");
    }
  }, [folderOpen, isScrollBlocked]);

  // Performance optimization: Reduce motion for users who prefer it
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      document.body.classList.add("reduced-motion");
    }
  }, []);

  if (loading) {
    return <LoadingScreen progress={progress} />;
  }

  if (!folderOpen) {
    return <FolderLanding onOpen={handleOpen} />;
  }

  if (showAllProjects) {
    return <AllProjectsPage />;
  }

  return (
    <div
      className="onepager-root"
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: isScrollBlocked ? "hidden" : "auto",
        height: isScrollBlocked ? "100vh" : "auto",
        // Cosmos-stijl smooth scroll
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Header */}
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
        <Header
          onLogoClick={handleBackToLanding}
          onAboutClick={handleScrollToAbout}
        />
      </div>

      <div className="onepager-content">
        {/* OnePager with all animations */}
        <section
          style={{
            minHeight: "100vh", // Veel meer ruimte voor alle animaties
            position: "relative",
          }}
        >
          <OnePager
            headerRef={headerRef}
            footerRef={footerRef}
            onAnimationsComplete={handleAnimationsComplete}
            scrollToSection={scrollToSection} // Pass scrollToSection prop
          />
        </section>
      </div>

      {/* Footer */}
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
        <Footer showScrollIndicator={showScrollIndicator} />
      </div>
    </div>
  );
}
