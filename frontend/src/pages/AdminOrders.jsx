import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminOrders = ({ embedded = false }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/api/orders");
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <>
      {!embedded && <Navbar />}

      <div className={`${embedded ? "p-6" : "mx-auto min-h-screen max-w-7xl px-4 py-10"}`}>
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950">
          List of Orders
        </h1>

        {loading ? (
          <p className="text-sm text-slate-600">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="border-b border-slate-200 p-3 text-left">Order ID</th>
                  <th className="border-b border-slate-200 p-3 text-left">Customer</th>
                  <th className="border-b border-slate-200 p-3 text-left">Total</th>
                  <th className="border-b border-slate-200 p-3 text-left">Date</th>
                  <th className="border-b border-slate-200 p-3 text-left">Status</th>
                  <th className="border-b border-slate-200 p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-slate-100 text-slate-700">
                    <td className="p-3 font-semibold text-slate-900">
                      {order._id.slice(-6)}
                    </td>

                    <td className="p-3">
                      {order.user?.name || order.shippingAddress.fullName}
                    </td>

                    <td className="p-3 font-semibold text-slate-900">
                      ${order.totalPrice}
                    </td>

                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {order.isDelivered ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                          Delivered
                        </span>
                      ) : order.isPaid ? (
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
                          Paid
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                          Pending
                        </span>
                      )}
                    </td>


                    <td className="p-3">
                      <Link
                        to={`/order/admin/${order._id}`}
                        className="font-semibold text-emerald-700 underline-offset-4 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!embedded && <Footer />}
    </>
  );
};

export default AdminOrders;
