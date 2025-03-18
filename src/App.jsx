import React, { useState } from "react";
import WordGrid from "./components/WordGrid.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Result from "./components/Result.jsx";
import fiveLetterWords from "./tools/fiveLetterWords.js";
import Wordle, { GREEN, YELLOW, BLACK } from "./tools/index.js";

const App = () => {
  const [targetWord, setTargetWord] = useState(
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");

  const wordle = new Wordle(targetWord);

  const handleKeyPress = (key) => {
    console.log("Key pressed:", key);

    if (key === "ENTER") {
      handleGuessSubmit(currentGuess);
    } else if (key === "⌫") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleGuessSubmit = (guess) => {
    if (guess.length !== 5) {
      alert("Your guess must be 5 letters long!");
      return;
    }

    if (!fiveLetterWords.includes(guess.toLowerCase())) {
      alert("The guessed word is not a valid word!");
      return;
    }

    if (
      guesses.some(
        (g) => g.map((letterObj) => letterObj.letter).join("") === guess
      )
    ) {
      alert("You've already guessed that word!");
      return;
    }
    const checkResult = wordle.checkWord(guess);

    // Transform checkResult into an array of objects
    const formattedGuess = guess.split("").map((letter, index) => ({
      letter: letter,
      color: checkResult[index], // 'g', 'y', or 'b'
    }));

    setGuesses([...guesses, formattedGuess]);
    setCurrentGuess("");

    if (checkResult.every((res) => res === GREEN)) {
      setIsGameOver(true);
      setResult("You Win!");
    } else if (guesses.length >= 5) {
      setIsGameOver(true);
      setResult(`Game Over! The word was:\n${targetWord.toUpperCase()}`);
    }
  };

  return (
    <div className="app min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 pt-8 " style={{ fontFamily: "'Geologica', sans-serif" }}>
      <h1 className="text-3xl font-bold">
        <span className="text-green-500">W</span>
        <span className="text-green-500">O</span>
        <span className="text-green-500">R</span>
        <span className="text-yellow-500">D</span>
        <span className="text-yellow-500">L</span>
        <span className="text-gray-500">E</span>
      </h1>{" "}
      <a href="https://github.com/rvrutan" className="hover:text-blue-500 mb-4">
        by Roni
      </a>
      <div className="mb-12">
        <WordGrid guesses={guesses} currentGuess={currentGuess} />
      </div>
      {isGameOver ? (
        <Result result={result} />
      ) : (
        <Keyboard
          guesses={guesses}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
};

export default App;
