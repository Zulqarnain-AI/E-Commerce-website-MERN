import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmOrderHandler = async () => {
    try {
      setLoading(true);

      const itemsPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      const totalPrice = itemsPrice + shippingPrice;

      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems,
          shippingAddress: shipping,
          itemsPrice,
          shippingPrice,
          totalPrice,
        }
      );

      clearCart();
      navigate(`/order-success/${data.orderId}`);
    } catch (error) {
  console.error(
    "ORDER ERROR:",
    error.response?.data || error.message
  );
  alert(error.response?.data?.message || "Order failed");
} finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto min-h-screen px-4 py-16">
        <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {Object.keys(shipping).map((field) => (
            <input
              key={field}
              name={field}
              required
              placeholder={field.replace(/([A-Z])/g, " $1")}
              className="w-full border p-3 rounded"
              value={shipping[field]}
              onChange={handleChange}
            />
          ))}

          <button className="w-full bg-black text-white py-3 rounded">
            Continue
          </button>
        </form>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">
              Confirm Order
            </h2>

            <p className="text-gray-600 mb-4">
              Are you sure you want to place this order?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmOrderHandler}
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded"
              >
                {loading ? "Placing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CheckoutPage;
