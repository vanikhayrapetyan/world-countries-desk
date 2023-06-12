import { createSlice } from '@reduxjs/toolkit';

export const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    data: [],
    selected: null,
  },
  reducers: {
    setLanguages: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    },
    setLanguage: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        selected: data,
      };
    },
  }
});

export const { setLanguages, setLanguage } = languagesSlice.actions;

export const selectLanguages = (state) => state.languages.data;
export const selectLanguage = (state) => state.languages.selected;
