import React from "react";
import "../styles/contactsection.css";
import smallFolder from "../assets/images/smallFolder.png";
import { FiMail } from "react-icons/fi";
import { FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ContactSection() {
  const navigate = useNavigate();
  return (
    <section className="contact-section">
      <div className="contact-hero">
        <h1 className="hermaiona-title-style">Sjonlee Ha</h1>
        <div className="contact-subtitle">Creative Developer | Entrepreneur</div>
      </div>
      <div className="contact-socials">
        <a href="#" className="contact-social-icon" aria-label="Email"><FiMail /></a>
        <a href="#" className="contact-social-icon" aria-label="Behance"><FaBehance /></a>
        <a href="#" className="contact-social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="#" className="contact-social-icon" aria-label="Instagram"><FaInstagram /></a>
      </div>
      <div className="contact-buttons">
        <button
          className="contact-folder-btn folder-btn-bg"
          style={{ backgroundImage: `url(${smallFolder})` }}
          onClick={() => {
            console.log("PROJECTS button clicked, navigating to /projects");
            navigate("/projects");
          }}
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
    </section>
  );
} 