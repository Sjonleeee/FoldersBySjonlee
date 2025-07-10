import React from "react";
import folderIcon from "../assets/images/folder.svg";

const CreativeDeveloperTitle = () => {
  return (
    <div className="full-screen" style={{position: "relative", zIndex: 10}}>
      {/* Role Labels - repositioned to better match reference image */}
      <span className="role-label" style={{top: "5%", left: "20%"}}>3D Designer</span>
      <span className="role-label" style={{top: "10%", left: "50%", transform: "translateX(-50%)"}}>Entrepreneur</span>
      <span className="role-label" style={{top: "5%", right: "20%"}}>Designer</span>
      <span className="role-label" style={{bottom: "30%", left: "25%"}}>Teamplayer</span>
      <span className="role-label" style={{bottom: "30%", right: "25%"}}>Thinker</span>
      <span className="role-label" style={{bottom: "15%", right: "35%"}}>Director</span>
      <span className="role-label" style={{bottom: "5%", left: "50%", transform: "translateX(-50%)"}}>Hussler</span>
      
      {/* Creative Developer Text with Folder in the exact center */}
      <div className="absolute-center">
        {/* Position Creative text to the left with increased margin */}
        <div className="pointer-none" style={{position: "absolute", right: "50%", marginRight: "5rem"}}>
          <span className="title-text">Creative</span>
        </div>
        
        {/* Keep folder in center position */}
        <div className="z-front">
          <div className="center-content flex-column">
            <img
              src={folderIcon}
              alt="Folder"
              className="folder-icon"
              draggable={false}
            />
          </div>
        </div>
        
        {/* Position Developer text to the right with increased margin */}
        <div className="pointer-none" style={{position: "absolute", left: "50%", marginLeft: "5rem"}}>
          <span className="title-text">Developer</span>
        </div>
      </div>
    </div>
  );
};

export default CreativeDeveloperTitle; 