import { Application } from "express";

import { verifyToken } from "../middlewares/verifyToken";

import {
  updatePostController,
  createPostController,
  deletePostController,
  getPostsAuthorsController,
  getPostsByUserIdController,
  getPostsWithPaginationController,
  updatePublishedPostController,
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
  app.post("/posts", verifyToken, createPostController);
  app.put("/posts/:id", verifyToken, updatePostController);
  app.delete("/posts/:id", verifyToken, deletePostController);
  app.get("/posts/:userId", verifyToken, getPostsByUserIdController);
  app.patch("/posts/:id", verifyToken, updatePublishedPostController);
};
