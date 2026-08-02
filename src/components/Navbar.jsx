import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleSearch = () => {
    navigate("/products");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white border-b border-yellow-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}
        <Link to="/home" className="text-3xl font-bold text-yellow-400">
          🍾 BottleHub
        </Link>

        <div className="flex items-center gap-5">

          {/* Search */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-2 rounded-l-lg bg-zinc-800 text-white outline-none w-64"
            />

            <button
              onClick={handleSearch}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-bold"
            >
              🔍
            </button>
          </div>

          <ul className="flex gap-6 items-center">

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
            </li>

            {/* Admin Button */}
            {isAdmin && (
              <li>
                <Link
                  to="/admin-products"
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400"
                >
                  Admin Products
                </Link>
              </li>
            )}

            {/* Login / Logout */}
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-yellow-400">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="hover:text-yellow-400">
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
    </nav>
  );
}

export default Navbar;