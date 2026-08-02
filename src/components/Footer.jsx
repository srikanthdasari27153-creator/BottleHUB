function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-10 mt-10 border-t border-yellow-500">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            🍾 BottleHub
          </h2>

          <p className="mt-3 text-gray-400">
            Premium collection of Whisky, Wine, Beer & Vodka.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">
            Contact
          </h3>

          <p>Email : bottlehub57254@gmail.com</p>
          <p>Phone : +91 8309467690</p>
        </div>

      </div>

      <div className="text-center mt-8 text-gray-500">
        © 2026 BottleHub. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;