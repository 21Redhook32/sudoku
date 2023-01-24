import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Cell, CellPosition, Color, InputTool, Sudoku} from "../types";
import SudokuSolver from "../utils/SudokuSolver";


export interface SudokuState {
  givenSudoku: Sudoku,
  sudoku: Sudoku,
  errors: CellPosition[],
  selectedCells: CellPosition[],
  undoList: Sudoku[],
  redoList: Sudoku[],
  inputTool: InputTool,
  sudokuColors: Color[][],
  cornerPencilMarks: Sudoku
}

const initialState: SudokuState = {
  givenSudoku: [],
  sudoku: [],
  errors: [],
  selectedCells: [{row: 0, col: 0}],
  undoList: [],
  redoList: [],
  inputTool: InputTool.digit,
  sudokuColors: new Array(9).fill(new Array(9).fill("white")),
  cornerPencilMarks: []
};


export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    initSudoku: (state, {payload}: PayloadAction<Sudoku>) => {
      state.givenSudoku = payload
      state.sudoku = payload
      state.cornerPencilMarks = payload
      state.sudokuColors = initialState.sudokuColors
      state.selectedCells = initialState.selectedCells
      state.undoList = initialState.undoList
      state.redoList = initialState.redoList
      state.inputTool = initialState.inputTool
      state.errors = initialState.errors
    },
    setInputTool: (state, {payload}: PayloadAction<InputTool>) => {
      state.inputTool = payload
    },
    setSudokuCell: (state, {payload}: PayloadAction<number>) => {
      if (!state.selectedCells.length) return
      state.undoList.push(JSON.parse(JSON.stringify(state.sudoku)))

      let updated = false

      state.selectedCells.forEach(cell => {
        const givenSudokuCell = state.givenSudoku[cell.row][cell.col]
        if (givenSudokuCell !== 0)
          return
        if (state.inputTool === InputTool.digit && state.sudoku[cell.row][cell.col] !== payload) {
          updated = true
          state.redoList = []
          state.cornerPencilMarks[cell.row][cell.col] = 0
          state.sudoku[cell.row][cell.col] = payload
        }
        if (state.inputTool === InputTool.centre) {
          const currentCell = JSON.parse(JSON.stringify(state.sudoku[cell.row][cell.col]))
          if (Array.isArray(currentCell)) {
            if (!currentCell.includes(payload)) {
              currentCell.push(payload);
            } else {
              currentCell.splice(currentCell.indexOf(payload), 1);
            }
            updated = true
            state.redoList = []
            state.sudoku[cell.row][cell.col] = currentCell
          } else {
            state.sudoku[cell.row][cell.col] = [payload]
            updated = true
            state.redoList = []
          }
        }
        if (state.inputTool === InputTool.corner) {
          const cornerPencilMarks = JSON.parse(JSON.stringify(state.cornerPencilMarks[cell.row][cell.col]))
          const currentCell = JSON.parse(JSON.stringify(state.sudoku[cell.row][cell.col]))

          if(!Array.isArray(currentCell) && currentCell !== 0){
            return
          }
          if (Array.isArray(cornerPencilMarks)) {
            if (!cornerPencilMarks.includes(payload)) {
              cornerPencilMarks.push(payload);
            } else {
              cornerPencilMarks.splice(cornerPencilMarks.indexOf(payload), 1);
            }
            state.cornerPencilMarks[cell.row][cell.col] = cornerPencilMarks
          } else {
            state.cornerPencilMarks[cell.row][cell.col] = [payload]
          }
        }
      })
      if (!updated) {
        state.undoList.pop()
      }
    },
    clearCell: (state) => {
      state.undoList.push(JSON.parse(JSON.stringify(state.sudoku)))
      let updated = false
      state.selectedCells.forEach(cell => {
        const givenSudokuCell = state.givenSudoku[cell.row][cell.col]
        if (state.inputTool === InputTool.color) {
          state.sudokuColors[cell.row][cell.col] = "white"
          return
        }
        if (state.inputTool === InputTool.corner) {
          state.cornerPencilMarks[cell.row][cell.col] = 0
          return
        }
        if (givenSudokuCell === 0) {
          state.sudoku[cell.row][cell.col] = 0
          state.cornerPencilMarks[cell.row][cell.col] = 0
          updated = true
        }
      })
      if (!updated)
        state.undoList.pop()
    },
    setColor: (state, {payload}: PayloadAction<Color>) => {
      state.selectedCells.forEach(cell => {
        state.sudokuColors[cell.row][cell.col] = payload
      })
    },
    checkSudoku: (state) => {
      const sudokuCopy = JSON.parse(JSON.stringify(state.sudoku))
      const givenSudokuCopy = JSON.parse(JSON.stringify(state.givenSudoku))
      state.errors = SudokuSolver.check(givenSudokuCopy, sudokuCopy)
    },
    fillCandidates: (state) => {
      state.redoList = []
      state.undoList.push(JSON.parse(JSON.stringify(state.sudoku)))
      state.sudoku = SudokuSolver.fillAllCandidates(JSON.parse(JSON.stringify(state.sudoku)))
    },
    addSelectedCell: (state, {payload}: PayloadAction<CellPosition>) => {
      state.errors = []
      if (!state.selectedCells.some((cell) => cell.row === payload.row && cell.col === payload.col))
        state.selectedCells.push(payload)
    },
    clearSelectedCells: (state) => {
      state.selectedCells = []
    },
    selectAllCells: (state) => {
      state.selectedCells = []
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          state.selectedCells.push({row: i, col: j})
        }
      }
    },
    moveSelectedCell: (state, {payload}: PayloadAction<{ x: number, y: number }>) => {
      if (state.selectedCells.length !== 1) return
      let selectedCellCol = state.selectedCells[0].col + payload.x
      let selectedCellRow = state.selectedCells[0].row + payload.y
      if (selectedCellCol <= 8 && selectedCellCol >= 0 && selectedCellRow <= 8 && selectedCellRow >= 0) {
        state.selectedCells = [{row: selectedCellRow, col: selectedCellCol}]
      }
    },
    undo: (state) => {
      if (!state.undoList.length) return
      const curSudoku = state.sudoku
      const prevSudoku = state.undoList.pop() as Sudoku
      state.redoList.push(JSON.parse(JSON.stringify(curSudoku)))
      state.sudoku = prevSudoku
    },
    redo: (state) => {
      if (!state.redoList.length) return
      const curSudoku = state.sudoku
      const prevSudoku = state.redoList.pop() as Sudoku
      state.undoList.push(JSON.parse(JSON.stringify(curSudoku)))
      state.sudoku = prevSudoku
    }
  }
});



export const selectSudoku = (state: RootState): Sudoku => state.sudoku.sudoku

export const selectInputTool = (state: RootState): InputTool => state.sudoku.inputTool

export const selectCellColor = ({row, col}: CellPosition) =>
  (state: RootState): Color => state.sudoku.sudokuColors[row][col]

export const selectCellIsGiven = ({row, col}: CellPosition) =>
  (state: RootState): Boolean => state.sudoku.givenSudoku[row][col] !== 0

export const selectCellIsSelected = ({row, col}: CellPosition) => (state: RootState): Boolean =>
  state.sudoku.selectedCells.some((cell) => cell.row === row && cell.col === col)

export const selectCellIsWrong = ({row, col}: CellPosition) => (state: RootState): Boolean =>
  state.sudoku.errors.some((cell) => cell.row === row && cell.col === col)

export const selectCellCornerPencilMarks = ({row, col}: CellPosition) => (state: RootState): Cell =>
  state.sudoku.cornerPencilMarks[row][col]



export default sudokuSlice.reducer;

export const {
  initSudoku, checkSudoku, setSudokuCell, clearSelectedCells, moveSelectedCell,
  addSelectedCell, redo, undo, fillCandidates, setInputTool, setColor,
  clearCell, selectAllCells
} = sudokuSlice.actions;