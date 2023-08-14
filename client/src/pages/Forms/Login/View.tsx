import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ValidationMessage from "../../../components/ValidationMessage/ValidationMessage";

import logo from "../../../assets/images/aobyte-logo.webp";

import classes from "../style.module.scss";

interface IProps {
  values: {
    email: string;
    password: string;
    errorMessage: string;
  };
  fieldValidity: {
    isEmailValid: boolean;
    isPasswordValid: boolean;
  };
  isChecked: boolean;
  onSubmit: (...args: string[]) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckInputClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const View: FC<IProps> = (props) => {
  const {
    values,
    isChecked,
    onSubmit,
    fieldValidity,
    handleInputChange,
    handleCheckInputClick,
  } = props;

  const navigate = useNavigate();

  return (
    <div className={classes.formWrapper}>
      <div className={classes.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <form className={classes.form}>
        <div className={classes.inputGrp}>
          <Input
            type="text"
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
        <div className={classes.inputGrp}>
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <ValidationMessage
          isValid={fieldValidity.isPasswordValid || !values.password}
          message="Password must be at least 8 characters, including 1 uppercase
            letter, 1 lowercase letter, and 1 digit!"
        />
        <div className={classes.checkInputGrp}>
          <div className={classes.rememberCheck}>
            <input
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              onChange={handleCheckInputClick}
            />
            <span>Remember Me</span>
          </div>
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>
        <Button
          value="log in"
          onClick={() => onSubmit(values.email, values.password)}
          title="Log in"
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
