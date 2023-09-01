import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

import AddComment from "../AddComment/AddComment";

import { StateType } from "../../types/stateType";

import classes from "./style.module.scss";

interface IProps {
  postId: string;
  parentId: string;
}

const ReplyComment: FC<IProps> = (props) => {
  const { postId, parentId } = props;
  const [isReply, setReply] = useState(false);

  const { userId } = useSelector((state: StateType) => state.auth);

  const handleReplyClick = () => {
    setReply((prevState) => !prevState);
  };

  if (!userId) {
    return null;
  }

  return (
    <div>
      <span className={classes.replyLink} onClick={handleReplyClick}>
        reply &#10139;
      </span>
      {isReply && <AddComment postId={postId} parentId={parentId} />}
    </div>
  );
};

export default ReplyComment;
