import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExpenseBook = {
  id: string;
  name: string;
  members: string[];
  currency: string;
};

const initialState: ExpenseBook[] = [];

export const expenseBooksSlice = createSlice({
  name: "expenseBooks",
  initialState,
  reducers: {
    addExpenseBook: (state, action: PayloadAction<ExpenseBook>) => {
      state.push(action.payload);
    },
    removeExpenseBook: (state, action: PayloadAction<string>) => {
      return state.filter(book => book.id !== action.payload);
    },
    updateExpenseBook: (state, action: PayloadAction<ExpenseBook>) => {
      const index = state.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addExpenseBook, removeExpenseBook, updateExpenseBook } =
  expenseBooksSlice.actions;
export default expenseBooksSlice.reducer;
