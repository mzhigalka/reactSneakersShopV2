import React from "react";
import { Item } from "../pages/Home";
import AppContext from "../context/context";
import { AppContextType } from "../context/types";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext) as AppContextType;
  const totalPrice: number = cartItems.reduce((sum: number, obj: Item) => obj.price + sum, 0);
  const totalPriceWithProcent: number = Math.ceil((totalPrice / 100) * 5);

  return { cartItems, setCartItems, totalPrice, totalPriceWithProcent };
};
