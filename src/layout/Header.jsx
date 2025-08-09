import React, { useRef, useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FiMail } from "react-icons/fi";
import { FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../styles/header.css";

const menuItems = ["Home", "Projects", "Rinkitou®"];

const Header = ({ onLogoClick }) => {
  const { menuOpen, setMenuOpen } = useMenu();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, setMenuOpen]);

  const handleMenuClick = (item) => {
    if (item === "Home") {
      // Navigate to home
      navigate("/");
      setMenuOpen(false);
    } else if (item === "Projects") {
      // Smooth fade-out animation before navigating to All Projects page
      const menu = document.querySelector(".header-fullscreen-menu");
      if (menu) {
        gsap.to(menu, {
          opacity: 0,
          duration: 0.7, // Smooth fade-out duration
          ease: "power2.inOut",
          onComplete: () => {
            navigate("/projects");
            setMenuOpen(false);
          },
        });
      } else {
        navigate("/projects");
        setMenuOpen(false);
      }
    } else if (item === "Rinkitou®") {
      window.open("https://www.rinkitou.com", "_blank");
      setMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo-container">
          <div
            className={`header-logo${
              onLogoClick ? " header-logo-clickable" : ""
            }`}
            onClick={onLogoClick}
          >
            <div className="header-status-dot"></div>
            Sjonlee
            <br />
            Ha
          </div>
        </div>
        <div className="header-freelance">
          Available for freelance:
          <br />
          <span className="header-email">info.sjonlee@gmail.com</span>
        </div>
        <div className="header-skills">
          React, Three.js, Blender
          <br />
          <span className="header-skills-secondary">
            Figma, Illustrator, Photoshop,
            <br />
            Premiere pro,
          </span>
        </div>
        <div className="header-menu" ref={menuRef}>
          <span
            className="header-menu-span"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {"MENU".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </span>
          {menuOpen && (
            <div className="header-fullscreen-menu">
              <button
                className="header-menu-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
              <nav className="header-fullscreen-menu-content">
                {menuItems.map((item) => (
                  <div
                    className="header-dropdown-item"
                    key={item}
                    onClick={() => handleMenuClick(item)}
                    style={{
                      cursor:
                        item === "Home" || item === "Projects"
                          ? "pointer"
                          : "default",
                    }}
                  >
                    <span className="menu-initial">{item[0]}</span>
                    {item.slice(1)}
                  </div>
                ))}
                <div className="header-social-icons">
                  <a
                    href="mailto:info.sjonlee@gmail.com"
                    className="header-social-icon"
                    aria-label="Email"
                  >
                    <FiMail />
                  </a>
                  <a
                    href="https://www.behance.net/minhtriha2?tracking_source=search_projects|mark%20forster"
                    className="header-social-icon"
                    aria-label="Behance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaBehance />
                  </a>
                  <a
                    href="https://be.linkedin.com/in/minhtriha"
                    className="header-social-icon"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com/Sjonlee"
                    className="header-social-icon"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
