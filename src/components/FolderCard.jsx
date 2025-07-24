import React from "react";
import bigFolder from "../assets/images/folderBig.png";
import "../styles/FolderCard.css";

export default function FolderCard({ fancy, title, subtitle, tags }) {
  return (
    <div
      className="folder-card"
      style={{
        backgroundImage: `url(${bigFolder})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="folder-card-content">
        <div className="folder-title-row">
          <span className="folder-fancy hermaiona-title-style">{fancy}</span>
          <span className="folder-title">{title}</span>
          {subtitle && <span className="folder-subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="folder-tags">{tags}</div>
    </div>
  );
} 