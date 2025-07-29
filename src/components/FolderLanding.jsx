import React, { useRef, useEffect, useState } from "react";
import folderIcon from "../assets/images/folder.svg";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.MP4";

export default function FolderLanding({ onOpen }) {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const videos = [video1, video2, video3];

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay failed:", e));
    }

    // Video loop with fade transitions
    const videoInterval = setInterval(() => {
      if (isPlaying) {
        setCurrentVideo(prev => (prev + 1) % videos.length);
      }
    }, 4000);

    return () => clearInterval(videoInterval);
  }, [isPlaying, videos.length]);

  const handleVideoChange = () => {
    // Smooth video transition
    if (videoRef.current) {
      videoRef.current.style.opacity = "0";
      setTimeout(() => {
        setCurrentVideo(prev => (prev + 1) % videos.length);
        if (videoRef.current) {
          videoRef.current.style.opacity = "1";
        }
      }, 500);
    }
  };

  return (
    <div className="full-screen center-content" style={{ position: "relative" }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onEnded={handleVideoChange}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          transition: "opacity 0.5s ease"
        }}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>
      
      {/* Video Overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 2
        }}
      />

      {/* Original Folder Content */}
      <div className="absolute-center" style={{ zIndex: 3 }}>
        <div className="z-front center-folder">
          <img
            src={folderIcon}
            alt="Folder"
            className="folder-icon folder-clickable"
            draggable={false}
            onClick={onOpen}
          />
        </div>
      </div>
    </div>
  );
}
