import React from "react";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { animateScroll as scroll } from "react-scroll";

import AppContext from "./context/context";

import Home, { Item } from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Slider from "./components/Swiper";

function App() {
  const [items, setItems] = React.useState<Item[]>([{} as Item]);
  const [favorites, setFavorites] = React.useState<Item[]>([]);
  const [cartItems, setCartItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://65b0c894d16d31d11bdd3bd9.mockapi.io/cart"
        );
        // const favoritesResponse = await axios.get('https://65b0c894d16d31d11bdd3bd9.mockapi.io/favorites');
        const itemsResponse = await axios.get(
          "https://65b0c894d16d31d11bdd3bd9.mockapi.io/items"
        );

        setIsLoading(false);
        setCartItems(cartResponse.data);
        // setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj: Item) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://65b0c894d16d31d11bdd3bd9.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://65b0c894d16d31d11bdd3bd9.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
    }
  };

  const onRemoveToCart = (id: number) => {
    try {
      axios.delete(`https://65b0c894d16d31d11bdd3bd9.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
    }
  };

  const onAddToFavorite = async (obj: Item) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://65b0c894d16d31d11bdd3bd9.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        //Wrong Link
        const { data } = await axios.post(
          "https://65b0c894d16d31d11bdd3bd9.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки");
    }
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id: number) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollTo = () => {
    scroll.scrollTo(570);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveToCart}
            items={cartItems}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        {isHomePage && <Slider scrollTo={scrollTo} />}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
