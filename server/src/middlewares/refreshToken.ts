import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config";

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next();
  }

  jwt.verify(token, authConfig.ACCESS_JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return next();
    }

    const accessToken = jwt.sign(
      {
        id: (decoded as { userId: number }).userId,
      },
      authConfig.ACCESS_JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: authConfig.jwtRefreshExpiration * 1000,
    });
    next();
  });
};

export default refreshToken;