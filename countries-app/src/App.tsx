import styles from "./scss/App.module.scss"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CountryList from "./components/CountryList"
import Country from "./components/Country"
import lightBackground from "./assets/background/background-mobile.jpg"
import darkBackground from "./assets/background/background-mobile-dark.jpg"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { current } from "@reduxjs/toolkit"

function App() {
  const currentStyle = useAppSelector((state) => state.theme.currentStyle)
  const background = currentStyle === 'light' ? lightBackground : darkBackground
  return (
    <div
      className={styles.app}
      style={{
        backgroundImage: `url(${background})`,
        transition: "all 0.3s ease"
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </div>
  )
}

export default App
