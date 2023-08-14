import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createCommentService,
  getAllCommentsService,
  addRateToCommentService,
} from "../../services/commentsService";
import { CommentType } from "../../types/commentsType";

export const All_COMMENTS_REQUEST = "All_COMMENTS_REQUEST";
export const UPDATE_COMMENTS_BY_POST = "UPDATE_COMMENTS_BY_POST";
export const UPDATE_COMMENTS_BY_PARENT = "UPDATE_COMMENTS_BY_PARENT";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const ADD_RATE_TO_COMMENT = "ADD_RATE_TO_COMMENT";

type UpdatedDataType = {
  [key: string]: CommentType[];
};

export const fetchAllComments = createAsyncThunk(
  "allComments/fetchAll",
  async (_, { dispatch }) => {
    dispatch({ type: All_COMMENTS_REQUEST });

    const response = await getAllCommentsService();
    return response;
  }
);


//Now this logic do not used
export const updateCommentsByPost = createAsyncThunk(
  "commentsByPost/updateAll",
  async (data: UpdatedDataType, { dispatch }) => {
    dispatch({ type: UPDATE_COMMENTS_BY_POST });
    return data;
  }
);

export const updateCommentsByParent = createAsyncThunk(
  "commentsByParent/updateAll",
  async (data: UpdatedDataType, { dispatch }) => {
    dispatch({ type: UPDATE_COMMENTS_BY_PARENT });
    return data;
  }
);

export const fetchCreateComment = createAsyncThunk(
  "posts/fetchCreateComment",
  async (data: Omit<CommentType, "id" | "rate" | "parentId">, { dispatch }) => {
    dispatch({ type: CREATE_COMMENT });

    const response = await createCommentService(data);
    return response;
  }
);

export const fetchAddRateToComment = createAsyncThunk(
  "posts/fetchAddRateToComment",
  async (data: { rate: number; commentId: string }, { dispatch }) => {
    dispatch({ type: ADD_RATE_TO_COMMENT });

    const response = await addRateToCommentService(data.rate, data.commentId);
    return response;
  }
);
