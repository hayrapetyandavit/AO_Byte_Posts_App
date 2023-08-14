import { Request, Response } from "express";

import PostModel from "../models/post.model";
import CommentModel from "../models/comment.model";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await CommentModel.find().sort({ createdAt: -1 });

    if (comments.length < 1) {
      return res.status(200).send([]);
    }

    const mongoDTO = comments.map((comment) => ({
      id: comment._id,
      content: comment.content,
      author: comment.author,
      rate: comment.rate,
      userId: comment.userId,
      postId: comment.postId,
      parentId: comment.parentId || null,
    }));

    res.status(200).send(mongoDTO);
  } catch (error) {
    res.status(500).send({ message: "Failed to get comments" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, author, postId, userId } = req.body;

    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: "Please provide all required field" });
    }

    const newComment = new CommentModel();

    newComment.content = content;
    newComment.author = author;
    newComment.userId = userId;
    newComment.postId = postId;

    if (req.body.parentId) {
      newComment.parentId = req.body.parentId;
    }

    await newComment.save();

    res.status(200).send(newComment);
  } catch (error) {
    res.status(500).send({ message: "Failed to post comment" });
  }
};


export const addRateToComment = async (req: Request, res: Response) => {
  const { rate } = req.body;
  const commentId = req.params.commentId;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (isNaN(rate) || rate <= 0) {
      return res.status(400).json({ message: "Invalid rate value" });
    }

    if (comment.rate) {
      comment.rate = (comment.rate + rate) / 2;
    } else {
      comment.rate = rate;
    }

    const updatedComment = await comment.save();

    const post = await PostModel.findById(comment.postId);
    if (post) {
      const comments = await CommentModel.find({ postId: post._id });
      const totalRate = comments.reduce((sum, c) => sum + c.rate, 0);
      post.totalRate = Math.round(totalRate / comments.length);
      await post.save();
    }

    res.json(updatedComment);
  } catch (error) {
    console.error("Error adding rate to comment:", error);

    res.status(500).json({ message: "Error adding rate to comment" });
  }
};
