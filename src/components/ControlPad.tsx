import styles from "../assets/styles/ControlPad.module.scss"
import MainControls from "./MainControls";
import AuxControls from "./AuxControls";

function ControlPad() {
  return (
    <div className={styles.ControlPad}>
      <MainControls/>
      <AuxControls/>
    </div>
  );
}

export default ControlPad;



