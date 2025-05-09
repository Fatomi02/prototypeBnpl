import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import { useUserStore } from './store/userStore'

function App() {
  const { isAuthenticated } = useUserStore()

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
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
  )
}

export default App