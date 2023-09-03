import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createCommentService,
  getAllCommentsService,
  addRateToCommentService,
  updateCommentService,
  deleteCommentService,
} from "../../services/commentsService";
import { CommentType } from "../../types/commentsType";
import { StateType } from "../../types/stateType";

export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const ADD_RATE_TO_COMMENT = "ADD_RATE_TO_COMMENT";
export const All_COMMENTS_REQUEST = "All_COMMENTS_REQUEST";
export const UPDATE_COMMENTS_BY_POST = "UPDATE_COMMENTS_BY_POST";
export const UPDATE_COMMENTS_BY_PARENT = "UPDATE_COMMENTS_BY_PARENT";

type UpdatedDataType = {
  [key: string]: CommentType[];
};

export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async (_, { dispatch }) => {
    dispatch({ type: All_COMMENTS_REQUEST });

    const response = await getAllCommentsService();
    return response;
  }
);

export const updateCommentsByPost = createAsyncThunk(
  "comments/updateCommentsByPost",
  async (data: UpdatedDataType, { dispatch }) => {
    dispatch({ type: UPDATE_COMMENTS_BY_POST });
    return data;
  }
);

export const updateCommentsByParent = createAsyncThunk(
  "comments/updateCommentsByParent",
  async (data: UpdatedDataType, { dispatch }) => {
    dispatch({ type: UPDATE_COMMENTS_BY_PARENT });
    return data;
  }
);

export const fetchCreateComment = createAsyncThunk(
  "comments/fetchCreateComment",
  async (
    data: Omit<CommentType, "id" | "rate" | "parentId">,
    { dispatch, getState }
  ) => {
    dispatch({ type: CREATE_COMMENT });
    const { auth } = getState() as StateType;

    const response = await createCommentService(data, auth.accessToken);
    return response;
  }
);

export const fetchAddRateToComment = createAsyncThunk(
  "comments/fetchAddRateToComment",
  async (data: { rate: number; commentId: string }, { dispatch, getState }) => {
    dispatch({ type: ADD_RATE_TO_COMMENT });
    const { auth } = getState() as StateType;

    const response = await addRateToCommentService(
      data.rate,
      data.commentId,
      auth.accessToken,
      auth.userId
    );

    return response;
  }
);

export const fetchUpdateComment = createAsyncThunk(
  "comments/fetchUpdateComment",
  async (data: { content: string; id: string }, { dispatch, getState }) => {
    dispatch({ type: UPDATE_COMMENT });
    const { auth } = getState() as StateType;

    const response = await updateCommentService(
      data.content,
      auth.userId,
      data.id,
      auth.accessToken
    );
    return response;
  }
);

export const fetchDeleteComment = createAsyncThunk(
  "comments/fetchDeleteComment",
  async (data: { id: string }, { dispatch, getState }) => {
    dispatch({ type: DELETE_COMMENT });
    const { auth } = getState() as StateType;
    const response = await deleteCommentService(
      auth.userId,
      data.id,
      auth.accessToken
    );
    return response;
  }
);
