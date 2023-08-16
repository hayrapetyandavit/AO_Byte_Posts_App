import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import MainRoutes from "./MainRoutes";

import { StateType } from "./types/stateType";

const App: FC = () => {
  const theme = useSelector((state: StateType) => state.theme.theme);

  const location = useLocation();
  
  const path = location.pathname;
  const excludedPaths = ["/login", "/register", "/forgot-password"];

  const className =
    theme === "dark" && !excludedPaths.includes(path)
      ? "wrapper-dark"
      : "wrapper";

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className={className}>
      <MainRoutes />
    </div>
  );
};

export default App;
