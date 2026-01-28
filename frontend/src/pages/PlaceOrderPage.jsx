import axios from "axios";
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
    const { data } = await axios.post(
      "http://localhost:5000/api/orders",
      {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
      }
    );

    clearCart();
    navigate(`/order-success/${data._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>

      <button
        onClick={placeOrderHandler}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrderPage;
