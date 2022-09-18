import { Radio } from "antd";
import { useEffect } from "react";
function FigureOpitons({
  setCart,
  setPrepay = () => {},
  price,
  setPrice = () => {},
}) {
  useEffect(() => figureHandler(""), []);
  const figureHandler = (value) => {
    switch (value) {
      case "đặt trước mới 100%":
        setCart((prv) => {
          return { ...prv, figureOpition: "đặt trước mới 100%" };
        });
        setPrice((prv) => {
          return { ...prv, displayPrice: price };
        });
        setPrepay(price / 2);
        break;

      case "second hand":
        setCart((prv) => {
          return { ...prv, figureOpition: "second hand" };
        });
        const secondHandPrice = price - Math.floor((15 * price) / 100);
        setPrice((prv) => {
          return { ...prv, displayPrice: secondHandPrice };
        });
        setPrepay(secondHandPrice / 2);
        break;
      default:
        setCart((prv) => {
          return { ...prv, figureOpition: "mới 100%" };
        });
        setPrepay(0);
        setPrice((prv) => {
          return { ...prv, displayPrice: price };
        });
        break;
    }
  };
  return (
    <>
      <span>nhóm sản phẩm:</span>
      <Radio.Group
        onChange={(e) => {
          figureHandler(e.target.value);
        }}
        buttonStyle="solid"
        defaultValue="lấy ngay mới 100%"
      >
        <Radio.Button value="lấy ngay mới 100%">lấy ngay mới 100%</Radio.Button>
        <Radio.Button value="đặt trước mới 100%">
          đặt trước mới 100%
        </Radio.Button>
        <Radio.Button value="second hand">second hand</Radio.Button>
      </Radio.Group>
    </>
  );
}
export default FigureOpitons;
