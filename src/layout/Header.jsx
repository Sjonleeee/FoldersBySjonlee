import React, { useRef, useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import '../styles/header.css';

const menuItems = ["Home", "Projects", "About", "Contact"];

const Header = ({ onLogoClick }) => {
  const { menuOpen, setMenuOpen } = useMenu();
  const menuRef = useRef(null);

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
  }, [menuOpen]);

  const handleMenuClick = (item) => {
    if (item === "Home") {
      // For now, just close menu - navigation handled by parent
      setMenuOpen(false);
    } else if (item === "Projects") {
      // For now, just close menu - navigation handled by parent
      setMenuOpen(false);
    }
    // You can add more navigation for About/Contact if needed
  };

  return (
    <header className="header">
      <div className="header-inner">
      <div className="header-logo-container">
        <div
          className={`header-logo${onLogoClick ? " header-logo-clickable" : ""}`}
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
          {"MENU".split('').map((letter, index) => (
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
                  style={{ cursor: item === "Home" || item === "Projects" ? "pointer" : "default" }}
                >
                  <span className="menu-initial">{item[0]}</span>
                  {item.slice(1)}
                </div>
              ))}
            </nav>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
