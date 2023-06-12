import { createSlice } from '@reduxjs/toolkit';

export const regionsSlice = createSlice({
  name: 'regions',
  initialState: {
    data: [],
    selected: null,
  },
  reducers: {
    setRegions: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    },
    setRegion: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        selected: data,
      };
    },
  }
});

export const { setRegions, setRegion } = regionsSlice.actions;

export const selectRegions = (state) => state.regions.data;
export const selectRegion = (state) => state.regions.selected;
