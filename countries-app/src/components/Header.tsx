import React from "react"
import styles from "../scss/Header.module.scss"
import ToggleSwitch from "./UI/ToggleSwitch"
import logo from "../assets/images/logo-globe.png"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import classNames from "classnames";

const Header = () => {
  const currentStyle = useAppSelector((state) => state.theme.currentStyle);

  return (
    <section className={classNames(styles.header, styles[currentStyle])}>
      <div className={styles.logo}>
        <img className={styles.img} src={logo} alt="logo" />
        <p className={classNames(styles.text, styles[currentStyle])}>countries</p>
      </div>

      <ToggleSwitch />
    </section>
  )
}

export default Header
