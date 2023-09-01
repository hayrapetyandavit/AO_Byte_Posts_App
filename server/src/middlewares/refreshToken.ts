import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config";

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next();
  }
  

  jwt.verify(token, authConfig.ACCESS_JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return next();
    }

    const refreshToken = jwt.sign(
      {
        id: (decoded as { userId: number }).userId,
      },
      authConfig.REFRESH_JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: authConfig.jwtRefreshExpiration * 1000,
    });
    next();
  });
};
