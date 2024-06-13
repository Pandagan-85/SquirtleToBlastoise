import "./App.css";
import Squirtle from "./assets/squirtle.png";
import Wartortle from "./assets/wartortle.png";
import Blastoise from "./assets/Blastoise.png";
import { useRef, useState } from "react";

type StageNames = "Squirtle" | "Wartortle" | "Blastoise";

interface LifeStage {
  imageUrl: string; // URL della PNG
  clicksNeeded: number;
  nextStage: StageNames | null;
  name: string;
}

const lifeStages: Record<StageNames, LifeStage> = {
  Squirtle: {
    imageUrl: Squirtle,
    clicksNeeded: 10,
    nextStage: "Wartortle",
    name: "Squirtle",
  },
  Wartortle: {
    imageUrl: Wartortle,
    name: "Wartortle",
    clicksNeeded: 10,
    nextStage: "Blastoise",
  },
  Blastoise: {
    imageUrl: Blastoise,
    name: "Blastoise",
    clicksNeeded: 0,
    nextStage: null,
  },
};

function App() {
  const [stage, setStage] = useState<LifeStage>(lifeStages.Squirtle);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
      timeoutRef.current = null;
    }, 50);
  };
  const handleReset = () => {
    setStage(lifeStages.Squirtle);
    setClickCount(0);
  };
  const handleClick = () => {
    if (clickCount < stage.clicksNeeded - 1) {
      setClickCount(prevCount => prevCount + 1);
    } else if (stage.nextStage) {
      setStage(lifeStages[stage.nextStage]);
      setClickCount(0);
    }
  };

  return (
    <>
      <button className='reset' onClick={handleReset}>
        Reset
      </button>
      <div
        className='container'
        onClick={handleClick}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
      >
        <h2 className='nomePokemon'>{stage.name}</h2>
        <img
          src={stage.imageUrl}
          style={{ transform: isPressed ? "scale(0.95)" : "scale(1)" }}
          className='clickable'
        />
      </div>
    </>
  );
}

export default App;
