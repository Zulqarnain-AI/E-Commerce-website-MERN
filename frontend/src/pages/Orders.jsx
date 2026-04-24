import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;

      const { data } = await api.get("/api/orders/myorders");

      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "pending") return !order.isPaid && !order.isDelivered;
    if (statusFilter === "paid") return order.isPaid && !order.isDelivered;
    if (statusFilter === "delivered") return order.isDelivered;

    return true;
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">My Orders</h1>
      <p className="mt-2 text-sm text-slate-600">Track pending, paid, and delivered purchases.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          ["All", "all"],
          ["Pending", "pending"],
          ["Paid", "paid"],
          ["Delivered", "delivered"],
        ].map(([label, value]) => (
          <Link
            key={value}
            to={value === "all" ? "/dashboard/orders" : `/dashboard/orders?status=${value}`}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
              statusFilter === value
                ? "bg-slate-950 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">No orders found for this status.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {filteredOrders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Order ID</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{order._id}</p>
                </div>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                    order.isDelivered
                      ? "bg-emerald-100 text-emerald-700"
                      : order.isPaid
                        ? "bg-sky-100 text-sky-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                Total: <span className="font-semibold text-slate-900">${order.totalPrice}</span>
              </p>

              <Link
                to={`/order/user/${order._id}`}
                className="mt-3 inline-flex text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
              >
                View order details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
