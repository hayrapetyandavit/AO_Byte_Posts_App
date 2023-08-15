import { check } from "express-validator";

export const emailValidation = check("email")
  .isEmail()
  .withMessage("invalid email address")
  .normalizeEmail();

export const passwordValidation = check("password")
  .isLength({ min: 8, max: 15 })
  .withMessage("your password should have min and max length between 8-15")
  .matches(/\d/)
  .withMessage("your password should have at least one number")
  .matches(/[!@#$%^&*=(),.|\/?":{}|<>]/)
  .withMessage("your password should have at least one sepcial character")
  .matches(/[A-Z]/)
  .withMessage("your password should have at least one uppercase character");
