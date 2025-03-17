import React, { useState } from "react";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";
import Result from "./components/Result";
import fiveLetterWords from "./tools/fiveLetterWords.js";
import { Wordle, GREEN, YELLOW, BLACK } from "./tools/index";

const App = () => {
  const [targetWord, setTargetWord] = useState(
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");

  const wordle = new Wordle(targetWord);

  // Handle key press from keyboard
  const handleKeyPress = (key) => {
    console.log("Key pressed:", key);

    if (key === "ENTER") {
      // Logic for submitting the guess
      handleGuessSubmit(currentGuess);
    } else if (key === "BACKSPACE") {
      // Logic for removing a letter
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      // Add the letter to the current guess if it's not full
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleGuessSubmit = (guess) => {
    if (guess.length !== 5) {
      alert("Your guess must be 5 letters long!");
      return;
    }

    if (!fiveLetterWords.includes(guess.toLowerCase())) {
      alert('The guessed word is not a valid word!');
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
      setResult(`Game Over! The word was ${targetWord}`);
    }
  };

  return (
    <div className="app min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">WORDLE</h1>
      <p className="text-lg font-mono text-gray-600 mb-4">{targetWord}</p>
      <div className="mb-8">
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
