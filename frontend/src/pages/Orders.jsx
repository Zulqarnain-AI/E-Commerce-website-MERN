import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        "http://localhost:5000/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <p><b>ID:</b> {order._id}</p>
              <p><b>Total:</b> ${order.totalPrice}</p>
              <p><b>Status:</b> {order.isDelivered ? "Delivered" : "Pending"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
