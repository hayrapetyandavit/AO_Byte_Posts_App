import React, { FC } from "react";
import { Link } from "react-router-dom";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ValidationMessage from "../../../components/ValidationMessage/ValidationMessage";

import logo from "../../../assets/images/aobyte-logo.webp";

import classes from "../style.module.scss";

interface IProps {
  values: {
    email: string;
    errorMessage: string;
  };
  fieldValidity: {
    isEmailValid: boolean;
  };
  onSubmit: (...args: string[]) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const View: FC<IProps> = (props) => {
  const { values, onSubmit, fieldValidity, handleInputChange } = props;

  return (
    <div className={classes.formWrapper}>
      <div className={classes.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <form className={classes.form}>
        <div className={classes.inputGrp}>
          <Input
            type="text" //with type email there is a UI bag
            label="Email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
        <ValidationMessage
          isValid={fieldValidity.isEmailValid || !values.email}
          message="The email must match the format mail123@gmail.com!"
        />
        <Button
          value="Reset password"
          onClick={() => onSubmit(values.email)}
          title="Reset password"
        ></Button>
        <span className={classes.errorMsg} style={{ visibility: "visible" }}>
          {values.errorMessage}
        </span>
      </form>
      <div className={classes.link}>
        Not Registered Yet?
        <Link to="/register">
          <span>Create an account</span>
        </Link>
      </div>
    </div>
  );
};

export default View;
