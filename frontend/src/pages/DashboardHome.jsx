import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiPackage, FiSearch, FiShoppingBag, FiTruck, FiUser } from "react-icons/fi";
import api from "../services/api";

const DashboardHome = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/api/orders/myorders");
        setOrders(data);
      } catch {
        setOrders([]);
      }
    };

    void fetchOrders();
  }, []);

  const metrics = useMemo(() => {
    const pending = orders.filter((order) => !order.isPaid && !order.isDelivered).length;
    const paid = orders.filter((order) => order.isPaid && !order.isDelivered).length;
    const delivered = orders.filter((order) => order.isDelivered).length;

    return {
      total: orders.length,
      pending,
      paid,
      delivered,
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Your shopping control center</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Track your orders, manage your account, and jump straight back into product discovery.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Orders", value: metrics.total, status: "orders" },
            { label: "Pending", value: metrics.pending, status: "pending" },
            { label: "Paid", value: metrics.paid, status: "paid" },
            { label: "Delivered", value: metrics.delivered, status: "delivered" },
          ].map(({ label, value, status }) => (
            <Link
              key={label}
              to={status === "orders" ? "/dashboard/orders" : `/dashboard/orders?status=${status}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-slate-600">{label}</p>
                {status === "orders" && <FiShoppingBag className="text-slate-500" aria-hidden="true" />}
                {status === "pending" && <FiClock className="text-slate-500" aria-hidden="true" />}
                {status === "paid" && <FiPackage className="text-slate-500" aria-hidden="true" />}
                {status === "delivered" && <FiTruck className="text-slate-500" aria-hidden="true" />}
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          to="/products/All"
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <FiSearch className="text-xl text-emerald-700" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-slate-950">Search products</h2>
          <p className="mt-1 text-sm text-slate-600">Discover new products and buy in a few clicks.</p>
        </Link>

        <Link
          to="/dashboard/profile"
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <FiUser className="text-xl text-emerald-700" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-slate-950">Profile details</h2>
          <p className="mt-1 text-sm text-slate-600">View your account info and current role settings.</p>
        </Link>

        <Link
          to="/dashboard/settings"
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <FiPackage className="text-xl text-emerald-700" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-slate-950">Account settings</h2>
          <p className="mt-1 text-sm text-slate-600">Manage session and your dashboard preferences.</p>
        </Link>
      </section>
    </div>
  );
};

export default DashboardHome;