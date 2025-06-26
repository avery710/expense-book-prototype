import { configureStore } from "@reduxjs/toolkit";
import expenseBooksReducer from "./slices/expenseBooksSlice";

export const store = configureStore({
  reducer: {
    expenseBooks: expenseBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
