import { Button, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../../..";
import SouvenirOption from "../../../../product group/item/item options/souvenirOpitons";
import ItemSize from "../../../../product group/item/item size";
import style from "../../../style.module.css";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function CartItemMiniCotent({ type, item, setCart, cart, error }) {
  const [amount, setAmount] = useState(Number);
  // const [option, setOption] = useState();

  const changeHander = (value) => {
    setAmount(value);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (amount !== 0) {
        setCart((prv) => {
          return { ...prv, amount };
        });
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [amount]);

  return (
    <div className={style.cartItemMini}>
      {" "}
      <Link to={`/post/item${item.id}`} className={style.cartItemImgWrapper}>
        <img
          src={
            item.souvenirOption !== undefined
              ? item.info.img[item.souvenirOption]
              : item.img
          }
          alt="item image"
        ></img>
      </Link>
      <div className={style.cartItemCotent}>
        {/* select option */}
        {item.type !== "costume" &&
        item.type !== "souvenir" &&
        item.type !== "figure" ? (
          <span>
            kiểu dáng
            <Button type="primary">nguyên gốc</Button>
          </span>
        ) : (
          false
        )}

        {item.type === "souvenir" && item.souvenirOption === undefined ? (
          <SouvenirOption
            cart={cart}
            error={error}
            item={item.info}
            setCart={setCart}
            cartId={item.cartId}
          />
        ) : item.type === "souvenir" ? (
          <span>
            mẫu:
            {
              <Button type="primary">
                số: {Number(item.souvenirOption) + 1}
              </Button>
            }
          </span>
        ) : (
          false
        )}
        {item.type === "figure" ? (
          <span>
            nhóm sản phẩm:
            {<Button type="primary">{item.figureOpition}</Button>}
          </span>
        ) : (
          false
        )}
        {item.type === "costume" ? (
          <span>
            nhóm sản phẩm:{" "}
            {<Button type="primary">{item.costumeOpition}</Button>}
          </span>
        ) : (
          false
        )}
        {/* select size  */}
        {item.info.type.includes("trang phục") && item.size == undefined ? (
          <ItemSize
            type={type}
            item={item.info}
            setCart={setCart}
            cart={cart}
            error={error}
          />
        ) : item.info.type.includes("trang phục") ? (
          <span>
            kích cỡ:{" "}
            {
              <Button className={style.cartColtheSize} type="primary">
                {item.size}
              </Button>
            }
          </span>
        ) : (
          <ItemSize
            type={type}
            item={item.info}
            setCart={setCart}
            cart={Cart}
            error={error}
          />
        )}
        {/* select amount */}
        {!error ? (
          <div className={style.numberGroup}>
            <div className={style.amountGroup}>
              {item.price ? (
                <span>số lượng:</span>
              ) : (
                <span>thời gian thuê:</span>
              )}
              <div>
                <InputNumber
                  min={1}
                  defaultValue={item.amount}
                  max={item.price ? 100 : 30}
                  onChange={(value) => changeHander(value)}
                  className={style.CartItemNumbInput}
                ></InputNumber>
              </div>
            </div>
            {item.services ? (
              <div style={style.servicesMoney}>
                <span>phí dịch vụ:</span>
                <h6>
                  {numberWithCommas(item.services)}
                  vnđ
                </h6>
              </div>
            ) : (
              false
            )}
            <div className={style.totalMoney}>
              <span>tạm tính:</span>
              <h6>
                {item.price
                  ? numberWithCommas(item.price * item.amount)
                  : numberWithCommas(item.rent * item.amount)}
                vnđ
              </h6>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
export default CartItemMiniCotent;
