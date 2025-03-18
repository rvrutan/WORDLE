import React from "react";
import { createGrid, getColorClass } from "../tools/getColor";

function WordleGrid({ guesses, currentGuess }) {
  const grid = createGrid( guesses, currentGuess);

  return (
<div className="grid space-y-2">
  {grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row flex justify-center space-x-1">
      {row.map((cell, colIndex) => (
        <div
          key={colIndex}
          className={`cell w-14 h-14 sm:w-14 sm:h-14 border-2 border-gray-300 mx-1 flex justify-center items-center uppercase font-bold text-xl ${getColorClass(
            cell.color
          )}`}
        >
          {cell.letter}
        </div>
      ))}
    </div>
  ))}
</div>  );
}

export default WordleGrid;