import { Application } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import refreshToken from "../middlewares/refreshToken";

import {
  createPost,
  deletePost,
  getPostsAuthors,
  getPostsByUserId,
  getPostsWithPagination,
} from "../controllers/post.controller";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/posts", getPostsWithPagination);
  app.get("/posts/:userId", verifyToken, refreshToken, getPostsByUserId);
  app.get("/authors", getPostsAuthors);
  app.post("/posts", verifyToken, refreshToken, createPost);
  app.delete("/posts/:id", verifyToken, refreshToken, deletePost);
};
