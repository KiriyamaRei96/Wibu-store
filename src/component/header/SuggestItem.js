import style from "./style.module.css";
import { Link } from "react-router-dom";
import { Tag } from "antd";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function SuggetItem({ item, movieColor, logo }) {
  return (
    <Link className={`${style.NavSuggestitems} `} to={`/post/item${item.id}`}>
      <img src={item.img[0]} alt="img"></img>
      <div className={`${style.NavInfo} `}>
        <div className={`${style.NavNameinfo} `}>
          <span>{item.name}</span>
        </div>
        <div className={`${style.NavMoviesinfo} `}>
          <span>phim:</span>

          {logo ? (
            <div className={style.HeaderCartLogoGroup}>
              {" "}
              <img className={style.HeaderCartLogo} src={logo} alt="logo"></img>
            </div>
          ) : (
            false
          )}
          {!logo
            ? item.movie.map((mv, id) => (
                <Tag color={movieColor[mv]} key={id + mv}>
                  {mv}
                </Tag>
              ))
            : false}
        </div>
        <div className={`${style.NavPriceinfo} `}>
          <span>
            {item.sale ? `giá bán:   ${numberWithCommas(item.sale)}vnd` : false}
          </span>
          <span>
            {item.renting
              ? `giá cho thuê:   ${numberWithCommas(item.renting)}vnd/ngày`
              : false}
          </span>
        </div>
      </div>
    </Link>
  );
}
export default SuggetItem;
