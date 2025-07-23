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

const sidebarItems = [
  { label: "All Projects", key: "all" },
  { label: "Hidden", key: "hidden" },
  { label: "Untitled", key: "untitled" },
  { label: "Coming soon", key: "coming" },
];

const allFolders = [
  { name: "Volkswagen Project", sup: "®" },
  { name: "Chrome Magazine", sup: "®" },
  { name: "Rinkitou\nCreative Agency", sup: "®" },
  { name: "Branding", sup: "®" },
  { name: "Clothing Design", sup: "®" },
  { name: "3D design", sup: "®" },
  { name: "Graphic Design", sup: "®" },
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
  { name: "rinkitou® new collection", sup: "®" },
  { name: "Letter to future me", sup: "®" },
];

export default function AllProjectsPage() {
  const [activeKey, setActiveKey] = useState("all");
  let foldersToShow = allFolders;
  if (activeKey === "hidden") foldersToShow = hiddenFolders;
  else if (activeKey === "untitled") foldersToShow = untitledFolders;
  else if (activeKey === "coming") foldersToShow = comingSoonFolders;

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
              onClick={() => setActiveKey(item.key)}
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
            <span className="topbar-arrows">
              <FaChevronLeft className="topbar-arrow" />
              <FaChevronRight className="topbar-arrow" />
            </span>
            <span className="allprojects-title">All projects</span>
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
        {/* Project Grid */}
        <section className="allprojects-grid-section">
          <div
            className={
              "allprojects-grid" +
              (foldersToShow.length <= 3 ? " grid-narrow" : "")
            }
          >
            {foldersToShow.map((folder, idx) => (
              <div className="project-folder" key={idx}>
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
          <Footer />
        </div>
      </main>
    </div>
  );
}
