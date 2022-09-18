import { Button, Col, Input, Skeleton } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserData } from "../../../../firebaseStore/firebaseConfig";
import { setUserinfo } from "../../../../store/authSlice/authSlice";

import { authSelector } from "../../../../store/store";
import style from "../../style.module.css";
import FormUnit from "./form";

function UserFrom() {
  const [form, setFrom] = useState();
  const [error, setError] = useState(false);
  const dispach = useDispatch();
  const userInfo = useSelector(authSelector).userInfo;
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.values(userInfo).length > 0) {
      setFrom(userInfo);
    }
    if (!Object.values(userInfo).includes(undefined)) {
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = () => {
    setError(false);
    if (Object.values(form).includes(undefined)) {
      setError(true);
    } else if (!Object.values(form).includes(undefined)) {
      dispach(setUserinfo(form));
      updateUserData(form);
      navigate("/");
    }

    // updateUserData(form);
  };

  return (
    <>
      {form ? (
        <>
          <Col span={24}>
            {" "}
            <Link to="/">Trang chủ</Link> /{" "}
            <Link to="/user-info">thông tin cá nhân</Link> /
          </Col>
          <Col span={24} className={style.formMain}>
            <div>
              <h2>thông tin khách hàng</h2>
              <Col span={24} className={style.formInputs}>
                <FormUnit
                  formError={error}
                  type="name"
                  title={"tên tài khoản"}
                  form={form.name}
                  setForm={setFrom}
                />
                <FormUnit
                  formError={error}
                  type="avatar"
                  form={form.avatar}
                  setForm={setFrom}
                />

                <FormUnit
                  formError={error}
                  type="email"
                  form={form.email}
                  setForm={setFrom}
                />

                <FormUnit
                  formError={error}
                  type="phone"
                  form={form.phone}
                  setForm={setFrom}
                />

                <FormUnit
                  formError={error}
                  type="andress"
                  title={"địa chỉ"}
                  form={form.andress}
                  setForm={setFrom}
                />
              </Col>
            </div>

            <Button type="primary" onClick={submitHandler}>
              xác nhận thông tin
            </Button>
          </Col>
        </>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
export default UserFrom;
