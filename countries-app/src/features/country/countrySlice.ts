import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Country {
  name: {
    common: string;
    official: string;
  }
  population: number;
  region: string;
  capital: string;
  subregion: string;
  languages: string[];
  tld: string;
  currencies: string;
  borders: string;
  flags: {
    png: string;
    alt: string;
  }
}

interface CountryState {
  data: Country[];
  isSuccess: boolean;
  loading: boolean;
  error?: string | null;
}
  

const initialState: CountryState = {
  data: [],
  isSuccess: false,
  loading: false,
};

export const getCountries = createAsyncThunk(
  "countries/getcountries",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);


const countriesSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // setFilteredJobs: (state, action) => {
    //   state.filter = action.payload;
    //   // state.filter = state.data
    //   console.log(state.data);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

// export const { setFilteredJobs } = countriesSlice.actions;
export default countriesSlice.reducer;
