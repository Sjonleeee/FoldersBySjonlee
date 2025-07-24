import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FolderCard from "./FolderCard";
import "../styles/latestprojects.css";

gsap.registerPlugin(ScrollTrigger);

const folders = [
  {
    fancy: "V",
    title: "olkswagen Project Wolfsburg",
    subtitle: <sup>®</sup>,
    tags: "{ UX / UI, Interface Design, Concept }"
  },
  {
    fancy: "C",
    title: "hrome Magazine Berlin",
    subtitle: <sup>®</sup>,
    tags: "{ Magazine design, Graphic Assistant, Video editing }"
  },
  {
    fancy: "R",
    title: "inkitou Creative Agency",
    subtitle: <sup>®</sup>,
    tags: "{ Branding, Entrepreneurship, Management }"
  }
];

function AnimatedFolderStack() {
  const sectionRef = useRef();
  const folderRefs = [useRef(), useRef(), useRef()];
  const titleRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
        }
      });

      tl.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      tl.fromTo(folderRefs[0].current, { y: "100vh" }, { y: 0, duration: 0.3 });
      tl.fromTo(folderRefs[1].current, { y: "100vh" }, { y: 0, duration: 0.3 });
      tl.fromTo(folderRefs[2].current, { y: "100vh" }, { y: 0, duration: 0.3 });

      // Folders naar grid/rij
      tl.to(folderRefs[0].current, { x: "-33vw", y: "10vh", scale: 1, duration: 0.3 });
      tl.to(folderRefs[1].current, { x: "0vw", y: "10vh", scale: 1, duration: 0.3 }, "<");
      tl.to(folderRefs[2].current, { x: "33vw", y: "10vh", scale: 1, duration: 0.3 }, "<");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="latest-projects-hero" ref={sectionRef}>
      <div className="latest-projects-title hermaiona-title-style" ref={titleRef}>
        Latest Projects
      </div>
      <div className="latest-projects-stack">
        {folders.map((folder, i) => (
          <div ref={folderRefs[i]} key={i}>
            <FolderCard
              fancy={folder.fancy}
              title={folder.title}
              subtitle={folder.subtitle}
              tags={folder.tags}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnimatedFolderStack;
