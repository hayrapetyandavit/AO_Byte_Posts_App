/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
export const SET_AUTHOR_FILTER = "SET_AUTHOR_FILTER";
export const SET_DATE_FILTER = "SET_DATE_FILTER";
export const SET_SORT = "SET_SORT";

export const setCategoryFilter: any = createAsyncThunk(
  "filters/setCategoryFilter",
  async (data: string, { dispatch }) => {
    dispatch({ type: SET_CATEGORY_FILTER });
    return data;
  }
);

export const setAuthorFilter: any = createAsyncThunk(
  "filters/setAuthorFilter",
  async (data: string, { dispatch }) => {
    dispatch({ type: SET_AUTHOR_FILTER });
    return data;
  }
);

export const setDateFilter: any = createAsyncThunk(
  "filters/setDateFilter",
  async (data: string, { dispatch }) => {
    dispatch({ type: SET_DATE_FILTER });
    let daysToAdd = 0;
    const currentDay = new Date();

    if (data === "all") {
      return {
        startDate: "",
        endDate: "",
      };
    }

    switch (data) {
    case "1 day":
      daysToAdd = 1;
      break;
    case "1 week":
      daysToAdd = 7;
      break;
    case "1 month":
      daysToAdd = 30;
      break;
    default:
      break;
    }

    currentDay.setDate(currentDay.getDate() - daysToAdd);

    return {
      startDate: currentDay.toISOString(),
      endDate: (new Date()).toISOString(),
    };
  }
);

export const setSort: any = createAsyncThunk(
  "filters/setSort",
  async (data: string, { dispatch }) => {
    dispatch({ type: SET_SORT });

    return data;
  }
);
