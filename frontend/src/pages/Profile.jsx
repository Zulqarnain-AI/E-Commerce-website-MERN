import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Profile</h1>
      <p className="mt-2 text-sm text-slate-600">Your account identity and permissions.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Full Name</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{user.name}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{user.email}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Role</p>
          <p className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
            {user.isAdmin ? "Admin" : "Customer"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
