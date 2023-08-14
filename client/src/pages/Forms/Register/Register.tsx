import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notify } from "../../../utils/notifyMessage";
import { registerUser } from "../../../services/authService";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";

import View from "./View";

import classes from "../style.module.scss";

const Register: FC = () => {
  const [fieldValidity, setFieldValidity] = useState({
    isNameValid: true,
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
  });

  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  };

  const { values, handleInputChange } = useInputChange(initialState);

  const isValidForm = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const isNameValid = isValidateInput("name", name);
    const isEmailValid = isValidateInput("email", email);
    const isPasswordValid = isValidateInput("password", password);
    const isConfirmPasswordValid = password === confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      return false;
    }

    setFieldValidity({
      isConfirmPasswordValid,
      isNameValid,
      isEmailValid,
      isPasswordValid,
    });

    return (
      isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid
    );
  };

  const onSubmit = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const isValid = isValidForm(name, email, password, confirmPassword);

    if (!isValid) {
      return;
    }

    await registerUser({
      name,
      email,
      password,
      confirmPassword,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  const containerProps = {
    values,
    onSubmit,
    fieldValidity,
    handleInputChange,
  };

  return (
    <div className={classes.content}>
      <View {...containerProps} />
    </div>
  );
};

export default Register;
