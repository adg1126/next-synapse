import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectStore = (state: RootState) => state;

export const selectModal = createSelector(selectStore, (state) => state.modal);

export const selectSearchModal = createSelector(
  selectModal,
  (modal) => modal.search
);

export const selectDeleteModal = createSelector(
  selectModal,
  (modal) => modal.delete
);
