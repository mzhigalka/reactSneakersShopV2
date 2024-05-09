import React from "react";
import { Item } from "./pages/Home";

type FavoritesItem = Item;

export interface AppContextType {
  onAddToFavorite: (obj: Item) => Promise<void>;
  favorites: FavoritesItem[];
  // isItemAdded: ;
  // setCartOpened: ;
  // cartItems:;
  // setCartItems:;
}

const AppContext = React.createContext({});

export default AppContext;
