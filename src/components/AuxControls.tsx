import React from 'react';
import styles from "../assets/styles/ControlPad.module.scss";
import {checkSudoku, fillCandidates, redo, undo} from "../store/sudokuSlice";
import useAppDispatch from "../hooks/useAppDispatch";

const AuxControls = () => {
  const dispatch = useAppDispatch()

  const checkButtonHandler = () => {
    dispatch(checkSudoku())
  }

  const undoButtonHandler = () => {
    dispatch(undo())
  }

  const redoButtonHandler = () => {
    dispatch(redo())
  }

  const autoPencilMarksButtonHandler = () => {
    dispatch(fillCandidates())
  }
  return (
    <div className={styles.auxControls}>
      <button className={styles.button} onClick={undoButtonHandler}>
        <i className={styles.icon}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path
              d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8z"/>
          </svg>
        </i>
      </button>
      <button className={styles.button} onClick={redoButtonHandler}>
        <i className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path
              d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.16 0-7.74 2.42-9.44 5.93-.32.67.04 1.47.75 1.71.59.2 1.23-.08 1.5-.64 1.3-2.66 4.03-4.5 7.19-4.5 1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71H21c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71l-1.89 1.9z"/>
          </svg>
        </i>
      </button>
      <button className={styles.button} onClick={checkButtonHandler}>
        <i className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path
              d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/>
          </svg>
        </i>
      </button>
      <button className={styles.button} onClick={autoPencilMarksButtonHandler}>
        <i className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </i>
      </button>
    </div>
  );
};

export default AuxControls;