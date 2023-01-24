export interface CellPosition {
  row: number
  col: number
}

export type Cell = number | number[]
export type SudokuSegment = Cell[]
export type Sudoku = SudokuSegment[]

export enum InputTool {
  digit="digit",
  centre="centre",
  corner="corner",
  color="color"
}

export const colors = ["lightgreen", "burlywood", "gainsboro", "skyblue", "lightcoral" , "navajowhite", "plum", "pink" , "lemonchiffon", "white"] as const;
export type Color = typeof colors[number];





