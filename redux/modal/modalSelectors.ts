import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectStore = (state: RootState) => state;

export const selectRootModal = createSelector(
  selectStore,
  (state) => state.modal
);

export const selectModal = createSelector(
  [selectRootModal, (state: RootState, modalName: string) => modalName],
  (modal, modalName) => modal[modalName]
);
