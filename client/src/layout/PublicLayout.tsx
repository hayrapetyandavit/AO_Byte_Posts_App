import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PublicLayout: FC = () => {
  if (!localStorage.getItem("user")) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/"} />;
};

export default PublicLayout;
