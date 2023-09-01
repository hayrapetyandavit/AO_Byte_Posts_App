import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { genId } from "../../utils/genId";
import {
  fetchAllComments,
  updateCommentsByPost,
  updateCommentsByParent,
} from "../../redux/actions/commentsActions";
import { PostType } from "../../types/postType";
import { StateType } from "../../types/stateType";
import { notify } from "../../utils/notifyMessage";
import { AppThunkDispatch } from "../../redux/store";
import { CommentType } from "../../types/commentsType";
import { fetchPostsWithPagination } from "../../redux/actions/postsActions";

import Post from "../../components/Post/Post";
import Paginate from "../../components/Paginate/Paginate";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import classes from "./style.module.scss";

const Posts: FC = () => {
  const { loading, postsWithPagination, currentPage, totalPages, error } =
    useSelector((state: StateType) => state.posts);

  const { allComments } = useSelector((state: StateType) => state.comments);

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(fetchPostsWithPagination());
    dispatch(fetchAllComments());
    if (error) {
      notify(error);
    }
  }, [dispatch, currentPage]);

  const getCommentsByPost = () => {
    const newObj = allComments.reduce(
      (result: { [postId: string]: CommentType[] }, item: CommentType) => {
        const postId = item.postId;
        if (!result[postId]) {
          result[postId] = [];
        }
        result[postId].push(item);
        return result;
      },
      {}
    );

    dispatch(updateCommentsByPost(newObj));
  };

  const getCommentsByParent = () => {
    const newObj = allComments.reduce(
      (result: { [parentId: string]: CommentType[] }, item: CommentType) => {
        const parentId = item.parentId;
        if (parentId && !result[parentId]) {
          result[parentId] = [];
        }
        parentId && result[parentId].push(item);
        return result;
      },
      {}
    );

    dispatch(updateCommentsByParent(newObj));
  };

  useEffect(() => {
    getCommentsByPost();
    getCommentsByParent();
  }, [allComments]);

  if (!loading && postsWithPagination.length === 0) {
    return (
      <div className={classes.emptyData}>
        <h1>There are no any posts</h1>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={classes.content}>
      {postsWithPagination.map((post: PostType) => (
        <Post data={post} key={genId()} />
      ))}
      <Paginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Posts;
