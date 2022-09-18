import React from "react";
import { Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { itemSelector, displaySelector, newsSelector } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./store/itemSlice/itemSlice.js";
import { setMovie, setType } from "./store/displaySlice/displaySlice.js";
import { setLogin } from "./store/authSlice/authSlice";
import { addNews } from "./store/NewsSlice/newSlice";
import { getLocalStore } from "./store/CartSlice/cartSlice";
import Header from "./component/header/index.";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "./App.css";
import Footer from "./component/footer";
// authen
import { onAuthStateChanged } from "firebase/auth";
import { auth, setUserData } from "./firebaseStore/firebaseConfig";

function App() {
  const [list, setlist] = useState([]);
  const itemList = useSelector(itemSelector).listItems;
  const displayInfo = useSelector(displaySelector);
  const newsList = useSelector(newsSelector).newList;

  const dispatch = useDispatch();
  const dispatchData = (value) => dispatch(setLogin(value));

  const cartDispach = (value) => dispatch(getLocalStore(value));
  useEffect(() => {
    if (itemList.length === 0) {
      fetch(
        "https://notion-api.splitbee.io/v1/table/e465349bd775460d97b2ae9f0ede6d78"
      )
        .then((respon) => respon.json())
        .then((data) => {
          dispatch(addItem(data));
        })
        .catch((err) => console.log(err));
    }

    const cartLocalStorage = localStorage.getItem("localCart");
    if (cartLocalStorage === null) {
      localStorage.setItem("localCart", JSON.stringify([]));
    }
    if (cartLocalStorage !== null && JSON.parse(cartLocalStorage).length > 0) {
      dispatch(getLocalStore(JSON.parse(cartLocalStorage)));
    }
  }, [itemList]);

  useEffect(() => {
    if (displayInfo.movieLogos.length === 0) {
      fetch(
        "https://notion-api.splitbee.io/v1/table/9edb44919e16424a8f85867140d354e8"
      )
        .then((respon) => respon.json())
        .then((data) => {
          dispatch(setMovie(data));
        })
        .catch((err) => console.log(err));
    }
    if (displayInfo.hotTypes.length === 0) {
      fetch(
        "https://notion-api.splitbee.io/v1/table/6d0d66afe6fa4fb993e8eeb44cbaf810"
      )
        .then((respon) => respon.json())
        .then((data) => {
          dispatch(setType(data));
        })
        .catch((err) => console.log(err));
    }
  }, [displayInfo.movieLogos, displayInfo.hotTypes]);

  useEffect(() => {
    if (newsList.length === 0) {
      fetch(
        "https://notion-api.splitbee.io/v1/table/22324b39050f427d88fd880c95849d65"
      )
        .then((respon) => respon.json())
        .then((data) => {
          dispatch(addNews(data));
        })
        .catch((err) => console.log(err));
    }
  }, [newsList]);
  const navigate = useNavigate();

  useEffect(() => {
    const toFrom = () => navigate("/user-info/info-from");

    const unsubscribe = () => {
      setUserData(dispatchData, cartDispach, toFrom);
    };
    return unsubscribe();
  }, []);

  return (
    <Row className="body">
      <Header />

      <Outlet />
      <Footer />
    </Row>
  );
}

export default App;
