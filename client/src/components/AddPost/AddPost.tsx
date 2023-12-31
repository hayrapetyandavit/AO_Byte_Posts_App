import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCreatePost,
  fetchPostsByUserId,
} from "../../redux/actions/postsActions";
import { StateType } from "../../types/stateType";
import { notify } from "../../utils/notifyMessage";
import { scrollToTop } from "../../utils/scrollToTop";
import { useInputChange } from "../../hooks/useInputCHange";
import { categoriesMockData } from "../../constants/constants";

import Input from "../Input/Input";
import Button from "../Button/Button";

import classes from "./style.module.scss";

const AddPost: FC = () => {
  const theme = useSelector((state: StateType) => state.theme.theme);

  const dispatch = useDispatch();

  const initialState = {
    title: "",
    content: "",
    category: "",
  };

  const { values, handleInputChange } = useInputChange(initialState);

  const handleButtonClick = async () => {
    const { title, content, category } = values;

    const author = localStorage.getItem("user") || "";
    const userId = localStorage.getItem("userId") || "";

    if (!title || !content) {
      return notify("Inputs are required!");
    }

    const data = {
      title,
      content,
      category,
      author,
      userId,
    };

    await dispatch(fetchCreatePost(data));
    scrollToTop();
    await dispatch(fetchPostsByUserId(userId));
  };

  const darkModeStyle = {
    color: "#fff",
    background: "#1a202c",
  };

  return (
    <div className={classes.content}>
      <Input
        type="text"
        name="title"
        placeholder="Title..."
        value={values.title}
        onChange={
          handleInputChange as React.ChangeEventHandler<HTMLInputElement>
        }
      />
      <div className={classes.textareaGroup}>
        <textarea
          name="content"
          autoComplete="off"
          placeholder=""
          required={true}
          className={classes.textarea}
          value={values.content}
          onChange={
            handleInputChange as React.ChangeEventHandler<HTMLTextAreaElement>
          }
          style={theme === "dark" ? darkModeStyle : undefined}
        />
        <label
          htmlFor="content"
          className={classes.label}
          style={theme === "dark" ? darkModeStyle : undefined}
        >
          Content...
        </label>
      </div>
      <div className={classes.selectGroup}>
        {/* <Select title="Categories" value={["programming", "spave", "space"]} /> */}
        <select
          name="category"
          autoComplete="off"
          placeholder=""
          required={true}
          className={classes.select}
          value={values.category}
          onChange={
            handleInputChange as React.ChangeEventHandler<HTMLSelectElement>
          }
          style={theme === "dark" ? darkModeStyle : undefined}
        >
          <option value="" disabled hidden>
            Categories
          </option>
          {categoriesMockData.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Button value="Add Post" onClick={handleButtonClick} title="Add post" />
    </div>
  );
};

export default AddPost;
