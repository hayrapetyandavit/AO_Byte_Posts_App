import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUserAction } from "../../redux/actions/authActions";

import img from "./error.gif";

import classes from "./style.module.scss";

interface IProps {
  message: string;
}

const ErrorMessage: React.FC<IProps> = (props) => {
  const { message } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message === "Please authenticate" || message === "Unauthenticated") {
      dispatch(logoutUserAction());
      navigate("/login");
    }
  }, [message]);
  return (
    <div className={classes.content}>
      <img className={classes.image} src={img} alt="Error" />
      <h2 className={classes.title}>{message}</h2>
    </div>
  );
};

export default ErrorMessage;
