import { configureStore } from '@reduxjs/toolkit';
import {
  dataSlice,
  languagesSlice,
  regionsSlice,
  subregionsSlice,
  timezonesSlice,
  currenciesSlice,
  isIndependentSlice,
  searchSlice,
} from './features';

export default configureStore({
  reducer: {
    data: dataSlice.reducer,
    languages: languagesSlice.reducer,
    regions: regionsSlice.reducer,
    subregions: subregionsSlice.reducer,
    timezones: timezonesSlice.reducer,
    currencies: currenciesSlice.reducer,
    isIndependent: isIndependentSlice.reducer,
    keyword: searchSlice.reducer,
  },
});
