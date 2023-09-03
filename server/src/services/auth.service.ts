import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { mailer } from "../utils/mailer";
import UserModel from "../models/user.model";
import authConfig from "../config/auth.config";

interface IReqBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isChecked?: boolean;
}

export const register = async (body: IReqBody) => {
  const { name, email, password, confirmPassword } = body;

  if (!(name && email && password)) {
    return {
      code: 400,
      message: "Inputes are required!",
    };
  }

  if (password !== confirmPassword) {
    return { code: 400, message: "Passwords do not mutch!" };
  }

  const oldUser = await UserModel.findOne({ email });

  if (oldUser) {
    return { code: 409, message: "Please Login!" };
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

  return { code: 200, message: "Please verification by email!" };
};

export const login = async (body: IReqBody) => {
  const { email, password, isChecked } = body;

  const user = await UserModel.findOne({ email });

  if (!email || !password) {
    return {
      code: 400,
      message: "Email and password are required!",
    };
  }

  if (!user) {
    return {
      code: 400,
      message: "Invalid email or password!",
    };
  }

  if (!user.isVerify) {
    return {
      code: 400,
      message: "Need to be verified!",
    };
  }

  const compare = await bcrypt.compare(password, user.password);

  if (compare) {
    const expiresIn = isChecked ? "10d" : "15m";

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

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      authConfig.REFRESH_JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return {
      id: user.id,
      name: user.name,
      accessToken,
      refreshToken,
    };
  } else {
    return {
      code: 400,
      message: "Invalid email or password!",
    };
  }
};

export const verifyLogin = async (body: IReqBody, reqtoken: string) => {
  const { email, password, isChecked } = body;
  const token = reqtoken;

  if (!email || !password) {
    return {
      code: 400,
      message: "Email and password are required!",
    };
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      code: 400,
      message: "Invalid email or password!",
    };
  }

  if (token) {
    const compareToken = await bcrypt.compare(user.email, token);

    if (!compareToken) {
      return {
        code: 400,
        message: "Email is not valid!",
      };
    }

    user.isVerify = true;

    await user.save();
  }

  if (!user.isVerify) {
    return {
      code: 400,
      message: "Need to be verified!",
    };
  }

  const compare = await bcrypt.compare(password, user.password);

  if (compare) {
    const expiresIn = isChecked ? "10d" : "15m";

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

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      authConfig.REFRESH_JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return {
      id: user.id,
      name: user.name,
      accessToken,
      refreshToken,
    };
  } else {
    return {
      code: 400,
      message: "Invalid email or password!",
    };
  }
};

export const forgotPassword = async (body: IReqBody) => {
  const { email } = body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      code: 404,
      message: "User not found.",
    };
  }
  try {
    const resetToken = await bcrypt.hash(email, 6);

    user.password = resetToken;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    mailer(email, resetLink, "Reset Passwork");

    return {
      code: 200,
      message: "Password reset link sent successfully!",
    };
  } catch (err) {
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const resetPassword = async (body: IReqBody, reqtoken: string) => {
  const { email, password, confirmPassword } = body;
  const token = reqtoken;

  if (!(password && confirmPassword)) {
    return {
      code: 400,
      messafe: "Inputes are required!",
    };
  }

  if (password !== confirmPassword) {
    return {
      code: 404,
      messafe: "Passwords do not mutch!",
    };
  }

  const user = await UserModel.findOne({ email });

  const isTokenValid = await bcrypt.compare(email, token);

  if (!isTokenValid) {
    return {
      code: 401,
      messafe: "Invalid token.",
    };
  }

  if (user) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    user.password = encryptedPassword;

    await user.save();
  } else {
    return {
      code: 400,
      messafe: "Invalid email!",
    };
  }

  return {
    code: 200,
    messafe: "Password updated successfully!",
  };
};

export const isAuth = async () => {
  return { valid: true };
};

export const logout = async () => {
  return {
    code: 200,
    message: "Logged out successfully",
  };
};
