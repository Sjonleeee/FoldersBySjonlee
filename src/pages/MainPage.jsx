import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FolderLanding from "../components/FolderLanding";
import FolderPage from "../components/FolderPage";
import AboutSection from "./AboutSection";
import AnimatedFolderStack from "../components/AnimatedFolderStack";
import ContactSection from "./ContactSection";

export default function MainPage() {
  const [folderOpen, setFolderOpen] = useState(false);

  const handleOpen = () => {
    setFolderOpen(true);
  };

  const handleBackToLanding = () => {
    setFolderOpen(false);
  };

  if (!folderOpen) {
    return <FolderLanding onOpen={handleOpen} />;
  }

  return (
    <div
      className="onepager-root"
      style={{ width: "100%", overflowX: "hidden" }}
    >
      {/* Header */}
      <div
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
        <section style={{ minHeight: "1400px", position: "relative" }}>
          <FolderPage />
        </section>
        <section style={{ minHeight: "100vh" }}>
          <AboutSection />
        </section>
        <section style={{ minHeight: "100vh" }}>
          <AnimatedFolderStack />
        </section>
        <section style={{ minHeight: "60vh" }}>
          <ContactSection />
        </section>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
