import { useState } from 'react'
import React from "react"
import './App.css'
import Dice from './components/Dice.jsx'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = React.useState(allNewDice()) // state for dice
  const [tenzies, setTenzies] = React.useState(false) // state for game win

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  
  // Create new set of dice whether the button is clicked or if the program was just started 
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value:Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  // roll new set of dice when button is clicked
  function rollDice() {
    
    
    if (!tenzies){
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ?
        die: 
        {value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()}
        }))
      } else {
        setTenzies(false)
        setDice(allNewDice())
      }
  }

  // function to only change isHeld value on a dice that is clicked
  function holdDice(id){
    setDice(prevDie => prevDie.map( die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  //creating dice elements
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      {tenzies && <Confetti />}
      <div className="dice-container">
        {dice_elements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button> 
    </main>

  )
}

export default App
