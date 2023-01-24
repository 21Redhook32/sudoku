import {ReactNode} from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from"../assets/styles/MainLayout.module.scss"

interface MainLayoutProps {
    children: ReactNode
}

function MainLayout({children}: MainLayoutProps) {
  return (
    <div className={styles.MainLayout}>
      <Header/>
      <div className={styles.content}>
        {children}
      </div>
      <Footer/>
    </div>
  );
}

export default MainLayout;