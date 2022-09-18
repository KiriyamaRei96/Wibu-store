import moment from "moment";
import "moment/locale/vi";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import style from "../../style.module.css";
import { useEffect } from "react";

function NewItems({ item }) {
  moment.locale("vi", {});
  let time = item.time ? moment(item.time) : false;
  return (
    <Link to={`/news/page=${item.id}`}>
      <div className={style.newsListItem}>
        <div className={style.newsItemImgWrapper}>
          <img src={item.banner[0]}></img>
        </div>
        <div className={style.newsItemContentWrapper}>
          <h4>{item.Name}</h4>
          {time ? (
            <span className={style.newsItemTime}>
              thời gian diễn ra: {time.format("LL")}
            </span>
          ) : (
            false
          )}
          <span className={style.newsItemContent}>{item.content[0]}</span>
          <span>nguồn: {item.source}</span>
          <span>xem thêm ... </span>
        </div>
      </div>
      <Divider></Divider>
    </Link>
  );
}
export default NewItems;
