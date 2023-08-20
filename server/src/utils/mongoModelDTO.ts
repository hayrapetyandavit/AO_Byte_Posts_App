type PostsDataType = {
  _id: string;
  title: string;
  content: string;
  category: string;
  edited: boolean;
  author: string;
  totalRate: number;
  userId: string;
}[];

export const postModelDTO = (data: PostsDataType) => {
  return data.map((data) => ({
    id: data._id,
    title: data.title,
    content: data.content,
    category: data.category,
    edited: data.edited,
    author: data.author,
    totalRate: data.totalRate,
    userId: data.userId,
  }));
};
