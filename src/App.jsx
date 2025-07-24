import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import { LoadingProvider } from "./context/LoadingContext";
import AnimatedRoutes from "./routes/AnimatedRoutes";
// import LoadingScreen from "./components/LoadingScreen";

function AppContent() {
  // const { loading, progress } = useLoading();
  // Loader tijdelijk uitgezet voor development
  return (
    <>
      {/* {loading && <LoadingScreen progress={progress} />} */}
      <AnimatedRoutes />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LoadingProvider>
        <MenuProvider>
          <AppContent />
        </MenuProvider>
      </LoadingProvider>
    </Router>
  );
}
