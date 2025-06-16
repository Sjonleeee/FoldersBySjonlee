import React from "react";
import folderIcon from "../../assets/images/folder.svg";
import { useMouseGlow } from "../../hooks/useMouseGlow";

const CreativeDeveloperTitle = () => {
  const { x, y } = useMouseGlow();
  
  const glowStyle = {
    textShadow: `
      ${x * 20}px ${y * 20}px 10px rgba(255, 255, 255, 0.5),
      ${x * 40}px ${y * 40}px 20px rgba(255, 255, 255, 0.3),
      ${x * 60}px ${y * 60}px 30px rgba(255, 255, 255, 0.2)
    `,
    transition: 'text-shadow 0.1s ease-out'
  };

  return (
    <div className="title-container">
      <div className="left-title" style={glowStyle}>
        Creative
      </div>
      <div className="center-folder">
        <img src={folderIcon} alt="Folder" className="folder-icon" />
      </div>
      <div className="right-title" style={glowStyle}>
        Developer
      </div>
    </div>
  );
};

export default CreativeDeveloperTitle; 