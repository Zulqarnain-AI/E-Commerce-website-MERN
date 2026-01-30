import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [ disable, setDisable ] = useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products?featured=true"
      );
      setProducts(data);
    };
    fetchProducts();
  }, []);
  const handleButton = (product) => {
    console.log(disable)
    setDisable(true);
    addToCart(product, 1);
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover rounded"
              />
            </Link>
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>

            <button disabled={disable}
              onClick={() => { handleButton(product) }}
              className="mt-3 w-full bg-black text-white py-2 rounded hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 "
            >
              {disable ? "Item is added" : "Add to Cart"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
