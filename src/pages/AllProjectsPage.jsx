import React, { useState } from "react";
import "../styles/allprojectspage.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTh,
  FaRandom,
  FaShareSquare,
} from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import folderIcon from "../assets/images/projectFolder.png";
import { projects } from "../config/projectData.js";

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

  return (
    <div className="allprojects-root">
      {/* Header (fixed at top) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Header />
      </div>
      {/* Sidebar */}
      <aside className="allprojects-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-dot green"></span>
          <span className="sidebar-dot yellow"></span>
          <span className="sidebar-dot red"></span>
        </div>
        <nav className="sidebar-menu">
          {sidebarItems.map((item) => (
            <div
              className={`sidebar-menu-item${
                activeKey === item.key ? " active" : ""
              }`}
              key={item.key}
              onClick={() => {
                setActiveKey(item.key);
                setSelectedProject(null); // reset detail als je wisselt
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
                  )?.title || "Project"
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
            <span className="topbar-icons">
              <FaTh className="topbar-icon" />
              <FaRandom className="topbar-icon" />
              <span className="topbar-icon" role="img" aria-label="Image">
                🖼️
              </span>
              <span className="topbar-icon" role="img" aria-label="Palette">
                🎨
              </span>
              <FaShareSquare className="topbar-icon" />
            </span>
          </div>
        </header>
        {/* Project Detail of Grid */}
        {selectedProject &&
        (projectLookup[selectedProject] ||
          projectLookup["volkswagenproject"]) ? (
          <section className="project-detail-section">
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
                {/* Render body als paragraphs, tags en dropcap */}
                {projectLookup[selectedProject]?.body ? (
                  <div className="project-detail-content-design">
                    <div className="project-detail-body-design">
                      <span className="fancy-dropcap">
                        {projectLookup[selectedProject].dropcap}
                      </span>
                      {projectLookup[selectedProject].body.map((line, idx) => (
                        <p key={idx} style={{ display: "inline" }}>
                          {line}
                          {idx <
                          projectLookup[selectedProject].body.length - 1 ? (
                            <br />
                          ) : null}
                        </p>
                      ))}
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
          <Footer hideIconBar={true} />
        </div>
      </main>
    </div>
  );
}
