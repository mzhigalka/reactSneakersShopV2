import React from "react";
import { Item } from "./pages/Home";

export interface AppContextType {
  onAddToFavorite: (obj: Item) => Promise<void>;
  setCartItems: (items: Item[]) => void;
  favorites: Item[];
  cartItems: Item[];
  // isItemAdded: ;
  // setCartOpened: ;
}

const AppContext = React.createContext({});

export default AppContext;
