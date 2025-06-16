import React from "react";
import folderIcon from "../assets/images/folder.svg";

const FolderDisplay = ({ onClick }) => {
  return (
    <div className="absolute-center pointer-none">
      <div className="z-front pointer-auto">
        <img
          src={folderIcon}
          alt="Folder"
          className="folder-icon folder-clickable"
          draggable={false}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default FolderDisplay; 