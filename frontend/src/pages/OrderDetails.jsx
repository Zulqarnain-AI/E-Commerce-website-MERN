import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/api/orders/${id}`
            );
            setOrder(data);
        };

        fetchOrder();
    }, [id]);

    if (!order) return <p className="text-center mt-20">Loading...</p>;
    console.log(order)
    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto min-h-screen px-4 py-10">
                <h1 className="text-2xl font-bold mb-6">Order Details</h1>

                <div className="border rounded p-6 mb-6">
                    <h2 className="font-semibold mb-2">Shipping Address</h2>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.country}
                    </p>
                </div>

                <div className="border rounded p-6 mb-6">
                    <h2 className="font-semibold mb-4">Items</h2>

                    {order.orderItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between border-b py-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <p>{item.name}</p>
                            </div>

                            <p>
                                {item.qty} × ${item.price}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="border rounded p-6">
                    <h2 className="font-semibold mb-2">Order Summary</h2>
                    <p>Items: ${order.itemsPrice}</p>
                    <p>Shipping: ${order.shippingPrice}</p>
                    <p className="font-bold text-lg">
                        Total: ${order.totalPrice}
                    </p>
                </div>
            </div>
            <div className=" text-right p-6">
                <Link to="/">
                    <button className="py-2 rounded bg-black text-white border w-20 text-center hover:cursor-pointer">
                        Done
                    </button>

                </Link>
            </div>

            <Footer />
        </>
    );
};

export default OrderDetails;
