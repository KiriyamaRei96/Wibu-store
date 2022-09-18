import style from "./style.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Arrow({ direction, onClick, top = 50 }) {
  return (
    <div
      onClick={onClick}
      style={
        direction !== "left"
          ? { right: "0px", top: `${top}%` }
          : { top: `${top}%` }
      }
      className={style.arrow}
    >
      {direction === "left" ? <LeftOutlined /> : <RightOutlined />}
    </div>
  );
}
export default Arrow;
