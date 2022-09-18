import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import style from "./style.module.css";
function FacebookComment() {
  const appid = process.env.FACEBOOK_APP_ID;
  const [url, setUrl] = useState(
    "https://fabulous-hummingbird-8c6571.netlify.app"
  );
  const location = useLocation();
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
  useEffect(() => {
    !window.location.href.includes("http://localhost:3000/")
      ? setUrl(window.location.href)
      : setUrl(
          `https://fabulous-hummingbird-8c6571.netlify.app${location.pathname}`
        );
  }, [location.pathname]);

  return (
    <>
      <div
        className={`fb-comments ${style.commentBackground}`}
        data-href={
          !window.location.href.includes("http://localhost:3000/")
            ? window.location.href
            : `https://fabulous-hummingbird-8c6571.netlify.app${location.pathname}`
        }
        data-width="100%"
        data-numposts="5"
      ></div>
    </>
  );
}
export default FacebookComment;
