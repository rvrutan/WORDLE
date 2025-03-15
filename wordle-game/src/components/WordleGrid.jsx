import React from 'react';
import '../WordleGrid.css';

const WordleGrid = ({ guesses, currentGuess }) => {
  const rows = 6;
  const cols = 5;

  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      let cellContent = '';
      let cellColor = '';

      if (guesses[i]) {
        // Display guessed letters and their colors
        cellContent = guesses[i][j]?.letter || '';
        cellColor = guesses[i][j]?.color || '';
      } else if (i === guesses.length) {
        // Display current guess in the current row
        cellContent = currentGuess[j] || '';
      }

      row.push(
        <div key={`${i}-${j}`} className={`cell ${cellColor}`}>
          {cellContent}
        </div>
      );
    }
    grid.push(<div key={i} className="row">{row}</div>);
  }

  return <div key={`<span class="math-inline">\{i\}\-</span>{j}`} className={`cell ${cellColor}`}>
  {cellContent}
</div>;
};

export default WordleGrid;