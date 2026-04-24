import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminProductCreate = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    countInStock: "",
    category: "",
  });

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/products", product);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Add Product</h1>
      <p className="mt-2 text-sm text-slate-600">Create a new catalog item with complete product details.</p>

      <form onSubmit={submitHandler} className="mt-6 grid gap-3 sm:grid-cols-2">
        {Object.keys(product).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={product[field]}
            onChange={changeHandler}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            required
          />
        ))}

        <button className="sm:col-span-2 w-full rounded-2xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          Create
        </button>
      </form>
      </div>
    </div>
  );
};

export default AdminProductCreate;
