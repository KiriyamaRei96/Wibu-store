import { Input, Col, Badge, BackTop } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import logo from "../../img/logo_transparent.png";
import { SearchOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  headerState,
  itemSelector,
  cartSelector,
  displaySelector,
  authSelector,
} from "../../store/store";
import { useMemo, useEffect, useState, useRef } from "react";
import SuggetItem from "./SuggestItem";

import { v4 as uuid } from "uuid";

import Messager from "../../Facebook component/mesenger";

import UserBtn from "./component/userBtn";
import CartBtn from "./component/cartBtn";
import SearchBar from "./component/SearchBar";
import MenuBtn from "./component/MenuBtn";
import MiniNav from "./component/MiniNav";
import { memo } from "react";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Header() {
  const userInfo = useSelector(authSelector).userInfo;
  const isLogin = useSelector(authSelector).userID;

  const movieColor = useSelector(headerState).moviesColors;

  const itemList = useSelector(itemSelector).listItems;
  const CartList = useSelector(cartSelector).itemCart;
  const movieLogos = useSelector(displaySelector).movieLogos;
  const navigate = useNavigate();
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [suggets, setSuggets] = useState(false);
  const [miniNav, setMiniNav] = useState(false);
  const [active, setActive] = useState("");

  const totalMoney = useMemo(() => {
    return CartList.reduce((res, item) => {
      let outPut = res;
      item.price
        ? (outPut += item.price * item.amount)
        : (outPut += item.rent * item.amount);
      return outPut;
    }, 0);
  }, [CartList]);
  const home = useRef();
  const post = useRef();
  const news = useRef();
  const contact = useRef();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/cart") {
      setLeft(home.current.offsetLeft);
      setWidth(home.current.clientWidth);
    }
    if (location.pathname.includes("/post")) {
      setLeft(post.current.offsetLeft);
      setWidth(post.current.clientWidth);
    }
    if (location.pathname.includes("/news")) {
      setLeft(news.current.offsetLeft);
      setWidth(news.current.clientWidth);
    }
    if (location.pathname.includes("/contact")) {
      setLeft(contact.current.offsetLeft);
      setWidth(contact.current.clientWidth);
    }

    window.addEventListener("click", () => setSuggets(false));
  }, [location.pathname]);

  useEffect(() => {
    setCount(CartList.length);
    setTotal(totalMoney);
  }, [CartList]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350 && document.body.clientWidth <= 1000) {
        setMiniNav(true);
      }
      if (window.scrollY < 350 || document.body.clientHeight > 1000) {
        setMiniNav(false);
      }
    });

    window.addEventListener("click", () => {
      setActive("");
    });
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSuggets(false);
    }
    if (e.target.value.trim() !== "") {
      const suggetItems = itemList.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setSuggets(suggetItems);
    }
  };
  return (
    <Col className={`${style.headerBackground} `} span={24}>
      <div className={" main-width"}>
        <div className={style.HeaderTablet}>
          <div className={style.navTabMenuGroup} span={24}>
            <MenuBtn style={style} active={active} setActive={setActive} />
            <div>
              <Link className={style.headerLogoWrapper} to="/">
                <img className={style.headerLogo} src={logo} alt="logo" />
              </Link>
            </div>
            <div className={style.navBtnGroup}>
              <UserBtn
                active={active}
                setActive={setActive}
                style={style}
                isLogin={isLogin}
                isPc={false}
                userInfo={userInfo}
              />
              <CartBtn
                active={active}
                setActive={setActive}
                style={style}
                total={total}
                count={count}
                isPc={false}
              />
            </div>
          </div>
          <SearchBar
            style={style}
            suggets={suggets}
            searchHandler={searchHandler}
            search={search}
            movieLogos={movieLogos}
            movieColor={movieColor}
            isPc={false}
          />
        </div>

        {miniNav ? (
          <MiniNav
            active={active}
            setActive={setActive}
            style={style}
            suggets={suggets}
            searchHandler={searchHandler}
            search={search}
            movieLogos={movieLogos}
            movieColor={movieColor}
            isLogin={isLogin}
            count={count}
            total={total}
            userInfo={userInfo}
          />
        ) : (
          false
        )}
        <div className={style.HeaderPc}>
          <Col xxl={18} xl={18} lg={18}>
            <div className={style.headerNavGroup}>
              <Col
                className={style.headerLogoWrapper}
                sm={24}
                md={24}
                lg={8}
                xl={8}
                xxl={8}
              >
                <Link className={style.headerLogoWrapper} to="/">
                  <img className={style.headerLogo} src={logo} alt="logo" />
                </Link>
              </Col>
              <Col
                className="header__center-group flex"
                sm={24}
                md={24}
                lg={16}
                xl={16}
              >
                <ul className={` ${style.navGroup} `}>
                  <li
                    ref={home}
                    className={
                      location.pathname === "/" || location.pathname === "/cart"
                        ? "seleted"
                        : ""
                    }
                  >
                    <Link className={style.NavItem} to="/">
                      <span>trang chủ</span>
                    </Link>
                  </li>
                  <li
                    ref={post}
                    className={
                      location.pathname.includes("/post") ? "seleted" : ""
                    }
                  >
                    <Link className={style.NavItem} to="/post">
                      <span>sản phẩm</span>
                    </Link>
                  </li>

                  <li
                    ref={news}
                    className={
                      location.pathname.includes("/news") ? "seleted" : ""
                    }
                  >
                    <Link className={style.NavItem} to="/news">
                      <span>thông tin</span>
                    </Link>
                  </li>

                  <li
                    ref={contact}
                    className={
                      location.pathname.includes("/contact") ? "seleted" : ""
                    }
                  >
                    <Link className={style.NavItem} to="/contact">
                      <span>liên hệ</span>
                    </Link>
                  </li>
                  <span
                    style={{ width: `${width}px`, left: `${left}px` }}
                    className="runner"
                  ></span>
                </ul>

                <div className={`flex NavSearch__Group`}>
                  <div className={`NavSearch__input-group`}>
                    <Input
                      value={search}
                      onChange={(e) => searchHandler(e)}
                      allowClear
                      onPressEnter={() => navigate(`/post/find=${search}`)}
                    ></Input>
                    {suggets.length > 0 ? (
                      <div className={`${style.NavSuggest} flex`}>
                        {suggets.slice(0, 4).map((item) => (
                          <SuggetItem
                            key={uuid()}
                            item={item}
                            movieColor={movieColor}
                            logo={
                              movieLogos[item.movie[0]]
                                ? movieLogos[item.movie[0]].logo
                                : false
                            }
                          />
                        ))}
                        {suggets.length > 4 ? (
                          <Link
                            className={style.NavMorebtn}
                            to={`/post/find=${search}`}
                          >
                            xem thêm
                          </Link>
                        ) : (
                          false
                        )}
                      </div>
                    ) : (
                      false
                    )}
                  </div>

                  <Link
                    className={style.NavSearchbtn}
                    to={search !== "" ? `/post/find=${search}` : "/post/"}
                  >
                    <SearchOutlined />
                  </Link>
                </div>
              </Col>
            </div>
          </Col>
          <Col className={`header__end-group flex`} lg={6} xl={6} xxl={6}>
            <UserBtn
              style={style}
              isLogin={isLogin}
              isPc={true}
              userInfo={userInfo}
            />
            <CartBtn style={style} total={total} count={count} isPc={true} />
            {/* <div className={style.navBtn}>
              <div className={style.headerBtnWrapper}>
                <Badge count={count}>
                  <ShoppingCartOutlined className={style.navIcon} />
                </Badge>
                <span className={style.headerBtnTilte}>giỏ hàng</span>
              </div>

              <div className={`${style.HeaderModal} ${style.HeaderCart}`}>
                <span className={style.HeaderModalTitle}>Giỏ hàng</span>
                <HeaderCartBody></HeaderCartBody>
                <div className={style.HeaderCartFooter}>
                  <span>Tổng Tiền:{numberWithCommas(total)}vnđ</span>
                  <Link to="/cart" className={style.HeaderCartBtn}>
                    xem giỏ hàng
                  </Link>
                </div>
              </div>
            </div> */}
            <div
              style={{ position: "absolute", top: "90%", left: "0", zIndex: 1 }}
            ></div>
          </Col>
        </div>
      </div>
      <BackTop visibilityHeight={600}>
        <div className={style.headerbackTop}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
      <Messager />
    </Col>
  );
}
export default memo(Header);
