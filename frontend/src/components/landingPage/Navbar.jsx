import { Link } from "react-router-dom";

const Navbar = () => {
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
          className="hidden md:block border rounded px-3 py-1 w-64"
        />

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="font-medium">
            Cart 🛒
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
