import { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminOrders from "../AdminOrders";
import { Link } from "react-router-dom";
import { FiBox, FiPlusCircle, FiShoppingCart } from "react-icons/fi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Commerce operations dashboard</h1>
          </div>

          <Link
            to="/admin/product/create"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FiPlusCircle aria-hidden="true" />
            New product
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <FiBox className="text-lg text-emerald-700" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold text-slate-900">Product catalog</p>
            <p className="mt-1 text-sm text-slate-600">Create, edit, and remove SKUs with live updates.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <FiShoppingCart className="text-lg text-emerald-700" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold text-slate-900">Order operations</p>
            <p className="mt-1 text-sm text-slate-600">Track paid, pending, and delivered orders.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <FiPlusCircle className="text-lg text-emerald-700" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold text-slate-900">Fast actions</p>
            <p className="mt-1 text-sm text-slate-600">Switch tabs to manage products or fulfillment quickly.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
              activeTab === "products"
                ? "bg-slate-950 text-white"
                : "border border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            Product List
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
              activeTab === "orders"
                ? "bg-slate-950 text-white"
                : "border border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            Order List
          </button>
        </div>
      </section>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {activeTab === "products" ? <AdminProductList /> : <AdminOrders embedded />}
      </div>
    </div>
  );
};

export default AdminDashboard;
