function Hero() {
  return (
    <section className="bg-black text-white min-h-[80vh] flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-yellow-500">
          Premium Spirits
        </h1>

        <p className="mt-6 text-gray-300 text-xl">
          Discover the finest collection of Whisky, Wine, Beer & Vodka.
        </p>

        <button className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold">
          Shop Now
        </button>

      </div>

    </section>
  );
}

export default Hero;