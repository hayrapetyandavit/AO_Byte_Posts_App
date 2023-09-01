import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  loginUserAction,
  registerUserAction,
  logoutUserAction,
  forgotPasswordAction,
  resetPasswordAction,
  isAuthAction,
} from "../actions/authActions";

interface IState {
  user: string;
  userId: string;
  code: number | null;
  message: string;
  error: string;
  accessToken: string;
}

const initialState: IState = {
  user: "",
  userId: "",
  code: null,
  message: "",
  error: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, () => {})
      .addCase(
        loginUserAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            name: string;
            id: string;
            code: number;
            message: string;
            accessToken: string;
          }>
        ) => {
          state.user = action.payload.name;
          state.userId = action.payload.id;
          state.message = action.payload.message;
          state.code = action.payload.code;
          state.accessToken = action.payload.accessToken;
          state.error = "";
        }
      )
      .addCase(loginUserAction.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(registerUserAction.pending, () => {})
      .addCase(
        registerUserAction.fulfilled,
        (state, action: PayloadAction<{ code: number; message: string }>) => {
          state.message = action.payload.message;
          state.code = action.payload.code;
          state.error = "";
        }
      )
      .addCase(registerUserAction.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(forgotPasswordAction.pending, () => {})
      .addCase(
        forgotPasswordAction.fulfilled,
        (state, action: PayloadAction<{ code: number; message: string }>) => {
          state.message = action.payload.message;
          state.code = action.payload.code;
          state.error = "";
        }
      )
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(resetPasswordAction.pending, () => {})
      .addCase(
        resetPasswordAction.fulfilled,
        (state, action: PayloadAction<{ code: number; message: string }>) => {
          state.message = action.payload.message;
          state.code = action.payload.code;
          state.error = "";
        }
      )
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(isAuthAction.pending, () => {})
      .addCase(
        isAuthAction.fulfilled,
        (state, action: PayloadAction<{ valid: boolean }>) => {
          if (!action.payload.valid) {
            state.user = "";
            state.userId = "";
            state.accessToken = "";
          }
        }
      )
      .addCase(isAuthAction.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(logoutUserAction.pending, () => {})
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.user = "";
        state.userId = "";
        state.accessToken = "";
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default authSlice.reducer;
