export default function GameControls({ rollDice, resetDice, didWin, rollButton }) {
    return (
      <div>
        <button className="roll-button" onClick={rollDice}>
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
  