import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostService,
  deletePostService,
  getPostsAuthorsService,
  getPostsByUserIdService,
  getPostsWithPaginationService,
} from "../../services/postService";
import { PostType } from "../../types/postType";
import { StateType } from "../../types/stateType";

export const POSTS_WITH_PAGINATION_REQUEST = "POSTS_WITH_PAGINATION_REQUEST";
export const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
export const FETCH_AUTHORS = "FETCH_AUTHORS";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";

export const fetchPostsWithPagination = createAsyncThunk(
  "posts/fetchPostsWithPagination",
  async (_, { dispatch, getState }) => {
    const { filters, posts } = getState() as StateType;

    dispatch({ type: POSTS_WITH_PAGINATION_REQUEST });

    const response = await getPostsWithPaginationService(
      posts.currentPage,
      filters
    );

    return {
      data: response.data,
      totalPages: response.totalPages,
    };
  }
);

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId: string, { dispatch, getState }) => {
    const { posts } = getState() as StateType;

    dispatch({ type: POSTS_WITH_PAGINATION_REQUEST });

    const response = await getPostsByUserIdService(userId, posts.currentPage);

    return {
      data: response.data,
      totalPages: response.totalPages,
    };
  }
);

export const fetchPostsAuthors = createAsyncThunk(
  "posts/fetchPostsAuthors",
  async (_, { dispatch }) => {
    dispatch({ type: UPDATE_CURRENT_PAGE });

    const response = await getPostsAuthorsService();
    return response;
  }
);

export const updateCurrentPage = createAsyncThunk(
  "posts/updateCurrentPage",
  async (data: number, { dispatch }) => {
    dispatch({ type: UPDATE_CURRENT_PAGE });

    return data;
  }
);

export const fetchCreatePost = createAsyncThunk(
  "posts/fetchCreatePost",
  async (data: Omit<PostType, "id">, { dispatch }) => {
    dispatch({ type: CREATE_POST });

    const response = await createPostService(data);
    return response;
  }
);

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (data: { userId: string; id: string }, { dispatch }) => {
    dispatch({ type: DELETE_POST });

    const response = await deletePostService(data.userId, data.id);
    return response;
  }
);
