import { Col } from "antd";
import { Outlet } from "react-router";

function UserInfo() {
  return (
    <>
      <Col className="Main  background-color " span={24}>
        <div className=" main-width  ">
          <Outlet />
        </div>
      </Col>
    </>
  );
}
export default UserInfo;
