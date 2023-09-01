import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization") || "";
    const accessToken = authHeader.split(" ")[1];
    const refreshToken = req.cookies.refresh_token;

    jwt.verify(
      accessToken,
      authConfig.ACCESS_JWT_SECRET,
      (accessTokenErr: any, decodedAccessToken: any) => {
        if (accessTokenErr) {
          jwt.verify(
            refreshToken,
            authConfig.REFRESH_JWT_SECRET,
            (refreshTokenErr: any, decodedRefreshToken: any) => {
              if (refreshTokenErr) {
                console.log("Both tokens are invalid or expired.");
                return res.status(401).send("Unauthenticated");
              }
              next();
            }
          );
        } else {
          next();
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(401).send("Please authenticate");
  }
};
