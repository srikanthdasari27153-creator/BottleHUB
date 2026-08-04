import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import defaultProducts from "../data/products";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const adminProducts =
    JSON.parse(localStorage.getItem("products")) || [];

  const allProducts = [...defaultProducts, ...adminProducts];

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <h1 className="text-white text-3xl">
          Product Not Found
        </h1>
      </div>
    );
  }

  const sizes = product.size
    ? Object.keys(product.size)
    : [];

  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes[0] : ""
  );

  const selectedPrice =
    product.size && selectedSize
      ? product.size[selectedSize]
      : product.price;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: selectedPrice,
      selectedSize,
    });

    navigate("/cart");
  };

  return (
    <div className="bg-black min-h-screen py-10 px-5">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}

          <div className="bg-white rounded-3xl p-10 flex justify-center items-center overflow-hidden">

            <img
              src={product.image}
              alt={product.name}
              className="h-125 object-contain transition duration-500 hover:scale-110"
            />

          </div>

          {/* RIGHT SIDE */}

          <div className="text-white">

            <h1 className="text-5xl font-bold text-yellow-400">
              {product.name}
            </h1>

            <div className="mt-5">
              
            </div>

            <p className="text-gray-400 mt-5">
              Category :
              <span className="text-white ml-2">
                {product.category}
              </span>
            </p>

            {product.stock !== undefined && (
              <p className="text-green-400 mt-3">
                ✔ In Stock : {product.stock}
              </p>
            )}

            <div className="mt-8 bg-yellow-500/10 border border-yellow-500 rounded-2xl p-5">

              <h2 className="text-yellow-400 text-xl font-bold">
                🎉 Limited Time Offer
              </h2>

              <p className="text-gray-300 mt-3">
                Buy 5 Bottles and Get 10% OFF.
              </p>

              <p className="text-green-400 mt-2">
                🚚 Free Delivery Above ₹5999
              </p>

            </div>

            <h2 className="text-5xl text-yellow-500 font-bold mt-8">
              ₹{selectedPrice}
            </h2>

            <p className="text-gray-300 mt-6 leading-8">
              Enjoy premium quality beverages with
              original taste, genuine products,
              fast delivery and secure shopping only
              at BottleHub.
            </p>
                        {sizes.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  Select Size
                </h3>

                <div className="flex gap-4 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-yellow-500 text-black scale-105"
                          : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="mt-10 space-y-4">

              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition duration-300 hover:scale-105"
              >
                🛒 Add To Cart
              </button>

              <button
  onClick={() => {
    addToCart({
      ...product,
      price: selectedPrice,
      selectedSize,
    });

    navigate("/checkout");
  }}
  className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition duration-300 hover:scale-105"
>
  ⚡ Buy Now
</button>

            </div>

            <div className="mt-8 bg-zinc-900 border border-zinc-700 rounded-2xl p-5">

              <h3 className="text-yellow-400 text-xl font-bold mb-4">
                Why Shop From BottleHub?
              </h3>

              <div className="space-y-3 text-gray-300">

                <p>✅ 100% Original Products</p>

                <p>🚚 Fast & Secure Delivery</p>

                <p>🔒 Secure Online Payments</p>

                <p>↩ Easy Returns</p>

                <p>⭐ Trusted by Thousands of Customers</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;