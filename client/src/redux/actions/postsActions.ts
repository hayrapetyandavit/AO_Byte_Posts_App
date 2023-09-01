import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updatePostService,
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
export const UPDATE_POST = "UPDATE_POST";
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
  async (_, { dispatch, getState }) => {
    const { posts, auth } = getState() as StateType;

    dispatch({ type: POSTS_WITH_PAGINATION_REQUEST });

    const response = await getPostsByUserIdService(
      auth.userId,
      posts.currentPage,
      auth.accessToken
    );

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
  async (data: Omit<PostType, "id">, { dispatch, getState }) => {
    dispatch({ type: CREATE_POST });
    const { auth } = getState() as StateType;

    const response = await createPostService(data, auth.accessToken);
    return response;
  }
);

export const fetchUpdatePost = createAsyncThunk(
  "posts/fetchUpdatePost",
  async (
    data: { title: string; content: string; id: string },
    { dispatch, getState }
  ) => {
    dispatch({ type: UPDATE_POST });
    const { auth } = getState() as StateType;

    const response = await updatePostService(
      data.title,
      data.content,
      auth.userId,
      data.id,
      auth.accessToken
    );
    return response;
  }
);

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (data: { id: string }, { dispatch, getState }) => {
    dispatch({ type: DELETE_POST });
    const { auth } = getState() as StateType;

    const response = await deletePostService(
      auth.userId,
      data.id,
      auth.accessToken
    );
    return response;
  }
);
