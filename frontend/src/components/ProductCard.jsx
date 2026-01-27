import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-lg transition bg-white">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover rounded-t-lg"
        />
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mt-1">
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold">
            ${product.price}
          </span>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-black text-white px-3 py-1 rounded text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
