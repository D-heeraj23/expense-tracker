import { createSlice, configureStore } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "Authentication",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

const expenseSlice = createSlice({
  name: "expenseReducer",
  initialState: { expenseData: [], totalAmount: 0 },
  reducers: {
    setExpense(state, action) {
      state.expenseData = action.payload;
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { auth: auth.reducer, expenseReducer: expenseSlice.reducer },
});

export const authActions = auth.actions;
export const expenseReducerAction = expenseSlice.actions;
export default store;
