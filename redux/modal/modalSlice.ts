import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  [key: string]: {
    isOpen: boolean;
  };
}

const initialState: ModalState = {
  search: { isOpen: false },
  delete: { isOpen: false },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      const { modalName, modalOpen } = action.payload;
      state[modalName].isOpen = modalOpen;
    },
  },
});

export const { setModalOpen } = modalSlice.actions;
export default modalSlice.reducer;
