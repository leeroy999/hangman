import Input from '@mui/material/Input';
import { useContext, useState } from "react"
import HangmanContext from './HangmanContext.jsx';

const HangmanInput = () => {
  const [state, setState] = useState("");
  const [label, setLabel] = useState("");
  const context = useContext(HangmanContext);

  return (
    <>
      <Input 
        placeholder={"Enter word/letter"} 
        autoFocus
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
      <span>
        {label}
      </span>
      <div>
        {context.currentGuess.reduce((prev, curr) => {
            return (curr) ? prev + " " + curr : prev + ' _';
          }, "").trim()}
      </div>
    </>

  );
}

export default HangmanInput;