import React from "react";

const Header = () => {
  return (
    <header style={{
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: "2.5rem",
      gap: "3rem"
    }}>
      <div style={{ display: "flex", flexDirection: "column", minWidth: "90px" }}>
        <div style={{ 
          fontWeight: "bold", 
          lineHeight: "1.25", 
          fontSize: "0.875rem", 
          display: "flex", 
          alignItems: "center" 
        }}>
          <div style={{ 
            width: "0.75rem", 
            height: "0.75rem", 
            backgroundColor: "#22c55e", 
            borderRadius: "50%", 
            marginRight: "0.5rem" 
          }}></div>
          Sjonlee<br />Ha
        </div>
      </div>
      <div style={{ 
        fontSize: "0.75rem", 
        color: "#6b7280", 
        textAlign: "left", 
        minWidth: "180px" 
      }}>
        Available for freelance:<br />
        <span style={{ color: "white" }}>info.sjonlee@gmail.com</span>
      </div>
      <div style={{ 
        fontSize: "0.75rem", 
        textAlign: "right", 
        minWidth: "180px" 
      }}>
        React, Three.js, Blender<br />
        <span style={{ color: "#9ca3af" }}>Figma, Illustrator, Photoshop,<br />Premiere pro,</span>
      </div>
      <div style={{ 
        fontWeight: "bold", 
        cursor: "pointer", 
        fontSize: "0.875rem", 
        minWidth: "60px", 
        textAlign: "right" 
      }}>MENU</div>
    </header>
  );
};

export default Header;
