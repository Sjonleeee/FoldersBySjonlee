import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MenuProvider } from "./context/MenuContext";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import AllProjectsPage from "./pages/AllProjectsPage";
import MouseFollower from "./components/MouseFollower";

export default function App() {
  return (
    <Router>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
        </Routes>
      </MenuProvider>
    </Router>
  );
}
