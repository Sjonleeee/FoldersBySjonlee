import { LoadingProvider } from "./context/LoadingContext";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    // <LoadingProvider>
    //   <MainLayout>
    <MainPage />
    //   </MainLayout>
    // </LoadingProvider>
  );
}
