import { useState } from 'react'
import reactLogo from './assets/react.svg'
import React from "react"
import './App.css'
import Dice from './components/Dice.jsx'
import { nanoid } from "nanoid"

function App() {

  
  // Create new set of dice whether the button is clicked or if the program was just started 
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value:Math.ceil(Math.random() * 6), 
        isHeld: true,
        id: nanoid()
      })
    }
    return newDice
  }

  // roll new set of dice when button is clicked
  function rollDice() {
    setDice(allNewDice())
  }

  function holdDice(id){
    setDice(prevDie => prevDie.map( die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const [dice, setDice] = React.useState(allNewDice())


  let dice_elements = dice.map((item, index) => {
    return (
      <Dice
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        holdDice={() => holdDice(item.id)}
      />
    )
    
  })
  return (
    <main>
      <div className="dice-container">
        {dice_elements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button> 
    </main>

  )
}

export default App
