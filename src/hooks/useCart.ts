import React from "react";
import AppContext, { AppContextType } from "../context";
import { Item } from "../pages/Home";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext) as AppContextType;
  const totalPrice: number = cartItems.reduce((sum: number, obj: Item) => obj.price + sum, 0);
  const totalPriceWithProcent: number = Math.ceil((totalPrice / 100) * 5);

  return { cartItems, setCartItems, totalPrice, totalPriceWithProcent };
};
