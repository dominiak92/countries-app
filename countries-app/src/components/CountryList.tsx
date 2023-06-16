import React from "react"
import Filter from "./UI/Filter"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect } from "react"
import { getCountries } from "../features/country/countrySlice"
import styles from "../scss/CountryList.module.scss"

const CountryList = () => {
  const dispatch = useAppDispatch()
  const countriesData = useAppSelector((state) => state.country.data)

  countriesData && countriesData.map((e) => console.log(e.name))

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  return (
    <div>
      <Filter />
      <div className={styles.countriesWrapper}>
        {countriesData &&
          countriesData.map((e) => (
            <div className={styles.card}>
              <div className={styles.flag}>
                <img className={styles.flagImg} src={e.flags.png} alt={e.flags.alt} />
              </div>
              <div className={styles.informations}>
                <p>{e.name.common}</p>
              </div>
              <p>{e.region}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CountryList
