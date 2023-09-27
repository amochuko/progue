import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../redux-store/config-store';

const initialState = { show: false }

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPreview: (state, action: PayloadAction<typeof initialState>) => {
      state.show = action.payload.show;
    },
  },
  extraReducers(builder) {},
});

export const getPortfolioState = (state: RootState) => state.portfolio;

export const portfolioReducer = portfolioSlice.reducer;
export const portfolioAction = portfolioSlice.actions;
