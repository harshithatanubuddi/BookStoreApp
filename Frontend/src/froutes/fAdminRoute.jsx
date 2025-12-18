import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function AdminRoute({ children }) {
  const [authUser] = useAuth();

  if (!authUser) return <Navigate to="/" />;
  if (authUser.role !== "admin") return <Navigate to="/" />;

  return children;
}
