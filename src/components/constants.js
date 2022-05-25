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
  empty: "Must contain character",
  word: "Only one character allowed",
  notAlpha: "Not an alphabet!",
  lose: "You Lost",
  win: "You Won",
}

Object.freeze(Game);
Object.freeze(Guess);
