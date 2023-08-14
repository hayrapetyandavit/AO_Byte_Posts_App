import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StateType } from "../../types/stateType";
import { fetchPostsAuthors } from "../../redux/actions/postsActions";

import Select from "../Select/Select";

import classes from "./style.module.scss";

const FilterBar: FC = () => {
  const theme = useSelector((state: StateType) => state.theme.theme);
  const { authors } = useSelector((state: StateType) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAuthors());
  }, [dispatch]);

  const contentStyle =
    theme === "dark" ? { background: "#1a202c" } : undefined;

  return (
    <div className={classes.content} style={contentStyle}>
      <div className={classes.filters}>
        <Select
          title="category"
          value={["all", "programming", "space", "sport"]}
        />
        <Select
          title="author"
          value={authors}
        />
        <Select title="date" value={["all", "1 day", "1 week", "1 month"]} />
      </div>
      <div className={classes.sorts}>
        <Select title="sort by" value={["creation date", "post rate"]} />
      </div>
    </div>
  );
};

export default FilterBar;
