import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleSearch = () => {
    navigate("/products");
    setMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="bg-black border-b border-yellow-500 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        <div className="flex items-center justify-between">

          <Link
            to="/home"
            className="text-2xl md:text-3xl font-bold text-yellow-400"
          >
            🍾 BottleHub
          </Link>

          <button
            className="md:hidden text-3xl text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="hidden md:flex items-center gap-5">            {/* Search */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-4 py-2 rounded-l-lg bg-zinc-800 text-white outline-none w-56 lg:w-72"
              />

              <button
                onClick={handleSearch}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-bold"
              >
                🔍
              </button>
            </div>

            <ul className="flex items-center gap-6">

              <li>
                <Link to="/home" className="hover:text-yellow-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-yellow-400">
                  Products
                </Link>
              </li>

              <li className="relative">
                <Link to="/cart" className="hover:text-yellow-400">
                  🛒 Cart
                </Link>

                {cartItems.length > 0 && (
                  <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                    {cartItems.length}
                  </span>
                )}
              </li>              {isAdmin && (
                <li>
                  <Link
                    to="/admin-products"
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400"
                  >
                    Admin
                  </Link>
                </li>
              )}

              {!isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-yellow-400"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/register"
                      className="hover:text-yellow-400"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-5 border-t border-zinc-700 pt-5">

            <div className="flex mb-5">
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-3 rounded-l-lg bg-zinc-800 text-white outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-yellow-500 text-black px-5 rounded-r-lg font-bold"
              >
                🔍
              </button>
            </div>

            <div className="flex flex-col gap-4">              <Link
                to="/home"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                🏠 Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                🍾 Products
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                🛒 Cart ({cartItems.length})
              </Link>

              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-yellow-400"
                  >
                    👨‍💼 Admin Dashboard
                  </Link>

                  <Link
                    to="/admin-orders"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-yellow-400"
                  >
                    📦 Orders
                  </Link>

                  <Link
                    to="/admin-products"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-yellow-400"
                  >
                    🛍 Products
                  </Link>
                </>
              )}

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="bg-green-600 text-center py-3 rounded-lg font-bold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-yellow-500 text-black text-center py-3 rounded-lg font-bold"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 py-3 rounded-lg font-bold"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;