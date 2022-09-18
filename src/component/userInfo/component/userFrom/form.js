import { Input } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import style from "../../style.module.css";
function FormUnit({ formError, title, type, form, setForm }) {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({});
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(form);
    switch (type) {
      case "andress":
      case "name":
        setInfo({
          type: "text",
          title: title,
        });
        break;
      case "phone":
        setInfo({
          type: "text",
          title: "số điện thoại",
        });
        break;
      case "email":
        setInfo({
          type: "text",
          title: "email",
        });
        break;

      default:
        console.error("invalid type");
        break;
    }
  }, []);

  const changeHandler = (e) => {
    setError(false);
    setValue(e.target.value);
  };
  const checkHandler = () => {
    let regex;
    switch (type) {
      case "andress":
      case "name":
        if (value === undefined || value === "") {
          setInfo((prv) => {
            return { ...prv, error: "bạn chưa nhập thông tin" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else {
          setForm((prv) => {
            return { ...prv, [type]: value };
          });
        }
        break;

      case "phone":
        regex =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (value === undefined || value === "") {
          setInfo((prv) => {
            return { ...prv, error: "bạn chưa nhập số điện thoại" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else if (!regex.test(value)) {
          setInfo((prv) => {
            return { ...prv, error: "bạn đã nhập sai cú pháp số điện thoại" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else {
          setForm((prv) => {
            return { ...prv, [type]: value };
          });
        }
        break;
      case "email":
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value === undefined || value === "") {
          setInfo((prv) => {
            return { ...prv, error: "bạn chưa nhập email" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else if (!regex.test(value)) {
          setInfo((prv) => {
            return { ...prv, error: "bạn đã nhập sai cú pháp email" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else {
          setForm((prv) => {
            return { ...prv, [type]: value };
          });
        }
        break;
      case "avatar":
        var expression =
          /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
        regex = new RegExp(expression);
        if (value === undefined || value === "") {
          setInfo((prv) => {
            return { ...prv, error: "link hình ảnh không thể bỏ trống" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else if (!value.match(regex)) {
          setInfo((prv) => {
            return { ...prv, error: "bạn đã nhập sai cú pháp Link" };
          });
          setForm((prv) => {
            return { ...prv, [type]: undefined };
          });
          setError(true);
        } else {
          setForm((prv) => {
            return { ...prv, [type]: value };
          });
        }
        break;

      default:
        console.error("invalid type");
        break;
    }
  };
  useEffect(() => {
    if (formError) {
      checkHandler();
    }
  }, [formError]);
  return (
    <>
      {type !== "avatar" ? (
        <div className={style.infoGroup}>
          <h6>
            {info.title}:{" "}
            {error ? <span className={style.error}>{info.error}</span> : false}
          </h6>
          <>
            <Input
              onChange={(e) => changeHandler(e)}
              onBlur={checkHandler}
              type={info.type}
              value={value}
              placeholder={info.title}
            ></Input>
          </>
        </div>
      ) : (
        <div className={style.infoGroup}>
          <h6>
            ảnh đại diện:{" "}
            {error ? <span className={style.error}>{info.error}</span> : false}
          </h6>
          <div className={style.avtarInputGroup}>
            <div className={style.avtarWrapper}>
              <img src={value} alt={value}></img>
            </div>
            <div className={style.avatarInputWrapper}>
              <span>nhập địa chỉ hình ảnh</span>
              <Input
                type="url"
                value={value}
                onChange={(e) => changeHandler(e)}
                onBlur={checkHandler}
              ></Input>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default FormUnit;
