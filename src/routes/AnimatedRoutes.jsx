import React, { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MainPage from "../pages/MainPage";
import AllProjectsPage from "../pages/AllProjectsPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";

export default function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={800}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/projects" element={<AllProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
} 