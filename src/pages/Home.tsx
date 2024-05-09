import { FC, Dispatch, SetStateAction, ChangeEvent } from "react";
import Card from "../components/Card";

export interface Item {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export interface HomeTypes {
  items: Item[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddToFavorite: (obj: Item) => Promise<void>;
  onAddToCart: (obj: Item) => Promise<void>;
  isLoading: boolean;
}

const Home: FC<HomeTypes> = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filtredItems = items.filter(
      (item: { title: string }) =>
        item.title &&
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj: Item) => onAddToFavorite(obj)}
        onPlus={(obj: Item) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1 className="content__title ">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search__block d-flex">
          <img src="/img/search-icon.svg" alt="Search" />
          {searchValue && (
            <img
              className="button__remove clear cu-p"
              src="/img/sneakers/btn-remove.svg"
              alt="Clear text"
              onClick={() => setSearchValue("")}
            />
          )}
          <input
            type="text"
            placeholder="Поиск..."
            onChange={onChangeSearchInput}
            value={searchValue}
          />
        </div>
      </div>
      <div className="main-cards d-flex justify-between flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
};

export default Home;
