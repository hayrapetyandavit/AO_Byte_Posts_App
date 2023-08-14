export type CommentType = {
  id: string;
  content: string;
  author: string;
  rate: number;
  postId: string;
  userId: string;
  parentId?: string;
};
