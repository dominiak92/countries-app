import { createSlice } from '@reduxjs/toolkit';

const storedStyle = localStorage.getItem('style');

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentStyle: storedStyle ? storedStyle : 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      state.currentStyle = state.currentStyle === 'dark' ? 'light' : 'dark';
      localStorage.setItem('style', state.currentStyle)
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;