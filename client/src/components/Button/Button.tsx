import React, { FC } from "react";

import classes from "./style.module.scss";

interface IProps {
  id?: string;
  title?: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IProps> = (props) => {
  const { id, value, title, onClick } = props;

  return (
    <>
      <button
        id={id}
        className={classes.button}
        title={title}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {value}
        <span className={classes.span}></span>
      </button>
    </>
  );
};

export default Button;
