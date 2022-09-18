import { Col, List } from "antd";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { cartSelector } from "../../store/store";
import CartItem from "./component/cart item";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CartInfo from "./component/cart info";
import CartItemMini from "./component/cart item mini";

function Cart() {
  const [error, setError] = useState([]);
  const cartInfo = useSelector(cartSelector).itemCart;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setCart(cartInfo);
    setLoading(false);
    if (document.title !== "Giỏ hàng") {
      document.title = "Giỏ hàng";
    }
  }, [cartInfo]);

  const totalMoney = useMemo(
    () =>
      cartInfo.reduce((res, item) => {
        let services = item.services ? item.services : 0;
        let price = item.price
          ? (res += item.price * item.amount)
          : (res += item.rent * item.amount);
        return price + services;
      }, 0),
    [cartInfo.length, cartInfo]
  );

  return (
    <Col className="background-color" span={24}>
      <div className={`main-width Main`}>
        <div>
          <Link to="/">Trang chủ</Link> /
        </div>
        <div className={style.bannerWrapper}>
          <img
            src="https://i.pinimg.com/originals/83/2b/d2/832bd233d8df8af72a70ca077af6c0ca.png"
            alt="banner"
          ></img>
          <h2>giỏ hàng</h2>
        </div>
        <div className={style.cartBody}>
          <div className={style.cartList}>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={cart}
              renderItem={(item) =>
                window.innerWidth > 1024 ? (
                  <List.Item className={style.cartItemWrapper}>
                    <CartItem
                      key={uuid()}
                      index={cartInfo.findIndex(
                        (obj) => obj.cartId === item.cartId
                      )}
                      item={item}
                      cartError={error}
                      setCartError={setError}
                    />
                  </List.Item>
                ) : (
                  <CartItemMini
                    key={uuid()}
                    index={cartInfo.findIndex(
                      (obj) => obj.cartId === item.cartId
                    )}
                    item={item}
                    cartError={error}
                    setCartError={setError}
                  />
                )
              }
            ></List>
          </div>
          <CartInfo
            error={error}
            style={style}
            cartInfo={cartInfo}
            totalMoney={totalMoney}
          />
        </div>
      </div>
    </Col>
  );
}

export default memo(Cart);
