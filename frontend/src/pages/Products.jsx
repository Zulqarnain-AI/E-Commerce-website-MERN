import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(5000);
  const {cate} = useParams();
  const location = useLocation();
  const [category, setCategory] = useState(cate === "All" ? "" : cate);
  const [search, setSearch] = useState(
    () => new URLSearchParams(location.search).get("keyword") || ""
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/api/products", {
        params: {
          category,
          maxPrice: price,
          keyword: search,
        },
      });
      setProducts(data);
    };

    void fetchProducts();
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
          <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Explore products</h1>
            <p className="mt-2 text-sm text-slate-600">
              Search by keyword, filter by category, and buy new products instantly.
            </p>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
          />
          </div>

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
