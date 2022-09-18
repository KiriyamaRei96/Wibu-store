import { memo } from "react";
import { useEffect } from "react";

function Messager() {
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
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <>
      <div
        messenger_app_id={appid}
        id="fb-customer-chat"
        class="fb-customerchat"
        page_id="100118502839437"
        attribution="biz_inbox"
      ></div>
    </>
  );
}
export default memo(Messager);
