export const GREEN = "g";
export const YELLOW = "y";
export const BLACK = "b";

export default class Wordle {
  word;
  constructor(word) {
    this.word = word;
  }

  checkWord(guess) {
    if (guess.length !== this.word.length) {
      return [];
    }
    if (guess === this.word) {
      return [GREEN, GREEN, GREEN, GREEN, GREEN];
    }
    let result = [];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === this.word[i]) {
        result.push(GREEN);
      } else if (this.word.includes(guess[i])) {
        if (this.letterRepeatedInGuess(guess, i)) {
          result.push(BLACK);
        } else {
          result.push(YELLOW);
        }
      } else {
        result.push(BLACK);
      }
    }
    return result;
  }
  
  letterRepeatedInGuess(guess, index) {
    let charCountInGuess = [];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === guess[index]) {
        charCountInGuess.push(i);
      }
    }
    let charCountInWordle = [];
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === guess[index]) {
        charCountInWordle.push(i);
      }
    }
    if (charCountInGuess.length === 1) {
      return false;
    }
    if (charCountInGuess.length === charCountInWordle.length) {
      return false;
    }
    if (index === charCountInGuess[0]) {
      return false;
    }
    return true;
  }
}

// module.exports = { Wordle, GREEN, YELLOW, BLACK };
