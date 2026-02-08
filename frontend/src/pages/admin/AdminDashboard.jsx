import { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminOrders from "../AdminOrders";

const AdminDashboard = () => {
  const [body,setBody] = useState(true)
  function handleClick(){
    setBody(!body)
  }
  return (
    <div >
      <div className="p-6">
      <h1 className="text-center text-2xl font-bold">👑 Admin Dashboard </h1>
      <button onClick={handleClick}  className="bg-black text-white px-4 py-2 rounded">
          {body? "Order list":"Product list"}
        </button>
      </div>

      {
        body?<AdminProductList />:<AdminOrders />
      }

      
    </div>
  );
};

export default AdminDashboard;
