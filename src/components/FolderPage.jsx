import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import StatsSection from "../components/StatsSection";
import Footer from "../layout/Footer";
import React, { useState, useEffect, useRef } from "react";
import "../styles/onepager.css";

export default function FolderPage() {
  const [isStatsSectionVisible, setIsStatsSectionVisible] = useState(false);
  const statsSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStatsSectionVisible(entry.isIntersecting);
      },
      { threshold: 1 } // Increased threshold for slower transition
    );

    const currentRef = statsSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="folder-hero-outer">
      <div className="folder-hero-sticky">
        <div className="main-content-centered">
          <div
            className="absolute-center pointer-events-none"
            style={{ zIndex: 9999 }}
          >
            <div className="z-front center-folder">
              <img
                src={folderIcon}
                alt="Folder"
                className="folder-icon"
                draggable={false}
              />
            </div>
          </div>

          <div className="folder-page-container relative">
            <div className="main-content main-content-z1">
              <section className="main-section flex-column center-content relative">
                <div className="full-screen full-screen-z10">
                  <span className="role-label top-left">3D Designer</span>
                  <span className="role-label top-center">Entrepreneur</span>
                  <span className="role-label top-right">Designer</span>
                  <span className="role-label bottom-left">Teamplayer</span>
                  <span className="role-label bottom-right">Thinker</span>
                  <span className="role-label mid-right">Director</span>
                  <span className="role-label bottom-center">Hussler</span>

                  <div
                    className="absolute-center title-container"
                    style={{ zIndex: 20 }}
                  >
                    <div className="title-center-flex">
                      <div className="pointer-none left-title">
                        <span className="title-text">Creative</span>
                      </div>
                      <div className="pointer-none right-title">
                        <span className="title-text">Developer</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ModelCanvas />
              </section>
            </div>
          </div>

          <div className="section-normal">
            <div ref={statsSectionRef}>
              <StatsSection />
            </div>
          </div>
        </div>
      </div>
      <Footer isStatsSectionVisible={isStatsSectionVisible} />
    </section>
  );
}
