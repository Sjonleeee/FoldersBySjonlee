import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import FolderPage from "../sections/FolderPage";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showFolder, setShowFolder] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setFadeOut(true); // Start fade out
        setTimeout(() => {
          setLoading(false); // Remove loader
          setShowFolder(true); // Show folder page
        }, 800); // Match fade out duration
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Loader: fade in on mount, fade out on finish
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div
          className={`
            animate-fadein
            transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]
            ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          <div className="px-4 sm:px-8 md:px-16">
            <LoadingScreen progress={progress} />
          </div>
        </div>
      </div>
    );
  }

  // FolderPage: fade in when shown
  if (showFolder) {
    return (
      <div className="animate-fadein transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="px-4 sm:px-8 md:px-16">
          <FolderPage />
        </div>
      </div>
    );
  }

  return null;
}