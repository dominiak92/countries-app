import React from "react"
import { Box } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import styles from "../../scss/Filter.module.scss"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { setFilteredCountries } from "../../features/country/countrySlice"
import classNames from "classnames"
import { useMediaQuery } from "react-responsive"

const Filter = () => {
  const dispatch = useAppDispatch();
  const [region, setRegion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const isDesktop = useMediaQuery({ maxWidth: 992 })
  const currentStyle = useAppSelector((state) => state.theme.currentStyle);
  const countriesData = useAppSelector((state) => state.country.data);
  const darkTheme = currentStyle === "light" ? "#000000" : "#ffffff";

  const applyFilters = (inputValue: string, region: string) => {
    let filteredData = countriesData;

    if (inputValue.trim() !== "") {
      filteredData = filteredData.filter((e) =>
        e.name.common.toLowerCase().includes(inputValue.trim().toLowerCase())
      );
    }

    if (region !== "All Regions" && region !== "") {
      filteredData = filteredData.filter((e) => e.region.includes(region));
    }


    dispatch(setFilteredCountries(filteredData));
  };

  const countrySetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    applyFilters(newValue, region);
  };

  const regionFilter = () => {
    applyFilters(inputValue, region);
  };

  useEffect(() => {
    regionFilter();
  }, [region]);

  const regions: string[] = [
    "All Regions",
    "Africa",
    "Americas",
    "Europe",
    "Oceania",
    "Asia",
    "Antarctic",
  ]

  return (
    <div className={styles.filterWrapper}>
      <div className={classNames(styles.search, styles[currentStyle])}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0.1
          }}
        >
          <SearchIcon
            sx={{
              mr: 1,
              ml: 2,
              my: 0.5,
              verticalAlign: "middle",
              color: darkTheme,
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label={"Search for a country..."}
            
            onChange={countrySetter}
            InputLabelProps={{
              style: {
                fontFamily: "'Nunito Sans', sans-serif",
                color: currentStyle === "light" ? "#000000" : "#a3a3a3",
              },
            }}
            InputProps={{
              style: {
                width: isDesktop? '81vw' : '19vw',
                fontFamily: "'Nunito Sans', sans-serif",
                color: darkTheme,
              },
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
      </div>
      <div className={classNames(styles.filter, styles[currentStyle])}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 160, margin: 0.1}} size="small">
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: currentStyle === "light" ? "#000000" : "#a3a3a3",
                fontSize: '14px'
              }}
            >
              Filter by Region
            </InputLabel>
            <Select
                MenuProps={{
                  style: {
                    maxHeight: 250,
                       },
                  disableScrollLock: true,
                }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={region}
              label="Filter by Region"
              onChange={(e) => {
                setRegion(e.target.value)
              }}
              sx={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: darkTheme,
                "& fieldset": { border: "none" },
              }}
            >
              {regions.map((element, index) => (
                <MenuItem key={index} value={element}>
                  {element}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  )
}

export default Filter
