import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/allprojectspage.css";
import project1Img from "../assets/images/popup.png";

// Mock project data
const projectData = {
  volkswagen: {
    title: "Berlin Pop Up Store",
    image: project1Img,
    description: (
      <>
        <p>
          <b>
            Thrilled to share that my very first pop-up store in collaboration
            with ObeyArtSpace was a huge success!
          </b>
        </p>
        <p>
          Over 280 people attended — all fresh faces, young creatives, and
          amazing energy throughout the event. The space was filled with
          curiosity, community, and great vibes.
          <br />A huge thank you to ObeyArtSpace for believing in the idea, and
          to my creative agency and everyone involved in making this happen —
          from the projects to the event itself!{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </p>
        <p>See you next year. Bigger, louder, weirder.</p>
        <div style={{ marginTop: 24, fontSize: 14, color: "#aaa" }}>
          {"{ Graphic design, Posters , Clothing }"}
          <br />
          2025
          <br />
          by rinkitou®
        </div>
      </>
    ),
  },
  // Voeg hier meer projecten toe
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectData[projectId] || projectData["volkswagen"];

  return (
    <div className="allprojects-root">
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
          <div className="sidebar-menu-item active">
            <span className="sidebar-folder-icon active" />
            <span>All Projects</span>
          </div>
          <div className="sidebar-menu-item">
            <span className="sidebar-folder-icon" />
            <span>Hidden</span>
          </div>
          <div className="sidebar-menu-item">
            <span className="sidebar-folder-icon" />
            <span>Untitled</span>
          </div>
          <div className="sidebar-menu-item">
            <span className="sidebar-folder-icon" />
            <span>Coming soon</span>
          </div>
        </nav>
        <div className="sidebar-bottom-info">
          <div style={{ fontSize: 12, color: "#888", marginTop: 32 }}>
            Local Time:
            <br />
            3:04 PM - Belgium
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="allprojects-main">
        {/* Topbar */}
        <header className="allprojects-topbar">
          <div className="topbar-title-row">
            <span
              className="topbar-arrows"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            >
              &#8592;
            </span>
            <span className="allprojects-title">{project.title}</span>
            <span className="topbar-icons">
              {/* Icons zoals in AllProjectsPage */}
            </span>
          </div>
        </header>
        {/* Project Detail Layout */}
        <section className="project-detail-section">
          <div className="project-detail-image">
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </div>
          <div className="project-detail-info">
            <h2 style={{ marginTop: 0 }}>{project.title}</h2>
            <div className="project-detail-description">
              {project.description}
            </div>
          </div>
        </section>
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
      </main>
    </div>
  );
}
