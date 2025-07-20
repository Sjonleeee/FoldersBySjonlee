import React from "react";
import "./../styles/onepager.css";

export default function AboutSection() {
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        className="about-name-script"
        style={{
          fontFamily: "Hermaiona, cursive, serif",
          fontSize: "6vw",
          color: "#fff",
          margin: 0,
        }}
      >
        Sjonlee Ha
      </h1>
    </section>
  );
} 