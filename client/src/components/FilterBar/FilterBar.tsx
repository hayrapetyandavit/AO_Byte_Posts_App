import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../types/stateType";
import { fetchPostsAuthors } from "../../redux/actions/postsActions";

import Select from "../Select/Select";

import classes from "./style.module.scss";

const FilterBar: FC = () => {
  const [isFiltersShow, setFiltersShow] = useState(false);
  const theme = useSelector((state: StateType) => state.theme.theme);
  const { authors } = useSelector((state: StateType) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAuthors());
  }, [dispatch]);

  const handleButtonClick = () => {
    setFiltersShow((prevState) => !prevState);
  };

  const contentStyle = isFiltersShow ? { display: "block" } : undefined;

  return (
    <>
      <button
        className={theme === "dark" ? classes.darkFlag : classes.flag}
        onClick={handleButtonClick}
      ></button>
      <div
        className={theme === "dark" ? classes.darkContent : classes.content}
        style={contentStyle}
      >
        <div className={classes.filters}>
          <Select
            title="category"
            value={["all", "programming", "space", "sport"]}
            onClick={handleButtonClick}
          />
          <Select title="author" value={authors} onClick={handleButtonClick} />
          <Select title="date" value={["all", "1 day", "1 week", "1 month"]} onClick={handleButtonClick}/>
          <Select title="sort by" value={["creation date", "post rate"]} onClick={handleButtonClick}/>
        </div>
        <button className={classes.closeIcon} onClick={handleButtonClick} title="Close">
          &#10005;
        </button>
      </div>
    </>
  );
};

export default FilterBar;
