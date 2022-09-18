import { Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { newsSelector } from "../../../../store/store";
import style from "../../style.module.css";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
function NewsPage() {
  const newsID = useParams().newsID;
  const newsArr = useSelector(newsSelector).newList;
  const [loaded, setLoaded] = useState(false);
  const [news, setNews] = useState(false);
  moment.locale("vi", {});
  let time = news.time ? moment(news.time) : false;
  useEffect(() => {
    if (newsArr.length > 0) {
      const newsObj = newsArr.find((obj) => obj.id === newsID);
      setNews(newsObj);
      setLoaded(true);
      if (document.title !== newsObj.Name) {
        document.title = newsObj.Name;
      }
    }
  }, [newsArr]);

  return (
    <div>
      {loaded ? (
        <div className={style.newsPageBody}>
          <div>
            <Link to="/">Trang chủ</Link> / <Link to="/news">tin tức</Link> /
          </div>
          <Divider style={{ marginTop: "5px ", marginBottom: "5px" }}></Divider>
          <h1>{news.Name} </h1>
          <div className={style.newsPageInfo}>
            {time ? <span>thời gian :{time.format("LL")}</span> : false}

            <span> nguồn : {news.source}</span>
          </div>
          <img
            className={style.newPageBanner}
            src={news.banner[0]}
            alt={news.Name}
          ></img>
          {news.content.map((text, id) => {
            return (
              <div key={uuid()}>
                <p className={style.newPageContent}>{text}</p>

                {news.img && news.img[id] ? (
                  <img
                    className={style.newPageImg}
                    src={news.img[id]}
                    alt="img"
                  ></img>
                ) : (
                  false
                )}
              </div>
            );
          })}
          {news.link ? <a href={news.link}>xem thêm ....</a> : false}
        </div>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
}
export default NewsPage;
