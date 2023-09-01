import React, { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../types/stateType";

import Header from "../components/Header/Header";

import { isAuthAction } from "../redux/actions/authActions";

const AuthLayout: FC = () => {
  const { user } = useSelector((state: StateType) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(isAuthAction() as any);
  }, []);

  if (user) {
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
