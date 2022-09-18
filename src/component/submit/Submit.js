import { Button, Modal, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { authSelector, cartSelector } from "../../store/store";
import openNotification from "../../function/noti";
import { useState } from "react";
import { setHistory, setUserinfo } from "../../store/authSlice/authSlice";
import { updateUserHistory } from "../../firebaseStore/firebaseConfig";
import { clearCart } from "../../store/CartSlice/cartSlice";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const SubmitButton = ({ title, error = undefined, totalMoney }) => {
  const cartInfo = useSelector(cartSelector).itemCart;
  const userInfo = useSelector(authSelector).userInfo;
  const isLogin = useSelector(authSelector).userID;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const ClickHandler = () => {
    if (isLogin === undefined) {
      openNotification(
        "warning",

        "Bạn chưa đăng nhập",
        "Vui lòng đăng nhập để tiếp tục thao tác"
      );

      return;
    }
    if (Object.values(userInfo).includes(undefined)) {
      openNotification(
        "warning",

        "Vui lòng hoàn thiện thông cá nhân",
        "Bạn chưa hoàn thiện thông tin cá nhân"
      );
      navigate("/user-info/info-from");
      return;
    }
    if (location.pathname !== "/cart" && error === undefined) {
      openNotification(
        "info",

        "Vui lòng hoàn kiểm tra giỏ hàng",
        "Hãy kiểm tra thông tin giỏ hàng,trước khi đặt hàng"
      );
      navigate("/cart");
      return;
    }
    if (error !== undefined && error.length !== 0) {
      openNotification(
        "warning",

        "Vui lòng hoàn thiện giỏ hàng",
        "Bạn chưa hoàn thiện thông tin các sản phẩm trong giỏ hàng"
      );

      return;
    }
    if (cartInfo.length === 0) {
      openNotification(
        "warning",

        "Giỏ hàng trống",
        "Bạn chưa chọn sản phẩm "
      );

      return;
    }

    if (
      error.length === 0 &&
      !Object.values(userInfo).includes(undefined) &&
      cartInfo.length > 0
    ) {
      setOpen(true);
      return;
    }
  };

  const submitHandler = () => {
    const history = {
      time: new Date(),
      totalItem: cartInfo.length,
      totalBuyItems: cartInfo.filter((item) => item.price !== undefined).length,
      totalRentItems: cartInfo.filter((item) => item.rent !== undefined).length,
      totalMoney: numberWithCommas(totalMoney),
      detail: cartInfo.map((item) => {
        const { cartId, id, info, ...rest } = item;

        return rest;
      }),
    };

    updateUserHistory(history);
    dispatch(setHistory(history));
    cartInfo.forEach((item) => {
      let formData = new FormData();
      formData.append("name", item.name.trim());
      formData.append("type", item.type.trim());
      formData.append("amount", item.amount);
      formData.append("price", item.price ? item.price : "0");
      formData.append("rent", item.rent ? item.rent : "0");
      formData.append("prepay", item.prePay ? item.prePay : "0");
      formData.append("serivcer", item.services ? item.services : "0");
      formData.append("size", item.size ? item.size.trim() : "unknown");
      formData.append(
        "souvenir",
        item.souvenirOption
          ? "mẫu" + (Number(item.souvenirOption) + 1)
          : "unknown"
      );
      formData.append(
        "costume",
        item.costumeOpition ? item.costumeOpition.trim() : "unknown"
      );
      formData.append(
        "figure",
        item.figureOpition ? item.figureOpition.trim() : "unknown"
      );

      formData.append(
        "total",
        item.price ? item.price * item.amount : item.rent * item.amount
      );
      formData.append("customer", userInfo.name.trim());
      formData.append("email", userInfo.email.trim());
      formData.append("andress", userInfo.andress.trim());
      formData.append("phone", userInfo.phone);

      fetch("https://sheetdb.io/api/v1/vcy7ygne4iz2a", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((html) => console.log("success"));
    });
    dispatch(clearCart());
    openNotification(
      "success",

      "Đặt hàng thành công!",
      "Bạn bạn đã đặt hàng thành công, giỏ hàng sẽ được dọn dẹp."
    );

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const updateHandler = () => {
    dispatch(setUserinfo({ ...userInfo, andress: undefined }));
    navigate("/user-info/info-from");
  };
  return (
    <>
      <Button type="primary" size="large" onClick={ClickHandler}>
        {title}
      </Button>
      <Modal
        open={open}
        title="Xác nhận thông tin cá nhân"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button onClick={submitHandler} key="submit" type="primary">
            Xác nhận thông tin
          </Button>,
          <Button key="update" onClick={updateHandler}>
            Cập nhật thông tin cá nhân
          </Button>,
        ]}
      >
        <ul>
          <li>Tên tài khoản: {userInfo.name}</li>
          <li>Email: {userInfo.email}</li>
          <li>Số điện thoại: {userInfo.phone}</li>
          <li>Địa chỉ: {userInfo.andress}</li>
        </ul>
      </Modal>
    </>
  );
};
export default SubmitButton;
