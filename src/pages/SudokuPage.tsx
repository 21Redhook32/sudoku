import styles from "../assets/styles/SudokuPage.module.scss"
import MainLayout from "../layouts/MainLayout"
import SudokuGrid from "../components/SudokuGrid";
import ControlPad from "../components/ControlPad";


function SudokuPage() {

  return (
    <MainLayout>
      <div className={styles.SudokuPage}>
        <SudokuGrid/>
        <ControlPad/>
      </div>
    </MainLayout>
  );
}


export default SudokuPage;