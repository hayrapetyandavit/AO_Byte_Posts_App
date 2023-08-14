import React, { FC } from "react";
import { Link } from "react-router-dom";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ValidationMessage from "../../../components/ValidationMessage/ValidationMessage";

import logo from "../../../assets/images/aobyte-logo.webp";

import classes from "../style.module.scss";

interface IProps {
  values: {
    name: string;
    email: string;
    password: string;
    errorMessage: string;
    confirmPassword: string;
  };
  fieldValidity: {
    isNameValid: boolean;
    isEmailValid: boolean;
    isPasswordValid: boolean;
  };
  onSubmit: (...args: string[]) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const View: FC<IProps> = (props) => {
  const { values, onSubmit, fieldValidity, handleInputChange } = props;

  return (
    <div className={classes.formWrapperRegister}>
      <div className={classes.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <form className={classes.form}>
        <div className={classes.inputGrp}>
          <Input
            type="text"
            label="Username"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <ValidationMessage
          isValid={fieldValidity.isNameValid || !values.name}
          message="Name must contain only letters (A-Z or a-z) more 3 characters long"
        />
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
        <div className={classes.inputGrp}>
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <ValidationMessage
          isValid={fieldValidity.isPasswordValid || !values.confirmPassword}
          message="Passwords do not mutch"
        />
        <Button
          value="register"
          onClick={() =>
            onSubmit(
              values.name,
              values.email,
              values.password,
              values.confirmPassword
            )
          }
          title="Register"
        ></Button>
      </form>
      <div className={classes.link}>
        <Link to="/login">
          <span>Already have an account?</span>
        </Link>
      </div>
    </div>
  );
};

export default View;
