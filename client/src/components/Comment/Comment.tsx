import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { genId } from "../../utils/genId";
import { StateType } from "../../types/stateType";
import { notify } from "../../utils/notifyMessage";
import { AppThunkDispatch } from "../../redux/store";
import { CommentType } from "../../types/commentsType";
import {
  fetchAllComments,
  fetchDeleteComment,
} from "../../redux/actions/commentsActions";

import Button from "../Button/Button";
import StarRating from "../StarRating/StarRating";
import EditComment from "../EditComment/EditComment";
import ReplyComment from "../ReplyComment/ReplyComment";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

import classes from "./style.module.scss";

interface IProps {
  id: string;
  userId: string;
  comments: { [key: string]: CommentType[] };
}

const Comment: FC<IProps> = (props) => {
  const { id, userId, comments } = props;

  const { commentsByParent, message, error } = useSelector(
    (state: StateType) => state.comments
  );

  const dispatch = useDispatch<AppThunkDispatch>();

  const theme = useSelector((state: StateType) => state.theme.theme);

  const [commentId, setCommentId] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [isShowModal, setShowModal] = useState(false);

  const authorNameStyle =
    theme === "dark" ? { background: "transparent" } : undefined;

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data = {
      userId,
      id: e.currentTarget.id,
    };

    await dispatch(fetchDeleteComment(data));

    if (message) {
      notify(message);
    }
    if (error) {
      notify(error);
    }

    await dispatch(fetchAllComments());
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleDeleteComment(e);
  };

  const onCancel = () => {
    setCommentId("");
    setShowModal(false);
  };

  const deleteEditGroup = (comment: CommentType) => {
    return (
      <>
        <div className={classes.deleteComment}>
          <Button
            id={comment.id}
            value="&#10005;"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setCommentId(e.currentTarget.id);
              setShowModal(true);
            }}
            title="Delete comment"
          />
          {commentId === comment.id &&
            isShowModal &&
            !isEditMode &&
            ReactDOM.createPortal(
              <ConfirmationModal
                id={comment.id}
                onDelete={onDelete}
                onCancel={onCancel}
              />,
              document.getElementById("modal-root") as
                | Element
                | DocumentFragment
            )}
          <Button
            id={comment.id}
            value="&#9998;"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setCommentId(e.currentTarget.id);
              setShowModal(false);
              setEditMode(true);
            }}
            title="Edit comment"
          />
          {commentId === comment.id && isEditMode ? (
            <EditComment
              comment={comment}
              setCommentId={setCommentId}
              setEditMode={setEditMode}
            />
          ) : null}
        </div>
      </>
    );
  };

  return (
    <>
      {comments[id] &&
        comments[id].map((comment) => {
          if (comment.postId === id && !comment.parentId) {
            return (
              <div className={classes.commentWrapp} key={genId()}>
                <div className={classes.commentContent}>
                  <div
                    className={classes.comment}
                    style={comment.edited ? { minHeight: "64px" } : undefined}
                  >
                    {comment.content}
                    {comment.userId === userId
                      ? deleteEditGroup(comment)
                      : null}
                    {comment.edited && (
                      <span className={classes.edited}>edited &#10003;</span>
                    )}
                  </div>
                  <span className={classes.authorName} style={authorNameStyle}>
                    {comment.author}
                    <span>
                      {userId === comment.userId ? "(author)" : undefined}
                    </span>
                  </span>
                </div>
                <StarRating commentId={comment.id} currentRate={comment.rate} />
                <ReplyComment postId={id} parentId={comment.id} />
                {commentsByParent[comment.id] &&
                  commentsByParent[comment.id].map((replyComment) => {
                    return (
                      <div className={classes.commentContent} key={genId()}>
                        <div
                          className={classes.nestedComment}
                          style={
                            replyComment.edited
                              ? { minHeight: "60px" }
                              : undefined
                          }
                        >
                          {replyComment.content}
                          {replyComment.userId === userId
                            ? deleteEditGroup(replyComment)
                            : null}
                          {replyComment.edited && (
                            <span className={classes.edited}>
                              edited &#10003;
                            </span>
                          )}
                        </div>
                        <span
                          className={classes.authorName}
                          style={authorNameStyle}
                        >
                          {replyComment.author}
                          <span>
                            {userId === comment.userId ? "(author)" : undefined}
                          </span>
                        </span>
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
