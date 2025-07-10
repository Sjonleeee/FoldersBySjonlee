import React from "react";
import { LoadingProvider } from "./context/LoadingContext";
import MainLayout from "./layout/MainLayout";
import FolderPage from "./pages/FolderPage";

export default function App() {
  return (
    // <LoadingProvider>
    //   <MainLayout>
    <FolderPage />
    // </MainLayout>
    // </LoadingProvider>
  );
}
