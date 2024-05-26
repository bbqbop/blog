import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <NavBar className={styles.navbar} />
      <Footer className={styles.footer} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
