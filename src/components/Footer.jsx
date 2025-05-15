import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second to show accurate seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second instead of every minute

    return () => clearInterval(timer);
  }, []);

  // Format time as hours:minutes:seconds AM/PM
  const formatTime = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} - Belgium`;
  };

  return (
    <footer style={{
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: "2.5rem",
      marginTop: "2rem"
    }}>
      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
        Local Time:<br />
        <span style={{ color: "white" }}>{formatTime()}</span>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          backgroundColor: "#171717", 
          borderRadius: "9999px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          padding: "0.5rem 1.5rem" 
        }}>
          <img src="/assets/images/ps.svg" alt="Photoshop" style={{ width: "2rem", height: "2rem" }} />
          <img src="/assets/images/ai.svg" alt="Illustrator" style={{ width: "2rem", height: "2rem" }} />
          <img src="/assets/images/pt.svg" alt="Premiere" style={{ width: "2rem", height: "2rem" }} />
          <img src="/assets/images/figma.svg" alt="Figma" style={{ width: "2rem", height: "2rem" }} />
          <img src="/assets/images/vscode.svg" alt="VS Code" style={{ width: "2rem", height: "2rem" }} />
          <img src="/assets/images/xcode.svg" alt="XCode" style={{ width: "2rem", height: "2rem" }} />
          <img src="/assets/images/blender.svg" alt="Blender" style={{ width: "2rem", height: "2rem" }} />
        </div>
      </div>
      <div style={{ fontSize: "0.75rem", textAlign: "right" }}>
        2025<br />
        <span style={{ color: "#9ca3af" }}>by rinkitou®</span>
      </div>
    </footer>
  );
};

export default Footer;
