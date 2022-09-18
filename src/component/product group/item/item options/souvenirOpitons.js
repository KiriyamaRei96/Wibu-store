import style from "../style.module.css";

import { v4 as uuid } from "uuid";
import { isFulfilled } from "@reduxjs/toolkit";
import { useState } from "react";

function SouvenirOption({ setCart, slider, item, error, cart, cartId = 0 }) {
  const [active, setActive] = useState();

  const souvenirHandler = (element) => {
    if (slider !== undefined) {
      slider.current.slickGoTo(element.value[0]);
    }

    if (element.checked) {
      setActive(element.value);
    }
    setCart((prv) => {
      return { ...prv, souvenirOption: element.value[0] };
    });
  };

  return (
    <>
      <span>
        mẫu sản phẩm:
        {error && cart.souvenirOption === undefined ? (
          <span className={style.Error}>vui lòng chọn mẫu sản phẩm </span>
        ) : (
          false
        )}
      </span>
      <form className={style.itemOptionImgGroup}>
        {item.img.map((img, index) => {
          const id = index + cartId;

          return (
            <label
              style={
                cartId !== 0
                  ? {
                      height: "40px",
                      width: "40px",
                    }
                  : {} && active == id
                  ? { border: "3px var(--primitive) solid " }
                  : {}
              }
              htmlFor={id}
              key={uuid()}
              className={style.itemOptionImg}
            >
              <img src={img} alt="item"></img>
              <input
                type="radio"
                onChange={(e) => souvenirHandler(e.target)}
                name={"options"}
                style={{ display: "none" }}
                value={id}
                id={id}
              ></input>
            </label>
          );
        })}
      </form>
    </>
  );
}
export default SouvenirOption;
