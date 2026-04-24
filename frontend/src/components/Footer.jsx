import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/90 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-900">E-Shop</p>
          <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link to="/products/All" className="transition hover:text-slate-900">Products</Link>
          <Link to="/dashboard" className="transition hover:text-slate-900">Dashboard</Link>
          <Link to="/cart" className="transition hover:text-slate-900">Cart</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
