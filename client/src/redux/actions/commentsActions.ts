/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createCommentService,
  getAllCommentsService,
  addRateToCommentService,
} from "../../services/commentsService";
import { CommentType } from "../../types/commentsType";
import { StateType } from "../../types/stateType";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const ADD_RATE_TO_COMMENT = "ADD_RATE_TO_COMMENT"; 
export const All_COMMENTS_REQUEST = "All_COMMENTS_REQUEST";
export const UPDATE_COMMENTS_BY_POST = "UPDATE_COMMENTS_BY_POST";
export const UPDATE_COMMENTS_BY_PARENT = "UPDATE_COMMENTS_BY_PARENT";

type UpdatedDataType = {
  [key: string]: CommentType[];
};

export const fetchAllComments: any = createAsyncThunk(
  "comments/fetchAllComments",
  async (_, { dispatch }) => {
    dispatch({ type: All_COMMENTS_REQUEST });

    const response = await getAllCommentsService();
    return response;
  }
);

export const updateCommentsByPost: any = createAsyncThunk(
  "comments/updateCommentsByPost",
  async (data: UpdatedDataType, { dispatch }) => {
    dispatch({ type: UPDATE_COMMENTS_BY_POST });
    return data;
  }
);

export const updateCommentsByParent: any = createAsyncThunk(
  "comments/updateCommentsByParent",
  async (data: UpdatedDataType, { dispatch }) => {
    dispatch({ type: UPDATE_COMMENTS_BY_PARENT });
    return data;
  }
);

export const fetchCreateComment: any = createAsyncThunk(
  "comments/fetchCreateComment",
  async (data: Omit<CommentType, "id" | "rate" | "parentId">, { dispatch, getState }) => {
    dispatch({ type: CREATE_COMMENT });
    const { auth } = getState() as StateType;

    const response = await createCommentService(data, auth.accessToken);
    return response;
  }
);

export const fetchAddRateToComment: any = createAsyncThunk(
  "comments/fetchAddRateToComment",
  async (data: { rate: number; commentId: string }, { dispatch, getState }) => {
    dispatch({ type: ADD_RATE_TO_COMMENT });
    const { auth } = getState() as StateType;

    const response = await addRateToCommentService(data.rate, data.commentId, auth.accessToken);
    return response;
  }
);
