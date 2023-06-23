import styles from "./scss/App.module.scss"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CountryList from "./components/CountryList"
import Country from "./components/Country"
import lightBackground from "./assets/background/background-mobile.jpg"
import darkBackground from "./assets/background/background-mobile-dark.jpg"
import lightDesktopBackground from "./assets/background/background-desktop.jpg"
import darkDesktopBackground from "./assets/background/background-desktop-dark.jpg"
import ScrollToTopFab from "./components/UI/ScrollToTopFab"
import styled, { createGlobalStyle } from "styled-components"
import LazyBackgroundImage from "./components/UI/LazyBackgroundImage"
import { useAppSelector } from "./app/hooks"
import { useMediaQuery } from "react-responsive"

function App() {
  const currentStyle = useAppSelector((state) => state.theme.currentStyle);

  const isDesktop = useMediaQuery({ maxWidth: 992 });

  const lightBackgroundImage = !isDesktop
    ? lightDesktopBackground
    : lightBackground;
  const darkBackgroundImage = !isDesktop
    ? darkDesktopBackground
    : darkBackground;

  const background =
    currentStyle === "light" ? lightBackgroundImage : darkBackgroundImage;
  
  return (<>
    <LazyBackgroundImage img={background}>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:cca3" element={<Country />} />
        </Routes>
      </div>
      
    </LazyBackgroundImage>
    <ScrollToTopFab />
    </>
  );
}

export default App;