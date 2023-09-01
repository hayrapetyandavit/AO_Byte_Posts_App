import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../../types/stateType";
import { AppThunkDispatch } from "../../../redux/store";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";
import { registerUserAction } from "../../../redux/actions/authActions";

import View from "./View";

import classes from "../style.module.scss";


const Register: FC = () => {
  const { message, error } = useSelector((state: StateType) => state.auth);

  const [fieldValidity, setFieldValidity] = useState({
    isNameValid: true,
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

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

    await dispatch(
      registerUserAction({ name, email, password, confirmPassword })
    );

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

export default Register;
