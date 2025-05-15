import React from "react";

export default function FolderPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/assets/images/folder.svg"
        alt="Folder"
        className="w-40 h-32 object-contain drop-shadow-2xl"
        draggable={false}
      />
    </section>
  );
}
