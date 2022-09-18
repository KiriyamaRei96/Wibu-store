import { notification } from "antd";

const openNotification = (type, mes, des) => {
  notification[type]({
    message: mes,
    description: des,
    duration: 3,
  });
};
export default openNotification;
