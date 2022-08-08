import React, { useState, useEffect, useContext } from "react";
import FreezerComponent from '../components/FreezerComponent'
import FridgeComponent from '../components/FridgeComponent'

function MainPage() {
    const [fridgeStock, setFridgeStock] = useState(10)
    const [freezerStock, setFreezerStock] = useState(20)
    
    const transferToFridge = (x) => {

        setFreezerStock(freezerStock - Number(x))
        setFridgeStock(fridgeStock + Number(x))

    }

    const addSubFridgeStock = (x, t = false) => {
        console.log(x);
        if (t) {
            setFridgeStock(fridgeStock - Number(x))
        } else {
            setFridgeStock(fridgeStock + Number(x))
        }
    }

    const transferToFreezer = (x) => {
        setFreezerStock(freezerStock + Number(x)) 
        setFridgeStock(fridgeStock - Number(x))
    }
  return (
    <div className="flex flex-row min-w-full  min-h-screen bg-blue-100 justify-center align-center">
      

          <FridgeComponent fridgeStock={fridgeStock} handleTransfer = {transferToFreezer} handleConsume={addSubFridgeStock} />
          <FreezerComponent freezerStock={freezerStock} handleTransfer= {transferToFridge} />
    </div>
  )
}

export default MainPage