import "../styles/latestprojects.css";
import longFolder from "../assets/images/longFolder.png";
import project1 from "../assets/images/latestProjects/project1.png";
import project2 from "../assets/images/latestProjects/project2.png";
import project3 from "../assets/images/latestProjects/project3.png";

const folders = [
  { id: "folder1", src: longFolder, z: 1 },
  { id: "folder2", src: longFolder, z: 3 }, // hoogste z-index
  { id: "folder3", src: longFolder, z: 2 },
];

const projects = [
  {
    title: "Volkswagen Project®",
    fancyLetter: "V",
    tags: ["UX / UI", "Interface Design", "Concept"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    image: project1,

    imageBg: "bg-gradient-to-r from-orange-400 to-pink-500",
  },
  {
    title: "Chrome Magazine®",
    fancyLetter: "C",
    tags: ["Magazine design", "Graphic Assistant", "Video editing"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    image: project2,
    imageBg: "bg-black",
  },
  {
    title: "Rinkitou Creative Agency®",
    fancyLetter: "R",
    tags: ["Branding", "Entrepreneurship", "Management"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    image: project3,
    imageBg: "bg-white",
  },
];

export default function LatestProjectsSection() {
  return (
    <section className="latest-projects-section">
      <h2 className="latest-projects-title">Latest projects</h2>
      <div className="latest-projects-list">
        {[...projects].reverse().map((project, idx) => (
          <div
            key={idx}
            className="latest-project-row"
            style={{
              backgroundImage: `url(${longFolder})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            {/* Titel */}
            <div className="latest-project-title">
              <span className="latest-project-fancy">
                {project.fancyLetter}
              </span>
              <span className="latest-project-name">
                {project.title.replace(project.fancyLetter, "")}
              </span>
            </div>
            {/* Tags */}
            <div className="latest-project-tags">
              <span>
                {"{ "}
                {project.tags.map((tag, i) => (
                  <span key={i} className="mr-1">
                    {tag}
                    {i < project.tags.length - 1 ? ", " : ""}
                  </span>
                ))}
                {" }"}
              </span>
            </div>
            {/* Beschrijving */}
            <div className="latest-project-desc">{project.description}</div>
            {/* Afbeelding */}
            <div className="latest-project-image">
              <img src={project.image} alt={project.imageAlt} />
              <span className="latest-project-image-text">
                {project.imageText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
