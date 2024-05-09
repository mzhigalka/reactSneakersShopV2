import axios from "axios";
import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext, { AppContextType } from "../context";

import Card from "../components/Card";
import Info from "../components/Info";

import { Item } from "./Home";

// interface Order {
//   id: string;
//   imageUrl: string;
//   price: number;
//   title: string;
// }

const Orders: FC = () => {
  const { onAddToFavorite } = React.useContext(AppContext) as AppContextType;
  const [orders, setOrders] = React.useState([]);

  const navigate = useNavigate();
  const handleOnClickButton = () => {
    navigate("/");
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://65b0c894d16d31d11bdd3bd9.mockapi.io/cart"
        );
        setOrders(data.map((obj: Item) => obj));
        // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.warn(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40 d-flex flex-column">
      {orders.length > 0 ? (
        <>
          <div className="content__favorites d-flex align-center mb-40">
            <Link to="/">
              <div className="content__favorites-block">
                <img
                  className="arrow__left d-flex"
                  src="./img/arrowLeft.svg"
                  alt="Arrow"
                />
              </div>
            </Link>
            <h1 className="content__title ">Мои покупки</h1>
          </div>
          <div className="main-cards d-flex flex-wrap">
            {orders.map((item: any, index) => (
              <Card
                key={index}
                onFavorite={(obj: Item) => onAddToFavorite(obj)}
                {...item}
              />
            ))}
          </div>
        </>
      ) : (
        <Info
          image={"/img/notOrders.png"}
          title={"У вас нет заказов"}
          description={"Вы нищеброд? Оформите  хотя бы один заказ."}
          width={70}
          height={70}
          onClickButton={handleOnClickButton}
        />
      )}
    </div>
  );
};

export default Orders;
