import { Col } from "antd";
import { useDispatch } from "react-redux";
import { selectTab } from "../../store/headerSlice/headerSlice";
import { memo, useEffect } from "react";
import style from "./style.module.css";

import { Outlet } from "react-router";
function News(props) {
  return (
    <Col className={style.newBody} span={24}>
      <div className={`main-width ${style.newBodyWrapper}`}>
        <Outlet />
      </div>
    </Col>
  );
}
export default memo(News);
