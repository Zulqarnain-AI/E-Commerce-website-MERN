import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cartItems.reduce((total, item) => total + (item.qty || 1), 0);
  const displayName = user?.name || user?.email?.split("@")[0] || "Account";

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Featured", href: "/#featured" },
    { label: "Categories", href: "/#categories" },
  ];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) return;

    setMobileMenuOpen(false);
    navigate(`/products/All?keyword=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-wide text-white shadow-lg shadow-slate-950/10">
            ES
          </span>
          <span>
            <span className="block text-lg font-semibold leading-none text-slate-950">E-Shop</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.28em] text-slate-500">
              modern commerce
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
          >
            <FiSearch className="shrink-0 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search products, brands, or categories"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              aria-label="Search products"
            />
          </form>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="transition hover:text-slate-950">
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
          >
            <FiShoppingBag className="text-base" aria-hidden="true" />
            Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex min-w-6 items-center justify-center rounded-full bg-slate-950 px-2 py-0.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <FiUser aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="font-semibold text-slate-900">{displayName}</p>
                  <p className="text-xs text-slate-500">{user.isAdmin ? "Admin" : "Customer"}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/cart"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
            aria-label="View cart"
          >
            <FiShoppingBag aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-slate-950 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg shadow-slate-950/5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <FiSearch className="text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search products"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                aria-label="Search products on mobile"
              />
            </form>

            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {user ? (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
                    <p className="font-semibold text-slate-950">{displayName}</p>
                    <p className="text-xs text-slate-500">{user.isAdmin ? "Admin" : "Customer"}</p>
                  </div>
                  {user.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
