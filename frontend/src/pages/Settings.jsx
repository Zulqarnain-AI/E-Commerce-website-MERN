import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Settings</h1>
      <p className="mt-2 text-sm text-slate-600">Manage your session and account access preferences.</p>

      <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{user?.name || "User"}</p>
          <p className="text-sm text-slate-600">{user?.email}</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Log out from this session
        </button>
      </div>
    </div>
  );
};

export default Settings;