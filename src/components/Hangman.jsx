import { useEffect, useState, Text, useContext } from "react";
import { Game, Guess } from "./constants";
import dict from "./dictionary";
import "./Hangman.css";
import HangmanInput from "./HangmanInput";
import HangmanContext from "./HangmanContext";
import HangmanAnimation from "./HangmanAnimation";
import HangmanScoreboard from "./HangmanScoreboard";
import { Box, Button } from "@mui/material";

const Hangman = () => {
  const [state, setState] = useState({
    gameState: Game.NEWGAME,
    gameHistory: [], // [{ word: string, status: (Game.WIN || Game.LOSE)}, ]
    wins: 0,
    loses: 0,
    word: "",
    correctWord: [],
    currentGuess: [],
    usedLetters: {}, // {'a': true} --> 'a' is a used letter
    letterCount: 0, // number of letters guessed correctly
    lives: 6,
    newGameState: false,
  });

  let dictionary = shuffleFisherYates(dict);
  const [index, setIndex] = useState(0);

  // When component mounts
  useEffect(() => {
    if (state.word === "") {
      const newState = JSON.parse(localStorage.getItem("hangman") || "[]");
      if (newState && newState.word !== "" && storageCheck(newState)) {
        setState(newState);
      } else {
        newGame();
      }
    }
  }, []);

  // When component updates after letter guessed:
  useEffect(() => {
    if (state.gameState > Game.NEWGAME && state.word === "") {
      newGame();
    }

    if (state.word !== "") {
      localStorage.setItem("hangman", JSON.stringify(state));
    }
  });

  // Local functions
  const newGame = () => {
    const word = dictionary[index];
    setIndex(index + 1);
    if (index >= dictionary.length) {
      setIndex(0);
      dictionary = shuffleFisherYates(dict);
    }
    setState({
      ...state,
      word: word,
      correctWord: word.split(""),
      currentGuess: Array(word.length).fill(""),
      usedLetters: {},
      letterCount: 0,
    });
  };

  const winGame = (word) => {
    const gameHistory = [...state.gameHistory];
    gameHistory.push({ word: word, status: Game.WIN });
    setState({
      ...state,
      gameState: Game.WIN,
      wins: state.wins + 1,
      gameHistory: gameHistory,
      word: "",
    });
  };

  const loseGame = (word) => {
    const gameHistory = [...state.gameHistory];
    gameHistory.push({ word: word, status: Game.LOSE });
    setState({
      ...state,
      gameState: Game.LOSE,
      lives: state.lives - 1,
      loses: state.loses + 1,
      gameHistory: gameHistory,
      word: "",
    });
  };

  const clearHistory = () => {
    const clearedHistory = {
      ...state,
      gameHistory: [],
      newGameState: true,
    };
    setState(clearedHistory);
    localStorage.setItem("hangman", JSON.stringify(clearedHistory));
  }

  // Used to clear history (local storage cache)
  const clearGame = (isHistoryCleared) => {
    const clearedData = {
      gameState: Game.PLAYING,
      gameHistory: state.gameHistory,
      wins: 0,
      loses: 0,
      word: "",
      correctWord: [],
      currentGuess: [],
      usedLetters: {}, // {'a': true} --> 'a' is a used letter
      letterCount: 0, // number of letters guessed correctly
      lives: 6,
      newGameState: true,
    };
    setState(clearedData);
    localStorage.setItem("hangman", JSON.stringify(clearedData));
  };

  // param: str (word or letter)
  // returns: Guess.ENUM
  const guess = (str) => {
    str = str.toLowerCase();
    let result = "";
    if (str in state.usedLetters && state.gameState === Game.PLAYING) {
      // same letter used
      result = Guess.sameLetter;
    } else if (str.length <= 0) {
      result = Guess.empty;
    } else if (!str.match(/[a-z]/i)) {
      result = Guess.notAlpha;
    } else if (str.length === 1) {
      result = checkCharacter(str);
    } else {
      result = Guess.word;
    }
    return result;
  };

  const checkCharacter = (str) => {
    if (state.correctWord.includes(str)) {
      let count = 0;
      const newCurrentGuess = state.currentGuess.map((letter, index) => {
        if (state.correctWord[index] === str) {
          count++;
          return str;
        } else {
          return letter;
        }
      });
      if (state.letterCount + count >= state.word.length && state.gameState === Game.PLAYING) {
        winGame(state.word);
        return Guess.win;
      } else {
        setState({
          ...state,
          lives: state.gameState > Game.PLAYING ? 6 : state.lives,
          currentGuess: newCurrentGuess,
          letterCount: state.letterCount + count,
          usedLetters: { ...state.usedLetters, [str]: true },
          gameState: Game.PLAYING,
          newGameState: false,
        });
        return Guess.correctLetter;
      }
    } else {
      if (state.lives - 1 <= 0 && state.gameState === Game.PLAYING) {
        loseGame(state.word);
        return Guess.lose;
      } else {
        setState({
          ...state,
          lives: state.gameState > Game.PLAYING ? 5 : state.lives - 1,
          usedLetters: { ...state.usedLetters, [str]: true },
          gameState: Game.PLAYING,
          newGameState: false,
        });
        return Guess.incorrectLetter;
      }
    }
  };

  // Checks if storage has keys given in state variable
  const storageCheck = (storage) => {
    const keys = Object.keys(state);
    const storageKeys = Object.keys(storage);
    let result = true;
    keys.forEach((val) => {
      if (!storageKeys.includes(val)) {
        result = false;
      }
    });
    return result;
  };

  return (
    <HangmanContext.Provider value={{
      ...state,
      guess: guess,
      newGame: clearGame,
      clear: clearHistory,
      setState: setState}}>

        <Box className="flex-container"> 
          <Box className="flex-item-left"> <HangmanAnimation /> </Box> 
      
          <Box className="flex-item-center"> <HangmanInput /><NewGameButton /> </Box>

          <Box className="flex-item-right"><HangmanScoreboard /></Box>
        </Box>
    </HangmanContext.Provider>
  );
};

const shuffleFisherYates = (array) => {
  let i = array.length;
  while (i--) {
    const rand = Math.floor(Math.random() * i);
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
};

const NewGameButton = () => {
  const { clear, newGame } = useContext(HangmanContext);
  const handleClick = () => {
    newGame();
  };
  const handleClear = () => {
    clear();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>New game</Button>
      <Button variant="contained" onClick={handleClear}>Clear History</Button>
    </>
  );
};
export default Hangman;
