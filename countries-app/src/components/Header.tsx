import React from "react"
import styles from "../scss/Header.module.scss"
import ToggleSwitch from "./UI/ToggleSwitch"
import logo from "../assets/images/logo-globe.png"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import classNames from "classnames"
import { NavLink, Link } from "react-router-dom"

const Header = () => {
  const currentStyle = useAppSelector((state) => state.theme.currentStyle)

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <section className={classNames(styles.header, styles[currentStyle])}>
      <NavLink to="/" onClick={handleLogoClick}>
        <div className={styles.logo}>
          <img className={styles.img} src={logo} alt="logo" />
          <p className={classNames(styles.text, styles[currentStyle])}>
            countries
          </p>
        </div>
      </NavLink>

      <ToggleSwitch />
    </section>
  )
}

export default Header
