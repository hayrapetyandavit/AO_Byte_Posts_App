import React, { FC, useState } from "react";

import AddComment from "../AddComment/AddComment";

import classes from "./style.module.scss";

interface IProps {
  postId: string;
  parentId: string;
}

const ReplyComment: FC<IProps> = (props) => {
  const { postId, parentId } = props;
  const [isReply, setReply] = useState(false);

  const handleReplyClick = () => {
    setReply((prevState) => !prevState);
  };

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
