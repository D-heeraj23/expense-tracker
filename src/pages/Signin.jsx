import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

function Signin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const signInHandler = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXpSxT1lLXvk05mQjfeftgybpuNLj4618",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = "";
        const data = await response.json();
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem("token", data.idToken);
      dispatch(authActions.login());
      history.replace("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-800 flex items-center justify-center flex-col">
      <div className="w-3/4  flex items-center justify-center bg-slate-950 rounded-3xl overflow-hidden">
        <div>
          <img
            src="https://repository-images.githubusercontent.com/586906527/05861902-b29d-41b7-b678-7e32749988bd"
            alt="$"
            className="mix-blend-screen h-96 lg:h-[27rem]"
          />
        </div>
        <div className="flex flex-col w-[80%] lg:w-1/2 lg:p-8">
          <input
            type="email"
            placeholder="email"
            className="m-4 p-2 rounded-2xl bg-slate-300"
            ref={emailInputRef}
          />
          <input
            type={`${!showPassword ? "password" : "text"}`}
            placeholder="password"
            className="m-4 p-2 rounded-2xl bg-slate-300"
            ref={passwordInputRef}
          />

          <div className="p-4">
            <button
              className="text-white w-full bg-indigo-950 p-2 rounded-full lg:w-44 mt-3"
              onClick={signInHandler}
            >
              Signin
            </button>
            <button
              className="text-white w-full bg-indigo-950 p-2 rounded-full mt-3 lg:w-44 lg:ml-3"
              onClick={showPasswordHandler}
            >
              {!showPassword ? "Show Password" : "Hide Password"}
            </button>

            <button
              className="text-white w-full bg-indigo-950 p-2 rounded-full lg:w-44 mt-3"
              onClick={() => {
                console.log("Navigating to /forgotpassword");
                history.replace("/forgotpassword");
              }}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          className="text-white rounded-full p-2 m-3 "
          onClick={() => history.replace("/signup")}
        >
          Don't have an account ? Signup
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signin;
