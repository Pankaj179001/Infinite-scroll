import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Store";
import { paginate } from "../../Types/Queries";
import { fetchProducts, product } from "./Action";

export const FetchProducts = createAsyncThunk(
  "FetchProducts",
  async (queries?: paginate) => {
    return await fetchProducts(queries);
  }
);
interface initialState {
  data: product[];
  meta: { total: number; skip: number; limit: number };
  isloading: boolean;
  isError: boolean;
  error: any;
}

const initialState: initialState = {
  data: [],
  meta: { total: 0, skip: 0, limit: 0 },
  isloading: false,
  isError: false,
  error: null,
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    // getPosts(state, { payload }) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchProducts.fulfilled, (state, { payload }) => {
        const { products, ...paginationData } = payload;
        state.data = products;
        state.meta = paginationData;
        state.isError = false;
        state.isloading = false;
      })
      .addCase(FetchProducts.pending, (state) => {
        state.isError = false;
        state.isloading = true;
      })
      .addCase(FetchProducts.rejected, (state, { payload }) => {
        state.isError = true;
        state.error = payload as unknown as null;
        state.isloading = false;
      });
  },
});

export const {} = ProductSlice.actions;
export const ProductState = (state: RootState) => state.ProductSlice;
export default ProductSlice.reducer;
