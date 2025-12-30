import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must login first to access this feature.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
