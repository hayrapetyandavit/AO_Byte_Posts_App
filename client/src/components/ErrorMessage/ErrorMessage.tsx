import React from "react";

import img from "./error.gif";

import classes from "./style.module.scss";

interface IProps {
  message: string;
}

const ErrorMessage: React.FC<IProps> = (props) => {
  return (
    <div className={classes.content}>
      <img className={classes.image} src={img} alt="Error" />
      <h2 className={classes.title}>{props.message}</h2>
    </div>
  );
};

export default ErrorMessage;
