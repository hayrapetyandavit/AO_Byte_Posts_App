import { Request, Response } from "express";
import {
  login,
  verifyLogin,
  register,
  forgotPassword,
  resetPassword,
  isAuth,
  logout,
} from "../services/auth.service";

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await register(req.body);

    res.status(200).send(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await login(req.body);

    if (result.accessToken) {
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        maxAge: result.expiresMaxAge,
      });
      return res.status(200).send({
        id: result.id,
        name: result.name,
      });
    }
    res.status(200).send(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyLoginController = async (req: Request, res: Response) => {
  try {
    const result = await verifyLogin(req.body, req.params.token);
    if (result.accessToken) {
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        maxAge: result.expiresMaxAge,
      });
      return res.status(200).send({
        id: result.id,
        name: result.name,
      });
    }
    res.status(200).send(result);
  } catch (error: any) {}
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const result = await forgotPassword(req.body);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const result = await resetPassword(req.body, req.params.token);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const isAuthController = async (req: Request, res: Response) => {
  try {
    const result = await isAuth();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const result = await logout();
    res.clearCookie("access_token");

    return res.status(200).send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
