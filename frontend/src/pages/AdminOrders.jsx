import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders"
      );
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto min-h-screen px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">
          Admin – Orders
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Customer</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td className="p-3 border text-sm">
                      {order._id.slice(-6)}
                    </td>

                    <td className="p-3 border">
                      {order.shippingAddress.fullName}
                    </td>

                    <td className="p-3 border font-semibold">
                      ${order.totalPrice}
                    </td>

                    <td className="p-3 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 border">
                      {order.isDelivered ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                          Delivered
                        </span>
                      ) : order.isPaid ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                          Pending
                        </span>
                      )}
                    </td>


                    <td className="p-3 border">
                      <Link
                        to={`/order/admin/${order._id}`}
                        
                        className="text-blue-600 underline">
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

      <Footer />
    </>
  );
};

export default AdminOrders;
