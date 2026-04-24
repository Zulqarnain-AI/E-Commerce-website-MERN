import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link,useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
    <div className="relative">
      <Navbar />

      <div className="mx-auto min-h-screen max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty.{" "}
              <Link to="/products/All" className="font-semibold text-emerald-700">
              Go Shopping
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Summary</h2>
              <p>Total Items: {cartItems.length}</p>
              <p className="text-xl font-semibold mt-2">
                Total: ${total.toFixed(2)}
              </p>

              <button
              onClick={() => navigate("/checkout")}
              className="mt-4 rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
            >
              Proceed to Checkout
            </button>
            </div>
          </div>
        )}
      </div>

      <Footer className="" />
    </div>
    </>
  );
};

export default Cart;
