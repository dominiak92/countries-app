import React from "react"
import { useParams } from "react-router-dom"
import { getCountries } from "../features/country/countrySlice"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Link } from "react-router-dom"
import styles from "../scss/Country.module.scss"
import Fab from "@mui/material/Fab"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Button from "@mui/material/Button"
import MapIcon from "@mui/icons-material/Map"
import classNames from "classnames"
import { useMediaQuery } from "react-responsive"
import { useSpring, animated, useInView } from "@react-spring/web";


const theme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          fontSize: "3.5vw",
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 600,
          backgroundColor: "rgba(255, 255, 255, 0.5);",
          backdropFilter: "blur(10px);",
        },
      },
    },
  },
})
const theme2 = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          fontSize: "1vw",
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 600,
          backgroundColor: "rgba(255, 255, 255, 0.5);",
          backdropFilter: "blur(10px);",
        },
      },
    },
  },
})

const Country = () => {
  const isDesktop = useMediaQuery({ maxWidth: 992 })
  const { cca3 } = useParams() as { cca3: string }
  const countriesData = useAppSelector((state) => state.country.data)
  const dispatch = useAppDispatch()
  const currentStyle = useAppSelector((state) => state.theme.currentStyle)
  const darkBackground =
    currentStyle === "light" ? "rgba(255, 255, 255, 0.5)" : "rgba(0,0,0,0.45)"
  const darkColor = currentStyle === "light" ? "#000000" : "#a3a3a3"

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  const fadePage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [ref, springs] = useInView(
    () => ({
      from: {
        y: 20,
      },
      to: {
        y: 0,
      },
    }),
  )

  const country = countriesData?.find((c) => c.cca3.toLowerCase() === cca3)
  const languagesArray = country?.languages
  const borderArray = country?.borders
  const values: string[] = []
  const borderCountries: string[] = []
  const buttonTheme = isDesktop ? theme : theme2

  if (languagesArray) {
    for (let value of Object.values(languagesArray)) {
      values.push(value)
    }
  }

  if (borderArray) {
    for (let value of Object.values(borderArray)) {
      borderCountries.push(value)
    }
  }

  const firstNativeNameKey = Object.keys(country?.name?.nativeName || {})[0]
  const firstNativeNameObject = country?.name?.nativeName?.[firstNativeNameKey]
  const firstNativeNameOfficial = firstNativeNameObject?.official
  const currenciesKey = Object.keys(country?.currencies || {})[0]
  const firstCurrenciesObject = country?.currencies?.[currenciesKey]
  const currenciesName = firstCurrenciesObject?.name
  return (
    <div className={styles.countryWrapper}>
      <div className={styles.header}>
        <Link to="/">
          <ThemeProvider theme={buttonTheme}>
            <Fab
              sx={{ backgroundColor: darkBackground, color: darkColor }}
              variant="extended"
            >
              <ArrowBackIcon sx={{ mr: 1 }} />
              Back
            </Fab>
          </ThemeProvider>
        </Link>
      </div>
      {country ? (
        <div className={styles.dataWrapper}>
          <div className={styles.flagMapWrapper}>
            <div className={styles.flag}>
              <animated.img
              style={fadePage}
                className={styles.flagImg}
                src={country.flags.png}
                alt={country.flags.alt}
              />
            </div>
            <div className={styles.mapButton}>
              <Link
                to={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ThemeProvider theme={buttonTheme}>
                  <Fab
                    sx={{ backgroundColor: darkBackground, color: darkColor }}
                    variant="extended"
                  >
                    <LocationOnIcon sx={{ mr: 1 }} />
                    {country.name.common}
                  </Fab>
                </ThemeProvider>
              </Link>
            </div>
          </div>
          <animated.div ref={ref} style={springs} className={classNames(styles.information, styles[currentStyle])}>
            <p className={styles.name}>{country.name.common}</p>
            <div className={styles.informationWrapper}>
              <div className={styles.upperInformation}>
                {firstNativeNameOfficial ? (
                  <p className={styles.nativeName}>
                    <span>Native Name:</span> {firstNativeNameOfficial}
                  </p>
                ) : null}
                <p className={styles.population}>
                  <span>Population:</span> {country.population.toLocaleString()}
                </p>
                <p className={styles.region}>
                  <span>Region:</span> {country.region}
                </p>
                {country.subregion ? (
                  <p className={styles.subregion}>
                    <span>Sub Region:</span> {country.subregion}
                  </p>
                ) : null}
                <p className={styles.capital}>
                  <span>Capital:</span>{" "}
                  {country.capital ? country.capital.join(", ") : "No capital"}
                </p>
              </div>

              <div className={styles.lowerInformation}>
                {country.tld ? (
                  <p className={styles.tld}>
                    <span>Top Level Domain:</span> {country.tld[0]}
                  </p>
                ) : null}
                <p className={styles.currencies}>
                  <span>Currencies:</span>{" "}
                  {currenciesName ? currenciesName : "No currencies"}
                </p>
                {values.length !== 0 ? (
                  <p className={styles.languages}>
                    <span>Languages:</span> {values.join(", ")}{" "}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.borderWrapper}>
              <p className={styles.border}>
                {borderCountries.length !== 0 ? (
                  <span>Border Countries:</span>
                ) : null}
              </p>{" "}
              {borderCountries.map((e, index) => {
                const matchingCountries = countriesData?.find(
                  (element) => element.cca3 === e,
                )
                const countryNames = matchingCountries?.name.common

                return (
                  <Link key={index} to={`/country/${e.toLowerCase()}`}>
                    <Button
                      sx={{
                        fontFamily: "Nunito Sans",
                        fontWeight: "600",
                        backgroundColor: "rgba(255, 255, 255, 0.5);",
                        backdropFilter: "blur(10px);",
                        color: "black",
                        margin: isDesktop ? "0.8vw" : "0.3vw",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1);",
                          backdropFilter: "blur(10px);",
                        },
                      }}
                      variant="contained"
                    >
                      {countryNames}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </animated.div>
        </div>
      ) : (
        <p>error</p>
      )}
    </div>
  )
}

export default Country
