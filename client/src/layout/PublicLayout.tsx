import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { StateType } from "../types/stateType";

const PublicLayout: FC = () => {
  const { user } = useSelector((state: StateType) => state.auth);

  if (!user) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/"} />;
};

export default PublicLayout;
