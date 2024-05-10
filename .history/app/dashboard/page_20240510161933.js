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
    };

    const myMSALObj = new Msal.UserAgentApplication(msalConfig);

    sessionStorage.removeItem("keyLogin");
    window.location.href = "/";
    myMSALObj.logout();
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
