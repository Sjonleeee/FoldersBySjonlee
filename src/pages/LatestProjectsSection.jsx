import React from "react";
import bigFolder from "../assets/images/bigFolder.png";
import "../styles/latestprojects.css";

const projects = [
  {
    fancy: "V",
    title: "olkswagen Project®",
    tags: "[ UX / UI, Interface Design, Concept ]",
  },
  {
    fancy: "C",
    title: "hrome Magazine Berlin®",
    tags: "[ Magazine design, Graphic Design, Video edits ]",
  },
  {
    fancy: "R",
    title: "inkitou Creative Agency®",
    tags: "[ Branding, Entrepreneurship, Management ]",
  },
];

export default function LatestProjectsSection() {
  return (
    <section className="latest-projects-section">
      <h2 className="latest-projects-title hermaiona-title-style">Latest Projects</h2>
      <div className="latest-projects-grid">
        {projects.map((project, idx) => (
          <div
            className="project-folder-card"
            key={idx}
            style={{ backgroundImage: `url(${bigFolder})` }}
          >
            <div className="folder-content">
              <div className="folder-title-row">
                <span className="project-fancy-letter hermaiona-title-style">{project.fancy}</span>
                <span className="project-title">{project.title}</span>
            </div>
              <div className="project-tags">{project.tags}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
