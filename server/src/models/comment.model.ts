import mongoose from "mongoose";

export interface ICommentModel extends Document {
  _id: string;
  content: string;
  author: string;
  rate: number;
  postId: string;
  userId: string;
  parentId?: string;
  edited: boolean;
  createdAt: Date;
}
[];

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
    rate: { type: Number, default: 0 },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    edited: { type: Boolean, default: false },
    parentId: { type: String },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model<ICommentModel>("Comment", commentSchema);

export default CommentModel;
