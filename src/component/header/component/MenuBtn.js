import {
  MenuOutlined,
  HomeOutlined,
  ShopOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function MenuBtn({ style, active, setActive }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        active !== "menu" ? setActive("menu") : setActive("");
      }}
      className={style.navMenuBtn}
    >
      <MenuOutlined />
      <div
        className={
          active == "menu"
            ? `${style.navSubNav} ${style.active}`
            : style.navSubNav
        }
      >
        <ul>
          <li>
            <Link className={style.NavItem} to="/">
              <HomeOutlined />
              <span>trang chủ</span>
            </Link>
          </li>
          <li>
            <Link className={style.NavItem} to="/post">
              <ShopOutlined />
              <span>sản phẩm</span>
            </Link>
          </li>

          <li>
            <Link className={style.NavItem} to="/news">
              <GlobalOutlined />
              <span>thông tin</span>
            </Link>
          </li>

          <li>
            <Link className={style.NavItem} to="/contact">
              <PhoneOutlined />
              <span>liên hệ</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default MenuBtn;
