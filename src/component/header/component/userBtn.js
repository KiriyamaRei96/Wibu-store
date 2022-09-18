import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Authentication from "../authentication";

function UserBtn({ style, isLogin, isPc, userInfo, setActive, active }) {
  const ref = useRef();
  const [position, setPosition] = useState();

  useEffect(() => {
    setPosition({
      left: ref.current.offsetLeft,
      width: ref.current.offsetWidth,
    });
  }, []);

  const [info, setInfo] = useState();
  useEffect(() => {
    if (userInfo) {
      setInfo(userInfo);
    }
  }, [Object.values(userInfo)]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        active !== "user" ? setActive("user") : setActive("");
      }}
      ref={ref}
      className={style.navBtn}
    >
      <>
        <>
          {isLogin ? (
            <div className={style.headerBtnWrapper}>
              <div className={style.headerAvatar}>
                <img src={info ? info.avatar : ""}></img>
              </div>
              {isPc ? (
                <span className={style.headerBtnTilte}>
                  {info ? info.name : ""}
                </span>
              ) : (
                false
              )}
            </div>
          ) : (
            <>
              <UserOutlined className={style.navIcon} />
              {isPc ? (
                <span className={style.headerBtnTilte}>đăng nhập</span>
              ) : (
                false
              )}
            </>
          )}
        </>

        <div
          style={
            !isPc && active === "user"
              ? {
                  visibility: "visible",
                  opacity: 1,
                  transform: " scale(1)",
                }
              : {}
          }
          className={`${style.HeaderModal} ${style.headerUserInfo}`}
        >
          <div
            style={position && !isPc ? { left: `${position.left + 10}px` } : {}}
            className={style.HeaderModalArrow}
          ></div>
          {isLogin ? (
            <span className={style.HeaderModalTitle}>thông tin khách hàng</span>
          ) : (
            <span className={style.HeaderModalTitle}>đăng nhập</span>
          )}

          {isLogin ? (
            <div className={style.HeaderModalInfo}>
              <span>tài khoản: {info ? info.name : ""}</span>
              <span>email: {info ? info.email : ""}</span>
              <Link to="/user-info"> thông tin tài khoản</Link>
            </div>
          ) : (
            false
          )}
          <Authentication style={style} />
        </div>
      </>
    </div>
  );
}
export default UserBtn;
