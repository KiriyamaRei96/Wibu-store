import { useSelector, useDispatch } from "react-redux";
import { cartSelector, displaySelector } from "../../store/store";
import { deleteItem } from "../../store/CartSlice/cartSlice";
import { useRef, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import style from "./style.module.css";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function HeaderCartBody() {
  const dispatch = useDispatch();
  const cartList = useSelector(cartSelector).itemCart;
  const movieLogos = useSelector(displaySelector).movieLogos;

  return (
    <div className={`${style.HeaderCartBody} scrollBar`}>
      {cartList.length > 0 ? (
        cartList.map((item) => (
          <Link
            to={`/post/item${item.id}`}
            className={style.headerCartItem}
            key={uuid()}
          >
            <div className={style.headerCartItemImgWrapper}>
              <img
                className={style.headerCartItemImg}
                src={
                  item.souvenirOption
                    ? item.info.img[item.souvenirOption]
                    : item.img
                }
                alt="ảnh sản phẩm"
              ></img>
            </div>

            <div className={style.HeaderCartItemContent}>
              <span>{item.name}</span>
              <div className={style.HeaderCartContentPrice}>
                {item.price ? (
                  <span>số lượng: {item.amount}</span>
                ) : (
                  <span>thời gian: {item.amount}/ngày</span>
                )}

                <span>
                  {item.price
                    ? numberWithCommas(item.price * item.amount)
                    : numberWithCommas(item.rent * item.amount)}
                  vnđ
                </span>
              </div>
              {movieLogos[item.movie] ? (
                <div className={style.HeaderCartLogoGroup}>
                  <img
                    src={movieLogos[item.movie].logo}
                    className={style.HeaderCartLogo}
                    alt="logo"
                  ></img>
                  {item.size ? (
                    <span className={style.HeaderOPinfo}>
                      size: {item.size}
                    </span>
                  ) : (
                    false
                  )}
                  {item.souvenirOption !== undefined ? (
                    <span className={style.HeaderOPinfo}>
                      mẫu: {Number(item.souvenirOption) + 1}
                    </span>
                  ) : (
                    false
                  )}
                </div>
              ) : (
                <span>{item.movie}</span>
              )}
            </div>

            <DeleteOutlined
              onTouchEnd={(e) => {
                e.preventDefault();

                dispatch(deleteItem(item.cartId));
              }}
              onMouseUp={(e) => {
                e.preventDefault();

                dispatch(deleteItem(item.cartId));
              }}
              className={style.CartItemDelete}
            />
          </Link>
        ))
      ) : (
        <Empty style={{ padding: "7px" }} />
      )}
    </div>
  );
}
export default HeaderCartBody;
