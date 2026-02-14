import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.isAdmin ? "Admin" : "Customer"}</p>
    </div>
  );
};

export default Profile;
