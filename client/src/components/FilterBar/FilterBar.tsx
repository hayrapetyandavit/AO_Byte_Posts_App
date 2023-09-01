import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StateType } from "../../types/stateType";
import { AppThunkDispatch } from "../../redux/store";
import { categoriesMockData } from "../../constants/constants";
import { fetchPostsAuthors } from "../../redux/actions/postsActions";

import Select from "../Select/Select";

import classes from "./style.module.scss";

const FilterBar: FC = () => {
  const [isFiltersShow, setFiltersShow] = useState(false);

  const theme = useSelector((state: StateType) => state.theme.theme);
  const { authors } = useSelector((state: StateType) => state.posts);
  const { user } = useSelector((state: StateType) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(fetchPostsAuthors());
  }, [dispatch]);

  const handleButtonClick = () => {
    setFiltersShow((prevState) => !prevState);
  };

  const handleAvatarClick = () => {
    navigate("/home");
  };

  const contentStyle = isFiltersShow ? { display: "block" } : undefined;
  const filtersFlagStyle = !user ? { top: "110px" } : undefined;
  const content = user ? user.slice(0, 1).toUpperCase() : "";

  return (
    <>
      {user && (
        <button
          className={theme === "dark" ? classes.darkAvatar : classes.avatar}
          onClick={handleAvatarClick}
          style={{ content: `"${user}"` }}
          data-content={user}
        >
          {content}
        </button>
      )}
      <button
        className={theme === "dark" ? classes.darkFlag : classes.flag}
        onClick={handleButtonClick}
        style={filtersFlagStyle}
      ></button>
      <div
        className={theme === "dark" ? classes.darkContent : classes.content}
        style={contentStyle}
      >
        <div className={classes.filters}>
          <Select
            title="category"
            value={categoriesMockData}
            onClick={handleButtonClick}
          />
          <Select title="author" value={authors} onClick={handleButtonClick} />
          <Select
            title="date"
            value={["all", "1 day", "1 week", "1 month"]}
            onClick={handleButtonClick}
          />
          <Select
            title="sort by"
            value={["creation date", "post rate"]}
            onClick={handleButtonClick}
          />
        </div>
        <button
          className={classes.closeIcon}
          onClick={handleButtonClick}
          title="Close"
        >
          &#10005;
        </button>
      </div>
    </>
  );
};

export default FilterBar;
