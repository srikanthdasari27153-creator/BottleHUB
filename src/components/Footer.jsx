import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-10 mt-10 border-t border-yellow-500">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">

        {/* BottleHub */}
        <div>
          <Link to="/about">
            <h2 className="text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition cursor-pointer">
              🍾 BottleHub
            </h2>
          </Link>

          <p className="mt-3 text-gray-400">
            Premium collection of Whisky, Wine, Beer & Vodka.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-300">

            <li>
              <Link
                to="/home"
                className="hover:text-yellow-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:text-yellow-400 transition"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="hover:text-yellow-400 transition"
              >
                Cart
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="hover:text-yellow-400 transition"
              >
                Login
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">
            Contact
          </h3>

          <Link
            to="/owner"
            className="block hover:text-yellow-400 transition"
          >
            Email : bottlehub57254@gmail.com
          </Link>

          <Link
            to="/owner"
            className="block hover:text-yellow-400 transition mt-2"
          >
            Phone : +91 8309467690
          </Link>

          <Link
            to="/owner"
            className="inline-block mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
          >
            Contact Owner
          </Link>
        </div>

      </div>

      <div className="text-center mt-8 text-gray-500">
        © 2026 BottleHub. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;