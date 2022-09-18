import style from "../style.module.css";
import { Radio } from "antd";
import { useEffect } from "react";

function CostumeOpitons({ setCart, setService, setPrice }) {
  useEffect(() => rentoptionHandler(""), []);
  const rentoptionHandler = (value) => {
    switch (value) {
      case "lẻ costume":
        setService(0);
        setCart((prv) => {
          return { ...prv, costumeOpition: "lẻ costume" };
        });
        setPrice((prv) => {
          return { ...prv, displayPrice: prv.displayPrice - 150000 };
        });
        break;
      case "Full set + Makeup":
        setCart((prv) => {
          return { ...prv, costumeOpition: "Full set + Makeup" };
        });
        setPrice((prv) => {
          return { ...prv, displayPrice: prv.originalPrice };
        });
        setService(200000);
        break;

      default:
        setService(0);
        setCart((prv) => {
          return { ...prv, costumeOpition: "full set" };
        });
        setPrice((prv) => {
          return { ...prv, displayPrice: prv.originalPrice };
        });
        break;
    }
  };

  return (
    <>
      <span>Combo:</span>
      <Radio.Group
        onChange={(e) => rentoptionHandler(e.target.value)}
        buttonStyle="solid"
        defaultValue="Full set"
      >
        <Radio.Button value="Full set">Full set</Radio.Button>
        <Radio.Button value="Full set + Makeup">Full set + Makeup</Radio.Button>
        <Radio.Button value="lẻ costume">lẻ costume</Radio.Button>
      </Radio.Group>
    </>
  );
}
export default CostumeOpitons;
