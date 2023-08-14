import { Application } from "express";
import { check } from "express-validator";

import { verifyToken } from "../middlewares/verifyToken";
import refreshToken from "../middlewares/refreshToken";

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyLogin,
  isAuth,
} from "../controllers/auth.controller";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/register",
    [
      check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),

      check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage(
          "your password should have min and max length between 8-15"
        )
        .matches(/\d/)
        .withMessage("your password should have at least one number")
        .matches(/[!@#$%^&*=(),.|\/?":{}|<>]/)
        .withMessage("your password should have at least one sepcial character")
        .matches(/[A-Z]/)
        .withMessage(
          "your password should have at least one uppercase character"
        ),
    ],
    register
  );
  app.post(
    "/login",
    [
      check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),

      check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage(
          "your password should have min and max length between 8-15"
        )
        .matches(/\d/)
        .withMessage("your password should have at least one number")
        .matches(/[!@#$%^&*=(),.|\/?":{}|<>]/)
        .withMessage("your password should have at least one sepcial character")
        .matches(/[A-Z]/)
        .withMessage(
          "your password should have at least one uppercase character"
        ),
    ],
    login
  );
  app.post(
    "/login/:token",
    [
      check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),

      check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage(
          "your password should have min and max length between 8-15"
        )
        .matches(/\d/)
        .withMessage("your password should have at least one number")
        .matches(/[!@#$%^&*=(),.|\/?":{}|<>]/)
        .withMessage("your password should have at least one sepcial character")
        .matches(/[A-Z]/)
        .withMessage(
          "your password should have at least one uppercase character"
        ),
    ],
    verifyLogin
  );
  app.post("/forgot-password", forgotPassword);
  app.post("/reset-password/:token", resetPassword);
  app.get("/check-session", verifyToken, refreshToken, isAuth);
  app.post("/logout", verifyToken, refreshToken, logout);
};
