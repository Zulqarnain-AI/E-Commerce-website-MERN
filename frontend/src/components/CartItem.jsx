import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQty } = useCart();

  return (
    <div className="flex gap-4 border rounded-lg p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              updateQty(item._id, Number(e.target.value))
            }
            className="w-16 border rounded px-2"
          />

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
