import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
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

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-2">
            Category: {product.category}
          </p>

          <p className="text-2xl font-semibold mt-4">
            ${product.price}
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
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
            className="mt-6 w-full bg-black text-white py-3 rounded font-semibold disabled:bg-gray-400"
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
