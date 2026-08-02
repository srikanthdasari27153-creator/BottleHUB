import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    total,
  } = useContext(CartContext);

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        🛒 My Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2 className="text-2xl text-center">Your Cart is Empty</h2>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex items-center justify-between bg-zinc-900 p-5 rounded-xl"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      Size : {item.selectedSize}
                    </p>

                    <p className="text-yellow-400 text-xl mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          decreaseQty(item.id, item.selectedSize)
                        }
                        className="bg-red-500 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.id, item.selectedSize)
                        }
                        className="bg-green-500 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    removeItem(item.id, item.selectedSize)
                  }
                  className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <h2 className="text-3xl font-bold text-yellow-400">
              Total : ₹{total}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;