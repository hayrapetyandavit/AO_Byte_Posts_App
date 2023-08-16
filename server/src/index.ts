import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import dbConfig from "./config/db.config";
import postRouter from "./routes/post.router";
import authRouter from "./routes/auth.router";
import commentRouter from "./routes/comment.router";

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3011;

authRouter(app);
postRouter(app);
commentRouter(app);

const main = async () => {
  try {
    mongoose.connect(dbConfig.MONGODB_URL).then(() => {
      console.log("MongoDB connected!");
    });
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();

export default app;
