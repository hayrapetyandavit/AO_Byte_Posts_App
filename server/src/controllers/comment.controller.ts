import { Request, Response } from "express";

import {
  addRateToComment,
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../services/comment.service";

export const getAllCommentsController = async (req: Request, res: Response) => {
  try {
    const result = await getAllComments();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to get comments" });
  }
};

export const createCommentController = async (req: Request, res: Response) => {
  try {
    const result = await createComment(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to post comment" });
  }
};

export const addRateToCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await addRateToComment(req.body, req.params.commentId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding rate to comment" });
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  try {
    const result = await updateComment(req.body, req.params.id);

    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to update post" });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const result = await deleteComment(req.body, req.params.id);

    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to delete post" });
  }
};