import React, { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartItems: [],
  addItem: (id) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.cartItems.findIndex(
      (item) => item._id === action.product._id
    );
    const updatedCartItems = [...state.cartItems];
    if (existingItemIndex > -1) {
      const existingItem = state.cartItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedCartItems[existingItemIndex] = updatedItem;
    } else {
      updatedCartItems.push({ ...action.product, quantity: 1 });
    }
    return {
      ...state,
      cartItems: updatedCartItems,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.cartItems.findIndex((item) => {
      return item._id === action.prodId;
    });
    const existingItem = state.cartItems[existingItemIndex];
    const updatedCartItems = [...state.cartItems];
    if (existingItem.quantity === 1) {
      updatedCartItems.splice(existingItemIndex, 1);
    } else {
      const updatedCartItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatedCartItems[existingItemIndex] = updatedCartItem;
    }
    return { ...state, cartItems: updatedCartItems };
  }
  if (action.type === "EMPTY_CART") {
    return {
      cartItems: [],
    };
  }
  return state;
}
export const CartProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { cartItems: [] });

  const addItemToCart = (product) =>
    dispatchCartAction({ type: "ADD_ITEM", product });
  const removeItem = (prodId) =>
    dispatchCartAction({ type: "REMOVE_ITEM", prodId });
  const emptyCart = () => dispatchCartAction({ type: "EMPTY_CART" });

  const cartContext = {
    cartItems: cart.cartItems,
    addItem: addItemToCart,
    removeItem,
    emptyCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
