import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllComments,
  fetchUpdateComment,
} from "../../redux/actions/commentsActions";
import { StateType } from "../../types/stateType";
import { AppThunkDispatch } from "../../redux/store";
import { CommentType } from "../../types/commentsType";
import { fetchPostsByUserId } from "../../redux/actions/postsActions";

import Button from "../Button/Button";

import classes from "./style.module.scss";

interface IProps {
  comment: CommentType;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditComment: FC<IProps> = (props) => {
  const { comment, setCommentId, setEditMode } = props;

  const [commentContent, setCommentContent] = useState("");

  const { userId } = useSelector((state: StateType) => state.auth);

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    setCommentContent(comment.content);
  }, [comment]);

  const hundleSaveButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data = {
      content: commentContent,
      userId,
      id: e.currentTarget.id,
    };

    await dispatch(fetchUpdateComment(data));
    await dispatch(fetchAllComments());
    await dispatch(fetchPostsByUserId());
  };

  const hundleCancelButtonClick = () => {
    setCommentId("");
    setEditMode(false);
  };

  return (
    <div className={classes.editContent}>
      <input
        className={classes.input}
        type="text"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />

      <div className={classes.btnGroup}>
        <Button
          id={comment.id}
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
export default EditComment;
