import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import HeaderCartBody from "../HeaderCartBody";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function CartBtn({ style, count, total, isPc, setActive, active }) {
  const ref = useRef();
  const [position, setPosition] = useState();

  useEffect(() => {
    setPosition({
      left: ref.current.offsetLeft,
      top: ref.current.offsetTop,
    });
  }, []);

  return (
    <div ref={ref} className={style.navBtn}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          active !== "cart" ? setActive("cart") : setActive("");
        }}
        className={style.headerBtnWrapper}
      >
        <Badge count={count}>
          <ShoppingCartOutlined className={style.navIcon} />
        </Badge>
        {isPc ? <span className={style.headerBtnTilte}>giỏ hàng</span> : false}
      </div>

      <div
        style={
          !isPc && active === "cart"
            ? {
                visibility: "visible",
                opacity: 1,
                transform: " scale(1)",
              }
            : {}
        }
        className={`${style.HeaderModal} ${style.HeaderCart}`}
      >
        <div
          style={position && !isPc ? { left: `${position.left + 10}px` } : {}}
          className={style.HeaderModalArrow}
        ></div>

        <span className={style.HeaderModalTitle}>Giỏ hàng</span>
        <HeaderCartBody></HeaderCartBody>
        <div className={style.HeaderCartFooter}>
          <span>Tổng Tiền:{numberWithCommas(total)}vnđ</span>
          <Link to="/cart" className={style.HeaderCartBtn}>
            xem giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
export default CartBtn;
