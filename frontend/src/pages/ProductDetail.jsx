import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2">

        {/* IMAGE */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="h-[400px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-2 text-slate-600">
            Category: {product.category}
          </p>

          <p className="mt-4 text-2xl font-semibold text-slate-950">
            ${product.price}
          </p>

          <p className="mt-4 leading-relaxed text-slate-700">
            {product.description}
          </p>

          <p
            className={`mt-4 font-semibold ${product.countInStock > 0
                ? "text-green-600"
                : "text-red-600"
              }`}
          >
            {product.countInStock > 0
              ? "In Stock"
              : "Out of Stock"}
          </p>

          {product.countInStock > 0 && (
            <div className="mt-6">
              <QuantitySelector
                qty={qty}
                setQty={setQty}
                max={product.countInStock}
              />
            </div>
          )}

          <button
            disabled={product.countInStock === 0}
            onClick={() => addToCart(product, qty)}
            className="mt-6 w-full rounded-2xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:bg-slate-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
