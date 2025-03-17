import React from "react";
import { createGrid, getColorClass } from "../tools/getColor";

function WordleGrid({ guesses, currentGuess }) {
  const grid = createGrid( guesses, currentGuess);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row flex justify-center">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell w-12 h-12 border-2 border-gray-300 mx-1 flex justify-center items-center uppercase font-bold ${getColorClass(
                cell.color
              )}`}
            >
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WordleGrid;