import React, { FC, useEffect, useState } from "react";

import classes from "./style.module.scss";
import { PostType } from "../../types/postType";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import {
  fetchPostsByUserId,
  fetchUpdatePost,
} from "../../redux/actions/postsActions";

interface IProps {
  post: PostType;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPost: FC<IProps> = (props) => {
  const { post, setEditMode } = props;

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setPostContent(post.content);
    setPostTitle(post.title || "");
  }, [post]);

  const hundleSaveButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data = {
      title: postTitle,
      content: postContent,
      userId: localStorage.getItem("userId") || "",
      id: e.currentTarget.id,
    };

    await dispatch(fetchUpdatePost(data));
    await dispatch(fetchPostsByUserId(data.userId));
  };
  const hundleCancelButtonClick = () => {
    setEditMode(false);
  };

  return (
    <div className={classes.editContent}>
      <input
        className={classes.input}
        type="text"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <textarea
        className={classes.textarea}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <div className={classes.btnGroup}>
        <Button
          id={post.id}
          value="Save"
          onClick={hundleSaveButtonClick}
          title="Save"
        />
        <Button
          value="Cancel"
          onClick={hundleCancelButtonClick}
          title="Cancel"
        />
      </div>
    </div>
  );
};
export default EditPost;
