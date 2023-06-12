import { createSlice } from '@reduxjs/toolkit';

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    data: [],
    selected: null,
  },
  reducers: {
    setCurrencies: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    },
    setCurrency: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        selected: data,
      };
    },
  }
});

export const { setCurrencies, setCurrency } = currenciesSlice.actions;

export const selectCurrencies = (state) => state.currencies.data;
export const selectCurrency = (state) => state.currencies.selected;
