import { Link } from "react-router-dom";
import style from "./style.module.css";
import moment from "moment";
import "moment/locale/vi";
import { memo } from "react";

function NewsSliderItems({ info }) {
  moment.locale("vi", {});
  let time = info.time ? moment(info.time) : false;

  return (
    <Link
      to={`/news/page=${info.id}`}
      className={style.sliderItems}
      style={{ backgroundImage: `url(${info.banner[0]})` }}
    >
      <div className={style.sliderItemsNewsContainer}>
        <h3 className={style.sliderItemsName}> {info.Name}</h3>
        {time ? (
          <span className={style.sliderTime}>
            thời gian diễn ra: {time.format("LL")}
          </span>
        ) : (
          false
        )}
        <span className={style.sliderContent}>{info.content[0]}</span>
        <span>nguồn: {info.source}</span>
      </div>
    </Link>
  );
}
export default memo(NewsSliderItems);
