import styles from "../assets/styles/Header.module.scss"
import {NavLink} from "react-router-dom"
import {MAIN_PAGE_ROUTE} from "../utils/consts";

function Header() {
  return (
    <header className={styles.header}>
      <NavLink to={MAIN_PAGE_ROUTE}>Главная страница</NavLink>
    </header>
  );
}

export default Header