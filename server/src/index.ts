import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import postRouter from "./routes/post.router";
import commentRouter from "./routes/comment.router";
import authRouter from "./routes/auth.router";
import dbConfig from "./config/db.config";

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
