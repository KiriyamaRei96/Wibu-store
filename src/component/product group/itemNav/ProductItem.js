import { Col, Image, Skeleton } from "antd";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { ShoppingCartOutlined, ZoomInOutlined } from "@ant-design/icons";
import { memo, useState, useTransition } from "react";
import { addItem, changeItem } from "../../../store/CartSlice/cartSlice";
import { cartSelector } from "../../../store/store";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import typeFilter from "../item/typeFilter";
import openNotification from "../../../function/noti";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ProductItem({ item, span = 0 }) {
  const [img, setImg] = useState(item.img[0]);

  const [cartHover, setcartHover] = useState(false);
  const [visible, setVisible] = useState(false);

  const [transition, setTransition] = useTransition();
  const itemCart = useSelector(cartSelector).itemCart;
  const dispatch = useDispatch();
  const previewHandler = (e) => {
    e.preventDefault();
    setVisible(true);
  };
  const CartHanderler = (element) => {
    element.preventDefault();
    const index = itemCart.findIndex((obj) => obj.id === item.id);
    const cartItem = {
      type: typeFilter(item),
      name: item.name,
      img: item.img[0],
      price: item.sale,
      rent: item.renting,
      movie: item.movie[0],
      amount: 1,
      size: undefined,
      souvenirOption: undefined,
      cartId: uuid(),
      id: item.id,
      info: item,
    };
    cartItem.type === "figure"
      ? (cartItem.figureOpition = "mới 100%")
      : (cartItem.figureOpition = undefined);
    cartItem.type === "costume"
      ? (cartItem.costumeOpition = "full set")
      : (cartItem.costumeOpition = undefined);

    if (index == -1) {
      dispatch(addItem(cartItem));
    }
    if (index !== -1) {
      if (cartItem.type === "souvenir") {
        const newObj = itemCart.find(
          (obj) =>
            obj.id === item.id &&
            obj.size === undefined &&
            obj.souvenirOption === undefined
        );
        if (!newObj) {
          cartItem.cartId = uuid();
          dispatch(addItem(cartItem));
        }

        if (newObj) {
          let amount = newObj.amount;

          dispatch(
            changeItem({
              index: itemCart.findIndex(
                (item) => item.cartId === newObj.cartId
              ),
              item: { ...newObj, amount: (amount += 1) },
            })
          );
        }
      } else {
        let amount = itemCart[index].amount;
        dispatch(
          changeItem({
            index: index,
            item: { ...itemCart[index], amount: (amount += 1) },
          })
        );
      }
    }
    openNotification(
      "info",
      "Cập nhật giỏ hàng thành công",
      "Bạn đã cập nhật sản phẩm vào giỏ hàng thành công"
    );
  };

  const test = item.img[0];

  return item ? (
    <Col
      span={span}
      onMouseEnter={() => {
        // setBtn(!btn);
        setTransition(() => setImg(item.img[1]));
      }}
      onMouseLeave={() => {
        // setBtn(!btn);
        setTransition(() => setImg(item.img[0]));
      }}
      className={style.productItems}
    >
      <Link
        className={style.productLink}
        style={{ backgroundImage: `url(${img})` }}
        to={`/post/item${item.id}`}
      >
        {
          <div className={style.productGroup}>
            <div className={style.productItemContent}>
              <h3 className={style.productName}>{item.name}</h3>
              <span>
                {item.sale
                  ? `Giá bán: ${numberWithCommas(item.sale)}vnđ`
                  : `Giá thuê: ${numberWithCommas(item.renting)}vnđ/ngày`}
              </span>
              <div className={style.ProductActionGroup}>
                <button
                  onMouseEnter={() => setcartHover(true)}
                  onMouseLeave={() => setcartHover(false)}
                  className={style.productCartbtn}
                  onClick={(e) => CartHanderler(e)}
                >
                  {cartHover ? (
                    <p> thêm vào giỏ hàng</p>
                  ) : (
                    <ShoppingCartOutlined />
                  )}
                </button>
                <button
                  alt="xem nhanh"
                  onClick={(e) => previewHandler(e)}
                  className={style.productPreview}
                >
                  <ZoomInOutlined />
                </button>
              </div>

              <div
                onClick={(e) => e.preventDefault()}
                style={{ display: "none" }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {item.img.map((image) => (
                    <Image key={uuid()} src={image}></Image>
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
        }
      </Link>
    </Col>
  ) : (
    <Skeleton active></Skeleton>
  );
}
export default memo(ProductItem);
