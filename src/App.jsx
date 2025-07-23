import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MenuProvider } from "./context/MenuContext";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import AllProjectsPage from "./pages/AllProjectsPage";
import MouseFollower from "./components/MouseFollower";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function AnimatedRoutes() {
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
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default function App() {
  return (
    <Router>
      <MenuProvider>
        <AnimatedRoutes />
      </MenuProvider>
    </Router>
  );
}
