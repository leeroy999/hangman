import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Game, Guess } from './constants';
import dict from './dictionary';
import './Hangman.css';

interface GameHistory {
  word: string;
  status: number;
}

interface HangmanState {
  gameState: number;
  gameHistory: GameHistory[];
  wins: number;
  loses: number;
  word: string;
  currentWord: string[];
  currentGuess: string[];
  usedLetters: Object;
};

const Hangman = (): JSX.Element => {
  const [state, setState]: [HangmanState, Function] = useState({
    gameState: Game.NEWGAME,
    gameHistory: [], // { word: string, status: (Game.WIN || Game.LOSE)}
    wins: 0,
    loses: 0,
    word: "",
    currentWord: [],
    currentGuess: [],
    usedLetters: {}, // {'a': true} --> 'a' is a used letter
  });
  let dictionary: string[] = shuffleFisherYates(dict);
  const [index, setIndex] = useState(0);

  // When component mounts:
  useEffect(() => {
    const newState: HangmanState = JSON.parse(localStorage.getItem("hangman"));
    if (newState) {
      setState(newState);
    }
    if (state.gameState === Game.NEWGAME) {
      newGame();
    }
  }, [])

  // When component updates after letter guessed:
  useEffect(() => {
    localStorage.setItem("hangman", JSON.stringify(state));
  }, [state.usedLetters, state.gameState])

  // Local functions
  const newGame = () => {
    const word: string = dictionary[index];
    setIndex(index + 1);
    if (index >= dictionary.length) {
      setIndex(0);
      dictionary = shuffleFisherYates(dict);
    }
    setState({
      ...state,
      word: word,
      currentWord: word.split(''),
      currentGuess: Array(word.length),
      gameState: Game.PLAYING,
      usedLetters: {},
    });
  };

  const winGame = (word: string) => {
    setState({
      ...state,
      gameState: Game.WIN,
      wins: state.wins + 1,
      gameHistory: state.gameHistory.push({word: word, status: Game.WIN}),
    })
  };

  const loseGame = (word: string) => {
    setState({
      ...state,
      gameState: Game.LOSE,
      loses: state.loses + 1,
      gameHistory: state.gameHistory.push({word: word, status: Game.LOSE}),
    })
  };

  const guess = (str: string) => string => {
    if (str in state.usedLetters) {
      return Guess.sameLetter;
    } else if (str.length === 1 && state.currentWord.includes(str)) {
      return Guess.correctLetter
    }
  };

  return (
    <Button variant="contained">Play Hangman</Button>
  );
};

const shuffleFisherYates = (array: string[]): string[] => {
  let i = array.length;
  while (i--) {
    const rand = Math.floor(Math.random() * i);
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
};

export default Hangman;