import React, { useState, useRef, useEffect } from "react";
import { animationManager } from "../utils/animationManager";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FolderLanding from "../components/FolderLanding";
import FolderPage from "../components/FolderPage";
import AboutSection from "./AboutSection";
import AnimatedFolderStack from "../components/AnimatedFolderStack";
import CompaniesSection from "../components/CompaniesSection";
import ContactSection from "./ContactSection";
import AnimationDebugger from "../components/AnimationDebugger";

export default function MainPage() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [isScrollBlocked, setIsScrollBlocked] = useState(true);
  const showScrollIndicator = true;
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  // Initialize animation manager
  useEffect(() => {
    animationManager.init();
    
    return () => {
      // Clean up animations when component unmounts
      animationManager.cleanup();
    };
  }, []);

  const handleOpen = () => {
    setFolderOpen(true);
  };

  const handleBackToLanding = () => {
    setFolderOpen(false);
    // Clean up animations when going back to landing
    animationManager.cleanup();
  };

  const handleAnimationsComplete = () => {
    setIsScrollBlocked(false);
    // Re-enable scrolling on body and html
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.classList.remove('scroll-blocked');
    
    // Refresh animations after scroll is enabled
    setTimeout(() => {
      animationManager.refresh();
    }, 100);
  };

  // Block scrolling when component mounts
  useEffect(() => {
    if (folderOpen && isScrollBlocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('scroll-blocked');
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.classList.remove('scroll-blocked');
    }
  }, [folderOpen, isScrollBlocked]);

  if (!folderOpen) {
    return <FolderLanding onOpen={handleOpen} />;
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
        WebkitOverflowScrolling: "touch"
      }}
    >
      {/* Debug component for development */}
      <AnimationDebugger />
      
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
        <Header onLogoClick={handleBackToLanding} />
      </div>

      <div className="onepager-content">
        {/* FolderPage */}
        <section style={{ 
          minHeight: "1400px", 
          position: "relative"
        }}>
          <FolderPage 
            headerRef={headerRef} 
            footerRef={footerRef}
            onAnimationsComplete={handleAnimationsComplete}
          />
        </section>
        
        {/* AboutSection */}
        <section style={{ 
          minHeight: "0", 
          position: "relative"
        }}>
          <AboutSection />
        </section>
        
        {/* AnimatedFolderStack */}
        <section style={{ 
          minHeight: "0", 
          position: "relative"
        }}>
          <AnimatedFolderStack />
        </section>
        
        {/* CompaniesSection */}
        {/* <section style={{ 
          minHeight: "0", 
          position: "relative"
        }}>
          <CompaniesSection />
        </section> */}
        
        {/* ContactSection */}
        {/* <section style={{ 
          minHeight: "40vh"
        }}>
          <ContactSection />
        </section> */}
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
