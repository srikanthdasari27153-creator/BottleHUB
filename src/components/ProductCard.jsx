import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Default products -> first size price
  // Admin products -> direct price
  const firstPrice = product.price
    ? product.price
    : Object.values(product.size || {})[0];

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-yellow-500 hover:scale-105 duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-80 bg-white flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-105 duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">

        <h2 className="text-white text-2xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-400 mt-2">
          {product.category}
        </p>

        {product.stock && (
          <p className="text-green-400 mt-2">
            Stock : {product.stock}
          </p>
        )}

        <h3 className="text-yellow-400 text-3xl font-bold mt-3">
          ₹{firstPrice}
        </h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="mt-5 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition"
        >
          View Product
        </button>

      </div>
    </div>
  );
}

export default ProductCard;