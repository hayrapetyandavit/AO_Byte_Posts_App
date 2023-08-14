import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notify } from "../../../utils/notifyMessage";
import { resetPassword } from "../../../services/authService";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";

import View from "./View";

import classes from "../style.module.scss";

const ResetPassword: FC = () => {
  const [fieldValidity, setFieldValidity] = useState({
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
  });
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  };

  const { values, handleInputChange } = useInputChange(initialState);

  const isValidForm = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const isEmailValid = isValidateInput("email", email);
    const isPasswordValid = isValidateInput("password", password);
    const isConfirmPasswordValid = password === confirmPassword;

    if (!password || !confirmPassword) {
      return false;
    }

    setFieldValidity({
      isEmailValid,
      isConfirmPasswordValid,
      isPasswordValid,
    });

    return email && isPasswordValid && isConfirmPasswordValid;
  };

  const onSubmit = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const isValid = isValidForm(email, password, confirmPassword);

    if (!isValid) {
      return;
    }

    await resetPassword({ email, password, confirmPassword })
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

export default ResetPassword;
