import React, { useState } from "react";

type InitialStateType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
  title: string;
  content: string;
};

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export const useInputChange = <T extends Partial<InitialStateType>>(
  initialState: T
) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e: InputChangeEvent) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return { values, handleInputChange };
};
