import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-2">
            Thank you for your purchase.
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-semibold">{id}</span>
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to={`/order/${id}`}
              className="bg-black text-white py-2 rounded"
            >
              View Order Details
            </Link>

            <Link
              to="/products/All"
              className="border py-2 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;
