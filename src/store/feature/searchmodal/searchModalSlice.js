import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
const searchModalSlice = createSlice({
  name: "searchmomdal",
  initialState: initialState,
  reducers: {
    openSearch: (state, { payload }) => {
      state.isOpen = payload;
    },
  },
});

export const { openSearch } = searchModalSlice.actions;
export default searchModalSlice.reducer;
