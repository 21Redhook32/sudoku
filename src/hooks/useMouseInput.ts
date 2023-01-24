import useEventListener from "./useEventListener";
import useAppDispatch from "./useAppDispatch";
import {MouseEvent} from "react";
import {CellPosition} from "../types";
import {addSelectedCell, clearSelectedCells, selectAllCells} from "../store/sudokuSlice";


let mouseDown = false

const useMouseInput = () => {
  const dispatch = useAppDispatch()

  const mouseUpHandler = () => {
    if (mouseDown)
      mouseDown = false
  }

  const mouseDownHandler = (event: MouseEvent, cellPosition: CellPosition) => {
    if (!event.ctrlKey)
      dispatch(clearSelectedCells())
    if(!mouseDown)
      dispatch(addSelectedCell(cellPosition))
    mouseDown = true
  }

  const mouseEnterHandler = (cellPosition: CellPosition) => {
    if (mouseDown)
      dispatch(addSelectedCell(cellPosition))
  }
  
  const doubleClickHandler = () => {
    dispatch(selectAllCells())
  }

  useEventListener("mouseup", mouseUpHandler)

  return {mouseDownHandler, mouseEnterHandler, doubleClickHandler}
}

export default useMouseInput