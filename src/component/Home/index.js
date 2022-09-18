import { Col, Divider, Skeleton } from "antd";

import { selectTab } from "../../store/headerSlice/headerSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, memo, useState } from "react";
import style from "./style.module.css";
import Slider from "react-slick";
import { newsSelector, displaySelector, itemSelector } from "../../store/store";
import { v4 as uuid } from "uuid";
import NewsSliderItems from "./NewsSliderItems";
import MovieSlider from "./MovieSlider";
import Arrow from "./Arrow";
import Nobackgroundarrow from "./Nobackgroundarrow";
import ProductItem from "../product group/itemNav/ProductItem";
import TypeSlider from "./typesSlider";
import Contact from "../contact";
import ContactHome from "./Contact";

function Home() {
  const NewsList = useSelector(newsSelector).newList;
  const movieLogo = useSelector(displaySelector).movieLogos;
  const hotTypes = useSelector(displaySelector).hotTypes;

  const iteminfo = useSelector(itemSelector).listItems;
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const dateSort = useMemo(
    () =>
      [...iteminfo]
        .sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
        .slice(0, 12),
    [iteminfo]
  );
  useEffect(() => {
    if (iteminfo.length > 0) {
      setLoaded(true);
      if (document.title !== "Trang chủ") {
        document.title = "Trang chủ";
      }
    }
  }, [iteminfo]);

  return (
    <Col className="body-group" span={24}>
      <div className="main-width flex ">
        {loaded ? (
          <Col span={24}>
            <Slider
              {...{
                customPaging: (slick) => {
                  let url = NewsList[slick].banner[0];
                  return (
                    <a key={uuid()}>
                      <div
                        style={{
                          backgroundImage: `url(${url})`,
                          paddingTop: `50px`,
                          width: "100px",

                          margin: "10px",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </a>
                  );
                },
                dotsClass: style.dot,
                dotsStyle: "display:flex",
                dots: true,
                infinite: true,
                fade: true,
                lazyLoad: true,
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                swipeToSlide: true,
                autoplaySpeed: 2000,
                prevArrow: <Arrow top={37} direction={"left"} />,
                nextArrow: <Arrow top={37} direction={"right"} />,
              }}
            >
              {NewsList
                ? NewsList.map((news) => (
                    <NewsSliderItems key={uuid()} info={news} />
                  ))
                : false}
            </Slider>
            <Divider>
              <h3 className={style.homeItemTitle}>Anime Hot</h3>
            </Divider>
            <p className={style.HomeSliderInfo}>
              những sản phẩm liên quan đến những bộ anime hot gần đây
            </p>

            <MovieSlider
              iteminfo={iteminfo}
              logoinfo={Object.values(movieLogo).filter((logo) => logo.hot)}
            ></MovieSlider>
            <Divider>
              <h3 className={style.homeItemTitle}>sản phẩm mới</h3>
            </Divider>
            <Slider
              {...{
                prevArrow: <Nobackgroundarrow top={37} direction={"left"} />,
                nextArrow: <Nobackgroundarrow top={37} direction={"right"} />,
                slidesToShow: 5,
                slidesToScroll: 3,
                autoplaySpeed: 2000,
                lazyLoad: true,
                autoplay: true,
                swipeToSlide: true,
                infinite: true,
                responsive: [
                  {
                    breakpoint: 1280,
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
              {dateSort.map((item) => (
                <ProductItem span={24} key={uuid()} item={item} />
              ))}
            </Slider>
            <Divider>
              <h3 className={style.homeItemTitle}> Nhóm sản phẩm</h3>
            </Divider>
            <p className={style.HomeSliderInfo}>
              những nhóm sản phẩm được quan tâm nhiều nhất
            </p>
            <TypeSlider typeInfo={hotTypes} itemInfo={iteminfo}></TypeSlider>

            <Divider>
              <h3 className={style.homeItemTitle}>Liên hệ</h3>
            </Divider>
            <p className={style.HomeSliderInfo}>địa chỉ và liên hệ</p>
            <ContactHome />
            {/* <div className={style.homeContactContainer}>
              <h4>liên hệ</h4>
              <div className={style.homeContacItemGroup}>
                <div className={style.homeContacItemWrapper}>
                  <div className={style.homeContacItem}>
                    <div className={style.homeContacItemLogo}>
                      <img src={storePng} alt={storePng}></img>
                    </div>
                    <div className={style.homeContacContent}>
                      <h4>cửa hàng </h4>
                      <ul>
                        <li>địa chỉ: hà nội,việt nam</li>
                        <li>
                          số điện thoại:
                          <a href="tel:+841969696969">1969696969</a>
                        </li>
                        <li>
                          email:
                          <a href="mailto:wibuStore@meow.com">
                            wibuStore@meow.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={style.homeContacItemWrapper}>
                  <div className={style.homeContacItem}>
                    <div className={style.homeContacItemLogo}>
                      <img src={devPng} alt={devPng}></img>
                    </div>
                    <div className={style.homeContacContent}>
                      <h4>developer </h4>
                      <ul>
                        <li>dev: Trần hoàng</li>
                        <li>
                          số điện thoại:
                          <a href="tel:+84387696745">0387696745</a>
                        </li>

                        <li>
                          email:
                          <a href="mailto:lamduchoa96@gmail.com">
                            lamduchoa96@gmail.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className={style.homeMapContainer}>
              <h4>địa chỉ</h4>
              <iframe
                className={style.homeMap}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.09761736222!2d105.85017601532763!3d21.028779743152626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1661416144645!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        ) : (
          <Skeleton style={{ height: "100vh" }} active />
        )}
      </div>
    </Col>
  );
}
export default memo(Home);
