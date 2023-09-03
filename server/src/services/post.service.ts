import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { postModelDTO } from "../utils/mongoModelDTO";

enum SortByOptions {
  PostRate = "post rate",
  CreationDate = "creation date",
}

async function getUserAndPost(userId: string, postId: string) {
  const [user, post] = await Promise.all([
    UserModel.findById(userId),
    PostModel.findById(postId),
  ]);

  return { user, post };
}

interface IPostsQuery {
  author?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: "post rate" | "creation date";
  page?: string;
}

interface ICreatePostBody {
  title: string;
  content: string;
  category: string;
  author: string;
  userId: string;
}

export const getPostsWithPagination = async (query: IPostsQuery) => {
  const page = parseInt(query.page as string) || 1;
  const itemsPerPage = 5;

  const matchConditions: any = {
    $and: [
      query.author ? { author: query.author } : {},
      query.category ? { category: query.category } : {},
      query.startDate && query.endDate
        ? {
            createdAt: {
              $gte: new Date(query.startDate as string),
              $lte: new Date(query.endDate as string),
            },
          }
        : {},
    ],
    isPublic: true,
  };

  const filteredResults = await PostModel.aggregate([
    { $match: matchConditions },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);

  const totalCount = filteredResults.length > 0 ? filteredResults[0].count : 0;

  const aggregationPipeline: any[] = [
    {
      $match: matchConditions,
    },
    {
      $sort: {
        totalRate: query.sortBy === SortByOptions.PostRate ? -1 : 1,
        createdAt: query.sortBy === SortByOptions.CreationDate ? -1 : 1,
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

  return {
    data: data,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  };
};

export const getPostsByUserId = async (
  queryPage: IPostsQuery | any,
  paramsId: string
) => {
  const page = parseInt(queryPage) || 1;
  const userId = paramsId;
  const itemsPerPage = 3;

  const skip = (page - 1) * itemsPerPage;

  const posts = await PostModel.find({ userId })
    .skip(skip)
    .limit(itemsPerPage)
    .sort({ createdAt: -1 });

  const totalCount = await PostModel.countDocuments({ userId });

  const data = postModelDTO(posts);

  return {
    data: data,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  };
};

export const getPostsAuthors = async () => {
  const posts = await PostModel.find();
  const authorsCash: { [key: string]: string } = { author: "" };
  const authors = ["all"];

  for (let i = 0; i < posts.length; i++) {
    if (!authorsCash[posts[i].author]) {
      authorsCash[posts[i].author] = posts[i].author;
      authors.push(posts[i].author);
    }
  }

  return authors;
};

export const createPost = async (body: ICreatePostBody) => {
  const { title, content, category, author, userId } = body;

  if (Object.keys(body).length === 0) {
    return {
      code: 400,
      message: "Please provide all required field",
    };
  }

  const newPost = new PostModel();

  newPost.title = title;
  newPost.content = content;
  newPost.category = category;
  newPost.author = author;
  newPost.userId = userId;

  await newPost.save();

  return newPost;
};

interface IUpdatePostBody {
  title: string;
  content: string;
  userId: string;
  isPublic?: boolean;
}

export const updatePost = async (body: IUpdatePostBody, paramsId: string) => {
  const id = paramsId;
  const { userId, title, content } = body;

  const { user, post } = await getUserAndPost(userId, id);

  if (user && post) {
    await PostModel.updateOne(
      { _id: id },
      { title: title, content: content, edited: true }
    );
    return { code: 201, message: "Post updated successfully!" };
  } else {
    return { code: 403, message: "Permission denied" };
  }
};

export const updatePublishedPost = async (
  body: IUpdatePostBody,
  paramsId: string
) => {
  const id = paramsId;
  const { userId, isPublic } = body;

  const { user, post } = await getUserAndPost(userId, id);

  if (user && post) {
    await PostModel.updateOne({ _id: id }, { isPublic: isPublic });

    return {
      code: 201,
      message: isPublic
        ? "Post published successfully!"
        : "Post removed from public posts successfully!",
    };
  } else {
    return { code: 403, message: "Permission denied" };
  }
};

export const deletePost = async (
  body: { userId: string },
  paramsId: string
) => {
  const id = paramsId;
  const { userId } = body;

  const { user, post } = await getUserAndPost(userId, id);

  if (user && post) {
    await PostModel.deleteOne({ _id: id });
    return { code: 201, message: "Post deleted successfully!" };
  } else {
    return { code: 403, message: "Permission denied" };
  }
};
