import React, { useState, useEffect } from "react";
import iconData from "../config/iconData";
import { useMenu } from "../context/MenuContext";
import "../styles/footer.css";

const Footer = ({ hideIconBar, showScrollIndicator, showCopyright }) => {
  const { menuOpen } = useMenu();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePopup, setActivePopup] = useState(null);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false);

  useEffect(() => {
    if (showScrollIndicator && !scrollIndicatorVisible) {
      setScrollIndicatorVisible(true);
    }
  }, [showScrollIndicator, scrollIndicatorVisible]);

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
        {/* LEFT: Time */}
        <div className="footer-left">
          <div style={{ fontSize: "0.75rem" }}>
            Local Time:
            <br />
            <span style={{ color: "white" }}>{formatTime()}</span>
          </div>
        </div>

        {/* CENTER: Icon bar */}
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
                      setActivePopup(
                        activePopup === icon.key ? null : icon.key
                      );
                    }}
                  />
                  {activePopup === icon.key && (
                    <div
                      className="footer-icon-popup"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <strong>{icon.label}</strong>
                      <div style={{ marginTop: "0.3rem" }}>
                        {icon.description}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Scroll down indicator or Copyright */}
        <div className="footer-right">
          {showCopyright ? (
            <div className="footer-copyright">
              <span>
                2025 by rinkitou®
                <br />
                All rights reserved.
              </span>
            </div>
          ) : (
            <div className="footer-scroll-indicator">
              <div className="footer-scroll-textblock">
                <span className="footer-scroll-text">Scroll down</span>
                <span className="footer-scroll-text">to see more</span>
              </div>
              <div className="footer-scroll-icon">
                <div className="footer-scroll-arrow"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
