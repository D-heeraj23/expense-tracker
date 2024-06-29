import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const emailInputRef = useRef();
  const history = useHistory();

  const forgotEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCXpSxT1lLXvk05mQjfeftgybpuNLj4618",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailInputRef.current.value,
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
      console.log(data);
      toast.success("Sent the link at this email to change the password");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-800 text-white flex items-center justify-center flex-col">
      <div className="bg-slate-950 p-4 rounded-xl w-[20rem] h-[25rem] flex flex-col justify-between lg:w-1/2">
        <div>
          <h1 className="text-2xl mt-3 mb-3">Forgot Password</h1>
          <input
            type="email"
            placeholder="email"
            className="p-3 mt-4 rounded-md w-full text-black"
            ref={emailInputRef}
          />
        </div>
        <div className="p-3">
          <button
            className="p-3 bg-indigo-950 rounded-xl w-full lg:w-28"
            onClick={forgotEmailHandler}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
      <button
        className="bg-slate-600 p-3 mt-3 rounded-full"
        onClick={() => history.replace("/")}
      >
        Go to signin page
      </button>
    </div>
  );
};

export default ForgotPassword;
