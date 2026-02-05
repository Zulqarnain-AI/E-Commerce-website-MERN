import AdminProductList from "./AdminProductList";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>👑 Admin Dashboard</h1>

      <ul>
        <li>📦 Manage Products</li>
        <li>🧾 Manage Orders</li>
        <li>👥 Manage Users</li>
      </ul>
      <AdminProductList />
    </div>
  );
};

export default AdminDashboard;
