import style from "./style.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Nobackgroundarrow({ direction, onClick, top = 50 }) {
  return (
    <div
      onClick={onClick}
      style={
        direction !== "left"
          ? { right: "-30px", top: `${top}%` }
          : { top: `${top}%`, left: "-30px" }
      }
      className={style.noBackgroundarrow}
    >
      {direction === "left" ? <LeftOutlined /> : <RightOutlined />}
    </div>
  );
}
export default Nobackgroundarrow;
