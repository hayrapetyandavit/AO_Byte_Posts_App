import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { genId } from "../../utils/genId";
import { PostType } from "../../types/postType";
import { StateType } from "../../types/stateType";
import {
  fetchDeletePost,
  fetchPostsWithPagination,
} from "../../redux/actions/postsActions";
import { generateRateColor } from "../../utils/generateRateColor";

import Button from "../Button/Button";
import Comment from "../Comment/Comment";
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

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isShowModal, setShowModal] = useState(false);

  const { loading } = useSelector((state: StateType) => state.posts);
  const theme = useSelector((state: StateType) => state.theme.theme);

  const { commentsByPost } = useSelector(
    (state: StateType) => state.allComments
  );

  const [sortType, setSortType] = useState(false);
  const [updateCdomments, setUpdateCdomments] = useState(commentsByPost);

  const dispatch = useDispatch();

  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 800);

    return () => clearTimeout(skeletonTimer);
  }, [loading]);

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      userId: localStorage.getItem("userId") || "",
      id: e.currentTarget.id,
    };

    await dispatch(fetchDeletePost(data));
    await dispatch(fetchPostsWithPagination());
  };

  const handleCommentsSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id) {
      const id = e.currentTarget.id;
      const sortedArray = commentsByPost[id].slice().sort((a, b) => {
        return sortType ? a.rate - b.rate : b.rate - a.rate;
      });

      setUpdateCdomments({
        [id]: sortedArray,
      });
      setSortType((prevState) => !prevState);
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

  return (
    <div className={classes.posts} key={genId()}>
      <div className={classes.deletePost}>
        <span className={classes.authorName} style={authorNameStyle}>
          {data.author} (author)
        </span>
        {data.userId === localStorage.getItem("userId") ? (
          <>
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
          </>
        ) : null}
      </div>
      <h2 className={classes.title}>{data.title}</h2>
      <p className={classes.text}>{data.content}</p>
      <div className={classes.comments}>
        <div className={classes.btnGroup}>
          <AddComment
            postId={data.id}
            handleCommentsSort={handleCommentsSort}
          />
        </div>
        <span
          className={classes.rate}
          style={{
            color: generateRateColor(data.totalRate!),
          }}
        >
          {data.totalRate ? data.totalRate : "No rating ..."}
        </span>
        <Comment id={data.id} userId={data.userId} comments={updateCdomments} />
      </div>
    </div>
  );
};

export default Post;
