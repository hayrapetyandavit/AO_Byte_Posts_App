import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllComments,
  fetchCreateComment,
} from "../../redux/actions/commentsActions";
import { StateType } from "../../types/stateType";
import { notify } from "../../utils/notifyMessage";
import { AppThunkDispatch } from "../../redux/store";

import Input from "../Input/Input";
import Button from "../Button/Button";

import classes from "./style.module.scss";

interface IProps {
  postId: string;
  parentId?: string;
  handleCommentsSort?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddComment: FC<IProps> = (props) => {
  const { postId, parentId, handleCommentsSort } = props;

  const [content, setContent] = useState("");

  const { user, userId } = useSelector((state: StateType) => state.auth);

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleButtonClick = async () => {
    type DataType = {
      content: string;
      postId: string;
      userId: string;
      author: string;
    } & { parentId?: string };

    if (!content) {
      return notify("input is required!");
    }

    const data: DataType = {
      content,
      postId,
      userId,
      author: user,
    };

    if (props.parentId) {
      data.parentId = parentId;
    }

    await dispatch(fetchCreateComment(data));
    setContent("");
    await dispatch(fetchAllComments());
  };

  return (
    <div className={classes.content}>
      <Input
        type="text"
        placeholder="Add Comment"
        value={content}
        onChange={handleInputChange}
      />
      <div className={classes.btnGroup}>
        <Button value="add" onClick={handleButtonClick} title="Add comment" />
        {!parentId && (
          <Button
            id={postId}
            value="&uarr;&darr;"
            onClick={
              handleCommentsSort ? handleCommentsSort : handleButtonClick
            }
            title="Sort comments"
          />
        )}
      </div>
    </div>
  );
};

export default AddComment;
