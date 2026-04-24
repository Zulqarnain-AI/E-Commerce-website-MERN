import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [busyIds, setBusyIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/api/products", {
        params: { featured: true },
      });

      if (data.length > 0) {
        setProducts(data);
        return;
      }

      const fallback = await api.get("/api/products");
      setProducts(fallback.data.slice(0, 6));
    };
    fetchProducts();
  }, []);

  const handleButton = (product) => {
    addToCart(product, 1);
    setBusyIds((current) => [...current, product._id]);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Curated Picks</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Featured products</h2>
        </div>
        <Link
          to="/products/All"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          View all products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full rounded-2xl object-cover"
              />
            </Link>
            <h3 className="mt-3 font-semibold text-slate-950">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.category}</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">${product.price}</p>

            <button
              disabled={busyIds.includes(product._id)}
              onClick={() => {
                handleButton(product);
              }}
              className="mt-3 w-full rounded-2xl bg-slate-950 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {busyIds.includes(product._id) ? "Added to cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
