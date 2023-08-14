import React, { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { isAuthService } from "../services/authService";

import Header from "../components/Header/Header";

const AuthLayout: FC = () => {
  useEffect(() => {
    isAuthService().then((res) => {
      if (!res.valid) {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");

        window.location.reload();
      }
    });
  }, []);

  if (localStorage.getItem("user")) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/login"} />;
};

export default AuthLayout;
