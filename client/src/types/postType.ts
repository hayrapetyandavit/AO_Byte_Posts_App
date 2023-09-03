export type PostType = {
  id: string;
  content: string;
  author: string;
  category: string;
  edited?: boolean;
  isPublic?: boolean;
  totalRate?: number;
  title?: string;
  userId: string;
};
