import { Application } from "express";

import { verifyToken } from "../middlewares/verifyToken";

import {
  getAllCommentsController,
  createCommentController,
  addRateToCommentController,
} from "../controllers/comment.controller";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/comments", getAllCommentsController);
  app.post("/comments", verifyToken, createCommentController);
  app.put("/comments/:commentId", verifyToken, addRateToCommentController);
};
