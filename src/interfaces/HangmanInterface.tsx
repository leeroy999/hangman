
export interface GameHistory {
  word: string;
  status: number;
}
export interface HangmanState {
  gameState: number;
  gameHistory: GameHistory[];
  wins: number;
  loses: number;
  word: string;
  currentWord: string[];
  currentGuess: string[];
  usedLetters: Object;
  letterCount: number;
  lives: number;
}
;

export interface HangmanContextState {
  gameState: number;
  gameHistory: GameHistory[];
  wins: number;
  loses: number;
  word: string;
  currentWord: string[];
  currentGuess: string[];
  usedLetters: Object;
  letterCount: number;
  lives: number;
  guess: Function;
  newGame: Function;
}
