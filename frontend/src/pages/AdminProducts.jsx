import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/products"
    );
    setProducts(data);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto min-h-screen px-4 py-10">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Admin – Products
          </h1>

          <Link
            to="/admin/product/create"
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Product
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Stock</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border p-3">{p.name}</td>
                <td className="border p-3">${p.price}</td>
                <td className="border p-3">{p.category}</td>
                <td className="border p-3">{p.countInStock}</td>
                <td className="border p-3 space-x-3">
                  <Link
                    to={`/admin/product/${p._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteHandler(p._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default AdminProducts;
