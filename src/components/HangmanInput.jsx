import { Box, TextField } from '@mui/material';
import Input from '@mui/material/Input';
import { useContext, useState } from "react"
import { Guess } from './constants.js';
import HangmanContext from './HangmanContext.jsx';

const HangmanInput = () => {
  const [state, setState] = useState("");
  const [label, setLabel] = useState("");
  const context = useContext(HangmanContext);

  return (
    <>
      <TextField
        error={label !== "" && label !== Guess.correctLetter && label !== Guess.win}
        style={{marginTop: 20}}
        id="outlined-basic" 
        label="Enter Letter" 
        variant="outlined" 
        autoFocus={true}
        onChange={e => {
          setState(e.target.value);
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            setLabel(context.guess(state));
            setState("");
            e.target.value = "";
          }
        }}
      />
      <Box>
        {context.newGameState ? "" : label}
      </Box>
      <Box>
        {context.currentGuess ? context.currentGuess.reduce((prev, curr) => {
            return (curr) ? prev + " " + curr : prev + ' _';
          }, "").trim() : ""}
      </Box>
    </>
  );
}

export default HangmanInput;