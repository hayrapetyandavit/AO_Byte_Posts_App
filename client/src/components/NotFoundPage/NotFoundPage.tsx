import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

import classes from "./style.module.scss";

interface IProps {
  message: string;
}

const NotFoundPage: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={classes.content}>
      <div className={classes.contentWrrap}>
        <div>
          <h1 className={classes.title}>{props.message}</h1>
          <span className={classes.subtitle}>
            we are sorry but this page is no longer available on our web site.
          </span>
        </div>
        <Button value="go to home page" onClick={handleClick} />
      </div>
    </div>
  );
};

export default NotFoundPage;
