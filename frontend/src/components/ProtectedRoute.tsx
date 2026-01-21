// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function ProtectedRoute() {
//   const { loading, isAuthenticated } = useAuth();

//   if (loading) return <p>Checking session...</p>;

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// }



import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute(){
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/" replace />

  return <Outlet />
}