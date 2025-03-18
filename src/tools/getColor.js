export function getColorClass(color) {
    if (color === "g") return "bg-green-500";
    if (color === "y") return "bg-yellow-500";
    if (color === "b") return "bg-gray-400";
    return; // For 'b' or default
  };

  export function createGrid(guesses, currentGuess) {
    const rows = 6;
    const cols = 5;
  
    return Array(rows)
    .fill(null)
    .map((_, rowIndex) => {
      const guess =
        guesses[rowIndex] ||
        (rowIndex === guesses.length ? currentGuess.split("") : []);
      return Array(cols)
        .fill(null)
        .map((_, colIndex) => ({
          letter: guess?.[colIndex]?.letter || guess?.[colIndex] || "", // Handle letters for current guess
          color: guess?.[colIndex]?.color || "", // Default to black ('b')
        }));
    });
  }