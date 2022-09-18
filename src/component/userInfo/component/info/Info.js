import { Col, Divider, List, Skeleton } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../store/store";
import style from "../../style.module.css";
import HistoryItem from "./component/historyItem";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
function Info() {
  const [history, setHistory] = useState();
  const userInfo = useSelector(authSelector).userInfo;
  const userHistory = useSelector(authSelector).userHistory;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo !== undefined && Object.values(userInfo).includes(undefined)) {
      navigate("/user-info/info-from");
    }

    if (document.title !== "Thông tin cá nhân") {
      document.title = "Thông tin cá nhân";
    }
  }, []);
  useEffect(() => {
    if (userHistory) {
      setHistory(userHistory);
    }
  }, [userHistory]);

  return (
    <>
      {userInfo ? (
        <>
          <Col className={`flex ${style.userInfoBody} `} span={24}>
            <div className={style.userInfoGroup}>
              <div className={style.userInfoAvataWrapper}>
                <img src={userInfo.avatar}></img>
              </div>
              <h4>{userInfo.name}</h4>
              <Divider style={{ margin: "5px 0" }} />
              <span>email: {userInfo.email}</span>
              <span>số điện thoại: {userInfo.phone}</span>
              <span>địa chỉ: {userInfo.andress}</span>
            </div>
            <div className={style.userHistoryGroup}>
              <div className={style.userHistoryGroupHeader}>
                <h3>lịch sử đơn hàng:</h3>
                <span>
                  số lượng đơn hàng đã đặt:{history ? history.length : 0}
                </span>
              </div>

              <List
                itemLayout="vertical"
                size="large"
                className={style.userHistoryList}
                dataSource={history}
                renderItem={(item, index) => {
                  return (
                    <>
                      <HistoryItem key={uuid()} item={item} index={index} />
                    </>
                  );
                }}
              ></List>
            </div>
          </Col>
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
export default Info;
