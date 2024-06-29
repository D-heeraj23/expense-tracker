import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signupSubmitHandler = async () => {
    if (nameInputRef.current.value.length === 0) {
      toast.error("Name mut not be empty");
      return;
    }

    if (
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      toast.error("Password is not matching");
      return;
    }

    try {
      const resposne = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXpSxT1lLXvk05mQjfeftgybpuNLj4618",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            returnSecureToken: true,
          }),
        }
      );

      if (!resposne.ok) {
        let errorMessage = "";
        const data = await resposne.json();
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      const data = await resposne.json();
      console.log(data);
      alert("signup success now you signin");
      history.replace("/");
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
            type="text"
            placeholder="name"
            className="m-4 p-2 rounded-2xl bg-slate-300"
            ref={nameInputRef}
          />
          <input
            type="email"
            placeholder="email"
            className="m-4 p-2 rounded-2xl bg-slate-300"
            ref={emailInputRef}
          />
          <input
            type="password"
            placeholder="password"
            className="m-4 p-2 rounded-2xl bg-slate-300"
            ref={passwordInputRef}
          />
          <input
            type="password"
            placeholder="confirm password"
            className="m-4 p-2 rounded-2xl bg-slate-300"
            ref={confirmPasswordInputRef}
          />
          <div className="p-1 m-1">
            <button
              className="text-white w-full bg-indigo-950 p-2 rounded-full lg:w-44 "
              onClick={signupSubmitHandler}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          className="text-white rounded-full p-2 m-3 "
          onClick={() => history.replace("/")}
        >
          already have an account ? Signin
        </button>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Signup;
