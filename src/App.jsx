import { LoadingProvider } from "./context/LoadingContext";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import MouseFollower from "./components/MouseFollower";

export default function App() {
  return (
    <>
      <MouseFollower />
      {/* <LoadingProvider>
      <MainLayout> */}
        <MainPage />
      {/* </MainLayout>
      </LoadingProvider> */}
    </>
  );
}
