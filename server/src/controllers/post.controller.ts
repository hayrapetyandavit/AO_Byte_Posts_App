import { Request, Response } from "express";
import {
  getPostsWithPagination,
  getPostsByUserId,
  getPostsAuthors,
  createPost,
  updatePost,
  deletePost,
} from "../services/post.service";

import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";

export const getPostsWithPaginationController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPostsWithPagination(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts!" });
  }
};

export const getPostsByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPostsByUserId(req.query.page, req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts!" });
  }
};

export const getPostsAuthorsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPostsAuthors();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to get authors" });
  }
};

export const createPostController = async (req: Request, res: Response) => {
  try {
    const result = await createPost(req.body);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to create posts" });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const result = await updatePost(req.body, req.params.id);

    const accessToken = req.cookies.access_token;
    const decodedToken = jwt.verify(accessToken, authConfig.ACCESS_JWT_SECRET);

    console.log(decodedToken);

    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to update post" });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const result = await deletePost(req.body, req.params.id);

    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to delete post" });
  }
};
