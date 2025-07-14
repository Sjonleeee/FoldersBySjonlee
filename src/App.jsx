import { LoadingProvider } from "./context/LoadingContext";
import { MenuProvider } from "./context/MenuContext";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import MouseFollower from "./components/MouseFollower";

export default function App() {
  return (
    <>
      <MouseFollower />
      <MenuProvider>
        <LoadingProvider>
          <MainLayout>
            <MainPage />
          </MainLayout>
        </LoadingProvider>
      </MenuProvider>
    </>
  );
}
