import { useContext, useEffect, useState } from "react";
import zero from "../assets/0.jpg";
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";
import four from "../assets/4.jpg";
import five from "../assets/5.jpg";
import six from "../assets/6.jpg";
import HangmanContext from "./HangmanContext";

const HangmanAnimation = () => {
  const context = useContext(HangmanContext);
  const [state, setState] = useState(zero);

  useEffect(() => {
    console.log(context.lives);
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
      <img src={state} />
    </>
  );
};

export default HangmanAnimation;
