import { DownOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import { memo, useEffect, useState } from "react";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function DrawSlider({ style, setLoaded, setFilter, maxPrice, filter }) {
  const [price, setPrice] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setPrice(filter.price);
  }, []);
  return (
    <div className={style.optionsGroup}>
      <span
        className={
          active ? `${style.optionsTitle} ${style.active}` : style.optionsTitle
        }
        onClick={() => setActive(!active)}
      >
        giá
        <DownOutlined />
      </span>
      <div
        className={
          active ? `${style.optionsBody} ${style.active}` : style.optionsBody
        }
      >
        <span>khoảng giá:</span>
        <div className={style.optionsPricerange}>
          <span> {numberWithCommas(price ? price[0] : 0)}vnđ</span>
          <span>
            {numberWithCommas(price ? price[1] : 999999999)}
            vnđ
          </span>
        </div>
        <Slider
          range
          value={price}
          onChange={(value) => setPrice(value)}
          onAfterChange={(value) => {
            setLoaded(false);
            setFilter((prv) => {
              return { ...prv, price: value };
            });
          }}
          defaultValue={[0, maxPrice]}
          max={maxPrice}
        />
      </div>
    </div>
  );
}
export default memo(DrawSlider);
