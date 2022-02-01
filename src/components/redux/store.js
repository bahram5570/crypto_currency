import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "./coinsSlice";
import newsSlice from "./newsSlice";
import detailsSlice from "./datailsSlice";

const store = configureStore({
  reducer: {
    coinsSlice,
    newsSlice,
    detailsSlice,
  },
});

export default store;
