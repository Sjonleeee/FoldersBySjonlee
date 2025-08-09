import React, { useState, useEffect } from "react";
import "../styles/allprojectspage.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  FaChevronLeft,
} from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import folderIcon from "../assets/images/projectFolder.png";
import { projects } from "../config/projectData.js";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const sidebarItems = [
  { label: "All Projects", key: "all" },
  { label: "Hidden", key: "hidden" },
  { label: "Untitled", key: "untitled" },
  { label: "Coming soon", key: "coming" },
];

const allFolders = [
  { name: "Volkswagen Project", sup: "®" },
  { name: "Chrome Magazine", sup: "®" },
  { name: "Rinkitou Creative Agency", sup: "®" },
  { name: "Pop Up Store Berlin", sup: "®" },
  { name: "Clothing Design", sup: "®" },
  { name: "3D design", sup: "®" },
];

const hiddenFolders = [
  { name: "Younger me", sup: "®" },
  { name: "FirstPortfolio", sup: "®" },
  { name: "Old Designs", sup: "®" },
];

const untitledFolders = [
  { name: "Moodboard 1", sup: "®" },
  { name: "Untitled 1", sup: "®" },
  { name: "Untitled 2", sup: "®" },
];

const comingSoonFolders = [
  { name: "rinkitou new collection", sup: "®" },
  { name: "Letter to future me", sup: "®" },
];

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function AllProjectsPage() {
  const [activeKey, setActiveKey] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  let foldersToShow = allFolders;
  if (activeKey === "hidden") foldersToShow = hiddenFolders;
  else if (activeKey === "untitled") foldersToShow = untitledFolders;
  else if (activeKey === "coming") foldersToShow = comingSoonFolders;

  // Helper om slug te maken
  const getSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "");

  // Project lookup: altijd array -> object
  const projectLookup = {};
  projects.forEach((p) => {
    if (p.slug) projectLookup[p.slug] = p;
  });

  const isMobile = useIsMobile(900);
  const navigate = useNavigate();

  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const sidebar = document.querySelector(".allprojects-sidebar");
    const topBar = document.querySelector(".allprojects-topbar");
    const folders = document.querySelectorAll(".folder");
    const grid = document.querySelector(".allprojects-grid");

    // Animate header and footer first
    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );
    }

    if (footer) {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.3 }
      );
    }

    // Animate sidebar sliding in from the left
    if (sidebar) {
      gsap.fromTo(
        sidebar,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power4.out", delay: 0.6 }
      );
    }

    // Animate top bar sliding in from the top
    if (topBar) {
      gsap.fromTo(
        topBar,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.9 }
      );
    }

    // Animate folders with a staggered effect
    if (folders.length > 0) {
      gsap.fromTo(
        folders,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", stagger: 0.2, delay: 1.2 }
      );
    }

    // Animate the grid last
    if (grid) {
      gsap.fromTo(
        grid,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power4.out", delay: 2 }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const image = document.querySelector(".project-detail-image img");
      const text = document.querySelector(".project-detail-info");

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: "power4.out" }
        );
      }

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.3 }
        );
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject === null) {
      const folders = document.querySelectorAll(".project-folder");

      if (folders.length > 0) {
        gsap.fromTo(
          folders,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", stagger: 0.2 }
        );
      }
    }
  }, [selectedProject]);

  return (
    <div className="allprojects-root">
      {/* Header (bovenaan, niet meer fixed) */}
      <Header onLogoClick={() => navigate("/")} />
      {/* Sidebar */}
      <aside className="allprojects-sidebar">
        <nav className="sidebar-menu">
          {sidebarItems.map((item) => (
            <div
              className={`sidebar-menu-item${
                activeKey === item.key ? " active" : ""
              }`}
              key={item.key}
              onClick={(e) => {
                setActiveKey(item.key);
                setSelectedProject(null); // reset detail als je wisselt
                // Scroll het aangeklikte item in beeld op mobiel
                if (window.innerWidth <= 900 && e.currentTarget) {
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }
              }}
            >
              <FiFolder
                className={`sidebar-folder-icon${
                  activeKey === item.key ? " active" : ""
                }`}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="allprojects-main">
        {/* Topbar */}
        <header className="allprojects-topbar">
          <div className="topbar-title-row">
            {selectedProject ? (
              <span className="topbar-arrows">
                <FaChevronLeft
                  className="topbar-arrow clickable"
                  style={{ marginRight: 8 }}
                  onClick={() => setSelectedProject(null)}
                />
              </span>
            ) : null}
            <span className="allprojects-title">
              {selectedProject
                ? (
                    projectLookup[selectedProject] ||
                    projectLookup["volkswagenproject"]
                  ).title || "Project"
                : activeKey === "all"
                ? "All projects"
                : activeKey === "hidden"
                ? "Hidden"
                : activeKey === "untitled"
                ? "Untitled"
                : activeKey === "coming"
                ? "Coming soon"
                : "Projects"}
            </span>
            {/* Remove the topbar-icons span completely */}
          </div>
        </header>
        {/* Project Detail of Grid */}
        {selectedProject &&
        (projectLookup[selectedProject] ||
          projectLookup["volkswagenproject"]) ? (
          <section className="project-detail-section">
            {isMobile ? (
              <>
                <div className="project-detail-info">
                  <h2 style={{ marginTop: 0 }}>
                    {
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).title
                    }
                  </h2>
                  <div className="project-detail-description">
                    {projectLookup[selectedProject]?.body ? (
                      <div className="project-detail-content-design">
                        <div className="project-detail-body-design">
                          <span className="fancy-dropcap">
                            {projectLookup[selectedProject].dropcap}
                          </span>
                          {projectLookup[selectedProject].body.map(
                            (line, idx) => (
                              <p key={idx} style={{ display: "inline" }}>
                                {line}
                                {idx <
                                projectLookup[selectedProject].body.length -
                                  1 ? (
                                  <br />
                                ) : null}
                              </p>
                            )
                          )}
                        </div>
                        <div className="project-detail-tags-design">
                          [ {projectLookup[selectedProject].tags.join(", ")} ]
                        </div>
                      </div>
                    ) : (
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).description
                    )}
                  </div>
                </div>
                <div className="project-detail-image">
                  <img
                    src={
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).image
                    }
                    alt={
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).title
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="project-detail-image">
                  <img
                    src={
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).image
                    }
                    alt={
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).title
                    }
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="project-detail-info">
                  <h2 style={{ marginTop: 0 }}>
                    {
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).title
                    }
                  </h2>
                  <div className="project-detail-description">
                    {projectLookup[selectedProject]?.body ? (
                      <div className="project-detail-content-design">
                        <div className="project-detail-body-design">
                          <span className="fancy-dropcap">
                            {projectLookup[selectedProject].dropcap}
                          </span>
                          {projectLookup[selectedProject].body.map(
                            (line, idx) => (
                              <p key={idx} style={{ display: "inline" }}>
                                {line}
                                {idx <
                                projectLookup[selectedProject].body.length -
                                  1 ? (
                                  <br />
                                ) : null}
                              </p>
                            )
                          )}
                        </div>
                        <div className="project-detail-tags-design">
                          [ {projectLookup[selectedProject].tags.join(", ")} ]
                        </div>
                      </div>
                    ) : (
                      (
                        projectLookup[selectedProject] ||
                        projectLookup["volkswagenproject"]
                      ).description
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        ) : (
          <section className="allprojects-grid-section">
            <div
              className={
                "allprojects-grid" +
                (foldersToShow.length <= 3 ? " grid-narrow" : "")
              }
            >
              {foldersToShow.map((folder, idx) => (
                <div
                  className="project-folder"
                  key={idx}
                  onClick={() => {
                    const slug = getSlug(folder.name);
                    setSelectedProject(slug);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={folderIcon} alt="Folder" className="folder-img" />
                  <div className="folder-label">
                    {folder.name.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < folder.name.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                    {folder.sup && <sup>{folder.sup}</sup>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Footer (fixed at bottom) */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            zIndex: 5000,
          }}
        >
          <Footer hideIconBar={true} showCopyright={true} />
        </div>
      </main>
    </div>
  );
}
