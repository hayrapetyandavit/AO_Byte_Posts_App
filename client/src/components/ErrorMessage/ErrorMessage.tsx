import React, { useEffect } from "react";

import img from "./error.gif";

import classes from "./style.module.scss";

interface IProps {
  message: string;
}

const ErrorMessage: React.FC<IProps> = (props) => {
  const { message } = props;

  useEffect(() => {
    if (message === "Please authenticate") {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
  }, []);
  return (
    <div className={classes.content}>
      <img className={classes.image} src={img} alt="Error" />
      <h2 className={classes.title}>{message}</h2>
    </div>
  );
};

export default ErrorMessage;
