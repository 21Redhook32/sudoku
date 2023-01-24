import SudokuCell from "./SudokuCell";
import {selectSudoku} from "../store/sudokuSlice";
import useAppSelector from "../hooks/useAppSelector";
import styles from "../assets/styles/SudokuGrid.module.scss"
import useKeyboardInput from "../hooks/useKeyboardInput";
import useMouseInput from "../hooks/useMouseInput";

const SudokuGrid = () => {
  const sudoku = useAppSelector(selectSudoku)
  useKeyboardInput()
  const {mouseDownHandler, mouseEnterHandler, doubleClickHandler} = useMouseInput()

  return (
    <div
      className={styles.SudokuGrid}
      onDoubleClick={doubleClickHandler}
    >
        {
          sudoku.map((row, rowIndex) => {
            return (
              <div className={styles.row} key={rowIndex}>
                {
                  row.map((cell, colIndex) =>
                    <SudokuCell
                      key={`${rowIndex}${colIndex}`}
                      value={cell}
                      row={rowIndex}
                      col={colIndex}
                      onMouseDown={mouseDownHandler}
                      onMouseEnter={mouseEnterHandler}
                    />
                  )
                }
              </div>
            )
          })
        }
    </div>
  );
}

export default SudokuGrid;



