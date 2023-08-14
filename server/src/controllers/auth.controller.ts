import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailer } from "../utils/mailer";

import authConfig from "../config/auth.config";

import UserModel from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!(name && email && password)) {
      res.status(400).send("Inputes are required!");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not mutch!");
    }

    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("Please Login!");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const verifyToken = await bcrypt.hash(email, 6);

    const newUser = new UserModel();

    newUser.name = name;
    newUser.email = email;
    newUser.password = encryptedPassword;
    newUser.isVerify = false;

    await newUser.save();

    const verifyLink = `http://localhost:3000/login?token=${verifyToken}`;

    mailer(email, verifyLink, "Verify Account");

    return res.status(200).json({ message: "Please verification by email!" });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, isChecked } = req.body;

    const user = await UserModel.findOne({ email });

    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    if (!user) {
      return res.status(400).send("Invalid email or password!");
    }

    if (!user.isVerify) {
      console.log(4)
      return res.status(400).send("Need to be verified!" );
    }

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const expiresIn = isChecked ? "10d" : "15m";

      const expiresMaxAge = isChecked
        ? authConfig.jwtRememberExpiration * 1000000
        : authConfig.jwtExpiration * 1000;

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        authConfig.ACCESS_JWT_SECRET,
        {
          expiresIn: expiresIn,
        }
      );

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: expiresMaxAge,
      });

      return res.status(200).send({
        id: user.id,
        name: user.name,
      });
    } else {
      return res.status(400).send("Invalid email or password!");
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyLogin = async (req: Request, res: Response) => {
  try {
    const { email, password, isChecked } = req.body;
    const token = req.params.token;

    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid email or password!");
    }

    if (token) {
      const compareToken = await bcrypt.compare(user.email, token);

      if (!compareToken) {
        return res.status(400).send("Email is not valid!");
      }

      user.isVerify = true;

      await user.save();
    }

    if (!user.isVerify) {
      return res.status(400).send("Need to be verified!");
    }

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const expiresIn = isChecked ? "10d" : "15m";

      const expiresMaxAge = isChecked
        ? authConfig.jwtRememberExpiration * 1000000
        : authConfig.jwtExpiration * 1000;

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        authConfig.ACCESS_JWT_SECRET,
        {
          expiresIn: expiresIn,
        }
      );

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: expiresMaxAge,
      });

      return res.status(200).send({
        id: user.id,
        name: user.name,
      });
    } else {
      return res.status(400).send("Invalid email or password!");
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    try {
      const resetToken = await bcrypt.hash(email, 6);

      user.password = resetToken;

      await user.save();

      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

      mailer(email, resetLink, "Reset Passwork");

      return res
        .status(200)
        .json({ message: "Password reset link sent successfully!" });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const token = req.params.token;

    if (!(password && confirmPassword)) {
      res.status(400).send("Inputes are required!");
    }

    if (password !== confirmPassword) {
      return res.status(404).send("Passwords do not mutch!");
    }

    const user = await UserModel.findOne({ email });

    const isTokenValid = await bcrypt.compare(email, token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "Invalid token." });
    }

    if (user) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      user.password = encryptedPassword;

      await user.save();
    } else {
      return res.status(400).send("Invalid email!");
    }

    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const isAuth = async (req: Request, res: Response) => {
  try {
    res.json({ valid: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");

    return res.status(200).send("Logged out successfully");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
