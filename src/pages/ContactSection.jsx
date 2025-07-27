import React from "react";
import "../styles/contactsection.css";
import smallFolder from "../assets/images/smallFolder.png";
import { FiMail } from "react-icons/fi";
import { FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ContactSection() {
  const navigate = useNavigate();
  const handleProjectsClick = () => {
    navigate("/projects");
  };
  
  return (
    <section className="contact-section">
      <div className="contact-content">
        <h1 className="contact-title">Sjonlee Ha</h1>
        <p className="contact-description">
          Creative Developer | Entrepreneur
        </p>
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