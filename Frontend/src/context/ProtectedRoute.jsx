import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const [authUser, , authLoading] = useAuth();

  if (authLoading) {
    return <p className="text-center mt-20">Checking session...</p>;
  }

  if (!authUser) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <p>Please log in to view this page.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
