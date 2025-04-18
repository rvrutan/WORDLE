import React, { useState, useEffect } from "react";
import { createGrid, getColorClass } from "../tools/getColor";

function WordleGrid({ guesses, currentGuess, shakeRowIndex, onJumpComplete }) {
  const grid = createGrid(guesses, currentGuess);
  const [flippedCells, setFlippedCells] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);
  const [jumpingRow, setJumpingRow] = useState(null);

  useEffect(() => {
    if (guesses.length > 0) {
      const currentRow = guesses.length - 1;

      const animateRow = async () => {
        for (let colIndex = 0; colIndex < grid[currentRow].length; colIndex++) {
          const cellKey = `${currentRow}-${colIndex}`;

          setFlippedCells((prev) => [...prev, cellKey]);

          // Wait half of the flip duration before coloring (assuming 500ms total flip duration)
          setTimeout(() => {
            setColoredCells((prev) => [...prev, cellKey]);
          }, 250 + colIndex * 150); // staggered with colIndex

          await new Promise((resolve) => setTimeout(resolve, 150)); // stagger each flip
        }

        // After all cells colored
        const isAllGreen = grid[currentRow].every(cell => cell.color === 'g');
        if (isAllGreen) {
          setTimeout(() => {
            setJumpingRow(currentRow);
            setTimeout(() => {
              onJumpComplete?.();
            }, grid[currentRow].length * 100 + 300);
          }, 1000);
        }
      };

      animateRow();
    }
  }, [guesses, onJumpComplete]);

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
            const isJumping = rowIndex === jumpingRow;
            return (
              <div
                key={colIndex}
                className={`cell w-12 h-12 sm:w-14 sm:h-14 border-2 border-gray-300 mx-1 flex justify-center items-center uppercase font-bold text-xl ${
                  flippedCells.includes(cellKey) && !isJumping ? "flip" : ""
                } ${
                  isJumping ? "jump" : ""
                }`}
                style={
                  isJumping
                    ? {
                        animationDelay: `${colIndex * 0.1}s`,
                        animationDuration: "0.5s",
                        animationFillMode: "forwards",
                      }
                    : flippedCells.includes(cellKey)
                    ? {
                        animationDelay: `${colIndex * 0.15}s`,
                        animationDuration: "0.5s",
                        animationFillMode: "forwards",
                      }
                    : undefined
                }
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