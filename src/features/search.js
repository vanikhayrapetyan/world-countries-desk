import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'keyword',
  initialState: '',
  reducers: {
    setKeyword: (state, action) => {
      const { data } = action.payload;

      return data;
    },
  }
});

export const { setKeyword } = searchSlice.actions;

export const selectKeyword = (state) => state.keyword;
