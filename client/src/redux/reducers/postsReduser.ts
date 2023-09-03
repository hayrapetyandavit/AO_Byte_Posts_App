import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postType";
import {
  fetchPostsWithPagination,
  fetchPostsByUserId,
  fetchPostsAuthors,
  fetchCreatePost,
  fetchDeletePost,
  fetchUpdatePost,
  updateCurrentPage,
  fetchUpdatePublishPost,
} from "../actions/postsActions";

interface IState {
  loading: boolean;
  postsWithPagination: PostType[];
  postsByUserId: PostType[];
  authors: string[];
  totalPages: number;
  currentPage: number;
  message: string;
  error: string;
}

const pageFromStorage = localStorage.getItem("page") || 1;

const initialState: IState = {
  loading: false,
  postsWithPagination: [],
  postsByUserId: [],
  authors: [],
  totalPages: 0,
  currentPage: +pageFromStorage,
  message: "",
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsWithPagination.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPostsWithPagination.fulfilled,
        (
          state,
          action: PayloadAction<{ data: PostType[]; totalPages: number }>
        ) => {
          state.loading = false;
          state.postsWithPagination = action.payload.data;
          state.totalPages = action.payload.totalPages;
          state.error = "";
        }
      )
      .addCase(fetchPostsWithPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPostsByUserId.fulfilled,
        (
          state,
          action: PayloadAction<{ data: PostType[]; totalPages: number }>
        ) => {
          state.loading = false;
          state.postsByUserId = action.payload.data;
          state.totalPages = action.payload.totalPages;
          state.error = "";
        }
      )
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchPostsAuthors.pending, () => {})
      .addCase(
        fetchPostsAuthors.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.authors = action.payload;
        }
      )
      .addCase(fetchPostsAuthors.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchCreatePost.pending, () => {})
      .addCase(fetchCreatePost.fulfilled, () => {})
      .addCase(fetchCreatePost.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchUpdatePost.pending, () => {})
      .addCase(fetchUpdatePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(fetchUpdatePost.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchUpdatePublishPost.pending, () => {})
      .addCase(fetchUpdatePublishPost.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(fetchUpdatePublishPost.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(fetchDeletePost.pending, () => {})
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
      })

      .addCase(
        updateCurrentPage.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.currentPage = action.payload;
        }
      );
  },
});

export default postsSlice.reducer;
