import React, { useEffect, useState } from "react";
export default function Expense() {
  const [title, setTitle] = useState("");
  const [dol, setDol] = useState("");
  const [exps, setExp] = useState([]);
  const [budget, setBudget] = useState(100);
  const [used, setUsed] = useState(0);
  const [remain, setRemain] = useState(budget);
  const [showDiv, setShowDiv] = useState(false);
  const [type, setType] = useState();

  const addExpense = (e) => {
    e.preventDefault();
    if (used + Number(dol) > budget) {
      window.alert("Cannot add expense. Used amount exceeds budget.");
    } else {
      setUsed((prev) => prev + Number(dol));
      const currentTime = new Date().toLocaleString();
      setExp((prev) => [...prev, { title, dol, type, currentTime }]);
      setShowDiv(!showDiv);
      setDol("");
      setTitle("");
    }
  };

  const removeExpense = (selectedIndex) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      if (exps[selectedIndex]) {
        setUsed((prev) => prev - exps[selectedIndex].dol);
        setExp((prev) => prev.filter((_, index) => index !== selectedIndex));
      }
    }
  };

  useEffect(() => {
    setRemain(budget - used);
  }, [used]);
  return (
    <div className=" p-2 m-1 w-full border-violet-500 h-full grid grid-rows-[auto_auto_1fr] ">
      <div className=" grid grid-cols-[1fr_auto] items-center border-2 border-red-500 mb-3">
        <div className="h-full ">
          <button
            className=" bg-violet-500 w-max m-1 p-2 text-white rounded-md flex font-semibold select-none active:scale-[0.98]"
            onClick={() => setShowDiv(!showDiv)}
          >
            NEW EXPENSE
          </button>
        </div>
        <div className=" w-max m-1 p-2 rounded-md font-extrabold grid-cols-3">
          <p className="mb-0">TOTAL:${budget}</p>
          <p className="w-full h-1 mb-3 bg-violet-500"></p>
          <p className="">USED:${used}</p>
          <p className="w-full h-1 mb-3 bg-violet-500"></p>
          <p>REMAIN:${remain}</p>
          <p className="w-full h-1 mb-3 bg-violet-500"></p>
        </div>
      </div>

      <div className=" ">
        {showDiv && (
          <div className=" border-4 p-2 border-violet-600 w-full rounded-m rounded-md lg:w-72">
            <p className=" bg-violet-500 p-2 flex justify-center font-extrabold rounded-sm select-none">
              NEW TASK
            </p>
            <div>
              <label>
                TITLE
                <input
                  type="text"
                  value={title}
                  className="bg-transparent border-4 rounded-md border-gray-600 w-full p-2 mb-3 "
                  placeholder="insert the new task"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                DOLLAR
                <input
                  type="number"
                  value={dol}
                  className="bg-transparent border-4 rounded-md border-gray-600 w-full p-2 mb-3 "
                  placeholder="insert the new task"
                  onChange={(e) => setDol(e.target.value)}
                />
              </label>
              <label>
                Type
                <select
                  type="text"
                  value={type}
                  className="bg-transparent border-4 rounded-md border-gray-600 w-full p-2 mb-3 font-medium "
                  placeholder="insert the new task"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>DORM</option>
                  <option>CAFFE</option>
                  <option>CLINICK</option>
                </select>
              </label>
              <label>
                <button
                  disabled={!(dol && title && type)}
                  className="bg-violet-500 p-3 w-full rounded text-xl font-extrabold mb-3 disabled:bg-violet-300 disabled:text-gray-700"
                  onClick={addExpense}
                >
                  ADD
                </button>
              </label>
            </div>
          </div>
        )}
        <div className="border-4 w-full  mt-2 border-violet-600 rounded">
          <ul className="w-full items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {exps.map((exp, index) => {
              return (
                <li className="m-2" key={index}>
                  <div className="bg-gradient-to-r from-violet-500 to-red-400 w-max h-max rounded-md border-4 border-blue-700 grid grid-rows items-center">
                    <div className="grid grid-cols-[1fr_auto_auto]">
                      <div className="font-semibold select-none w-full flex justify-center">
                        {exp.title}
                      </div>
                      <div>${exp.dol}</div>
                      <button
                        className="active:bg-red-600 ml-3 bg-blue-700 p-2 font-semibold rounded-bl-xl text-white"
                        onClick={(e) => removeExpense(index)}
                      >
                        X
                      </button>
                    </div>
                    <div className="text-center font-extrabold text-xl">
                      FOR {exp.type}
                    </div>
                    <div className="text-xl ml-5 font-se text-white p-1">
                      {exp.currentTime}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
