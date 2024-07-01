import React, { useState, useRef, useEffect } from "react";

const Home = () => {
  const numberInputRef = useRef();
  const desInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-95b39-default-rtdb.firebaseio.com/expenses.json"
        );
        if (!response.ok) {
          throw new Error("something wrong cant fetch the data");
        }
        const data = await response.json();
        const loadedData = [];
        for (const keys in data) {
          loadedData.push({
            id: keys,
            price: data[keys].price,
            description: data[keys].description,
            category: data[keys].category,
          });
        }

        setExpenses(loadedData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getExpenses();
  }, [expenses]);

  const addHandler = async () => {
    setIsLoading(true);
    const data = {
      price: numberInputRef.current.value,
      description: desInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    try {
      const res = await fetch(
        "https://expense-tracker-95b39-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      numberInputRef.current.value = "";
      desInputRef.current.value = "";
      setIsLoading(false);
    }
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
            {isLoading ? <p>ADDING...</p> : <p>ADD</p>}
          </button>
        </div>
      </div>
      <div className="space-y-2 mt-3">
        {expenses.map((expense) => (
          <div className="flex items-center bg-indigo-950 w-[15rem] rounded-xl p-3 justify-around text-white lg:w-[48rem]">
            <div className="flex flex-col lg:flex-row lg:gap-28">
              <div className="text-xl font-bold">${expense.price}</div>
              <div className="w-[7rem]  text-blue-200 lg:w-[20rem] lg:flex lg:flex-start">
                {expense.description}
              </div>
              <div className="border-b lg:border-none">{expense.category}</div>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-red-500 p-1 rounded-lg w-[4rem]">
                Delete
              </button>
              <button className="bg-blue-950 p-1 rounded-lg w-[4rem]">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
