import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  setCategoryFilter,
  setAuthorFilter,
  setDateFilter,
  setSort,
} from "../actions/filtersAction";

interface IState {
  category: string;
  author: string;
  dateRange: { startDate: string; endDate: string };
  sortBy: string;
}

const initialState: IState = {
  category: "",
  author: "",
  dateRange: { startDate: "", endDate: "" },
  sortBy: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        setCategoryFilter.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.category = action.payload;
        }
      )
      .addCase(
        setAuthorFilter.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.author = action.payload;
        }
      )
      .addCase(
        setDateFilter.fulfilled,
        (
          state,
          action: PayloadAction<{ startDate: string; endDate: string }>
        ) => {
          state.dateRange = action.payload;
        }
      )
      .addCase(setSort.fulfilled, (state, action: PayloadAction<string>) => {
        state.sortBy = action.payload;
      });
  },
});

export default filtersSlice.reducer;
