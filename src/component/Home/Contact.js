import storePng from "../../img/store-2017.png";
import devPng from "../../img/4394314_dev_logo_logos_icon.png";
import style from "./style.module.css";

function ContactHome() {
  return (
    <div className={style.homeContactContainer}>
      <h4>liên hệ</h4>
      <div className={style.homeContacItemGroup}>
        <div className={style.homeContacItemWrapper}>
          <div className={style.homeContacItem}>
            <div className={style.homeContacItemLogo}>
              <img src={storePng} alt={storePng}></img>
            </div>
            <div className={style.homeContacContent}>
              <h4>cửa hàng </h4>
              <ul>
                <li>địa chỉ: hà nội,việt nam</li>
                <li>
                  số điện thoại:
                  <a href="tel:+841969696969">1969696969</a>
                </li>
                <li>
                  email:
                  <a href="mailto:wibuStore@meow.com">wibuStore@meow.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.homeContacItemWrapper}>
          <div className={style.homeContacItem}>
            <div className={style.homeContacItemLogo}>
              <img src={devPng} alt={devPng}></img>
            </div>
            <div className={style.homeContacContent}>
              <h4>developer </h4>
              <ul>
                <li>dev: Trần hoàng</li>
                <li>
                  số điện thoại:
                  <a href="tel:+84387696745">0387696745</a>
                </li>

                <li>
                  email:
                  <a href="mailto:lamduchoa96@gmail.com">
                    lamduchoa96@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactHome;
