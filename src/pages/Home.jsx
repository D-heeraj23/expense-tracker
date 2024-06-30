import React, { useState, useRef } from "react";

const Home = () => {
  const numberInputRef = useRef();
  const desInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenses, setExpenses] = useState([]);
  const addHandler = () => {
    const data = {
      price: numberInputRef.current.value,
      description: desInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    setExpenses((prev) => [...prev, data]);
  };

  return (
    <div className="bg-slate-600 p-5 text-center w-full h-screen text-black flex flex-col items-center lg:flex ">
      <div className="flex flex-col bg-slate-800 p-4 h-72 rounded-xl lg:w-1/2">
        <input
          type="number"
          placeholder="total money spent"
          className="p-3 rounded-lg"
          ref={numberInputRef}
        />
        <input
          type="text"
          placeholder="description"
          className="p-3 rounded-lg mt-2"
          ref={desInputRef}
        />
        <select className="p-3 rounded-lg mt-2" ref={categoryInputRef}>
          <option>food</option>
          <option>petrol</option>
          <option>rent</option>
          <option>other</option>
        </select>
        <div className="flex items-end h-24 lg:justify-end">
          <button
            className="bg-indigo-800 p-3 w-full text-blue-50 rounded-xl lg:w-48"
            onClick={addHandler}
          >
            Add
          </button>
        </div>
      </div>
      {expenses.map((expense) => (
        <div className="bg-blue-300 w-1/2 rounded-xl p-3 flex items-center justify-around">
          {
            <h1 className="font-bold text-xl border-b-4 w-44 ">
              ${expense.price}
            </h1>
          }
          <div className=" flex gap-5">
            <div>
              <p className="font-bold w-60 ">{expense.description} </p>
            </div>
            <div className="font-bold w-60">{expense.category}</div>
          </div>

          <div>
            <button className="bg-red-600 p-2 rounded-md text-white font-bold">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
