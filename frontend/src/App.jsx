import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";

// Public pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";

// Admin pages
import AdminOrders from "./pages/AdminOrders";
import AdminProductList from "./pages/admin/AdminProductList";
import AdminProductCreate from "./pages/admin/AdminProductCreate";
import AdminProductEdit from "./pages/admin/AdminProductEdit";

// Route protection
import AdminRoute from "./components/AdminRoute";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
// import CustomerDashboard from "./pages/CustomerDashboard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import CustomerRoute from "./components/CustomerRoute";
import Settings from "./pages/Settings";
import DashboardHome from "./pages/DashboardHome";

const ProductsRoute = () => {
  const location = useLocation();

  return <Products key={`${location.pathname}${location.search}`} />;
};

function App() {
  return (
    <Routes>
      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:cate" element={<ProductsRoute />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/placeorder" element={<PlaceOrderPage />} />
      <Route path="/order-success/:id" element={<OrderSuccessPage />} />
      <Route path="/register" element={<Register />} />

      
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      {/* User order details */}
      <Route
        path="/order/user/:id"
        element={<OrderDetails admin={false} />}
      />

      {/* ---------- ADMIN ROUTES (PROTECTED) ---------- */}
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProductList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/product/create"
        element={
          <AdminRoute>
            <AdminProductCreate />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/product/:id/edit"
        element={
          <AdminRoute>
            <AdminProductEdit />
          </AdminRoute>
        }
      />

      {/* Admin order details */}
      <Route
        path="/order/admin/:id"
        element={
          <AdminRoute>
            <OrderDetails admin={true} />
          </AdminRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <CustomerRoute>
            <CustomerDashboard />
          </CustomerRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}

export default App;
