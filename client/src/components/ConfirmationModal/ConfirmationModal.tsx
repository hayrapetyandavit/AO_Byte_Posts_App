import React, { FC, useRef } from "react";

import { useSelector } from "react-redux";

import { StateType } from "../../types/stateType";
import { useOutsideClick } from "../../hooks/useOutsiseClick";

import classes from "./style.module.scss";

interface IProps {
  id: string;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: () => void;
}

const ConfirmationModal: FC<IProps> = (props) => {
  const { id, onDelete, onCancel } = props;

  const wrapperRef = useRef(null);

  const theme = useSelector((state: StateType) => state.theme.theme);

  useOutsideClick(wrapperRef, onCancel);

  return (
    <div className={classes.overlay}>
      <div className={theme === "dark" ? classes.modalDark : classes.modal}>
        <div className={classes.content} ref={wrapperRef}>
          <h2>Are you sure you want to delete?</h2>
          <p>This action cannot be undone.</p>
          <button className={classes.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button id={id} className={classes.deleteBtn} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
