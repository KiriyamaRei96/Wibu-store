import { useEffect } from "react";
import { useState } from "react";
import CartBtn from "./cartBtn";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";
import UserBtn from "./userBtn";

function MiniNav({
  style,
  suggets,
  searchHandler,
  search,
  movieLogos,
  movieColor,
  isLogin,
  count,
  total,
  userInfo,
  active,
  setActive,
}) {
  return (
    <div className={style.miniNav} span={24}>
      <MenuBtn style={style} active={active} setActive={setActive} />

      <SearchBar
        style={style}
        suggets={suggets}
        searchHandler={searchHandler}
        search={search}
        movieLogos={movieLogos}
        isPc={false}
        movieColor={movieColor}
      />

      <div className={style.navBtnGroup}>
        <UserBtn
          style={style}
          isLogin={isLogin}
          isPc={false}
          userInfo={userInfo}
          active={active}
          setActive={setActive}
        />
        <CartBtn
          style={style}
          total={total}
          count={count}
          isPc={false}
          active={active}
          setActive={setActive}
        />
      </div>
    </div>
  );
}
export default MiniNav;
