import React from "react";
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

const activeKey = "all";

export default function AllProjectsPage() {
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
          <div className="allprojects-grid">
            {/* Example folders with previews */}
            <div className="project-folder with-preview">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Volkswagen Project</div>
            </div>
            <div className="project-folder with-preview">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">
                Chrome Magazine<sup>®</sup>
              </div>
            </div>
            <div className="project-folder with-preview">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">
                Rinkitou
                <br />
                Creative Agency<sup>®</sup>
              </div>
            </div>
            {/* Example folders without previews */}
            <div className="project-folder">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Branding</div>
            </div>
            <div className="project-folder">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Clothing Design</div>
            </div>
            <div className="project-folder">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">3D design</div>
            </div>
            <div className="project-folder">
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Graphic Design</div>
            </div>
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
