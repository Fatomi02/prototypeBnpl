import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  let auth = localStorage.getItem('access_token')
  if (!auth) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default ProtectedRoute;