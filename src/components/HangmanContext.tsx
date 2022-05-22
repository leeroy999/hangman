import { createContext } from "react";
import { Game } from "./constants";
import { HangmanContextState } from "../interfaces/HangmanInterface";

const state: HangmanContextState = {
  gameState: Game.NEWGAME,
  gameHistory: [], // { word: string, status: (Game.WIN || Game.LOSE)}
  wins: 0,
  loses: 0,
  word: "",
  currentWord: [],
  currentGuess: [],
  usedLetters: {}, // {'a': true} --> 'a' is a used letter
  letterCount: 0,
  lives: 6,
  guess: (word: string) => {},
  newGame: () => {},
};

const HangmanContext = createContext(state);

export default HangmanContext;