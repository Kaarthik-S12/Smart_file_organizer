import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
//return true if i have jwt token valid
export default function ProtectedRoute() {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />
}
