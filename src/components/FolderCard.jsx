import React from "react";
import bigFolder from "../assets/images/bigFolder.png";
import "./FolderCard.css";

export default function FolderCard({ fancy, title, tags }) {
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
      <div className="folder-fancy hermaiona-title-style">{fancy}</div>
      <div className="folder-title">{title}</div>
      <div className="folder-tags">{tags}</div>
    </div>
  );
} 