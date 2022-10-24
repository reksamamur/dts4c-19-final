import { configureStore } from "@reduxjs/toolkit";

import latestNewsReducer from "./feature/latestnews/latestNewsSlice";
import categoryNewsReducer from "./feature/categorynew/categoryNewsSlice";
import bookMarkNewsReducer from "./feature/bookmark/bookmarkSlice";
import searchModalReducer from './feature/searchmodal/searchModalSlice'

export const store = configureStore({
  reducer: {
    latestNews: latestNewsReducer,
    categoryNews: categoryNewsReducer,
    bookMarkNews: bookMarkNewsReducer,
    searchModal: searchModalReducer,
  },
});
