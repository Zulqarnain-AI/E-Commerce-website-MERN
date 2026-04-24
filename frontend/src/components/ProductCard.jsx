import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full rounded-t-3xl object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="truncate text-lg font-semibold text-slate-950">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          {product.category}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-950">
            ${product.price}
          </span>

          <button
            onClick={() => addToCart(product, 1)}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
