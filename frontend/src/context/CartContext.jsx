import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product, qty) => {
    const existItem = cartItems.find((item) => item._id === product._id);

    if (existItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // UPDATE QTY
  const updateQty = (id, qty) => {
    setCartItems(
      cartItems.map((item) => (item._id === id ? { ...item, qty } : item))
    );
  };

  // ✅ CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }} // ✅ added here
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
