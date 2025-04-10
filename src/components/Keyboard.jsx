import { createGrid, getColorClass } from "../tools/getColor";

function Keyboard({ handleKeyPress, guesses, currentGuess }) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["ENTER", "z", "x", "c", "v", "b", "n", "m", "⌫"],
  ];

  const grid = createGrid(guesses, currentGuess);

  function getKeyColor(letter) {
    let bestColor = "";

    for (let guess of guesses) {
      for (let letterObj of guess) {
        if (letterObj.letter === letter) {
          const currentColorClass = getColorClass(letterObj.color);
          // Prioritize green (g) over yellow (y) and gray (b)
          if (currentColorClass === "bg-green-500") {
            bestColor = currentColorClass; // Highest priority
          } else if (
            currentColorClass === "bg-yellow-500" &&
            bestColor !== "bg-green-500"
          ) {
            bestColor = currentColorClass; // Second priority
          } else if (
            currentColorClass === "bg-gray-400" &&
            !bestColor // Only set gray if no other color is assigned yet
          ) {
            bestColor = currentColorClass;
          }
        }
      }
    }
    return bestColor;
  }

  return (
    <div className="keyboard flex flex-col items-center space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row flex space-x-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`bg-gray-300 hover:bg-gray-400 text-black font-bold py-4.5 px-2.5 sm:py-2 sm:px-4 rounded-md transition-colors duration-200 ease-in-out text-s sm:text-base uppercase ${getKeyColor(
                key
              )}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;