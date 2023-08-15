import { PostType } from "../types/postType";

export const getPostsWithPaginationService = async (
  currentPage: number,
  filters: {
    category: string;
    author: string;
    dateRange: { startDate: string; endDate: string };
    sortBy: string;
  }
) => {
  const queryParams = new URLSearchParams();

  if (filters.category && filters.category !== "all") {
    queryParams.append("category", filters.category);
  }

  if (filters.author && filters.author !== "all") {
    queryParams.append("author", filters.author);
  }

  if (filters.dateRange.startDate && filters.dateRange.endDate) {
    queryParams.append("startDate", filters.dateRange.startDate);
    queryParams.append("endDate", filters.dateRange.endDate);
  }

  if (filters.sortBy) {
    queryParams.append("sortBy", filters.sortBy);
  }

  const response = await fetch(
    `${
      process.env.REACT_APP_API_URL
    }posts?page=${currentPage}&${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getPostsByUserIdService = async (
  userId: string,
  currentPage: number
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}posts/${userId}?page=${currentPage}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const getPostsAuthorsService = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}authors`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const createPostService = async (data: Omit<PostType, "id">) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}posts`, {
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

export const updatePostService = async (
  content: string,
  userId: string,
  id: string
) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}posts/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, content }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const deletePostService = async (userId: string, id: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}posts/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};
