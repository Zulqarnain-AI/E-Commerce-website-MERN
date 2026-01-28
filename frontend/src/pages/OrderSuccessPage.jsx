import { useParams } from "react-router-dom";

const OrderSuccessPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-md mx-auto text-center p-10">
      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully 🎉
      </h1>
      <p className="mt-4">Order ID: {id}</p>
    </div>
  );
};

export default OrderSuccessPage;
