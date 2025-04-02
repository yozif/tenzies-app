import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Functionality", () => {
  test("shows up correctly", () => {
    render(<App />);
  });

  test("rolls dice on button click", () => {
    render(<App />);

    const button = screen.getByTestId("roll-button");
    const dice = screen.getAllByTestId("die");

    fireEvent.click(button);

    expect(dice[0]).toHaveTextContent(/1|2|3|4|5|6/);
  });

  test("changes button text on win", () => {
    render(<App />);

    const button = screen.getByTestId("roll-button");
    const dice = screen.getAllByTestId("die");

    for (let i = 1; i < dice.length; i++) {
      fireEvent.click(dice[i]);
      if (dice[i].textContent === dice[i - 1].textContent) {
        const allSame = dice.every((die) => die.textContent === dice[0].textContent);
        if (allSame) {
          fireEvent.click(button);
          expect(button).toHaveTextContent("NEW GAME");
        }
      }
    }
  });
});
