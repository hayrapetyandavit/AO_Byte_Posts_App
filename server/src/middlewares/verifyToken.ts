import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.access_token;
    const payload = jwt.verify(accessToken, authConfig.ACCESS_JWT_SECRET);

    if (!payload) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    next();
  } catch (error) {
    res.status(401).send("Please authenticate");
  }
};
