import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { genId } from "../../utils/genId";
import {
  setCategoryFilter,
  setAuthorFilter,
  setDateFilter,
  setSort,
} from "../../redux/actions/filtersAction";
import { StateType } from "../../types/stateType";
import { fetchPostsWithPagination } from "../../redux/actions/postsActions";

import classes from "./style.module.scss";

interface IProps {
  title: string;
  value: string[];
}

const Select: FC<IProps> = (props) => {
  const { title, value } = props;
  const [selectedValue, setSelectedValue] = useState<string>("");

  const theme = useSelector((state: StateType) => state.theme.theme);

  const dispatch = useDispatch();

  const handleMonthChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    
    switch (e.target.name) {
    case "category":
      await dispatch(setCategoryFilter(e.target.value));
      break;
    case "author":
      await dispatch(setAuthorFilter(e.target.value));
      break;
    case "date":
      await dispatch(setDateFilter(e.target.value));
      break;
    case "sort by":
      await dispatch(setSort(e.target.value));
      break;
    default:
      break;
    }

    dispatch(fetchPostsWithPagination());
  };

  return (
    <div className={classes.list}>
      <div className={classes.title}>
        {selectedValue ? selectedValue : title}
      </div>
      <div className={classes.content}>
        {value.map((item) => {
          return (
            <label key={genId()}>
              <input
                type="radio"
                name={title}
                value={item}
                checked={selectedValue === item}
                onChange={handleMonthChange}
                className={theme === "dark" ? classes.darkMode : undefined}
              />
              <span>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
