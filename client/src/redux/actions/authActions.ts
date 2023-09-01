import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUserService,
  loginUserService,
  logoutUserService,
  AuthType,
  forgotPasswordService,
  resetPasswordService,
  isAuthService,
} from "../../services/authService";
import { notify } from "../../utils/notifyMessage";
import { StateType } from "../../types/stateType";

export const IS_AUTH_REQUEST = "IS_AUTH_REQUEST";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";

export const loginUserAction = createAsyncThunk(
  "auth/loginUserAction",
  async (data: AuthType, { dispatch }) => {
    dispatch({ type: LOGIN_USER_REQUEST });

    const response = await loginUserService(data);

    if (response.message) {
      notify(response.message);
    }

    return response;
  }
);


export const registerUserAction = createAsyncThunk(
  "auth/registerUserAction",
  async (data: AuthType, { dispatch }) => {
    dispatch({ type: REGISTER_USER_REQUEST });

    const response = await registerUserService(data);

    if (response.message) {
      notify(response.message);
    }

    return response;
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "auth/forgotPasswordAction",
  async (email: string, { dispatch }) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    const response = await forgotPasswordService(email);

    if (response.message) {
      notify(response.message);
    }

    return response;
  }
);

export const resetPasswordAction = createAsyncThunk(
  "auth/resetPasswordAction",
  async (data: AuthType, { dispatch }) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const response = await resetPasswordService(data);

    if (response.message) {
      notify(response.message);
    }

    return response;
  }
);

export const isAuthAction = createAsyncThunk(
  "auth/isAuthAction",
  async (_, { dispatch, getState }) => {
    dispatch({ type: IS_AUTH_REQUEST });
    const { auth } = getState() as StateType;

    const response = await isAuthService(auth.accessToken);
    if (!response.valid) {
      window.location.reload();
    }
    return response;
  }
);

export const logoutUserAction = createAsyncThunk(
  "auth/logoutUserAction",
  async (_, { dispatch, getState }) => {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const { auth } = getState() as StateType;

    const response = await logoutUserService(auth.accessToken);

    return response;
  }
);
