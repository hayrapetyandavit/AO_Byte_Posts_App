import { Application } from "express";

import { refreshToken } from "../middlewares/refreshToken";
import { verifyToken } from "../middlewares/verifyToken";
import {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  verifyLoginController,
  isAuthController,
} from "../controllers/auth.controller";
import { emailValidation, passwordValidation } from "../utils/validations";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/reset-password/:token",
    [emailValidation, passwordValidation],
    resetPasswordController
  );
  app.post("/logout", verifyToken, refreshToken, logoutController);
  app.get("/check-session", verifyToken, refreshToken, isAuthController);
  app.post("/forgot-password", [emailValidation], forgotPasswordController);
  app.post("/login", [emailValidation, passwordValidation], loginController);
  app.post(
    "/register",
    [emailValidation, passwordValidation],
    registerController
  );
  app.post(
    "/login/:token",
    [emailValidation, passwordValidation],
    verifyLoginController
  );
};
