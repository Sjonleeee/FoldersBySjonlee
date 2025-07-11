import React, { useState, useEffect } from "react";
import photoshopIcon from "../assets/images/photoshop.png";
import illustratorIcon from "../assets/images/illustrator.png";
import substanceIcon from "../assets/images/substance.svg";
import claudeIcon from "../assets/images/claude.svg";
import figmaIcon from "../assets/images/figma.png";
import vscodeIcon from "../assets/images/vscode.svg";
import blenderIcon from "../assets/images/blender.svg";
import cinemaIcon from "../assets/images/cinema.svg";

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
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} - Belgium`;
  };

  return (
    <footer
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: "2.5rem",
        marginTop: "2rem",
      }}
    >
      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
        Local Time:
        <br />
        <span style={{ color: "white" }}>{formatTime()}</span>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            backgroundColor: "#171717",
            borderRadius: "18px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            padding: "0.40rem 2.5rem",
          }}
        >
          <img
            src={photoshopIcon}
            alt="Photoshop"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={illustratorIcon}
            alt="Illustrator"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={substanceIcon}
            alt="Substance painter"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={claudeIcon}
            alt="Premiere"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={figmaIcon}
            alt="Figma"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={vscodeIcon}
            alt="VS Code"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={blenderIcon}
            alt="XCode"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
          <img
            src={cinemaIcon}
            alt="Blender"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
        </div>
      </div>
      <div style={{ fontSize: "0.75rem", textAlign: "right" }}>
        2025
        <br />
        <span style={{ color: "#9ca3af" }}>by rinkitou®</span>
      </div>
    </footer>
  );
};

export default Footer;
