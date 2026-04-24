import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiPackage, FiSearch, FiSettings, FiShoppingBag, FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const CustomerDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const navClassName = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-950 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();

    if (!query) {
      navigate("/products/All");
      return;
    }

    navigate(`/products/All?keyword=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="px-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Customer Dashboard
          </h2>

          <nav className="mt-4 space-y-2">
            <NavLink to="/dashboard" end className={navClassName}>
              <FiGrid aria-hidden="true" />
              Overview
            </NavLink>

            <NavLink to="/dashboard/profile" className={navClassName}>
              <FiUser aria-hidden="true" />
              Profile
            </NavLink>

            <NavLink to="/dashboard/orders" className={navClassName}>
              <FiPackage aria-hidden="true" />
              Orders
            </NavLink>

            <NavLink to="/dashboard/settings" className={navClassName}>
              <FiSettings aria-hidden="true" />
              Settings
            </NavLink>

            <NavLink to="/products/All" className={navClassName}>
              <FiShoppingBag aria-hidden="true" />
              Shop Products
            </NavLink>
          </nav>

          <form onSubmit={submitSearch} className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label htmlFor="dashboard-search" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick Search
            </label>
            <div className="mt-2 flex items-center gap-2">
              <FiSearch className="text-slate-400" aria-hidden="true" />
              <input
                id="dashboard-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find products"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </form>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Log out
          </button>
        </aside>

        <section className="space-y-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
