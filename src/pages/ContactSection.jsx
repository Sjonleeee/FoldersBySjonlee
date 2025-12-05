import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/contactsection.css";
import smallFolder from "/assets/images/smallFolder.png";
import { FiMail } from "react-icons/fi";
import { FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialsRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Set initial positions
    gsap.set([titleRef.current, descriptionRef.current, socialsRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30,
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start when section is 80% in view
        end: "bottom 20%",
        scrub: false, // No scrub for this one
        toggleActions: "play none none reverse",
      },
    });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2, // Normal fade-in duration
      ease: "power2.out",
    });

    tl.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2, // Normal fade-in duration
      ease: "power2.out",
    }, "+=0.4");

    tl.to(socialsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2, // Normal fade-in duration
      ease: "power2.out",
    }, "+=0.4");

    tl.to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2, // Normal fade-in duration
      ease: "power2.out",
    }, "+=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  const handleProjectsClick = () => {
    const section = document.querySelector(".contact-section");
    if (section) {
      gsap.to(section, {
        opacity: 0,
        duration: 0.7, // Smooth fade-out duration
        ease: "power2.inOut",
        onComplete: () => navigate("/projects"),
      });
    } else {
      navigate("/projects");
    }
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/sjonlee/?hl=en", "_blank");
  };

  return (
    <section 
      className="contact-section" 
      ref={sectionRef}
    >
      <div className="background-image"></div>
      <div className="overlay"></div>
      <div className="contact-content">
        <h1 className="contact-title hermaiona-title-style" ref={titleRef}>Let's Connect</h1>
        <p className="contact-description" ref={descriptionRef}>
          Ready to collaborate? Get in touch
        </p>
        <div className="contact-socials" ref={socialsRef}>
          <a
            href="mailto:info.sjonlee@gmail.com"
            className="contact-social-icon"
            aria-label="Email"
          >
            <FiMail />
          </a>
          <a
            href="https://www.behance.net/minhtriha2?tracking_source=search_projects|mark%20forster"
            className="contact-social-icon"
            aria-label="Behance"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBehance />
          </a>
          <a
            href="https://be.linkedin.com/in/minhtriha"
            className="contact-social-icon"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/Sjonlee"
            className="contact-social-icon"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="contact-buttons" ref={buttonsRef}>
          <button
            className="contact-folder-btn folder-btn-bg"
            style={{ backgroundImage: `url(${smallFolder})` }}
            onClick={handleProjectsClick}
          >
            PROJECTS_
          </button>
          <button
            className="contact-folder-btn folder-btn-bg"
            style={{ backgroundImage: `url(${smallFolder})` }}
            onClick={handleInstagramClick}
          >
            CONTACT_
          </button>
        </div>
      </div>
    </section>
  );
}
