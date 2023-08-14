import React, { FC } from "react";

import classes from "./style.module.scss";

interface IProps {
  isValid: boolean;
  message: string;
}

const ValidationMessage: FC<IProps> = (props) => {
  const { isValid, message } = props;

  return (
    <span
      className={classes.errorMsg}
      style={isValid ? { visibility: "hidden" } : { visibility: "visible" }}
    >
      {message}
    </span>
  );
};

export default ValidationMessage;
