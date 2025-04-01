import { useState, useEffect } from "react";
import Die from "./components/Die";
import GameHeader from "./components/GameHeader";
import GameControls from "./components/GameControls";
import Confetti from "react-confetti";

export default function App() {
  const [gameState, setGameState] = useState({
    didWin: false,
    rollButton: "ROLL",
  });
  const [values, setValues] = useState(
    Array.from({ length: 10 }, () => ({
      val: Math.floor(Math.random() * 6) + 1,
      selected: false,
      noMatch: false, // New property for wrong selection effect
    }))
  );
  const [selectedNum, setSelectedNum] = useState(null);

  useEffect(() => {
    if (values.every((die) => die.selected)) {
      setGameState({ didWin: true, rollButton: "NEW GAME" });
    }
  }, [values]);

  function rollDice() {
    if (gameState.didWin) {
      resetDice();
    } else {
      setValues((prevValues) =>
        prevValues.map((die) =>
          die.selected
            ? die
            : { ...die, val: Math.floor(Math.random() * 6) + 1 }
        )
      );
    }
  }

  function resetDice() {
    setValues(
      Array.from({ length: 10 }, () => ({
        val: Math.floor(Math.random() * 6) + 1,
        selected: false,
        noMatch: false,
      }))
    );
    setGameState({ didWin: false, rollButton: "ROLL" });
    setSelectedNum(null);
  }

  function dieNoMatch(index) {
    setValues((prevValues) =>
      prevValues.map((die, i) =>
        i === index ? { ...die, noMatch: true } : die
      )
    );
    setTimeout(() => {
      setValues((prevValues) =>
        prevValues.map((die, i) =>
          i === index ? { ...die, noMatch: false } : die
        )
      );
    }, 200);
  }

  function handleDieClick(index) {
    setValues((prevValues) => {
      return prevValues.map((die, i) => {
        if (i === index) {
          if (selectedNum === null) {
            setSelectedNum(die.val);
            return { ...die, selected: true };
          } else if (die.val === selectedNum) {
            return { ...die, selected: true };
          } else {
            dieNoMatch(i);
          }
        }
        return die;
      });
    });
  }

  return (
    <main>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        className={gameState.didWin ? "" : "hide-confetti"}
      />
      <GameHeader />
      <div className="die-container">
        {values.map((die, i) => (
          <Die
            key={i}
            className={`die ${die.selected ? "die-selected" : ""} ${
              die.noMatch ? "no-match" : ""
            }`}
            value={die.val}
            onClick={() => handleDieClick(i)}
          />
        ))}
      </div>
      <GameControls rollDice={rollDice} resetDice={resetDice} didWin={gameState.didWin} rollButton={gameState.rollButton} />
    </main>
  );
}
