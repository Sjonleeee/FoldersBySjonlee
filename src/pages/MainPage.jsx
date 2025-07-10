import React, { useState } from "react";
import FolderLanding from "./FolderLanding";
import OnePagerSections from "./OnePagerSections";

export default function MainPage() {
  const [folderOpen, setFolderOpen] = useState(false);

  const handleOpen = () => {
    console.log("Folder is now open! Scroll/transition is enabled.");
    setFolderOpen(true);
  };

  return (
    <>
      {!folderOpen ? (
        <FolderLanding onOpen={handleOpen} />
      ) : (
        <OnePagerSections />
      )}
    </>
  );
} 