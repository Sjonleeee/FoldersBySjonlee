import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-container">
        <div className="header-logo">
          <div className="header-status-dot"></div>
          Sjonlee<br />Ha
        </div>
      </div>
      <div className="header-freelance">
        Available for freelance:<br />
        <span className="header-email">info.sjonlee@gmail.com</span>
      </div>
      <div className="header-skills">
        React, Three.js, Blender<br />
        <span className="header-skills-secondary">
          Figma, Illustrator, Photoshop,<br />Premiere pro,
        </span>
      </div>
      <div className="header-menu">MENU</div>
    </header>
  );
};

export default Header;
