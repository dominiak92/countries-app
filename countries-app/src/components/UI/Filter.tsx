import React from "react"
import { Box } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import styles from "../../scss/Filter.module.scss"

const Filter = () => {
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.search}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchIcon
            sx={{
              mr: 1,
              my: 0.5,
              verticalAlign: "middle",
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label={"Search for a country..."}
            InputLabelProps={{
              style: {
                fontFamily: "'Nunito Sans', sans-serif",
                color: "#a3a3a3",
              },
            }}
            InputProps={{
              style: {
                width: "280px",
                fontFamily: "'Nunito Sans', sans-serif",
              },
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
      </div>
      <div className={styles.filter}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ fontFamily: "'Nunito Sans', sans-serif", color: "#000000", }}>Filter by Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              label="Filter by Region"
              sx={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: "#a3a3a3",
                "& fieldset": { border: "none" },
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  )
}

export default Filter
