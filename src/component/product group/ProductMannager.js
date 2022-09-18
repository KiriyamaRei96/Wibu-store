import { Outlet } from "react-router-dom";
import { memo } from "react";
import { Col } from "antd";

function ProductMannager(props) {
  return (
    <Col className="body-group" span={24}>
      <div className="main-width flex ">
        <Outlet />
      </div>
    </Col>
  );
}
export default memo(ProductMannager);
