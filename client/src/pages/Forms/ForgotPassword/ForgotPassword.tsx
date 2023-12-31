import React, { FC, useState } from "react";

import { notify } from "../../../utils/notifyMessage";
import { useInputChange } from "../../../hooks/useInputCHange";
import { isValidateInput } from "../../../utils/isValidateInput";
import { forgotPassword } from "../../../services/authService";

import View from "./View";

import classes from "../style.module.scss";

const ForgotPassword: FC = () => {
  const [fieldValidity, setFieldValidity] = useState({
    isEmailValid: true,
  });

  const initialState = {
    email: "",
    errorMessage: "",
  };

  const { values, handleInputChange } = useInputChange(initialState);

  const isValidForm = (email: string) => {
    const isEmailValid = isValidateInput("email", email);

    if (!email) {
      return false;
    }

    setFieldValidity({ isEmailValid });

    return isEmailValid;
  };

  const onSubmit = async (email: string) => {
    const isValid = isValidForm(email);

    if (!isValid) {
      return;
    }

    await forgotPassword({ email })
      .then((res) => {
        notify(res.message);
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

export default ForgotPassword;
