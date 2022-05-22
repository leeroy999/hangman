import { useEffect, useState } from 'react';
import { Game, Guess } from './constants';
import dict from './dictionary';
import './Hangman.css';
import HangmanInput from './HangmanInput';
import { HangmanState } from '../interfaces/HangmanInterface';
import HangmanContext from './HangmanContext';

const Hangman = (): JSX.Element => {
  const [state, setState]: [HangmanState, (state: any) => void] = useState({
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
  });

  let dictionary: string[] = shuffleFisherYates(dict);
  const [index, setIndex] = useState(0);

  // When component mounts:
  useEffect(() => {
    const newState: HangmanState = JSON.parse(localStorage.getItem("hangman") ?? "");
    if (newState) {
      setState(newState);
    }
    if (state.gameState === Game.NEWGAME) {
      newGame();
    }
  }, [])

  // When component updates after letter guessed:
  useEffect(() => {
    if (state.word.length != 0 && state.letterCount === state.word.length) {
      winGame(state.word);
    } else if (state.lives === 0) {
      loseGame(state.word);
    }
    localStorage.setItem("hangman", JSON.stringify(state));
  }, [state.lives, state.letterCount, state.usedLetters, state.gameState])

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
      currentGuess: Array(word.length).fill(""),
      gameState: Game.PLAYING,
      usedLetters: {},
      letterCount: 0,
    });
  };

  const winGame = (word: string) => {
    const gameHistory = [...state.gameHistory];
    gameHistory.push({word: word, status: Game.WIN});
    setState({
      ...state,
      gameState: Game.WIN,
      wins: state.wins + 1,
      gameHistory: gameHistory,
    })
  };

  const loseGame = (word: string) => {
    const gameHistory = [...state.gameHistory];
    gameHistory.push({word: word, status: Game.WIN});
    setState({
      ...state,
      gameState: Game.LOSE,
      loses: state.loses + 1,
      gameHistory: gameHistory,
    })
  };

  const guess = (str: string): string => {
    if (str in state.usedLetters) {
      return Guess.sameLetter;
    } else if (str.length === 1) {
      if (state.currentWord.includes(str)) {
        let count = 0;
        const newCurrentGuess = state.currentGuess.map((letter, index) => {
          console.log(index);
          if (state.currentWord[index] === str) {
            count++;
            return str;
          } else {
            return letter;
          }
        });
        console.log(state.currentGuess);
        console.log(newCurrentGuess)
        setState({...state, 
          currentGuess: newCurrentGuess, 
          letterCount: state.letterCount + count,
          usedLetters: {...state.usedLetters, [str]: true}
        });
        return Guess.correctLetter;
      } else {
        setState({...state, lives: state.lives - 1});
        return Guess.incorrectLetter;
      }
    } else {
      if (str.length === state.word.length && str == state.word) {
        const newUsedLetters: {[key: string]: boolean} = {}
        state.currentWord.forEach(letter => newUsedLetters[letter] = true); 
        setState({...state,
          currentGuess: state.currentWord,
          usedLetters: newUsedLetters,
          letterCount: str.length,
        });
        return Guess.correctWord;
      } else {
        setState({...state, lives: state.lives - 1});
        return Guess.incorrectWord;
      }
    }
  };

  return (
    <HangmanContext.Provider value={{...state, guess: guess, newGame: newGame}}>
        <HangmanInput />
    </HangmanContext.Provider>

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