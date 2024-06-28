import React from "react";

function Signup() {
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
            type="text"
            placeholder="name"
            className="m-4 p-2 rounded-2xl bg-slate-300"
          />
          <input
            type="email"
            placeholder="email"
            className="m-4 p-2 rounded-2xl bg-slate-300"
          />
          <input
            type="password"
            placeholder="password"
            className="m-4 p-2 rounded-2xl bg-slate-300"
          />
          <input
            type="password"
            placeholder="confirm password"
            className="m-4 p-2 rounded-2xl bg-slate-300"
          />
          <div className="p-1 m-1">
            <button className="text-white w-full bg-indigo-950 p-2 rounded-full lg:w-44 ">
              Signup
            </button>
          </div>
        </div>
      </div>
      <div>
        <button className="text-white rounded-full p-2 m-3 ">
          already have an account ? Signin
        </button>
      </div>
    </div>
  );
}

export default Signup;
