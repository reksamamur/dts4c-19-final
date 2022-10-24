import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { initCategoryNews } from "./action";

const initialState = {
  isLoading: true,
  categoryNews: initCategoryNews,
};

const categoryNewsSlice = createSlice({
  name: "categorynews",
  initialState: initialState,
});

export default categoryNewsSlice.reducer;
