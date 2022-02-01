import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlCoins } from "./urlCoins";

export const coinsAsync = createAsyncThunk(
  "coinsAsync",
  async (number, { rejectWithValue }) => {
    try {
      const response = await axios(urlCoins(number));
      return response.data.data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const coinsSlice = createSlice({
  name: "coinsSlice",
  initialState: { data: {}, loading: false, isError: false },
  extraReducers: {
    [coinsAsync.fulfilled]: (state, action) => {
      return { ...state, data: action.payload, loading: false, isError: false };
    },
    [coinsAsync.pending]: (state) => {
      return { ...state, data: {}, loading: true, isError: false };
    },
    [coinsAsync.rejected]: (state) => {
      return { ...state, data: {}, loading: false, isError: true };
    },
  },
});

export default coinsSlice.reducer;
