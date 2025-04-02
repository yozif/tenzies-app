import * as React from 'react'

export default function GameControls({ rollDice, resetDice, didWin, rollButton }) {
    return (
      <div>
        <button className="roll-button" onClick={rollDice} data-testid="roll-button">
          {rollButton}
        </button>
        <button
          className={`roll-button restart-button ${didWin ? "hide-restart-button" : ""}`}
          onClick={resetDice}
        >
          RESTART
        </button>
      </div>
    );
  }
  