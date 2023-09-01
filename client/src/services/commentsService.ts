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
  data: Omit<CommentType, "id" | "rate" | "parentId">,
  accessToken: string
) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}comments`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
  commentId: string,
  accessToken: string
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}comments/${commentId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
