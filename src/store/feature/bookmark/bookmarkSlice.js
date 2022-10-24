import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  bookmarkNews: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: initialState,
  reducers: {
    addBookmarkNews: (state, { payload }) => {},
  },
});

export const { addBookmarkNews } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
