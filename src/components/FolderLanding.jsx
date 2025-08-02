import React from "react";
import folderIcon from "../assets/images/folder.svg";

export default function FolderLanding({ onOpen }) {
  return (
    <div className="full-screen center-content" style={{ position: "relative" }}>
      {/* Original Folder Content */}
      <div className="absolute-center" style={{ zIndex: 3 }}>
        <div className="z-front center-folder">
          <img
            src={folderIcon}
            alt="Folder"
            className="folder-icon folder-clickable"
            draggable={false}
            onClick={onOpen}
          />
        </div>
      </div>
    </div>
  );
}
