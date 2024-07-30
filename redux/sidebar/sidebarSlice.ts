import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarWidth: '',
    navbarLeft: '',
    navbarWidth: '',
    isResetting: false,
    isCollapsed: false,
  },
  reducers: {
    setSidebarWidth: (state, action) => {
      const { sidebarWidth, navbarLeft, navbarWidth } = action.payload;

      state.sidebarWidth = sidebarWidth;
      state.navbarLeft = navbarLeft;
      state.navbarWidth = navbarWidth;
    },
    setIsResetting: (state, action) => {
      state.isResetting = action.payload;
    },
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { setSidebarWidth, setIsResetting, setIsCollapsed } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
