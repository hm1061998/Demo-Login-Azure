"use client";
import * as Msal from "msal";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const onLogin = async () => {
      const getToken = sessionStorage.getItem("keyLogin");
      if (!getToken) {
        window.location.href = "/";
      }
    };
    onLogin();
  }, []);

  const onLogout = () => {
    const msalConfig = {
      auth: {
        clientId: "aabfa23b-fc48-4e80-8f64-1e73f88bc420", // this is a fake id
        postLogoutRedirectUri: "http://localhost:3000/",
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

    sessionStorage.removeItem("keyLogin");
    myMSALObj.logout();
    window.location.href = "/";
  };
  return (
    <div className="w-screen h-screen bg-white flex justify-center">
      <div className="w-40">
        <h3 className="text-center">Home</h3>
        <div type="button" className="btn-login" onClick={onLogout}>
          <p className="btn-login_txt">Đăng xuất</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
