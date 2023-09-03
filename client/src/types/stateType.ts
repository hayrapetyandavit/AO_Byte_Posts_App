import { PostType } from "./postType";
import { CommentType } from "./commentsType";

export type StateType = {
  auth: {
    user: string;
    userId: string;
    code: number | null;
    message: string;
    error: string;
    accessToken: string;
  };

  theme: { theme: "dark" | "light" };

  idArray: { idArray: string[] };

  posts: {
    loading: boolean;
    postsWithPagination: PostType[];
    postsByUserId: PostType[];
    authors: string[];
    totalPages: number;
    currentPage: number;
    message: string;
    error: string;
  };

  comments: {
    loading: boolean;
    allComments: CommentType[];
    commentsByPost: { [key: string]: CommentType[] };
    commentsByParent: { [key: string]: CommentType[] };
    message: string;
    error: string;
  };

  filters: {
    category: string;
    author: string;
    dateRange: { startDate: string; endDate: string };
    sortBy: string;
  };

  isSortButtonClicked: boolean;
};
