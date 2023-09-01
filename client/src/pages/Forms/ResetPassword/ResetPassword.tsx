import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../../types/stateType";
import { AppThunkDispatch } from "../../../redux/store";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";
import { resetPasswordAction } from "../../../redux/actions/authActions";

import View from "./View";

import classes from "../style.module.scss";

const ResetPassword: FC = () => {
  const { message, error } = useSelector((state: StateType) => state.auth);

  const [fieldValidity, setFieldValidity] = useState({
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

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

    await dispatch(resetPasswordAction({ email, password, confirmPassword }));

    if (!error && !message) {
      navigate("/login");
    }
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
