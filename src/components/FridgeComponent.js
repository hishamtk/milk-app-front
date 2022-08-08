import React, { useState, useEffect, useContext } from "react";

function FridgeComponent(props) {
  const [showAddField, setShowAddField] = useState(false);
  const [showSubField, setShowSubField] = useState(false);
  const [showTransField, setShowTransField] = useState(false);
  const [subInput, setSubInput] = useState(0);
  const [addInput, setAddInput] = useState(0);
  const [transfInput, setTransfInput] = useState(0);
  const [nurse, setNurse] = useState("");

  const handleChangeTransf = (e) => {
    setTransfInput(e.target.value);
  };

  const handleChangeNurse = (e) => {
    setNurse(e.target.value);
  };

  const handleChangeAdd = (e) => {
    setAddInput(e.target.value);
  };

  const handleChangeSubtract = (e) => {
    setSubInput(e.target.value);
  };

  const handleTransfSubmit = (e) => {
    e.preventDefault();
    props.handleTransfer(transfInput, nurse);
    setNurse("");
    setTransfInput(0);
    setShowTransField(!showTransField);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    props.handleConsume(addInput, false, nurse);
    setNurse("");

    setAddInput(0);
    setShowAddField(!showAddField);
  };

  const handleSubSubmit = (e) => {
    e.preventDefault();
    props.handleConsume(subInput, true, nurse);
    setNurse("");

    setSubInput(0);
    setShowSubField(!showSubField);
  };
  return (
    <div className="flex flex-row p-10 m-2 sm:m-10 justify-center align-center bg-blue-300 rounded-lg w-full">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h2 className="text-3xl sm:text-3xl pb-5 text-blueGray-100 font-bold">
            <i class="fa-solid fa-box-archive" /> Fridge Stock
          </h2>
          <h4 className="text-md md:text-3xl pb-10 font-semibold">
            {props.fridgeStock} ml
          </h4>

          <button
            onClick={() => {
              setShowAddField(!showAddField);
            }}
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center gap-1 items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 pr-1"
          >
            <i class="fa-solid fa-circle-plus "></i> Add to Fridge
          </button>

          {showAddField && (
            <form onSubmit={handleAddSubmit} className="mb-5">
              <div className="mb-3 pt-0">
                <input
                  onChange={handleChangeNurse}
                  type="text"
                  placeholder="Name"
                  className="px-2 py-1 placeholder-slate-400 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  type="number"
                  onChange={handleChangeAdd}
                  placeholder="Added to Fridge"
                  className="px-2 py-1 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <button
                class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}

          <button
            onClick={() => setShowSubField(!showSubField)}
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center gap-1 items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 pr-1"
          >
            <i class="fa-solid fa-circle-minus "></i> Used from Fridge
          </button>

          {showSubField && (
            <form onSubmit={handleSubSubmit} className="mb-5">
              <div className="mb-3 pt-0">
                              <input
                  onChange={handleChangeNurse}
                                  
                  type="text"
                  placeholder="Name"
                  className="px-2 py-1 placeholder-slate-400 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  type="number"
                  onChange={handleChangeSubtract}
                  placeholder="Used From Fridge"
                  className="px-2 py-1 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <button
                class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
          <button
            onClick={() => {
              setShowTransField(!showTransField);
            }}
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Icon description</span> Transfer to Freezer
          </button>

          {showTransField && (
            <form onSubmit={handleTransfSubmit} className="mb-5">
              <div className="mb-3 pt-0">
                              <input
                  onChange={handleChangeNurse}
                                  
                  type="text"
                  placeholder="Name"
                  className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  type="number"
                  onChange={handleChangeTransf}
                  placeholder="Added to Fridge"
                  className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              <button
                class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FridgeComponent;
