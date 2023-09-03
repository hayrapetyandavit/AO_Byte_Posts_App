import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPostsByUserId,
  fetchPostsWithPagination,
} from "../../redux/actions/postsActions";
import {
  fetchAddRateToComment,
  fetchAllComments,
} from "../../redux/actions/commentsActions";
import { StateType } from "../../types/stateType";
import { notify } from "../../utils/notifyMessage";
import { AppThunkDispatch } from "../../redux/store";

import classes from "./style.module.scss";


interface IProps {
  commentId: string;
  currentRate: number;
}

const StarRating: FC<IProps> = (props) => {
  const { commentId, currentRate } = props;

  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(currentRate);

  const {user} = useSelector((state: StateType) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    setRating(currentRate);
  }, [currentRate]);

  const handleClick = async (index: number) => {
    if (!user) {
      return notify("Please log in for add rating!");
    }

    setRating(index);

    const path = location.pathname;

    await dispatch(fetchAddRateToComment({ rate: index, commentId }));
    await dispatch(fetchAllComments());

    if (path === "/home") {
      await dispatch(fetchPostsByUserId());
    } else {
      await dispatch(fetchPostsWithPagination());
    }
  };

  const handleMouseEnter = (index: number) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className={classes.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            key={index}
            className={index <= (hover || rating) ? classes.on : classes.off}
            style={
              index <= (hover || rating) ? { color: "#f2f532" } : undefined
            }
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            title={`${index}`}
          >
            <span className={classes.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
