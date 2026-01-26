import { useEffect, useState } from "react";
import axios from "axios";
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products?featured=true"
      );
      setProducts(data);
      console.log(data)
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-60 w-full object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>

            <button className="mt-3 w-full bg-black text-white py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
