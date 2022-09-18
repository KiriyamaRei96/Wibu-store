import style from "../style.module.css";
import { InputNumber, Button } from "antd";
import { useEffect, useState } from "react";

function ItemAmount({ setCart, info }) {
  const [max, setMax] = useState(Number);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    info.renting ? setMax(30) : setMax(100);
  }, []);
  useEffect(() => {
    setCart((prv) => {
      return { ...prv, amount: amount };
    });
  }, [amount]);
  return (
    <>
      {info.sale ? (
        <>
          <span>số lượng</span>
          <div>
            <Button
              className={style.amountItem}
              onClick={() => {
                if (amount > 1) {
                  setAmount((prv) => (prv -= 1));
                }
              }}
              size={"large"}
            >
              -
            </Button>
            <InputNumber
              className={style.AmountInput}
              value={amount}
              onChange={(value) => {
                if (amount <= max) {
                  setAmount(value);
                } else {
                  setAmount(max);
                }
              }}
              min={1}
              max={max}
              size={"large"}
              controls={false}
            ></InputNumber>
            <Button
              onClick={() => {
                if (amount < max) {
                  setAmount((prv) => (prv += 1));
                }
              }}
              size={"large"}
            >
              +
            </Button>
          </div>
        </>
      ) : (
        false
      )}
      {info.renting ? (
        <>
          <span>số ngày thuê</span>
          <div>
            <Button
              className={style.amountItem}
              onClick={() => {
                if (amount > 1) {
                  setAmount((prv) => (prv -= 1));
                }
              }}
              size={"large"}
            >
              -
            </Button>
            <InputNumber
              className={style.AmountInput}
              value={amount}
              onChange={(value) => {
                if (amount <= max) {
                  setAmount(value);
                } else {
                  setAmount(max);
                }
              }}
              min={1}
              max={max}
              size={"large"}
              controls={false}
            ></InputNumber>
            <Button
              className={style.amountItem}
              onClick={() => {
                if (amount < max) {
                  setAmount((prv) => (prv += 1));
                }
              }}
              size={"large"}
            >
              +
            </Button>
          </div>
        </>
      ) : (
        false
      )}
    </>
  );
}
export default ItemAmount;
