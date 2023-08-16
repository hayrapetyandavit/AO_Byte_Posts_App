import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../types/stateType";
import { logoutUser } from "../../services/authService";
import { setTheme } from "../../redux/actions/themeAction";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

import logo from "../../assets/images/aobyte-logo.webp";

import classes from "./style.module.scss";

const Header: FC = () => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state: StateType) => state.theme.theme);

  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, []);

  const isLogout = () => {
    if (user) {
      logoutUser();
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }

    navigate("/login");
  };

  const handleSwitchClick = () => {
    const payloadTheme = theme === "dark" ? "light" : "dark";

    dispatch(setTheme(payloadTheme));
  };

  const userLogStyle = theme === "dark" ? { color: "#fff" } : undefined;

  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.headerLogo}>
          <img
            src={logo}
            alt=" logo"
            title="AOByte"
            onClick={() => navigate("/")}
          />
        </div>
        <div className={classes.userSide}>
          <ThemeSwitch onClick={handleSwitchClick} />
          <h2
            className={classes.userLog}
            title={user ? "Log Out" : "Log In"}
            style={userLogStyle}
            onClick={isLogout}
          >
            {user ? "Log Out" : "Log In"}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
