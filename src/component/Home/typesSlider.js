import style from "./style.module.css";
import Slider from "react-slick";
import ProductItem from "../product group/itemNav/ProductItem";
import { v4 as uuid } from "uuid";
import Nobackgroundarrow from "./Nobackgroundarrow";
import Arrow from "./Arrow";
function TypeSlider({ typeInfo, itemInfo }) {
  return (
    <div className={style.typeSlider}>
      {typeInfo.map((type, id) => {
        return (
          <div
            style={id % 2 === 0 ? {} : { flexDirection: "row-reverse" }}
            className={style.typeSliderContainer}
            key={uuid()}
          >
            <h3>{type.Name}</h3>
            <Slider
              {...{
                swipeToSlide: true,
                lazyLoad: true,
                slidesToShow: 4,

                autoplaySpeed: 2000,
                autoplay: true,

                responsive: [
                  {
                    breakpoint: 1280,
                    settings: {
                      slidesToShow: 3,

                      prevArrow: <Arrow top={39} direction={"left"} />,
                      nextArrow: <Arrow top={39} direction={"right"} />,
                    },
                  },
                  {
                    breakpoint: 670,
                    settings: {
                      slidesToShow: 2,

                      prevArrow: <Arrow top={39} direction={"left"} />,
                      nextArrow: <Arrow top={39} direction={"right"} />,
                    },
                  },

                  {
                    breakpoint: 455,
                    settings: {
                      slidesToShow: 1,
                      centerMode: true,
                      prevArrow: <Arrow top={39} direction={"left"} />,
                      nextArrow: <Arrow top={39} direction={"right"} />,
                    },
                  },
                ],
                prevArrow: <Nobackgroundarrow top={39} direction={"left"} />,
                nextArrow: <Nobackgroundarrow top={39} direction={"right"} />,
              }}
            >
              {itemInfo.map((item) => {
                if (item.type.some((obj) => obj === type.Name)) {
                  return <ProductItem span={24} key={uuid()} item={item} />;
                }
              })}
            </Slider>
          </div>
        );
      })}
    </div>
  );
}

export default TypeSlider;
