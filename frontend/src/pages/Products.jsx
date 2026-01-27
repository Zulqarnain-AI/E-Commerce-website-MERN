import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useParams } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(1000);
  const [search, setSearch] = useState("");
  const {cate} = useParams();
  const [category, setCategory] = useState(cate);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products",
        {
          params: {
            category,
            maxPrice: price,
            keyword: search,
          },
        }
      );
      setProducts(data);
      // setCategory(cate)
    };

    fetchProducts();
  }, [category, price, search]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Filters */}
        <Filters
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
          
        />

        {/* Products */}
        <div className="md:col-span-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-4 py-2 mb-6"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
