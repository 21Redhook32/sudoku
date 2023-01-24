import {Sudoku, SudokuSegment} from "../types";

class SudokuSolver{

  private _squareCoords = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
  ]

  getRow(board: Sudoku, row: number): SudokuSegment {
    return board[row]
  }

  getColumn(board: Sudoku, column: number): SudokuSegment {
    let col = []
    for (let row = 0; row < 9; row++) {
      col.push(board[row][column]);
    }
    return col
  }

  getSquare(board: Sudoku, square: number): SudokuSegment {
    let cells = []
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (square === this._squareCoords[r][c]) {
          cells.push(board[r][c])
        }
      }
    }
    return cells
  }


  fillCandidatesInTheCell(board: Sudoku, row: number, col: number) {
    const cellSegments = [...this.getRow(board, row), ...this.getColumn(board, col), ...this.getSquare(board, this._squareCoords[row][col])]
    let candidates = []
    for (let p = 1; p <= 9; p++) {
      if (!cellSegments.includes(p)) {
        candidates.push(p)
      }
    }
    if (candidates.length === 1) {
      board[row][col] = candidates[0]
      return true
    } else {
      board[row][col] = candidates
      return false
    }
  }

  isValidSegment(segment: SudokuSegment) {
    let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let sortedSegment = segment.slice().sort()
    return expected.length === sortedSegment.length && expected.every((value, index) =>
      value === sortedSegment[index])
  }

  isSolved(board: Sudoku) {
    if(!Array.isArray(board)) return false
    let valid = true
    for (let r = 0; r < 9 && valid; r++) {
      if (!this.isValidSegment(this.getRow(board, r))) {
        valid = false
      }
    }
    for (let c = 0; c < 9 && valid; c++) {
      if (!this.isValidSegment(this.getColumn(board, c))) {
        valid = false
      }
    }
    for (let q = 1; q < 9 && valid; q++) {
      if (!this.isValidSegment(this.getSquare(board, q))) {
        valid = false
      }
    }
    return valid
  }

  bruteForce(board: Sudoku): boolean {
    // Temporary board for recursion
    let tempBoard = JSON.parse(JSON.stringify(board));

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        // Process each incomplete cell
        if (tempBoard[r][c] === 0 || Array.isArray(tempBoard[r][c])) {
          this.fillCandidatesInTheCell(tempBoard, r, c)
          if (this.isSolved(tempBoard)) return tempBoard;

          let cell = tempBoard[r][c]
          // If we just created a list of candidates, iterate them and recurse
          if (Array.isArray(cell)) {
            for (let i = 0; i < cell.length; i++) {
              let TempBoard2 = JSON.parse(JSON.stringify(tempBoard));
              // Choose a value
              TempBoard2[r][c] = cell[i]
              // Recurse again using new board
              let completed_board = this.bruteForce(TempBoard2)
              if (completed_board) {
                return completed_board;
              }
            }
            return false
          }
        }
      }
    }

    return false;

  }


  appearsOnceOnly(board: Sudoku, candidates: number[], segment: SudokuSegment, row: number, col: number) {
    let updated = false
    for (let i = 0; i < candidates.length; i++) {
      let candidate = candidates[i]
      let candidatesCount = 0
      segment.forEach(cell => {
        if (Array.isArray(cell)) {
          if (cell.includes(candidate)) {
            candidatesCount++
          }
        } else {
          if (cell === candidate) {
            candidatesCount++
          }
        }
      })
      if (candidatesCount === 1) {
        board[row][col] = candidate
        updated = true
        break
      }
    }
    return updated
  }

  fillAllCandidates(board: Sudoku) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0 || Array.isArray(board[r][c])) {
          this.fillCandidatesInTheCell(board, r, c)
        }
      }
    }
    return board
  }


  searchNakedSingles(board: Sudoku) {
    let updated = false

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          updated = this.fillCandidatesInTheCell(board, r, c) || updated
        }
      }
    }

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        let candidates = board[r][c]
        if (Array.isArray(candidates)) {
          updated = this.appearsOnceOnly(board, candidates, this.getRow(board, r), r, c) ||
            this.appearsOnceOnly(board, candidates, this.getColumn(board, c), r, c) ||
            this.appearsOnceOnly(board, candidates, this.getSquare(board, this._squareCoords[r][c]), r, c) || updated
        }
      }
    }

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (Array.isArray(board[r][c])) {
          board[r][c] = 0
        }
      }
    }
    return updated
  }

  solve(board: Sudoku) {
    let updated = true, solved = false

    while (updated && !solved) {
      updated = this.searchNakedSingles(board)
      solved = this.isSolved(board)
    }

    if (!solved) {
      this.bruteForce(board)
      solved = this.isSolved(board)
    }
    if (!solved) return false
    return board
  }

  check(givenBoard: Sudoku, board: Sudoku) {
    let errors = []
    let solvedBoard = this.solve(givenBoard) as Sudoku
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0 && !Array.isArray(board[r][c]) && board[r][c] !== solvedBoard[r][c]) {
          errors.push({row: r,col: c})
        }
      }
    }
    return errors
  }

}

export default new SudokuSolver()

