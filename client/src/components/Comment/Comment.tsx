import React, { FC } from "react";
import { useSelector } from "react-redux";

import { genId } from "../../utils/genId";
import { CommentType } from "../../types/commentsType";
import { StateType } from "../../types/stateType";

import StarRating from "../StarRating/StarRating";
import ReplyComment from "../ReplyComment/ReplyComment";

import classes from "./style.module.scss";

interface IProps {
  id: string;
  userId: string;
  comments: { [key: string]: CommentType[] };
}

const Comment: FC<IProps> = (props) => {
  const { id, userId, comments } = props;

  const theme = useSelector((state: StateType) => state.theme.theme);

  const authorNameStyle =
    theme === "dark" ? { background: "transparent" } : undefined;

  return (
    <>
      {comments[id] &&
        comments[id].map((comment) => {
          if (comment.postId === id && !comment.parentId) {
            return (
              <div className={classes.commentWrapp} key={genId()}>
                <div className={classes.commentContent}>
                  <p className={classes.comment} key={genId()}>
                    {comment.content}
                  </p>
                  <span className={classes.authorName} style={authorNameStyle}>
                    {comment.author}
                    <span>
                      {userId === comment.userId ? "(author)" : undefined}
                    </span>
                  </span>
                </div>
                <StarRating commentId={comment.id} currentRate={comment.rate} />
                <ReplyComment postId={id} parentId={comment.id} />
                {comments[comment.id] &&
                  comments[comment.id].map((replyComment) => {
                    return (
                      <div key={genId()}>
                        <p className={classes.nestedComment} key={genId()}>
                          {replyComment.content}
                          {comment.author}
                          {userId === comment.userId ? "Author" : undefined}
                        </p>
                      </div>
                    );
                  })}
              </div>
            );
          }
        })}
    </>
  );
};
export default Comment;
