import * as React from 'react';

import {MAIN_PAGE_ROUTE, SUDOKU_PAGE_ROUTE} from "./utils/consts";
import MainPage from "./pages/MainPage";
import SudokuPage from "./pages/SudokuPage";
import NoMatchPage from "./pages/NoMatchPage";


export const routes = [
  {
    path: MAIN_PAGE_ROUTE,
    element: <MainPage/>
  },
  {
    path: SUDOKU_PAGE_ROUTE,
    element: <SudokuPage/>
  },
  {
    path: "*",
    element: <NoMatchPage/>
  }
]