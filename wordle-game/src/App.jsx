import React, { useState } from 'react';
import WordleGrid from './components/WordleGrid';
import Keyboard from './components/Keyboard';
import './App.css'
import { Wordle, GREEN, YELLOW, BLACK } from './tools/index';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [targetWord, setTargetWord] = useState('CRANE');
  const [currentRow, setCurrentRow] = useState(0);
  const wordleGame = new Wordle(targetWord);

  const handleGuessSubmit = () => {
    if (currentGuess.length !== 5) return;

    const newGuesses = [...guesses];
    const feedback = checkGuess(currentGuess);
    const feedbackWithObjects = currentGuess.split('').map((letter, index) => ({
      letter: letter,
      color: feedback[index],
    }));

    newGuesses.push(feedbackWithObjects);
    setGuesses(newGuesses);
    setCurrentGuess('');
    setCurrentRow(currentRow + 1);

    if (currentGuess === targetWord) {
      setIsGameWon(true);
      setIsGameOver(true);
    } else if (newGuesses.length === 6) {
      setIsGameOver(true);
    }
  };

  const checkGuess = (guess) => {
    return wordleGame.checkWord(guess);
  };

  const handleKeyPress = (key) => {
    if (isGameOver) return;

    if (key === 'ENTER') {
      handleGuessSubmit();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5 && key.length === 1 && key.match(/[A-Z]/i)) {
      setCurrentGuess(currentGuess + key.toUpperCase());
    }
  };

  return (
    <div className="app">
      <h1>Wordle</h1>
      <WordleGrid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard handleKeyPress={handleKeyPress} />
      {isGameOver && <Modal isWon={isGameWon} targetWord={targetWord} />}
    </div>
  );
}

export default App;