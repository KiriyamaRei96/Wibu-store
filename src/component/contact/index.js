import { Typography, Tag, Col } from "antd";
import FanPage from "../../Facebook component/page";
import { memo } from "react";
import style from "./style.module.css";
import ContactHome from "../Home/Contact";
import { useEffect } from "react";

function Contact(props) {
  useEffect(() => {
    if (document.title !== "Liên hệ") {
      document.title = "Liên hệ";
    }
  }, []);
  return (
    <Col span={24} alt={"ScreenShot"} className="background-color">
      <div className="main-width  Main">
        <div className={style.bannerWrapper}>
          <img
            src="https://images.alphacoders.com/901/901101.png"
            alt="banner"
          />
          <h2>liên hệ</h2>
        </div>
        <div className={style.contactBody}>
          <ContactHome></ContactHome>

          <div className={style.contactMapContainer}>
            <h4>địa chỉ</h4>
            <iframe
              className={style.contactMap}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.09761736222!2d105.85017601532763!3d21.028779743152626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1661416144645!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </Col>
  );
}
export default memo(Contact);
