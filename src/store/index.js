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

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: { whiteTheme: false },
  reducers: {
    changeTheme(state) {
      state.whiteTheme = !state.whiteTheme;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: auth.reducer,
    expenseReducer: expenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const authActions = auth.actions;
export const themeActions = themeSlice.actions;
export const expenseReducerAction = expenseSlice.actions;
export default store;
