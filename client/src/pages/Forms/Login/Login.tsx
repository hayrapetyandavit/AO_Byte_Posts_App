import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notify } from "../../../utils/notifyMessage";
import { loginUser } from "../../../services/authService";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";

import View from "./View";

import classes from "../style.module.scss";

const Login: FC = () => {
  const navigate = useNavigate();

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

    await loginUser({
      email,
      password,
      isChecked,
    })
      .then((data) => {
        if (data.name) {
          localStorage.setItem("user", data.name);
          localStorage.setItem("userId", data.id);
        }
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        notify(error.message);
      });
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