import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CustomerRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.isAdmin) return <Navigate to="/admin/dashboard" />;

  return children;
};

export default CustomerRoute;
