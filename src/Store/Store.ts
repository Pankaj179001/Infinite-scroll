import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./Slices/Posts/PostSlice";
import ProductSlice from "./Slices/Products/ProductSlice";
import CategorySlice from "./Slices/ViewType";

export const store = configureStore({
  reducer: { PostSlice, ProductSlice, CategorySlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
