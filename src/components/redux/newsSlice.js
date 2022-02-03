import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlNews } from "./urlNews";

export const newsAsync = createAsyncThunk(
  "newsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(urlNews);
      return response.data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const newsSlice = createSlice({
  name: "newsSlice",
  initialState: { data: {}, loading: false, isError: false },
  extraReducers: {
    [newsAsync.fulfilled]: (state, action) => {
      return { ...state, data: action.payload, loading: false, isError: false };
    },
    [newsAsync.pending]: (state) => {
      return { ...state, data: {}, loading: true, isError: false };
    },
    [newsAsync.rejected]: (state) => {
      return { ...state, data: {}, loading: false, isError: true };
    },
  },
});

export default newsSlice.reducer;
