import React, { useState, useEffect } from "react";
import iconData from "../config/iconData";
import { useMenu } from "../context/MenuContext";
import "../styles/footer.css";

const Footer = ({ hideIconBar, showCopyright }) => {
  const { menuOpen } = useMenu();
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
    <footer className="footer">
      <div className="footer-inner">
      <div className="footer-left">
        <div style={{ fontSize: "0.75rem" }}>
          Local Time:
          <br />
          <span style={{ color: "white" }}>{formatTime()}</span>
        </div>
      </div>
      <div className="footer-center">
          {!menuOpen && !hideIconBar && (
          <div className="footer-icon-bar">
            {iconData.map((icon) => (
              <div
                key={icon.key}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={icon.icon}
                  alt={icon.label}
                  className="footer-icon footer-icon-img"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopup(activePopup === icon.key ? null : icon.key);
                  }}
                />
                {activePopup === icon.key && (
                  <div
                    className="footer-icon-popup"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <strong>{icon.label}</strong>
                    <div style={{ marginTop: "0.3rem" }}>{icon.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="footer-right">
          {!menuOpen && !showCopyright ? (
          <div className="footer-scroll-card">
            <div className="footer-scroll-content">
              <div className="footer-scroll-textblock">
                <span className="footer-scroll-label">Scroll Down</span>
                <span className="footer-scroll-desc">to discover</span>
              </div>
              <span className="footer-scroll-arrow">&#x25BC;</span>
            </div>
          </div>
        ) : (
          <div className="footer-copyright">
            <span className="footer-copyright-label">2025</span>
            <span className="footer-copyright-value">by rinkitou®</span>
          </div>
        )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
