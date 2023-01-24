import MainLayout from "../layouts/MainLayout"
import styles from "../assets/styles/MainPage.module.scss";
import sudoku from "../utils/sudokuList.json"
import {initSudoku} from "../store/sudokuSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import {Sudoku} from "../types";
import randomIntFromInterval from "../utils/randomFromInterval";
import {useNavigate} from "react-router-dom";
import {SUDOKU_PAGE_ROUTE} from "../utils/consts";

function MainPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const selectSudoku = (difficulty: string) => {
    let givenSudoku = [] as Sudoku[]
    switch (difficulty) {
      case "easy":
        givenSudoku = sudoku.easy
        break
      case "hard":
        givenSudoku = sudoku.hard
        break
      case "medium":
        givenSudoku = sudoku.medium
    }
    dispatch(initSudoku(givenSudoku[randomIntFromInterval(0, givenSudoku.length - 1)]))
    navigate(SUDOKU_PAGE_ROUTE)
  }

  return (
    <MainLayout>
      <div className={styles.MainPage}>
        <button className={styles.button} onClick={() => selectSudoku("easy")}>Легкие судоку</button>
        <button className={styles.button} onClick={() => selectSudoku("medium")}>Средние судоку</button>
        <button className={styles.button} onClick={() => selectSudoku("hard")}>Сложные судоку</button>
      </div>
    </MainLayout>
  );
}

export default MainPage;