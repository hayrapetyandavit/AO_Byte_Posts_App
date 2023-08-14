import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { setTheme } from "../actions/themeAction";

interface IState {
  theme: "light" | "dark";
}

const initialState: IState = {
  theme: "light",
};

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setTheme.fulfilled,
      (state, action: PayloadAction<"light" | "dark">) => {
        state.theme = action.payload;
      }
    );
  },
});

export default theme.reducer;
