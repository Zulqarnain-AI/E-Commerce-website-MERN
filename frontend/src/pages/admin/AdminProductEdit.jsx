import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    countInStock: "",
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.token) {
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={submitHandler} className="space-y-3">
        {Object.keys(product).map((field) => (
          <input
            key={field}
            name={field}
            value={product[field]}
            onChange={(e) =>
              setProduct({
                ...product,
                [field]: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />
        ))}

        <button className="bg-black text-white w-full py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminProductEdit;
