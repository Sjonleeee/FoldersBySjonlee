import React from "react";
import { MenuProvider } from "./context/MenuContext";
import { LoadingProvider } from "./context/LoadingContext";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <LoadingProvider>
      <MenuProvider>
        <MainPage />
      </MenuProvider>
    </LoadingProvider>
  );
}
