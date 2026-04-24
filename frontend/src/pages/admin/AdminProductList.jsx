import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await api.get("/api/products");
    setProducts(data);
    setLoading(false);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    void loadProducts();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Products</h1>
        <Link
          to="/admin/product/create"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="border-b border-slate-200 p-3 text-left">Name</th>
            <th className="border-b border-slate-200 p-3 text-left">Price</th>
            <th className="border-b border-slate-200 p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-slate-100 text-slate-700">
              <td className="p-3 font-medium text-slate-900">{product.name}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">
                <div className="flex gap-3">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="font-semibold text-emerald-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteHandler(product._id)}
                  className="font-semibold text-rose-600"
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminProductList;
