import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalAmount = useSelector((state) => state.expenseReducer.totalAmount);
  const email = localStorage.getItem("email");
  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    history.replace("/");
  };
  return (
    <div className="flex items-center justify-between bg-zinc-900">
      <div className="p-2 text-2xl font-semibold m-3 text-white">
        Expense Tracker
      </div>
      <div className="p-2 m-3 mr-10 flex items-center gap-8 text-slate-400">
        {isLoggedIn && totalAmount >= 10000 && (
          <button className="bg-black text-white p-3 w-28 rounded-xl font-bold">
            Premium
          </button>
        )}
        {isLoggedIn && (
          <div>
            Welcome : <span className="font-bold text-lg">{email}</span>
          </div>
        )}
        {isLoggedIn && (
          <button
            className="bg-blue-900 p-3 w-28 rounded text-white font-semibold text-lg"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
