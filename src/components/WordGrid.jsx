import React, { useState, useEffect } from "react";
import { createGrid, getColorClass } from "../tools/getColor";

function WordleGrid({ guesses, currentGuess, shakeRowIndex }) {
  const grid = createGrid(guesses, currentGuess);
  const [flippedCells, setFlippedCells] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);

  useEffect(() => {
    if (guesses.length > 0) {
      const currentRow = guesses.length - 1;

      grid[currentRow].forEach((_, colIndex) => {
        const cellKey = `${currentRow}-${colIndex}`;

        const flipDelay = colIndex === 0 ? 0 : colIndex * 100;
        const colorDelay = colIndex === 0 ? 200 : 500 + colIndex * 150;

        setTimeout(() => {
          setFlippedCells((prev) => [...prev, cellKey]);
        }, flipDelay);

        setTimeout(() => {
          setColoredCells((prev) => [...prev, cellKey]);
        }, colorDelay);
      });
    }
  }, [guesses]);

  return (
    <div className="grid space-y-2">
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`row flex justify-center space-x-1 ${
            rowIndex === shakeRowIndex ? "shake" : ""
          }`}
        >
          {row.map((cell, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`;
            return (
              <div
                key={colIndex}
                className={`cell w-12 h-12 sm:w-14 sm:h-14 border-2 border-gray-300 mx-1 flex justify-center items-center uppercase font-bold text-xl ${
                  flippedCells.includes(cellKey) ? "flip" : ""
                }`}
                style={{
                  animationDelay: `${colIndex * 0.15}s`,
                  animationDuration: "0.5s",
                  animationFillMode: "forwards",
                }}
              >
                <div
                  className={`w-full h-full flex justify-center items-center ${
                    coloredCells.includes(cellKey)
                      ? getColorClass(cell.color)
                      : ""
                  }`}
                >
                  {cell.letter}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default WordleGrid;