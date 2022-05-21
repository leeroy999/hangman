export const Game = {
  NEWGAME: 0,
  PLAYING: 1,
  WIN: 2,
  LOSE: 3,
};

export const Guess = {
  sameLetter: "Same letter guessed!",
  incorrectLetter: "Incorrect letter!",
  correctLetter: "Correct Letter",
  incorrectWord: "Incorrect word!",
  correctWord: "Correct word!",
}

Object.freeze(Game);
Object.freeze