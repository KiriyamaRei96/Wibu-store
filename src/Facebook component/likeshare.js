import { useEffect } from "react";
import style from "./style.module.css";
function LikeAndShare() {
  const appid = process.env.REACT_APP_FACEBOOK_APP_ID;

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: appid,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v14.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <>
      <div
        className={`fb-like ${style.likeShare}`}
        data-href={
          !window.location.href.includes("http://localhost:3000/")
            ? window.location.href
            : window.location.href.replace(
                "http://localhost:3000",
                "https://fabulous-hummingbird-8c6571.netlify.app"
              )
        }
        data-width=""
        data-layout="button_count"
        data-action="like"
        data-size="small"
        data-share="true"
      ></div>
    </>
  );
}
export default LikeAndShare;
