import React from "react"
import Filter from "./UI/Filter"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
import { getCountries } from "../features/country/countrySlice"
import classNames from "classnames"
import Fab from "@mui/material/Fab"
import styles from "../scss/CountryList.module.scss"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Link, LinkProps } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"

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
  const loading = useAppSelector((state) => state.country.loading)
  const currentStyle = useAppSelector((state) => state.theme.currentStyle)
  const countriesPerRow = 8
  const darkBackground = currentStyle === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0,0,0,0.45)'
  const darkColor = currentStyle === 'light' ? '#000000' : '#a3a3a3'

  const [next, setNext] = useState(countriesPerRow)
  const handleMoreJob = () => {
    setNext(next + countriesPerRow)
  }

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])


  return (
    <div>
      <Filter />
      <div className={styles.countriesWrapper}>
        {countriesData &&
          countriesData?.slice(0, next)?.map((e, index) =>
            !loading ? (
              <Link to={{ pathname: `/country/${index}` }} key={index}>
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
        {next < countriesData?.length && (
          <ThemeProvider theme={theme}>
            <Fab sx={{ backgroundColor: darkBackground, color: darkColor, marginBottom: '4vw' }} onClick={handleMoreJob} variant="extended">
              <KeyboardDoubleArrowDownIcon sx={{ mr: 1 }} />
              Load More
            </Fab>
          </ThemeProvider>
        )}
      </div>
    </div>
  )
}

export default CountryList
