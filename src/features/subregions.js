import { createSlice } from '@reduxjs/toolkit';

export const subregionsSlice = createSlice({
  name: 'subregions',
  initialState: {
    data: {},
    selected: null,
  },
  reducers: {
    setSubregions: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    },
    setSubregion: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        selected: data,
      };
    },
  }
});

export const { setSubregions, setSubregion } = subregionsSlice.actions;

export const selectSubregions = (state) => state.subregions.data;
export const selectSubregion = (state) => state.subregions.selected;
