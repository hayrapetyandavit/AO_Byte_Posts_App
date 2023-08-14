import mongoose from "mongoose";

export interface IUserModel {
  _id: String;
  name: string;
  email: string;
  password: string;
  isVerify: boolean;
  // verifyToken: string;
  createdAt: Date;
}
[];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerify: { type: Boolean, required: true },
    // verifyToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default UserModel;
