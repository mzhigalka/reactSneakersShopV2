import { Item } from "../pages/Home";

export interface AppContextType {
  isItemAdded: (id: number) => "/img/done.svg" | "/img/plus.svg";
  onAddToFavorite: (obj: Item) => Promise<void>;
  setCartItems: (items: Item[]) => void;
  setCartOpened: (arg: any) => void;
  favorites: Item[];
  cartItems: Item[];
}
