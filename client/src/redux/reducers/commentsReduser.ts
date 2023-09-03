/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllComments,
  updateCommentsByPost,
  updateCommentsByParent,
  fetchCreateComment,
  fetchAddRateToComment,
  fetchUpdateComment,
  fetchDeleteComment,
} from "../actions/commentsActions";
import { CommentType } from "../../types/commentsType";

interface IState {
  loading: boolean;
  allComments: CommentType[];
  commentsByPost: { [key: string]: CommentType[] };
  commentsByParent: { [key: string]: CommentType[] };
  message: string;
  error: string;
}

const initialState: IState = {
  loading: false,
  allComments: [],
  commentsByPost: {},
  commentsByParent: {},
  message: "",
  error: "",
};

const commentsSlice = createSlice({
  name: "comments",
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
      )

      .addCase(fetchUpdateComment.pending, () => {})
      .addCase(fetchUpdateComment.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(fetchUpdateComment.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchDeleteComment.pending, () => {})
      .addCase(fetchDeleteComment.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(fetchDeleteComment.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default commentsSlice.reducer;
