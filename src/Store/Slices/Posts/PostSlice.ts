import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Posts, fetchPosts, post } from "./PostActions";
import { RootState } from "../../Store";
import { paginate } from "../../Types/Queries";

export const FetchPosts = createAsyncThunk(
  "fetchposts",
  async (queries?: paginate) => {
    return await fetchPosts(queries);
  }
);
interface initialState {
  data: post[];
  meta: { total: number; skip: number; limit: number };
  isloading: boolean;
  isError: boolean;
  error: any;
}

const initialState: initialState = {
  data: [],
  meta: { total: 0, skip: 0, limit: 15 },
  isloading: false,
  isError: false,
  error: null,
};

export const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    // getPosts(state, { payload }) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchPosts.fulfilled, (state, { payload }) => {
        const { posts, ...paginationData } = payload;
        state.data = posts;
        state.meta = paginationData;
        state.isError = false;
        state.isloading = false;
      })
      .addCase(FetchPosts.pending, (state) => {
        state.isError = false;
        state.isloading = true;
      })
      .addCase(FetchPosts.rejected, (state, { payload }) => {
        state.isError = true;
        state.error = payload as unknown as null;
        state.isloading = false;
      });
  },
});

export const {} = PostSlice.actions;
export const PostState = (state: RootState) => state.PostSlice;
export default PostSlice.reducer;
