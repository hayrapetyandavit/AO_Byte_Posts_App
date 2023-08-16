import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { genId } from "../../utils/genId";
import {
  fetchAllComments,
  updateCommentsByParent,
  updateCommentsByPost,
} from "../../redux/actions/commentsActions";
import { PostType } from "../../types/postType";
import { StateType } from "../../types/stateType";
import { CommentType } from "../../types/commentsType";
import { fetchPostsByUserId } from "../../redux/actions/postsActions";

import Post from "../../components/Post/Post";
import AddPost from "../../components/AddPost/AddPost";
import Paginate from "../../components/Paginate/Paginate";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import classes from "./style.module.scss";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const { loading, postsByUserId, currentPage, totalPages, error } =
    useSelector((state: StateType) => state.posts);
  const { allComments, commentsByPost, commentsByParent } = useSelector(
    (state: StateType) => state.allComments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchPostsByUserId(userId));
    }
    dispatch(fetchAllComments());
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

  const containerProps = {
    commentsByPost,
    commentsByParent,
  };

  if (!loading && postsByUserId.length === 0) {
    return <h1>There are no any posts</h1>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={classes.content}>
      <Link to="/">&#10554; go back to all posts</Link>
      {postsByUserId.map((post: PostType) => (
        <Post {...containerProps} data={post} key={genId()} />
      ))}
      <Paginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        totalPages={totalPages}
      />
      <div className={classes.addPost}>
        <AddPost />
      </div>
    </div>
  );
};

export default Home;
