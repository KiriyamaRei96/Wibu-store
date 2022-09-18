import { Radio } from "antd";
import CostumeOpitons from "./costumeOpitons";
import FigureOpitons from "./figureOpitons";
import SouvenirOption from "./souvenirOpitons";
function ItemOptions({
  setCart,
  setPrepay,
  setPrice,
  setService,
  cart,
  item,
  slider,
  type,
  error,
}) {
  return (
    <>
      {type === "costume" ? (
        <CostumeOpitons
          setCart={setCart}
          setService={setService}
          setPrice={setPrice}
        />
      ) : (
        false
      )}
      {type === "souvenir" ? (
        <SouvenirOption
          item={item}
          error={error}
          cart={cart}
          setCart={setCart}
          slider={slider}
        />
      ) : (
        false
      )}

      {type === "figure" ? (
        <FigureOpitons
          setPrice={setPrice}
          price={item.sale}
          setCart={setCart}
          setPrepay={setPrepay}
        />
      ) : (
        false
      )}
      {type !== "costume" && type !== "souvenir" && type !== "figure" ? (
        <>
          <span>kiểu dáng</span>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: "fit-content" }} checked={true}>
              nguyên gốc
            </Radio.Button>
          </Radio.Group>
        </>
      ) : (
        false
      )}
    </>
  );
}
export default ItemOptions;
