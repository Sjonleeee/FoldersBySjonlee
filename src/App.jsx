import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import { LoadingProvider } from "./context/LoadingContext";
import MainPage from "./pages/MainPage";
import AllProjectsPage from "./pages/AllProjectsPage";

export default function App() {
  return (
    <Router>
      <LoadingProvider>
        <MenuProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/projects" element={<AllProjectsPage />} />
          </Routes>
        </MenuProvider>
      </LoadingProvider>
    </Router>
  );
}
