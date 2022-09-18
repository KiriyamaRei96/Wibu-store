import { useEffect } from "react";
import style from "./style.module.css";
function FanPage() {
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
        style={{ width: "100%" }}
        class="fb-page"
        data-href="https://www.facebook.com/Wibu-Store-100118502839437"
        data-tabs="trang"
        data-width="300px"
        data-height="200px"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        page_id="100118502839437"
      >
        <blockquote
          cite="https://www.facebook.com/Wibu-Store-100118502839437"
          class="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/Wibu-Store-100118502839437">
            Wibu Store
          </a>
        </blockquote>
      </div>
    </>
  );
}
export default FanPage;
