import React from "react";
import { Item } from "./pages/Home";

export interface AppContextType {
  isItemAdded: (id: number) => "/img/done.svg" | "/img/plus.svg";
  onAddToFavorite: (obj: Item) => Promise<void>;
  setCartItems: (items: Item[]) => void;
  favorites: Item[];
  cartItems: Item[];
  // setCartOpened: ;
}

const AppContext = React.createContext({});

export default AppContext;
