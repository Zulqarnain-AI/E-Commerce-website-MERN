import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const PlaceOrderPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const placeOrderHandler = async () => {
    const { data } = await api.post(
      "/api/orders",
      {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
      }
    );

    clearCart();
    navigate(`/order-success/${data.orderId || data._id}`);
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Place Order</h1>

      <button
        onClick={placeOrderHandler}
        className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrderPage;
