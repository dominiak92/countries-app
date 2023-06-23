import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import countryReducer from "../features/country/countrySlice";
import themeReducer from "../features/country/themeSlice"

export const store = configureStore({
  reducer: {
    country: countryReducer,
    theme: themeReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
