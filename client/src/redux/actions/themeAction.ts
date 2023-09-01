/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SET_THEME = "SET_THEME";

export const setTheme: any = createAsyncThunk(
  "setTheme/setMode",
  async (data: "light" | "dark", { dispatch }) => {
    dispatch({ type: SET_THEME });
    return data;
  }
);
