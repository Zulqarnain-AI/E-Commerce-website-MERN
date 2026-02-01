import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    price: "",
    countInStock: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then(({ data }) => setProduct(data));
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (id) {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/products",
        product
      );
    }

    navigate("/admin/products");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto min-h-screen px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {Object.keys(product).map((field) => (
            <input
              key={field}
              required
              placeholder={field}
              value={product[field]}
              onChange={(e) =>
                setProduct({ ...product, [field]: e.target.value })
              }
              className="w-full border p-3 rounded"
            />
          ))}

          <button className="w-full bg-black text-white py-3 rounded">
            Save Product
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default AdminProductForm;
