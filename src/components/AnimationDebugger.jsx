import React, { useState, useEffect } from "react";
import { animationManager } from "../utils/animationManager";

export default function AnimationDebugger() {
  const [status, setStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setStatus(animationManager.getStatus());
    };

    // Update status every second
    const interval = setInterval(updateStatus, 1000);
    updateStatus(); // Initial update

    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const debugAnimations = () => {
    animationManager.debug();
  };

  const refreshAnimations = () => {
    animationManager.refresh();
  };

  const cleanupAnimations = () => {
    animationManager.cleanup();
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 10000,
          background: "#333",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        Debug Animations
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 10000,
        background: "#333",
        color: "#fff",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "12px",
        minWidth: "250px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "14px" }}>Animation Debugger</h3>
        <button
          onClick={toggleVisibility}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ×
        </button>
      </div>
      
      {status && (
        <div style={{ marginBottom: "10px" }}>
          <div>Active Animations: {status.activeAnimations}</div>
          <div>ScrollTriggers: {status.totalScrollTriggers}</div>
          <div>Initialized: {status.isInitialized ? "Yes" : "No"}</div>
        </div>
      )}
      
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          onClick={debugAnimations}
          style={{
            background: "#555",
            color: "#fff",
            border: "none",
            padding: "5px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          Debug
        </button>
        <button
          onClick={refreshAnimations}
          style={{
            background: "#555",
            color: "#fff",
            border: "none",
            padding: "5px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
        <button
          onClick={cleanupAnimations}
          style={{
            background: "#c00",
            color: "#fff",
            border: "none",
            padding: "5px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          Cleanup
        </button>
      </div>
    </div>
  );
} 