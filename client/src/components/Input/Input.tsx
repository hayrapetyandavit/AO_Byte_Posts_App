import React, { FC, useEffect, useState } from "react";

import show from "../../assets/images/show-pass.svg";
import hide from "../../assets/images/hide-pass.svg";

import classes from "./style.module.scss";

interface IProps extends React.HTMLProps<HTMLInputElement> {}

const Input: FC<IProps> = (props) => {
  const { type, ...rest } = props;

  const [isShowPass, setShowPass] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (type === "password" && isShowPass) {
      setInputType("text");
    }

    if (type === "password" && !isShowPass) {
      setInputType("password");
    }
  }, [isShowPass]);

  const handleImageClick = () => {
    setShowPass((prevState) => !prevState);
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (type === "password") {
      e.preventDefault();
    }
  };

  return (
    <div className={classes.inputGroup}>
      <input
        {...rest}
        type={inputType}
        className={classes.input}
        autoComplete="off"
        placeholder=""
        required={true}
        onCopy={handleCopy}
      />
      {type === "password" ? (
        <img
          src={isShowPass ? show : hide}
          className={classes.showPassword}
          onClick={handleImageClick}
        ></img>
      ) : null}
      <label htmlFor={rest.name} className={classes.label}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
