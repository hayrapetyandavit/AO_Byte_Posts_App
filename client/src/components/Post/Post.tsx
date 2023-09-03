import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { genId } from "../../utils/genId";
import { PostType } from "../../types/postType";
import { StateType } from "../../types/stateType";
import { notify } from "../../utils/notifyMessage";
import {
  fetchDeletePost,
  fetchPostsByUserId,
  fetchPostsWithPagination,
  fetchUpdatePublishPost,
} from "../../redux/actions/postsActions";
import { AppThunkDispatch } from "../../redux/store";
import { generateRateColor } from "../../utils/generateRateColor";

import Button from "../Button/Button";
import Comment from "../Comment/Comment";
import EditPost from "../EditPost/EditPost";
import Skeleton from "../Skeleton/Skeleton";
import AddComment from "../AddComment/AddComment";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

import classes from "./style.module.scss";

interface IProps {
  handleCommentsSort?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  data: PostType;
}

const Post: FC<IProps> = (props) => {
  const { data } = props;
  const { loading, message, error } = useSelector(
    (state: StateType) => state.posts
  );
  const theme = useSelector((state: StateType) => state.theme.theme);
  const { userId } = useSelector((state: StateType) => state.auth);
  const { commentsByPost } = useSelector((state: StateType) => state.comments);

  const [sortType, setSortType] = useState(false);
  const [path, setPath] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [updateCdomments, setUpdateCdomments] = useState(commentsByPost);

  const location = useLocation();
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 400);

    return () => clearTimeout(skeletonTimer);
  }, [loading]);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      userId,
      id: e.currentTarget.id,
    };

    await dispatch(fetchDeletePost(data));

    if (message) {
      notify(message);
    }
    if (error) {
      notify(error);
    }
    await dispatch(fetchPostsWithPagination());
  };

  const handleCommentsSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id) {
      const id = e.currentTarget.id;
      if (!commentsByPost[id]) {
        return notify("This post haven't any comments");
      }
      const sortedArray = commentsByPost[id].slice().sort((a, b) => {
        return sortType ? a.rate - b.rate : b.rate - a.rate;
      });

      setUpdateCdomments({
        [id]: sortedArray,
      });
      setSortType((prevState) => !prevState);
    }
  };

  const handleInputCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      isPublic: e.currentTarget.checked,
      userId,
      id: e.currentTarget.id,
    };
    await dispatch(fetchUpdatePublishPost(data));
    await dispatch(fetchPostsByUserId());
    await dispatch(fetchPostsWithPagination());

    if (data.isPublic) {
      notify("Post published successfully!");
    } else {
      notify("Post removed from public posts successfully!");
    }
    if (message === "Permission denied") {
      notify(message);
    }
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleDeletePost(e);
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const authorNameStyle =
    theme === "dark" ? { background: "transparent" } : undefined;

  if (showSkeleton || loading) {
    return <Skeleton />;
  }

  if (editMode) {
    return <EditPost post={data} setEditMode={setEditMode} />;
  }

  return (
    <div
      className={classes.post}
      key={genId()}
      title={`${data.author} (author)`}
    >
      <div className={classes.deletePost}>
        <span className={classes.authorName} style={authorNameStyle}>
          {data.author} (author)
        </span>
        {data.userId === userId && path === "/home" ? (
          <>
            <input
              id={data.id}
              type="checkbox"
              title="public/private"
              className={classes.check}
              checked={data.isPublic}
              onChange={handleInputCheck}
            />
            <Button
              value="&#10005;"
              onClick={() => setShowModal(true)}
              title="Delete post"
            />
            {isShowModal &&
              ReactDOM.createPortal(
                <ConfirmationModal
                  id={data.id}
                  onDelete={onDelete}
                  onCancel={onCancel}
                />,
                document.getElementById("modal-root") as
                  | Element
                  | DocumentFragment
              )}
            <Button
              value="&#9998;"
              onClick={() => setEditMode(true)}
              title="Edit post"
            />
          </>
        ) : null}
      </div>
      <h2 className={classes.title} title={data.title}>
        {data.title!.length > 25
          ? data.title?.slice(0, 15) + "..."
          : data.title}
      </h2>
      <p className={classes.text}>{data.content}</p>
      <div className={classes.comments}>
        <div className={classes.btnGroup}>
          {userId ? (
            <AddComment
              postId={data.id}
              handleCommentsSort={handleCommentsSort}
            />
          ) : (
            <Link to="/login">You can add comment after log in!</Link>
          )}
        </div>
        <div className={classes.spanGroup}>
          {data.edited && (
            <span className={classes.edited}>edited &#10003;</span>
          )}
          <span
            className={classes.rate}
            style={{
              color: generateRateColor(data.totalRate!),
            }}
          >
            {data.totalRate ? data.totalRate : "No rating ..."}
          </span>
        </div>
        <Comment id={data.id} userId={data.userId} comments={updateCdomments} />
      </div>
    </div>
  );
};

export default Post;
