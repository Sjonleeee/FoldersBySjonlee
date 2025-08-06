import React from "react";
import "../../styles/onepager.css";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contact</h2>
        <div className="contact-icons">
          <a href="mailto:your@email.com" className="contact-icon" aria-label="Email" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://github.com/yourgithub" className="contact-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/yourlinkedin" className="contact-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://instagram.com/yourinstagram" className="contact-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <input type="text" className="contact-input" placeholder="Your Name" required />
          <input type="email" className="contact-input" placeholder="Your Email" required />
          <textarea className="contact-textarea" placeholder="Your Message" required></textarea>
          <button type="submit" className="contact-submit">Send</button>
        </form>
      </div>
    </section>
  );
}