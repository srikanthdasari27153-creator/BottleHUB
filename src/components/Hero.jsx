import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-black text-white min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-10">

      <div className="text-center max-w-4xl">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500 leading-tight">
          Premium Spirits
        </h1>

        <p className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl px-2">
          Discover the finest collection of Whisky, Wine, Beer & Vodka.
        </p>

        <Link to="/products">
          <button className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition duration-300">
            Shop Now
          </button>
        </Link>

      </div>

    </section>
  );
}

export default Hero;