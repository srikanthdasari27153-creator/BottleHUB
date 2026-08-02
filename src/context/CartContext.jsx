import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize
    );

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (id, selectedSize) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id, selectedSize) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id, selectedSize) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCart: setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;