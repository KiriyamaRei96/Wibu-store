import { Button, Drawer, Popover, Space } from "antd";
import moment from "moment";
import "moment/locale/vi";
import { useState } from "react";
import style from "../../../style.module.css";
import { v4 as uuid } from "uuid";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function HistoryItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  moment.locale("vi", {});
  return (
    <>
      <div onClick={showDrawer} className={style.HistoryItem}>
        <div className={style.HistoryItemHeader}>
          <span>đơn hàng số: {index + 1}</span>
          <div>
            <span>thời gian đặt hàng:</span>{" "}
            <span>{moment(item.time).format("LLLL")}</span>
          </div>
        </div>
        <div className={style.HistoryItemBody}>
          <div className={style.HistoryItemNumberGroup}>
            <span>số loại sản phẩm : {item.totalItem}</span>
            <span>sản phẩm mua: {item.totalBuyItems}</span>
            <span>sản phẩm thuê: {item.totalRentItems}</span>
          </div>
          <div className={style.HistoryItemDetailGroup}>
            <h6>tổng số tiền: {item.totalMoney}vnđ</h6>
            <span>nhấn để xem chi tiết</span>
          </div>
        </div>
      </div>
      <Drawer
        width={window.innerWidth < 1024 ? "80%" : "736"}
        title={<span>Chi tiết đơn hàng số: {index + 1}</span>}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={open}
        extra={
          <Space>
            <Button onClick={onClose}>Đóng</Button>
          </Space>
        }
      >
        <>
          {item.detail.map((item) => (
            <div className={style.itemDetailGroup} key={uuid()}>
              <div className={style.itemDetailImgWrapper}>
                <img src={item.img} alt={item.img}></img>
              </div>
              <div className={style.itemDetailContent}>
                <span> tên sản phẩm :{item.name}.</span>
                <span> phim :{item.movie}.</span>
                {item.price ? (
                  <span>số lượng:{item.amount}.</span>
                ) : (
                  <span>thời gian thuê:{item.amount}/ngày.</span>
                )}
                {item.price ? (
                  <span>thành tiền:{numberWithCommas(item.price)}vnđ.</span>
                ) : (
                  <span>thành tiền:{numberWithCommas(item.rent)}vnđ.</span>
                )}
                {item.size ? (
                  <span>kích cỡ:{item.size}.</span>
                ) : (
                  <span>kích cỡ: theo nhà sản xuất.</span>
                )}
                {item.figureOpition ? (
                  <span>nhóm sản phẩm:{item.figureOpition}.</span>
                ) : (
                  false
                )}
                {item.costumeOpition ? (
                  <span>nhóm sản phẩm:{item.costumeOpition}.</span>
                ) : (
                  false
                )}
                {item.souvenirOption ? (
                  <span>mẫu sản phẩm số:{item.souvenirOption}.</span>
                ) : (
                  false
                )}
              </div>
            </div>
          ))}
        </>
      </Drawer>
    </>
  );
}
export default HistoryItem;
