import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import MainRoutes from "./MainRoutes";

import { StateType } from "./types/stateType";

const App: FC = () => {
  const theme = useSelector((state: StateType) => state.theme.theme);

  const className = theme === "dark" ? "wrapper-dark" : "wrapper";

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
