import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectStore = (state: RootState) => state;

export const selectSidebar = createSelector(
  selectStore,
  (state) => state.sidebar
);
