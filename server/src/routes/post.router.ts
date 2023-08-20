import { Application } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { refreshToken } from "../middlewares/refreshToken";

import {
  updatePostController,
  createPostController,
  deletePostController,
  getPostsAuthorsController,
  getPostsByUserIdController,
  getPostsWithPaginationController,
} from "../controllers/post.controller";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/authors", getPostsAuthorsController);
  app.get("/posts", getPostsWithPaginationController);
  app.post("/posts", verifyToken, refreshToken, createPostController);
  app.put("/posts/:id", verifyToken, refreshToken, updatePostController);
  app.delete("/posts/:id", verifyToken, refreshToken, deletePostController);
  app.get("/posts/:userId", verifyToken, refreshToken, getPostsByUserIdController);
};
