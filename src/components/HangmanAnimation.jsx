import { useContext, useEffect, useState } from "react";
import zero from "../assets/0.PNG";
import one from "../assets/1.PNG";
import two from "../assets/2.PNG";
import three from "../assets/3.PNG";
import four from "../assets/4.PNG";
import five from "../assets/5.PNG";
import six from "../assets/6.PNG";
import HangmanContext from "./HangmanContext";

const HangmanAnimation = () => {
  const context = useContext(HangmanContext);
  const [state, setState] = useState(zero);

  useEffect(() => {
    switch (context.lives) {
      case 0:
        setState(six);
        break;
      case 1:
        setState(five);
        break;
      case 2:
        setState(four);
        break;
      case 3:
        setState(three);
        break;
      case 4:
        setState(two);
        break;
      case 5:
        setState(one);
        break;
      default:
        setState(zero);
    }
  });

  return (
    <>
      <img src={state} style={{ width: 200, height: 200 }} />
    </>
  );
};

export default HangmanAnimation;
