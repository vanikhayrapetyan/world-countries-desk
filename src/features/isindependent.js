import { createSlice } from '@reduxjs/toolkit';

export const isIndependentSlice = createSlice({
  name: 'isIndependent',
  initialState: false,
  reducers: {
    setIndependent: (state, action) => {
      const { data } = action.payload;

      return data;
    },
  }
});

export const { setIndependent } = isIndependentSlice.actions;

export const selectIndependent = (state) => state.isIndependent;
