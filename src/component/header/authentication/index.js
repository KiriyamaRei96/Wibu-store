import "firebaseui/dist/firebaseui.css";
import { useDispatch, useSelector } from "react-redux";
import GoogleButton from "react-google-button";
import { setUserData } from "../../../firebaseStore/firebaseConfig";
import { authSelector } from "../../../store/store";

import { Button } from "antd/lib/radio";
import { setLogin, test } from "../../../store/authSlice/authSlice";
import { getLocalStore } from "../../../store/CartSlice/cartSlice";
import { useNavigate } from "react-router";

function Authentication({ style }) {
  const dispatch = useDispatch();
  const googleLoginBtn = useSelector(authSelector).GoogleSignIn;
  const facebookLoginBtn = useSelector(authSelector).faceBookSignIn;

  const isLogin = useSelector(authSelector).userID;
  const googleLogoutBtn = useSelector(authSelector).GoogleLogout;
  const dispatchData = (value) => dispatch(setLogin(value));
  const cartDispach = (value) => dispatch(getLocalStore(value));
  const navigate = useNavigate();
  const toFrom = () => navigate("/user-info/info-from");
  const GoogleSignHandler = async () => {
    try {
      await googleLoginBtn();

      setUserData(dispatchData, cartDispach, toFrom);
    } catch (error) {
      console.log(error);
    }
  };

  const facebookSignHandler = async () => {
    try {
      await facebookLoginBtn();

      setUserData(dispatchData, cartDispach, toFrom);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogoutHandler = async () => {
    try {
      await googleLogoutBtn();

      dispatch(setLogin({ userID: undefined, userInfo: {} }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.auth}>
      {isLogin ? (
        <Button onClick={googleLogoutHandler}>đăng xuất</Button>
      ) : (
        <>
          <button
            onClick={GoogleSignHandler}
            className={` btn-lg  btn-block text-uppercase  ${style.googleBtn} ${style.loginBtn}`}
          >
            <i className="fab fa-google mr-2"></i> đăng nhập với Google
          </button>
          <button
            onClick={facebookSignHandler}
            className={` btn-lg  btn-block text-uppercase ${style.facebookBtn} ${style.loginBtn}`}
          >
            <i className="fab fa-facebook-f mr-2"></i> đăng nhập với Facebook
          </button>
        </>
      )}
    </div>
  );
}
export default Authentication;
