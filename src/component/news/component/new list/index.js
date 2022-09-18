import NewItems from "./Newsitem";
import style from "../../style.module.css";
import { v4 as uuid } from "uuid";
import { newsSelector } from "../../../../store/store";
import { useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { Skeleton } from "antd";

function NewList({}) {
  const [loaded, setLoaded] = useState(false);

  const info = useSelector(newsSelector).newList;
  useEffect(() => {
    if (info.length > 0) {
      setLoaded(true);
      if (document.title !== "Thông tin") {
        document.title = "Thông tin";
      }
    }
  }, [info]);

  return (
    <>
      {loaded ? (
        <>
          <div className={style.newBannerWrapper}>
            <img src="https://wallpaperaccess.com/full/3097725.jpg"></img>
            <h2>tin tức</h2>
          </div>
          <div className={style.newListWrapper}>
            {info.map((item) => (
              <NewItems key={uuid()} item={item} />
            ))}
          </div>
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
export default memo(NewList);
