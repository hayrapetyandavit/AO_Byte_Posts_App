import { PostType } from "./postType";
import { CommentType } from "./commentsType";

export type StateType = {
  theme: { theme: "dark" | "light" };

  idArray: { idArray: string[] };

  posts: {
    loading: boolean;
    postsWithPagination: PostType[];
    postsByUserId: PostType[];
    authors: string[];
    totalPages: number;
    currentPage: number;
    error: string;
  };

  allComments: {
    loading: boolean;
    allComments: CommentType[];
    commentsByPost: { [key: string]: CommentType[] };
    commentsByParent: { [key: string]: CommentType[] };
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
