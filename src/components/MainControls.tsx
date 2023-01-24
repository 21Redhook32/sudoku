import styles from "../assets/styles/ControlPad.module.scss";
import {clearCell, selectInputTool, setColor, setInputTool, setSudokuCell} from "../store/sudokuSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {Color,colors, InputTool} from "../types";

const MainControls = () => {
  const dispatch = useAppDispatch()
  const inputTool = useAppSelector(selectInputTool)

  const addClassIfInputToolSelected = (tool: InputTool) => {
    if(inputTool === tool){
      return ` ${styles.selected}`
    }else{
      return ""
    }
  }

  const numberButtonHandler = (value: number) => {
    if(value === 0) {
      dispatch(clearCell())
    }else{
      dispatch(setSudokuCell(value))
    }
  }

  const colorButtonHandler = (color: Color) => {
    dispatch(setColor(color))
  }

  const clearButtonHandler = () => {
    dispatch(clearCell())
  }


  const selectTool = (tool: InputTool) => {
    dispatch(setInputTool(tool))
  }

  return (
    <div className={styles.mainControls}>
      <div className={styles.inputButtons}>
        {inputTool === InputTool.color
          ? colors.map(color =>
              <button
                className={styles.button}
                key={color}
                onClick={() => colorButtonHandler(color)}
              >
                <div
                  className={styles.color}
                  style={{backgroundColor: color}}
                />
              </button>
            )
          : [1,2,3,4,5,6,7,8,9,0].map(number =>
              <button
                className={styles.button}
                key={number}
                onClick={() => numberButtonHandler(number)}
              >
                <span className={styles[inputTool]}>{number}</span>
              </button>
            )
        }

        <button className={styles.button} onClick={clearButtonHandler}>
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"/>
            </svg>
          </i>
        </button>
      </div>

      <div className={styles.toolButtons}>
        <button
          className={styles.button + addClassIfInputToolSelected(InputTool.digit)}
          onClick={() => selectTool(InputTool.digit)}>
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                 fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path
                d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              <g transform="translate(7.75 17.5) scale(0.0075 -0.0075)">
                <path
                  d="M832 877q0 152 -28 247.5t-77 147.5q-44 48 -89 66t-99 18q-123 0 -196 -88t-73 -255q0 -94 24 -155t78 -105q38 -31 86 -41.5t103 -10.5q64 0 138 22.5t129 59.5q1 15 2.5 39.5t1.5 54.5zM67 1005q0 115 37.5 210t102.5 164q62 66 151.5 103t181.5 37q103 0 186.5 -34.5 t144.5 -99.5q77 -82 119.5 -215t42.5 -336q0 -185 -41.5 -350.5t-122.5 -274.5q-86 -116 -206.5 -177t-297.5 -61q-40 0 -85 4.5t-84 16.5v191h10q25 -14 78 -27t108 -13q196 0 308 129t127 369q-80 -54 -152.5 -79t-157.5 -25q-83 0 -151 18t-137 70q-80 61 -121 154.5 t-41 225.5z"/>
              </g>
            </svg>
          </i>
        </button>
        <button
          className={styles.button + addClassIfInputToolSelected(InputTool.corner)}
          onClick={() => selectTool(InputTool.corner)}
        >
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                 fill="currentColor">
              <path
                d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              <path transform="translate(6.2 11.2) scale(0.0035 -0.0035)"
                    d="M1179 0h-984v260h314v787h-314v243q69 0 137 9t109 29q48 24 74.5 64.5t30.5 100.5h326v-1233h307v-260z"/>
              <path transform="translate(13.2 11.2) scale(0.0035 -0.0035)"
                    d="M1245 0h-1094v243q139 110 249.5 208t194.5 186q109 115 158 202t49 179q0 104 -62 159.5t-173 55.5q-57 0 -107.5 -14t-102.5 -36q-51 -23 -87 -47l-54 -36h-29v325q63 30 197 61.5t258 31.5q265 0 401.5 -118t136.5 -332q0 -132 -62 -258.5t-206 -271.5 q-90 -89 -175 -158.5t-123 -98.5h631v-281z"/>
              <path transform="translate(6.2 18) scale(0.0035 -0.0035)"
                    d="M1208 451q0 -109 -40.5 -199t-118.5 -153q-79 -63 -185.5 -96.5t-259.5 -33.5q-174 0 -298.5 29t-202.5 65v323h36q82 -52 192.5 -90t201.5 -38q54 0 117.5 9.5t106.5 41.5q34 25 54.5 61.5t20.5 103.5q0 66 -29 101.5t-77 51.5q-48 17 -115 19t-118 2h-64v262h59 q68 0 125 6t97 24q40 19 62.5 53t22.5 92q0 45 -21 73.5t-52 44.5q-36 18 -84 24t-82 6q-55 0 -112 -13t-111 -33q-42 -16 -88 -41.5t-68 -38.5h-31v319q77 33 207.5 63.5t266.5 30.5q133 0 230.5 -23t166.5 -67q76 -47 114 -119.5t38 -163.5q0 -127 -73.5 -222.5 t-193.5 -123.5v-14q53 -8 103.5 -27t98.5 -62q45 -39 74.5 -100.5t29.5 -146.5z"/>
            </svg>
          </i>
        </button>
        <button
          className={styles.button + addClassIfInputToolSelected(InputTool.centre)}
          onClick={() => selectTool(InputTool.centre)}
        >
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                 fill="currentColor">
              <path
                d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              <path transform="translate(7.6, 14.5) scale(0.0035 -0.0035)"
                    d="M1179 0h-984v260h314v787h-314v243q69 0 137 9t109 29q48 24 74.5 64.5t30.5 100.5h326v-1233h307v-260z"/>
              <path transform="translate(11.6, 14.5) scale(0.0035 -0.0035)"
                    d="M1245 0h-1094v243q139 110 249.5 208t194.5 186q109 115 158 202t49 179q0 104 -62 159.5t-173 55.5q-57 0 -107.5 -14t-102.5 -36q-51 -23 -87 -47l-54 -36h-29v325q63 30 197 61.5t258 31.5q265 0 401.5 -118t136.5 -332q0 -132 -62 -258.5t-206 -271.5 q-90 -89 -175 -158.5t-123 -98.5h631v-281z"/>
            </svg>
          </i>
        </button>
        <button
          className={styles.button + addClassIfInputToolSelected(InputTool.color)}
          onClick={() => selectTool(InputTool.color)}
        >
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path
                d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
            </svg>
          </i>
        </button>
      </div>
    </div>
  );
};

export default MainControls;