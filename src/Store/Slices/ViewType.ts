import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState: "Products",
  reducers: {
    SetCategory(state, { payload }: { payload: string }) {
      state = payload;
      return state;
    },
  },
});

export const { SetCategory } = CategorySlice.actions;
export const CategoryState = (state: RootState) => state.CategorySlice;
export default CategorySlice.reducer;
