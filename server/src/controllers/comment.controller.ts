import { Request, Response } from "express";

import {
  addRateToComment,
  createComment,
  getAllComments,
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
