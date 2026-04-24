import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
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

      const { data } = await api.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress: shipping,
          itemsPrice,
          shippingPrice,
          totalPrice,
        }
      );

      clearCart();
      navigate(`/order-success/${data.orderId || data._id}`);
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

      <div className="mx-auto min-h-screen max-w-md px-4 py-16">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Shipping Address</h1>
        <p className="mb-6 text-sm text-slate-600">Step 1 of 2: enter delivery details.</p>

        <form onSubmit={submitHandler} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {Object.keys(shipping).map((field) => (
            <input
              key={field}
              name={field}
              required
              placeholder={field.replace(/([A-Z])/g, " $1")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
              value={shipping[field]}
              onChange={handleChange}
            />
          ))}

          <button className="w-full rounded-2xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800">
            Continue
          </button>
        </form>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              Confirm Order
            </h2>

            <p className="mb-4 text-slate-600">
              Are you sure you want to place this order?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={confirmOrderHandler}
                disabled={loading}
                className="rounded-2xl bg-slate-950 px-4 py-2 text-white"
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
