import {clearCell, moveSelectedCell, setSudokuCell} from "../store/sudokuSlice";
import useEventListener from "./useEventListener";
import useAppDispatch from "./useAppDispatch";

const useKeyboardInput = () =>{
  const dispatch = useAppDispatch()

  const KeyDownHandler = (event: KeyboardEvent) => {
    const {key, keyCode} = event
    if (keyCode === 38 || keyCode === 87) {// up arrow or w
      dispatch(moveSelectedCell({x: 0,y: -1}))
    }
    if (keyCode === 40 || keyCode === 83) {// down arrow or s
      dispatch(moveSelectedCell({x: 0,y: 1}))
    }
    if (keyCode === 37 || keyCode === 65) {// left arrow or a
      dispatch(moveSelectedCell({x: -1,y: 0}))
    }
    if (keyCode === 39 || keyCode === 68) {// right arrow or d
      dispatch(moveSelectedCell({x: 1,y: 0}))
    }
    if (keyCode === 8) { //backspace
      dispatch(setSudokuCell(0))
    }
    if (/^[1-9]\d*$/.test(key)) {//1-9
      dispatch(setSudokuCell(parseInt(key)))
    }
    if (keyCode === 48) {//0
      dispatch(clearCell())
    }
  }
  useEventListener("keydown", KeyDownHandler)
}

export default useKeyboardInput