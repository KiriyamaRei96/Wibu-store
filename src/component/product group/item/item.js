import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, createRef } from "react";
import {
  itemSelector,
  displaySelector,
  cartSelector,
} from "../../../store/store.js";
import { changeItem, addItem } from "../../../store/CartSlice/cartSlice.js";
import { Radio, Col, Divider, Row, Skeleton, Button } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Arrow from "../../Home/Arrow.js";
import { v4 as uuid } from "uuid";
import style from "./style.module.css";
import typeFilter from "./typeFilter.js";
import ItemAmount from "./item amount/index.js";
import ItemOptions from "./item options/index.js";
import ItemSize from "./item size/index.js";
import ProductItem from "../itemNav/ProductItem.js";
import Nobackgroundarrow from "../../Home/Nobackgroundarrow.js";
import FacebookComment from "../../../Facebook component/comment.js";
import LikeAndShare from "../../../Facebook component/likeshare.js";
import SubmitButton from "../../submit/Submit.js";
import { memo } from "react";
import openNotification from "../../../function/noti.js";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Item(props) {
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [price, setPrice] = useState({
    originalPrice: Number,
    displayPrice: Number,
  });
  const [type, setType] = useState("");

  const [service, setService] = useState(0);
  const [prepay, setPrepay] = useState(0);
  const [error, setError] = useState(false);
  const [suggest, setSuggest] = useState([]);

  const [cart, setCart] = useState({});
  const slider = useRef();
  const params = useParams();
  const cartArr = useSelector(cartSelector).itemCart;

  const itemList = useSelector(itemSelector).listItems;
  const movieLogos = useSelector(displaySelector).movieLogos;
  const dispatch = useDispatch();

  useEffect(() => {
    if (itemList.length > 0) {
      const item = itemList.find((obj) => {
        return obj.id === params.invoiceId;
      });

      item.sale
        ? setPrice({ originalPrice: item.sale, displayPrice: item.sale })
        : setPrice({ originalPrice: item.renting, displayPrice: item.renting });
      setItem(item);
      setType(typeFilter(item));

      setCart((prv) => {
        return { ...prv, type: typeFilter(item) };
      });
      const suggestArr = itemList.filter(
        (obj) => obj.movie[0] === item.movie[0]
      );
      if (suggestArr.length >= 12) {
        setSuggest(suggestArr.splice(0, 12));
      } else if (suggestArr.length < 12) {
        suggestArr.push(
          ...itemList
            .filter((obj) => obj.type[1] === item.type[1] && obj.id !== item.id)
            .splice(0, 12 - suggestArr.length)
        );

        setSuggest(suggestArr);
      }

      setLoaded(true);
      if (document.title !== item.name) {
        document.title = item.name;
      }
    }
  }, [params.invoiceId, itemList]);
  const cartHandler = () => {
    setError(false);

    const ouputItem = {
      ...cart,
      name: item.name,
      img: item.img[0],
      price: item.sale ? price.displayPrice : undefined,
      rent: item.renting ? price.displayPrice : undefined,
      movie: item.movie[0],
      services: service,
      id: item.id,
      info: item,
      prePay: prepay,
    };

    if (type === "souvenir" && ouputItem.souvenirOption === undefined) {
      setError(true);
      return;
    }
    if (item.type.includes("trang phục") && ouputItem.size === undefined) {
      setError(true);
      return;
    }

    if (type === "souvenir") {
      const index = cartArr.findIndex((obj) => obj.id === ouputItem.id);
      if (index == -1) {
        const cartId = uuid();
        setCart((prv) => {
          return { ...prv, cartId };
        });
        dispatch(addItem({ ...ouputItem, cartId }));
      }
      if (index !== -1) {
        const itemArr = cartArr.find((obj) => obj.cartId === ouputItem.cartId);

        if (
          itemArr === undefined ||
          itemArr.souvenirOption !== ouputItem.souvenirOption ||
          itemArr.size !== ouputItem.size
        ) {
          const newOption = cartArr
            .filter((obj) => obj.id === ouputItem.id)
            .every(
              (obj) =>
                obj.souvenirOption !== ouputItem.souvenirOption ||
                obj.size !== ouputItem.size
            );

          if (newOption) {
            const newobj = { ...ouputItem, cartId: uuid() };
            dispatch(addItem(newobj));
          }
        }

        if (
          cartArr.findIndex(
            (obj) =>
              obj.id === ouputItem.id &&
              obj.size === ouputItem.size &&
              obj.souvenirOption === ouputItem.souvenirOption
          ) !== -1
        ) {
          const newIndex = cartArr.findIndex(
            (obj) =>
              obj.id === ouputItem.id &&
              obj.size === ouputItem.size &&
              obj.souvenirOption === ouputItem.souvenirOption
          );

          dispatch(
            changeItem({
              index: newIndex,
              item: { ...cartArr[newIndex], amount: ouputItem.amount },
            })
          );
        }
      }
    }
    if (type !== "souvenir") {
      const index = cartArr.findIndex((obj) => obj.id === ouputItem.id);
      if (index == -1) {
        dispatch(addItem(ouputItem));
      }
      if (index !== -1) {
        dispatch(changeItem({ index: index, item: ouputItem }));
      }
    }
    openNotification(
      "info",
      "Cập nhật giỏ hàng thành công",
      "Bạn đã cập nhật sản phẩm vào giỏ hàng thành công"
    );
  };

  return (
    <Col span={24}>
      <div>
        <Link to="/">Trang chủ</Link> / <Link to="/post">Sản phẩm</Link> /
      </div>
      <Divider style={{ marginTop: "5px ", marginBottom: "0" }}></Divider>
      {loaded ? (
        <Col className={style.itemBody} span={24}>
          <Row
            gutter={{
              xs: 0,
              sm: 0,
              md: 0,
              lg: 12,
              xl: 12,
              xxl: 12,
            }}
          >
            <Col
              className={style.margin}
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={12}
            >
              <Slider
                ref={slider}
                {...{
                  infinite: true,
                  fade: true,
                  className: style.Slider,
                  slidesToShow: 1,
                  slidesToScroll: 1,

                  autoplaySpeed: 2000,
                  prevArrow: <Arrow top={45} direction={"left"} />,
                  nextArrow: <Arrow top={45} direction={"right"} />,
                }}
              >
                {item.img.map((item, id) => (
                  <div
                    style={{ backgroundImage: `url(${item})` }}
                    className={style.itemImg}
                    key={uuid()}
                  >
                    <img
                      className={style.itemImgContend}
                      src={item}
                      alt="ảnh"
                    ></img>
                  </div>
                ))}
              </Slider>
              <div className={style.imgSelect}>
                {item.img.map((img, id) => (
                  <div
                    key={uuid()}
                    onClick={() => slider.current.slickGoTo(id)}
                    style={{ backgroundImage: `url(${img})` }}
                    className={style.imgSelectWrapper}
                  >
                    {" "}
                    <div style={{ backgroundImage: `url(${img})` }}></div>{" "}
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <div className={`${style.itemSlect} ${style.margin}`}>
                <h2 className={style.itemName}>
                  {item.type[0]}: {item.name}
                </h2>
                <h4 className={style.itemPrice}>
                  {item.sale ? (
                    <p>
                      Giá bán:{" "}
                      <span>{numberWithCommas(price.displayPrice)}</span>
                      Vnđ
                      {prepay !== 0 ? (
                        <>
                          / đặt cọc:<span> {numberWithCommas(prepay)}</span>vnđ
                        </>
                      ) : (
                        false
                      )}
                    </p>
                  ) : (
                    <p>
                      Giá thuê:
                      <span>{numberWithCommas(price.displayPrice)}</span>
                      Vnđ/Ngày
                      {service !== 0 ? (
                        <>
                          <span> + {numberWithCommas(service)}</span>/face
                        </>
                      ) : (
                        false
                      )}
                    </p>
                  )}
                </h4>
                <div className={style.itemBrandInfo}>
                  <div className={style.itemMovie}>
                    <span className={style.itemBrandInfoTitle}>Phim:</span>
                    <img
                      src={
                        movieLogos[item.movie]
                          ? movieLogos[item.movie].logo
                          : undefined
                      }
                    ></img>
                  </div>
                  <div className={style.itemMadeIn}>
                    <span className={style.itemBrandInfoTitle}>
                      Xuất sứ: {item.source}
                    </span>
                  </div>
                </div>
                <Divider style={{ margin: "10px 0" }}></Divider>
                <span className={style.itemShippingCost}>
                  Vận chuyển: miễn phí vận chuyển
                </span>

                {/* item options group */}

                <div className={style.itemOptionGroup}>
                  <ItemOptions
                    setCart={setCart}
                    setPrepay={setPrepay}
                    setPrice={setPrice}
                    setService={setService}
                    cart={cart}
                    item={item}
                    slider={slider}
                    type={type}
                    error={error}
                  />
                </div>

                {/* item size group */}

                <div className={style.itemSizeGroup}>
                  <ItemSize
                    type={type}
                    item={item}
                    error={error}
                    cart={cart}
                    setCart={setCart}
                  />
                </div>

                {/* item cart and btn group */}

                <Divider style={{ margin: "10px 0" }}></Divider>
                <div className={style.itemBtnGroup}>
                  <div className={style.itemAmoutGroup}>
                    <ItemAmount setCart={setCart} info={item} />
                  </div>
                  <div className={style.itemBtns}>
                    <Button size="large" onClick={cartHandler}>
                      thêm vào giỏ hàng
                    </Button>
                    <SubmitButton title={"mua ngay"} />
                  </div>
                </div>
                {/* order information */}
                <Divider style={{ margin: "10px 0" }}></Divider>
                <div className={style.itemOrderInfoGroups}>
                  <span>thông tin đặt hàng</span>
                  {type === "figure" ? (
                    <ul className={style.itemOrderInfoBroad}>
                      <li>sản phẩm được miễn phí vận chuyển.</li>
                      <li>
                        sản phẩm đặt trước sẽ được giao khi hàng về đến shop,
                        sản phảm đặt trước phải đặt cọc 50% .
                      </li>
                      <li>
                        sản phẩm second hand thường có giá rẻ hơn sản phẩm mới
                        15%,shop sẽ liên hệ khi tìm được nguồn bán .
                      </li>
                      <li>đây là trang web mock thôi....</li>
                    </ul>
                  ) : (
                    false
                  )}
                  {type === "costume" ? (
                    <ul className={style.itemOrderInfoBroad}>
                      <li>sản phẩm được miễn phí vận chuyển.</li>
                      <li>
                        khi thuê sản phẩm cần đặt cọc 70% giá trị sản phẩm và
                        căn cước công dân .
                      </li>
                      <li>
                        MUA sẽ liên lạc và đến tận nơi makeup cho khách hàng .
                      </li>
                      <li>
                        vui lòng giữ gìn sản phẩm , mọi hỏng hóc mất mát sẽ shop
                        sẽ khấu trừ vào tiền cọc .
                      </li>
                      <li>đây là trang web mock thôi....</li>
                    </ul>
                  ) : (
                    false
                  )}
                  {type === "weapons" ? (
                    <ul className={style.itemOrderInfoBroad}>
                      <li>sản phẩm được miễn phí vận chuyển.</li>
                      <li>
                        khi thuê sản phẩm cần đặt cọc 70% giá trị sản phẩm và
                        căn cước công dân .
                      </li>
                      <li>
                        vui lòng giữ gìn sản phẩm , mọi hỏng hóc mất mát sẽ shop
                        sẽ khấu trừ vào tiền cọc .
                      </li>
                      <li>
                        sản phẩm vũ khí có tỉ lệ 1:1 bằng vũ khí thật, rất giống
                        vũ khí thật.xin hãy cẩn thận và tuân thủ nội quy nơi hóa
                        trang .
                      </li>
                      <li>đây là trang web mock thôi....</li>
                    </ul>
                  ) : (
                    false
                  )}
                  {type !== "figure" &&
                  type !== "costume" &&
                  type !== "weapons" ? (
                    <ul className={style.itemOrderInfoBroad}>
                      <li>sản phẩm được miễn phí vận chuyển.</li>
                      <li>sản phẩm có nhiều mẫu mã và kích cỡ</li>

                      <li>đây là trang web mock thôi....</li>
                    </ul>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Divider className={style.Divider} style={{ margin: "10px 0" }}>
            những sản phẩm có liên quan
          </Divider>

          <Slider
            {...{
              prevArrow:
                suggest.length <= 7 ? (
                  false
                ) : (
                  <Nobackgroundarrow top={37} direction={"left"} />
                ),
              nextArrow:
                suggest.length <= 7 ? (
                  false
                ) : (
                  <Nobackgroundarrow top={37} direction={"right"} />
                ),
              slidesToShow: 5,
              slidesToScroll: suggest.length <= 7 ? 1 : 3,
              autoplaySpeed: 2000,
              lazyLoad: true,
              autoplay: suggest.length <= 7 ? false : true,

              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 4,

                    prevArrow: <Arrow top={37} direction={"left"} />,
                    nextArrow: <Arrow top={37} direction={"right"} />,
                  },
                },
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 3,

                    prevArrow: <Arrow top={37} direction={"left"} />,
                    nextArrow: <Arrow top={37} direction={"right"} />,
                  },
                },
                {
                  breakpoint: 670,
                  settings: {
                    slidesToShow: 2,

                    prevArrow: <Arrow top={37} direction={"left"} />,
                    nextArrow: <Arrow top={37} direction={"right"} />,
                  },
                },
                {
                  breakpoint: 455,
                  settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    prevArrow: <Arrow top={37} direction={"left"} />,
                    nextArrow: <Arrow top={37} direction={"right"} />,
                  },
                },
              ],
            }}
          >
            {suggest.map((item) => (
              <ProductItem key={uuid()} span={24} item={item} />
            ))}
          </Slider>
          <Divider className={style.Divider} style={{ margin: "10px 0" }}>
            thông tin sản phẩm
          </Divider>
          <div className={style.itemInfoBody}>
            <p>{item.info ? item.info : false}</p>
          </div>
          <Divider className={style.Divider} style={{ margin: "10px 0" }}>
            bình luận và nhận xét
          </Divider>
          <LikeAndShare />
          <FacebookComment></FacebookComment>
        </Col>
      ) : (
        <Skeleton active />
      )}
    </Col>
  );
}
export default memo(Item);
