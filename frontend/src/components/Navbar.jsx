import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black">
          E-Shop
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className=" border rounded px-3 py-1 w-64"
        />

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link to="/admin/orders" className="hover:underline">
            Admin
          </Link>
          <Link to="/cart" className="relative">
            Cart 🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="bg-black text-white px-4 py-1 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
