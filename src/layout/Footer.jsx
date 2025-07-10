import React, { useState, useEffect } from "react";
import iconData from "../config/iconData";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = () => setActivePopup(null);
    if (activePopup) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [activePopup]);

  const formatTime = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
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
      <div className="footer-icon-bar">
        {iconData.map((icon) => (
          <div
            key={icon.key}
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={icon.icon}
              alt={icon.label}
              className="footer-icon"
              style={{ width: "2.25rem", height: "2.25rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setActivePopup(activePopup === icon.key ? null : icon.key);
              }}
            />
            {activePopup === icon.key && (
              <div
                style={{
                  position: "absolute",
                  bottom: "120%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#222",
                  color: "#fff",
                  padding: "0.7rem 1.2rem",
                  borderRadius: "0.7rem",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                  fontSize: "0.95rem",
                  minWidth: "180px",
                  zIndex: 10,
                  whiteSpace: "pre-line",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <strong>{icon.label}</strong>
                <div style={{ marginTop: "0.3rem" }}>{icon.description}</div>
              </div>
            )}
          </div>
        ))}
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
