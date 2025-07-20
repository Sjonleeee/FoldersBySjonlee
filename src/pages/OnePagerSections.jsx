import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ParallaxHeroStats from "./ParallaxHeroStats";
import AboutSection from "./AboutSection";
import "../styles/onepager.css";

export default function OnePagerSections({ onBackToLanding }) {
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
        <Header onLogoClick={onBackToLanding} />
      </div>
      <div className="onepager-content">
        <section style={{ minHeight: "1400px", position: "relative" }}>
          <ParallaxHeroStats />
        </section>
        <section style={{ minHeight: "100vh" }}>
          <AboutSection />
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
