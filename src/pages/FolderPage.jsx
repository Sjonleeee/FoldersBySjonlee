import React, { useEffect } from "react";
import folderIcon from "../assets/images/folder.svg";
import ModelCanvas from "../components/ModelCanvas";
import "../styles/folderpage.css";

export default function FolderPage() {
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
    <div className="page-root">
      {/* Main Content */}
      <div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="main-content-centered"
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
        <div className="folder-page-container relative">
          <div className="main-content main-content-z1">
            <section className="main-section flex-column center-content relative">
              <div className="full-screen full-screen-z10">
                {/* Role labels */}
                <span className="role-label top-left">3D Designer</span>
                <span className="role-label top-center">Entrepreneur</span>
                <span className="role-label top-right">Designer</span>
                <span className="role-label bottom-left">Teamplayer</span>
                <span className="role-label bottom-right">Thinker</span>
                <span className="role-label mid-right">Director</span>
                <span className="role-label bottom-center">Hussler</span>
                <div className="absolute-center title-container">
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
      </div>
    </div>
  );
}
