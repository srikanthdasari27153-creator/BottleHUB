import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import defaultProducts from "../data/products";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  // Admin Products
  const adminProducts =
    JSON.parse(localStorage.getItem("products")) || [];

  // Merge Default + Admin Products
  const allProducts = [...defaultProducts, ...adminProducts];

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center">
        <h1 className="text-white text-3xl">
          Product Not Found
        </h1>
      </div>
    );
  }

  // Default products have size object
  const sizes = product.size ? Object.keys(product.size) : [];

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
    <div className="bg-black min-h-screen flex items-center justify-center p-6">

      <div className="bg-zinc-900 rounded-xl overflow-hidden max-w-md w-full shadow-xl border border-yellow-500">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-contain bg-white"
        />

        <div className="p-6">

          <h1 className="text-3xl font-bold text-yellow-400">
            {product.name}
          </h1>

          <p className="text-gray-400 mt-2">
            Category : {product.category}
          </p>

          {/* Show stock only for admin products */}
          {product.stock !== undefined && (
            <p className="text-green-400 mt-2">
              Stock : {product.stock}
            </p>
          )}

          <h2 className="text-4xl text-yellow-500 font-bold mt-5">
            ₹{selectedPrice}
          </h2>

          {/* Show sizes only for default products */}
          {sizes.length > 0 && (
            <>
              <h3 className="text-white mt-6 mb-3 font-semibold">
                Select Size
              </h3>

              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                      selectedSize === size
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-700 text-white hover:bg-zinc-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            onClick={handleAddToCart}
            className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;