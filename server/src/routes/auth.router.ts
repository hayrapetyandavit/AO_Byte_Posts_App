import { Application } from "express";

import {refreshToken} from "../middlewares/refreshToken";
import { verifyToken } from "../middlewares/verifyToken";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyLogin,
  isAuth,
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
    resetPassword
  );
  app.post("/logout", verifyToken, refreshToken, logout);
  app.get("/check-session", verifyToken, refreshToken, isAuth);
  app.post("/forgot-password", [emailValidation], forgotPassword);
  app.post("/login", [emailValidation, passwordValidation], login);
  app.post("/register", [emailValidation, passwordValidation], register);
  app.post("/login/:token", [emailValidation, passwordValidation], verifyLogin);
};
