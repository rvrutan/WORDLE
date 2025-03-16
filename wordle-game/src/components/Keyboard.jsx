function Keyboard({ handleKeyPress }) {
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE'],
    ];
  
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