import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-400 text-center">
          About BottleHub
        </h1>

        <p className="text-center text-gray-400 mt-5 text-lg">
          Premium collection of Whisky, Wine, Beer, Rum, Vodka,
          Brandy and Water Bottles.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-16">

          <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500">

            <h2 className="text-3xl text-yellow-400 font-bold mb-5">
              Our Mission
            </h2>

            <p className="text-gray-300 leading-8">
              BottleHub was created to provide customers with a premium
              shopping experience for beverages.
              We focus on quality products,
              fast delivery and customer satisfaction.
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500">

            <h2 className="text-3xl text-yellow-400 font-bold mb-5">
              Why Choose BottleHub?
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>✔ Premium Brands</li>
              <li>✔ Fast Delivery</li>
              <li>✔ Secure Payment</li>
              <li>✔ Best Prices</li>
              <li>✔ 24×7 Support</li>
            </ul>

          </div>

        </div>

        <div className="text-center mt-16">

          <Link
            to="/products"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold"
          >
            Explore Products
          </Link>

        </div>

      </div>

    </div>
  );
}

export default About;