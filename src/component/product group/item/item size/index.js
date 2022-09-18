import { Radio } from "antd";
import style from "../style.module.css";
function ItemSize({ type, item, setCart, cart, error }) {
  return (
    <>
      {type !== "weapons" &&
      type !== "costume" &&
      !item.type.includes("trang phục") ? (
        <>
          <span>tỉ lệ</span>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: "fit-content" }} checked={true}>
              theo nhà sản xuất
            </Radio.Button>
          </Radio.Group>
        </>
      ) : (
        false
      )}
      {type === "weapons" ? (
        <>
          <span>tỉ lệ</span>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: "fit-content" }} checked={true}>
              1:1
            </Radio.Button>
          </Radio.Group>
        </>
      ) : (
        false
      )}
      {type === "costume" || item.type.includes("trang phục") ? (
        <>
          <span>
            kích cỡ:
            {error && cart.size === undefined ? (
              <span className={style.Error}>vui lòng chọn kích cỡ </span>
            ) : (
              false
            )}
          </span>
          <Radio.Group
            onChange={(e) =>
              setCart((prv) => {
                return { ...prv, size: e.target.value };
              })
            }
            buttonStyle="solid"
          >
            <Radio.Button
              className={style.itemSizebtn}
              value={"s"}
              style={{ width: "fit-content" }}
            >
              s
            </Radio.Button>
            <Radio.Button
              className={style.itemSizebtn}
              value={"m"}
              style={{ width: "fit-content" }}
            >
              m
            </Radio.Button>
            <Radio.Button
              className={style.itemSizebtn}
              value={"l"}
              style={{ width: "fit-content" }}
            >
              l
            </Radio.Button>
            <Radio.Button
              className={style.itemSizebtn}
              value={"xl"}
              style={{ width: "fit-content" }}
            >
              xl
            </Radio.Button>
            <Radio.Button
              className={style.itemSizebtn}
              value={"xxl"}
              style={{ width: "fit-content" }}
            >
              xxl
            </Radio.Button>
          </Radio.Group>
        </>
      ) : (
        false
      )}
    </>
  );
}
export default ItemSize;
