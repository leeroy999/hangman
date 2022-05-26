import { Box } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { Game } from "./constants";
import HangmanContext from "./HangmanContext";

const HangmanScoreboard = () => {
  const context = useContext(HangmanContext);
  const [state, setState] = useState(context.gameHistory);
  // Test case
  //const [state, setState] = useState([{ word: "string", status: Game.LOSE }]);

  useEffect(() => {
    setState(context.gameHistory);
  });

  // Example: context.gameHistory[1].status
  return (
    <Box>
      {state.map((x, i) => {
        if (x.status === Game.WIN) {
          return <Box key={i} sx={{ textAlign: 'center', color: green[300] }}>{x.word}</Box>;
        }
        if (x.status === Game.LOSE) {
          return <Box key={i} sx={{ textAlign: 'center', color: red[300] }}>{x.word}</Box>;
        }
      })}
    </Box>
  );
};

export default HangmanScoreboard;
