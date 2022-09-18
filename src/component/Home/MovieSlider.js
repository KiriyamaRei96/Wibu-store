import style from "./style.module.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Arrow from "./Arrow";
import ProductItem from "../product group/itemNav/ProductItem";
import { Col, Row, Skeleton } from "antd";
import { memo } from "react";

function MovieSlider({ logoinfo, iteminfo }) {
  const movieSlider = useRef();
  const movieItems = useRef();
  const [slider, setSlider] = useState();
  const [size, setSize] = useState("full");
  const reSize = () => {
    if (window.innerWidth > 660) {
      setSize("full");
    } else if (window.innerWidth <= 660 && window.innerWidth > 460) {
      setSize("medium");
    } else if (window.innerWidth <= 460) {
      setSize("small");
    }
  };

  useEffect(() => {
    reSize();
    window.addEventListener("resize", reSize);
  }, []);

  useEffect(() => {
    switch (size) {
      case "full":
        setSlider(
          logoinfo.map((logo) => {
            return iteminfo
              .filter((item) => item.movie[0] === logo.name)
              .splice(0, 6);
          })
        );

        break;
      case "medium":
        setSlider(
          logoinfo.map((logo) => {
            return iteminfo
              .filter((item) => item.movie[0] === logo.name)
              .splice(0, 4);
          })
        );

        break;
      case "small":
        setSlider(
          logoinfo.map((logo) => {
            return iteminfo
              .filter((item) => item.movie[0] === logo.name)
              .splice(0, 2);
          })
        );

        break;

      default:
        throw new Error("Unknown");
    }
  }, [size, logoinfo, iteminfo]);

  return (
    <>
      <Slider
        {...{
          lazyLoad: true,
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 1000,
          prevArrow: <Arrow top={50} direction={"left"} />,
          nextArrow: <Arrow top={50} direction={"right"} />,
        }}
        ref={(e) => (movieSlider.current = e)}
        asNavFor={movieItems.current}
      >
        {logoinfo !== undefined ? (
          logoinfo.map((logo, id) => {
            return (
              <div key={uuid()}>
                <div
                  className={style.HomeMoviesSlicerItem}
                  style={{ backgroundImage: `url(${logo.banner})` }}
                >
                  <div className={style.MoviesSlicerLogoContainer}>
                    <img src={logo.logo} alt="hot"></img>
                  </div>

                  <Row
                    key={uuid()}
                    gutter={[0, 16]}
                    className={style.movieSlideritemContainer}
                  >
                    {slider !== undefined && slider.length > 0
                      ? slider[id].map((info) => (
                          <ProductItem
                            span={
                              size === "small" ? 24 : size === "medium" ? 12 : 8
                            }
                            key={uuid()}
                            item={info}
                          />
                        ))
                      : false}
                  </Row>
                </div>
              </div>
            );
          })
        ) : (
          <Skeleton></Skeleton>
        )}
      </Slider>
    </>
  );
}
export default memo(MovieSlider);
