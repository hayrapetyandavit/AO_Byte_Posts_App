import React, { FC } from "react";

import { genId } from "../../utils/genId";

import classes from "./style.module.scss";

const Skeleton: FC = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.content}>
        <div className={classes.title}></div>
        <div className={classes.textContent}></div>
        <div className={classes.inputGroup}>
          <div className={classes.input}></div>
          <div className={classes.button}></div>
          <div className={classes.button}></div>
        </div>
        <div className={classes.comment}>
          <div className={classes.stars}></div>
        </div>
        <div className={classes.stars}>
          {[...Array(5)].map(() => {
            return (
              <span key={genId()} className={classes.star}>
                &#9733;
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
