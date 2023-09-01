import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../../types/stateType";
import { AppThunkDispatch } from "../../../redux/store";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";
import { loginUserAction } from "../../../redux/actions/authActions";

import View from "./View";

import classes from "../style.module.scss";

const Login: FC = () => {
  const { message, error } = useSelector((state: StateType) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  const [fieldValidity, setFieldValidity] = useState({
    isEmailValid: true,
    isPasswordValid: true,
  });

  const [isChecked, setChecked] = useState(false);

  const initialState = {
    email: "",
    password: "",
    errorMessage: "",
  };

  const { values, handleInputChange } = useInputChange(initialState);

  const handleCheckInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };

  const isValidForm = (email: string, password: string) => {
    const isEmailValid = isValidateInput("email", email);
    const isPasswordValid = isValidateInput("password", password);

    if (!email || !password) {
      return false;
    }

    setFieldValidity({
      isEmailValid,
      isPasswordValid,
    });

    return isEmailValid && isPasswordValid;
  };

  const onSubmit = async (email: string, password: string) => {
    const isValid = isValidForm(email, password);

    if (!isValid) {
      return;
    }

    await dispatch(loginUserAction({ email, password, isChecked }));

    if (!error && !message) {
      navigate("/home");
    }
  };

  const containerProps = {
    values,
    onSubmit,
    isChecked,
    fieldValidity,
    handleInputChange,
    handleCheckInputClick,
  };

  return (
    <div className={classes.content}>
      <View {...containerProps} />
    </div>
  );
};

export default Login;
