import * as Msal from "msal";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();

  const onLogin = async () => {
    // Config object to be passed to Msal on creation
    const msalConfig = {
      auth: {
        clientId: "aabfa23b-fc48-4e80-8f64-1e73f88bc420", // this is a fake id
        authority: "https://login.microsoftonline.com/common",
        redirectUri:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://demo-login-azure.vercel.app/",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case Msal.LogLevel.Error:
                console.error(message);
                return;
              case Msal.LogLevel.Info:
                console.info(message);
                return;
              case Msal.LogLevel.Verbose:
                console.debug(message);
                return;
              case Msal.LogLevel.Warning:
                console.warn(message);
                return;
            }
          },
        },
      },
    };

    const myMSALObj = new Msal.UserAgentApplication(msalConfig);
    // Add scopes for the id token to be used at Microsoft identity platform endpoints.
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };
    try {
      const res = await myMSALObj.loginPopup(loginRequest);
      console.log("response login", res);
      sessionStorage.setItem("keyLogin", res?.idToken?.rawIdToken);
      router.push("/workflow", { scroll: false });
    } catch (err) {
      sessionStorage.removeItem("keyLogin");
      console.log("err login", err);
    }
  };

  return (
    <div onClick={onLogin} type="button" className="btn-login-with-azure">
      <img src="/logo-window.png" className="ư-6 h-6 mr-2" />
      <p className="btn-txt">Đăng nhập với Azure</p>
    </div>
  );
};

export default LoginButton;
