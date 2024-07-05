import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { expenseReducerAction } from "../store/index";

const Home = () => {
  const numberInputRef = useRef();
  const desInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const expenseData = useSelector((state) => state.expenseReducer.expenseData);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-95b39-default-rtdb.firebaseio.com/expenses.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong, can't fetch the data");
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
        dispatch(expenseReducerAction.setExpense(loadedData));
      } catch (error) {
        console.log(error.message);
      }
    };
    getExpenses();
  }, [expenseData]);

  const addHandler = async () => {
    if (
      numberInputRef.current.value.length === 0 ||
      desInputRef.current.value.length === 0
    ) {
      toast.error("input can not be empty");
      return;
    }
    if (numberInputRef.current.value <= 0) {
      toast.error("price can not be less than 0");
      return;
    }
    setIsLoading(true);
    const data = {
      price: numberInputRef.current.value,
      description: desInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    try {
      await fetch(
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

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-95b39-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Can't delete");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editHandler = async (id) => {
    setEditMode(true);
    setCurrentExpenseId(id);
    const expenseToEdit = expenseData.find((expense) => expense.id === id);
    numberInputRef.current.value = expenseToEdit.price;
    desInputRef.current.value = expenseToEdit.description;
    categoryInputRef.current.value = expenseToEdit.category;
  };

  const updateHandler = async () => {
    setIsLoading(true);
    const updatedData = {
      price: numberInputRef.current.value,
      description: desInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    try {
      await fetch(
        `https://expense-tracker-95b39-default-rtdb.firebaseio.com/expenses/${currentExpenseId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
        }
      );
      setEditMode(false);
      setCurrentExpenseId(null);
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
            onClick={editMode ? updateHandler : addHandler}
          >
            {isLoading ? (
              <p>{editMode ? "UPDATING..." : "ADDING..."}</p>
            ) : (
              <p>{editMode ? "UPDATE" : "ADD"}</p>
            )}
          </button>
        </div>
      </div>
      <div className="space-y-2 mt-3">
        {expenseData.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center bg-indigo-950 w-[15rem] rounded-xl p-3 justify-around text-white lg:w-[48rem]"
          >
            <div className="flex flex-col lg:flex-row lg:gap-28">
              <div className="text-xl font-bold">${expense.price}</div>
              <div className="w-[7rem]  text-blue-200 lg:w-[20rem] lg:flex lg:flex-start">
                {expense.description}
              </div>
              <div className="border-b lg:border-none">{expense.category}</div>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="bg-red-500 p-1 rounded-lg w-[4rem]"
                onClick={() => deleteHandler(expense.id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-950 p-1 rounded-lg w-[4rem]"
                onClick={() => editHandler(expense.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
