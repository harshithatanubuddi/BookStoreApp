import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function AdminRoute({ children }) {
  const [authUser, , authLoading] = useAuth();

  // ⏳ Wait for auth to load
  if (authLoading) {
    return <p className="text-center mt-20">Checking admin session...</p>;
  }

  // ❌ Not logged in
  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  // ❌ Logged in but not admin
  if (authUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin allowed
  return children;
}
