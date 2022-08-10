import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import FreezerComponent from "../components/FreezerComponent";
import FridgeComponent from "../components/FridgeComponent";
import { async } from "q";

function MainPage() {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [fridgeStock, setFridgeStock] = useState(10);
    const [freezerStock, setFreezerStock] = useState(20);
    const [nurse, setNurse] = useState("")
    const [transferType, setTransferType] = useState(0)
    /**
     *  Transfer Type of 4 Types.
     * 
     *  1. Add to Fridge
     *  2. Consume From Fridge.
     *  3. Transfer to Freezer.
     *  4. Transfer to Fridge.
     * 
     */

  const setErrorValue = (mesg) => {
    setError(true);
    setErrorText(mesg);
    setTimeout(() => {
      setError(false);
      setErrorText("");
    }, 10000);
  };

  const transferToFridge = (x, user) => {
    if (Number(x) > freezerStock) {
      setErrorValue("Transfer Value should not be Greater than FreezerStock");
      return;
    }

    setFreezerStock(freezerStock - Number(x));
    setFridgeStock(fridgeStock + Number(x));
      setNurse(user)
      setTransferType(4)
  };

  const addSubFridgeStock = (x, t = false, user) => {
    if (t) {
      if (Number(x) > fridgeStock) {
        setErrorValue("Consume Value Should not Be greater than FridgeStock");
        return;
      }
        setFridgeStock(fridgeStock - Number(x));
        setTransferType(2)
    } else {
        setFridgeStock(fridgeStock + Number(x));
        setTransferType(1)
        
    }
      setNurse(user)
  };

  const transferToFreezer = (x, user) => {
    if (Number(x) > fridgeStock) {
      setErrorValue("Transfer Value should not be Greater than FridgeStock");
      return;
    }
    setFreezerStock(freezerStock + Number(x));
    setFridgeStock(fridgeStock - Number(x));
      setNurse(user)
      setTransferType(3)
  };

  const updateStock = async (user) => {
    try {
      const data = {
        freezer: freezerStock,
        fridge: fridgeStock,
        stockDate: moment().format("YYYY-MM-DD"),
        unit: "ml",
          nurse: user,
        transferType
      };
      await axios.post(`${process.env.REACT_APP_APIURL}/milk`, data);
    } catch (error) {
      //TODO handle error effitiantly.
      console.log(error);
    }
  };

  const getStock = async () => {
    try {
      const date = moment().format("YYYY-MM-DD");
      let res = await axios.get(
        `${process.env.REACT_APP_APIURL}/milk?date=${date}`
      );
      res = res.data;

      if (res == 0) {
        res = { freezer: 0, fridge: 0 };
      }
      setFreezerStock(res?.freezer);
      setFridgeStock(res?.fridge);
    } catch (error) {
      //TODO handle error effitiantly.
      console.log(error);
    }
  };

  useEffect(() => {
    getStock();
  }, []);

  useEffect(() => {
    updateStock(nurse);

    //    return () => {
    //      getStock()
    //    }
  }, [nurse]);

  return (
    <div className="bg-blue-100 p-3">
      {error && (
        <div
          className={`text-white px-6 py-3 border-0 mx-8 rounded  relative mb-2 bg-red-500`}
        >
          <span className="text-md inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block text-sm align-middle mr-8">
            {errorText}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 py-2 -top-3 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => {
              setError(false);
              setErrorText("");
            }}
          >
            <span>×</span>
          </button>
        </div>
      )}

      <div className="flex flex-row  min-h-screen bg-blue-100 justify-center align-center">
        <FridgeComponent
          fridgeStock={fridgeStock}
          handleTransfer={transferToFreezer}
          handleConsume={addSubFridgeStock}
        />
        <FreezerComponent
          freezerStock={freezerStock}
          handleTransfer={transferToFridge}
        />
      </div>
    </div>
  );
}

export default MainPage;
