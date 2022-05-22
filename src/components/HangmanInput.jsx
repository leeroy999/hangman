import Input from '@mui/material/Input';
import { useContext, useState } from "react"
import { GameContext } from "./Hangman.jsx";

const HangmanInput = () => {
  const [state, setState] = useState("");
  const {guess} = useContext(GameContext);

  return (
    <Input 
      placeholder={"Enter word/letter"} 
      autoFocus
      lab
      onChange={e => {
        setState(e.target.value);
      }}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          console.log("enter pressed");
          guess(state);
          setState("");
          e.target.value = "";
        }
      }}
    />
  );
}

export default HangmanInput;