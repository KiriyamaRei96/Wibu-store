import { Col } from "antd";
import FanPage from "../../Facebook component/page";
import style from "./style.module.css";
import logo from "../../img/logo_transparent.png";
import {
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
function Footer() {
  return (
    <Col className={style.footerBackground} span={24}>
      <div className={`main-width ${style.footerBody}`}>
        <Col className={style.footerWrapper} span={24}>
          <Col
            xxl={8}
            xl={8}
            lg={8}
            md={24}
            sm={24}
            xs={24}
            className={style.footerItem}
          >
            <div className={style.footerContend}>
              <FanPage />
            </div>
          </Col>
          <Col
            xxl={8}
            xl={8}
            lg={8}
            md={24}
            sm={24}
            xs={24}
            className={style.footerItem}
          >
            <div className={style.footerInfo}>
              <h4>Developer </h4>
              <ul>
                <li>
                  <UserOutlined /> Trần hoàng
                </li>
                <li>
                  <PhoneOutlined />
                  số điện thoại:
                  <a href="tel:+84387696745">0387696745</a>
                </li>

                <li>
                  <MailOutlined />
                  email:
                  <a href="mailto:lamduchoa96@gmail.com">
                    lamduchoa96@gmail.com
                  </a>
                </li>
                <li>
                  <GithubOutlined />
                  github:
                  <a href="https://github.com/KiriyamaRei96">
                    https://github.com/KiriyamaRei96
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Col>
      </div>
    </Col>
  );
}
export default Footer;
