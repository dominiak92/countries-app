import React from "react"
import styles from "../scss/Header.module.scss"
import ToggleSwitch from "./UI/ToggleSwitch"
import logo from "../assets/images/logo-globe.png"

const Header = () => {
  return (
    <section className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src={logo} alt="logo" />
        <p className={styles.text}>countries</p>
      </div>

      <ToggleSwitch />
    </section>
  )
}

export default Header
