import React, { useState, useEffect, useRef } from "react";
import "../styles/allprojectspage.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { FaChevronLeft } from "react-icons/fa";
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

const foldersData = {
  all: [
    { name: "Volkswagen Project", sup: "®" },
    { name: "Chrome Magazine", sup: "®" },
    { name: "Rinkitou Creative Agency", sup: "®" },
    { name: "Pop Up Store Berlin", sup: "®" },
    { name: "Clothing Design", sup: "®" },
    { name: "3D design", sup: "®" },
  ],
  hidden: [
    { name: "Younger me", sup: "®" },
    { name: "FirstPortfolio", sup: "®" },
    { name: "Old Designs", sup: "®" },
  ],
  untitled: [
    { name: "Moodboard 1", sup: "®" },
    { name: "Untitled 1", sup: "®" },
    { name: "Untitled 2", sup: "®" },
  ],
  coming: [
    { name: "rinkitou new collection", sup: "®" },
    { name: "Letter to future me", sup: "®" },
  ],
};

const useIsMobile = (bp = 900) => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth <= bp : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= bp);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [bp]);
  return isMobile;
};

const getSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "");

export default function AllProjectsPage() {
  const [activeKey, setActiveKey] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Lookup map (only once)
  const projectLookup = useRef({});
  useEffect(() => {
    const map = {};
    projects.forEach((p) => p.slug && (map[p.slug] = p));
    projectLookup.current = map;
  }, []);

  // Refs voor animaties
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const sidebarRef = useRef(null);
  const topbarRef = useRef(null);
  const gridRef = useRef(null);
  const foldersRefs = useRef([]);

  foldersRefs.current = [];

  const addFolderRef = (el) => {
    if (el && !foldersRefs.current.includes(el)) foldersRefs.current.push(el);
  };

  // Animaties initial load & folders change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.3 }
      );
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power4.out", delay: 0.6 }
      );
      gsap.fromTo(
        topbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.9 }
      );
      if (foldersRefs.current.length) {
        gsap.fromTo(
          foldersRefs.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.2,
            delay: 1.2,
          }
        );
      }
      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power4.out", delay: 2 }
      );
    });
    return () => ctx.revert();
  }, [activeKey]);

  // Animaties bij project detail
  useEffect(() => {
    if (!selectedProject) return;

    const ctx = gsap.context(() => {
      const image = document.querySelector(".project-detail-image img");
      const text = document.querySelector(".project-detail-info");

      if (isMobile) {
        if (text)
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
          );
        if (image)
          gsap.fromTo(
            image,
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.out", delay: 0.5 }
          );
      } else {
        if (image)
          gsap.fromTo(
            image,
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.out" }
          );
        if (text)
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 2, ease: "power2.out", delay: 0.3 }
          );
      }
    });

    return () => ctx.revert();
  }, [selectedProject, isMobile]);

  const foldersToShow = foldersData[activeKey] || foldersData.all;
  const currentProject =
    (selectedProject && projectLookup.current[selectedProject]) ||
    projectLookup.current["volkswagenproject"];

  // Render project detail info body (DRY)
  const renderProjectBody = (project) => {
    if (!project) return null;
    if (project.body) {
      return (
        <div className="project-detail-content-design">
          <div className="project-detail-body-design">
            <span className="fancy-dropcap">{project.dropcap}</span>
            {project.body.map((line, idx) => (
              <p key={idx} style={{ display: "inline" }}>
                {line}
                {idx < project.body.length - 1 && <br />}
              </p>
            ))}
          </div>
          <div className="project-detail-tags-design">
            [ {project.tags.join(", ")} ]
          </div>
        </div>
      );
    }
    return project.description;
  };

  return (
    <div className="allprojects-root">
      <Header onLogoClick={() => navigate("/")} ref={headerRef} />

      <aside className="allprojects-sidebar" ref={sidebarRef}>
        <nav className="sidebar-menu">
          {sidebarItems.map(({ label, key }) => (
            <div
              key={key}
              className={`sidebar-menu-item${
                activeKey === key ? " active" : ""
              }`}
              onClick={(e) => {
                setActiveKey(key);
                setSelectedProject(null);
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
                  activeKey === key ? " active" : ""
                }`}
              />
              <span>{label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="allprojects-main">
        <header className="allprojects-topbar" ref={topbarRef}>
          <div className="topbar-title-row">
            {selectedProject && (
              <FaChevronLeft
                className="topbar-arrow clickable"
                style={{ marginRight: 8 }}
                onClick={() => setSelectedProject(null)}
              />
            )}
            <span className="allprojects-title">
              {selectedProject
                ? currentProject?.title || "Project"
                : activeKey === "all"
                ? "All projects"
                : activeKey.charAt(0).toUpperCase() + activeKey.slice(1)}
            </span>
          </div>
        </header>

        {selectedProject && currentProject ? (
          <section
            className="project-detail-section"
            style={{ flexDirection: isMobile ? "column" : "row" }}
          >
            <div
              className="project-detail-image"
              style={{ order: isMobile ? 2 : 1 }}
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                style={{ width: "100%" }}
              />
            </div>
            <div
              className="project-detail-info"
              style={{ order: isMobile ? 1 : 2 }}
            >
              <h2 style={{ marginTop: 0 }}>{currentProject.title}</h2>
              <div className="project-detail-description">
                {renderProjectBody(currentProject)}
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
              ref={gridRef}
            >
              {foldersToShow.map((folder, idx) => (
                <div
                  key={idx}
                  ref={addFolderRef}
                  className="project-folder"
                  onClick={() => setSelectedProject(getSlug(folder.name))}
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

        <div
          ref={footerRef}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            zIndex: 5000,
          }}
        >
          <Footer hideIconBar showCopyright />
        </div>
      </main>
    </div>
  );
}
