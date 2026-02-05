import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/products"
    );
    setProducts(data);
    setLoading(false);
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

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
        <Link to="/admin/orders" className="bg-black text-white px-4 py-2 rounded">
          list of orders
        </Link><br /><br />
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
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
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border flex gap-3">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="text-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteHandler(product._id)}
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
  );
};

export default AdminProductList;
