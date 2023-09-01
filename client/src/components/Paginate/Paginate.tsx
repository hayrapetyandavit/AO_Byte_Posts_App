import React, { FC } from "react";

import { genId } from "../../utils/genId";
import { StateType } from "../../types/stateType";
import { AppThunkDispatch } from "../../redux/store";
import { scrollToTop } from "../../utils/scrollToTop";
import { updateCurrentPage } from "../../redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";

import classes from "./style.module.scss";

interface IProps {
  previousLabel: string;
  nextLabel: string;
  totalPages: number;
}

const Paginate: FC<IProps> = (props) => {
  const { previousLabel, nextLabel } = props;

  const { currentPage, totalPages } = useSelector(
    (state: StateType) => state.posts
  );

  const dispatch = useDispatch<AppThunkDispatch>();

  const handlePageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;

    dispatch(updateCurrentPage(+id));

    scrollToTop();
  };

  const generatePageButtons = (totalPages: number): React.ReactNode => {
    const activeStyle = {
      backgroundColor: "#7f265bd2",
      borderColor: "#7f265bd2",
      color: "#fff",
    };

    return [...Array(totalPages)].map((page, index) => {
      index += 1;
      return (
        <li key={genId()} className={classes.li}>
          <button
            id={`${index}`}
            className={classes.button}
            style={currentPage === index ? activeStyle : undefined}
            onClick={handlePageButtonClick}
            title={`${index} page`}
          >
            {index}
          </button>
        </li>
      );
    });
  };

  const handleButtonClick = (side: "prev" | "next") => {
    if (side === "prev" && currentPage !== 1) {
      dispatch(updateCurrentPage(currentPage - 1));

      scrollToTop();
    }

    if (side === "next" && currentPage !== totalPages) {
      dispatch(updateCurrentPage(currentPage + 1));

      scrollToTop();
    }
  };

  return (
    <div className={classes.content}>
      <ul className={classes.pagination}>
        <li className={classes.li}>
          <button
            className={classes.button}
            onClick={() => handleButtonClick("prev")}
            title="Previous page"
          >
            {previousLabel}
          </button>
        </li>
        {generatePageButtons(totalPages)}
        <li className={classes.li}>
          <button
            className={classes.button}
            onClick={() => handleButtonClick("next")}
            title="Next page"
          >
            {nextLabel}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
