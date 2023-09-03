export type CommentType = {
  edited?: boolean;
  id: string;
  content: string;
  author: string;
  rate: number;
  postId: string;
  userId: string;
  parentId?: string;
};
