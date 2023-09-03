import PostModel from "../models/post.model";
import CommentModel from "../models/comment.model";
import UserModel from "../models/user.model";

export const getAllComments = async () => {
  const comments = await CommentModel.find().sort({ createdAt: -1 });

  if (comments.length < 1) {
    return [];
  }

  const mongoDTO = comments.map((comment) => ({
    id: comment._id,
    content: comment.content,
    author: comment.author,
    rate: comment.rate,
    userId: comment.userId,
    postId: comment.postId,
    parentId: comment.parentId || null,
    edited: comment.edited,
  }));

  return mongoDTO;
};

interface IReqBody {
  content: string;
  author: string;
  postId: string;
  userId: string;
  parentId: string;
}

export const createComment = async (body: IReqBody) => {
  const { content, author, postId, userId, parentId } = body;

  if (Object.keys(body).length === 0) {
    return {
      code: 400,
      message: "Please provide all required field",
    };
  }

  const newComment = new CommentModel();

  newComment.content = content;
  newComment.author = author;
  newComment.userId = userId;
  newComment.postId = postId;

  if (parentId) {
    newComment.parentId = parentId;
  }

  await newComment.save();

  return newComment;
};

export const addRateToComment = async (body: any, commentId: string) => {
  const { rate } = body;
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    return { code: 404, message: "Comment not found" };
  }

  if (isNaN(rate) || rate <= 0) {
    return { code: 400, message: "Invalid rate value" };
  }

  if (comment.rate) {
    comment.rate = (comment.rate + rate) / 2;
  } else {
    comment.rate = rate;
  }

  const updatedComment = await comment.save();

  const post = await PostModel.findById(comment.postId);

  if (post) {
    const comments = await CommentModel.find({
      postId: post._id,
      parentId: { $exists: false },
    });

    const totalRate = comments.reduce((sum, c) => sum + c.rate, 0);

    post.totalRate = Math.round(totalRate / comments.length);
    await post.save();
  }

  return updatedComment;
};

async function getUserAndComment(userId: string, commentId: string) {
  const [user, comment] = await Promise.all([
    UserModel.findById(userId),
    CommentModel.findById(commentId),
  ]);

  return { user, comment };
}

export const updateComment = async (
  body: { userId: string; content: string },
  paramsId: string
) => {
  const id = paramsId;
  const { userId, content } = body;

  const { user, comment } = await getUserAndComment(userId, id);

  if (user && comment) {
    await CommentModel.updateOne(
      { _id: id },
      { content: content, edited: true }
    );
    return { code: 201, message: "Comment updated successfully!" };
  } else {
    return { code: 403, message: "Permission denied" };
  }
};

export const deleteComment = async (
  body: { userId: string },
  paramsId: string
) => {
  const id = paramsId;
  const { userId } = body;

  const { user, comment } = await getUserAndComment(userId, id);

  if (user && comment) {
    await CommentModel.deleteOne({ _id: id });
    return { code: 201, message: "Comment deleted successfully!" };
  } else {
    return { code: 403, message: "Permission denied" };
  }
};
