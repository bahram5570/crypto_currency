import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlDetails } from "./urlDetails";

export const detailsAsync = createAsyncThunk(
  "detailsAsync",
  async (coinID, { rejectWithValue }) => {
    try {
      const response = await axios(urlDetails(coinID));
      return response.data.data.coin;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const datailsSlice = createSlice({
  name: "datailsSlice",
  initialState: { data: {}, loading: false, isError: false },
  extraReducers: {
    [detailsAsync.fulfilled]: (state, action) => {
      return { ...state, data: action.payload, loading: false, isError: false };
    },
    [detailsAsync.pending]: (state) => {
      return { ...state, data: {}, loading: true, isError: false };
    },
    [detailsAsync.rejected]: (state) => {
      return { ...state, data: {}, loading: false, isError: true };
    },
  },
});

export default datailsSlice.reducer;
