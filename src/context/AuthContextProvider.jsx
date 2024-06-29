import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ loginHandler, isLoggedIn, logoutHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
