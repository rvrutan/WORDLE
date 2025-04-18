import React, { useState, useEffect } from "react";
import WordGrid from "./components/WordGrid.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Result from "./components/Result.jsx";
import Statistics from "./components/Statistics.jsx";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [shakeRowIndex, setShakeRowIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [hasShownStats, setHasShownStats] = useState(false);
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('wordleStats');
    return savedStats ? JSON.parse(savedStats) : {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0],
    };
  });
  const wordle = new Wordle(targetWord);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wordleStats', JSON.stringify(stats));
  }, [stats]);

  const handleKeyPress = (key) => {
    if (key === "ENTER") {
      handleGuessSubmit(currentGuess);
    } else if (key === "⌫") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleGuessSubmit = (guess) => {
    const currentRow = guesses.length;

    if (guess.length !== 5) {
      triggerError("Not enough letters", currentRow);
      return;
    }

    if (!fiveLetterWords.includes(guess.toLowerCase())) {
      triggerError("Not in word list", currentRow);
      return;
    }

    if (
      guesses.some(
        (g) => g.map((letterObj) => letterObj.letter).join("") === guess
      )
    ) {
      triggerError("Already guessed", currentRow);
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
      updateStats(true, guesses.length + 1);
    } else if (guesses.length >= 5) {
      setIsGameOver(true);
      setResult(`Game Over! The word was:\n${targetWord.toUpperCase()}`);
      updateStats(false, 6);
      // For game over, show result immediately
      setShowResult(true);
    }
  };

  const updateStats = (won, numGuesses) => {
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        gamesPlayed: prevStats.gamesPlayed + 1,
        gamesWon: won ? prevStats.gamesWon + 1 : prevStats.gamesWon,
        currentStreak: won ? prevStats.currentStreak + 1 : 0,
        maxStreak: won && prevStats.currentStreak + 1 > prevStats.maxStreak 
          ? prevStats.currentStreak + 1 
          : prevStats.maxStreak,
        guessDistribution: prevStats.guessDistribution.map((count, index) => 
          index === numGuesses - 1 ? count + 1 : count
        ),
      };
      return newStats;
    });
  };

  // Function to handle error and trigger shake effect
  const triggerError = (message, rowIndex) => {
    setErrorMessage(message);
    setShakeRowIndex(rowIndex);
    setTimeout(() => {
      setErrorMessage("");
      setShakeRowIndex(null);
    }, 2000);
  };

  const handleJumpComplete = () => {
    console.log('handleJumpComplete called');
    setShowResult(true);
    // Show stats after a short delay only if it hasn't been shown yet
    if (!hasShownStats) {
      setHasShownStats(true);
      setTimeout(() => {
        setShowStats(true);
      }, 1000);
    }
  };

  const handleNewGame = () => {
    setTargetWord(fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    setResult("");
    setShowResult(false);
    setShowStats(false);
    setHasShownStats(false);
  };

  return (
    <div
      className="app min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 pt-6 relative"
      style={{ fontFamily: "'Geologica', sans-serif" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">
            <span className="text-green-500">W</span>
            <span className="text-green-500">O</span>
            <span className="text-green-500">R</span>
            <span className="text-yellow-500">D</span>
            <span className="text-yellow-500">L</span>
            <span className="text-gray-500">E</span>
          </h1>
          <a href="https://github.com/rvrutan" className="text-sm hover:text-blue-500 mt-3 sm:mt-3">by Roni</a>
          <button onClick={() => setShowStats(true)} className="text-gray-600 hover:text-gray-800 mt-2 sm:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-28 sm:ml-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>

        </div>
      </div>
      {errorMessage && (
        <div className="absolute top-1/10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 ease-in-out opacity-100 z-50">
          {errorMessage}
        </div>
      )}

      <div className="mb-6 relative z-10">
        <WordGrid
          guesses={guesses}
          currentGuess={currentGuess}
          shakeRowIndex={shakeRowIndex}
          onJumpComplete={handleJumpComplete} 
        />
      </div>

      <div className="relative w-full max-w-2xl">
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            showResult ? "opacity-0" : "opacity-100"
          }`}
        >
          <Keyboard
            guesses={guesses}
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            handleKeyPress={handleKeyPress}
          />
        </div>
        {isGameOver && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
              showResult ? "opacity-100" : "opacity-0"
            }`}
          >
            <Result result={result} onNewGame={handleNewGame} />
          </div>
        )}
      </div>

      <Statistics
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
      />
    </div>
  );
};

export default App;
