import { Button } from "antd";

import { memo } from "react";
import { useSelector } from "react-redux";
import { updateUserHistory } from "../../../../firebaseStore/firebaseConfig";
import { authSelector } from "../../../../store/store";
import SubmitButton from "../../../submit/Submit";
// import { ui } from "../../../../firebase/firebaseUI.js";
// console.log(ui);
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function CartInfo({ style, cartInfo, totalMoney, error }) {
  const userInfo = useSelector(authSelector).userInfo;

  return (
    <div className={style.cartInfo}>
      <h4>thông tin đơn hàng</h4>
      <span> số sản phẩm trong giỏ hàng: {cartInfo.length} </span>
      <div className={style.cartNumberInfo}>
        <div>
          <ul>
            <li>
              tổng số sản lượng sản phẩm:{" "}
              {cartInfo.reduce(
                (res, item) => (res += item.amount),

                0
              )}
            </li>

            {cartInfo.filter((item) => item.rent !== undefined).length > 0 ? (
              <li>
                sản phẩm thuê:
                {cartInfo.filter((item) => item.rent !== undefined).length}
              </li>
            ) : (
              false
            )}
            {cartInfo.filter((item) => item.price !== undefined).length > 0 ? (
              <li>
                sản phẩm mua:
                {cartInfo.filter((item) => item.price !== undefined).length}
              </li>
            ) : (
              false
            )}
          </ul>
          <span> giá theo nhóm sản phẩm:</span>
          <ul>
            {cartInfo.reduce(
              (res, item) =>
                item.rent ? (res += item.rent * item.amount) : (res += 0),
              0
            ) ? (
              <li>
                tổng phí thuê sản phẩm:{" "}
                {numberWithCommas(
                  cartInfo.reduce(
                    (res, item) =>
                      item.rent ? (res += item.rent * item.amount) : (res += 0),
                    0
                  )
                )}{" "}
                vnđ
              </li>
            ) : (
              false
            )}

            {cartInfo.reduce(
              (res, item) =>
                item.price ? (res += item.price * item.amount) : (res += 0),
              0
            ) ? (
              <li>
                tổng giá mua sản phẩm:{" "}
                {numberWithCommas(
                  cartInfo.reduce(
                    (res, item) =>
                      item.price
                        ? (res += item.price * item.amount)
                        : (res += 0),
                    0
                  )
                )}{" "}
                vnđ
              </li>
            ) : (
              false
            )}
            {cartInfo.reduce(
              (res, item) =>
                item.prePay ? (res += item.prePay * item.amount) : (res += 0),
              0
            ) ? (
              <li>
                tổng số tiền đặt cọc:{" "}
                {numberWithCommas(
                  cartInfo.reduce(
                    (res, item) =>
                      item.prePay
                        ? (res += item.prePay * item.amount)
                        : (res += 0),
                    0
                  )
                )}{" "}
                vnđ
              </li>
            ) : (
              false
            )}
            {cartInfo.reduce(
              (res, item) =>
                item.services
                  ? (res += item.services * item.amount)
                  : (res += 0),
              0
            ) ? (
              <li>
                chi phí dịch vụ :{" "}
                {numberWithCommas(
                  cartInfo.reduce(
                    (res, item) =>
                      item.services ? (res += item.services) : (res += 0),
                    0
                  )
                )}{" "}
                vnđ
              </li>
            ) : (
              false
            )}
          </ul>
        </div>
      </div>
      <div>
        <span> thành tiền:</span>
        <h3 className={style.Totalmoney}>{numberWithCommas(totalMoney)} vnđ</h3>
      </div>
      <SubmitButton
        error={error}
        totalMoney={totalMoney}
        title={"xác nhận thanh toán"}
      ></SubmitButton>
    </div>
  );
}
export default memo(CartInfo);
