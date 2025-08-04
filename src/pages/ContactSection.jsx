import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/contactsection.css";
import smallFolder from "../assets/images/smallFolder.png";
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
        start: "top 70%", // Start earlier for end section
        end: "bottom 10%",
        scrub: false, // No scrub for this one
        toggleActions: "play none none reverse",
      },
    });

    // Ultra smooth fade in animatie met stagger
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out", // Ultra soepelere easing
    });

    tl.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out", // Ultra soepelere easing
    }, "+=0.6"); // Langzamere stagger

    tl.to(socialsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out", // Ultra soepelere easing
    }, "+=0.6"); // Langzamere stagger

    tl.to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out", // Ultra soepelere easing
    }, "+=0.6"); // Langzamere stagger

    return () => {
      tl.kill();
    };
  }, []);

  const handleProjectsClick = () => {
    navigate("/projects");
  };

  return (
    <section 
      className="contact-section" 
      ref={sectionRef}

    >
      <div className="contact-content">
        <h1 className="contact-title" ref={titleRef}>Let's Connect</h1>
        <p className="contact-description" ref={descriptionRef}>
          Ready to collaborate? Get in touch
        </p>
        <div className="contact-socials" ref={socialsRef}>
          <a href="#" className="contact-social-icon" aria-label="Email">
            <FiMail />
          </a>
          <a href="#" className="contact-social-icon" aria-label="Behance">
            <FaBehance />
          </a>
          <a href="#" className="contact-social-icon" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" className="contact-social-icon" aria-label="Instagram">
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
          >
            CONTACT_
          </button>
        </div>
      </div>
    </section>
  );
}
