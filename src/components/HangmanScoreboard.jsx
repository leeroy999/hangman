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
    console.log("status change");
    setState(context.gameHistory);
  });

  // Example: context.gameHistory[1].status
  return (
    <div>
      {state.map((x) => {
        if (x.status === Game.WIN) {
          return <text style={{ color: "green" }}>correct</text>;
        }
        if (x.status === Game.LOSE) {
          return <text style={{ color: "red" }}>wrong</text>;
        }
      })}
    </div>
  );
};

export default HangmanScoreboard;
