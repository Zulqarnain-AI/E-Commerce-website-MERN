import { Navigate } from "react-router-dom";

const CustomerRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) return <Navigate to="/login" />;

  if (userInfo.isAdmin) return <Navigate to="/admin/dashboard" />;

  return children;
};

export default CustomerRoute;
