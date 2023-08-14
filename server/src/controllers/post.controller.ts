import { Request, Response } from "express";

import { postModelDTO } from "../utils/mongoModelDTO";

import PostModel from "../models/post.model";
import UserModel from "../models/user.model";

export const getPostsWithPagination = async (req: Request, res: Response) => {
  // const queryParamCount = Object.entries(req.query).length;
  const page = parseInt(req.query.page as string) || 1;
  const itemsPerPage = 5;

  const matchConditions: any = {
    $and: [
      req.query.author ? { author: req.query.author } : {},
      req.query.category ? { category: req.query.category } : {},
      req.query.startDate && req.query.endDate
        ? {
            createdAt: {
              $gte: new Date(req.query.startDate as string),
              $lte: new Date(req.query.endDate as string),
            },
          }
        : {},
    ],
  };

  try {
    const filteredResults = await PostModel.aggregate([
      { $match: matchConditions },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const totalCount =
      filteredResults.length > 0 ? filteredResults[0].count : 0;

    const aggregationPipeline: any[] = [
      {
        $match: matchConditions,
      },
      {
        $sort: {
          totalRate: req.query.sortBy === "post rate" ? -1 : 1,
          createdAt: req.query.sortBy === "creation date" ? -1 : 1,
        },
      },
      {
        $skip: (page - 1) * itemsPerPage,
      },
      {
        $limit: itemsPerPage,
      },
    ];

    const results = await PostModel.aggregate(aggregationPipeline);

    const data = postModelDTO(results);

    res.status(200).json({
      data: data,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts!" });
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const userId = req.params.userId;

    const itemsPerPage = 3;

    const skip = (page - 1) * itemsPerPage;

    const posts = await PostModel.find({ userId })
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

    const totalCount = await PostModel.countDocuments({ userId });

    if (!posts) {
      return res.status(400).send({ message: "Failed to get posts" });
    }
    const data = postModelDTO(posts);

    res.status(200).json({
      data: data,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to get posts" });
  }
};

export const getPostsAuthors = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();

    const authorsCash: { [key: string]: string } = { author: "" };

    const authors = ["all"];

    for (let i = 0; i < posts.length; i++) {
      if (!authorsCash[posts[i].author]) {
        authorsCash[posts[i].author] = posts[i].author;
        authors.push(posts[i].author);
      }
    }

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).send({ message: "Failed to get posts" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category, author, userId } = req.body;

    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: "Please provide all required field" });
    }

    const newPost = new PostModel();

    newPost.title = title;
    newPost.content = content;
    newPost.category = category;
    newPost.author = author;
    newPost.userId = userId;

    await newPost.save();

    res.status(200).send(newPost);
  } catch (error) {
    res.status(500).send({ message: "Failed to get posts" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const post = await PostModel.findById(id);
    const user = await UserModel.findById(userId);

    if (user && post) {
      await PostModel.deleteOne({ _id: id });
      res.status(201).send({ message: "Post deleted successfully" });
    } else {
      res.status(201).send({ message: "Permission denied" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to delete post" });
  }
};
