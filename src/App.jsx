import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useUserStore } from "./store/userStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage/login";

function App() {
  const { isAuthenticated } = useUserStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding/*" element={<OnboardingPage />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <ToastContainer 
      pauseOnHover={true}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={true}
      />
    </>
  );
}

export default App;
