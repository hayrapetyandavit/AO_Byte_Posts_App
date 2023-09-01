import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const authHeader = req.header("Authorization") || "";
    const accessToken = authHeader.split(" ")[1];

    if (accessToken) {
      const payload = jwt.verify(accessToken, authConfig.ACCESS_JWT_SECRET);
      if (!payload) {
        const refreshPayload = jwt.verify(
          refreshToken,
          authConfig.REFRESH_JWT_SECRET
        );
        if (!refreshPayload) {
          return res.status(401).send({
            message: "Unauthenticated",
          });
        }
        return res.status(401).send({
          message: "Unauthenticated",
        });
      }
      next();
    }
  } catch (error) {
    res.status(401).send("Please authenticate");
  }
};
