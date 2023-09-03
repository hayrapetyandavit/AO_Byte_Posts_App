import mongoose from "mongoose";

export interface IPostModel extends Document {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  edited: boolean;
  isPublic: boolean;
  totalRate: number;
  userId: string;
  createdAt: Date;
}
[];

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    edited: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    totalRate: { type: Number, default: 0 },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model<IPostModel>("Post", postSchema);

export default PostModel;
