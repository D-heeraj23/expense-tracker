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

const store = configureStore({
  reducer: { auth: auth.reducer },
});

export const authActions = auth.actions;
export default store;
