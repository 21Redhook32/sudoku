import {Cell, CellPosition} from "../types";
import {MouseEvent} from "react";
import useAppSelector from "../hooks/useAppSelector";
import {
  selectCellColor,
  selectCellIsGiven,
  selectCellIsSelected,
  selectCellIsWrong,
  selectCellCornerPencilMarks
} from "../store/sudokuSlice";
import styles from "../assets/styles/SudokuGrid.module.scss"

interface SudokuCellProps {
  value: Cell,
  row: number,
  col: number,
  onMouseDown: (event: MouseEvent, cellPosition: CellPosition) => void,
  onMouseEnter: (cellPosition: CellPosition) => void,
}

const SudokuCell = ({value, row, col, onMouseDown, onMouseEnter}: SudokuCellProps) => {

  const cellPosition = { row, col }
  const isGiven = useAppSelector(selectCellIsGiven(cellPosition))
  const isSelect = useAppSelector(selectCellIsSelected(cellPosition))
  const isWrong = useAppSelector(selectCellIsWrong(cellPosition))
  const color = useAppSelector(selectCellColor(cellPosition))
  const cornerPencilMarks = useAppSelector(selectCellCornerPencilMarks(cellPosition))

  const addCellClasses = () => {
    let cellClasses = " "
    if(isSelect) cellClasses += ` ${styles.selected}`
    if(isGiven) cellClasses += ` ${styles.given}`
    if(isWrong) cellClasses += ` ${styles.wrong}`
    cellClasses += ` ${styles[color]}`
    return cellClasses
  }

  return (
    <div
      className={styles.cell + addCellClasses()}
      onMouseDown={(event) => onMouseDown(event, cellPosition)}
      onMouseEnter={() => onMouseEnter(cellPosition)}
    >
      {
        Array.isArray(value)
        ?
          <div className={styles.centrePencilMarks}>
            { value.slice().sort() }
          </div>
        :
          value || ""
      }

      {
        Array.isArray(cornerPencilMarks) &&
          <div className={styles.cornerPencilMarks}>
            {
              cornerPencilMarks.map(number =>
                <span key={number}>
                  {number}
                </span>
              )
            }
          </div>
      }
    </div>
  )
}

export default SudokuCell;