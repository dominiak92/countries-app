import React from "react"
import Filter from "./UI/Filter"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
import { getCountries, setFilteredCountries } from "../features/country/countrySlice"
import classNames from "classnames"
import Fab from "@mui/material/Fab"
import styles from "../scss/CountryList.module.scss"
import PublicOffIcon from '@mui/icons-material/PublicOff';
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Link, LinkProps } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"
import ScrollToTopFab from "./UI/ScrollToTopFab"

const theme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 600,
          backgroundColor: "rgba(255, 255, 255, 0.5);",
          backdropFilter: "blur(10px);",
        },
      },
    },
  },
})

const CountryList = () => {
  const dispatch = useAppDispatch()
  const countriesData = useAppSelector((state) => state.country.data)
  const filteredCountries = useAppSelector(
    (state) => state.country.filteredCountries,
  )
  const loading = useAppSelector((state) => state.country.loading)
  const currentStyle = useAppSelector((state) => state.theme.currentStyle)
  const countriesPerRow = 8
  const darkBackground =
    currentStyle === "light" ? "rgba(255, 255, 255, 0.5)" : "rgba(0,0,0,0.45)"
  const darkColor = currentStyle === "light" ? "#000000" : "#a3a3a3"

  const [next, setNext] = useState(countriesPerRow)
  const handleMoreJob = () => {
    setNext(next + countriesPerRow)
  }

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  useEffect(() => {
    if (countriesData.length > 0) {
      dispatch(setFilteredCountries(countriesData));
    }
  }, [dispatch, countriesData]);


  return (
    <div>
      <Filter />
      <div className={styles.countriesWrapper}>
      <ScrollToTopFab/>
        {filteredCountries &&
          filteredCountries?.slice(0, next)?.map((e, index) =>
            !loading ? (
              <Link to={{ pathname: `/country/${e.cca3.toLowerCase()}` }} key={index}>
                <div className={classNames(styles.card, styles[currentStyle])}>
                  <div className={styles.flag}>
                    <img
                      className={styles.flagImg}
                      src={e.flags.png}
                      alt={e.flags.alt}
                    />
                  </div>
                  <div className={styles.informations}>
                    <p className={styles.name}>{e.name.common}</p>
                    <p className={styles.description}>
                      <span>Population:</span> {e.population.toLocaleString()}
                    </p>
                    <p className={styles.description}>
                      <span>Region:</span> {e.region}
                    </p>
                    <p className={styles.description}>
                      <span>Capital:</span>{" "}
                      {e.capital ? e.capital : "No capital"}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <Skeleton
                key={index}
                style={{ marginBottom: 6 }}
                animation="wave"
                variant="rounded"
                width={"70vw"}
                height={"70vw"}
              />
            ),
          )}
        {next < filteredCountries?.length && (
          <ThemeProvider theme={theme}>
            <Fab
              sx={{
                backgroundColor: darkBackground,
                color: darkColor,
                marginBottom: "4vw",
              }}
              onClick={handleMoreJob}
              variant="extended"
            >
              <KeyboardDoubleArrowDownIcon sx={{ mr: 1 }} />
              Load More
            </Fab>
          </ThemeProvider>
        )}
        {filteredCountries?.length === 0 && !loading && <div className={classNames(styles.error, styles[currentStyle])}><PublicOffIcon className={styles.ico}/><p>The country you are looking for was not found</p></div>}
      </div>
    </div>
  )
}

export default CountryList
