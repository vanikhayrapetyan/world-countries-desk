import { createSlice } from '@reduxjs/toolkit';

export const timezonesSlice = createSlice({
  name: 'timezones',
  initialState: {
    data: [],
    selected: null,
  },
  reducers: {
    setTimezones: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        data
      };
    },
    setTimezone: (state, action) => {
      const { data } = action.payload;

      console.log(action)

      return {
        ...state,
        selected: data,
      };
    },
  }
});

export const { setTimezones, setTimezone } = timezonesSlice.actions;

export const selectTimezones = (state) => state.timezones.data;
export const selectTimezone = (state) => state.timezones.selected;
