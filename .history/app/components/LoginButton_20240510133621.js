import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import {
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import * as Msal from "msal";

const LoginButton = () => {
  const onLogin = () => {
    // Config object to be passed to Msal on creation
    const msalConfig = {
      auth: {
        clientId: "00001111-aaaa-2222-bbbb-3333cccc4444", // this is a fake id
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    };

    const myMSALObj = new Msal.UserAgentApplication(msalConfig);
    // Add scopes for the id token to be used at Microsoft identity platform endpoints.
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };

    myMSALObj.loginRedirect(loginRequest);
  };
  return (
    <div onClick={onLogin} type="button" className="btn-login-with-azure">
      <img src="/logo-window.png" className="ư-6 h-6 mr-2" />
      <p className="btn-txt">Đăng nhập với Azure</p>
    </div>
  );
};

export default LoginButton;
