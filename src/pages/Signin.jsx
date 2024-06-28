import React from "react";
import { useState } from "react";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
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
          />
          <input
            type={`${!showPassword ? "password" : "text"}`}
            placeholder="password"
            className="m-4 p-2 rounded-2xl bg-slate-300"
          />

          <div className="p-4">
            <button
              className="text-white w-full bg-indigo-950 p-2 rounded-full lg:w-44"
              onClick={showPasswordHandler}
            >
              {!showPassword ? "Show Password" : "Hide Password"}
            </button>
            <button className="text-white w-full bg-indigo-950 p-2 rounded-full lg:w-44 mt-3 lg:ml-3">
              Signin
            </button>
          </div>
        </div>
      </div>
      <div>
        <button className="text-white rounded-full p-2 m-3 ">
          Don't have an account ? Signin
        </button>
      </div>
    </div>
  );
}

export default Signin;
