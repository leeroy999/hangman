import { createContext } from "react";
import { Game } from "./constants";

export const state = {
  gameState: Game.NEWGAME,
  gameHistory: [], // { word: string, status: (Game.WIN || Game.LOSE)}
  wins: 0,
  loses: 0,
  word: "",
  correctWord: [],
  currentGuess: [],
  usedLetters: {}, // {'a': true} --> 'a' is a used letter
  letterCount: 0,
  lives: 6,
  guess: (word) => {},
  newGame: () => {},
  clear: () => {},
  setState: (state) => {}
};

const HangmanContext = createContext(state);

export default HangmanContext;