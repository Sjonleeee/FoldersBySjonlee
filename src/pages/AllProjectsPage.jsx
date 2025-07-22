import React from "react";
import "../styles/allprojectspage.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { FaChevronLeft, FaChevronRight, FaRandom, FaImage, FaPalette, FaShareSquare } from "react-icons/fa";
import folderIcon from "../assets/images/projectFolder.png";

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
          <div className="sidebar-menu-item active">All Projects</div>
          <div className="sidebar-menu-item">Hidden</div>
          <div className="sidebar-menu-item">Untitled</div>
          <div className="sidebar-menu-item">Coming soon</div>
        </nav>
      
      </aside>
      {/* Main Content */}
      <main className="allprojects-main">
        {/* Topbar */}
        <header className="allprojects-topbar">
          <div className="topbar-left">
            <FaChevronLeft className="topbar-arrow" />
            <span className="allprojects-title">All projects</span>
            <FaChevronRight className="topbar-arrow" />
          </div>
          <div className="topbar-right">
            <div className="topbar-icons">
              <FaRandom title="Shuffle" />
              <FaImage title="Image" />
              <FaPalette title="Palette" />
              <FaShareSquare title="Share" />
            </div>
          </div>
        </header>
        {/* Project Grid */}
        <section className="allprojects-grid-section">
          <div className="allprojects-grid">
            {/* Example folders with previews */}
            <div className="project-folder with-preview">
              <div className="folder-preview-images">
                <img src="/folder-preview1.png" alt="Preview 1" />
              </div>
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Volkswagen Project</div>
            </div>
            <div className="project-folder with-preview">
              <div className="folder-preview-images">
                <img src="/folder-preview2.png" alt="Preview 2" />
              </div>
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Chrome Magazine<sup>®</sup></div>
            </div>
            <div className="project-folder with-preview">
              <div className="folder-preview-images">
                <img src="/folder-preview3.png" alt="Preview 3" />
              </div>
              <img src={folderIcon} alt="Folder" className="folder-img" />
              <div className="folder-label">Rinkitou<br />Creative Agency<sup>®</sup></div>
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
