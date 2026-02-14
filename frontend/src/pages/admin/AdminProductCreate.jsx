import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProductCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.post("http://localhost:5000/api/products", product, config);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>

      <form onSubmit={submitHandler} className="space-y-3">
        {Object.keys(product).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={product[field]}
            onChange={changeHandler}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <button className="bg-black text-white w-full py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default AdminProductCreate;
