import { Link, Outlet } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold">Customer Panel</h2>

        <Link to="profile" className="block hover:text-gray-300">
          Profile
        </Link>

        <Link to="orders" className="block hover:text-gray-300">
          Orders
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
};

export default CustomerDashboard;
