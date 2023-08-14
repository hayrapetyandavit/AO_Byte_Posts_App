/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllComments,
  updateCommentsByPost,
  updateCommentsByParent,
  fetchCreateComment,
  fetchAddRateToComment,
} from "../actions/commentsActions";
import { CommentType } from "../../types/commentsType";

interface IState {
  loading: boolean;
  allComments: CommentType[];
  commentsByPost: { [key: string]: CommentType[] };
  commentsByParent: { [key: string]: CommentType[] };
  error: string;
}

const initialState: IState = {
  loading: false,
  allComments: [],
  commentsByPost: {},
  commentsByParent: {},
  error: "",
};

const commentsSlice = createSlice({
  name: "allComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllComments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.allComments = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })

      .addCase(fetchCreateComment.pending, () => {})
      .addCase(fetchCreateComment.fulfilled, () => {})
      .addCase(fetchCreateComment.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(fetchAddRateToComment.pending, () => {})
      .addCase(fetchAddRateToComment.fulfilled, () => {})
      .addCase(fetchAddRateToComment.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(
        updateCommentsByPost.fulfilled,
        (state, action: PayloadAction<{ [key: string]: CommentType[] }>) => {
          state.commentsByPost = action.payload;
        }
      )
      .addCase(
        updateCommentsByParent.fulfilled,
        (state, action: PayloadAction<{ [key: string]: CommentType[] }>) => {
          state.commentsByParent = action.payload;
        }
      );
  },
});

export default commentsSlice.reducer;
