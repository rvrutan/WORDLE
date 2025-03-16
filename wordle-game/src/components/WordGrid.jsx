import React from "react";

function WordleGrid({ guesses, currentGuess }) {
  const rows = 6;
  const cols = 5;

  const grid = Array(rows)
    .fill(null)
    .map((_, rowIndex) => {
      const guess =
        guesses[rowIndex] ||
        (rowIndex === guesses.length ? currentGuess.split("") : []);
      return Array(cols)
        .fill(null)
        .map((_, colIndex) => ({
          letter: guess?.[colIndex]?.letter || guess?.[colIndex] || "", // Handle letters for current guess
          color: guess?.[colIndex]?.color || "b", // Default to black ('b')
        }));
    });

  // Get the corresponding Tailwind color class
  const getColorClass = (color) => {
    if (color === "g") return "bg-green-500";
    if (color === "y") return "bg-yellow-500";
    return "bg-gray-400"; // For 'b' or default
  };

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