import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    setData: (state, action) => {
      const { data } = action.payload;

      return data;
    },
  }
});

export const { setData } = dataSlice.actions;

export const selectData = (state) => state.data;
