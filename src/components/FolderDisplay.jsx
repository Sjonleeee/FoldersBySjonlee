import React from "react";

const FolderDisplay = ({ onClick }) => {
  return (
    <div className="absolute-center pointer-none">
      <div className="z-front pointer-auto">
        <img
          src="/assets/images/folder.svg"
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