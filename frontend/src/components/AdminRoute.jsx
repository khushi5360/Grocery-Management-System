import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  // Token nahi hai → Login pe bhejo
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Admin nahi hai → Home pe bhejo
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Admin hai → Page dikha do
  return children
}