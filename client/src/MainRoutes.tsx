import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Forms/Login/Login";
import PublicLayout from "./layout/PublicLayout";
import Register from "./pages/Forms/Register/Register";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import ResetPassword from "./pages/Forms/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/Forms/ForgotPassword/ForgotPassword";

const MainRoutes: FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/forgot-password/"
            element={<ForgotPassword />}
          ></Route>
          <Route
            path="/reset-password/"
            element={<ResetPassword />}
          ></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/home" element={<Home />}></Route>
        </Route>
        <Route path="/" element={<MainLayout />}></Route>
        <Route path="*" element={<NotFoundPage message="Page Not Found" />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
