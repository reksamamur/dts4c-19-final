import { createSlice } from "@reduxjs/toolkit";

import {
  fetchDataNews,
  latestDataNews,
  filterDataNews,
  addDatatoDetailNews,
} from "./action";

const initialState = {
  isLoading: true,
  latestNews: [],
  listDetailNews: [],
  isLoadingHotTopic: true,
  hotTopicNews: null,
  searchNewsRes: [],
};

const latestNewsSlice = createSlice({
  name: "latestnews",
  initialState: initialState,
  reducers: {
    searchNews: (state, { payload }) => {
      state.searchNewsRes = filterDataNews(state, payload.search);
    },
    addToDetailNews: (state, { payload }) => {
      state.listDetailNews = addDatatoDetailNews(state, payload);
    },
    addToHotTopicNews: (state, { payload }) => {
      state.hotTopicNews = payload;
    },
  },
  extraReducers: {
    [fetchDataNews.pending]: (state) => {
      state.isLoading = true;
      state.isLoadingHotTopic = true;
    },
    [fetchDataNews.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoadingHotTopic = false;
      state.latestNews = action.payload.news;
      state.hotTopicNews = action.payload.hot;
    },
    [fetchDataNews.rejected]: (state, action) => {
      console.log({ rejected: action });
      state.isLoading = false;
      state.isLoadingHotTopic = false;
    },
  },
});

export const { searchNews, addToDetailNews } = latestNewsSlice.actions;
export { fetchDataNews };
export default latestNewsSlice.reducer;
