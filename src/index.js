import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductMannager from "./component/product group/ProductMannager";
import News from "./component/news";
import Contact from "./component/contact";

import Home from "./component/Home";
import Item from "./component/product group/item/item";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ItemNav from "./component/product group/itemNav";

import "./index.css";
import "./Global Style/global.css";
import NewList from "./component/news/component/new list";
import NewsPage from "./component/news/component/news page";
import Cart from "./component/Cart";
import UserInfo from "./component/userInfo";
import Info from "./component/userInfo/component/info/Info";
import UserFrom from "./component/userInfo/component/userFrom/";
import Wrapper from "./component/ScrollWrapper";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Wrapper>
      <Provider store={store}>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />}></Route>
              <Route path="post" element={<ProductMannager />}>
                <Route index element={<ItemNav />}></Route>

                <Route path="item:invoiceId" element={<Item />}></Route>

                <Route path="find=:text" element={<ItemNav />}></Route>
              </Route>
              <Route path="news" element={<News />}>
                <Route index element={<NewList />}></Route>
                <Route path="page=:newsID" element={<NewsPage />}></Route>
              </Route>

              <Route path="contact" element={<Contact />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route path="user-info" element={<UserInfo />}>
                <Route index element={<Info />}></Route>
                <Route path="info-from" element={<UserFrom />}></Route>
              </Route>

              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </React.StrictMode>
      </Provider>
    </Wrapper>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
