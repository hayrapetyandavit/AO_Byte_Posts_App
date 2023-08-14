import { CommentType } from "../types/commentsType";

export const getAllCommentsService = async (): Promise<Response> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}comments`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const createCommentService = async (
  data: Omit<CommentType, "id" | "rate" | "parentId">
) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}comments`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const addRateToCommentService = async (
  rate: number,
  commentId: string
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}comments/${commentId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rate }),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};
