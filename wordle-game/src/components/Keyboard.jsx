import { createGrid } from "../tools/getColor";

function Keyboard({ handleKeyPress, guesses, currentGuess }) {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];

    const grid = createGrid(guesses, currentGuess);

function getKeyColor(letter) {
  //look at each guess in the grid
  //look at each letter in the guess
  //see if the given letter is in the guess
  //if not go to the next guess
  //if it is return the color
  //else return null
}

    
    return (
      <div className="keyboard flex flex-col items-center space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row flex space-x-1">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
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