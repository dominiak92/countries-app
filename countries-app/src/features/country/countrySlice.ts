import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  capital: string[];
  subregion: string;
  tld: string;
  maps : {
    googleMaps: string;
  }
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders?: string;
  flags: {
    png: string;
    alt: string;
  }
  cca3: string;
}

interface CountryState {
  data: Country[];
  filteredCountries: Country[];
  isSuccess: boolean;
  loading: boolean;
  error?: string | null;
}
  

const initialState: CountryState = {
  data: [],
  filteredCountries: [],
  isSuccess: false,
  loading: false,
};

export const getCountries = createAsyncThunk(
  "countries/getcountries",
  async () => {
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
 setFilteredCountries: (state, action) => {
   state.filteredCountries = action.payload;
    },
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

export const { setFilteredCountries } = countriesSlice.actions;
export type { Country };
export default countriesSlice.reducer;
