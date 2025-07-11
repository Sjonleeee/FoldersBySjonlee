import React from "react";
import { useLoading } from "../context/LoadingContext";
import LoadingScreen from "../components/LoadingScreen";

const MainLayout = ({ children }) => {
  const { loading, progress } = useLoading();

  return (
    <div className="main-layout" style={{ backgroundColor: "#000000" }}>
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
          <LoadingScreen progress={progress} />
        </div>
      )}

      {/* Main content with fade-in animation when loaded */}
      <div
        className={`transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
